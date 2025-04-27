import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";

function Contacto() {
  const [mensaje, setMensaje] = useState("");
  const [mensajeEnviado, setMensajeEnviado] = useState(false); // Estado para controlar el mensaje de éxito

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulamos el envío del mensaje
    setMensajeEnviado(true);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contáctanos</h1>
      <div style={styles.contactInfo}>
        <h2 style={styles.subTitle}>Información de Contacto</h2>
        <p style={styles.text}>Si tienes preguntas o necesitas asistencia, no dudes en ponerte en contacto con nosotros.</p>
        <p style={styles.detail}>Correo: contacto@soporte.cl</p>
        <p style={styles.detail}>Teléfono: +56 2 2345 6789</p>
        <p style={styles.detail}>Dirección: Av. Libertador Bernardo O'Higgins 1234, Temuco, Chile</p>
      </div>
      {mensajeEnviado ? (
        <div style={styles.successMessage}>
          <p style={styles.text}>¡Tu mensaje fue enviado con éxito!</p>
        </div>
      ) : (
        <div style={styles.formContainer}>
          <h2 style={styles.subTitle}>Envíanos tu mensaje</h2>
          <textarea
            style={styles.textArea}
            placeholder="Escribe tu mensaje aquí..."
            rows="6"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
          <button style={styles.submitButton} onClick={handleSubmit}>Enviar Mensaje</button>
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
    backgroundColor: "#e3f2fd",
    minHeight: "100vh"
  },
  title: {
    color: "#1565c0",
    fontSize: "2rem",
    marginBottom: "20px"
  },
  subTitle: {
    fontSize: "1.5rem",
    color: "#1565c0",
    marginBottom: "10px"
  },
  text: {
    fontSize: "1.1rem",
    color: "#37474f"
  },
  detail: {
    fontSize: "1rem",
    color: "#37474f",
    margin: "5px 0"
  },
  successMessage: {
    backgroundColor: "#c8e6c9",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px"
  },
  contactInfo: {
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
    backgroundColor: "#1565c0",
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

export default Contacto;
