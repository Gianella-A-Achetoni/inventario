import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { Button, Input } from "../../components/ui/UiComponents";
import Modal from "../../components/Form/Modal"; // Importa el modal aquí

interface Proveedor {
    id: number;
    nombre: string;
    tipo: string;
    contacto: string;
    telefono: string;
    ciudad: string;
    estado: string;
}

// Datos iniciales simulados
const proveedoresIniciales: Proveedor[] = Array(3).fill({
    nombre: "Freddo",
    tipo: "Helado",
    contacto: "Juan Perez",
    telefono: "155233322",
    ciudad: "Buenos Aires",
    estado: "Disponible"
}).map((prov, index) => ({ ...prov, id: index + 1 }));

export default function Proveedores() {
    const [proveedores, setProveedores] = useState<Proveedor[]>(proveedoresIniciales);
    const [busqueda, setBusqueda] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("");
    const [ordenEstado, setOrdenEstado] = useState<"asc" | "desc" | null>(null);
    const [productoEditar, setProductoEditar] = useState<Proveedor | undefined >(undefined);
    const [modalOpen, setModalOpen] = useState(false);

    // Eliminar proveedor
    const eliminarProveedor = (id: number) => {
        setProveedores(proveedores.filter(prov => prov.id !== id));
        toast.success("Proveedor eliminado con éxito");
    };

    // Agregar nuevo proveedor
    const agregarProveedor = () => {
        setProductoEditar(undefined); // Esto asegura que no se cargue un proveedor al abrir el modal para agregar
        setModalOpen(true); // Abre el modal para agregar un nuevo proveedor
    };

    // Guardar proveedor (Agregar o Editar)
    const guardarProveedor = (proveedor: Proveedor) => {
        if (productoEditar) {
            // Editar proveedor existente
            setProveedores(proveedores.map((prov) => (prov.id === productoEditar.id ? proveedor : prov)));
            toast.success("Proveedor editado con éxito");
        } else {
            // Agregar nuevo proveedor
            setProveedores([...proveedores, proveedor]);
            toast.success("Proveedor agregado con éxito");
        }
        setModalOpen(false);
        setProductoEditar(undefined); 
    };

    // Cambiar estado del proveedor
    const cambiarEstado = (id: number, nuevoEstado: string) => {
        setProveedores(proveedores.map(prov =>
            prov.id === id ? { ...prov, estado: nuevoEstado } : prov
        ));
    };

    // Filtrar y ordenar proveedores
    const ordenarProveedores = () => {
        let lista = proveedores.filter(prov =>
            prov.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
            (!filtroEstado || prov.estado === filtroEstado)
        );

        if (ordenEstado) {
            lista = [...lista].sort((a, b) =>
                ordenEstado === "asc" ? a.estado.localeCompare(b.estado) : b.estado.localeCompare(a.estado)
            );
        }

        return lista;
    };

    useEffect(() => {
        const cargarProveedores = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simula carga
                setProveedores(proveedoresIniciales);
            } catch (error) {
                console.error("Error cargando proveedores:", error);
                toast.error("Error al cargar proveedores");
            }
        };
        cargarProveedores();
    }, []);

    return (
        <div className="p-5 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-semibold mb-5">Agenda de Proveedores</h2>

            {/* Filtros */}
            <div className="flex flex-col md:flex-row gap-4 mb-5">
                <div className="relative w-full md:w-1/2">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Buscar proveedor por nombre"
                        className="pl-10 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
                <select
                    className="p-2 border border-gray-300 rounded-md shadow-sm w-full md:w-1/4"
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                >
                    <option value="">Todos los estados</option>
                    {["Disponible", "Por agotarse", "Agotado"].map((estado) => (
                        <option key={estado} value={estado}>
                            {estado}
                        </option>
                    ))}
                </select>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600">
                            <th className="py-3 px-4 text-left">Proveedor</th>
                            <th className="py-3 px-4 text-left">Tipo</th>
                            <th className="py-3 px-4 text-left">Contacto</th>
                            <th className="py-3 px-4 text-left">Teléfono</th>
                            <th className="py-3 px-4 text-left">Ciudad</th>
                            <th className="py-3 px-4 flex items-center">
                                Estado
                                <button
                                    className="ml-2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setOrdenEstado(ordenEstado === "asc" ? "desc" : "asc")}
                                >
                                    {ordenEstado === "asc" ? <FaSortUp /> : ordenEstado === "desc" ? <FaSortDown /> : <FaSort />}
                                </button>
                            </th>
                            <th className="py-3 px-4">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenarProveedores().map(({ id, nombre, tipo, contacto, telefono, ciudad, estado }) => (
                            <tr key={id} className="border-t border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-4">{nombre}</td>
                                <td className="py-3 px-4">{tipo}</td>
                                <td className="py-3 px-4">{contacto}</td>
                                <td className="py-3 px-4">{telefono}</td>
                                <td className="py-3 px-4">{ciudad}</td>
                                <td className="py-3 px-4">
                                    <select
                                        className="p-2 border border-gray-300 rounded-md"
                                        value={estado}
                                        onChange={(e) => cambiarEstado(id, e.target.value)}
                                    >
                                        {["Disponible", "Por agotarse", "Agotado"].map((estadoOption) => (
                                            <option key={estadoOption} value={estadoOption}>
                                                {estadoOption}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="py-3 px-4 flex gap-2">
                                    <button className="text-blue-500 hover:text-blue-700" onClick={() => {
                                        setProductoEditar(proveedores.find(prov => prov.id === id) || undefined);
                                        setModalOpen(true); // Abre el modal para editar
                                    }}>
                                        <FaEdit />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700" onClick={() => eliminarProveedor(id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Botón para agregar proveedor */}
            <Button
                className="mt-5 flex items-center gap-2 px-4 py-2 font-bold border-2 border-black bg-blue-900 text-white rounded-md shadow-md hover:bg-blue-800"
                onClick={agregarProveedor}
            >
                <FaPlus /> Agregar proveedor
            </Button>

            {/* Modal para agregar/editar proveedor */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={guardarProveedor}
                proveedor={productoEditar}
            />
        </div>
    );
}
