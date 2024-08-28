import { createContext, useState } from 'react';

export const UserContext = createContext(123);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(123);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
