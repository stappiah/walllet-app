export function Table({ children }) {
  return (
    <table className="min-w-full text-left text-sm text-gray-700">
      {children}
    </table>
  );
}

export function TableHead({ children }) {
  return (
    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
      {children}
    </thead>
  );
}

export function TableBody({ children }) {
  return <tbody className="divide-y divide-gray-200">{children}</tbody>;
}

export function TableRow({ children, className = "" }) {
  return <tr className={`hover:bg-gray-50 ${className}`}>{children}</tr>;
}

export function TableCell({ children, className = "", colSpan = 1 }) {
  return (
    <td className={`px-4 py-3 whitespace-nowrap ${className}`} colSpan={colSpan}>
      {children}
    </td>
  );
}
