import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface NotificacionesProps {
  notificaciones: { id: number; mensaje: string }[];
  marcarComoLeida: (id: number) => void; 
}

const Notificaciones: React.FC<NotificacionesProps> = ({
  notificaciones,
  marcarComoLeida,
}) => {
  return (
    <div className="absolute top-20 right-5 border border-beigeclaro max-h-50 max-w-[250px] min-h-10 min-w-40 flex flex-col bg-white shadow-lg">
      <div className="w-full p-2 text-base text-customBlue font-bold border-b text-center bg-beigeclaro">
        NOTIFICACIONES
      </div>
      <div>
        {notificaciones.length > 0 ? (
            notificaciones.map((notificacion) => (
            <div
                key={notificacion.id}
                className="p-2 border-b last:border-b-0 text-sm flex justify-between items-center hover:bg-gray-100"
            >
                <span>{notificacion.mensaje}</span>
                <button
                onClick={() => marcarComoLeida(notificacion.id)}
                className="text-slate-400 hover:text-customBlue"
                aria-label="Marcar como leída"
                >
                <CheckCircleIcon className="w-5 h-5" />
                </button>
            </div>
            ))
        ): (
            <div className="p-2 text-sm text-center text-gray-500">
                No tienes notificaciones
            </div>
        )}
      </div>
    </div>
  );
};

export default Notificaciones;

