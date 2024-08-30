import { createContext, useEffect, useState } from 'react';
import supabase from '../supabaseClient';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const response = await supabase.auth.getSession();
      const {
        id,
        email,
        user_metadata: { name, nickname }
      } = response.data.session.user;
      setUser({ id, email, name, nickname });
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const {
          id,
          email,
          user_metadata: { name, nickname }
        } = session.user;
        setUser({ id, email, name, nickname });
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  console.log(user);

  const HandleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('로그아웃 중 오류 발생:', error);
    } else {
      alert('로그아웃 처리가 완료 되었습니다. 메인 페이지로 이동합니다.');
    }
  };

  return <UserContext.Provider value={{ user, setUser, HandleSignOut }}>{children}</UserContext.Provider>;
};
