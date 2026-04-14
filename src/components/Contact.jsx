const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=11285+Schoolcrest+Avenue+Clare+MI+48617'

const MAPS_EMBED_URL =
  'https://www.google.com/maps?q=11285+Schoolcrest+Avenue+Clare+MI+48617&output=embed'

export default function Contact() {
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
            <a className="button button-primary" href="tel:9899061617">
              Call now
            </a>
            <a className="button button-secondary" href="mailto:mandmmeatprocessing@gmail.com">
              Send email
            </a>
          </div>

          <dl className="contact-facts">
            <div className="contact-fact">
              <dt>Phone</dt>
              <dd>
                <a href="tel:9899061617">(989) 906-1617</a>
                <span>Call for scheduling and questions</span>
              </dd>
            </div>
            <div className="contact-fact">
              <dt>Email</dt>
              <dd>
                <a href="mailto:mandmmeatprocessing@gmail.com">
                  mandmmeatprocessing@gmail.com
                </a>
                <span>Send details any time</span>
              </dd>
            </div>
            <div className="contact-fact">
              <dt>Location</dt>
              <dd>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  11285 Schoolcrest Avenue, Clare, MI 48617
                </a>
                <span>Open in maps</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="contact-details">
          <a
            className="contact-map"
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open location in Google Maps"
          >
            <iframe
              title="Map showing M&M Meat Processing in Clare, Michigan"
              src={MAPS_EMBED_URL}
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
