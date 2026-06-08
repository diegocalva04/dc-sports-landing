/**
 * Clase abstracta que representa una sección de la landing page.
 * No debe instanciarse directamente; las subclases deben implementar render().
 */
export class Section {
  constructor(title, id) {
    if (new.target === Section) {
      throw new Error("No se puede instanciar la clase abstracta Section directamente.");
    }
    this.title = title;
    this.id = id || '';
  }

  /**
   * Método abstracto que cada sección debe implementar.
   * Retorna un elemento JSX con el contenido de la sección.
   * @returns {JSX.Element}
   */
  render() {
    throw new Error("El método render() debe ser implementado por la subclase.");
  }
}