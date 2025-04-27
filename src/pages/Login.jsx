import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Validaciones simples de usuario
    if (username === "admin" && password === "admin") {
      navigate("/dashboard");
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Ingresar</button>

      
      <div><p>nota: usuario: <b>admin</b> , contraseña: <b>admin</b></p></div>
    </div>
  );
  
}

export default Login;
