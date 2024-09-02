import { useContext, useState } from 'react';
import styled from 'styled-components';
import supabase from '../supabaseClient';
import { UserContext } from '../context/UserContextProvider';
import ImageInput from '../components/common/ImageInput';

const MyPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    nickname: user?.nickname || '',
    avatar_url: user?.avatar_url || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (file) => {
    if (file) {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`public/${user.id}/${file.name}`, file, { upsert: true });

      if (error) {
        console.error('이미지 업로드 오류:', error);
        return;
      }

      const avatarUrl = supabase.storage.from('avatars').getPublicUrl(data.path).publicURL;

      setFormData({ ...formData, avatar_url: avatarUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('profile')
        .update({
          name: formData.name,
          nickname: formData.nickname,
          avatar_url: formData.avatar_url
        })
        .eq('id', user.id);

      if (error) {
        console.error('정보 수정 오류:', error);
        return;
      }

      // 사용자 정보 갱신
      setUser({ ...user, ...formData });
      alert('회원정보가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('정보 수정 오류:', error);
    }
  };

  return (
    <S_MyPageLayout>
      <S_MyPageContainer>
        <S_MyPageTitle>회원정보 수정</S_MyPageTitle>
        <S_MyPageForm onSubmit={handleSubmit}>
          <S_MyPageInput type="text" name="name" placeholder="이름" value={formData.name} onChange={handleChange} />
          <S_MyPageInput
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={formData.nickname}
            onChange={handleChange}
          />
          <ImageInput
            label="프로필 이미지 선택"
            value={formData.avatar_url}
            setValue={handleImageChange} // 파일이 변경될 때 호출되는 함수
            prevThumbnailUrl={formData.avatar_url}
          />
          <S_MyPageButton type="submit">정보 수정</S_MyPageButton>
        </S_MyPageForm>
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
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #44484f;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const S_MyPageTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: white;
  font-weight: bold;
`;

const S_MyPageForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const S_MyPageInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  background-color: #e4e7ed;

  &:focus {
    border-color: #40a9ff;
  }
`;

const S_MyPageButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #36d0d2;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;
