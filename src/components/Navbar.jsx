import React from 'react';

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">DC SPORT'S</div>
      <ul className="navbar-links">
        <li><a href="#hero">Inicio</a></li>
        <li><a href="#productos-destacados">Productos</a></li>
        <li><a href="#sobre-nosotros">Nosotros</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </nav>
  );
}
