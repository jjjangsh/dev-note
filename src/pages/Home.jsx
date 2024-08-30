import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { S_HomeTitle, S_CardContainer } from '../styled/StyledHome';
import supabase from '../supabaseClient';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const { data, error } = await supabase.from('DEV_POSTS').select('*');
    // supabase데이어 부분을 다른 파일로 분리해서 공용파일로 사용하고 post를가져올때마다
    // getpost를 이용해서 어디서든 사용할 수 있게
    if (error) {
      console.error('데이터 추가 오류:', error);
      return;
    }
    console.log('추가된 데이터', data);
    setPosts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
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
