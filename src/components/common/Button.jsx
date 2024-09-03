import styled from 'styled-components';

const Button = ({ children, onClick, ...props }) => {
  return (
    <S_Button onClick={onClick} {...props}>
      {children}
    </S_Button>
  );
};

export default Button;

const S_Button = styled.div`
  background-color: #ffffff;
  color: #2a2a2a;
  padding: 16px 20px;
  margin: 5px;
  font-size: 16px;
  border-radius: 100px;
  box-shadow: 0 15px 32px #eeeeee;
  transition-duration: 0.1s;

  &:hover {
    background-color: #eeeeee;
  }
  &:active {
    background-color: #d5d5d52b;
  }
`;
