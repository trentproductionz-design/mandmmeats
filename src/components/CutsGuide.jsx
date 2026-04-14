import { useState } from 'react'

const cutGuides = [
  {
    id: 'cattle',
    label: 'Beef',
    displayName: 'Beef',
    title: 'Beef cut reference',
    image: '/Cattle.png',
    alt: 'Cow cuts diagram showing different beef sections',
    copy:
      'Use this as a quick reference when talking through steaks, roasts, ground, and slower-cooking cuts.',
    cuts: [
      'Chuck',
      'Rib',
      'Short Loin',
      'Sirloin',
      'Rump',
      'Round',
      'Brisket',
      'Fore Shank',
      'Short Plate',
      'Flank',
      'Hind Shank',
    ],
  },
  {
    id: 'pork',
    label: 'Pork',
    displayName: 'Hog',
    title: 'Pork cut reference',
    image: '/Hog.png',
    alt: 'Pork cut sheet guide showing different pork sections',
    copy:
      'Helpful for thinking through chops, bacon, ham, shoulder, sausage, and smoked options before filling out the sheet.',
    cuts: ['Boston Butt', 'Shoulder', 'Loin', 'Ribs', 'Belly', 'Leg'],
  },
  {
    id: 'lamb',
    label: 'Lamb',
    displayName: 'Lamb',
    title: 'Lamb cut reference',
    image: '/Lamb.png',
    alt: 'Lamb cut sheet guide showing different lamb sections',
    copy:
      'A simpler way to understand chops, rack, shoulder, leg, shank, and ground options at a glance.',
    cuts: ['Shoulder', 'Rack', 'Loin', 'Leg', 'Breast', 'Flank', 'Foreshank', 'Hindshank'],
  },
]

export default function CutsGuide() {
  const [activeGuideId, setActiveGuideId] = useState('cattle')

  const activeIndex = cutGuides.findIndex((guide) => guide.id === activeGuideId)
  const resolvedIndex = activeIndex >= 0 ? activeIndex : 0
  const activeGuide = cutGuides[resolvedIndex]
  const leftGuide = cutGuides[(resolvedIndex - 1 + cutGuides.length) % cutGuides.length]
  const rightGuide = cutGuides[(resolvedIndex + 1) % cutGuides.length]

  const displayGuides = [
    { guide: leftGuide, position: 'left' },
    { guide: activeGuide, position: 'center' },
    { guide: rightGuide, position: 'right' },
  ]

  return (
    <section className="cuts-band" id="cuts">
      <div className="content-section cuts-section">
        <div className="section-heading section-heading-wide cuts-intro">
          <p className="eyebrow">Cuts Guide</p>
          <h2>Know your cuts.</h2>
          <p className="section-subhead">
            Compare our beef, hog, and lamb cut diagrams to get familiar with the
            major sections before filling out your cut instructions.
          </p>
        </div>

        <div className="cuts-guide-shell">
          <div className="cuts-visual-stage" aria-label="Cuts guide carousel">
            {displayGuides.map(({ guide, position }) => {
              const isActive = position === 'center'

              return (
                <button
                  key={`${guide.id}-${position}`}
                  type="button"
                  className={`cuts-stage-card cuts-stage-card-${position}${isActive ? ' cuts-stage-card-active' : ''}`}
                  onClick={() => setActiveGuideId(guide.id)}
                  aria-pressed={isActive}
                  aria-label={`Show ${guide.displayName} cut reference`}
                >
                  <span className="cuts-stage-label">
                    {guide.label}
                    <strong>{guide.displayName}</strong>
                  </span>

                  {!isActive ? (
                    <span className="cuts-stage-hint">Click to view</span>
                  ) : null}

                  <img
                    className="cuts-stage-image"
                    src={guide.image}
                    alt={isActive ? guide.alt : ''}
                    aria-hidden={isActive ? undefined : true}
                  />
                </button>
              )
            })}
          </div>

          <div className="cuts-guide-details" key={activeGuide.id}>
            <div className="cuts-guide-heading">
              <p className="eyebrow">{activeGuide.label}</p>
              <h3>{activeGuide.title}</h3>
            </div>

            <div className="cuts-copy">
                <div className="cuts-copy-card">
                  <div className="cuts-copy-meta">
                    <span>{activeGuide.displayName} Guide</span>
                    <span>{activeGuide.cuts.length} common cuts</span>
                  </div>

                  <p className="cuts-copy-lead">{activeGuide.copy}</p>

                </div>

              <div className="cuts-index" aria-label={`${activeGuide.displayName} cut index`}>
                {activeGuide.cuts.map((cut, index) => (
                  <div key={cut} className="cuts-index-row">
                    <span className="cuts-index-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="cuts-index-name">{cut}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
