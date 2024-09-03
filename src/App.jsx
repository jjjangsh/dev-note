import { CommentContextProvider } from './context/CommentContextProvider';
import PostContextProvider from './context/PostContextProvider';
import { UserContextProvider } from './context/UserContextProvider';

import './reset.css';
import Router from './shared/Router';
import { S_AppContainer } from './styled/StyledHome';
import supabase from './supabaseClient';

function App() {
  window.addEventListener('load', async () => {
    const sessionExpired = localStorage.getItem('sessionExpired');
    if (sessionExpired) {
      const { error } = await supabase.auth.signOut(); // 로그아웃 처리
      if (error) {
        console.error('로그아웃 중 오류 발생:', error);
      } else {
        console.log('세션이 삭제되었습니다.');
      }
      localStorage.removeItem('sessionExpired'); // 상태 제거
    }
  });

  window.addEventListener('beforeunload', () => {
    localStorage.removeItem('sb-sdvgajhhvhmnjzrmwkbt-auth-token');
    const { error } = supabase.auth.signOut(); // 로그아웃 처리
    if (error) {
      console.error('로그아웃 중 오류 발생:', error);
    } else {
      console.log('세션이 삭제되었습니다.');
    }
  });
  return (
    <S_AppContainer>
      <UserContextProvider>
        <PostContextProvider>
          <CommentContextProvider>
            <Router />
          </CommentContextProvider>
        </PostContextProvider>
      </UserContextProvider>
    </S_AppContainer>
  );
}

export default App;
