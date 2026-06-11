export function FeaturedProductsSection({ title, products }) {
  return (
    <section className="featured-products-section">
      <h2>{title}</h2>
      <p>Descubre nuestros productos estrella, diseñados para el máximo rendimiento</p>
      <div className="products-grid">
        {products.map((product, index) => (
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
