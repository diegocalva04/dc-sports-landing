import { useState } from 'react';

export function ContactSection({ title, description, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  const updateField = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setStatus('sending');

    try {
      await onSubmit(formData);
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact-section section-padding">
      <h2>{title}</h2>
      <p>{description}</p>
      <form className="contact-form" onSubmit={submitForm}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={updateField}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electronico"
          value={formData.email}
          onChange={updateField}
          required
        />
        <textarea
          name="message"
          placeholder="Mensaje"
          rows="4"
          value={formData.message}
          onChange={updateField}
          required
        />
        <button type="submit" className="cta-button" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
        </button>
        {status === 'sent' && (
          <p className="form-status success">Mensaje enviado al backend FastAPI.</p>
        )}
        {status === 'error' && (
          <p className="form-status error">No se pudo conectar con el backend.</p>
        )}
      </form>
    </section>
  );
}
