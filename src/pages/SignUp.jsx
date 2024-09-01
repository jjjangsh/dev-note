import { useState } from 'react';
import styled from 'styled-components';
import supabase from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

const NAME_REGEX = /^[가-힣a-zA-Z]{2,20}$/;
const EMAIL_REGEX = /\S+@\S+\.\S+/;
const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9_]{2,15}$/;

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar_url: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!NAME_REGEX.test(formData.name)) {
      newErrors.name = '이름은 2~20자의 한글 또는 영문자여야 합니다.';
    }

    if (!NICKNAME_REGEX.test(formData.nickname)) {
      newErrors.nickname = '닉네임은 2~15자의 한글, 영문자, 숫자, _만 허용됩니다.';
    }

    if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = '유효한 이메일을 입력하세요.';
    }

    if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      try {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              nickname: formData.nickname,
              avatar_url: formData.avatar_url
            }
          }
        });

        if (error) {
          setErrors({ email: '회원가입 오류: ' + error.message });
          console.error('회원가입 오류:', error);
          return;
        }

        alert('회원가입 완료! 로그인 페이지로 이동합니다.');
        setFormData({ name: '', nickname: '', email: '', password: '', confirmPassword: '' });
        navigate('/signin');
      } catch (error) {
        console.error('회원가입 오류:', error);
      }
    }
  };

  return (
    <S_SignUpLayout>
      <S_SignUpContainer>
        <S_SignUpTitle>
          <Link to={'/'}>
            <S_SignUpLogo src="../../public/logo.png" />
          </Link>
        </S_SignUpTitle>
        <S_SignUpForm onSubmit={handleSubmit}>
          <S_SignUpInput
            className={isSubmitted && errors.name ? 'error' : ''}
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
          />
          {isSubmitted && errors.name && <S_SignUpErrorMessage>{errors.name}</S_SignUpErrorMessage>}
          <S_SignUpInput
            className={isSubmitted && errors.nickname ? 'error' : ''}
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={formData.nickname}
            onChange={handleChange}
          />
          {isSubmitted && errors.nickname && <S_SignUpErrorMessage>{errors.nickname}</S_SignUpErrorMessage>}
          <S_SignUpInput
            className={isSubmitted && errors.email ? 'error' : ''}
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
          />
          {isSubmitted && errors.email && <S_SignUpErrorMessage>{errors.email}</S_SignUpErrorMessage>}
          <S_SignUpInput
            className={isSubmitted && errors.password ? 'error' : ''}
            type="password"
            name="password"
            placeholder="비밀번호는 8글자 이상 입력해주세요."
            value={formData.password}
            onChange={handleChange}
          />
          {isSubmitted && errors.password && <S_SignUpErrorMessage>{errors.password}</S_SignUpErrorMessage>}
          <S_SignUpInput
            className={isSubmitted && errors.confirmPassword ? 'error' : ''}
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {isSubmitted && errors.confirmPassword && (
            <S_SignUpErrorMessage>{errors.confirmPassword}</S_SignUpErrorMessage>
          )}

          <S_SignUpButton type="submit">회원가입</S_SignUpButton>
        </S_SignUpForm>
      </S_SignUpContainer>
    </S_SignUpLayout>
  );
};

export default SignUp;

const S_SignUpLogo = styled.img`
  width: 120px;
  height: 52px;
  cursor: pointer;
`;

const S_SignUpLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const S_SignUpContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: black;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  height: 450px;
`;

const S_SignUpTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const S_SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const S_SignUpInput = styled.input`
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

const S_SignUpErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 10px;
`;

const S_SignUpButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #ff2f00;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;
