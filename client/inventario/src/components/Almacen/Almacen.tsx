import { useState } from "react";
import { FaEdit, FaTrash, FaSearch, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import "./almacen.css";

interface Almacen {
    id: number;
    almacen: string;
    cantidad: number;
    estado: string;
}

const AlmacenesIniciales: Almacen[] = [
    { id: 1, almacen: "Inventario A", cantidad: 120, estado: "Disponible" },
    { id: 2, almacen: "Inventario B", cantidad: 190, estado: "Por agotarse" },
    { id: 3, almacen: "Inventario C", cantidad: 300, estado: "Disponible" },
    { id: 4, almacen: "Inventario D", cantidad: 50, estado: "Agotado" },
    { id: 5, almacen: "Inventario E", cantidad: 200, estado: "Disponible" },
];

const TablaAlmacenes = () => {
    const [almacenes, setAlmacenes] = useState(AlmacenesIniciales);
    const [busqueda, setBusqueda] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("");
    const [ordenEstado, setOrdenEstado] = useState<"asc" | "desc" | null>(null);

    const cambiarEstado = (id: number, nuevoEstado: string) => {
        setAlmacenes(almacenes.map(item =>
            item.id === id ? { ...item, estado: nuevoEstado } : item
        ));
    };

    const filtrarAlmacenes = almacenes.filter(item => {
        const coincideNombre = item.almacen.toLowerCase().includes(busqueda.toLowerCase());
        const coincideEstado = filtroEstado ? item.estado === filtroEstado : true;
        return coincideNombre && coincideEstado;
    });

    const ordenarAlmacenes = () => {
        if (!ordenEstado) return filtrarAlmacenes;
        return filtrarAlmacenes.sort((a, b) => {
            if (ordenEstado === "asc") return a.estado.localeCompare(b.estado);
            return b.estado.localeCompare(a.estado);
        });
    };

    const almacenesFiltradosYOrdenados = ordenarAlmacenes();

    return (
        <div className="container">
            <h2 className="title">Almacen de Inventarios</h2>
            <div className="filters">
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
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
                        <th>ID</th>
                        <th>Inventario</th>
                        <th>Cantidad</th>
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
                    {almacenesFiltradosYOrdenados.map(({ id, almacen, cantidad, estado }) => (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{almacen}</td>
                            <td>{cantidad}</td>
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
        </div>
    );
};

export default TablaAlmacenes;