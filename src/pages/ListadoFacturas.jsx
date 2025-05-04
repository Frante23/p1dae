import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ListadoFacturas() {
  const navigate = useNavigate();
  const [facturas, setFacturas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [facturaAEliminar, setFacturaAEliminar] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // Cargar facturas por defecto al inicio
  useEffect(() => {
    const facturasGuardadas = JSON.parse(localStorage.getItem("facturas"));
    if (!facturasGuardadas || facturasGuardadas.length === 0) {
      const facturasIniciales = [
        { id: 1, numero: "FAC-001", fecha: "2025-04-15", precio: 4000, empresa: "Falabella" },
        { id: 2, numero: "FAC-002", fecha: "2025-04-20", precio: 3000, empresa: "Ripley" },
        { id: 3, numero: "FAC-003", fecha: "2025-04-25", precio: 2000, empresa: "La Polar" },
      ];
      localStorage.setItem("facturas", JSON.stringify(facturasIniciales));
      setFacturas(facturasIniciales);
    } else {
      setFacturas(facturasGuardadas);
    }
  }, []);

  const agregarFactura = (factura) => {
    const nuevasFacturas = [...facturas, factura];
    localStorage.setItem("facturas", JSON.stringify(nuevasFacturas));
    setFacturas(nuevasFacturas);
  };

  const mostrarConfirmacionEliminar = (factura) => {
    setFacturaAEliminar(factura);
    setMostrarModal(true);
  };

  const eliminarFactura = () => {
    const nuevasFacturas = facturas.filter(f => f.id !== facturaAEliminar.id);
    localStorage.setItem("facturas", JSON.stringify(nuevasFacturas));
    setFacturas(nuevasFacturas);
    setMostrarModal(false);
  };

  const cancelarEliminar = () => {
    setMostrarModal(false);
  };

  const exportarFacturas = () => {
    const blob = new Blob([JSON.stringify(facturas, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "facturas.json";
    link.click();
  };

  // Ordenar y filtrar facturas
  const facturasOrdenadas = [...facturas].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  const facturasOrdenadasFiltradas = facturasOrdenadas
    .filter((f) =>
      f.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
      f.empresa.toLowerCase().includes(busqueda.toLowerCase())
    )
    .filter((f) => {
      const fecha = new Date(f.fecha);
      const inicio = fechaInicio ? new Date(fechaInicio) : null;
      const fin = fechaFin ? new Date(fechaFin) : null;
      return (!inicio || fecha >= inicio) && (!fin || fecha <= fin);
    });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Listado de Facturas</h1>

      <p>
        Total de facturas: {facturas.length} <br />
        Monto total: ${facturas.reduce((acc, f) => acc + Number(f.precio), 0).toFixed(2)}
      </p>

      {facturas.length > 0 && (
        <p>
          📈 Factura más cara:{" "}
          {facturas.reduce((max, f) => (f.precio > max.precio ? f : max), facturas[0]).numero} ($
          {facturas.reduce((max, f) => (f.precio > max.precio ? f : max), facturas[0]).precio})
        </p>
      )}

      <button onClick={() => navigate(`/subir-factura`)} style={styles.button}>
        Subir Factura
      </button>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Buscar por número o empresa..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            padding: "8px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ marginTop: "10px", marginBottom: "20px" }}>
        <label>Desde: </label>
        <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
        <label style={{ marginLeft: "10px" }}>Hasta: </label>
        <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
      </div>

      <button style={styles.button} onClick={exportarFacturas}>
        Descargar JSON
      </button>

      {facturasOrdenadasFiltradas.length > 0 ? (
        facturasOrdenadasFiltradas.map((factura, index) => (
          <div
            key={factura.id}
            style={{
              ...styles.facturaCard,
              backgroundColor: index % 2 === 0 ? "#ffffff" : "#f1f8e9"
            }}
          >
            <div style={styles.info}>
              <h3>{factura.numero}</h3>
              <p>Fecha: {factura.fecha}</p>
              <p>Monto: ${Number(factura.precio).toFixed(2)}</p>
              <p>IVA: ${(Number(factura.precio) * 0.19).toFixed(2)}</p>
              <p>Empresa: {factura.empresa}</p>
              <button
                onClick={() => mostrarConfirmacionEliminar(factura)}
                style={styles.eliminarButton}
              >
                Eliminar Factura
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No hay facturas disponibles con los filtros aplicados.</p>
      )}

      <button style={styles.button} onClick={() => navigate('/dashboard')}>
        Volver al Dashboard
      </button>

      {mostrarModal && (
        <div style={styles.modalBackground}>
          <div style={styles.modal}>
            <h3>¿Estás seguro de eliminar esta factura?</h3>
            <div style={styles.modalButtons}>
              <button onClick={cancelarEliminar} style={styles.button}>
                Cancelar
              </button>
              <button onClick={eliminarFactura} style={styles.eliminarButton}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#e3f2fd",
    minHeight: "100vh",
  },
  title: {
    color: "#1565c0",
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "30px",
  },
  facturaCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: "10px auto",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    maxWidth: "600px",
  },
  info: {
    textAlign: "left",
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
  eliminarButton: {
    backgroundColor: "#e53935",
    color: "white",
    padding: "5px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  modalBackground: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
};

export default ListadoFacturas;
