import React, { useContext } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import { PostContext } from '../context/PostContextProvider';
import { UserContext } from '../context/UserContextProvider';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const { posts } = useContext(PostContext);
  const { user } = useContext(UserContext);
  const navi = useNavigate();

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
    <div>
      <S_ProfileContainer></S_ProfileContainer>
      <S_MyPageTitle>
        Dev-note <S_AddNewPostBtn onClick={() => navi('/auth/newPost')}></S_AddNewPostBtn>
      </S_MyPageTitle>
      <S_PostlistContainer>
        <S_PostlistSeptem>
          9월달
          {septemPost.filter((post) => {
            <Card key={post.post_id} item={post} />;
          })}
        </S_PostlistSeptem>
        <S_PostlistAug>
          8월달
          {augPosts.map((post) => (
            <Card key={post.post_id} item={post} />
          ))}
        </S_PostlistAug>
        <S_PostlistJuly>
          7월달
          {julyPosts.map((post) => (
            <Card key={post.post_id} item={post} />
          ))}
        </S_PostlistJuly>
      </S_PostlistContainer>
    </div>
  );
};

export default MyPage;

const S_ProfileContainer = styled.div``;
const S_ProfileTitle = styled.div``;
const S_SetProfileForm = styled.div``;
const S_SetProfileEmoji = styled.div``;
const S_Select = styled.div``;
const S_option = styled.div``;
const S_SetProfileNickName = styled.div``;
const S_SetProfileNickNameInput = styled.div``;
const S_SetPost = styled.div``;
const S_ProfileForm = styled.div``;
const S_NickName = styled.div``;
const S_PostlistSeptem = styled.div``;
const S_PostlistAug = styled.div``;
const S_PostlistJuly = styled.div``;

const S_PostlistContainer = styled.div``;

const S_MyPageTitle = styled.h1`
  position: relative;
  font-size: 30px;
  display: block;
  max-width: 940px;
  margin: 0 auto;
  padding-top: 50px;
  font-weight: 600;
  border-bottom: 1px solid gray;
`;
const S_AddNewPostBtn = styled.span`
  position: absolute;
  right: 0;
  width: 30px;
  height: 30px;
  background-image: url(../../public/add-btn-black.png);
  background-size: cover;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;
