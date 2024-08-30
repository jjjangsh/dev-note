import styled from 'styled-components';

//Card.jsx
export const S_CardImg = styled.div`
  background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF1IwK6-SxM83UpFVY6WtUZxXx-phss_gAUfdKbkTfau6VWVkt');
  width: 300px;
  height: 180px;
  background-position: center;
  background-size: cover;
`;

//Home.jsx
export const S_HomeTitle = styled.h1`
  font-size: 30px;
  display: block;
  max-width: 940px;
  margin: 0 auto;
  padding-top: 50px;
  font-weight: 600;
  border-bottom: 1px solid gray;
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
export const S_TextArea = styled.div`
  padding: 20px;
  line-height: 25px;
`;
export const S_Stack = styled.div`
  font-size: 11px;
  font-weight: 500;
  border-radius: 10px;
  padding: 0px 10px;
  display: inline-block;
`;
export const S_Title = styled.div`
  font-size: 15px;
  font-weight: 800;
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

// Header css start //
export const S_Nav = styled.div`
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 60px;
  top: 0;
`;

// header css // Todo 지영 스타일 오류남
/*export const S_NavImg = styled.div`
  width: 120px;
`;

export const S_NavSpan = styled.span`
  color: white;
  padding: 10px;
`; */

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
// footer css start //
