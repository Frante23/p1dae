import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ListadoFacturas() {
  const navigate = useNavigate();
  const [facturas, setFacturas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [facturaAEliminar, setFacturaAEliminar] = useState(null);

  // Cargar facturas por defecto al inicio
  useEffect(() => {
    // Recuperar las facturas del localStorage
    const facturasGuardadas = JSON.parse(localStorage.getItem("facturas"));

    // Verificar lo que se recuperó del localStorage
    console.log("Facturas del localStorage:", facturasGuardadas);

    // Si no hay facturas en el localStorage, usar las facturas iniciales
    if (!facturasGuardadas || facturasGuardadas.length === 0) {
      const facturasIniciales = [
        {
          id: 1,
          numero: "FAC-001",
          fecha: "2025-04-15",
          precio: 4000,
          empresa: "Falabella",
        },
        {
          id: 2,
          numero: "FAC-002",
          fecha: "2025-04-20",
          precio: 3000,
          empresa: "Ripley",
        },
        {
          id: 3,
          numero: "FAC-003",
          fecha: "2025-04-25",
          precio: 2000,
          empresa: "La Polar",
        }
      ];
      // Guardar las facturas iniciales en el localStorage si no existen
      localStorage.setItem("facturas", JSON.stringify(facturasIniciales));
      setFacturas(facturasIniciales);
    } else {
      // Si hay facturas, las cargamos en el estado
      setFacturas(facturasGuardadas);
    }
  }, []);

  // Función para agregar una nueva factura
  const agregarFactura = (factura) => {
    // Crear una nueva lista de facturas con la factura agregada
    const nuevasFacturas = [...facturas, factura];

    // Guardar la lista de facturas en el localStorage
    localStorage.setItem("facturas", JSON.stringify(nuevasFacturas));

    // Actualizar el estado con las nuevas facturas
    setFacturas(nuevasFacturas);
  };

  // Función para mostrar el modal de confirmación
  const mostrarConfirmacionEliminar = (factura) => {
    setFacturaAEliminar(factura);  // Guardar la factura que será eliminada
    setMostrarModal(true);  // Mostrar el modal
  };

  // Función para eliminar la factura
  const eliminarFactura = () => {
    const nuevasFacturas = facturas.filter(
      (factura) => factura.id !== facturaAEliminar.id
    );
    localStorage.setItem("facturas", JSON.stringify(nuevasFacturas));
    setFacturas(nuevasFacturas);
    setMostrarModal(false);  // Cerrar el modal
  };

  // Función para cancelar la eliminación
  const cancelarEliminar = () => {
    setMostrarModal(false);  // Cerrar el modal sin eliminar
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Listado de Facturas</h1>
      <button
        onClick={() => navigate(`/subir-factura`)}  // Redirige al formulario de subir factura
        style={styles.button}
      >
        Subir Factura
      </button>

      {facturas.length > 0 ? (
        facturas.map((factura) => (
          <div key={factura.id} style={styles.facturaCard}>
            <div style={styles.info}>
              <h3>{factura.numero}</h3>
              <p>Fecha: {factura.fecha}</p>
              <p>Monto: ${Number(factura.precio).toFixed(2) || "No disponible"}</p>
              <p>IVA: ${((Number(factura.precio) * 0.19) || 0).toFixed(2)}</p> {/* Calcular el IVA */}
              <p>Estado: {factura.empresa || "No disponible"}</p>
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
        <p>No hay facturas disponibles</p>
      )}

      <button style={styles.button} onClick={() => navigate('/dashboard')}>
        Volver al Dashboard
      </button>

      {/* Modal de confirmación de eliminación */}
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
    backgroundColor: "white",
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
