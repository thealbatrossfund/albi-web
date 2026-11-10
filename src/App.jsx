import { useEffect, useRef, useState } from 'react'
import phonesImage from './assets/phones-transparent.png'
import formulaImage from './assets/formula.png'
import diapersImage from './assets/diapers.png'
import groceriesImage from './assets/groceries.png'
import schoolSuppliesImage from './assets/school-supplies.png'
import petFoodImage from './assets/pet-food.png'
import heroMascot from './assets/mascots/albi_hero.png'
import howMascot from './assets/mascots/albi_howitworks.png'
import faqMascot from './assets/mascots/albi_faqs.png'

const navItems = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Community', href: '#community' },
  { label: 'About', href: '#about' },
  { label: 'FAQs', href: '#faqs' },
]

const categoryItems = [
  { label: 'Baby Formula', image: formulaImage },
  { label: 'Diapers', image: diapersImage },
  { label: 'Groceries', image: groceriesImage },
  { label: 'School Supplies', image: schoolSuppliesImage },
  { label: 'Pet Food', image: petFoodImage },
  { label: 'Bill Help', note: 'Coming Soon' },
]

const howSteps = [
  { number: '01', title: 'Make a Wish', description: 'Share a wish for a specific item you need. No extraordinary story or perfect explanation required.', icon: 'wish' },
  { number: '02', title: 'Find a Wish to Support', description: 'Explore wishes from others, see exactly what they need, and choose an item you can provide.', icon: 'heart' },
  { number: '03', title: 'Make It Happen', description: 'Once a wish is fulfilled, the item is ordered and delivered directly to the person who requested it.', icon: 'gift' },
]

const communityCards = [
  { title: 'Real People. Real Needs.', description: 'Support real people by helping with the specific everyday items they need.' },
  { title: 'Stories Worth Noticing.', description: 'Our Feel Good Feed highlights genuine kindness, cooperation, recovery, discoveries, and progress—without ignoring the difficult parts.' },
  { title: 'A Different Perspective.', description: "We don't manufacture inspiration. We acknowledge what happened and draw attention to constructive perspectives that might otherwise be missed." },
]

const faqs = [
  { question: 'What exactly is ALBi?', answer: 'ALBi is a community-focused platform connecting people who need everyday essentials with people willing to help. It also features a Feel Good Feed, which highlights meaningful stories of human kindness, cooperation, recovery, and progress without ignoring the realities surrounding them.' },
  { question: 'How does making a wish work?', answer: 'You share a specific item you need, such as baby formula, diapers, groceries, school supplies, or pet food. Other people can discover your wish and choose to help fulfill it.' },
  { question: 'How does giving work?', answer: 'You can explore wishes from other people and choose a specific item to support. When a wish is fulfilled, the item is ordered and delivered directly to the person who requested it.' },
  { question: 'What is the ALBi Feel Good Feed?', answer: "It's our approach to discovering and sharing meaningful stories that might otherwise go unnoticed. Rather than focusing exclusively on negative headlines or artificially uplifting content, we look for genuine examples of cooperation, resilience, discovery, recovery, and progress." },
  { question: 'Does ALBi only share positive news?', answer: "No. We believe good reporting starts with being honest about what happened. Difficult situations deserve to be understood, not disguised. When there's a meaningful constructive perspective, we want to share it without minimizing the challenges involved." },
  { question: 'How do you decide which stories to share?', answer: 'We look for stories with meaningful, factually supported perspectives that may not receive as much attention elsewhere. We consider the full context, acknowledge difficult circumstances, and avoid exaggerated or manufactured conclusions. Not every story needs to appear in the feed.' },
  { question: 'Can I use ALBi if I just want to explore the community?', answer: "ALBi includes both community-oriented content and opportunities to give or request help. You don't have to approach every story as a problem you need to solve." },
  { question: 'Is Bill Help available?', answer: 'Not yet. Bill Help is currently marked as Coming Soon.' },
  { question: 'How do I get started?', answer: "Choose Start Giving if you'd like to help fulfill a wish, or Make a Wish if you need something yourself. You can also use Get Started to begin exploring ALBi." },
]

function HeartIcon() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 28.1 4.7 17.3C-2.1 10.8 7.7.1 16 8.4 24.3.1 34.1 10.8 27.3 17.3L16 28.1Z" /></svg>
}

function PlusIcon() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13.5" /><path d="M16 9v14M9 16h14" /></svg>
}

