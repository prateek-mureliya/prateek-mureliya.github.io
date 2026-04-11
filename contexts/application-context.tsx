'use client';
import { useLocalStorage } from '@/hook/useLocalStorage';
import { createContext, ReactNode, useContext, useState } from 'react';
import { UserDeveloperImg, UserRecruiterImg, UserStalkerImg } from '@/lib/media';
import { ImageFile } from '@/types/basic-props';
import { useFullscreen } from '@/hook/useFullscreen';

export enum UserType {
  Recruiter = 'RECRUITER',
  Stalker = 'STALKER',
  Developer = 'DEVELOPER',
}
type ApplicationContextType = {
  isLogin: boolean;
  selectedUser?: ImageFile;
  isRecruiter: boolean;
  isStalker: boolean;
  isDeveloper: boolean;
  brightness: number;
  fullscreen: boolean;
  setIsLogin: (isLogin: boolean) => void;
  setSelectedUser: (userType: UserType) => void;
  deleteSelectedUser: () => void;
  updateBrightness: (brightness: number) => void;
  toggleFullscreen: () => void;
};

const users: { [key in UserType]: ImageFile } = {
  RECRUITER: UserRecruiterImg,
  STALKER: UserStalkerImg,
  DEVELOPER: UserDeveloperImg,
};

const ApplicationContext = createContext<ApplicationContextType>({} as ApplicationContextType);

export const ApplicationContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [brightness, setBrightness] = useState(75);
  const { fullscreen, toggleFullscreen } = useFullscreen();
  const [selectedUserType, setSelectedUserType, deleteSelectedUser] = useLocalStorage<UserType | undefined>(
    'selectedUser',
    undefined
  );

  const selectedUser: ImageFile | undefined = selectedUserType ? users[selectedUserType] : undefined;
  const setSelectedUser = (userType: UserType) => setSelectedUserType(userType);
  const updateBrightness = (brightness: number) => {
    document.body.style = `filter: brightness(${brightness + 25}%);`;
    setBrightness(brightness);
  };

  const checkUserType = (userType: UserType) =>
    selectedUser != undefined && selectedUser.alt.toLowerCase() == userType.toLowerCase();

  return (
    <ApplicationContext.Provider
      value={{
        isLogin,
        selectedUser,
        isRecruiter: checkUserType(UserType.Recruiter),
        isStalker: checkUserType(UserType.Stalker),
        isDeveloper: checkUserType(UserType.Developer),
        brightness,
        fullscreen,
        setIsLogin,
        setSelectedUser,
        deleteSelectedUser,
        updateBrightness,
        toggleFullscreen,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error('useLoginContext must be used within a ApplicationContextProvider');
  }

  return context;
};
