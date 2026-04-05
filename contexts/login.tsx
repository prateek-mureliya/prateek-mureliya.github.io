'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

type LoginContextType = {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
};

const LoginContext = createContext<LoginContextType>({} as LoginContextType);

export const LoginContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, dispatch] = useState(false);

  const setIsLogin = (isLogin: boolean) => {
    dispatch(isLogin);
  };

  return <LoginContext.Provider value={{ isLogin, setIsLogin }}>{children}</LoginContext.Provider>;
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error('useLoginContext must be used within a LoginContextProvider');
  }

  return context;
};
