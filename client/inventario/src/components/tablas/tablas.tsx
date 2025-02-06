interface Column {
  key: string;
  label: string;
}

interface TablasProps {
  columns: Column[];
  data: Record<string, unknown>[];
}

const Tablas: React.FC<TablasProps> = ({ columns, data }) => {
  return (
    <div className="w-full h-full overflow-hidden rounded-lg shadow-md border border-gray-300">
      <div className="w-full overflow-x-auto">
        {/* Tabla Principal */}
        <table className="w-full border-collapse bg-white">
          {/* Encabezado */}
          <thead className="bg-customBlue text-white uppercase text-sm">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3 text-center border-b border-gray-300 min-w-[150px]">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
        </table>

        {/* Contenedor para el scroll vertical */}
        <div className="max-h-[300px] overflow-y-auto text-center">
          <table className="w-full border-collapse bg-white">
            <tbody>
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`border-b border-gray-200 ${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-beigeclaro"}`}
                  >
                    {columns.map((col) => (
                      <td key={`${rowIndex}-${col.key}`} className="px-6 py-3 border-r min-w-[150px]">
                        {String(row[col.key])}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                    No hay datos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tablas;
