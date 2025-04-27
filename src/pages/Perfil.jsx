import React from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";

function Perfil() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mi Perfil</h1>
      <div style={styles.profileCard}>
        <img src="https://via.placeholder.com/150" alt="Imagen de perfil" style={styles.profileImage} />
        <div style={styles.profileInfo}>
          <h2 style={styles.name}>Administrador: Franco Oyarzo</h2>
          <p style={styles.detail}>Cargo: Administrador Principal</p>
          <p style={styles.detail}>Empresa: Franco Boys</p>
          <p style={styles.detail}>Correo: admin@francoboys.cl</p> 
          <p style={styles.detail}>Afiliaciones: Universidad Catolica de Temuco</p>
        </div>
      </div>
      <p style={styles.text}>Aquí puedes ver y editar tu información personal.</p>
      {/* Enlace para volver al dashboard */}
      <Link to="/dashboard" style={styles.linkButton}>Volver al Dashboard</Link>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh"
  },
  title: {
    color: "#333",
    fontSize: "2rem",
    marginBottom: "20px"
  },
  profileCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px"
  },
  profileImage: {
    borderRadius: "50%",
    width: "150px",
    height: "150px",
    marginBottom: "20px"
  },
  profileInfo: {
    textAlign: "center"
  },
  name: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333"
  },
  detail: {
    fontSize: "1rem",
    color: "#555",
    margin: "5px 0"
  },
  text: {
    fontSize: "1.1rem",
    color: "#666"
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

export default Perfil;
