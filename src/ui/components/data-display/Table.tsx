interface TableProps {
  rows: string[][];
  columns: string[];
}

export function Table({ rows, columns }: TableProps) {
  return (
    <table className="table-auto my-4">
      <thead className="bg-gray-700 text-white">
        <tr>
          {
            columns.map((column) => {
              return (
                <th className="px-4 py-2 text-left" key={`${Math.random()}-${column}`}>
                  {column}
                </th>
              );
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          rows.map((row) => {
            return (
              <tr key={`${Math.random()}-${row}`}>
                {
                  row.map((column) => {
                    return (
                      <td className="px-4 py-2 border-b border-gray-400" key={`${Math.random()}-${column}`}>
                        {column}
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}
