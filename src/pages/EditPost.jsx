import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { PostContext } from '../context/PostContextProvider.jsx';
import PostingForm from '../components/posting/PostingForm.jsx';

const EditPost = () => {
  const { id } = useParams();
  const { getPostContents, editPost } = useContext(PostContext);
  const {
    content: prevContent,
    project_end_date: prevProjectEndDate,
    project_start_date: prevProjectStartDate,
    tech_stack: prevTechStack,
    thumbnail_url: prevThumbnailUrl,
    title: prevTitle
  } = getPostContents(+id);

  const [newPostContents, setNewPostContents] = useState({
    id: +id,
    title: prevTitle,
    content: prevContent,
    project_start_date: prevProjectStartDate,
    project_end_date: prevProjectEndDate,
    tech_stack: prevTechStack.join(' '),
    thumbnail: null
  });

  const navigate = useNavigate();
  const handleEditPost = async () => {
    await editPost(newPostContents);
    navigate(`/detailpost/${id}`, { replace: true });
  };

  return (
    <PostingForm
      type="editPost"
      postContents={newPostContents}
      setPostContents={setNewPostContents}
      handleSubmit={handleEditPost}
      prevThumbnailUrl={prevThumbnailUrl}
    />
  );
};

export default EditPost;
