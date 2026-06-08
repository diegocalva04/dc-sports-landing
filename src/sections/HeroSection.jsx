import React from 'react';

export function HeroSection({ title, subtitle, ctaText, ctaLink, backgroundImage }) {
  const sectionStyle = backgroundImage
    ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})` }
    : {};
  
  return (
    <section
      className="hero-section"
      style={{ ...sectionStyle, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <a href={ctaLink} className="cta-button">{ctaText}</a>
      </div>
    </section>
  );
}
