import '../App.css'
import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import SubpageHero from '../components/SubpageHero'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const initialForm = {
  customerName: '',
  customerPhone: '',
  farmerName: '',
  beefSize: '',
  steaksPerPackage: '1/package',
  steakThickness: '1 Inch',
  roastSize: '',
  ribeyes: '',
  loin: '',
  roasts: '',
  sirloin: '',
  sirloinTip: '',
  roundSteak: '',
  roundCubed: '',
  shortRibs: '',
  stewMeat: '',
  flank: '',
  triTip: '',
  brisket: '',
  soupBones: '',
  burger: '',
  patties: '',
  pattiesOther: '',
  organs: [],
  specialInstructions: '',
}

const STEPS = [
  { id: 'customer', label: 'Customer Info' },
  { id: 'roast', label: 'Roast Size' },
  { id: 'cuts', label: 'Custom Cuts' },
  { id: 'addons', label: 'Add Ons' },
  { id: 'organs', label: 'Organs & Notes' },
]

const PHONE_REGEX = /^[+]?[\d][\d\s().+-]{8,}$/

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
    if (!form.beefSize)
      errors.beefSize = 'Please select a beef size.'
    if (!form.steaksPerPackage)
      errors.steaksPerPackage = 'Please choose steaks per package.'
    if (!form.steakThickness)
      errors.steakThickness = 'Please choose a steak thickness.'
  }
  if (step === 1) {
    if (!form.roastSize)
      errors.roastSize = 'Please choose a roast size.'
  }
  if (step === 2) {
    const cutFields = [
      ['ribeyes', 'Ribeyes'],
      ['loin', 'Loin'],
      ['roasts', 'Roasts'],
      ['sirloin', 'Sirloin'],
      ['sirloinTip', 'Sirloin Tip'],
      ['roundSteak', 'Round Steak'],
      ['roundCubed', 'Round Steak cubed amount'],
      ['shortRibs', 'Short Ribs'],
      ['stewMeat', 'Stew Meat'],
      ['flank', 'Flank'],
      ['triTip', 'Tri Tip'],
      ['brisket', 'Brisket'],
      ['soupBones', 'Soup Bones'],
      ['burger', 'Burger'],
    ]
    cutFields.forEach(([key, label]) => {
      if (!form[key]) errors[key] = `Please choose an option for ${label}.`
    })
  }
  if (step === 3) {
    if (!form.patties)
      errors.patties = 'Please choose a patties option.'
  }
  if (step === 4) {
    if (!form.organs.length)
      errors.organs = 'Please select at least one organ option.'
  }
  return errors
}

