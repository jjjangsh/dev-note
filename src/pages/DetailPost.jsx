import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PostContext } from '../context/PostContextProvider';

const DetailPost = () => {
  const { id } = useParams();
  const { posts } = useContext(PostContext);

  // 디버깅을 위한 콘솔 로그 추가
  console.log('URL에서 가져온 ID:', id);
  console.log('Context에서 가져온 Posts:', posts);

  if (posts.length === 0) return <p>Loading...</p>;

  const post = posts.find((post) => post.post_id === Number(id)); // 문자열로 비교

  if (!post) {
    return <p>해당 게시물을 찾을 수 없습니다.</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default DetailPost;
