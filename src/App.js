import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import Soporte from "./pages/Soporte";
import Contacto from "./pages/Contacto";
import SubirFactura from "./pages/SubirFactura";
import ListadoFacturas from "./pages/ListadoFacturas";
import DetalleFactura from "./pages/DetalleFactura";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/soporte" element={<Soporte />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/listado-facturas" element={<ListadoFacturas />} />
        <Route path="/detalle-factura/:id" element={<DetalleFactura />} />
        <Route path="/subir-factura" element={<SubirFactura />} /> {/* Nueva Ruta */}
      </Routes>
    </Router>


  );
}

export default App;
