import { Section } from './Section';

export class AboutSection extends Section {
  constructor(title, paragraphs, imageUrl) {
    super(title, 'sobre-nosotros');
    this.paragraphs = paragraphs; // array de strings
    this.imageUrl = imageUrl;
  }

  render() {
    return (
      <section id={this.id} className="about-section section-padding">
        <div className="about-container">
          <div className="about-text">
            <h2>{this.title}</h2>
            {this.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="about-image">
            <img src={this.imageUrl} alt="DC Sport's team" />
          </div>
        </div>
      </section>
    );
  }
}