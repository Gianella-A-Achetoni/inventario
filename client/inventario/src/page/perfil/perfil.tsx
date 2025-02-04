import { useState, ChangeEvent } from "react";
import { useAuthStore } from "../../../store/useAuth";
import axios from "axios";
import "./perfil.css";
import { Toaster, toast } from "sonner";

interface User {
    id?: string;
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    img?: string;
}

const Perfil: React.FC = () => {
    const { user } = useAuthStore() as { user: User | null };

    const [name, setName] = useState<string>(user?.name || "");
    const [company, setCompany] = useState<string>(user?.company || "");
    const [email] = useState<string>(user?.email || "");
    const [phone, setPhone] = useState<string>(user?.phone || "");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Manejador para la imagen
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    // Manejador para actualizar usuario
    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("company", company);
        formData.append("phone", phone);

        if (selectedFile) {
            formData.append("img", selectedFile);
        }

        try {
            await axios.put(`https://stockly-backend.vercel.app/api/v1/user/${user?.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            toast.success("Usuario actualizado con éxito!");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error al actualizar:", error);
                toast.error(error.response?.data?.message || "Error al actualizar usuario");
            } else {
                console.error("Error desconocido:", error);
                toast.error("Error inesperado");
            }
        }
    };

    return (
        <div className="perfil-box">
            <Toaster position="top-center" richColors />
            <div className="perfil-title">
                <h4>Información de perfil</h4>
            </div>

            <div className="perfil-edit-image">
                <img
                    src={user?.img || "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"}
                    alt="Foto de perfil"
                />
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpdate}>Agregar Foto</button>
            </div>

            <div className="perfil-box-info">
                <div className="perfil-edit-info">
                    <div className="perfil-edit-info-inputs-1">
                        <label htmlFor="nombre">Nombre</label>
                        <input id="nombre" value={name} onChange={(e) => setName(e.target.value)} type="text" />
                    </div>
                    <div className="perfil-edit-info-inputs-1">
                        <label htmlFor="empresa">Nombre de la empresa</label>
                        <input id="empresa" value={company} onChange={(e) => setCompany(e.target.value)} type="text" />
                    </div>
                </div>

                <div className="perfil-edit-info">
                    <div className="perfil-edit-info-inputs-1">
                        <label htmlFor="email">Email</label>
                        <input id="email" value={email} type="text" readOnly />
                    </div>
                    <div className="perfil-edit-info-inputs-1">
                        <label htmlFor="phone">Número de teléfono</label>
                        <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} type="text" />
                    </div>
                </div>

                <div className="perfil-edit-info-button-update">
                    <button onClick={handleUpdate}>Actualizar Información</button>
                </div>
            </div>
        </div>
    );
};

export default Perfil;