import { useContext } from 'react';
import { PostContext } from '../context/PostContextProvider';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const DetailPost = () => {
  const { id } = useParams();
  const { posts, deletePosts } = useContext(PostContext); // deletePost 함수 가져오기
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 디버깅을 위한 콘솔 로그 추가
  console.log('URL에서 가져온 ID:', id);
  console.log('Context에서 가져온 Posts:', posts);

  // user 가 특정되면 주석 풀기
  // if (!user) {
  //   return <Navigate to="/signin" />;
  // }

  if (posts.length === 0) return <p>로딩중...</p>;

  const post = posts.find((post) => post.post_id === Number(id)); // 문자열로 비교

  if (!post) {
    return <p>텅!</p>;
  }

  const handleDelete = async () => {
    if (window.confirm('진짜 삭제할거?')) {
      await deletePosts(post.id);
      navigate('/');
    }
  };

  return (
    <>
      <GlobalStyle />
      <S_PostSectionWrapper>
        <S_PostSection>
          <div>
            {post.tech_stack.map((tech, index) => (
              <span
                key={index}
                style={{
                  fontSize: 'small',
                  display: 'inline-block',
                  padding: '6px 12px',
                  border: '1px solid #9F9F9F',
                  borderRadius: '100px',
                  marginRight: '8px'
                }}
              >
                #{tech}
              </span>
            ))}
          </div>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: '800'
            }}
          >
            {post.title}
          </h1>
          <S_PostInfoBarWrapper>
            <S_PostInfoBar>
              <S_PostInfo>{post.author_nickname}</S_PostInfo>
              <S_PostInfoActionBar>
                <S_PostInfo>
                  <Link
                    to={`/editpost/${post.post_id}`}
                    style={{ textDecoration: 'underline', color: 'grey', fontSize: 'small' }}
                  >
                    수정
                  </Link>
                </S_PostInfo>
                <S_PostInfo
                  onClick={handleDelete}
                  style={{ textDecoration: 'underline', color: 'grey', fontSize: 'small' }}
                >
                  삭제
                </S_PostInfo>
              </S_PostInfoActionBar>
            </S_PostInfoBar>
          </S_PostInfoBarWrapper>
          <img src={post.thumbnail_url} alt={post.title} style={{ maxWidth: '80%', height: 'auto' }} />

          <S_PostInfoTimeWrapper>
            <p style={{ fontWeight: '200', fontSize: '0.8rem' }}>
              {post.project_start_date} ~ {post.project_end_date}
            </p>
          </S_PostInfoTimeWrapper>
          <p style={{ fontWeight: '400', fontSize: '1.2rem', lineHeight: '1.6' }}>{post.content}</p>
        </S_PostSection>
      </S_PostSectionWrapper>
    </>
  );
};

export default DetailPost;

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background-color: #FCFCFC;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;
const S_PostSectionWrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const S_PostSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 50%;
`;

const S_PostInfoBarWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #9f9f9f;

  width: 100%;
`;
const S_PostInfoBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  justify-content: space-between;

  width: 100%;
`;
const S_PostInfoActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;
`;

const S_PostInfo = styled.p`
  color: #007bff;
  font-size: 14px;
  cursor: pointer;
`;

const S_PostInfoTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
`;
