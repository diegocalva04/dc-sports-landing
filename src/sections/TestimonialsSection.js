import { Section } from './Section';

export class TestimonialsSection extends Section {
  constructor(title, testimonials) {
    super(title, 'testimonios');
    this.testimonials = testimonials; // array de { quote, author, role }
  }

  render() {
    return (
      <section id={this.id} className="testimonials-section section-padding">
        <h2>{this.title}</h2>
        <div className="testimonials-grid">
          {this.testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <blockquote>“{t.quote}”</blockquote>
              <p className="author">— {t.author}, <span>{t.role}</span></p>
            </div>
          ))}
        </div>
      </section>
    );
  }
}