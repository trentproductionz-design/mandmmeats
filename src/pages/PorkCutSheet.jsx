import { useState } from 'react'
import { CUSTOM } from '../data/locations'

const initialForm = {
  customerName: '',
  customerPhone: '',
  farmerName: '',
  hogSize: '',
  chopsPerPackage: '',
  chopThickness: '',
  roasts: '',
  loin: [],
  shoulder: [],
  ribs: '',
  belly: '',
  bellyThickness: '',
  hams: [],
  sausageFlavor: '',
  spiceLevel: '',
  brats: '',
  sausageLinks: '',
  additionalNotes: '',
}

const STEPS = [
  { id: 'customer', label: 'Customer Info' },
  { id: 'cuts1', label: 'Roasts & Loin' },
  { id: 'cuts2', label: 'Belly & Hams' },
  { id: 'specialty', label: 'Specialty Meats' },
]

const PHONE_REGEX = /^[+]?[\d][\d\s().+-]{8,}$/
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrerergn'

function validateStep(step, form) {
  const errors = {}

  if (step === 0) {
    if (!form.customerName.trim())
      errors.customerName = 'Please enter the customer name.'
    if (!form.customerPhone.trim()) {
      errors.customerPhone = 'Please enter a phone number.'
    } else {
      const digits = form.customerPhone.replace(/\D/g, '')
      if (digits.length < 10 || !PHONE_REGEX.test(form.customerPhone)) {
        errors.customerPhone =
          'Please enter a valid phone number (at least 10 digits).'
      }
    }
    if (!form.farmerName.trim())
      errors.farmerName = "Please enter the farmer's name."
    if (!form.hogSize) errors.hogSize = 'Please select half or whole.'
    if (!form.chopsPerPackage)
      errors.chopsPerPackage = 'Please choose chops per package.'
    if (!form.chopThickness)
      errors.chopThickness = 'Please choose a chop thickness.'
  }

  if (step === 1) {
    if (!form.roasts) errors.roasts = 'Please choose an option for Roasts.'
    if (!form.loin.length)
      errors.loin = 'Please select at least one option for Loin.'
    if (!form.ribs) errors.ribs = 'Please choose an option for Ribs.'
  }

  if (step === 2) {
    if (!form.belly) errors.belly = 'Please choose an option for Belly.'
    if (!form.bellyThickness)
      errors.bellyThickness = 'Please choose a bacon/side pork thickness.'
    if (!form.hams.length)
      errors.hams = 'Please select at least one option for Hams.'
    if (!form.sausageFlavor)
      errors.sausageFlavor = 'Please choose a sausage flavor.'
    if (!form.spiceLevel)
      errors.spiceLevel = 'Please choose a spice level.'
  }

  if (step === 3) {
    if (!form.brats) errors.brats = 'Please choose a brats option.'
    if (!form.sausageLinks)
      errors.sausageLinks = 'Please choose a sausage links & patties option.'
  }

  return errors
}

