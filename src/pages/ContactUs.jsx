import '../App.css'
import SubpageHero from '../components/SubpageHero'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import { VENISON, CUSTOM } from '../data/locations'

export default function ContactUs() {
  return (
    <main className="page-shell">
      <SubpageHero
        eyebrow="Contact Us"
        title={
          <>
            Reach out with questions,{' '}
            <span className="accent-text">pricing, or scheduling.</span>
          </>
        }
        description="Whether you are planning a freezer order, dropping off an animal, or just need help understanding cut options, we will walk you through the next step clearly."
        actions={[
          { label: 'Custom processing', href: `tel:${CUSTOM.phone}` },
          { label: 'Venison processing', href: `tel:${VENISON.phone}`, variant: 'secondary' },
        ]}
      />

      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