export default function CutSheets() {
  useReveal()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

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

  const toggleOrgan = (value) => {
    setForm((prev) => {
      if (value === 'NONE') return { ...prev, organs: ['NONE'] }
      const without = prev.organs.filter((o) => o !== 'NONE')
      return without.includes(value)
        ? { ...prev, organs: without.filter((o) => o !== value) }
        : { ...prev, organs: [...without, value] }
    })
    if (errors.organs) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next.organs
        return next
      })
    }
  }

  const next = (e) => {
    e.preventDefault()
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
      setStep(step - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const backToStart = () => {
    setErrors({})
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
      setStep(0)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const stepErrors = validateStep(step, form)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setErrors({})
    const lines = [
      `Customer Name: ${form.customerName}`,
      `Customer Phone: ${form.customerPhone}`,
      `Farmer's Name: ${form.farmerName}`,
      '',
      `Beef Size: ${form.beefSize}`,
      `Steaks Per Package: ${form.steaksPerPackage}`,
      `Steak Thickness: ${form.steakThickness}`,
      `Roast Size: ${form.roastSize}`,
      '',
      '-- Custom Cuts --',
      `Ribeyes: ${form.ribeyes}`,
      `Loin: ${form.loin}`,
      `Roasts: ${form.roasts}`,
      `Sirloin: ${form.sirloin}`,
      `Sirloin Tip: ${form.sirloinTip}`,
      `Round Steak: ${form.roundSteak}`,
      `Round Steak Cubed: ${form.roundCubed}`,
      `Short Ribs: ${form.shortRibs}`,
      `Stew Meat: ${form.stewMeat}`,
      `Flank: ${form.flank}`,
      `Tri Tip: ${form.triTip}`,
      `Brisket: ${form.brisket}`,
      `Soup Bones: ${form.soupBones}`,
      `Burger: ${form.burger}`,
      '',
      '-- Add Ons --',
      `Beef Patties: ${form.patties}`,
      form.pattiesOther ? `Other: ${form.pattiesOther}` : null,
      '',
      '-- Organs --',
      `Organs: ${form.organs.join(', ')}`,
      '',
      '-- Special Instructions --',
      form.specialInstructions || '(none)',
    ]
      .filter(Boolean)
      .join('\n')

    const subject = `Cut Sheet — ${form.customerName || 'Customer'}`
    const mailto = `mailto:mandmmeatprocessing@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines)}`
    window.location.href = mailto
    setSubmitted(true)
  }

  return (
    <main className="page-shell">
      <SubpageHero
        eyebrow="Cut Sheets"
        title={
          <>
            Fill out your <span className="accent-text">beef cut sheet.</span>
          </>
        }
        description="Work through your beef cut sheet online before drop-off so your steaks, roasts, burger, and add-ons are exactly how you want them."
        actions={[
          { label: 'Start cut sheet', href: '#cutsheet-form' },
          { label: 'Call with questions', href: 'tel:9899061617', variant: 'secondary' },
        ]}
      />

      <section className="content-section cutsheet-section" id="cutsheet-form">
        <div className="cutsheet-shell">
          <ol className="cutsheet-stepper" aria-label="Form progress">
            {STEPS.map((s, i) => (
              <li
                key={s.id}
                className={`cutsheet-step ${
                  i === step ? 'is-current' : ''
                } ${i < step ? 'is-done' : ''}`}
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
                Your email client should have opened with your completed sheet.
                Send it through and we will confirm at drop-off. If nothing
                opened, call us at{' '}
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

              {step === 0 && (
                <fieldset className="cutsheet-fieldset">
                  <legend>Customer Info</legend>

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
                    label="Select your size of beef"
                    required
                    name="beefSize"
                    options={['Whole', 'Half', 'Quarter']}
                    value={form.beefSize}
                    onChange={update('beefSize')}
                    error={errors.beefSize}
                  />

                  <Field
                    label="Number of steaks per package"
                    help="Choosing 1/package will add a $10 fee to processing."
                    required
                    error={errors.steaksPerPackage}
                  >
                    <select
                      value={form.steaksPerPackage}
                      onChange={update('steaksPerPackage')}
                    >
                      <option value="1/package">1 / package (+$10 fee)</option>
                      <option value="2/package">2 / package</option>
                    </select>
                  </Field>

                  <Field
                    label="Steak Thickness"
                    required
                    error={errors.steakThickness}
                  >
                    <select
                      value={form.steakThickness}
                      onChange={update('steakThickness')}
                    >
                      <option>3/4 Inch</option>
                      <option>1 Inch</option>
                      <option>1.25 Inches</option>
                      <option>1.5 Inches</option>
                      <option>1.75 Inches</option>
                    </select>
                  </Field>
                </fieldset>
              )}

              {step === 1 && (
                <fieldset className="cutsheet-fieldset">
                  <legend>Roast Size</legend>
                  <p className="cutsheet-fieldset-intro">
                    You will be given the maximum number of roasts for each
                    option. If you prefer to not add roasts, these cuts will be
                    ground into your burger.
                  </p>

                  <RadioGroup
                    label="Roast Size"
                    required
                    name="roastSize"
                    help="Please select the roast size that best suits your family or cooking preferences."
                    options={['2.5-3lb roasts', '3.5-5lb roasts', 'Grind roasts']}
                    value={form.roastSize}
                    onChange={update('roastSize')}
                    error={errors.roastSize}
                  />
                </fieldset>
              )}

              {step === 2 && (
                <fieldset className="cutsheet-fieldset">
                  <legend>Custom Cuts</legend>
                  <p className="cutsheet-fieldset-intro">
                    Please select the cuts you would like from your beef.
                  </p>

                  <RadioGroup
                    label="Ribeyes"
                    required
                    name="ribeyes"
                    options={[
                      'Bone-in steak',
                      'Bone-out steak',
                      'Bone-in ROAST',
                      'Bone-out ROAST',
                      'Grind into burger',
                    ]}
                    value={form.ribeyes}
                    onChange={update('ribeyes')}
                    error={errors.ribeyes}
                  />

                  <RadioGroup
                    label="Loin"
                    required
                    name="loin"
                    help="T-bone and porter house are the bone-in options of the loin. New York strip and filet are the boneless options of the loin."
                    options={[
                      'T-Bone and Porter house',
                      'New York Strip and Filet',
                      'Grind into burger',
                    ]}
                    value={form.loin}
                    onChange={update('loin')}
                    error={errors.loin}
                  />

                  <RadioGroup
                    label="Roasts"
                    required
                    name="roasts"
                    help="Roasts that are not selected will be ground into your burger."
                    options={[
                      'Chuck Roast',
                      'English Roast',
                      'Rolled Rump Roast',
                      'Grind all into burger',
                    ]}
                    value={form.roasts}
                    onChange={update('roasts')}
                    error={errors.roasts}
                  />

                  <RadioGroup
                    label="Sirloin"
                    required
                    name="sirloin"
                    options={['Sirloin Steak (bone-in)', 'Grind into burger']}
                    value={form.sirloin}
                    onChange={update('sirloin')}
                    error={errors.sirloin}
                  />

                  <RadioGroup
                    label="Sirloin Tip"
                    required
                    name="sirloinTip"
                    options={[
                      'Boneless sirloin steaks',
                      'Tip roast',
                      'Grind into burger',
                    ]}
                    value={form.sirloinTip}
                    onChange={update('sirloinTip')}
                    error={errors.sirloinTip}
                  />

                  <RadioGroup
                    label="Round Steak"
                    required
                    name="roundSteak"
                    options={[
                      'Whole (Bone-in)',
                      'Cut in 1/2 (Boneless)',
                      'Grind into burger',
                    ]}
                    value={form.roundSteak}
                    onChange={update('roundSteak')}
                    error={errors.roundSteak}
                  />

                  <RadioGroup
                    label="Round Steaks Cubed"
                    required
                    name="roundCubed"
                    help="If round steaks were selected above, how many (if any) would you like cubed? This option is only available if receiving boneless round steak."
                    options={['All cubed', 'Half cubed', 'NONE']}
                    value={form.roundCubed}
                    onChange={update('roundCubed')}
                    error={errors.roundCubed}
                  />

                  <RadioGroup
                    label="Short Ribs"
                    required
                    name="shortRibs"
                    options={['Yes', 'Grind into burger']}
                    value={form.shortRibs}
                    onChange={update('shortRibs')}
                    error={errors.shortRibs}
                  />

                  <RadioGroup
                    label="Stew Meat"
                    required
                    name="stewMeat"
                    options={['5 LBS', '10 LBS', 'Grind']}
                    value={form.stewMeat}
                    onChange={update('stewMeat')}
                    error={errors.stewMeat}
                  />

                  <RadioGroup
                    label="Flank"
                    required
                    name="flank"
                    options={['Yes', 'Grind into burger']}
                    value={form.flank}
                    onChange={update('flank')}
                    error={errors.flank}
                  />

                  <RadioGroup
                    label="Tri Tip"
                    required
                    name="triTip"
                    options={['Yes', 'Grind into burger']}
                    value={form.triTip}
                    onChange={update('triTip')}
                    error={errors.triTip}
                  />

                  <RadioGroup
                    label="Brisket"
                    required
                    name="brisket"
                    options={['Yes', 'Grind into burger']}
                    value={form.brisket}
                    onChange={update('brisket')}
                    error={errors.brisket}
                  />

                  <RadioGroup
                    label="Soup Bones"
                    required
                    name="soupBones"
                    options={['Yes', 'No']}
                    value={form.soupBones}
                    onChange={update('soupBones')}
                    error={errors.soupBones}
                  />

                  <RadioGroup
                    label="Burger"
                    required
                    name="burger"
                    options={[
                      '1 LB Packages',
                      '1.5 LB Packages',
                      '2 LB Packages',
                    ]}
                    value={form.burger}
                    onChange={update('burger')}
                    error={errors.burger}
                  />
                </fieldset>
              )}

              {step === 3 && (
                <fieldset className="cutsheet-fieldset">
                  <legend>Add Ons</legend>
                  <p className="cutsheet-fieldset-intro">
                    Ground beef patties are 4 × 1/4 LB patties per package.
                    There is a 10 LB minimum. Patties are an additional $0.75 /
                    LB.
                  </p>

                  <RadioGroup
                    label="Beef Patties"
                    required
                    name="patties"
                    options={[
                      '10 lbs',
                      '20 lbs',
                      'Half of burger into patties',
                      'All of burger into patties',
                      'NO BURGER PATTIES',
                    ]}
                    value={form.patties}
                    onChange={update('patties')}
                    error={errors.patties}
                  />

                  <Field label="Other">
                    <input
                      type="text"
                      value={form.pattiesOther}
                      onChange={update('pattiesOther')}
                      placeholder="Any other notes on patties"
                    />
                  </Field>
                </fieldset>
              )}

              {step === 4 && (
                <fieldset className="cutsheet-fieldset">
                  <legend>Beef Organs</legend>

                  <div
                    className={`cutsheet-field ${
                      errors.organs ? 'has-error' : ''
                    }`}
                  >
                    <span className="cutsheet-label">
                      Please select what organ meats you would like
                      <span className="cutsheet-required" aria-hidden="true">
                        {' '}
                        *
                      </span>
                    </span>
                    <div className="cutsheet-options">
                      {['Heart', 'Liver', 'Tongue', 'NONE'].map((o) => (
                        <label key={o} className="cutsheet-check">
                          <input
                            type="checkbox"
                            checked={form.organs.includes(o)}
                            onChange={() => toggleOrgan(o)}
                          />
                          <span>{o}</span>
                        </label>
                      ))}
                    </div>
                    {errors.organs && (
                      <span className="cutsheet-error">{errors.organs}</span>
                    )}
                  </div>

                  <Field label="Special Instructions">
                    <textarea
                      rows={5}
                      value={form.specialInstructions}
                      onChange={update('specialInstructions')}
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
                  <button type="submit" className="button button-primary">
                    {step === STEPS.length - 1
                      ? 'Submit cut sheet'
                      : 'Continue'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
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

function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  required,
  help,
  error,
}) {
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
