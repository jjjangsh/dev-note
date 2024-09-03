import { useState, useContext } from 'react';
import { CommentContext } from '../../context/CommentContextProvider';
import { UserContext } from '../../context/UserContextProvider';
import styled from 'styled-components';

const CommentForm = ({ postId }) => {
  const { addComment } = useContext(CommentContext);
  const { user } = useContext(UserContext); // 현재 로그인한 사용자 정보 가져오기
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사: 로그인 여부 확인
    if (!user) {
      alert('로그인 하지 않으면 댓글을 작성하실 수 없어요!');
      return;
    }

    if (!content.trim()) {
      return; // 빈 댓글 방지
    }

    addComment(postId, user.id, content); // 댓글 작성 함수 호출
    setContent(''); // 댓글 입력창 초기화
  };

  // Enter 키 감지, Shift+Enter= 줄바꿈
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <S_CommentWrapper>
      <S_CommentForm onSubmit={handleSubmit}>
        <S_CommentTextarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="댓글을 입력해주세요."
          rows="4"
        />
        <S_CommentButton type="submit">작성하기</S_CommentButton>
      </S_CommentForm>
    </S_CommentWrapper>
  );
};

export default CommentForm;

const S_CommentWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  align-content: center;
  flex-direction: column;
  align-items: center;
`;

const S_CommentForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;
`;

const S_CommentTextarea = styled.input`
  border: 1px solid #b5b0b0;
  padding: 20px;
  border-radius: 100px;
  height: 40px;
  width: 40vw;
  &:focus {
    border: 1px solid #7abeff;
    box-shadow: 0 0 4px #7abeff;
    outline: none;
  }
  & > h3 {
    font-weight: 600;
  }
`;

const S_CommentButton = styled.button`
  background: linear-gradient(to bottom, #fcfcfc, #ffffff);
  color: #2a2a2a;
  padding: 16px 20px;
  font-size: 16px;
  border-radius: 100px;
  box-shadow: 0 4px 32px #d2d2d2;
  transition-duration: 0.1s;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #eeeeee;
  }
  &:active {
    background-color: #d5d5d52b;
  }
`;
