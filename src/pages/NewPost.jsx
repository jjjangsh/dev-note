import { useState, useContext } from 'react';
import { PostContext } from '../context/PostContextProvider';
import { useNavigate } from 'react-router-dom';
import PostingForm from '../components/posting/PostingForm.jsx';

const NewPost = () => {
  const { addPosts } = useContext(PostContext);
  const navigate = useNavigate();

  const handleAddPost = async () => {
    const postId = await addPosts(postContents);

    navigate(`/detailpost/${postId}`, { replace: true });
  };

  const [postContents, setPostContents] = useState({
    title: '',
    content: '',
    project_start_date: undefined,
    project_end_date: undefined,
    tech_stack: [],
    thumbnail: undefined
  });

  return (
    <PostingForm
      type="newPost"
      postContents={postContents}
      setPostContents={setPostContents}
      handleSubmit={handleAddPost}
    />
  );
};

export default NewPost;
