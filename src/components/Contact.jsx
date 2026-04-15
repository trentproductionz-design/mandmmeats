import { VENISON, CUSTOM } from '../data/locations'

// When loc is provided: single-location layout with map (subpages).
// When loc is omitted: dual-location layout without map (homepage).
export default function Contact({ loc }) {
  if (loc) return <SingleContact loc={loc} />
  return <DualContact />
}

function SingleContact({ loc }) {
  return (
    <section className="content-section contact-section" id="contact">
      <div className="contact-card">
        <div className="contact-intro">
          <p className="eyebrow">Get in touch</p>
          <h2>Ready to get started?</h2>
          <p className="contact-copy">
            Give us a call or send an email to get on the schedule. Whether you
            have questions about processing, cuts, or pricing, we are happy to
            walk you through it.
          </p>

          <div className="contact-actions">
            <a className="button button-primary" href={`tel:${loc.phone}`}>
              Call now
            </a>
            <a
              className="button button-secondary"
              href={`mailto:${loc.email}`}
            >
              Send email
            </a>
          </div>

          <dl className="contact-facts">
            <div className="contact-fact">
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${loc.phone}`}>{loc.phoneDisplay}</a>
                <span>Call for scheduling and questions</span>
              </dd>
            </div>
            <div className="contact-fact">
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${loc.email}`}>{loc.email}</a>
                <span>Send details any time</span>
              </dd>
            </div>
            <div className="contact-fact">
              <dt>Location</dt>
              <dd>
                <a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {loc.address}, {loc.city}
                </a>
                <span>Open in maps</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="contact-details">
          <a
            className="contact-map"
            href={loc.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open location in Google Maps"
          >
            <iframe
              title={`Map showing M&M Meat Processing at ${loc.address}`}
              src={loc.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <span className="contact-map-overlay">
              <span className="contact-map-pill">Open in Google Maps</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

function DualContact() {
  return (
    <section className="content-section contact-section" id="contact">
      <div className="contact-card contact-card--dual">
        <div className="contact-intro">
          <p className="eyebrow">Get in touch</p>
          <h2>Ready to get started?</h2>
          <p className="contact-copy">
            We operate two locations in Clare — one for venison during hunting
            season and one for beef, pork, and lamb year-round. Give us a call
            at the right number below and we will get you on the schedule.
          </p>
        </div>

        <div className="contact-locations">
          {[VENISON, CUSTOM].map((loc) => (
            <div key={loc.phone} className="contact-location">
              <h3 className="contact-location-label">{loc.label}</h3>
              <dl className="contact-facts">
                <div className="contact-fact">
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:${loc.phone}`}>{loc.phoneDisplay}</a>
                  </dd>
                </div>
                <div className="contact-fact">
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${loc.email}`}>{loc.email}</a>
                  </dd>
                </div>
                <div className="contact-fact">
                  <dt>Location</dt>
                  <dd>
                    <a
                      href={loc.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {loc.address}
                      <br />
                      {loc.city}
                    </a>
                    <span>Open in maps</span>
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
