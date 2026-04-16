import './App.css'
import { VENISON, CUSTOM } from './data/locations'
import useReveal from './hooks/useReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Gallery from './components/Gallery'
import Services from './components/Services'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import CutsGuide from './components/CutsGuide'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {
  useReveal()

  return (
    <main className="page-shell">
      <section className="hero-section" id="top">
        <div className="hero-backdrop" aria-hidden="true">
          <div className="hero-orb hero-orb-left"></div>
          <div className="hero-orb hero-orb-right"></div>
          <div className="hero-vignette"></div>
        </div>

        <Navbar />
        <Hero />
      </section>

      <Marquee />

      <aside className="hero-info-card-wrap" aria-label="Business details">
        <div className="hero-info-card">
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
        </div>
      </aside>

      <div className="reveal">
        <Services />
      </div>

      <div className="reveal">
        <Process />
      </div>

      <div className="reveal">
        <Testimonials />
      </div>

      <div className="reveal">
        <CutsGuide />
      </div>

      <div className="reveal">
        <About />
      </div>

      <Gallery />

      <div className="reveal">
        <Contact />
      </div>

      <Footer />
      <ScrollToTop />
    </main>
  )
}

export default App
