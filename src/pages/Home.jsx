import { useContext } from 'react';
import Card from '../components/Card';
import { S_HomeTitle, S_CardContainer } from '../styled/StyledHome';

import { PostContext } from '../context/PostContextProvider';

const Home = () => {
  const { posts } = useContext(PostContext);

  return (
    <>
      <S_HomeTitle>Dev-note</S_HomeTitle>

      <S_CardContainer>
        {posts.map((item) => {
          return <Card key={item.post_id} item={item} />;
        })}
      </S_CardContainer>
    </>
  );
};

export default Home;
