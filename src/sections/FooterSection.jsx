export function FooterSection({ title, links, socialLinks }) {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>{title}</h3>
          <p>Tu tienda deportiva de confianza.</p>
        </div>
        <div className="footer-links">
          <h4>Enlaces rápidos</h4>
          <ul>
            {links.map((link, i) => (
              <li key={i}><a href={link.href}>{link.text}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-social">
          <h4>Síguenos</h4>
          <div className="social-icons">
            {socialLinks.map((social, i) => (
              <a key={i} href={social.url} target="_blank" rel="noreferrer" aria-label={social.name}>
                {social.icon ? social.icon : social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <small>&copy; {new Date().getFullYear()} DC Sport's. Todos los derechos reservados.</small>
      </div>
    </footer>
  );
}
