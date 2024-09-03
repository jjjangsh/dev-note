import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ImageInput = ({ label, value, setValue, prevThumbnailUrl, setPrevThumbnail, ...props }) => {
  const inputRef = useRef(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleInput = (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.error('ImageInput ~ file: 파일이 존재하지 않습니다.');
      return;
    }
    setValue(file); // 상위 컴포넌트의 state에 실제 첨부된 file 전달 -> supabase에 insert
    createPreviewUrl(file); // 미리보기로 보여줄 previewUrl 생성
  };

  const [previewUrl, setPreviewUrl] = useState();
  const createPreviewUrl = (fileBlob) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const url = URL.createObjectURL(fileBlob);
    setPreviewUrl(url);
  };

  const handleDeleteThumbnail = () => {
    URL.revokeObjectURL(previewUrl);
    setValue(null);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const urlToFile = async (url) => {
    if (!url) return;
    const response = await fetch(url);
    const blob = await response.blob();

    return new File([blob], 'thumbnail', { type: blob.type });
  };

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const prevThumbnailFile = await urlToFile(prevThumbnailUrl);

      if (isMounted && prevThumbnailFile) {
        setValue(prevThumbnailFile);
        createPreviewUrl(prevThumbnailFile);
        setPrevThumbnail(prevThumbnailFile);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <button onClick={handleButtonClick}>
        <input ref={inputRef} hidden type="file" accept=".jpg, .png, .gif" onChange={handleInput} {...props} />
        {label}
      </button>
      {previewUrl && (
        <div>
          <S_previewImg src={previewUrl} alt="썸네일 미리보기" />
          <span>{value?.name}</span>
          <S_DeleteSpan onClick={handleDeleteThumbnail}>x</S_DeleteSpan>
        </div>
      )}
    </div>
  );
};

export default ImageInput;

const S_previewImg = styled.img`
  display: block;
  width: 200px;
  margin: 20px 0 10px 0;
  box-shadow: 0 0 1px black;
  padding: 5px;
`;

const S_DeleteSpan = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;

  &:hover {
    cursor: pointer;
    background: lightgrey;
    color: white;
  }
`;
