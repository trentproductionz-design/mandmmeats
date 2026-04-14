import { useState, useEffect, useCallback } from 'react'

const photos = [
  { src: '/MeatCutting2000x850.jpg', alt: 'Meat cutting in progress' },
  { src: '/butcher.jpg', alt: 'Butcher at work' },
  { src: '/Meat_processing-01.jpg', alt: 'Meat processing' },
  { src: '/maxresdefault.jpg', alt: 'Quality cuts on display' },
  { src: '/meat-cuts-john-mulls-las-vegas-butchers.jpg-1024x770.jpg', alt: 'Prepared meat cuts' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const total = photos.length

  const close = () => setLightbox(null)
  const next = useCallback(() => setLightbox((i) => (i + 1) % total), [total])
  const prev = useCallback(() => setLightbox((i) => (i - 1 + total) % total), [total])

  useEffect(() => {
    if (lightbox === null) return

    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, next, prev])

  return (
    <>
      <section className="gallery-section" aria-label="Photo gallery">
        <div className="gallery-inner">
          <div className="gallery-heading">
            <p className="eyebrow">Gallery</p>
            <h2>A look inside.</h2>
          </div>

          <div className="gallery-grid">
            {photos.map((photo, i) => (
              <div
                key={photo.src}
                className="gallery-item"
                onClick={() => setLightbox(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setLightbox(i)}
              >
                <img src={photo.src} alt={photo.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div className="lightbox" onClick={close}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={photos[lightbox].src} alt={photos[lightbox].alt} />

            <span className="lightbox-counter">
              {lightbox + 1} / {total}
            </span>
          </div>

          <button className="lightbox-close" onClick={close} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous photo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next photo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
