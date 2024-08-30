// const Home = () => {
//   return <div>Home</div>;
// };

// export default Home;

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PostContext } from '../context/PostContextProvider';

const Home = () => {
  const { posts } = useContext(PostContext);
  console.log('Posts loaded in Home component:', posts);
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <Link to={`/detailpost/${post.post_id}`}>
            <h2>{post.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
