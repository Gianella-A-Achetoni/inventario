import React, { useEffect, useState } from "react";
import GraphBars from "../../components/Graficos/GraphBars";
import Tablas from "../../components/tablas/tablas";
import { useAuthStore } from "../../../store/useAuth";

interface Producto {
  imagen: string;
  producto: string;
  valor: number;
  cantidad: number;
  status: string;
}



const Home: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://stockly-backend.vercel.app/api/v1/product/userProducts/${user?.id}`); // Reemplaza con tu API
        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          console.error("La API no devolvió un array.");
          return;
        }

        const productosFormateados: Producto[] = data.map((item) => ({
          imagen: item.imag || "",
          producto: item.name || "Sin nombre",
          valor: item.price || 0,
          cantidad: item.stock || 0,
          status: item.status || "Desconocido",
        }));

        setProductos(productosFormateados);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { key: "imagen", label: "Imagen" },
    { key: "producto", label: "Producto" },
    { key: "valor", label: "Valor" },
    { key: "cantidad", label: "Cantidad" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="h-full w-full p-4 space-y-6">
      {/* Gráfico */}
      <div className="w-full h-[299px] md:h-[400px] bg-gray-100 shadow-md rounded-md">
        <GraphBars />
      </div>

      {/* Tabla */}
      <div className="shadow-md w-full bg-white rounded-md p-4">
        <Tablas
          columns={columns}
          data={productos.map((p) => p as unknown as Record<string, unknown>)} // 🔥 Conversión necesaria
        />
      </div>
    </div>
  );
};

export default Home;