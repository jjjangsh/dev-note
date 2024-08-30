import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../supabaseClient';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = '이메일을 입력하세요.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력하세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });

        if (error) {
          setErrors({ email: '이메일 또는 비밀번호가 잘못되었습니다.' });
          console.error('로그인 중 오류 발생:', error);
          return;
        }

        alert('로그인 성공! 메인 페이지로 이동합니다.');
        navigate('/');
      } catch (error) {
        console.error('로그인 중 오류 발생:', error);
      }
    }
  };

  return (
    <S_LoginContainer>
      <S_LoginTitle>로그인</S_LoginTitle>
      <S_LoginForm onSubmit={handleSubmit}>
        <S_LoginInput
          className={isSubmitted && errors.email ? 'error' : ''}
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
        />
        {isSubmitted && errors.email && <S_LoginErrorMessage>{errors.email}</S_LoginErrorMessage>}
        <S_LoginInput
          className={isSubmitted && errors.password ? 'error' : ''}
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
        />
        {isSubmitted && errors.password && <S_LoginErrorMessage>{errors.password}</S_LoginErrorMessage>}
        <S_LoginButton type="submit">로그인</S_LoginButton>
      </S_LoginForm>
    </S_LoginContainer>
  );
};

export default SignIn;

const S_LoginContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const S_LoginTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const S_LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const S_LoginInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #40a9ff;
  }

  &.error {
    border-color: #ff4d4f;
  }
`;

const S_LoginErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 10px;
`;

const S_LoginButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #1890ff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #40a9ff;
  }
`;
