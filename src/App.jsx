import { useScrollAnimation } from './hooks/useScrollAnimation';
import { HeroSection } from './sections/HeroSection';
import { FeaturedProductsSection } from './sections/FeaturedProductsSection';
import { AboutSection } from './sections/AboutSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { ContactSection } from './sections/ContactSection';
import { FooterSection } from './sections/FooterSection';

// Datos de DC Sport's (pueden venir de una API, pero los hardcodeamos para el ejemplo)
const hero = new HeroSection(
  'DC Sport\'s',
  'Equipamiento deportivo de alto rendimiento. Supera tus límites.',
  'Explorar productos',
  '#productos-destacados',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
);

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

const featuredProducts = new FeaturedProductsSection('Productos Destacados', products);

const about = new AboutSection(
  'Sobre DC Sport\'s',
  [
    'DC Sport\'s nació de la pasión por el deporte y el deseo de equipar a atletas de todos los niveles con lo mejor. Fundada en 2015, nos hemos consolidado como líderes en innovación deportiva.',
    'Nuestra misión es inspirar a cada persona a moverse, romper barreras y alcanzar su máximo potencial. Trabajamos con materiales de primera calidad y diseño ergonómico para que tu rendimiento no tenga límites.'
  ],
  'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&auto=format'
);

const testimonials = new TestimonialsSection(
  'Lo que dicen nuestros clientes',
  [
    { quote: 'Desde que uso las zapatillas DC Sport\'s, mis tiempos mejoraron un 15%. Increíble calidad.', author: 'Carlos Méndez', role: 'Maratonista' },
    { quote: 'La atención al cliente es excelente y los productos llegaron antes de lo esperado. Recomiendo 100%.', author: 'Ana Gómez', role: 'Entrenadora personal' },
    { quote: 'La mochila es perfecta para el gym y la oficina. Resistente y con diseño inteligente.', author: 'Luis Fernández', role: 'Crossfitter' }
  ]
);

const contact = new ContactSection(
  'Contáctanos',
  '¿Tienes dudas o sugerencias? Escríbenos y te responderemos en menos de 24 horas.',
  [] // Se podrían definir campos dinámicos, pero usamos un formulario fijo
);

const footer = new FooterSection(
  'DC Sport\'s',
  [
    { text: 'Inicio', href: '#hero' },
    { text: 'Productos', href: '#productos-destacados' },
    { text: 'Nosotros', href: '#sobre-nosotros' },
    { text: 'Contacto', href: '#contacto' }
  ],
  [
    { name: 'Facebook', url: '#', icon: 'FB' },
    { name: 'Instagram', url: '#', icon: 'IG' },
    { name: 'Twitter', url: '#', icon: 'TW' }
  ]
);

// Arreglo polimórfico: todas las secciones son tratadas como Section
const sections = [hero, featuredProducts, about, testimonials, contact, footer];

function App() {
  return (
    <div className="App">
      {/* Cada sección es renderizada sin importar su tipo concreto */}
      {sections.map((section, index) => {
        // Para aplicar animación a todas las secciones excepto el footer (o la que se prefiera)
        if (section instanceof FooterSection) {
          return <div key={index}>{section.render()}</div>;
        }
        // Para el Hero no necesita animación de scroll, pero podemos aplicarle si queremos; 
        // lo mostramos directamente.
        if (section instanceof HeroSection) {
          return <div key={index}>{section.render()}</div>;
        }
        // El resto de secciones tendrán animación con el hook
        return <AnimatedSection key={index} section={section} />;
      })}
    </div>
  );
}

// Componente helper para aplicar la animación a una sección genérica
function AnimatedSection({ section }) {
  const ref = useScrollAnimation('hidden', 'show');

  return (
    <div ref={ref} className="hidden">
      {section.render()}
    </div>
  );
}

export default App;