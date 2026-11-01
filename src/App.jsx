import { useState } from 'react'
import phonesImage from './assets/phones-transparent.png'
import formulaImage from './assets/formula.png'
import diapersImage from './assets/diapers.png'
import groceriesImage from './assets/groceries.png'
import schoolSuppliesImage from './assets/school-supplies.png'
import petFoodImage from './assets/pet-food.png'

const navItems = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Community', href: '#categories' },
  { label: 'About', href: '#about' },
  { label: 'FAQs', href: '#faqs' },
]

const categoryItems = [
  { label: 'Baby Formula', image: formulaImage },
  { label: 'Diapers', image: diapersImage },
  { label: 'Groceries', image: groceriesImage },
  { label: 'School Supplies', image: schoolSuppliesImage },
  { label: 'Pet Food', image: petFoodImage },
  { label: 'Bill Help', note: 'Coming Soon', icon: 'home' },
]

function HeartIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 28.1 4.7 17.3C-2.1 10.8 7.7.1 16 8.4 24.3.1 34.1 10.8 27.3 17.3L16 28.1Z" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="13.5" />
      <path d="M16 9v14M9 16h14" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path d="m5 19 15-13 15 13" />
      <path d="M9 17v17h9V23h5v11h8V17" />
    </svg>
  )
}

function WishIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M13 11h30v24l-13 13H13Z" />
      <path d="M21 20h14M21 27h10M39 35l8-8 6 6-14 14-8 2 2-8Z" />
    </svg>
  )
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M10 27h44v27H10ZM7 20h50v10H7ZM32 20v34" />
      <path d="M31 20H18c-9 0-8-12-1-12 8 0 14 12 14 12Zm2 0h13c9 0 8-12 1-12-8 0-14 12-14 12Z" />
    </svg>
  )
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M7 14h31v31H7ZM38 25h10l9 10v10H38Z" />
      <circle cx="19" cy="48" r="6" />
      <circle cx="48" cy="48" r="6" />
      <path d="M42 29h5l6 7H42Z" />
    </svg>
  )
}

const steps = [
  {
    title: 'Post a Wish',
    description: 'People share specific items they need.',
    Icon: WishIcon,
  },
  {
    title: 'Someone Gives',
    description: 'Generous people fulfill wishes by purchasing the items.',
    Icon: GiftIcon,
  },
  {
    title: 'Delivered to Your Door',
    description: 'Items are ordered and shipped directly, like from Amazon.',
    Icon: TruckIcon,
  },
]

function Brand() {
  return (
    <span className="brand-word" aria-label="ALBi">
      <span className="brand-heavy">ALB</span>i<span className="brand-cursor" />
    </span>
  )
}

function CategoryCard({ item }) {
  return (
    <a className="category-card" href="#get-started">
      <span className="category-media">
        {item.image ? (
          <img src={item.image} alt="" loading="lazy" />
        ) : (
          <HomeIcon />
        )}
      </span>
      <span className="category-label">
        <span>{item.label}</span>
        {item.note && <small>{item.note}</small>}
      </span>
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <main className="site-shell" id="top">
      <section className="landing" aria-labelledby="page-title">
        <header className="site-header">
          <a className="brand-link" href="#top" onClick={closeMenu}>
            <Brand />
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="primary-menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
            <span />
          </button>

          <div
            className="nav-panel"
            id="primary-menu"
            data-open={menuOpen ? 'true' : 'false'}
          >
            <nav className="primary-nav" aria-label="Primary navigation">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="account-actions">
              <a className="sign-in-link" href="#sign-in" onClick={closeMenu}>
                Sign In
              </a>
              <a className="header-cta" href="#get-started" onClick={closeMenu}>
                Get Started
              </a>
            </div>
          </div>
        </header>

        <section className="hero-layout">
          <div className="hero-heading">
            <h1 id="page-title">
              <span>Wish for what you need.</span>
              <span className="accent-text">Give what you can.</span>
            </h1>
          </div>

          <div className="hero-description">
            <p>
              ALBi connects real people with real needs. People post specific
              items like formula, diapers, groceries, school supplies, and pet
              supplies—and generous people help fulfill those wishes. Items are
              ordered and delivered directly, like from Amazon.
            </p>
          </div>

          <div className="hero-actions" id="get-started">
            <a className="action-button action-primary" href="#categories">
              <span className="action-icon heart-icon">
                <HeartIcon />
              </span>
              <span>Start Giving</span>
            </a>
            <a className="action-button action-secondary" href="#make-a-wish">
              <span className="action-icon plus-icon">
                <PlusIcon />
              </span>
              <span>Make a Wish</span>
            </a>
          </div>

          <div className="hero-visual" aria-label="Preview of the ALBi mobile app">
            <picture>
              <img
                src={phonesImage}
                alt="Three ALBi app screens showing the community feed, a wish, and the inbox"
                width="1445"
                height="1088"
              />
            </picture>
            <div className="carousel-dots" aria-hidden="true">
              <span />
              <span className="is-active" />
              <span />
            </div>
          </div>
        </section>

        <section className="categories" id="categories" aria-labelledby="categories-title">
          <h2 className="sr-only" id="categories-title">
            Browse wish categories
          </h2>
          <div className="category-list">
            {categoryItems.map((item) => (
              <CategoryCard key={item.label} item={item} />
            ))}
          </div>
        </section>
      </section>

      <section className="how-it-works" id="how-it-works" aria-labelledby="how-title">
        <div className="how-inner">
          <h2 id="how-title">How It Works</h2>
          <ol className="step-list">
            {steps.map(({ title, description, Icon }, index) => (
              <li className="step-card" key={title}>
                <span className={`step-icon step-icon-${index + 1}`}>
                  <Icon />
                </span>
                <span className="step-number">{index + 1}</span>
                <span className="step-copy">
                  <strong>{title}</strong>
                  <span>{description}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="future-anchor" id="about" aria-hidden="true" />
      <div className="future-anchor" id="faqs" aria-hidden="true" />
      <div className="future-anchor" id="sign-in" aria-hidden="true" />
      <div className="future-anchor" id="make-a-wish" aria-hidden="true" />
    </main>
  )
}

export default App
