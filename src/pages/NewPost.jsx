import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useState, useContext } from 'react';
import { PostContext } from '../context/PostContextProvider';
import { useNavigate } from 'react-router-dom';

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
  const handleThumbnailInput = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const [techStack, setTechStack] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <div>
      <h2>새 글 쓰기</h2>
      <p>프로젝트를 소개해주세요!</p>
      <div>
        <h3>썸네일</h3>
        <input type="file" accept=".jpg, .png, .gif" onChange={handleThumbnailInput} />
      </div>
      <div>
        <h3>기술 스택</h3>
        <Input value={techStack} setValue={setTechStack} />
      </div>
      <div>
        <h3>제목</h3>
        <Input value={title} setValue={setTitle} />
      </div>
      <div>
        <h3>내용</h3>
        <Input type="text" value={content} setValue={setContent} />
      </div>
      <div>
        <h3>프로젝트 진행시기</h3>
        {/* TODO: 민영 - 처음 페이지 들어왔을 때 value가 없으면 warning 뜨는 듯함 */}
        <Input value={startDate} setValue={setStartDate} type="date" />
        <Input value={endDate} setValue={setEndDate} type="date" />
      </div>
      <Button onClick={handleAddPost}>추가하기</Button>
    </div>
  );
};

export default NewPost;
