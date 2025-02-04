const API_URL = "https://stockly-backend.vercel.app/api/v1"; 

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await fetch(API_URL+"/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            return data; // Aquí debes devolver los datos del usuario y el token
        } else {
            throw new Error("Credenciales incorrectas");
        }
    } catch (error) {
        console.error("Error en login:", error);
        throw error; // Lanzamos el error para que lo maneje el store
    }
};
