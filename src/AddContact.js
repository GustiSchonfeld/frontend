import React, { useState } from 'react';

function AddContact() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  // Maneja el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar si todos los campos están llenos
    if (!nombre || !telefono || !email) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/contactos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, telefono, email }),
      });

      if (!response.ok) {
        throw new Error('Hubo un error al agregar el contacto');
      }

      const data = await response.json();
      alert(`Contacto agregado con ID: ${data.id}`);
      setNombre('');
      setTelefono('');
      setEmail('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <br />
      <h2>Agregar Nuevo Contacto</h2>
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Teléfono:
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <br />  
        <button type="submit">Agregar Contacto</button>
      </form>
    </div>
  );
}

export default AddContact;
