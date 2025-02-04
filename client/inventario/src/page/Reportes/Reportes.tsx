import "./reportes.css";
import { FaInfoCircle, FaDownload } from "react-icons/fa";

const Reportes = () => {
  const reportes = [
    { id: 1, descripcion: "Producto Agregado / Eliminado / Modificado", tiempo: "Hace 2 hrs" },
    { id: 2, descripcion: "Producto Agregado / Eliminado / Modificado", tiempo: "Hace 2 hrs" },
    { id: 3, descripcion: "Producto Agregado / Eliminado / Modificado", tiempo: "Hace 2 hrs" },
    { id: 4, descripcion: "Producto Agregado / Eliminado / Modificado", tiempo: "Hace 2 hrs" },
  ];

  return (
    <div className="reportes-container">
      <div className="reportes-header">
        <h2>Reportes</h2>
        <p>Centro de Notificaciones y Modificaciones del Inventario</p>
        <button className="reportes-button">
          <FaDownload /> Reportes PDF
        </button>
      </div>

      <h3>Actualizaciones</h3>
      <div className="reportes-list">
        {reportes.map((reporte) => (
          <div key={reporte.id} className="reporte-item">
            <FaInfoCircle className="info-icon" />
            <div className="reporte-content">
              <strong>{reporte.descripcion}</strong>
              <p>Nombre del Producto, Acción Realizada (01/02 - 13:00hr)</p>
              <span>{reporte.tiempo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reportes;
