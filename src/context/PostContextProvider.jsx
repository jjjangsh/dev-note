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
    const date1 = await supabase.auth.getSession();
    console.log(date1);

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
      await fetchPosts();
      alert('프로젝트가 정상적으로 등록되었습니다.');
      return uploadPost[0].post_id;
    }
  };

  const getPostContents = (id) => posts.find((post) => post.post_id === id);

  const editPost = async (id, prevColumns, newColumns) => {
    const updateColumns = {};

    if (prevColumns.title !== newColumns.title) updateColumns.title = newColumns.title;
    if (prevColumns.tech_stack !== newColumns.tech_stack) updateColumns.tech_stack = newColumns.tech_stack.split(' ');
    if (prevColumns.content !== newColumns.content) updateColumns.content = newColumns.content;
    if (prevColumns.project_start_date !== newColumns.project_start_date)
      updateColumns.project_start_date = newColumns.project_start_date;
    if (prevColumns.project_end_date !== newColumns.project_end_date)
      updateColumns.project_end_date = newColumns.project_end_date;
    if (prevColumns.thumbnail !== newColumns.thumbnail)
      updateColumns.thumbnail_url = await getImageURL(newColumns.thumbnail, 'thumbnails');

    // TODO: 민영 - 유효성검사 추가

    const { error: tableError } = await supabase.from('DEV_POSTS').update(updateColumns).eq('post_id', id).select();

    if (tableError) {
      console.log('🚀 ~ addPosts ~ tableError:', tableError);
    } else {
      await fetchPosts();
      alert('프로젝트가 정상적으로 등록되었습니다.');
    }
  };

  const deletePosts = async (id) => {
    const { error } = await supabase.from('DEV_POSTS').delete().eq('post_id', id);

    if (error) {
      console.error('🚀 ~ deletePost ~ error:', error);
    } else {
      alert('게시물이 삭제되었습니다.');
      fetchPosts(); // 삭제 후 게시물 목록을 다시 불러오는 부분
    }
  };

  return (
    <PostContext.Provider value={{ posts, addPosts, getPostContents, editPost, deletePosts }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
