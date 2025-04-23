import React from "react";
import "../styles/login.css";

function Soporte() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Centro de Soporte</h1>
      <p style={styles.text}>¿Tienes algún problema? Estamos aquí para ayudarte.</p>
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
    fontSize: "2rem"
  },
  text: {
    fontSize: "1.1rem",
    color: "#6d4c41"
  }
};

export default Soporte;
