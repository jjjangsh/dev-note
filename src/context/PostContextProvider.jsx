import { createContext, useEffect, useState } from 'react';
import supabase from '../supabaseClient';

export const PostContext = createContext(null);

const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

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

  const addPosts = async ({ title, content, project_start_date, project_end_date, tech_stack, thumbnail_url }) => {
    const { error } = await supabase.from('DEV_POSTS').insert({
      title,
      content,
      project_start_date,
      project_end_date,
      tech_stack,
      thumbnail_url
    });

    if (error) {
      console.log('🚀 ~ addPosts ~ error:', error);
    } else {
      fetchPosts();
      alert('프로젝트가 정상적으로 등록되었습니다.');
    }
  };

  return <PostContext.Provider value={{ posts, addPosts }}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
