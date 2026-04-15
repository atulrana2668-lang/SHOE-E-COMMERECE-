"use client";

import Image from "next/image";
import { useState } from "react";
import { contactChannels, contactSpotlight, faqItems } from "@/lib/store-data";

export function ContactPage() {
  const [feedback, setFeedback] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const firstName = String(form.get("name") ?? "").trim().split(" ")[0];
    setFeedback(
      `Thanks ${firstName || "there"}, your message was received and the support team will respond shortly.`
    );
    event.currentTarget.reset();
  }

  return (
    <div className="pageStack">
      <section className="contactHero">
        <div className="contactHero__copy spaced">
          <p className="eyebrow">Contact</p>
          <h2>Support that gives shoppers an answer, not silence.</h2>
          <p className="contactHero__lead">
            Talk to us about fit, delivery, exchanges, or store help. This page is
            designed to give shoppers a clear next step and a quick response.
          </p>
        </div>

        <div className="contactHero__visual">
          <div className="contactHero__imageWrap">
            <span className="contactHero__badge">{contactSpotlight.eyebrow}</span>
            <Image
              className="contactHero__image"
              src={contactSpotlight.image}
              alt={contactSpotlight.alt}
              fill
              sizes="(max-width: 1100px) 100vw, 42vw"
            />
          </div>
          <div className="contactHero__summary">
            <h3>{contactSpotlight.title}</h3>
            <p>{contactSpotlight.body}</p>
            <div className="contactHero__chips">
              {contactSpotlight.chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="contactGrid">
        {contactChannels.map((channel) => (
          <article key={channel.title} className="contactPanel">
            <p className="eyebrow">{channel.title}</p>
            <h3>{channel.detail}</h3>
            <p>{channel.note}</p>
          </article>
        ))}
      </section>

      <section className="contactLayout">
        <article className="contactPanel spaced">
          <div>
            <p className="eyebrow">Send a message</p>
            <h3>Tell us what you need help with</h3>
          </div>

          {feedback ? <div className="feedback feedback--success">{feedback}</div> : null}

          <form className="formGrid" onSubmit={handleSubmit}>
            <div className="formRow">
              <div className="formField">
                <label htmlFor="contact-name">Name</label>
                <input id="contact-name" name="name" required placeholder="Your full name" />
              </div>
              <div className="formField">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  required
                  type="email"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="formField">
              <label htmlFor="contact-topic">Topic</label>
              <input
                id="contact-topic"
                name="topic"
                required
                placeholder="Order update, returns, fitting help, store enquiry"
              />
            </div>

            <div className="formField">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                required
                placeholder="Share the details so the team can help quickly."
              />
            </div>

            <button className="button" type="submit">
              Send message
            </button>
          </form>
        </article>

        <article className="contactPanel spaced">
          <div>
            <p className="eyebrow">Response flow</p>
            <h3>What happens next</h3>
          </div>
          <div className="supportList">
            <div>
              <strong>1. We review the message</strong>
              <span>Support requests are grouped by fit, order, returns, and general help.</span>
            </div>
            <div>
              <strong>2. We respond with the right channel</strong>
              <span>Urgent order issues move to phone or email follow-up quickly.</span>
            </div>
            <div>
              <strong>3. We close the loop</strong>
              <span>Shoppers get clear next steps instead of waiting without feedback.</span>
            </div>
          </div>
        </article>
      </section>

      <section className="faqList">
        {faqItems.map((item) => (
          <article key={item.question} className="faqItem">
            <strong>{item.question}</strong>
            <p>{item.answer}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
