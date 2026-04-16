export default function About() {
  return (
    <section className="about-band" id="about">
      <div className="about-inner">
        <div className="about-layout">
          <div className="about-copy">
            <p className="about-eyebrow">About M&M</p>
            <h2>
              Family roots.
              <br />
              Honest work.
              <br />
              <span className="about-heading-nowrap">Quality you can taste.</span>
            </h2>

            <div className="about-body">
              <p>
                M&M Meat Processing started with a simple idea: give families and
                hunters a place they can count on. Based in Clare, Michigan, we
                have been serving the community with hands-on custom processing
                of beef, pork, lamb, and venison for years. Every animal that
                comes through our doors is handled with the same care and
                attention we would expect for our own table.
              </p>
              <p>
                Our butchers bring years of real-world experience to every cut.
                Whether you are a first-time buyer looking for guidance on a
                whole or half beef, or a seasoned hunter bringing in your deer
                during rifle season, we make the process straightforward and the
                results consistent. No surprises, no shortcuts -- just quality
                meat processed right.
              </p>
              <p>
                We believe in doing business the way it used to be done:
                face-to-face, with a handshake and a conversation. When you work
                with M&M, you are not a number -- you are a neighbor. That is the
                standard we hold ourselves to every single day.
              </p>
            </div>
          </div>

          <div className="about-image">
            <img
              src="/Screenshot 2026-04-16 161714.png"
              alt="M&M Meat Processing"
              className="about-photo"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
