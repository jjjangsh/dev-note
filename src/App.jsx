import { UserContextProvider } from './context/UserContextProvider';
import './reset.css';
import Router from './shared/Router';

function App() {
  return (
    <div>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </div>
  );
}

export default App;
