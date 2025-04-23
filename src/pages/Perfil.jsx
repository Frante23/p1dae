import React from "react";
import "../styles/login.css";

function Perfil() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mi Perfil</h1>
      <p style={styles.text}>Aquí puedes ver y editar tu información personal.</p>
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
    fontSize: "2rem"
  },
  text: {
    fontSize: "1.1rem",
    color: "#666"
  }
};

export default Perfil;
