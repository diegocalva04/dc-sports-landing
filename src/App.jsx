import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { FeaturedProductsSection } from './sections/FeaturedProductsSection';
import { AboutSection } from './sections/AboutSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { ContactSection } from './sections/ContactSection';
import { FooterSection } from './sections/FooterSection';

const products = [
  {
    name: 'Zapatillas Running Pro',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format',
    price: '$129.99',
    description: 'Máxima amortiguación y ligereza para tus carreras.'
  },
  {
    name: 'Camiseta Dry-Fit',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&auto=format',
    price: '$39.99',
    description: 'Transpirable y de secado rápido, ideal para entrenamientos intensos.'
  },
  {
    name: 'Mochila Deportiva 30L',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format',
    price: '$59.99',
    description: 'Compartimentos especiales para calzado y laptop.'
  },
  {
    name: 'Botella Térmica Acero',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&auto=format',
    price: '$24.99',
    description: 'Mantiene tus bebidas frías 24h o calientes 12h.'
  },
  {
    name: 'Guantes de Gimnasio',
    image: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7e2a13?w=400&auto=format',
    price: '$19.99',
    description: 'Agarre firme y protección para entrenamiento de fuerza.'
  },
  {
    name: 'Cuerda de Saltar Profesional',
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&auto=format',
    price: '$14.99',
    description: 'Ajustable, rodamientos de bolas para velocidad.'
  }
];

export default function App() {
  return (
    <div className="App">
      <Navbar />
      
      <section id="hero">
        <HeroSection
          title="Supera tus límites con DC Sport's"
          subtitle="Equipamiento deportivo de alto rendimiento. Diseñado para los campeones del Ecaudor."
          ctaText="Explorar colección"
          ctaLink="#productos-destacados"
          backgroundImage="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
        />
      </section>

      <section id="productos-destacados">
        <div style={{ paddingTop: '2rem' }}>
          <FeaturedProductsSection
            title="Colección Premium"
            products={products}
          />
        </div>
      </section>

      <section id="sobre-nosotros">
        <AboutSection
          title="Nuestra Misión"
          paragraphs={[
            'DC Sport\'s nació de la pasión por el deporte y el deseo de equipar a atletas de todos los niveles con lo mejor. Desde 2015, somos líderes en innovación deportiva, combinando tecnología, diseño y rendimiento.',
            'Cada producto es creado con precisión para que los deportistas puedan alcanzar su máximo potencial. Creemos que el equipamiento adecuado hace la diferencia entre buenos y grandes atletas.'
          ]}
          imageUrl="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&auto=format"
        />
      </section>

      <section>
        <TestimonialsSection
          title="Historias de nuestros atletas"
          testimonials={[
            { quote: 'Desde que uso los productos de DC Sport\'s, mis tiempos mejoraron un 15%. La calidad es incomparable.', author: 'Carlos Méndez', role: 'Atleta Olímpico' },
            { quote: 'El servicio al cliente es excepcional y los productos llegan rápido. Definitivamente recomiendo.', author: 'Ana Gómez', role: 'Entrenadora' },
            { quote: 'Perfecto para el gym y entrenamientos intensos. Resisten cualquier desafío.', author: 'Luis Fernández', role: 'CrossFit Athlete' }
          ]}
        />
      </section>

      <section id="contacto">
        <ContactSection
          title="Contáctanos"
          description="¿Dudas? Nuestro equipo está listo para ayudarte. Responderemos en menos de 24 horas."
        />
      </section>

      <FooterSection
        title="DC SPORT'S"
        links={[
          { text: 'Inicio', href: '#hero' },
          { text: 'Productos', href: '#productos-destacados' },
          { text: 'Sobre Nosotros', href: '#sobre-nosotros' },
          { text: 'Contacto', href: '#contacto' }
        ]}
        socialLinks={[
          { name: 'Facebook', url: 'https://facebook.com/dcsports', icon: 'f' },
          { name: 'Instagram', url: 'https://instagram.com/dcsports', icon: 'ig' },
          { name: 'Twitter', url: 'https://twitter.com/dcsports', icon: '𝕏' }
        ]}
      />
    </div>
  );
}