import React from 'react';

export function TestimonialsSection({ title, testimonials }) {
  return (
    <section className="testimonials-section section-padding">
      <h2>{title}</h2>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-card">
            <blockquote>"{t.quote}"</blockquote>
            <p className="author">— {t.author}, <span>{t.role}</span></p>
          </div>
        ))}
      </div>
    </section>
  );
}
