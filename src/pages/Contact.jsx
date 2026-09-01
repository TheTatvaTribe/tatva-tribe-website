import { useState } from 'react';
import { EMAIL, INSTAGRAM_URL } from '../data/site';

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScScCLsxvv6BaL4wphS_QksI2fm4x0B_QQGeM4pd0LB7DMdMQ/viewform?embedded=true';

const EXPECTATIONS = [
  'Free 30-min discovery call',
  'Goal assessment',
  'Personalised recommendations',
  'No obligation to sign up',
];

const Contact = () => {
  // The form is a remote iframe and can take a few seconds on mobile data.
  // Without this the panel is simply blank, with nothing to say it is working.
  const [formReady, setFormReady] = useState(false);

  return (
  <div>
    <section className="page-head">
      <div className="container">
        <div className="page-head-inner">
          <span className="section-eyebrow">Start Your Journey</span>
          <h1>Get your free consultation</h1>
          <p>
            Tell us about your goals and we&rsquo;ll shape a plan around your routine, your
            timeline, and your Tatvas.
          </p>
        </div>
      </div>
    </section>

    <section className="contact-section">
      <div className="container contact-grid">
        <div className="contact-form-card">
          {!formReady && (
            <div className="form-loading" role="status">
              <span className="form-spinner" aria-hidden="true" />
              <span>Loading the consultation form…</span>
            </div>
          )}
          <iframe
            src={FORM_URL}
            title="Free consultation form"
            onLoad={() => setFormReady(true)}
            style={formReady ? undefined : { height: 0, visibility: 'hidden' }}
          />
        </div>

        <aside className="contact-aside">
          <div className="contact-card">
            <h3>What to expect</h3>
            <ul>
              {EXPECTATIONS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="contact-card">
            <h3>Prefer to talk first?</h3>
            <p>
              DM <strong>&quot;TATVA&quot;</strong> on Instagram, or drop us an email. A real
              person replies.
            </p>
            <p>
              <a
                className="contact-link"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                @thetatvatribe._
              </a>
            </p>
            <p>
              <a className="contact-link" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </p>
          </div>
        </aside>
      </div>
    </section>
  </div>
  );
};

export default Contact;
