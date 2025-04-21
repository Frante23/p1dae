import React, { useState } from "react";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Manejo de errores

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica para asegurarse de que los campos no estén vacíos
    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    // Aquí iría la lógica para enviar la solicitud al backend para iniciar sesión
    // Por ejemplo, haciendo una solicitud POST a tu API de inicio de sesión

    // Simulación de inicio de sesión
    console.log("Email:", email);
    console.log("Contraseña:", password);

    // Limpiar los campos después de la sumisión
    setEmail("");
    setPassword("");

    // Redireccionamiento o cualquier otra lógica después de un inicio de sesión exitoso
    // window.location.href = '/dashboard'; // Ejemplo de redirección a una página de "Dashboard"
    setError(""); // Limpiar el error
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        {/* Mostrar mensaje de error si hay uno */}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Correo electrónico</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Contraseña</label>
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
