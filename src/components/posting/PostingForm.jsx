import ImageInput from '../common/ImageInput.jsx';
import styled from 'styled-components';
import Button from '../common/Button.jsx';

const PostingForm = ({ type, postContents, setPostContents, handleSubmit, prevThumbnailUrl }) => {
  const { title, content, project_start_date, project_end_date, tech_stack, thumbnail } = postContents;
  const setThumbnail = (file) => {
    setPostContents({ ...postContents, thumbnail: file });
  };

  return (
    <S_NewPostLayout>
      <S_PageDescriptionContainer>
        <h2>{type === 'newPost' ? '새 글 쓰기' : '수정하기'}</h2>
        <p>프로젝트를 소개해주세요!</p>
      </S_PageDescriptionContainer>
      <S_InputFieldContainer>
        <h3>썸네일</h3>
        <ImageInput
          label="썸네일 선택하기"
          value={thumbnail}
          setValue={setThumbnail}
          prevThumbnailUrl={prevThumbnailUrl}
        />
      </S_InputFieldContainer>
      <S_InputFieldContainer>
        <h3>기술 스택</h3>
        <S_Input
          value={tech_stack}
          onChange={(e) => {
            setPostContents({ ...postContents, tech_stack: e.target.value });
          }}
        />
      </S_InputFieldContainer>
      <S_InputFieldContainer>
        <h3>제목</h3>
        <S_Input
          value={title}
          onChange={(e) => {
            setPostContents({ ...postContents, title: e.target.value });
          }}
        />
      </S_InputFieldContainer>
      <S_InputFieldContainer>
        <h3>내용</h3>
        <S_ContentTextarea
          value={content}
          onChange={(e) => {
            setPostContents({ ...postContents, content: e.target.value });
          }}
        />
      </S_InputFieldContainer>
      <S_InputFieldContainer>
        <h3>프로젝트 진행시기</h3>
        {/* TODO: 민영 - 처음 페이지 들어왔을 때 value가 없으면 warning 뜨는 듯함 */}
        <S_DateContainer>
          <S_Input
            type="date"
            value={project_start_date}
            onChange={(e) => {
              setPostContents({ ...postContents, project_start_date: e.target.value });
            }}
          />
          <S_Input
            type="date"
            value={project_end_date}
            onChange={(e) => {
              setPostContents({ ...postContents, project_end_date: e.target.value });
            }}
          />
        </S_DateContainer>
      </S_InputFieldContainer>
      <S_SubmitButton onClick={handleSubmit}>작성 완료</S_SubmitButton>
    </S_NewPostLayout>
  );
};

export default PostingForm;

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

const S_Input = styled.input`
  border: 1px solid #b5b0b0;
  height: 25px;

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
