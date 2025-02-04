import { useState, useEffect } from "react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// Define la interfaz para las props
interface NavBarProps {
  toggleSidebar: () => void; // Función para abrir/cerrar el sidebar
  isSidebarOpen: boolean;    // Estado del sidebar
  cantidadNotificaciones: number; // Número de notificaciones
  toggleNotifications: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleSidebar, isSidebarOpen, cantidadNotificaciones, toggleNotifications }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(isSidebarOpen); // Estado local del botón de menú

  useEffect(() => {
    setIsMenuOpen(isSidebarOpen);
  }, [isSidebarOpen]);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    toggleSidebar();
  };

  return (
    <nav className="flex items-center justify-between h-full px-6 bg-beige text-customBlue shadow-md">
      {/* Logo o título */}
      <div className="text-2xl font-bold">
        <button
          className="md:hidden font-bold text-lg"
          aria-label="Abrir Sidebar"
          onClick={handleToggle}
        >
          STOCKLY
        </button>
      </div>

      {/* Botón para abrir/cerrar el sidebar en móviles */}
      <button
        className={`md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full hover:bg-beigeclaro`}
        onClick={handleToggle}
        aria-label="Abrir/Cerrar Sidebar"
      >
        <div
          className={`w-6 h-0.5 bg-customBlue transition-transform duration-300 ${
            isMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-customBlue my-1 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-customBlue transition-transform duration-300 ${
            isMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></div>
      </button>

      {/* Iconos de navegación */}
      <div className="flex items-center space-x-6">
        {/* Icono de notificaciones */}
        <button
          className="relative p-2 rounded-full hover:bg-[rgb(245, 239, 231)]"
          onClick={toggleNotifications}
          aria-label="Notificaciones"
        >
          <BellIcon className="w-7 h-7" />
          {cantidadNotificaciones > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-beigeclaro text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {cantidadNotificaciones}
            </span>
          )}
        </button>

        {/* Icono de perfil */}
        <Link to="./perfil" className="p-2 rounded-full hover:bg-beigeclaro">
          <UserCircleIcon className="w-8 h-8" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;