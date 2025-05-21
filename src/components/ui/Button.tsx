

export function Button({ children, className = '', variant = 'default', ...props }) {
  const base = 'inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm transition';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}