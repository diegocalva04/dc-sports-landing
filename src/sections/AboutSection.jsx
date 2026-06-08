import React from 'react';

export function AboutSection({ title, paragraphs, imageUrl }) {
  return (
    <section className="about-section section-padding">
      <div className="about-container">
        <div className="about-text">
          <h2>{title}</h2>
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="about-image">
          <img src={imageUrl} alt="DC Sport's team" />
        </div>
      </div>
    </section>
  );
}
