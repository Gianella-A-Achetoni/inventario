import { useState } from "react";
import "./Auth.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        console.log("Register with:", { name, email, password });
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h4>Registrarse</h4>
                <div className="auth-input">
                    <label htmlFor="name">Nombre Completo</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Ingresa tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="auth-input">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Ingresa tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="auth-input">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Crea una contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="auth-actions">
                    <button onClick={handleRegister}>Registrarse</button>
                </div>
                <p className="auth-footer">
                    ¿Ya tienes cuenta? <a href="login">Inicia sesión</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
