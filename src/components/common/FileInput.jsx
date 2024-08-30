const ImageInput = ({ onChange, ...props }) => {
  return <input type="file" accept=".jpg, .png, .gif" onChange={onChange} {...props} />;
};

export default ImageInput;
