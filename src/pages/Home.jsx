import { useContext } from 'react';
import Card from '../components/Card';
import { S_HomeTitle, S_CardContainer, S_AddNewPostBtn, S_HomeTitleContainer } from '../styled/StyledHome';

import { PostContext } from '../context/PostContextProvider';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { posts } = useContext(PostContext);

  const nav = useNavigate();
  return (
    <>
      <S_HomeTitleContainer>
        <S_HomeTitle>Dev-note</S_HomeTitle>
        <S_AddNewPostBtn onClick={() => nav('/auth/newPost')}></S_AddNewPostBtn>
      </S_HomeTitleContainer>

      <S_CardContainer>
        {posts.map((item) => {
          return <Card key={item.post_id} item={item} />;
        })}
      </S_CardContainer>
    </>
  );
};

export default Home;
