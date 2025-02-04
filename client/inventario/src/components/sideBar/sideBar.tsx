import { HomeIcon, CubeIcon, TruckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuth';

interface SideBarProps {
  closeSidebar: () => void; 
  setIsSidebarOpen: (state: boolean) => void; // Recibe setIsSidebarOpen como prop
}

const SideBar: React.FC<SideBarProps> = ({ closeSidebar, setIsSidebarOpen }) => {
  const handleLinkClick = () => {
    closeSidebar(); // Llama a closeSidebar para cerrarlo
    setIsSidebarOpen(false); // Asegura que el estado en el Layout se actualice
  };

  return (
    <div className="w-full h-full bg-customBlue text-beigeclaro p-5 space-y-4 flex flex-col">
      <h2 className="text-xl font-bold mb-5 mt-3"> STOCKLY </h2>
      <ul className="space-y-2 flex-1">
        <li>
          <Link
            to="./home"
            className="flex items-center py-2 px-4 hover:bg-bluelith rounded"
            onClick={handleLinkClick}
          >
            <HomeIcon className="w-6 h-6 mr-3" />
            HOME
          </Link>
        </li>
        <li>
          <Link
            to="./inventario"
            className="flex items-center py-2 px-4 hover:bg-bluelith rounded"
            onClick={handleLinkClick}
          >
            <CubeIcon className="w-6 h-6 mr-3" />
            INVENTARIO
          </Link>
        </li>
        <li>
          <Link
            to="./proveedores"
            className="flex items-center py-2 px-4 hover:bg-bluelith rounded"
            onClick={handleLinkClick}
          >
            <TruckIcon className="w-6 h-6 mr-3" />
            PROVEDORES
          </Link>
        </li>
        <li>
          <Link
            to="./reportes"
            className="flex items-center py-2 px-4 hover:bg-bluelith rounded"
            onClick={handleLinkClick}
          >
            <ExclamationTriangleIcon className="w-6 h-6 mr-3" />
            REPORTES
          </Link>
        </li>
      </ul>

      <div>
        <button
        className=''
        onClick={() =>{
          const logout = useAuthStore.getState().logout
          logout()
          window.location.href = '../../ingreso/login'
        }}
        >
          Cerrar Sesión
        </button>
      </div>

      <footer className="mt-auto text-sm text-center bg-gradient-to-b from-transparent py-4 border-t border-beigeclaro">
        <p className=''>&copy;equipo s20-21 2025</p>
      </footer>
    </div>
  );
};

export default SideBar;
