import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { Outlet } from 'react-router-dom';
import { S_OutletConatiner } from '../styled/StyledHome.js';
const Layout = () => {
  return (
    <>
      <Header />
      <S_OutletConatiner>
        <Outlet />
      </S_OutletConatiner>
      <Footer />
    </>
  );
};

export default Layout;
