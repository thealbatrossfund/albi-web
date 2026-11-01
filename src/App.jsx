import mockupUrl from '../mockup/Web-Mock.jpeg'

const navItems = [
  { label: 'How It Works', className: 'nav-how' },
  { label: 'Community', className: 'nav-community' },
  { label: 'About', className: 'nav-about' },
  { label: 'FAQs', className: 'nav-faqs' },
]

const categoryItems = [
  { label: 'Baby Formula', className: 'category-formula' },
  { label: 'Diapers', className: 'category-diapers' },
  { label: 'Groceries', className: 'category-groceries' },
  { label: 'School Supplies', className: 'category-school' },
  { label: 'Pet Food', className: 'category-pet-food' },
  { label: 'Bill Help — Coming Soon', className: 'category-bill-help' },
]

function HotspotButton({ label, className }) {
  return (
    <button className={`hotspot ${className}`} type="button" aria-label={label}>
      <span className="sr-only">{label}</span>
    </button>
  )
}

function App() {
  return (
    <main className="page-shell">
      <section className="mockup-frame" aria-labelledby="page-title">
        <div className="sr-only">
          <h1 id="page-title">
            Wish for what you need. Give what you can.
          </h1>
          <p>
            ALBi connects real people with real needs. People post specific
            items and generous people help fulfill those wishes.
          </p>
        </div>

        <img
          className="mockup-artwork"
          src={mockupUrl}
          alt=""
          width="1672"
          height="941"
          draggable="false"
        />

        <div className="interaction-layer">
          <HotspotButton label="ALBi home" className="brand-home" />

          <nav aria-label="Primary navigation">
            {navItems.map((item) => (
              <HotspotButton key={item.label} {...item} />
            ))}
            <HotspotButton label="Sign in" className="sign-in" />
            <HotspotButton label="Get started" className="get-started" />
          </nav>

          <div aria-label="Giving actions">
            <HotspotButton label="Start giving" className="start-giving" />
            <HotspotButton label="Make a wish" className="make-wish" />
          </div>

          <div aria-label="Wish categories">
            {categoryItems.map((item) => (
              <HotspotButton key={item.label} {...item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