function HomeIcon() {
  return <svg viewBox="0 0 40 40" aria-hidden="true"><path d="m5 19 15-13 15 13" /><path d="M9 17v17h9V23h5v11h8V17" /></svg>
}

function StepIcon({ type }) {
  if (type === 'heart') return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 53S10 41 10 23c0-12 15-17 22-6 7-11 22-6 22 6 0 18-22 30-22 30Z" /><path d="M22 26h20" /></svg>
  if (type === 'gift') return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M10 27h44v27H10ZM7 20h50v10H7ZM32 20v34" /><path d="M31 20H18c-9 0-8-12-1-12 8 0 14 12 14 12Zm2 0h13c9 0 8-12 1-12-8 0-14 12-14 12Z" /></svg>
  return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M13 11h30v24l-13 13H13Z" /><path d="M21 20h14M21 27h10M39 35l8-8 6 6-14 14-8 2 2-8Z" /></svg>
}

function CommunityIcon({ type }) {
  if (type === 'stories') return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 14h34v36H12zM18 20h22v6H18zM18 32h9v11h-9zM31 32h9M31 38h9M8 19H5v36h36v-3" /></svg>
  if (type === 'perspective') return <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="33" r="21" /><path d="m43 21-8 17-17 8 8-17 17-8Z" /><path d="m26 29 9 9M32 12V7M47 18l4-4" /></svg>
  return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 53 13 35C2 24 18 7 32 21 46 7 62 24 51 35L32 53Z" /><path d="M21 24h8l4-4 5 6h7" /></svg>
}

function Brand() {
  return <span className="brand-word" aria-label="ALBi"><span className="brand-heavy">ALB</span>i<span className="brand-cursor" /></span>
}

function CategoryCard({ item }) {
  return <div className="category-card"><span className="category-media">{item.image ? <img src={item.image} alt="" loading="lazy" /> : <HomeIcon />}</span><span className="category-label"><span>{item.label}</span>{item.note && <small>{item.note}</small>}</span></div>
}

