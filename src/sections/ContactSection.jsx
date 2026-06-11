import { useState } from 'react';

export function ContactSection({ title, description, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const hasValidEmailFormat = (email) => {
    const trimmedEmail = email.trim();
    const atIndex = trimmedEmail.indexOf('@');
    const lastDotIndex = trimmedEmail.lastIndexOf('.');

    return (
      atIndex > 0
      && lastDotIndex > atIndex + 1
      && lastDotIndex < trimmedEmail.length - 1
      && !trimmedEmail.includes(' ')
    );
  };

  const validateForm = () => {
    if (formData.name.trim().length < 2) {
      return 'Escribe tu nombre con al menos 2 caracteres.';
    }

    if (!hasValidEmailFormat(formData.email)) {
      return 'Escribe un correo valido, por ejemplo nombre@correo.com.';
    }

    if (formData.message.trim().length < 2) {
      return 'Escribe un mensaje de al menos 2 caracteres.';
    }

    return '';
  };

  const updateField = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const validationMessage = validateForm();
    if (validationMessage) {
      setStatus('error');
      setErrorMessage(validationMessage);
      return;
    }

    try {
      await onSubmit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error.status === 422
          ? 'Revisa los datos del formulario.'
          : 'No se pudo conectar con el backend.'
      );
    }
  };

  return (
    <section className="contact-section section-padding">
      <h2>{title}</h2>
      <p>{description}</p>
      <form className="contact-form" onSubmit={submitForm} noValidate>
        <label className="form-field">
          <span>Nombre</span>
          <input
            type="text"
            name="name"
            placeholder="Ej. Diego Calva"
            value={formData.name}
            onChange={updateField}
            minLength="2"
            maxLength="80"
            required
          />
          <small>Usa al menos 2 caracteres.</small>
        </label>
        <label className="form-field">
          <span>Correo electronico</span>
          <input
            type="email"
            name="email"
            placeholder="nombre@correo.com"
            value={formData.email}
            onChange={updateField}
            required
          />
          <small>Formato requerido: nombre@correo.com.</small>
        </label>
        <label className="form-field">
          <span>Mensaje</span>
          <textarea
            name="message"
            placeholder="Ej. Quiero informacion sobre sus productos deportivos."
            rows="4"
            value={formData.message}
            onChange={updateField}
            minLength="2"
            maxLength="1000"
            required
          />
          <small>Escribe entre 2 y 1000 caracteres.</small>
        </label>
        <button type="submit" className="cta-button" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
        </button>
        {status === 'sent' && (
          <p className="form-status success">Mensaje enviado al backend FastAPI.</p>
        )}
        {status === 'error' && (
          <p className="form-status error">{errorMessage}</p>
        )}
      </form>
    </section>
  );
}
