export function FeaturedProductsSection({ title, products, status }) {
  return (
    <section className="featured-products-section">
      <h2>{title}</h2>
      <p>Descubre nuestros productos estrella, disenados para el maximo rendimiento</p>
      {status === 'loading' && (
        <p className="api-status">Cargando productos desde la API...</p>
      )}
      {status === 'fallback' && (
        <p className="api-status">Mostrando productos locales mientras se conecta la API.</p>
      )}
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id || product.name} className="product-card">
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
