export default function Hero() {
  return (
    <div className="hero-layout">
      <div className="hero-copy">
        <p className="eyebrow">Locally sourced meat for your table.</p>
        <h1>
          QUALITY MEATS,
          <br />
          <span className="accent-text accent-text-nowrap">PROCESSED RIGHT.</span>
        </h1>
        <p className="hero-text">
          Bringing you quality processing of beef, pork, lamb and venison is
          our top priority. M&M Meat Processing consists of skilled butchers
          with years of experience in the industry. Our goal is to get you
          cooking whether it be in the kitchen or on the grill with quality
          cuts and product you can trust.
        </p>

        <div className="hero-actions">
          <a className="button button-primary" href="#services">
            Explore services
          </a>
          <a className="button button-secondary" href="#contact">
            Contact M&M
          </a>
        </div>
      </div>

      <aside className="hero-panel" aria-label="Business details">
        <div className="panel-callout">
          <span className="panel-label">Call us today</span>
          <a href="tel:9899061617">(989) 906-1617</a>
        </div>

        <div className="panel-services">
          <span className="panel-label">We process</span>
          <div className="panel-tags">
            <span>| Beef | </span>
            <span>Pork | </span>
            <span>Lamb | </span>
            <span>Venison | </span>
          </div>
        </div>

        <div className="panel-block">
          <span className="panel-label">Location</span>
          <a
            href="https://www.google.com/maps/search/?api=1&query=11285+Schoolcrest+Avenue+Clare+MI+48617"
            target="_blank"
            rel="noopener noreferrer"
            className="panel-address"
          >
            11285 Schoolcrest Avenue
            <br />
            Clare, MI 48617
          </a>
        </div>

        <div className="panel-block">
          <span className="panel-label">Hours</span>
          <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
          <p className="panel-hours-note">Sat by appointment</p>
        </div>
      </aside>
    </div>
  )
}
