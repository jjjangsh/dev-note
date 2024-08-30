import { useState } from 'react';
import '../test.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  // Todo = 로그인 정보 연결
  // context에서 받아서 사용 (로그인 함수를 구현하시면 그때)
  const [isSignIn, setIsSignIn] = useState(true); // 로그인 상태 관리
  const nav = useNavigate();

  const handleLogOut = () => {
    nav('/');
    setIsSignIn(false); // 상태 변경
  };
  const handleLogIn = () => {
    nav('/signin');
    setIsSignIn(true); // 상태 변경
  };
  const handleMypage = () => {
    if (isSignIn) {
      nav('auth/mypage');
    } else {
      nav('/signin');
    }
  };
  const handleLogoClick = () => {
    nav('/'); // 홈으로 이동
  };
  const handleSignUp = () => {
    nav('/signup');
  };
  return (
    <>
      <nav>
        <img src="../logo.png" alt="" onClick={handleLogoClick} style={{ cursor: 'pointer' }} />
        <div>
          {isSignIn ? (
            <>
              <span onClick={handleLogOut}>Logout</span>
              <span onClick={handleMypage}>Mypage</span>
            </>
          ) : (
            <>
              <span onClick={handleLogIn}>Login</span>
              <span onClick={handleSignUp}>SignUp</span>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
