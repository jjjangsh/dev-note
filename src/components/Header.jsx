import { useContext } from 'react';
import '../test.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';
import { S_Logo, S_Nav } from '../styled/StyledHome';

const Header = () => {
  // Todo = 로그인 정보 연결
  // context에서 받아서 사용 (로그인)
  const { user, HandleSignOut } = useContext(UserContext);
  const nav = useNavigate();
  //
  const handleLogoClick = () => {
    nav('/'); // 홈으로 이동
  };
  return (
    <>
      <S_Nav>
        <S_Logo src="../logo.png" onClick={handleLogoClick} />
        <div>
          {user ? (
            <>
              <Link className="navBtn" onClick={HandleSignOut}>
                Logout
              </Link>
              <Link className="navBtn" to="/auth/mypage">
                Mypage
              </Link>
            </>
          ) : (
            <>
              <Link className="navBtn" to="/signin">
                SignIn
              </Link>
              <Link className="navBtn" to="/signup">
                SignUp
              </Link>
            </>
          )}
        </div>
      </S_Nav>
    </>
  );
};

export default Header;
