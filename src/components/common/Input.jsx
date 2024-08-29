const Input = ({ type, value, setValue, ...props }) => {
  const handlerInput = (e) => {
    setValue(e.target.value);
  };

  return <input type={type} value={value} onChange={handlerInput} {...props} />;
};

export default Input;
