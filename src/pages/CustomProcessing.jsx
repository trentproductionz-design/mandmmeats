import '../App.css'
import useReveal from '../hooks/useReveal'
import SubpageHero from '../components/SubpageHero'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import { CUSTOM } from '../data/locations'

const pricing = [
  {
    title: 'Beef',
    kicker: 'Whole, half, or quarter',
    rows: [
      { label: 'Slaughter fee', value: '$120' },
      { label: 'Processing', value: '$0.75 / lb' },
      { label: 'Processing by the 1/4', value: '$15 Surcharge' },
      { label: 'Beef patties', value: '$0.75 / lb' },
    ],
    note:
      'Hanging weight pricing. Cut sheet reviewed in person so you get exactly what you want back.',
  },
  {
    title: 'Pork',
    kicker: 'Whole or half hog',
    rows: [
      { label: 'Slaughter', value: '$80' },
      { label: 'Processing', value: '$0.80 / lb' },
      { label: 'Smoked hams', value: '$24 / side' },
      { label: 'Smoked bacon', value: '$20 / side' },
      { label: 'Smoked cottage bacon', value: '$16 / side' },
    ],
    note:
      'Smoking done in-house. Add any combination of smoked hams, bacon, and cottage bacon to your order.',
  },
  {
    title: 'Lamb',
    kicker: 'Whole lamb',
    rows: [
      { label: 'Slaughter & processing', value: '$150' },
    ],
    note:
      'Straightforward flat pricing for whole lamb, slaughter through packaged cuts.',
  },
]

const includes = [
  {
    title: 'Cut sheet walkthrough',
    copy:
      'We sit down with you at drop-off and go through every option — steaks, roasts, ground, sausage. No guesswork.',
  },
  {
    title: 'Vacuum sealed & labeled',
    copy:
      'Every package is sealed, labeled with the cut, and frozen so it is ready for the deep freeze or the grill.',
  },
  {
    title: 'Honest turnaround',
    copy:
      'We will tell you up front when your order will be ready and call you the moment it is, no chasing required.',
  },
]

export default function CustomProcessing() {
  useReveal()

  return (
    <main className="page-shell">
      <SubpageHero
        eyebrow="Custom Processing"
        title={
          <>
            Farm to table. <span className="accent-text">The way it should be.</span>
          </>
        }
        description="Beef, pork, and lamb processed by skilled butchers with years behind the block. Clear pricing, straightforward scheduling, and cuts you can trust from drop-off to pickup."
        actions={[
          { label: 'Call to schedule', href: `tel:${CUSTOM.phone}` },
          { label: 'See pricing', href: '#pricing', variant: 'secondary' },
        ]}
      />

      <section className="content-section pricing-section" id="pricing">
        <div className="section-heading section-heading-wide">
          <p className="eyebrow">Pricing</p>
          <h2>Custom processing rates.</h2>
          <p className="section-subhead">
            Clear, flat pricing by the species. Final totals depend on hanging
            weight and the cut selections on your sheet.
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
        <Contact loc={CUSTOM} />
      </div>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
