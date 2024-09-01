import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { getImageURL } from '../utils/supabaseStorage';
import { UserContext } from './UserContextProvider';

export const PostContext = createContext(null);

const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('DEV_POSTS').select('*');

    if (error) {
      console.log('🚀 ~ fetchPosts ~ error:', error);
    } else {
      setPosts(data);
    }
  };

  const addPosts = async ({ title, content, project_start_date, project_end_date, tech_stack, thumbnail }) => {
    tech_stack = tech_stack.split(' ');
    const thumbnail_url = await getImageURL(thumbnail, 'thumbnails');

    // TODO: 민영 - 유효성검사 추가

    const { data: uploadPost, error: tableError } = await supabase
      .from('DEV_POSTS')
      .upsert({
        title,
        content,
        project_start_date,
        project_end_date,
        tech_stack,
        thumbnail_url,
        author_id: user.id,
        author_nickname: user.nickname
      })
      .select();

    if (tableError) {
      console.log('🚀 ~ addPosts ~ tableError:', tableError);
    } else {
      fetchPosts();
      alert('프로젝트가 정상적으로 등록되었습니다.');
      return uploadPost[0].post_id;
    }
  };

  const getPostContents = (id) => posts.find((post) => post.post_id === id);

  const editPost = async ({ title, content, project_start_date, project_end_date, tech_stack, thumbnail }) => {
    tech_stack = tech_stack.split(' ');

    // thumbnail type 확인해서 file이면 getImageURL 아니면 그대로 insert하기
    const thumbnail_url = await getImageURL(thumbnail, 'thumbnails');

    // TODO: 민영 - 유효성검사 추가

    const { data: uploadPost, error: tableError } = await supabase
      .from('DEV_POSTS')
      .upsert({
        title,
        content,
        project_start_date,
        project_end_date,
        tech_stack,
        thumbnail_url,
        author_id: user.id
      })
      .select();

    if (tableError) {
      console.log('🚀 ~ addPosts ~ tableError:', tableError);
    } else {
      fetchPosts();
      alert('프로젝트가 정상적으로 등록되었습니다.');
      return uploadPost[0].post_id;
    }
  };

  return <PostContext.Provider value={{ posts, addPosts, getPostContents, editPost }}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
