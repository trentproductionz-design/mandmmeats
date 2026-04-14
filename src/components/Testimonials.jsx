const testimonialPlaceholders = [
  {
    quote:
      'Great fast friendly service! Great customer service. Variety of options. Can’t wait to try. Thank you.',
    name: 'Samantha Wheeler',
  },
  {
    quote:
      'The owners of M&M are local farmers that meet the need of the community. They are newer to the meat packing business. That being said, their work is exceptional! You will not be disappointed choosing them to process and package your meat.',
    name: 'Tangi Fisch',
  },
  {
    quote: 'Fast, friendly service. Flexible schedule. Great packaging. Great value.',
    name: 'Marybeth Denton',
  },
  {
    quote:
      'Great to work with! Absolutely love how they have so many different options for processing and flavors!',
    name: 'Kayla Courtney Szafranski',
  },
  {
    quote:
      'I absolutely love this place. Their blueberry maple sausages are amazing. Great friendly staff.',
    name: 'Olivia Parks',
  },
  {
    quote:
      'We had lamb and pork processed by M & M. Friendly and knowledgeable. Packaging is great!!',
    name: 'Jamie Bratcher Hoffman',
  },
  {
    quote:
      'A family owned and run business that takes pride in their processing! Great job to all the M&M owners and employees!',
    name: 'Terry Dancer',
  },
  {
    quote:
      'They processed our deer this year and it was amazing! The summer sausage was delicious!',
    name: 'Amy Coe',
  },
  {
    quote:
      'We cannot say enough about M & M Meat Processing! They are a family run business, very friendly, and always going the extra mile for their customers! Their meat is soo good!! My husband says they are the best steaks he has ever had. Would not go anywhere else!',
    name: 'Nicole Palid-Ciesla',
  },
  {
    quote:
      'What a wonderful family business! They are very courteous on the phone and in person when you pick up your meat. I would highly recommend them!',
    name: 'Kimberly Montney',
  },
  {
    quote:
      'We have had nothing but great experiences with M & M Meat Processing. They are incredibly easy to work with, always accommodating, and make the entire process smooth from start to finish. Communication is clear, turnaround is reliable, and the quality of the product is consistently excellent. Highly recommend!',
    name: 'Ashton Ailee Manderbach',
  },
  {
    quote:
      'Great people and great service! Have had several animals processed and the quality is always outstanding!',
    name: 'Nate Lewis',
  },
  {
    quote: 'I purchased half a beef last year — it was the best meat! 100% recommended, 5 stars.',
    name: 'Sue Ann Marshall Allbee',
  },
  {
    quote: 'They have done an outstanding job on everything I’ve taken to them.',
    name: 'Aaron Montney',
  },
  {
    quote: 'We have had pigs done there, also had deer done there. Matt is great to work with!',
    name: 'James Oldham',
  },
  {
    quote: 'They have some of the best burger around. I will be back for more.',
    name: 'Rick Pomranky',
  },
  {
    quote: 'Great people!! And they do a great job processing and making what you want!!',
    name: 'Jenny Sunderman-Todd',
  },
  {
    quote:
      'My son (9) and I shot our first deer and was told to come to M&M. Man, I wasn’t disappointed! Packed super well. Great friendly people. Hooked my family up completely. I’ll never go anywhere else but to M&M. Thank you so much from our family to yours.',
    name: 'Josh and Sarah Muñoz',
  },
  {
    quote:
      'They did an amazing job butchering my deer this year, very timely turnaround, and a very good price for what you get. Will definitely be using them from now on.',
    name: 'Zach Whitney',
  },
  {
    quote:
      'We were so pleased with our processing from our deer this year! The salami is amazing — you all have done a great job! So glad you are local and close for all of our processing needs!',
    name: 'Crystal Furman-Walters',
  },
  {
    quote: 'Such great quality and service!!',
    name: 'Laura Myers',
  },
]

const rowOne = testimonialPlaceholders.slice(0, 11)
const rowTwo = testimonialPlaceholders.slice(11)

function TestimonialCard({ quote, name }) {
  return (
    <article className="testimonial-card">
      <div className="testimonial-stars" aria-label="5 out of 5 stars">
        <span aria-hidden="true">★★★★★</span>
      </div>
      <p className="testimonial-quote">{quote}</p>
      <p className="testimonial-name">{name}</p>
    </article>
  )
}

function TestimonialRow({ items, direction }) {
  return (
    <div className={`testimonials-row testimonials-row-${direction}`}>
      <div className="testimonials-track">
        {items.map((item, index) => (
          <TestimonialCard key={`a-${index}`} {...item} />
        ))}
        {items.map((item, index) => (
          <TestimonialCard key={`b-${index}`} {...item} />
        ))}
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="testimonials-band" aria-label="Customer reviews">
      <TestimonialRow items={rowOne} direction="left" />
      <TestimonialRow items={rowTwo} direction="right" />
    </section>
  )
}
