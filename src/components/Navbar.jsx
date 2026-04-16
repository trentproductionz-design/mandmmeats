import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/custom-processing', label: 'Custom Processing' },
  { to: '/venison-processing', label: 'Venison Processing' },
  { to: '/cut-sheets', label: 'Cut Sheets' },
  { to: '/contact-us', label: 'Contact Us' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="topbar">
      <NavLink className="brand-mark" to="/" end onClick={closeMenu}>
        <img className="brand-logo" src="/logo.png" alt="M&M Meat Processing logo" />
        <span className="brand-copy">
          <strong>M&M Meat Processing</strong>
          <small>Clare, Michigan</small>
        </span>
      </NavLink>

      <button
        className={`hamburger ${menuOpen ? 'hamburger-open' : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      <nav className="topnav" aria-label="Primary">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            className={({ isActive }) => (isActive ? 'nav-active' : undefined)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div
        className={`mobile-overlay ${menuOpen ? 'mobile-overlay-open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <nav
        id="mobile-nav"
        className={`mobile-nav ${menuOpen ? 'mobile-nav-open' : ''}`}
        aria-label="Mobile navigation"
      >
        <div className="mobile-nav-head">
          <span className="mobile-nav-kicker">Menu</span>
        </div>

        <div className="mobile-nav-links">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? 'nav-active' : undefined)}
          >
            {item.label}
          </NavLink>
        ))}
        </div>

        <div className="mobile-nav-footer">
        <a className="mobile-nav-phone" href="tel:9899061617">
          (989) 906-1617
        </a>
          <a
            className="mobile-nav-email"
            href="mailto:mandmmeatprocessing@gmail.com"
          >
            mandmmeatprocessing@gmail.com
          </a>
        </div>
      </nav>
    </header>
  )
}
