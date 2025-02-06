import React from "react";
import GraphBars from "../../components/Graficos/GraphBars";
import Tablas from "../../components/tablas/tablas";

const Home: React.FC = () => {
  const columns = [
    { key: "imagen", label: "Imagen" },
    { key: "producto", label: "Producto" },
    { key: "valor", label: "Valor" },
    { key: "cantidad", label: "Cantidad" },
    { key: "status", label: "Status" },
  ];

  const data = Array(7).fill({ imagen: "", producto: "", valor: 25, cantidad: 5, status: "" });

  return (
    <div className="h-full w-full p-4 space-y-6">
      {/* Carrusel - Solo en mobile */}
      <div className="md:hidden flex w-full h-[140px] overflow-x-auto snap-x snap-mandatory space-x-4 mb-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="border-3 border-stone-400 h-full min-w-[80%] rounded-md snap-center bg-white shadow-md"
          ></div>
        ))}
      </div>

      {/* Diseño normal - Solo en desktop */}
      <div className="hidden md:flex w-full h-[140px] justify-between mb-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="shadow-md h-full w-[32.5%] rounded-md bg-white"
          ></div>
        ))}
      </div>

      {/* Gráfico */}
      <div className="w-full h-[299px] md:h-[415px] bg-gray-100 shadow-md rounded-md p-4">
        <GraphBars />
      </div>

      {/* Tabla */}
      <div className="shadow-md w-full bg-white rounded-md p-4">
        <Tablas columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Home;
