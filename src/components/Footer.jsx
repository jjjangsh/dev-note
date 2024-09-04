import { S_Footer, S_FooterP, S_FooterInfo, S_FooterGit } from '../styled/StyledHome';

const Footer = () => {
  return (
    <S_Footer>
      <S_FooterInfo>
        <S_FooterP>© Copyright 2024 devNote. All rights reserved.</S_FooterP>
        <S_FooterGit href="https://github.com/jjjangsh/dev-note" target="_blank" alt="git_logo" />
      </S_FooterInfo>
    </S_Footer>
  );
};

export default Footer;
