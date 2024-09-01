import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { PostContext } from '../context/PostContextProvider.jsx';

const EditPost = () => {
  const { id } = useParams();
  const { getPostContents } = useContext(PostContext);
  const {
    content: prevContent,
    project_end_date: prevProjectEndDate,
    project_start_date: prevProjectStartDate,
    tech_stack: prevTechStack,
    thumbnail_url: prevThumbnailUrl,
    title: prevTitle
  } = getPostContents(+id);

  const [newPostContents, setNewPostContents] = useState({
    title: prevTitle,
    content: prevContent,
    project_start_date: prevProjectStartDate,
    project_end_date: prevProjectEndDate,
    tech_stack: prevTechStack,
    thumbnail_url: prevThumbnailUrl,
    thumbnail: null
  });

  console.log(newPostContents.title);
  return (
    <div>
      <input
        value={newPostContents.title}
        onChange={(e) => {
          setNewPostContents({ ...newPostContents, title: e.target.value });
        }}
      />
    </div>
  );
};

export default EditPost;
