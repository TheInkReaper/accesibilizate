import React, { useState } from 'react';
import axios from 'axios';

const Login = ( ) => {
    const [credenciales, setCredenciales] = useState({
        email: '',
        contraseña: '',
    });
    const handleChange = (e) => {
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value,
          });
        };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', credenciales);
            console.log(response.data.mensaje);
        } catch (error) {
            console.error(error.response.data.error);
        }
    };
    return (
        <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electronico"
                    value={credenciales.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="contraseña"
                    placeholder="Contraseña"
                    value={credenciales.contraseña}
                    onChange={handleChange}
                />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;
