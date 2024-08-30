import { useNavigate } from 'react-router-dom';
import { S_CardImg, S_TextArea, S_Stack, S_Title, S_Content, S_FlexBox, S_Card } from '../styled/StyledHome';

const Card = ({ item }) => {
  const nav = useNavigate();
  const handleDetail = () => {
    nav(`/detailpost/${item.post_id}`);
  };
  return (
    <S_Card onClick={handleDetail}>
      <S_CardImg style={{ backgroundImage: `url(${item.thumbnail_url})` }}></S_CardImg>
      <S_TextArea>
        {item.tech_stack.map((stackItem, index) => {
          return <S_Stack key={index}>#{stackItem}</S_Stack>;
        })}
        <S_Title>{item.title}</S_Title>
        <S_Content>{item.content}</S_Content>
        <S_FlexBox>
          <span>사용자 이름</span>
          <span>{item.created_at}</span>
        </S_FlexBox>
      </S_TextArea>
    </S_Card>
  );
};

export default Card;
