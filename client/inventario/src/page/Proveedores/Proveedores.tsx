import { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import "./provstyles.css";
import { Button, Input } from "../../components/ui/UiComponents";

interface Proveedor {
    id: number;
    nombre: string;
    tipo: string;
    contacto: string;
    telefono: string;
    ciudad: string;
    estado: string;
}

const proveedoresIniciales: Proveedor[] = Array(3).fill({
    id: 0,
    nombre: "Snickers World",
    tipo: "Zapatillas",
    contacto: "Juan Perez",
    telefono: "155233322",
    ciudad: "Buenos Aires",
    estado: "Disponible"
}).map((prov, index) => ({ ...prov, id: index + 1 }));

export default function Proveedores() {
    const [proveedores, setProveedores] = useState(proveedoresIniciales);
    const [busqueda, setBusqueda] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("");
    const [ordenEstado, setOrdenEstado] = useState<"asc" | "desc" | null>(null);

    const agregarProveedor = () => {
        const nuevoProveedor = {
            nombre: 'Proveedor 1',
            id: Date.now(),
            tipo: 'Desconocido',
            contacto: 'Sin contacto',
            telefono: '000000000',
            ciudad: 'Sin ciudad',
            estado: 'Disponible'
        };
        setProveedores([...proveedores, nuevoProveedor]);
    };

    const cambiarEstado = (id: number, nuevoEstado: string) => {
        setProveedores(proveedores.map(prov =>
            prov.id === id ? { ...prov, estado: nuevoEstado } : prov
        ));
    };

    const filtrarProveedores = proveedores.filter(prov => {
        const coincideNombre = prov.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const coincideEstado = filtroEstado ? prov.estado === filtroEstado : true;
        return coincideNombre && coincideEstado;
    });

    const ordenarProveedores = () => {
        if (!ordenEstado) return filtrarProveedores;
        return filtrarProveedores.sort((a, b) => {
            if (ordenEstado === "asc") return a.estado.localeCompare(b.estado);
            return b.estado.localeCompare(a.estado);
        });
    };

    const proveedoresFiltradosYOrdenados = ordenarProveedores();

    return (
        <div className="container">
            <h2 className="title">Proveedores</h2>
            <div className="filters">
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <Input
                        placeholder="Buscar producto por nombre"
                        className="search-input"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
                <select
                    className="status-filter"
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
            <table className="table">
                <thead>
                    <tr>
                        <th>Proveedor</th>
                        <th>Tipo</th>
                        <th>Contacto</th>
                        <th>Teléfono</th>
                        <th>Ciudad</th>
                        <th>
                            Estado
                            <button
                                className="sort-button"
                                onClick={() => setOrdenEstado(ordenEstado === "asc" ? "desc" : "asc")}
                            >
                                {ordenEstado === "asc" ? <FaSortUp /> : ordenEstado === "desc" ? <FaSortDown /> : <FaSort />}
                            </button>
                        </th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedoresFiltradosYOrdenados.map(({ id, nombre, tipo, contacto, telefono, ciudad, estado }) => (
                        <tr key={id}>
                            <td>{nombre}</td>
                            <td>{tipo}</td>
                            <td>{contacto}</td>
                            <td>{telefono}</td>
                            <td>{ciudad}</td>
                            <td>
                                <select
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
                            <td className="actions">
                                <button className="edit" aria-label="Editar"><FaEdit /></button>
                                <button className="delete" aria-label="Eliminar"><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Button className="add-button" onClick={agregarProveedor}>
                <FaPlus /> Agregar producto
            </Button>
        </div>
    );
}