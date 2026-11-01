import { readFileSync, writeFileSync } from 'node:fs'
import { deflateSync, inflateSync } from 'node:zlib'

const [, , inputPath, outputPath, xArg, yArg, widthArg, heightArg] = process.argv

if (!heightArg) {
  throw new Error(
    'Usage: node scripts/crop-png.mjs input.png output.png x y width height',
  )
}

const crop = {
  x: Number(xArg),
  y: Number(yArg),
  width: Number(widthArg),
  height: Number(heightArg),
}

const source = readFileSync(inputPath)
const signature = source.subarray(0, 8)
const chunks = []
let offset = 8

while (offset < source.length) {
  const length = source.readUInt32BE(offset)
  const type = source.toString('ascii', offset + 4, offset + 8)
  const data = source.subarray(offset + 8, offset + 8 + length)
  chunks.push({ type, data })
  offset += length + 12
}

const header = chunks.find(({ type }) => type === 'IHDR')?.data
if (!header) throw new Error('PNG is missing an IHDR chunk')

const sourceWidth = header.readUInt32BE(0)
const sourceHeight = header.readUInt32BE(4)
const bitDepth = header[8]
const colorType = header[9]
const interlace = header[12]

if (bitDepth !== 8 || colorType !== 2 || interlace !== 0) {
  throw new Error('This cropper expects a non-interlaced, 8-bit RGB PNG')
}

if (
  crop.x < 0 ||
  crop.y < 0 ||
  crop.x + crop.width > sourceWidth ||
  crop.y + crop.height > sourceHeight
) {
  throw new Error('Crop rectangle extends outside the source image')
}

const bytesPerPixel = 3
const rowSize = sourceWidth * bytesPerPixel
const compressed = Buffer.concat(
  chunks.filter(({ type }) => type === 'IDAT').map(({ data }) => data),
)
const filtered = inflateSync(compressed)
const pixels = Buffer.alloc(sourceHeight * rowSize)

const paeth = (a, b, c) => {
  const estimate = a + b - c
  const distanceA = Math.abs(estimate - a)
  const distanceB = Math.abs(estimate - b)
  const distanceC = Math.abs(estimate - c)
  if (distanceA <= distanceB && distanceA <= distanceC) return a
  return distanceB <= distanceC ? b : c
}

for (let y = 0; y < sourceHeight; y += 1) {
  const sourceRow = y * (rowSize + 1)
  const targetRow = y * rowSize
  const filter = filtered[sourceRow]

  for (let x = 0; x < rowSize; x += 1) {
    const raw = filtered[sourceRow + x + 1]
    const left = x >= bytesPerPixel ? pixels[targetRow + x - bytesPerPixel] : 0
    const above = y > 0 ? pixels[targetRow - rowSize + x] : 0
    const upperLeft =
      y > 0 && x >= bytesPerPixel
        ? pixels[targetRow - rowSize + x - bytesPerPixel]
        : 0

    let value = raw
    if (filter === 1) value += left
    if (filter === 2) value += above
    if (filter === 3) value += Math.floor((left + above) / 2)
    if (filter === 4) value += paeth(left, above, upperLeft)
    if (filter > 4) throw new Error(`Unsupported PNG filter: ${filter}`)

    pixels[targetRow + x] = value & 0xff
  }
}

const croppedRowSize = crop.width * bytesPerPixel
const cropped = Buffer.alloc(crop.height * (croppedRowSize + 1))

for (let y = 0; y < crop.height; y += 1) {
  const outputRow = y * (croppedRowSize + 1)
  const sourceRow = (crop.y + y) * rowSize + crop.x * bytesPerPixel
  cropped[outputRow] = 0
  pixels.copy(cropped, outputRow + 1, sourceRow, sourceRow + croppedRowSize)
}

const crcTable = Array.from({ length: 256 }, (_, value) => {
  let result = value
  for (let bit = 0; bit < 8; bit += 1) {
    result = (result & 1) === 1 ? 0xedb88320 ^ (result >>> 1) : result >>> 1
  }
  return result >>> 0
})

const crc32 = (buffer) => {
  let crc = 0xffffffff
  for (const byte of buffer) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  }
  return (crc ^ 0xffffffff) >>> 0
}

const makeChunk = (type, data) => {
  const typeBuffer = Buffer.from(type)
  const chunk = Buffer.alloc(data.length + 12)
  chunk.writeUInt32BE(data.length, 0)
  typeBuffer.copy(chunk, 4)
  data.copy(chunk, 8)
  chunk.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), data.length + 8)
  return chunk
}

const outputHeader = Buffer.from(header)
outputHeader.writeUInt32BE(crop.width, 0)
outputHeader.writeUInt32BE(crop.height, 4)

writeFileSync(
  outputPath,
  Buffer.concat([
    signature,
    makeChunk('IHDR', outputHeader),
    makeChunk('IDAT', deflateSync(cropped, { level: 9 })),
    makeChunk('IEND', Buffer.alloc(0)),
  ]),
)
