const Input = ({ onChange, type, value, name, placeholder }) => {
  return (
    <input
      className="px-2 focus:outline-none w-full text-sm"
      onChange={onChange}
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
    />
  );
};

export default Input;
