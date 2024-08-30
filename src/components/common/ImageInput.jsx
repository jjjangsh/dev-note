import { useRef, useState } from 'react';
import styled from 'styled-components';

const ImageInput = ({ label, setValue, ...props }) => {
  const inputRef = useRef(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleInput = (e) => {
    const file = e.target.files[0];
    setValue(file); // 상위 컴포넌트의 state에 실제 첨부된 file 전달 -> supabase에 insert
    createPreviewUrl(file); // 미리보기로 보여줄 previewUrl 생성
  };

  const [previewUrl, setPreviewUrl] = useState();
  const createPreviewUrl = (fileBlob) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const url = URL.createObjectURL(fileBlob);
    setPreviewUrl(url);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        <input ref={inputRef} hidden type="file" accept=".jpg, .png, .gif" onChange={handleInput} {...props} />
        {label}
      </button>
      {previewUrl && <S_previewImg src={previewUrl} alt="썸네일 미리보기" />}
    </div>
  );
};

export default ImageInput;

const S_previewImg = styled.img`
  display: block;
  width: 200px;
  margin-top: 30px;
  box-shadow: 0 0 1px black;
  padding: 5px;
`;
