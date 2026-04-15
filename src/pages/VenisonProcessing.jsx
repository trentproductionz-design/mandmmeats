import '../App.css'
import useReveal from '../hooks/useReveal'
import SubpageHero from '../components/SubpageHero'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import { VENISON } from '../data/locations'

const pricing = [
  {
    title: 'Standard',
    kicker: 'Steaks, roasts & ground',
    rows: [
      { label: 'Standard processing', value: '$150' },
      { label: 'Add beef or pork fat to ground', value: '$5 / lb' },
      { label: 'Cape processing', value: '$50' },
    ],
    note:
      'Steaks, roasts, and ground venison cut, wrapped, and labeled. Add fat to your ground for better texture on the grill or in the pan.',
  },
  {
    title: 'Sausage',
    kicker: 'Summer sausage & breakfast',
    rows: [
      { label: 'Summer sausage (regular)', value: '$8 / lb' },
      { label: 'Summer sausage (flavored)', value: '$9.50 / lb' },
      { label: 'Breakfast sausage (pork added)', value: '$4 / lb' },
    ],
    note:
      'Summer sausage is made in 1 lb logs. Flavored options include jalapeño, cheese, and BBQ. 10 lb minimum on specialty products.',
  },
  {
    title: 'Snack Sticks',
    kicker: 'Hunter sticks',
    rows: [
      { label: 'Hunter sticks (regular)', value: '$11.50 / lb' },
      { label: 'Hunter sticks (flavored)', value: '$11.50 / lb' },
    ],
    note:
      'Regular and flavored varieties available. Great for the cooler, the truck, or the blind. 10 lb minimum on specialty products.',
  },
]

const includes = [
  {
    title: 'Your deer, your meat',
    copy:
      'Every deer is tagged with your name and license number at drop-off. The deer you bring in is the meat you take home.',
  },
  {
    title: 'Specialty options on request',
    copy:
      'Summer sausage, hunter sticks, and breakfast sausage available with a 10 lb minimum. We will walk you through the flavors at drop-off.',
  },
  {
    title: 'Built for hunting season',
    copy:
      'Season moves fast. We keep drop-off simple, turnaround honest, and pickup organized so you can get back out there.',
  },
]

export default function VenisonProcessing() {
  useReveal()

  return (
    <main className="page-shell">
      <SubpageHero
        eyebrow="Venison Processing"
        title={
          <>
            This side of the butcher block is for{' '}
            <span className="accent-text">the outdoorsman.</span>
          </>
        }
        description="Quality venison processing with standard cuts and specialty products for hunting season. Drop-off is straightforward, pricing is clear, and your order is handled with care."
        actions={[
          { label: 'Call to schedule', href: 'tel:9899061617' },
          { label: 'See pricing', href: '#pricing', variant: 'secondary' },
        ]}
      />

      <section className="content-section pricing-section" id="pricing">
        <div className="section-heading section-heading-wide">
          <p className="eyebrow">Pricing</p>
          <h2>Venison processing rates.</h2>
          <p className="section-subhead">
            Flat pricing for standard processing and clear per-pound rates on
            specialty products. Specialty items have a 10 lb minimum.
          </p>
        </div>

        <div className="pricing-grid">
          {pricing.map((card) => (
            <article key={card.title} className="pricing-card reveal">
              <span className="service-kicker">{card.kicker}</span>
              <h3>{card.title}</h3>

              <ul className="pricing-rows">
                {card.rows.map((row) => (
                  <li key={row.label}>
                    <span className="pricing-row-label">{row.label}</span>
                    <span className="pricing-row-dots" aria-hidden="true" />
                    <span className="pricing-row-value">{row.value}</span>
                  </li>
                ))}
              </ul>

              <p className="pricing-note">{card.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section pricing-includes-section">
        <div className="section-heading section-heading-wide">
          <p className="eyebrow">What's included</p>
          <h2>More than the price on the page.</h2>
        </div>

        <div className="pricing-includes-grid">
          {includes.map((item) => (
            <article key={item.title} className="pricing-include-card reveal">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="reveal">
        <Contact loc={VENISON} />
      </div>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
