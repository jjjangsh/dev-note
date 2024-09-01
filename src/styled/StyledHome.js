import styled from 'styled-components';
// Home css start //
export const S_HomeTitle = styled.h1`
  position: relative;
  font-size: 30px;
  display: block;
  max-width: 940px;
  margin: 0 auto;
  padding-top: 50px;
  font-weight: 600;
  border-bottom: 1px solid gray;
`;
export const S_AddNewPostBtn = styled.span`
  position: absolute;
  right: 0;
  width: 30px;
  height: 30px;
  background-image: url(../../public/add-btn-black.png);
  background-size: cover;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;
export const S_CardContainer = styled.div`
  margin: 10px;
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 963px;
  margin: 0 auto;
  padding: 50px 0 150px;
`;
// Home css end //

// Card css start
export const S_Card = styled.div`
  border-radius: 30px;
  overflow: hidden;
  width: 300px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  flex-basis: auto;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
export const S_CardImg = styled.div`
  background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF1IwK6-SxM83UpFVY6WtUZxXx-phss_gAUfdKbkTfau6VWVkt');
  width: 300px;
  height: 180px;
  background-position: center;
  background-size: cover;
`;
export const S_TextArea = styled.div`
  padding: 20px;
  line-height: 25px;
  height: 160px;
`;
export const S_StackContainer = styled.div`
  line-height: 16px;
  height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const S_Stack = styled.div`
  font-size: 11px;
  font-weight: 500;
  border-radius: 10px;
  padding-right: 10px;
  display: inline-block;
`;
export const S_Title = styled.div`
  font-size: 15px;
  font-weight: 800;
  height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 13px;
`;
export const S_Content = styled.div`
  font-size: 12px;
  line-height: 15px;
  height: 45px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
`;
export const S_FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
`;
// Card css end

// Header css start //
export const S_Logo = styled.img`
  width: 120px;
  cursor: pointer;
`;
export const S_Nav = styled.nav`
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 60px;
  top: 0;
`;

// Header css start //

// footer css start //
export const S_Footer = styled.div`
  position: fixed;
  bottom: 0;
  background: black;
  color: white;
  width: 100vw;
  height: 100px;
`;
export const S_FooterP = styled.p`
  font-size: 13px;
  text-align: center;
  line-height: 100px;
`;
// footer css end //
