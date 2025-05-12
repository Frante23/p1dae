// src/pages/Historial.jsx
import React, { useEffect, useState } from "react";

const Historial = () => {
  const [facturas, setFacturas] = useState([]);

  // Cargar las facturas desde localStorage cuando el componente se monta
  useEffect(() => {
    const facturasExistentes = JSON.parse(localStorage.getItem("facturas")) || [];
    setFacturas(facturasExistentes);
  }, []);

  return (
    <div className="historial-container" style={{ padding: "2rem" }}>
      <h2>📄 Historial de Cargas</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={thStyle}>Fecha</th>
            <th style={thStyle}>Archivo</th>
            <th style={thStyle}>Proveedor</th>
            <th style={thStyle}>Monto</th>
            <th style={thStyle}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {facturas.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "1rem" }}>
                No hay facturas cargadas.
              </td>
            </tr>
          ) : (
            facturas.map((item, index) => (
              <tr key={index} style={index % 2 === 0 ? rowEvenStyle : rowOddStyle}>
                <td style={tdStyle}>{item.fecha}</td>
                <td style={tdStyle}>{item.numero}</td>
                <td style={tdStyle}>{item.empresa}</td>
                <td style={tdStyle}>{item.precio}</td>
                <td style={{ ...tdStyle, color: item.devolucion > 0 ? "green" : "red" }}>
                  {item.devolucion > 0 ? "Procesado" : "Error en OCR"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  padding: "0.75rem",
  textAlign: "left",
  borderBottom: "2px solid #ccc"
};

const tdStyle = {
  padding: "0.75rem",
  borderBottom: "1px solid #ddd"
};

const rowEvenStyle = {
  backgroundColor: "#ffffff"
};

const rowOddStyle = {
  backgroundColor: "#f9f9f9"
};

export default Historial;
