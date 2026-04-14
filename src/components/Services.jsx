import { Link } from 'react-router-dom'

const serviceCategories = [
  {
    title: 'Custom Processing',
    description:
      'Beef, pork, and lamb processing with clear cut guidance and practical communication from drop-off to pickup.',
    to: '/custom-processing',
  },
  {
    title: 'Venison Processing',
    description:
      'Straightforward wild game processing with specialty options and handling hunters can feel confident about.',
    to: '/venison-processing',
  },
]

export default function Services() {
  return (
    <section className="content-section services-section" id="services">
      <div className="section-heading section-heading-wide">
        <p className="eyebrow">Services</p>
        <h2>What we do.</h2>
      </div>

      <div className="service-rail">
        {serviceCategories.map((item) => (
          <article key={item.title} className="service-card">
            <span className="service-kicker">Service</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <Link className="text-link" to={item.to}>
              Learn more
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
