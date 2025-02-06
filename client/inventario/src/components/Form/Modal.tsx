import React, { useState, useEffect } from "react";

interface Proveedor {
    id: number;
    nombre: string;
    tipo: string;
    contacto: string;
    telefono: string;
    ciudad: string;
    estado: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (proveedor: Proveedor) => void;
    proveedor?: Proveedor;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, proveedor }) => {
    const [nombre, setNombre] = useState(proveedor?.nombre || "");
    const [tipo, setTipo] = useState(proveedor?.tipo || "");
    const [contacto, setContacto] = useState(proveedor?.contacto || "");
    const [telefono, setTelefono] = useState(proveedor?.telefono || "");
    const [ciudad, setCiudad] = useState(proveedor?.ciudad || "");
    const [estado, setEstado] = useState(proveedor?.estado || "Disponible");

    useEffect(() => {
        if (proveedor) {
            setNombre(proveedor.nombre);
            setTipo(proveedor.tipo);
            setContacto(proveedor.contacto);
            setTelefono(proveedor.telefono);
            setCiudad(proveedor.ciudad);
            setEstado(proveedor.estado);
        }
    }, [proveedor]);

    const handleSubmit = () => {
        const nuevoProveedor = { id: proveedor?.id || Date.now(), nombre, tipo, contacto, telefono, ciudad, estado };
        onSave(nuevoProveedor);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h3 className="text-xl font-semibold mb-4">{proveedor ? "Editar Proveedor" : "Agregar Proveedor"}</h3>
                <div className="mb-4">
                    <label className="block mb-2">Nombre</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Tipo</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Contacto</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={contacto}
                        onChange={(e) => setContacto(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Teléfono</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Ciudad</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Estado</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        {["Disponible", "Por agotarse", "Agotado"].map((estadoOption) => (
                            <option key={estadoOption} value={estadoOption}>
                                {estadoOption}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-between">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        onClick={handleSubmit}
                    >
                        {proveedor ? "Guardar Cambios" : "Agregar Proveedor"}
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
