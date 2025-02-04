import { useState } from "react";
import { useAuthStore } from "../../../store/useAuth";
import axios from "axios";
import "./perfil.css";
import { CgPassword } from "react-icons/cg";
import { Toaster,toast } from "sonner";

function Perfil() {
    const { user} = useAuthStore(); 
   
    const [name, setName] = useState(user?.name || "");
    const [company, setCompany] = useState(user?.company || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [selectedFile, setSelectedFile] = useState(null);
    const [newPassword, setNewPassword] = useState("");  

    // Manejador para la imagen
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
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
            const { data } = await axios.put(`http://localhost:3000/api/v1/user/${user?.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

          
            toast.success("Usuario actualizado con éxito!");
         
        } catch (error) {
            console.error("Error al actualizar:", error);
            toast.error(error.response?.data?.message || "Error al actualizar usuario");
        }
    };

  

    const handlePasswordChange = async () => {
        if (!newPassword) {
            toast.info("Por favor, ingrese la nueva contraseña.");
            return;
        }
    
        try {
            await axios.put(`http://localhost:3000/api/v1/user/${user?.id}`, { newPassword });
            toast.success("Contraseña actualizada con éxito!");
        } catch (error) {
            console.error("Error al actualizar la contraseña:", error);
            toast.error(error.response?.data?.message || "Error al actualizar contraseña");
        }
    };
    
   console.log(user);
   
    

    return (
    
        <div className="perfil-box">
                <Toaster position="top-center" richColors/>
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
                        <input placeholder={email} id="email" value={email} type="text" readOnly />
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
}

export default Perfil;
