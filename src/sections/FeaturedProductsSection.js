import { Section } from './Section';

export class FeaturedProductsSection extends Section {
  constructor(title, products) {
    super(title, 'productos-destacados');
    this.products = products; // array de objetos { name, image, price, description }
  }

  render() {
    return (
      <section id={this.id} className="featured-products-section section-padding">
        <h2>{this.title}</h2>
        <div className="products-grid">
          {this.products.map((product, index) => (
            <div key={index} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="price">{product.price}</span>
              <button className="cta-button">Agregar al carrito</button>
            </div>
          ))}
        </div>
      </section>
    );
  }
}