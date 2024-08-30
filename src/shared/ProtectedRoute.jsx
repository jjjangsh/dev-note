import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';
export const ProtectedRoute = () => {
  const { user } = useContext(UserContext);
  const { pathname } = useLocation();
  // 로그인 되어있지 않은 경우 sign-in으로 replace 옵션으로 redirection
  // replace, push가 있는데 뒤로가기 가능 여부가 다름
  // redirect pathname을 기억할 수 있도록 state를 지정해줌 (어디서 왔는지 저장 -> 로그인 후 거기로 돌아감)
  // SignIn.jsx 페이지에서 사용
  if (!user) {
    return <Navigate to="/signin" replace state={{ redirectedFrom: pathname }} />;
  }
  // Outlet: 보호된 라우트 내에서 자식 라우트를 렌더링
  return <Outlet />;
};
