// src/components/comment/CommentList.jsx
import { useContext } from 'react';
import { CommentContext } from '../../context/CommentContextProvider';
import { UserContext } from '../../context/UserContextProvider';
import styled from 'styled-components';

const CommentList = () => {
  const { comments, deleteComment } = useContext(CommentContext);
  const { user } = useContext(UserContext);

  // 자기 댓글 삭제 핸들러
  const handleDeleteComment = (commentId, authorId) => {
    if (user && user.id === authorId) {
      if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
        deleteComment(commentId);
      }
    } else {
      alert('본인이 작성한 댓글만 삭제할 수 있습니다.');
    }
  };

  return (
    <S_CommentListWrapper>
      <h3 style={{ fontSize: '2rem' }}>💌</h3>
      <S_CommentList>
        {comments.map((comment) => (
          <S_Comment key={comment.id}>
            <p>{comment.content}</p>
            {user && user.id === comment.author_id && (
              <S_Button onClick={() => handleDeleteComment(comment.id, comment.author_id)}>삭제</S_Button>
            )}
          </S_Comment>
        ))}
      </S_CommentList>
    </S_CommentListWrapper>
  );
};

export default CommentList;

const S_CommentListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
`;
const S_CommentList = styled.div`
  display: flex;
  align-content: center;
  flex-direction: column;
  gap: 1rem;
`;
const S_Comment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 8rem;
`;
const S_Button = styled.div`
  background-color: #ffffff;
  color: #2a2a2a;
  padding: 8px 10px;
  font-size: 11px;
  border-radius: 100px;
  box-shadow: 0 15px 32px #eeeeee;
  transition-duration: 0.1s;
  &:hover {
    background-color: #ff00001a;
  }
  &:active {
    background-color: #ff00005e;
  }
`;
