import PostContextProvider from './context/PostContextProvider';
import { UserContextProvider } from './context/UserContextProvider';
import './reset.css';
import Router from './shared/Router';

function App() {
  return (
    <div>
      <UserContextProvider>
        <PostContextProvider>
          <Router />
        </PostContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
