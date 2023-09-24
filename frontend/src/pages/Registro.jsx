import React, { useState } from 'react';
import axios from 'axios';

const Registro = () => {
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    contraseña: '',
    email: '',
  });

  const handleChange = (e) => {
    setDatosUsuario({
      ...datosUsuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/registro', datosUsuario);
      console.log(response.data.mensaje);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Registro de usuarios</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={datosUsuario.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="primerApellido"
          placeholder="Primer apellido"
          value={datosUsuario.primerApellido}
          onChange={handleChange}
        />
        <input
          type="text"
          name="segundoApellido"
          placeholder="Segundo apellido"
          value={datosUsuario.segundoApellido}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={datosUsuario.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={datosUsuario.contraseña}
          onChange={handleChange}
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;
