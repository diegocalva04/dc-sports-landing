import { Section } from './Section';

export class ContactSection extends Section {
  constructor(title, description, formFields) {
    super(title, 'contacto');
    this.description = description;
    this.formFields = formFields; // no se usa aquí, lo dejamos como placeholder
  }

  render() {
    return (
      <section id={this.id} className="contact-section section-padding">
        <h2>{this.title}</h2>
        <p>{this.description}</p>
        <form className="contact-form">
          <input type="text" placeholder="Nombre" required />
          <input type="email" placeholder="Correo electrónico" required />
          <textarea placeholder="Mensaje" rows="4" required></textarea>
          <button type="submit" className="cta-button">Enviar mensaje</button>
        </form>
      </section>
    );
  }
}