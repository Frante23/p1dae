import React from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../styles/login.css";

const data = [
  { name: 'Enero', factura: 4000 },
  { name: 'Febrero', factura: 3000 },
  { name: 'Marzo', factura: 2000 },
  { name: 'Abril', factura: 2780 },
  { name: 'Mayo', factura: 1890 },
  { name: 'Junio', factura: 2390 },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Bienvenido al Dashboard</h1>
      <nav className="dashboard-nav">
        <Link to="/perfil">Perfil</Link> | 
        <Link to="/soporte">Soporte</Link> | 
        <Link to="/contacto">Contacto</Link>
      </nav>

      {/* Gráfico de Facturas */}
      <div className="chart-container">
        <h2>Gráfico de Facturación</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="factura" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Facturas Recientes */}
      <div className="invoices">
        <h2>Facturas Recientes</h2>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Monto</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01/04/2025</td>
              <td>Cliente A</td>
              <td>$500</td>
              <td>Pagado</td>
            </tr>
            <tr>
              <td>02/04/2025</td>
              <td>Cliente B</td>
              <td>$300</td>
              <td>Pendiente</td>
            </tr>
            <tr>
              <td>03/04/2025</td>
              <td>Cliente C</td>
              <td>$450</td>
              <td>Pagado</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
