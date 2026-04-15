import '../App.css'
import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import SubpageHero from '../components/SubpageHero'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import BeefCutSheet from './BeefCutSheet'

const ANIMALS = [
  {
    id: 'beef',
    name: 'Beef',
    desc: 'Custom cuts, roasts, burger, organs, and add-ons for your whole, half, or quarter beef.',
    available: true,
  },
  {
    id: 'pork',
    name: 'Pork',
    desc: 'Chops, roasts, hams, and more for your whole or half hog.',
    available: false,
  },
  {
    id: 'lamb',
    name: 'Lamb',
    desc: 'Rack, chops, leg, shoulder, and specialty cuts for your whole or half lamb.',
    available: false,
  },
]

function AnimalSelector({ onSelect }) {
  return (
    <div className="cutsheet-selector">
      <p className="cutsheet-selector-intro">
        Select the animal you are bringing in to get started on your cut sheet.
      </p>
      <div className="cutsheet-animal-grid">
        {ANIMALS.map((animal) => (
          <button
            key={animal.id}
            type="button"
            className={`cutsheet-animal-card${animal.available ? '' : ' is-disabled'}`}
            onClick={animal.available ? () => onSelect(animal.id) : undefined}
            disabled={!animal.available}
          >
            <span className="cutsheet-animal-name">{animal.name}</span>
            <span className="cutsheet-animal-desc">{animal.desc}</span>
            {animal.available ? (
              <span className="cutsheet-animal-cta">Start cut sheet &rarr;</span>
            ) : (
              <span className="cutsheet-animal-badge">Coming Soon</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function CutSheets() {
  useReveal()
  const [selectedAnimal, setSelectedAnimal] = useState(null)

  return (
    <main className="page-shell">
      <SubpageHero
        eyebrow="Cut Sheets"
        title={
          <>
            Fill out your{' '}
            <span className="accent-text">
              {selectedAnimal ? `${selectedAnimal} cut sheet.` : 'cut sheet.'}
            </span>
          </>
        }
        description="Work through your cut sheet online before drop-off so your steaks, roasts, burger, and add-ons are exactly how you want them."
        actions={[
          { label: 'Start cut sheet', href: '#cutsheet-form' },
          {
            label: 'Call with questions',
            href: 'tel:9899061617',
            variant: 'secondary',
          },
        ]}
      />

      <section className="content-section cutsheet-section" id="cutsheet-form">
        <div className="cutsheet-shell">
          {selectedAnimal === 'beef' ? (
            <BeefCutSheet onBack={() => setSelectedAnimal(null)} />
          ) : (
            <AnimalSelector onSelect={setSelectedAnimal} />
          )}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
