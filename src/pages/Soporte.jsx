import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";

function Soporte() {
  const [mensaje, setMensaje] = useState("");
  const [mensajeEnviado, setMensajeEnviado] = useState(false); // Estado para controlar el mensaje de éxito

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulamos el envío del mensaje
    setMensajeEnviado(true);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Centro de Soporte</h1>
      <div style={styles.supportInfo}>
        <h2 style={styles.subTitle}>¿Necesitas ayuda?</h2>
        <p style={styles.text}>Estamos aquí para asistirte. Si tienes algún problema, por favor, contacta con nosotros.</p>
        <p style={styles.detail}>Correo: soporte@facturas.cl</p>
        <p style={styles.detail}>Teléfono: +56 9 8765 4321</p>
      </div>
      {mensajeEnviado ? (
        <div style={styles.successMessage}>
          <p style={styles.text}>¡Tu mensaje fue enviado con éxito!</p>
        </div>
      ) : (
        <div style={styles.formContainer}>
          <h2 style={styles.subTitle}>Reportar un Problema</h2>
          <textarea
            style={styles.textArea}
            placeholder="Describe el problema que estás enfrentando..."
            rows="6"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
          <button style={styles.submitButton} onClick={handleSubmit}>Enviar Reporte</button>
        </div>
      )}
      <Link to="/dashboard" style={styles.linkButton}>Volver al Dashboard</Link>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    backgroundColor: "#fff3e6",
    minHeight: "100vh"
  },
  title: {
    color: "#e65100",
    fontSize: "2rem",
    marginBottom: "20px"
  },
  subTitle: {
    fontSize: "1.5rem",
    color: "#e65100",
    marginBottom: "10px"
  },
  text: {
    fontSize: "1.1rem",
    color: "#6d4c41"
  },
  detail: {
    fontSize: "1rem",
    color: "#6d4c41",
    margin: "5px 0"
  },
  successMessage: {
    backgroundColor: "#c8e6c9",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px"
  },
  supportInfo: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "30px"
  },
  formContainer: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  },
  textArea: {
    width: "80%",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    marginBottom: "20px",
    border: "1px solid #ccc"
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#e65100",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem"
  },
  linkButton: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#1565c0",
    color: "#fff",
    textDecoration: "none", // Elimina el subrayado del enlace
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "20px",
    textAlign: "center",
  }
};

export default Soporte;
