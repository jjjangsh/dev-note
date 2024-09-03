import { useContext } from 'react';
import '../test.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';
import { S_Logo, S_Nav } from '../styled/StyledHome';

const Header = () => {
  const { user, HandleSignOut } = useContext(UserContext);
  const nav = useNavigate();
  const handleLogoClick = () => {
    nav('/');
  };
  return (
    <>
      <S_Nav>
        <S_Logo src="https://dev-note-two.vercel.app/logo.png" onClick={handleLogoClick} />
        <div>
          {user ? (
            <>
              <Link className="navBtn" to="/auth/mypage">
                Mypage
              </Link>
              <Link className="navBtn" onClick={HandleSignOut}>
                Logout
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
