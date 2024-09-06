import { useContext, useState } from 'react';
import styled from 'styled-components';
import supabase from '../supabaseClient';
import Card from '../components/Card';
import { PostContext } from '../context/PostContextProvider';
import { UserContext } from '../context/UserContextProvider';
import ImageInput from '../components/common/ImageInput';
import {
  S_PostlistContainer,
  PostlistYear,
  S_PostlistMonth,
  S_MonthCardContainer,
  S_MyPageTitle
} from '../styled/StyledMypage';
import { getImageURL } from '../utils/supabaseStorage';

const MyPage = () => {
  const { user, setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    nickname: user?.nickname || '',
    avatar_url: user?.avatar_url || ''
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const [prevAvatar, setPrevAvatar] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (file) => {
     setFormData({...formData, avatar_url: file})
  };

  const handleEnterEditMode = () => {
    setIsEditMode(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updateObj = {
      name: formData.name,
      nickname: formData.nickname,
    }

    if (prevAvatar !== formData.avatar_url) {
      const url = await getImageURL(formData.avatar_url, 'avatars', `public/${user.id}`);
      updateObj = { ...formData, avatar_url: url };
      console.log("이미지 변동: ", prevAvatar, "=> ", formData.avatar_url)
    } else {
      console.log('이미지 변동 없음');
    }

    try {
      const { error } = await supabase.from('profile').update(updateObj).eq('id', user.id);

      if (error) {
        console.error('정보 수정 오류:', error);
        return;
      }

      setUser({ ...user, ...formData });
      setIsEditMode(false);
      alert('회원정보가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('정보 수정 오류:', error);
    }
  };

  const { posts } = useContext(PostContext);
  const userPosts = posts.filter((post) => post.author_id === user.id);

  const septemPost = userPosts.filter((post) => {
    const end_date = post.project_end_date;
    const dateArr = end_date.split('-');
    const endMonth = dateArr[1];
    return endMonth === '09';
  });

  const augPosts = userPosts.filter((post) => {
    const end_date = post.project_end_date;
    const dateArr = end_date.split('-');
    const endMonth = dateArr[1];
    return endMonth === '08';
  });

  const julyPosts = userPosts.filter((post) => {
    const end_date = post.project_end_date;
    const dateArr = end_date.split('-');
    const endMonth = dateArr[1];
    return endMonth === '07';
  });

  return (
    <S_MyPageLayout>
      <S_MyPageContainer>
        <S_MyPageTitle>회원정보</S_MyPageTitle>
        {isEditMode ? (
          <S_MyPageForm>
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
              setValue={handleImageChange}
              prevThumbnailUrl={user.avatar_url}
              setPrevThumbnail={setPrevAvatar}
            />
            <S_MyPageButton type="button" onClick={handleSubmit}>
              정보 수정 완료
            </S_MyPageButton>
          </S_MyPageForm>
        ) : (
          <>
            <S_ProfileItem>
              <S_ProfileTitle>이름:</S_ProfileTitle> {formData.name}
            </S_ProfileItem>
            <S_ProfileItem>
              <S_ProfileTitle>닉네임:</S_ProfileTitle> {formData.nickname}
            </S_ProfileItem>
            <S_ProfileItem>
              <S_ProfileTitle>프로필 이미지:</S_ProfileTitle>
              <S_ProfileImage src={user.avatar_url} alt="프로필 이미지" />
            </S_ProfileItem>
            <S_MyPageButton type="button" onClick={handleEnterEditMode}>
              정보 수정
            </S_MyPageButton>
          </>
        )}
      </S_MyPageContainer>
      <S_PostlistContainer>
        <PostlistYear>2024년</PostlistYear>
        <S_PostlistMonth>9월</S_PostlistMonth>
        <S_MonthCardContainer>
          {septemPost.map((post) => {
            return <Card key={post.post_id} item={post} />;
          })}
        </S_MonthCardContainer>
        <S_PostlistMonth>8월</S_PostlistMonth>
        <S_MonthCardContainer>
          {augPosts.map((post) => {
            return <Card key={post.post_id} item={post} />;
          })}
        </S_MonthCardContainer>
        <S_PostlistMonth>7월</S_PostlistMonth>
        <S_MonthCardContainer>
          {julyPosts.map((post) => {
            return <Card key={post.post_id} item={post} />;
          })}
        </S_MonthCardContainer>
      </S_PostlistContainer>
    </S_MyPageLayout>
  );
};
export default MyPage;

const S_MyPageLayout = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;

const S_MyPageContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #44484f;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const S_MyPageForm = styled.div`
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

const S_ProfileItem = styled.div`
  padding: 10px;
  color: white;
  font-size: 16px;
`;

const S_ProfileImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin-top: 10px;
`;

const S_ProfileTitle = styled.strong`
  font-weight: bold;
  color: #36d0d2;
`;
