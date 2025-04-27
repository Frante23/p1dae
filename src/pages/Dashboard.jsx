import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';
import "../styles/login.css";

const Dashboard = () => {
  const [facturas, setFacturas] = useState([]);

  // Cargar las facturas desde localStorage al iniciar el componente
  useEffect(() => {
    const facturasGuardadas = JSON.parse(localStorage.getItem("facturas")) || [];
    setFacturas(facturasGuardadas);
  }, []);

  // Función para convertir las facturas a un formato adecuado para los gráficos
  const procesarFacturasParaGrafico = () => {
    return facturas.map(factura => ({
      name: factura.fecha,  // Usamos la fecha de la factura como el nombre
      factura: factura.precio,  // Usamos el precio de la factura como el monto
    }));
  };

  return (
    <div className="dashboard-container">
      <h1>Bienvenido al Dashboard</h1>
      <nav className="dashboard-nav">
        <Link to="/perfil">Perfil</Link> | 
        <Link to="/soporte">Soporte</Link> | 
        <Link to="/contacto">Contacto</Link>
        <Link to="/listado-facturas">Listado de Facturas</Link>
        <Link to="/subir-factura">Subir Factura</Link>
      </nav>

      {/* Gráfico de Facturación (Líneas) */}
      <div className="chart-container">
        <h2>Gráfico de Líneas</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={procesarFacturasParaGrafico()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="factura" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Facturación (Barras) */}
      <div className="chart-container">
        <h2>Gráfico de Barras</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={procesarFacturasParaGrafico()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="factura" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de Facturas Recientes */}
      <div className="invoices">
        <h2>Facturas Recientes</h2>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Factura</th>
              <th>Monto</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {facturas.length > 0 ? (
              facturas.map((factura, index) => (
                <tr key={index}>
                  <td>{factura.fecha}</td>
                  <td>{factura.numero}</td>
                  {/* Verificamos si precio es un número antes de llamarlo a toFixed */}
                  <td>${Number(factura.precio).toFixed(2)}</td>
                  <td>{factura.empresa}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay facturas disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
