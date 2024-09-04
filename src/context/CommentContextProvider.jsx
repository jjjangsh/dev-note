import { createContext, useState } from 'react';
import supabase from '../supabaseClient';

// Context 생성
export const CommentContext = createContext();

// Provider 컴포넌트 정의
export const CommentContextProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  // 댓글 가져오기 함수
  const fetchComments = async (postId) => {
    const { data, error } = await supabase.from('comments').select('*').eq('post_id', postId);

    if (error) {
      console.error('댓글 가져오기 오류:', error);
    } else {
      setComments(data);
    }
  };

  // 댓글 작성 함수
  const addComment = async (postId, authorId, content) => {
    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        author_id: authorId,
        content: content
      })
      .select(); // insert 후 새로 추가된 데이터를 반환

    if (error) {
      console.error('댓글 작성 오류:', error);
    } else {
      const newComment = data[0]; // 추가된 댓글의 첫 번째 항목을 가져옴
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  };

  // 댓글 삭제 함수
  const deleteComment = async (commentId) => {
    const { error } = await supabase.from('comments').delete().eq('id', commentId);

    if (error) {
      console.error('댓글 삭제 오류:', error);
    } else {
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    }
  };

  return (
    <CommentContext.Provider value={{ comments, fetchComments, addComment, deleteComment }}>
      {children}
    </CommentContext.Provider>
  );
};
