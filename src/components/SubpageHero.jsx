import Navbar from './Navbar'

export default function SubpageHero({ eyebrow, title, description, actions = [] }) {
  return (
    <section className="subpage-hero" id="top">
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-orb hero-orb-left"></div>
        <div className="hero-orb hero-orb-right"></div>
        <div className="hero-vignette"></div>
      </div>

      <Navbar />

      <div className="subpage-hero-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="subpage-hero-text">{description}</p>
        {actions.length > 0 && (
          <div className="hero-actions">
            {actions.map((action) => (
              <a
                key={`${action.label}-${action.href}`}
                className={`button ${action.variant === 'secondary' ? 'button-secondary' : 'button-primary'}`}
                href={action.href}
              >
                {action.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
