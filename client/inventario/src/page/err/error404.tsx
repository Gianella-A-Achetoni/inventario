import { PackageOpen } from "lucide-react";

const Error404 = () => {
  return (
    <div className="h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-9xl font-bold flex items-center gap-2 justify-center">
          4 <PackageOpen className="w-32 h-32 text-customBlue" /> 4
        </h1>
        <p className="text-xl">Page not found</p>
        <p className="text-gray-500">No hay resultados correspondientes con su URL</p>
        <p>
          Volver al{" "}
          <a href=".." className="text-blue-500 hover:underline">
            inicio
          </a>
        </p>
      </div>
    </div>
  );
};

export default Error404;
