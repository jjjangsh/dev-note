import ImageInput from '../common/ImageInput.jsx';
import styled from 'styled-components';
import Button from '../common/Button.jsx';

const PostingForm = ({
  type,
  postContents,
  setPostContents,
  handleSubmit,
  prevThumbnailUrl,
  setPrevThumbnail,
  validErrors
}) => {
  const { title, content, tech_stack, thumbnail } = postContents;
  const setThumbnail = (file) => {
    setPostContents({ ...postContents, thumbnail: file });
  };

  const dateValidError = validErrors.find((error) => error.type === 'date');
  const techstackValidError = validErrors.find((error) => error.type === 'tech_stack');
  const titleValidError = validErrors.find((error) => error.type === 'title');

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
          setPrevThumbnail={setPrevThumbnail}
        />
      </S_InputFieldContainer>
      <S_InputFieldContainer>
        <h3>기술 스택 *</h3>
        <div>
          <S_Input
            value={tech_stack}
            onChange={(e) => {
              setPostContents({ ...postContents, tech_stack: e.target.value });
            }}
          />
          {techstackValidError ? <S_ErrorParagraph>{techstackValidError.message}</S_ErrorParagraph> : null}
        </div>
      </S_InputFieldContainer>
      <S_InputFieldContainer>
        <h3>제목 *</h3>
        <div>
          <S_Input
            value={title}
            onChange={(e) => {
              setPostContents({ ...postContents, title: e.target.value });
            }}
          />
          {titleValidError ? <S_ErrorParagraph>{titleValidError.message}</S_ErrorParagraph> : null}
        </div>
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
        <h3>프로젝트 진행시기 *</h3>
        <div>
          <S_DateContainer>
            <S_Input
              type="date"
              onChange={(e) => {
                setPostContents({ ...postContents, project_start_date: e.target.value });
              }}
            />
            <span>~</span>
            <S_Input
              type="date"
              onChange={(e) => {
                setPostContents({ ...postContents, project_end_date: e.target.value });
              }}
            />
          </S_DateContainer>
          {dateValidError ? <S_ErrorParagraph>{dateValidError.message}</S_ErrorParagraph> : null}
        </div>
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
    margin-right: 5px;
  }
`;

const S_DateContainer = styled.div`
  display: flex;
  gap: 10px;

  & > input {
    width: 150px;
    padding-left: 5px;
  }

  & > span {
    font-size: 15px;
    text-align: center;
    line-height: 25px;
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

const S_ErrorParagraph = styled.p`
  margin-top: 8px;
  color: red;
  font-size: 12px;
`;
