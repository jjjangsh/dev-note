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
    if (!content.trim()) {
      return; // 빈 댓글 방지
    }

    addComment(postId, user.id, content); // 댓글 작성 함수 호출
    setContent(''); // 댓글 입력창 초기화
  };

  return (
    <S_CommentWrapper>
      <S_CommentForm onSubmit={handleSubmit}>
        <S_CommentTextarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력해주세요."
          rows="4"
        />
        <S_CommentButton type="submit">댓글 작성</S_CommentButton>
      </S_CommentForm>
    </S_CommentWrapper>
  );
};

export default CommentForm;

const S_CommentWrapper = styled.div`
  display: flex;
  align-content: center;
  flex-direction: column;
  align-items: center;
`;

const S_CommentForm = styled.form`
  /* 'form' 요소로 변경 */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
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
  /* 'button' 요소로 변경 */
  background-color: #ffffff;
  color: #2a2a2a;
  padding: 16px 20px;
  font-size: 16px;
  border-radius: 100px;
  box-shadow: 0 15px 32px #eeeeee;
  transition-duration: 0.1s;
  border: none; /* 기본 버튼 테두리 제거 */
  cursor: pointer; /* 포인터 모양 변경 */
  &:hover {
    background-color: #eeeeee;
  }
  &:active {
    background-color: #d5d5d52b;
  }
`;
