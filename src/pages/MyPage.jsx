import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import emojiOptions from '../emojl';
import Card from '../components/Card';
import { PostContext } from '../context/PostContextProvider';
import { UserContext } from '../context/UserContextProvider';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const [emoji, setEmoji] = useState('🙂');
  const [name, setName] = useState('');
  const [postCount, setPostCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const navi = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log(`이모티콘: ${emoji}, 이름: ${name}, 게시물 수: ${postCount}`);
    alert('프로필이 수정되었습니다!');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const { posts } = useContext(PostContext);
  const { user } = useContext(UserContext);

  const userPosts = posts.filter((post) => post.author_id === user.id);

  const endMonths = new Map();

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
      <S_ProfileContainer>
        <S_ProfileTitle>내 프로필</S_ProfileTitle>
        {isEditing ? (
          <S_SetProfileForm onSubmit={handleSubmit}>
            <S_SetProfileEmoji>
              이모티콘 :
              <S_Select value={emoji} onChange={(e) => setEmoji(e.target.value)}>
                {emojiOptions.map((emj) => (
                  <S_option key={emj} value={emj}>
                    {emj}
                  </S_option>
                ))}
              </S_Select>
            </S_SetProfileEmoji>
            <S_SetProfileNickName>
              닉네임 :
              <S_SetProfileNickNameInput type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </S_SetProfileNickName>
            <S_SetPost>
              게시물 수:
              <input type="number" value={postCount} onChange={(e) => setPostCount(Number(e.target.value))} />
            </S_SetPost>
            <button type="submit">수정완료하기</button>
          </S_SetProfileForm>
        ) : (
          <S_ProfileForm>
            <S_ProfileEmojl>{emoji}</S_ProfileEmojl>
            <S_NickName>닉네임: {name}</S_NickName>
            <p>게시물 수: {postCount}</p>
            <button onClick={handleEdit}>수정하기</button>
          </S_ProfileForm>
        )}
      </S_ProfileContainer>
      <S_PostlistContainer>
        <h2>
          9월달
          {septemPost.filter((post) => {
            <Card key={post.post_id} item={post} />;
          })}
        </h2>
        <h2>
          8월달
          {augPosts.map((post) => (
            <Card key={post.post_id} item={post} />
          ))}
        </h2>
        <h2>
          7월달
          {julyPosts.map((post) => (
            <Card key={post.post_id} item={post} />
          ))}
        </h2>
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
const S_ProfileEmojl = styled.div``;
const S_NickName = styled.div``;
const S_PostlistContainer = styled.div``;
