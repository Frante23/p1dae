import React from "react";
import "../styles/login.css";

function Contacto() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contáctanos</h1>
      <p style={styles.text}>Estamos encantados de saber de ti. Escríbenos tu consulta o sugerencia.</p>
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
    fontSize: "2rem"
  },
  text: {
    fontSize: "1.1rem",
    color: "#37474f"
  }
};

export default Contacto;
