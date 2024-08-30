import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useState, useContext } from 'react';
import { PostContext } from '../context/PostContextProvider';
import { useNavigate } from 'react-router-dom';
import ImageInput from '../components/common/ImageInput.jsx';
import styled from 'styled-components';

const NewPost = () => {
  const { addPosts } = useContext(PostContext);
  const navigate = useNavigate();

  const handleAddPost = async () => {
    const postId = await addPosts({
      title: title,
      content: content,
      project_start_date: startDate,
      project_end_date: endDate,
      tech_stack: techStack,
      thumbnail: thumbnail
    });

    navigate(`/detailpost/${postId}`, { replace: true });
  };

  const [thumbnail, setThumbnail] = useState();
  const [techStack, setTechStack] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <S_NewPostLayout>
      <S_PageDescriptionContainer>
        <h2>새 글 쓰기</h2>
        <p>프로젝트를 소개해주세요!</p>
      </S_PageDescriptionContainer>
      <S_InputFieldContainer>
        <h3>썸네일</h3>
        <ImageInput label="썸네일 선택하기" value={thumbnail} setValue={setThumbnail} />
      </S_InputFieldContainer>
      <S_InputFieldContainer>
        <h3>기술 스택</h3>
        <S_Input value={techStack} setValue={setTechStack} />
      </S_InputFieldContainer>
      <S_InputFieldContainer>
        <h3>제목</h3>
        <S_Input value={title} setValue={setTitle} />
      </S_InputFieldContainer>
      <S_InputFieldContainer>
        <h3>내용</h3>
        <S_ContentTextarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </S_InputFieldContainer>
      <S_InputFieldContainer>
        <h3>프로젝트 진행시기</h3>
        {/* TODO: 민영 - 처음 페이지 들어왔을 때 value가 없으면 warning 뜨는 듯함 */}
        <S_DateContainer>
          <S_Input value={startDate} setValue={setStartDate} type="date" />
          <S_Input value={endDate} setValue={setEndDate} type="date" />
        </S_DateContainer>
      </S_InputFieldContainer>
      <S_SubmitButton onClick={handleAddPost}>추가하기</S_SubmitButton>
    </S_NewPostLayout>
  );
};

export default NewPost;

const S_NewPostLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 100px;

  position: relative;
`;

const S_PageDescriptionContainer = styled.div`
  h2 {
    font-size: 25px;
    font-weight: 800;
    margin-bottom: 15px;
  }
`;

const S_InputFieldContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;

  & > h3 {
    font-weight: 600;
  }
`;

const S_DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > * {
    width: 150px;
    padding-left: 5px;
  }
`;

const S_Input = styled(Input)`
  border: 1px solid #b5b0b0;
  height: ${(props) => (props.inputOf === 'content' ? '200px' : '25px')};

  &:focus {
    border: 1px solid #7abeff;
    box-shadow: 0 0 4px #7abeff;
    outline: none;
  }
`;

const S_ContentTextarea = styled.textarea`
  resize: none;
  height: 200px;

  &:focus {
    border: 1px solid #7abeff;
    box-shadow: 0 0 4px #7abeff;
    outline: none;
  }
`;

const S_SubmitButton = styled(Button)`
  position: absolute;
  right: 80px;
  bottom: 5px;
`;
