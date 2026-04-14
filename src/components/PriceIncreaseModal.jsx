import { useEffect, useState } from 'react'

export default function PriceIncreaseModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!open) return null

  const close = () => setOpen(false)

  return (
    <div
      className="price-modal-overlay"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="price-modal-title"
    >
      <div
        className="price-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="price-modal-close"
          onClick={close}
          aria-label="Close notification"
          type="button"
        >
          &times;
        </button>

        <div className="price-modal-image-wrap">
          <img
            className="price-modal-image"
            src="/price-increase-2026.jpg"
            alt="Fresh cuts of meat prepared on a butcher block"
          />
        </div>

        <div className="price-modal-body">
          <h2 id="price-modal-title" className="price-modal-title">PRICE INCREASE</h2>
          <p className="price-modal-text">
            Due to rising costs there will be an upcoming price adjustment for
            custom processing. Get on our 2026 books before{' '}
            <strong>January 1, 2026</strong> to lock in 2025 pricing!
          </p>
        </div>
      </div>
    </div>
  )
}
