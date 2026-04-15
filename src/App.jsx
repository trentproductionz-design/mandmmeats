import './App.css'
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
          <div className="hero-info-block hero-info-phone">
            <span className="hero-info-label">Call us today</span>
            <a href="tel:9899061617">(989) 906-1617</a>
          </div>
          <div className="hero-info-block">
            <span className="hero-info-label">Location</span>
            <a
              href="https://www.google.com/maps/search/?api=1&query=11285+Schoolcrest+Avenue+Clare+MI+48617"
              target="_blank"
              rel="noopener noreferrer"
            >
              11285 Schoolcrest Avenue
              <br />
              Clare, MI 48617
            </a>
          </div>
          <div className="hero-info-block">
            <span className="hero-info-label">Hours</span>
            <p>Mon – Fri: 8:00 AM – 5:00 PM</p>
            <p className="hero-info-note">Sat by appointment</p>
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
