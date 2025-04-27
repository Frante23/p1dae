import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetalleFactura() {
  const { id } = useParams();
  const [factura, setFactura] = useState(null);

  useEffect(() => {
    // Aquí deberías cargar la factura desde una base de datos o similar
    const facturaData = {
      id: 1,
      numero: "FAC-001",
      fecha: "2025-04-15",
      imagen: "https://via.placeholder.com/150?text=Factura+1",
      precio: "$150.000",
      empresa: "Empresa A",
      horaCompra: "12:30 PM",
      devolucion: "$30.000",
    };

    setFactura(facturaData);
  }, [id]);

  if (!factura) return <div>Cargando...</div>;

  return (
    <div style={styles.container}>
      <h1>Detalle de la Factura</h1>
      <img src={factura.imagen} alt={factura.numero} style={styles.image} />
      <div style={styles.info}>
        <h3>{factura.numero}</h3>
        <p>Fecha: {factura.fecha}</p>
        <p>Hora de Compra: {factura.horaCompra}</p>
        <p>Empresa: {factura.empresa}</p>
        <p>Precio: {factura.precio}</p>
        <p>Devolución: {factura.devolucion}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#e3f2fd",
    minHeight: "100vh",
  },
  image: {
    width: "150px",
    height: "150px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  info: {
    textAlign: "left",
  },
};

export default DetalleFactura;
