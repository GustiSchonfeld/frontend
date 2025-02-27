import { useEffect, useState } from "react";
import axios from "axios";

const Contactos = () => {
  const [contactos, setContactos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/contactos").then((res) => setContactos(res.data));
  }, []);

  const agregarContacto = () => {
    axios.post("http://localhost:5000/api/contactos", { nombre, telefono, email }).then(() => {
      setContactos([...contactos, { nombre, telefono, email }]);
      setNombre("");
      setTelefono("");
      setEmail("");
    });
  };

  const eliminarContacto = (id) => {
    axios.delete(`http://localhost:5000/api/contactos/${id}`).then(() => {
      setContactos(contactos.filter((contacto) => contacto._id !== id));
    });
  };

  return (
    <div>
      <h2>Agenda de Contactos</h2>
      <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />  
      <button onClick={agregarContacto}>Agregar</button>

      <ul>
        {contactos.map((contacto) => (
          <li key={contacto._id}>
            {contacto.nombre} - {contacto.telefono} - {contacto.email}
            <button onClick={() => eliminarContacto(contacto._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contactos;