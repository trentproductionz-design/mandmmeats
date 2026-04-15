import { useState } from 'react'

const initialForm = {
  customerName: '',
  customerPhone: '',
  farmerName: '',
  loin: '',
  shoulder: '',
  leg: '',
  ribs: '',
  stewMeat: '',
  lambShanks: '',
  groundLamb: '',
}

const STEPS = [
  { id: 'customer', label: 'Customer Info' },
  { id: 'cuts', label: 'Custom Cuts' },
]

const PHONE_REGEX = /^[+]?[\d][\d\s().+-]{8,}$/
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mjgjgjkk'

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
  }

  if (step === 1) {
    if (!form.loin) errors.loin = 'Please choose an option for Loin.'
    if (!form.shoulder) errors.shoulder = 'Please choose an option for Shoulder.'
    if (!form.leg) errors.leg = 'Please choose an option for Leg.'
    if (!form.ribs) errors.ribs = 'Please choose an option for Ribs.'
    if (!form.stewMeat) errors.stewMeat = 'Please choose an option for Stew Meat.'
    if (!form.lambShanks) errors.lambShanks = 'Please choose an option for Lamb Shanks.'
    if (!form.groundLamb) errors.groundLamb = 'Please choose an option for Ground Lamb.'
  }

  return errors
}

export default function LambCutSheet({ onBack }) {
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
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'Lamb Cut Sheet',
          customerName: form.customerName,
          customerPhone: form.customerPhone,
          farmerName: form.farmerName,
          loin: form.loin,
          shoulder: form.shoulder,
          leg: form.leg,
          ribs: form.ribs,
          stewMeat: form.stewMeat,
          lambShanks: form.lambShanks,
          groundLamb: form.groundLamb,
          _subject: `Lamb Cut Sheet - ${form.customerName || 'Customer'}`,
        }),
      })

      if (!response.ok) throw new Error('Submission failed')

      setSubmitted(true)
      setForm(initialForm)
      setStep(0)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setSubmitError(
        'We could not send your cut sheet right now. Please try again in a moment or call us at (989) 906-1617.',
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
      <ol className="cutsheet-stepper cutsheet-stepper--2col" aria-label="Form progress">
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
            Your completed lamb cut sheet has been sent successfully. We will
            review it before drop-off. If you need to make a change, call us at{' '}
            <a href="tel:9899061617">(989) 906-1617</a>.
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
                be ground into your ground lamb.
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
            </fieldset>
          )}

          {/* ── Step 1: Custom Cuts ── */}
          {step === 1 && (
            <fieldset className="cutsheet-fieldset">
              <legend>Custom Cuts</legend>
              <p className="cutsheet-fieldset-intro">
                Any unwanted cuts will be ground into your ground lamb.
              </p>

              <RadioGroup
                label="Loin"
                required
                name="loin"
                options={['Lamb Chops', 'Rack of Lamb', 'Grind']}
                value={form.loin}
                onChange={update('loin')}
                error={errors.loin}
                cols={3}
              />

              <RadioGroup
                label="Shoulder"
                required
                name="shoulder"
                options={['Shoulder Steaks', 'Roast', 'Grind']}
                value={form.shoulder}
                onChange={update('shoulder')}
                error={errors.shoulder}
                cols={3}
              />

              <RadioGroup
                label="Leg"
                required
                name="leg"
                options={['Leg of Lamb', 'Steaks', 'Grind']}
                value={form.leg}
                onChange={update('leg')}
                error={errors.leg}
                cols={3}
              />

              <RadioGroup
                label="Ribs"
                required
                name="ribs"
                options={['Lamb Breast Spare Ribs', 'Grind']}
                value={form.ribs}
                onChange={update('ribs')}
                error={errors.ribs}
                cols={2}
              />

              <RadioGroup
                label="Stew Meat"
                required
                name="stewMeat"
                options={['2 lbs', '5 lbs', '10 lbs', 'NONE']}
                value={form.stewMeat}
                onChange={update('stewMeat')}
                error={errors.stewMeat}
                cols={4}
              />

              <RadioGroup
                label="Lamb Shanks"
                required
                name="lambShanks"
                options={['Yes', 'Grind']}
                value={form.lambShanks}
                onChange={update('lambShanks')}
                error={errors.lambShanks}
                cols={2}
              />

              <RadioGroup
                label="Ground Lamb"
                required
                name="groundLamb"
                options={['1 lb packages', '1.5 lb packages', '2 lb packages']}
                value={form.groundLamb}
                onChange={update('groundLamb')}
                error={errors.groundLamb}
                cols={3}
              />
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
