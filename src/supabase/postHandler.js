import supabase from './supabaseClient';

export const fetchPosts = async () => {
  const { data, error } = await supabase.from('DEV_POSTS').select('*');

  if (error) {
    console.log('🚀 ~ fetchPosts ~ error:', error);
  }

  // TODO: 민영 context update
};

export const addPosts = async ({ title, content, project_start_date, project_end_date, tech_stack, thumbnail_url }) => {
  // TODO: 민영 strict mode에서 두번 insert 되지 않도록 설정
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
    alert('프로젝트가 정상적으로 등록되었습니다.');
  }
};
