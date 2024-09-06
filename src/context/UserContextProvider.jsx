import { createContext, useEffect, useState } from 'react';
import supabase from '../supabaseClient';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();
      if (error) {
        console.error('세션 가져오기 오류:', error);
        return;
      }

      if (session?.user) {
        const { id, email, created_at } = session.user;

        const { data: profileData, error: profileError } = await supabase
          .from('profile')
          .select('name, nickname, avatar_url')
          .eq('id', id)
          .single();

        if (profileError) {
          console.error('프로필 정보 가져오기 오류:', profileError);
          return;
        }

        setUser({ id, email, created_at, ...profileData });
      } else {
        setUser(null);
      }
    };

    getSession();

    const atChangeVisible = async () => {
      if (document.visibilityState === 'visible') {
        window.location.reload();
      }
    };

    document.removeEventListener('visibilitychange', atChangeVisible);
    document.addEventListener('visibilitychange', atChangeVisible);

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentTime = Math.floor(Date.now() / 1000);
      if (session?.expires_at < currentTime) {
        console.log('시간초과: 세션이 만료되었습니다.');
        setUser(null); // 로그아웃 처리
        window.location.reload();
        return;
      }

      if (session?.user) {
        const { id, email, created_at } = session.user;

        const { data: profileData, error: profileError } = await supabase
          .from('profile')
          .select('name, nickname, avatar_url')
          .eq('id', id)
          .single();

        if (profileError) {
          console.error('프로필 정보 가져오기 오류:', profileError);
          return;
        }

        setUser({ id, email, created_at, ...profileData });
      } else {
        setUser(null);
      }
    });

    return () => {
      document.removeEventListener('visibilitychange', atChangeVisible);
      authListener.subscription.unsubscribe();
    };
  }, []);

  const HandleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('로그아웃 오류:', error);
    } else {
      alert('로그아웃 처리가 완료 되었습니다.');
      setUser(null);
    }
  };

  return <UserContext.Provider value={{ user, setUser, HandleSignOut }}>{children}</UserContext.Provider>;
};