function SceneLayers({ type }) {
  return (
    <div className={`scene-layers scene-layers-${type}`} aria-hidden="true">
      <div className="scene-depth"><div className="scene-image" /></div>
      <div className="scene-shade" />
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [openFaq, setOpenFaq] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const animationRef = useRef(null)
  const menuButtonRef = useRef(null)
  const stepCarouselRef = useRef(null)

  const stopScrollAnimation = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    animationRef.current = null
  }

  const scrollToTarget = (hash) => {
    const section = document.querySelector(hash)
    if (!section) return
    const isOceanSection = section.matches('.ocean-section')
    const target = section
    stopScrollAnimation()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const headerHeight = document.querySelector('.site-header')?.offsetHeight ?? 80
    const start = window.scrollY
    const anchorOffset = isOceanSection ? 0 : headerHeight + 18
    const end = Math.max(0, target.getBoundingClientRect().top + start - anchorOffset)
    const distance = end - start
    if (reducedMotion || Math.abs(distance) < 2) {
      window.scrollTo(0, end)
      return
    }
    const duration = Math.min(950, Math.max(550, Math.abs(distance) * 0.18))
    const beganAt = performance.now()
    const tick = (now) => {
      const progress = Math.min(1, (now - beganAt) / duration)
      const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - ((-2 * progress + 2) ** 3) / 2
      window.scrollTo(0, start + distance * eased)
      if (progress < 1) animationRef.current = requestAnimationFrame(tick)
      else animationRef.current = null
    }
    animationRef.current = requestAnimationFrame(tick)
  }

  const handleAnchorClick = (event, href) => {
    if (!document.querySelector(href)) return
    event.preventDefault()
    setMenuOpen(false)
    scrollToTarget(href)
  }

  const handlePlaceholderAction = (event) => {
    event.preventDefault()
    setMenuOpen(false)
  }

  useEffect(() => {
    const cancelEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown']
    const cancel = () => stopScrollAnimation()
    cancelEvents.forEach((name) => window.addEventListener(name, cancel, { passive: true }))
    return () => {
      cancelEvents.forEach((name) => window.removeEventListener(name, cancel))
      stopScrollAnimation()
    }
  }, [])

  useEffect(() => {
    const onPopState = () => {
      if (window.location.hash && document.querySelector(window.location.hash)) scrollToTarget(window.location.hash)
    }
    window.addEventListener('popstate', onPopState)
    const initialHash = window.location.hash
    if (initialHash && document.querySelector(initialHash)) requestAnimationFrame(() => scrollToTarget(initialHash))
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    const sections = navItems.map(({ href }) => document.querySelector(href)).filter(Boolean)
    const updateActive = () => {
      const line = (document.querySelector('.site-header')?.offsetHeight ?? 80) + window.innerHeight * 0.25
      let current = ''
      sections.forEach((section) => { if (section.getBoundingClientRect().top <= line) current = section.id })
      setActiveSection(current)
    }
    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [])

  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }), { threshold: 0.12 })
    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const getStepScrollLeft = (carousel, card) => (
    carousel.scrollLeft + card.getBoundingClientRect().left - carousel.getBoundingClientRect().left
  )

  const scrollToStep = (index) => {
    const carousel = stepCarouselRef.current
    const safeIndex = Math.min(howSteps.length - 1, Math.max(0, index))
    const card = carousel?.children[safeIndex]
    if (!carousel || !card) return
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    setActiveStep(safeIndex)
    carousel.scrollTo({ left: getStepScrollLeft(carousel, card), behavior })
  }

  const updateActiveStep = () => {
    const carousel = stepCarouselRef.current
    if (!carousel) return
    const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2
    const cards = Array.from(carousel.children)
    const closestIndex = cards.reduce((bestIndex, card, index) => {
      const cardCenter = getStepScrollLeft(carousel, card) + card.offsetWidth / 2
      const bestCard = cards[bestIndex]
      const bestCenter = getStepScrollLeft(carousel, bestCard) + bestCard.offsetWidth / 2
      return Math.abs(cardCenter - carouselCenter) < Math.abs(bestCenter - carouselCenter) ? index : bestIndex
    }, 0)
    setActiveStep(closestIndex)
  }

  const handleStepKeyDown = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    const direction = event.key === 'ArrowRight' ? 1 : -1
    scrollToStep(Math.min(howSteps.length - 1, Math.max(0, activeStep + direction)))
  }

  useEffect(() => {
    const alignActiveCard = () => {
      const carousel = stepCarouselRef.current
      const card = carousel?.children[activeStep]
      if (window.innerWidth <= 699 && carousel && card) carousel.scrollTo({ left: getStepScrollLeft(carousel, card), behavior: 'auto' })
    }
    window.addEventListener('resize', alignActiveCard)
    return () => window.removeEventListener('resize', alignActiveCard)
  }, [activeStep])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="brand-link" href="#top" onClick={(event) => handleAnchorClick(event, '#top')}><Brand /></a>
        <button ref={menuButtonRef} className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-controls="primary-menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((isOpen) => !isOpen)}><span /><span /><span /></button>
        <div className="nav-panel" id="primary-menu" data-open={menuOpen ? 'true' : 'false'}>
          <nav className="primary-nav" aria-label="Primary navigation">
            {navItems.map((item) => <a key={item.label} href={item.href} className={activeSection === item.href.slice(1) ? 'is-active' : ''} aria-current={activeSection === item.href.slice(1) ? 'location' : undefined} onClick={(event) => handleAnchorClick(event, item.href)}>{item.label}</a>)}
          </nav>
          <div className="account-actions"><a className="sign-in-link" href="#sign-in" onClick={handlePlaceholderAction}>Sign In</a><a className="header-cta" href="#get-started" onClick={handlePlaceholderAction}>Get Started</a></div>
        </div>
      </header>

      <main id="main-content">
        <section className="landing" id="top" aria-labelledby="page-title">
          <section className="hero-layout">
            <div className="hero-mascot" aria-hidden="true"><img src={heroMascot} alt="" width="1122" height="1402" /></div>
            <div className="hero-heading"><h1 id="page-title"><span>Wish for what you need.</span><span className="accent-text">Give what you can.</span></h1></div>
            <div className="hero-description"><p>ALBi connects real people with real needs. People post specific items like formula, diapers, groceries, school supplies, and pet supplies—and generous people help fulfill those wishes. Items are ordered and delivered directly, like from Amazon.</p></div>
            <div className="hero-actions" id="get-started"><a className="action-button action-primary" href="#categories"><span className="action-icon heart-icon"><HeartIcon /></span><span>Start Giving</span></a><a className="action-button action-secondary" href="#make-a-wish"><span className="action-icon plus-icon"><PlusIcon /></span><span>Make a Wish</span></a></div>
            <div className="hero-visual" aria-label="Preview of the ALBi mobile app"><picture><img src={phonesImage} alt="Three ALBi app screens showing the community feed, a wish, and the inbox" width="1445" height="1088" /></picture><div className="carousel-dots" aria-hidden="true"><span /><span className="is-active" /><span /></div></div>
          </section>
          <section className="categories" id="categories" aria-labelledby="categories-title"><h2 className="sr-only" id="categories-title">Browse wish categories</h2><div className="category-list">{categoryItems.map((item) => <CategoryCard key={item.label} item={item} />)}</div></section>
        </section>

        <section className="ocean-section how-section" id="how-it-works" aria-labelledby="how-title">
          <SceneLayers type="how" />
          <div className="section-inner">
            <div className="section-heading split-heading" data-reveal><div className="section-title-block"><p className="eyebrow">How It Works</p><h2 id="how-title">Help starts with something real.</h2></div><div className="section-intro-copy"><p>Everyone needs a hand sometimes. ALBi connects people who need everyday essentials with people who want to help—through specific wishes and items delivered directly.</p></div></div>
            <ol ref={stepCarouselRef} className="story-grid step-grid" aria-label="How ALBi works" tabIndex="0" onScroll={updateActiveStep} onKeyDown={handleStepKeyDown}>{howSteps.map((step, index) => <li className="story-card" data-reveal style={{ '--delay': `${index * 100}ms` }} key={step.title}>{index === 0 && <img className="how-mascot" src={howMascot} alt="" aria-hidden="true" width="1448" height="1086" />}<span className="card-icon"><StepIcon type={step.icon} /></span><span className="card-number">{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
            <div className="step-carousel-controls" aria-label="How It Works carousel navigation"><button type="button" className="step-arrow" aria-label="Previous step" disabled={activeStep === 0} onClick={() => scrollToStep(activeStep - 1)}>‹</button><div className="step-dots">{howSteps.map((step, index) => <button type="button" key={step.title} className={activeStep === index ? 'is-active' : ''} aria-label={`Show step ${index + 1}: ${step.title}`} aria-current={activeStep === index ? 'step' : undefined} onClick={() => scrollToStep(index)} />)}</div><button type="button" className="step-arrow" aria-label="Next step" disabled={activeStep === howSteps.length - 1} onClick={() => scrollToStep(activeStep + 1)}>›</button></div>
            <div className="section-closing how-closing" data-reveal><p>Because making a difference doesn't always require a grand gesture. Sometimes, it's as simple as showing up for someone.</p></div>
          </div>
        </section>

        <section className="ocean-section community-section" id="community" aria-label="Community">
          <SceneLayers type="community" />
          <div className="community-desktop-inner">
            <div className="community-desktop-heading" data-reveal><p className="eyebrow">Community</p><h2>There’s more<br />to every story.</h2></div>
            <p className="community-desktop-intro" data-reveal>A request for help is only one part of someone’s story. So is a news headline.<br />ALBi looks beyond the surface—to real people, everyday needs, and meaningful<br />developments that deserve attention, even when circumstances are difficult.</p>
            <svg className="community-wave" viewBox="0 0 1672 250" preserveAspectRatio="none" aria-hidden="true">
              <defs><filter id="community-wave-glow" x="-10%" y="-80%" width="120%" height="260%"><feGaussianBlur stdDeviation="8" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
              <path d="M-35 115 C105 100 190 18 360 24 C520 30 650 155 850 145 C1020 135 1160 50 1350 61 C1500 70 1580 145 1710 116" />
              <svg className="community-wave-marker" x="338" y="2" width="44" height="44" viewBox="0 0 44 44"><circle className="marker-halo" cx="22" cy="22" r="21" /><circle className="marker-ring" cx="22" cy="22" r="13" /><circle className="marker-center" cx="22" cy="22" r="6" /></svg>
              <svg className="community-wave-marker" x="828" y="123" width="44" height="44" viewBox="0 0 44 44"><circle className="marker-halo" cx="22" cy="22" r="21" /><circle className="marker-ring" cx="22" cy="22" r="13" /><circle className="marker-center" cx="22" cy="22" r="6" /></svg>
              <svg className="community-wave-marker" x="1328" y="39" width="44" height="44" viewBox="0 0 44 44"><circle className="marker-halo" cx="22" cy="22" r="21" /><circle className="marker-ring" cx="22" cy="22" r="13" /><circle className="marker-center" cx="22" cy="22" r="6" /></svg>
            </svg>
            <div className="community-desktop-card community-card-needs" data-reveal>
              <span className="community-card-icon"><CommunityIcon type="needs" /></span><span className="community-card-divider" /><div><h3>Real People. Real Needs.</h3><p>Support real people by helping with<br />the specific everyday items they need.</p></div>
            </div>
            <div className="community-desktop-card community-card-stories" data-reveal style={{ '--delay': '100ms' }}>
              <span className="community-card-icon"><CommunityIcon type="stories" /></span><span className="community-card-divider" /><div><h3>Stories Worth Noticing.</h3><p>Explore genuine acts of kindness,<br />cooperation, recovery, and progress<br />from the community.</p></div>
            </div>
            <div className="community-desktop-card community-card-perspective" data-reveal style={{ '--delay': '200ms' }}>
              <span className="community-card-icon"><CommunityIcon type="perspective" /></span><span className="community-card-divider" /><div><h3>A Different Perspective.</h3><p>See what happened from fresh<br />angles and consider the fuller<br />picture.</p></div>
            </div>
            <div className="community-desktop-closing" data-reveal><p>The good doesn’t have to be exaggerated to matter.</p><a className="action-button action-primary compact-action" href="#get-started" onClick={handlePlaceholderAction}>Get Started</a></div>
          </div>
          <div className="section-inner community-mobile-inner">
            <div className="section-heading split-heading" data-reveal><div className="section-title-block"><p className="eyebrow">Community</p><h2>There's more to every story.</h2></div><div className="section-intro-copy"><p>A request for help is only part of someone's story. So is a news headline. ALBi looks beyond the surface—to real people, everyday needs, and meaningful developments that deserve attention, even when circumstances are difficult.</p></div></div>
            <div className="story-grid">{communityCards.map((card, index) => <article className="story-card" data-reveal style={{ '--delay': `${index * 100}ms` }} key={card.title}><span className="card-number">0{index + 1}</span><h3>{card.title}</h3><p>{card.description}</p></article>)}</div>
            <div className="section-closing" data-reveal><p>The good doesn't have to be exaggerated to matter.</p><a className="action-button action-primary compact-action" href="#get-started" onClick={handlePlaceholderAction}>Get Started</a></div>
          </div>
        </section>

        <section className="ocean-section about-section" id="about" aria-labelledby="about-title">
          <SceneLayers type="about" />
          <div className="section-inner about-inner">
            <div className="section-heading about-heading" data-reveal><p className="eyebrow">About ALBi</p><h2 id="about-title">A different way to see the same world.</h2><p>The world can be difficult and overwhelming. We don't believe pretending otherwise helps.</p><p>ALBi is built around a simple idea: people deserve to be seen, meaningful actions deserve attention, and the full story deserves to be told.</p></div>
            <div className="about-content-column"><div className="about-copy" data-reveal><p>Through everyday wishes, we make it easier for people to help one another directly. Through our Feel Good Feed, we offer an alternative to sensational headlines and manufactured positivity.</p><p>We acknowledge hardship, recognize meaningful developments when they're real, and never tell people how to feel.</p><p>Some stories have no silver lining. We won't invent one.</p></div><div className="authenticity" data-reveal><h3>Authenticity Above All Else.</h3><p>Real people. Real needs. Real stories. A different perspective.</p></div></div>
            <blockquote className="about-emphasis" data-reveal>We're here to help you see more of what's really happening, and leave you to decide what it means.</blockquote>
          </div>
        </section>

        <section className="ocean-section faq-section" id="faqs" aria-labelledby="faq-title">
          <SceneLayers type="faq" />
          <div className="section-inner faq-inner">
            <div className="faq-copy" data-reveal><div className="section-heading"><p className="eyebrow">FAQs</p><h2 id="faq-title">Questions? Let's talk about it.</h2><p>Whether you're here to lend a hand, ask for one, or explore a different perspective on what's happening in the world, here's a little more about ALBi.</p></div><img className="faq-mascot" src={faqMascot} alt="" aria-hidden="true" width="1122" height="1402" /></div>
            <div className="faq-list" data-reveal>{faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return <div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={faq.question}><h3><button type="button" aria-expanded={isOpen} aria-controls={`faq-panel-${index}`} id={`faq-button-${index}`} onClick={() => setOpenFaq(isOpen ? null : index)}><span>{faq.question}</span><span className="faq-plus" aria-hidden="true" /></button></h3><div className="faq-panel" id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-button-${index}`} aria-hidden={!isOpen}><div><p>{faq.answer}</p></div></div></div>
            })}</div>
          </div>
        </section>
      </main>

      <div className="route-anchor" id="sign-in" aria-hidden="true" />
      <div className="route-anchor" id="make-a-wish" aria-hidden="true" />
    </div>
  )
}

export default App
