import React, { useState } from 'react';
import './App.css';
import AddContact from './AddContact';
import axios from 'axios';


function App() {
  const [contactos, setContactos] = useState([]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/contactos');
      setContactos(response.data);
    } catch (error) {
      console.error('Error al obtener los contactos:', error);
      alert('Hubo un error al obtener los contactos.');
    }
  };

  return (
    <div className="App">
      <h1 className="text-center">Agenda de Contactos</h1>
      <AddContact />
      
      {/* Botón para obtener la lista de contactos */}
      <button onClick={fetchContacts}>Mostrar Agenda de Contactos</button>

      {/* Lista de contactos */}
      {contactos.length > 0 && (
        <ul>
          {contactos.map((contacto) => (
            <li key={contacto.id}>
              {contacto.nombre} - {contacto.telefono} - {contacto.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
