const Table = ({
  data,
  columns,
  onRowClick,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="rounded-lg border border-[#2D3A5C] bg-[#0B1638] p-4 shadow-lg">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="border-b border-[#2D3A5C] bg-[#142144] text-white/80 text-sm uppercase tracking-wide">
            {columns.map(({ label, width }) => (
              <th
                key={label}
                style={{ width }}
                className="py-3 px-4 text-center"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((record, index) => {
              return (
                <tr
                  key={record.id}
                  className="border-b border-[#2D3A5C] hover:bg-[#1C2E55] transition-all cursor-pointer"
                  onClick={() => onRowClick(record)} // ✅ Call onRowClick on row click
                >
                  {columns.map(({ key }) => (
                    <td
                      key={key}
                      className="py-3 px-5 text-sm text-white/80 text-center"
                    >
                      {record[key] || "N/A"}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-white/60"
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
