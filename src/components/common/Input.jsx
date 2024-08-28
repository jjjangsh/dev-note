const Input = ({ type, value, onChange, ...props }) => {
  return <input type={type} value={value} onChange={onChange} {...props} />;
};

export default Input;
