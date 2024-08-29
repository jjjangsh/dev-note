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

  const addPosts = async ({ title, content, project_start_date, project_end_date, tech_stack, thumbnail }) => {
    let thumbnail_url;
    tech_stack = tech_stack.split(' ');

    const thumbnailName = `${Date.now()}-${crypto.randomUUID()}`;
    const thumbnailPath = `${thumbnailName}`;

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('thumbnails')
        .upload(thumbnailPath, thumbnail);

      if (uploadError) {
        console.log('🚀 ~ NewPost ~ uploadError:', uploadError);
      } else {
        const { data: urlData, error: urlError } = supabase.storage.from('thumbnails').getPublicUrl(uploadData.path);

        if (urlError) {
          console.log('🚀 ~ NewPost ~ urlError:', urlError);
        } else {
          thumbnail_url = urlData.publicUrl;
        }
      }
    } catch (error) {
      console.error('Unexpected error: ', error);
    }

    // TODO: 민영 - 유효성검사 추가

    const { error: tableError } = await supabase.from('DEV_POSTS').insert({
      title,
      content,
      project_start_date,
      project_end_date,
      tech_stack,
      thumbnail_url
    });

    if (tableError) {
      console.log('🚀 ~ addPosts ~ tableError:', tableError);
    } else {
      fetchPosts();
      alert('프로젝트가 정상적으로 등록되었습니다.');
    }
  };

  return <PostContext.Provider value={{ posts, addPosts }}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