export default function PorkCutSheet({ onBack }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const toggleMulti = (field) => (value) => {
    setForm((prev) => {
      const current = prev[field]
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      }
    })
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const next = (e) => {
    e.preventDefault()
    setSubmitError('')
    const stepErrors = validateStep(step, form)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setErrors({})
    if (step < STEPS.length - 1) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const back = () => {
    if (step > 0) {
      setErrors({})
      setSubmitError('')
      setStep(step - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const backToStart = () => {
    setErrors({})
    setSubmitError('')
    setStep(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearForm = () => {
    if (
      window.confirm(
        'Clear all answers and start over? This cannot be undone.',
      )
    ) {
      setForm(initialForm)
      setErrors({})
      setSubmitError('')
      setStep(0)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const stepErrors = validateStep(step, form)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setErrors({})
    setSubmitError('')
    setIsSubmitting(true)

    try {
      const payload = {
        formType: 'Pork Cut Sheet',
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        farmerName: form.farmerName,
        hogSize: form.hogSize,
        chopsPerPackage: form.chopsPerPackage,
        chopThickness: form.chopThickness,
        roasts: form.roasts,
        loin: form.loin.join(', '),
        shoulder: form.shoulder.length ? form.shoulder.join(', ') : '(none)',
        ribs: form.ribs,
        belly: form.belly,
        bellyThickness: form.bellyThickness,
        hams: form.hams.join(', '),
        sausageFlavor: form.sausageFlavor,
        spiceLevel: form.spiceLevel,
        brats: form.brats,
        sausageLinks: form.sausageLinks,
        additionalNotes: form.additionalNotes || '(none)',
        _subject: `Pork Cut Sheet - ${form.customerName || 'Customer'}`,
      }

      const formspreePromise = fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const sheetsPromise = fetch('/api/sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {})

      const [response] = await Promise.all([formspreePromise, sheetsPromise])
      if (!response.ok) throw new Error('Submission failed')

      setSubmitted(true)
      setForm(initialForm)
      setStep(0)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setSubmitError(
        `We could not send your cut sheet right now. Please try again in a moment or call us at ${CUSTOM.phoneDisplay}.`,
      )
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button type="button" className="cutsheet-back-link" onClick={onBack}>
        ← All cut sheets
      </button>

      {/* Mobile progress bar */}
      <div className="cutsheet-stepper-mobile" aria-hidden="true">
        <span className="cutsheet-stepper-mobile-label">
          Step {step + 1} of {STEPS.length} — {STEPS[step].label}
        </span>
        <div className="cutsheet-stepper-mobile-bar">
          <div
            className="cutsheet-stepper-mobile-fill"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop stepper */}
      <ol className="cutsheet-stepper" aria-label="Form progress">
        {STEPS.map((s, i) => (
          <li
            key={s.id}
            className={`cutsheet-step ${i === step ? 'is-current' : ''} ${
              i < step ? 'is-done' : ''
            }`}
            aria-current={i === step ? 'step' : undefined}
          >
            <span className="cutsheet-step-index">{i + 1}</span>
            <span className="cutsheet-step-label">{s.label}</span>
          </li>
        ))}
      </ol>

      {submitted ? (
        <div className="cutsheet-success">
          <p className="eyebrow">Sent</p>
          <h2>Your cut sheet is on its way.</h2>
          <p>
            Your completed pork cut sheet has been sent successfully. We will
            review it before drop-off. If you need to make a change, call us at{' '}
            <a href={`tel:${CUSTOM.phone}`}>{CUSTOM.phoneDisplay}</a>.
          </p>
        </div>
      ) : (
        <form
          className="cutsheet-form"
          noValidate
          onSubmit={step === STEPS.length - 1 ? handleSubmit : next}
        >
          {Object.keys(errors).length > 0 && (
            <div className="cutsheet-error-summary" role="alert">
              <strong>Please fix the following before continuing:</strong>
              <ul>
                {Object.values(errors).map((msg) => (
                  <li key={msg}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

          {submitError && (
            <div className="cutsheet-error-summary" role="alert">
              <strong>Submission issue:</strong>
              <ul>
                <li>{submitError}</li>
              </ul>
            </div>
          )}

          {/* ── Step 0: Customer Info ── */}
          {step === 0 && (
            <fieldset className="cutsheet-fieldset">
              <legend>Customer Info</legend>
              <p className="cutsheet-fieldset-intro">
                Welcome to M&amp;M. Farm to table is how it should be and we
                are excited to get you some quality cuts. Any unwanted cuts will
                be ground. Multiple options will have the option to be smoked or
                fresh — fresh is the raw cut, smoked goes through a process
                similar to bacon.
              </p>

              <Field
                label="Customer Name"
                required
                error={errors.customerName}
              >
                <input
                  type="text"
                  value={form.customerName}
                  onChange={update('customerName')}
                />
              </Field>

              <Field
                label="Customer Phone Number"
                required
                error={errors.customerPhone}
              >
                <input
                  type="tel"
                  value={form.customerPhone}
                  onChange={update('customerPhone')}
                  placeholder="(989) 906-1617"
                />
              </Field>

              <Field
                label="Farmer's Name"
                required
                error={errors.farmerName}
              >
                <input
                  type="text"
                  value={form.farmerName}
                  onChange={update('farmerName')}
                />
              </Field>

              <RadioGroup
                label="What are you getting?"
                required
                name="hogSize"
                options={['Half', 'Whole']}
                value={form.hogSize}
                onChange={update('hogSize')}
                error={errors.hogSize}
                cols={2}
              />

              <RadioGroup
                label="Number of chops per package"
                required
                name="chopsPerPackage"
                options={[
                  '1/pack (+$5 fee)',
                  '2/pack',
                  '4/pack',
                ]}
                value={form.chopsPerPackage}
                onChange={update('chopsPerPackage')}
                error={errors.chopsPerPackage}
                cols={3}
              />

              <RadioGroup
                label="Chop thickness"
                required
                name="chopThickness"
                options={['3/4 inch', '1 inch', '1 1/4 inch']}
                value={form.chopThickness}
                onChange={update('chopThickness')}
                error={errors.chopThickness}
                cols={3}
              />
            </fieldset>
          )}

          {/* ── Step 1: Roasts & Loin ── */}
          {step === 1 && (
            <fieldset className="cutsheet-fieldset">
              <legend>Roasts &amp; Loin</legend>
              <p className="cutsheet-fieldset-intro">
                Please select the cuts of pork you would like.
              </p>

              <RadioGroup
                label="Roasts"
                required
                name="roasts"
                options={['Yes', 'No', 'Only a couple']}
                value={form.roasts}
                onChange={update('roasts')}
                error={errors.roasts}
                cols={3}
              />

              <CheckboxGroup
                label="Loin"
                required
                help={
                  form.hogSize === 'Whole'
                    ? 'Getting a whole hog — you may choose up to two options.'
                    : 'Select the loin cut you would like.'
                }
                options={[
                  'Bone-in Pork Chops',
                  'Boneless Pork Chops',
                  'Loin Roast',
                  'SMOKED Canadian Bacon ($20/side)',
                  'SMOKED Boneless Chops ($20/side)',
                ]}
                value={form.loin}
                onChange={toggleMulti('loin')}
                error={errors.loin}
              />

              <CheckboxGroup
                label="Shoulder"
                help={
                  form.hogSize === 'Whole'
                    ? 'Getting a whole hog — you may choose up to two options. Cottage Bacon is a smoked shoulder option (+$20/shoulder).'
                    : 'Select a shoulder option. Cottage Bacon is a smoked option (+$20/shoulder).'
                }
                options={[
                  'Shoulder Steaks',
                  'Pork Butt',
                  'Cottage Bacon — Smoked (+$20/shoulder)',
                ]}
                value={form.shoulder}
                onChange={toggleMulti('shoulder')}
                error={errors.shoulder}
              />

              <RadioGroup
                label="Ribs"
                required
                name="ribs"
                options={['Spare Ribs', 'Country Style Ribs']}
                value={form.ribs}
                onChange={update('ribs')}
                error={errors.ribs}
                cols={2}
              />
            </fieldset>
          )}

          {/* ── Step 2: Belly & Hams ── */}
          {step === 2 && (
            <fieldset className="cutsheet-fieldset">
              <legend>Belly &amp; Hams</legend>

              <RadioGroup
                label="Belly"
                required
                name="belly"
                options={['Bacon', 'Side Pork']}
                value={form.belly}
                onChange={update('belly')}
                error={errors.belly}
                cols={2}
              />

              <RadioGroup
                label="Bacon / Side pork thickness"
                required
                name="bellyThickness"
                options={['Thin', 'Medium', 'Thick']}
                value={form.bellyThickness}
                onChange={update('bellyThickness')}
                error={errors.bellyThickness}
                cols={3}
              />

              <CheckboxGroup
                label="Hams"
                required
                help={
                  form.hogSize === 'Whole'
                    ? 'Getting a whole hog — you may choose up to two options.'
                    : 'Select how you would like your ham prepared.'
                }
                options={[
                  'Whole',
                  "Cut into 1/3's (provides 2 smaller hams + smoked ham steaks)",
                  'GRIND — BOTH',
                  'GRIND — ONE',
                ]}
                value={form.hams}
                onChange={toggleMulti('hams')}
                error={errors.hams}
              />

              <RadioGroup
                label="Sausage Flavor — Bulk 1 lb packages"
                required
                name="sausageFlavor"
                options={[
                  'Farm (Breakfast)',
                  'Italian',
                  'Fresh Pork (no seasoning)',
                  'Old Fashion (salt, pepper, sage)',
                ]}
                value={form.sausageFlavor}
                onChange={update('sausageFlavor')}
                error={errors.sausageFlavor}
              />

              <RadioGroup
                label="Spice level"
                required
                name="spiceLevel"
                options={['Mild', 'Medium', 'Spicy']}
                value={form.spiceLevel}
                onChange={update('spiceLevel')}
                error={errors.spiceLevel}
                cols={3}
              />
            </fieldset>
          )}

          {/* ── Step 3: Specialty Meats ── */}
          {step === 3 && (
            <fieldset className="cutsheet-fieldset">
              <legend>Specialty Meats</legend>
              <p className="cutsheet-fieldset-intro">
                10 lb minimum on all specialty items. If you would like multiple
                specialty meat choices, please call us to discuss your options.
              </p>

              <RadioGroup
                label="Brats"
                required
                name="brats"
                options={[
                  'Regular',
                  'Polish',
                  'Italian',
                  'Cheddar',
                  'Jalapeno Cheddar',
                ]}
                value={form.brats}
                onChange={update('brats')}
                error={errors.brats}
              />

              <RadioGroup
                label="Sausage Links &amp; Patties"
                required
                name="sausageLinks"
                options={[
                  'Regular Links ($3/lb)',
                  'Maple Links ($4/lb)',
                  'Regular Patties ($1/lb)',
                  'Maple Patties ($2/lb)',
                ]}
                value={form.sausageLinks}
                onChange={update('sausageLinks')}
                error={errors.sausageLinks}
              />

              <Field label="Additional Notes">
                <textarea
                  rows={5}
                  value={form.additionalNotes}
                  onChange={update('additionalNotes')}
                  placeholder="Anything else we should know"
                />
              </Field>
            </fieldset>
          )}

          <div className="cutsheet-actions">
            <button
              type="button"
              className="cutsheet-clear"
              onClick={clearForm}
            >
              Clear form
            </button>
            <div className="cutsheet-actions-primary">
              {step > 0 && (
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={backToStart}
                >
                  Back to start
                </button>
              )}
              {step > 0 && (
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={back}
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="button button-primary"
                disabled={isSubmitting}
              >
                {step === STEPS.length - 1
                  ? isSubmitting
                    ? 'Submitting...'
                    : 'Submit cut sheet'
                  : 'Continue'}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

function Field({ label, required, help, error, children }) {
  return (
    <label className={`cutsheet-field ${error ? 'has-error' : ''}`}>
      <span className="cutsheet-label">
        {label}
        {required && (
          <span className="cutsheet-required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </span>
      {help && <span className="cutsheet-help">{help}</span>}
      {children}
      {error && <span className="cutsheet-error">{error}</span>}
    </label>
  )
}

function RadioGroup({ label, name, options, value, onChange, required, help, error, cols }) {
  return (
    <div className={`cutsheet-field ${error ? 'has-error' : ''}`}>
      <span className="cutsheet-label">
        {label}
        {required && (
          <span className="cutsheet-required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </span>
      {help && <span className="cutsheet-help">{help}</span>}
      <div className={`cutsheet-options${cols ? ` cutsheet-options--cols-${cols}` : ''}`}>
        {options.map((opt) => (
          <label key={opt} className="cutsheet-radio">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={onChange}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      {error && <span className="cutsheet-error">{error}</span>}
    </div>
  )
}

function CheckboxGroup({ label, options, value, onChange, required, help, error }) {
  return (
    <div className={`cutsheet-field ${error ? 'has-error' : ''}`}>
      <span className="cutsheet-label">
        {label}
        {required && (
          <span className="cutsheet-required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </span>
      {help && <span className="cutsheet-help">{help}</span>}
      <div className="cutsheet-options">
        {options.map((opt) => (
          <label key={opt} className="cutsheet-check">
            <input
              type="checkbox"
              checked={value.includes(opt)}
              onChange={() => onChange(opt)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      {error && <span className="cutsheet-error">{error}</span>}
    </div>
  )
}
