const processSteps = [
  {
    title: 'Call to get on the schedule',
    copy:
      'Give us a call to discuss what you need and get on the schedule. We will walk you through timing, availability, and what to expect. Whether it is a whole beef, a half hog, or a deer during rifle season, we will find a time that works.',
    detail: [
      'Custom processing: (989) 386-0166',
      'Deer processing: (989) 906-1617',
    ],
  },
  {
    title: 'Drop off and review your cut sheet',
    copy:
      'Bring your animal to our facility and sit down with us to go over your cut sheet. We will walk through every option, steaks, roasts, ground, sausage, and smoked products, so you know exactly what you are getting back. No guesswork, no confusion, no surprises.',
    detail: 'Custom cut sheets for beef, pork, lamb and venison',
  },
  {
    title: 'Pick up product you trust',
    copy:
      'When your order is ready, we will let you know. Pick up your finished product, packaged, labeled, and frozen the way you asked for it. Ready for the deep freeze, the kitchen counter, or straight to the grill.',
    detail: 'Packaged, labeled and ready to go',
  },
]

export default function Process() {
  return (
    <section className="content-section process-section" id="process">
      <div className="section-heading section-heading-wide">
        <p className="eyebrow">Process</p>
        <h2>How it works.</h2>
      </div>

      <div className="process-row">
        {processSteps.flatMap((step, index) => [
          <article key={step.title} className="process-card">
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
            {Array.isArray(step.detail) ? (
              <div className="process-detail">
                {step.detail.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            ) : (
              <span className="process-detail">{step.detail}</span>
            )}
          </article>,
          index < processSteps.length - 1 ? (
            <div key={`${step.title}-arrow`} className="process-arrow" aria-hidden="true">
              <img
                className="process-arrow-image"
                src="/pngegg.png"
                alt=""
              />
            </div>
          ) : null,
        ])}
      </div>
    </section>
  )
}
