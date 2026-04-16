import { Link } from 'react-router-dom'
import { VENISON, CUSTOM } from '../data/locations'

const hours = [
  { day: 'Monday', time: '8:00 AM – 5:00 PM' },
  { day: 'Tuesday', time: '8:00 AM – 5:00 PM' },
  { day: 'Wednesday', time: '8:00 AM – 5:00 PM' },
  { day: 'Thursday', time: '8:00 AM – 5:00 PM' },
  { day: 'Friday', time: '8:00 AM – 5:00 PM' },
  { day: 'Saturday', time: 'By Appointment' },
  { day: 'Sunday', time: 'Closed' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link className="brand-mark" to="/">
            <img className="brand-logo" src="/logo.png" alt="M&M Meat Processing logo" />
            <span className="brand-copy">
              <strong>M&M Meat Processing</strong>
              <small>Clare, Michigan</small>
            </span>
          </Link>
          <p className="footer-tagline">
            Quality processing of beef, pork, lamb and venison from a local
            business you can trust.
          </p>
        </div>

        <div className="footer-hours">
          <h4>Hours of Operation</h4>
          <dl className="hours-list">
            {hours.map(({ day, time }) => (
              <div key={day} className="hours-row">
                <dt>{day}</dt>
                <dd>{time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <nav aria-label="Footer">
            <Link to="/">Home</Link>
            <Link to="/custom-processing">Custom Processing</Link>
            <Link to="/venison-processing">Venison Processing</Link>
            <Link to="/cut-sheets">Cut Sheets</Link>
            <Link to="/contact-us">Contact Us</Link>
          </nav>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>

          <div className="footer-location">
            <span className="footer-location-label">{VENISON.label}</span>
            <a href={`tel:${VENISON.phone}`}>{VENISON.phoneDisplay}</a>
            <a href={VENISON.mapsUrl} target="_blank" rel="noopener noreferrer">
              {VENISON.address}<br />{VENISON.city}
            </a>
          </div>

          <div className="footer-location">
            <span className="footer-location-label">{CUSTOM.label}</span>
            <a href={`tel:${CUSTOM.phone}`}>{CUSTOM.phoneDisplay}</a>
            <a href={CUSTOM.mapsUrl} target="_blank" rel="noopener noreferrer">
              {CUSTOM.address}<br />{CUSTOM.city}
            </a>
          </div>

          <a href={`mailto:${VENISON.email}`} className="footer-email">
            {VENISON.email}
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} M&M Meat Processing. All rights reserved.</p>
      </div>
    </footer>
  )
}
