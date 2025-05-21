export function Input({ type = 'text', className = '', ...props }) {
  return (
    <input
      type={type}
      className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}