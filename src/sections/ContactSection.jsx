export function ContactSection({ title, description }) {
  return (
    <section className="contact-section section-padding">
      <h2>{title}</h2>
      <p>{description}</p>
      <form className="contact-form">
        <input type="text" placeholder="Nombre" required />
        <input type="email" placeholder="Correo electrónico" required />
        <textarea placeholder="Mensaje" rows="4" required></textarea>
        <button type="submit" className="cta-button">Enviar mensaje</button>
      </form>
    </section>
  );
}
