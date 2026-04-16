import { useState, useEffect, useCallback } from 'react'

const BEHOLD_ENDPOINT = 'https://feeds.behold.so/pDabnrOECEfTgv9Gwckw'
const INSTAGRAM_URL = 'https://www.instagram.com/mandmprocessing'
const GRID_COUNT = 6

export default function Gallery() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    fetch(BEHOLD_ENDPOINT)
      .then((r) => r.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.posts ?? []
        setPosts(items.slice(0, GRID_COUNT))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const total = posts.length
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

  const getThumb = (post) =>
    post?.sizes?.medium?.mediaUrl ?? post?.mediaUrl ?? ''

  const getLarge = (post) =>
    post?.sizes?.large?.mediaUrl ?? post?.sizes?.medium?.mediaUrl ?? post?.mediaUrl ?? ''

  const getAlt = (post) =>
    post?.prunedCaption?.slice(0, 120) || 'M&M Meat Processing'

  return (
    <>
      <section className="gallery-section" aria-label="Instagram feed">
        <div className="gallery-inner">
          <div className="gallery-heading">
            <p className="eyebrow">Instagram</p>
            <h2>A look inside.</h2>
          </div>

          {loading ? (
            <div className="gallery-loading" aria-label="Loading photos">
              {Array.from({ length: GRID_COUNT }).map((_, i) => (
                <div key={i} className="gallery-skeleton" />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="gallery-grid">
              {posts.map((post, i) => (
                <div
                  key={post.id ?? i}
                  className="gallery-item"
                  onClick={() => setLightbox(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setLightbox(i)}
                  aria-label={`View photo ${i + 1}`}
                >
                  <img src={getThumb(post)} alt={getAlt(post)} loading="lazy" />
                </div>
              ))}
            </div>
          ) : null}

          <div className="gallery-cta">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary"
            >
              Follow us on Instagram
            </a>
          </div>
        </div>
      </section>

      {lightbox !== null && posts[lightbox] && (
        <div className="lightbox" onClick={close}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={getLarge(posts[lightbox])} alt={getAlt(posts[lightbox])} />

            <a
              href={posts[lightbox].permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="lightbox-instagram"
              onClick={(e) => e.stopPropagation()}
              aria-label="View on Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

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
