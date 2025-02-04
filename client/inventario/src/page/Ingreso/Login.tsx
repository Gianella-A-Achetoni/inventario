import { useState } from "react";
import { useAuthStore } from "../../../store/useAuth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(""); // Resetear errores
        const success = await login(email, password);
        if (success) {
            navigate("../../inventario/home"); // Cambia esto por la página a la que deba redirigir
        } else {
            setError("Correo o contraseña incorrectos");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h4>Iniciar Sesión</h4>
                {error && <p className="auth-error">{error}</p>} {/* Mostrar error si existe */}
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
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="auth-actions">
                    <button onClick={handleLogin}>Ingresar</button>
                </div>
                <p className="auth-footer">
                    ¿No tienes cuenta? <a href="/register">Regístrate</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
