const Dropdown = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 rounded-md bg-primary text-white shadow-lg p-2 text-sm">
      {children}
    </div>
  );
};

export default Dropdown;
