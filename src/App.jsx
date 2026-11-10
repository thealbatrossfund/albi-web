import { useEffect, useRef, useState } from 'react'
import phonesImage from './assets/phones-transparent.png'
import formulaImage from './assets/formula.png'
import diapersImage from './assets/diapers.png'
import groceriesImage from './assets/groceries.png'
import schoolSuppliesImage from './assets/school-supplies.png'
import petFoodImage from './assets/pet-food.png'

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
  { number: '01', title: 'Make a Wish', description: "Need something? Share a wish for a specific item that would make a difference in your everyday life. You don't need an extraordinary story or a perfect explanation. Sometimes, you simply need a little help.", icon: 'wish' },
  { number: '02', title: 'Find a Wish to Support', description: "Want to help? Explore wishes shared by others and choose something you can provide. You'll know what someone needs and can decide where you'd like to make a difference.", icon: 'heart' },
  { number: '03', title: 'Make It Happen', description: "When a wish is fulfilled, the item is ordered and delivered directly to the person who requested it. It's a practical way to help someone without the complications of coordinating an exchange.", icon: 'gift' },
]

const communityCards = [
  { title: 'Real People. Real Needs.', description: "Our community connects people around specific, everyday needs. Sometimes the most meaningful way to support someone is simply to understand what they're asking for and lend a hand." },
  { title: 'Stories Worth Noticing.', description: 'Through the ALBi Feel Good Feed, we look for stories of cooperation, recovery, discoveries, human kindness, and genuine progress. Not because the world is always good, but because those stories are part of the world, too.' },
  { title: 'A Different Perspective.', description: "We don't believe in covering up difficult realities with inspirational headlines. We believe in acknowledging what happened and making room for the developments and perspectives that might otherwise go unnoticed." },
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
  const animationRef = useRef(null)
  const menuButtonRef = useRef(null)

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
            <div className="section-heading split-heading" data-reveal><div className="section-title-block"><p className="eyebrow">How It Works</p><h2 id="how-title">Help starts with something real.</h2></div><div className="section-intro-copy"><p>Everyone needs a hand sometimes. And sometimes, helping someone is simpler than we think.</p><p>ALBi connects people who need everyday essentials with people who want to help. Whether it's baby formula, groceries, school supplies, or pet food, the idea is simple: make a specific wish, find someone willing to help, and turn a small act of generosity into something tangible.</p></div></div>
            <ol className="story-grid step-grid">{howSteps.map((step, index) => <li className="story-card" data-reveal style={{ '--delay': `${index * 100}ms` }} key={step.title}><span className="card-icon"><StepIcon type={step.icon} /></span><span className="card-number">{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
            <div className="section-closing" data-reveal><p>Because making a difference doesn't always require a grand gesture. Sometimes, it's as simple as showing up for someone.</p><div className="section-actions"><a className="action-button action-primary compact-action" href="#categories">Start Giving</a><a className="action-button action-secondary compact-action" href="#make-a-wish">Make a Wish</a></div></div>
          </div>
        </section>

        <section className="ocean-section community-section" id="community" aria-labelledby="community-title">
          <SceneLayers type="community" />
          <div className="section-inner">
            <div className="section-heading split-heading" data-reveal><div className="section-title-block"><p className="eyebrow">Community</p><h2 id="community-title">There's more to every story.</h2></div><div className="section-intro-copy"><p>A request for help is only one part of someone's life. A news headline is only one part of what happened.</p><p>At ALBi, we believe community begins when we look beyond the surface. Behind every wish is a real person, and behind every difficult situation, there may be people working to make things better.</p><p>Not every story has a happy ending. Not every challenge has an easy solution. But there are meaningful things happening around us every day that deserve to be noticed.</p></div></div>
            <div className="story-grid">{communityCards.map((card, index) => <article className="story-card" data-reveal style={{ '--delay': `${index * 100}ms` }} key={card.title}><span className="card-number">0{index + 1}</span><h3>{card.title}</h3><p>{card.description}</p></article>)}</div>
            <div className="section-closing" data-reveal><p>The good doesn't have to be exaggerated to matter.</p><a className="action-button action-primary compact-action" href="#get-started" onClick={handlePlaceholderAction}>Get Started</a></div>
          </div>
        </section>

        <section className="ocean-section about-section" id="about" aria-labelledby="about-title">
          <SceneLayers type="about" />
          <div className="section-inner about-inner">
            <div className="section-heading about-heading" data-reveal><p className="eyebrow">About ALBi</p><h2 id="about-title">A different way to see the same world.</h2><p>The world can be difficult, complicated, and sometimes overwhelming. We don't believe pretending otherwise makes it better.</p><p>ALBi is built around a simple idea: people deserve to be seen, meaningful actions deserve attention, and the full story deserves to be told.</p></div>
            <div className="about-copy" data-reveal><p>Through everyday wishes, we want to make it easier for people to help one another in practical, direct ways.</p><p>Through our Feel Good Feed, we want to offer something different from both sensational news coverage and manufactured positivity.</p><p>We don't ignore hardship. We don't rewrite bad news into good news. And we won't tell you how you should feel about what you read.</p><p>Instead, we look for the developments, people, and perspectives that may have been overlooked. Sometimes that's a community coming together after a disaster. Sometimes it's a scientific breakthrough, an unexpected opportunity, or one person quietly helping another.</p><p>And sometimes, a situation really is just difficult. We believe there's value in being honest about that, too.</p><p>We're not here to convince you that everything is wonderful.</p></div>
            <blockquote className="about-emphasis" data-reveal>We're here to help you see more of what's really happening, and leave you to decide what it means.</blockquote>
            <div className="authenticity" data-reveal><h3>Authenticity Above All Else.</h3><p>Real people. Real needs. Real stories. A different perspective.</p></div>
          </div>
        </section>

        <section className="ocean-section faq-section" id="faqs" aria-labelledby="faq-title">
          <SceneLayers type="faq" />
          <div className="section-inner faq-inner">
            <div className="section-heading" data-reveal><p className="eyebrow">FAQs</p><h2 id="faq-title">Questions? Let's talk about it.</h2><p>Whether you're here to lend a hand, ask for one, or explore a different perspective on what's happening in the world, here's a little more about ALBi.</p></div>
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
