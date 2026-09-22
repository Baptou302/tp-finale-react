import { useState, type FormEvent } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <main className="contact">
      <h2>Contact</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Nom</label>
          <input id="name" name="name" type="text" required />
        </div>

        <div className="form-field">
          <label htmlFor="email">Adresse e-mail</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div className="form-field">
          <label htmlFor="subject">Sujet</label>
          <input id="subject" name="subject" type="text" required />
        </div>

        <div className="form-field">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={6} required />
        </div>

        <button type="submit">Envoyer</button>
        {sent && <p role="status">Votre message a bien été envoyé.</p>}
      </form>
    </main>
  );
}