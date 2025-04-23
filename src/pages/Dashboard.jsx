import React from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";

const Dashboard = () => {
  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <nav>
        <Link to="/productos">Productos</Link> | 
        <Link to="/carrito">Carrito</Link> | 
        <Link to="/perfil">Perfil</Link> | 
        <Link to="/soporte">Soporte</Link> | 
        <Link to="/contacto">Contacto</Link>
      </nav>
    </div>
  );
};

export default Dashboard;
