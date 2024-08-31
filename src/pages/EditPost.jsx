import { useParams } from 'react-router-dom';
import { Suspense, useContext } from 'react';
import { PostContext } from '../context/PostContextProvider.jsx';
import useFetchDataForRender from '../hooks/useFetchDataForRender.js';

const EditPost = () => {
  const { id } = useParams();
  const { getPostContents } = useContext(PostContext);
  const { data, isLoading } = useFetchDataForRender(getPostContents, +id);

  const selectEl = () => {
    if (!isLoading) return <div>{data.title}</div>;
  };

  return (
    <div>
      <Suspense fallback={<div>Loading Data...</div>}>{selectEl()}</Suspense>
    </div>
  );
};

export default EditPost;
