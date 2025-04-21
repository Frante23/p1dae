import React, { useState } from "react";
import "../styles/guest.css";


function Guest() {
  const [name, setName] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nombre:", name);
    console.log("Patente:", licensePlate);
    // Aquí podrías hacer un fetch o axios POST a un backend
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>Registro de invitado</h2>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Nombre</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              required
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
            />
            <label>Patente</label>
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
}

export default Guest;
