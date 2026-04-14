import '../App.css'
import SubpageHero from '../components/SubpageHero'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

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
          { label: 'Call now', href: 'tel:9899061617' },
          { label: 'Send email', href: 'mailto:mandmmeatprocessing@gmail.com', variant: 'secondary' },
        ]}
      />

      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
