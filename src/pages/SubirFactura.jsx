import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js"; // Importa la librería de OCR

function SubirFactura() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    numero: "",
    fecha: "",
    imagen: "",
    precio: "",
    empresa: "",
  });
  const [devolucion, setDevolucion] = useState(0);
  const [loading, setLoading] = useState(false); // Para mostrar el estado de carga
  const [isImageFromCamera, setIsImageFromCamera] = useState(false); // Determina si la imagen viene de la cámara

  // Maneja el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Cálculo del IVA
    if (name === "precio") {
      const precioNeto = parseFloat(value);
      if (!isNaN(precioNeto)) {
        const iva = precioNeto * 0.19; // IVA 19%
        setDevolucion(iva);
      } else {
        setDevolucion(0);
      }
    }
  };

  // Función para manejar la carga de la imagen (foto o URL)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (isImageFromCamera) {
        // Si la imagen viene de la cámara, se procesa con OCR
        setLoading(true);
        Tesseract.recognize(
          file,
          "eng", // Idioma de la imagen
          {
            logger: (m) => console.log(m), // Opcional, para ver el progreso
          }
        ).then(({ data: { text } }) => {
          setLoading(false);
          setFormData({
            ...formData,
            imagen: text, // Aquí almacenamos el texto extraído de la imagen
          });
        });
      } else {
        // Si no es desde la cámara, simplemente se guarda el archivo (por ejemplo, una URL)
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({
            ...formData,
            imagen: reader.result, // Aquí almacenamos la imagen como URL base64
          });
        };
        reader.readAsDataURL(file); // Convierte la imagen en una URL base64
      }
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const facturaConDevolucion = {
      ...formData,
      devolucion,
      id: Date.now(), // Aseguramos un id único usando la fecha actual
    };

    // Obtener facturas previas (si existen) y agregamos la nueva factura
    const facturasExistentes = JSON.parse(localStorage.getItem("facturas")) || [];
    facturasExistentes.push(facturaConDevolucion);

    // Guardamos todas las facturas en localStorage
    localStorage.setItem("facturas", JSON.stringify(facturasExistentes));

    // Redirigir al listado de facturas después de subir la nueva factura
    navigate("/listado-facturas");
  };

  return (
    <div style={styles.container}>
      <h1>Subir Factura</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label>Numero de Factura:</label>
          <input
            type="text"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Fecha:</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>¿Subir foto o URL de la factura?</label>
          <div>
            <label>
              <input
                type="radio"
                name="imagen"
                value="foto"
                onChange={() => setIsImageFromCamera(true)}
                checked={isImageFromCamera}
              />
              Tomar Foto con la Cámara
            </label>
            <label>
              <input
                type="radio"
                name="imagen"
                value="url"
                onChange={() => setIsImageFromCamera(false)}
                checked={!isImageFromCamera}
              />
              Subir URL de la Imagen
            </label>
          </div>
        </div>
        {isImageFromCamera ? (
          <div style={styles.inputGroup}>
            <label>Tomar Foto:</label>
            <input
              type="file"
              accept="image/*"
              capture="camera"
              onChange={handleImageUpload}
              required
            />
            {loading && <p>Procesando imagen...</p>}
          </div>
        ) : (
          <div style={styles.inputGroup}>
            <label>Imagen URL:</label>
            <input
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
            />
          </div>
        )}
        <div style={styles.inputGroup}>
          <label>Precio (sin IVA):</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Devolución (IVA 19%):</label>
          <input
            type="text"
            name="devolucion"
            value={`$${devolucion.toFixed(2)}`}
            disabled
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Empresa:</label>
          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Subir Factura</button>
      </form>
      <div style={{ marginTop: "20px" }}>
        <button
          style={styles.button}
          onClick={() => navigate("/historial")}
        >
          Ver Historial de Facturas
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#f1f8e9",
    minHeight: "100vh",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  button: {
    backgroundColor: "#1565c0",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default SubirFactura;
