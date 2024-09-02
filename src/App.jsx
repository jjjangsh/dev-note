import PostContextProvider from './context/PostContextProvider';
import { UserContextProvider } from './context/UserContextProvider';
import './reset.css';
import Router from './shared/Router';
import { S_AppContainer } from './styled/StyledHome';

function App() {
  return (
    <S_AppContainer>
      <UserContextProvider>
        <PostContextProvider>
          <Router />
        </PostContextProvider>
      </UserContextProvider>
    </S_AppContainer>
  );
}

export default App;
