import { VENISON, CUSTOM } from '../data/locations'

export default function Hero() {
  return (
    <div className="hero-layout">
      <div className="hero-copy">
        <p className="eyebrow">Locally sourced meat for your table.</p>
        <h1>
          QAULITY MEATS,
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
          <span className="panel-label">Beef, Pork &amp; Lamb</span>
          <a href={`tel:${CUSTOM.phone}`}>{CUSTOM.phoneDisplay}</a>
        </div>

        <div className="panel-callout">
          <span className="panel-label">Venison Processing</span>
          <a href={`tel:${VENISON.phone}`}>{VENISON.phoneDisplay}</a>
        </div>

        <div className="panel-services">
          <span className="panel-label">We process</span>
          <p className="panel-services-list">
            Beef <span className="panel-sep">&middot;</span> Pork <span className="panel-sep">&middot;</span> Lamb <span className="panel-sep">&middot;</span> Venison
          </p>
        </div>

        <div className="panel-block">
          <span className="panel-label">Custom Processing</span>
          <a href={CUSTOM.mapsUrl} target="_blank" rel="noopener noreferrer" className="panel-address">
            {CUSTOM.address}<br />{CUSTOM.city}
          </a>
        </div>

        <div className="panel-block panel-block--last">
          <span className="panel-label">Venison Drop-off</span>
          <a href={VENISON.mapsUrl} target="_blank" rel="noopener noreferrer" className="panel-address">
            {VENISON.address}<br />{VENISON.city}
          </a>
        </div>
      </aside>
    </div>
  )
}
