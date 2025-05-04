import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function DetalleFactura() {
  const { id } = useParams();
  const [factura, setFactura] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const facturas = JSON.parse(localStorage.getItem("facturas")) || [];
    const facturaSeleccionada = facturas.find(f => f.id === Number(id));
    setFactura(facturaSeleccionada);
  }, [id]);

  if (!factura) {
    return <p>Cargando o factura no encontrada...</p>;
  }

  return (
    <div style={styles.container}>
      <h1>Detalle de Factura</h1>
      <div style={styles.card}>
        <p><strong>Número:</strong> {factura.numero}</p>
        <p><strong>Fecha:</strong> {factura.fecha}</p>
        <p><strong>Empresa:</strong> {factura.empresa}</p>
        <p><strong>Precio (sin IVA):</strong> ${Number(factura.precio).toFixed(2)}</p>
        <p><strong>IVA (19%):</strong> ${Number(factura.devolucion).toFixed(2)}</p>
        {factura.imagen && (
          <div>
            <strong>Imagen/Texto OCR:</strong>
            <div style={styles.imagenBox}>
              {factura.imagen.startsWith("data:image") ? (
                <img src={factura.imagen} alt="Factura" style={styles.imagen} />
              ) : (
                <pre style={styles.ocrText}>{factura.imagen}</pre>
              )}
            </div>
          </div>
        )}
      </div>
      <button onClick={() => navigate("/listado-facturas")} style={styles.button}>
        Volver al listado
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#fff3e0",
    minHeight: "100vh",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  imagenBox: {
    marginTop: "10px",
  },
  imagen: {
    maxWidth: "100%",
    borderRadius: "5px",
  },
  ocrText: {
    whiteSpace: "pre-wrap",
    backgroundColor: "#eee",
    padding: "10px",
    borderRadius: "5px",
  },
  button: {
    marginTop: "20px",
    backgroundColor: "#1565c0",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default DetalleFactura;
