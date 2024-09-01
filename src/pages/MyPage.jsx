import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContextProvider';
import supabase from '../supabaseClient';
import styled from 'styled-components';

const MyPage = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    nickname: user?.nickname || '',
    avatar_url: user?.avatar_url || ''
  });
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.avatar_url || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = user;

    let avatar_url = formData.avatar_url;

    if (selectedFile) {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`public/${id}/${selectedFile.name}`, selectedFile);

      if (error) {
        setMessage('아바타 업로드 중 오류가 발생했습니다: ' + error.message);
        return;
      }

      avatar_url = `https://your-supabase-url.supabase.co/storage/v1/object/public/avatars/public/${id}/${selectedFile.name}`;
    }

    const { error: updateError } = await supabase
      .from('profile')
      .update({
        name: formData.name,
        nickname: formData.nickname,
        avatar_url: avatar_url
      })
      .eq('id', id);

    if (updateError) {
      setMessage('수정 중 오류가 발생했습니다: ' + updateError.message);
    } else {
      setMessage('회원 정보가 성공적으로 수정되었습니다.');
    }
  };

  return (
    <S_MyPageLayout>
      <S_MyPageContainer>
        <h1>내 정보</h1>
        {user ? (
          <S_MyPageForm onSubmit={handleSubmit}>
            <S_FormField>
              <label>이름:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </S_FormField>
            <S_FormField>
              <label>닉네임:</label>
              <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} required />
            </S_FormField>
            <S_FormField>
              <label>프로필 이미지:</label>
              <S_ImagePreview>{imagePreview && <img src={imagePreview} alt="아바타 미리보기" />}</S_ImagePreview>
              <input type="file" accept="image/*" onChange={handleFileChange} required />
            </S_FormField>
            <S_SubmitButton type="submit">정보 수정</S_SubmitButton>
          </S_MyPageForm>
        ) : (
          <p>로그인 후에 회원 정보를 확인할 수 있습니다.</p>
        )}
        {message && <S_Message>{message}</S_Message>}
      </S_MyPageContainer>
    </S_MyPageLayout>
  );
};

export default MyPage;

const S_MyPageLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const S_MyPageContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: auto;
  background-color: #f0e2d6;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 500px;
`;

const S_MyPageForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const S_FormField = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }
`;

const S_ImagePreview = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  img {
    max-width: 100px;
    max-height: 100px;
    border-radius: 8px;
  }
`;

const S_SubmitButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #ff2f00;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;

const S_Message = styled.p`
  color: #28a745;
  font-size: 14px;
  margin-top: 20px;
`;
