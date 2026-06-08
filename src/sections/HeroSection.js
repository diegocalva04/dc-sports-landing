import { Section } from './Section';

export class HeroSection extends Section {
  constructor(title, subtitle, ctaText, ctaLink, backgroundImage) {
    super(title, 'hero');
    this.subtitle = subtitle;
    this.ctaText = ctaText;
    this.ctaLink = ctaLink;
    this.backgroundImage = backgroundImage;
  }

  render() {
    const sectionStyle = this.backgroundImage
      ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${this.backgroundImage})` }
      : {};
    return (
      <section
        id={this.id}
        className="hero-section"
        style={{ ...sectionStyle, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="hero-content">
          <h1>{this.title}</h1>
          <p>{this.subtitle}</p>
          <a href={this.ctaLink} className="cta-button">{this.ctaText}</a>
        </div>
      </section>
    );
  }
}