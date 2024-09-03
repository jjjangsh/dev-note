import { useNavigate } from 'react-router-dom';
import {
  S_CardImg,
  S_TextArea,
  S_Stack,
  S_Title,
  S_Content,
  S_FlexBox,
  S_Card,
  S_StackContainer
} from '../styled/StyledHome';
import { format, parseISO } from 'date-fns';

const Card = ({ item }) => {
  const nav = useNavigate();
  const handleDetail = () => {
    nav(`/detailpost/${item.post_id}`);
  };

  // 날짜 project_end_date
  const formattedDate_start = format(parseISO(item.project_start_date), 'yy.MM.dd');
  const formattedDate_end = format(parseISO(item.project_end_date), 'yy.MM.dd');

  return (
    <S_Card onClick={handleDetail}>
      <S_CardImg
        style={{
          backgroundImage: item.thumbnail_url ? `url(${item.thumbnail_url})` : `url('../../public/no-img.png')`
        }}
      ></S_CardImg>
      <S_TextArea>
        <S_StackContainer>
          {item.tech_stack.map((stackItem, index) => {
            return <S_Stack key={index}>#{stackItem}</S_Stack>;
          })}
        </S_StackContainer>
        <S_Title>{item.title}</S_Title>
        <S_Content>{item.content}</S_Content>
        <S_FlexBox>
          <span>{item.author_nickname}</span>
          <span>
            {formattedDate_start}~{formattedDate_end}
          </span>
        </S_FlexBox>
      </S_TextArea>
    </S_Card>
  );
};

export default Card;
