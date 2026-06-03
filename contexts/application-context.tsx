'use client';
import { useLocalStorage } from '@/hook/useLocalStorage';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { UserDeveloperImg, UserRecruiterImg, UserStalkerImg } from '@/lib/media';
import { ImageFile } from '@/types/basic-props';
import { useFullscreen } from '@/hook/useFullscreen';
import { AUTHOR_NAME } from '@/lib/constants';
import { calYearExperience } from '@/lib/utils';
import { FINDER } from '@/components/constants/app-icons/finder';
import { TProcessButton } from '@/types/process-button';
import { CONTACT_US } from '@/components/constants/app-icons/contact-us';

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
  notifications: TNotification[];
  setIsLogin: (isLogin: boolean) => void;
  setSelectedUser: (userType: UserType) => void;
  deleteSelectedUser: () => void;
  updateBrightness: (brightness: number) => void;
  toggleFullscreen: () => void;
  markNotificationsRead: (id: number) => void;
};

type TNotificationState = {
  id: number;
  date: string;
  read: boolean;
};

export type TNotification = TNotificationState & {
  emoji: string;
  title: string;
  desc: string;
  app: TProcessButton;
  activeTab?: string;
};

const users: { [key in UserType]: ImageFile } = {
  RECRUITER: UserRecruiterImg,
  STALKER: UserStalkerImg,
  DEVELOPER: UserDeveloperImg,
};

const getPastminues = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - 13);

  return d;
};

const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d;
};

const NOTIFICATIONS: TNotification[] = [
  {
    id: 1,
    emoji: '👋',
    title: 'Welcome to My Portfolio',
    desc: `Hi, I'm ${AUTHOR_NAME} — a Senior Backend Engineer with ${calYearExperience()} years of experience.`,
    date: new Date().toUTCString(),
    read: false,
    app: FINDER,
  },
  {
    id: 2,
    emoji: '🚀',
    title: 'Technical Expertise',
    desc: 'Specialized in microservices, cloud infrastructure and distributed systems.',
    date: getPastminues().toUTCString(),
    read: false,
    app: FINDER,
    activeTab: 'Skills',
  },
  {
    id: 3,
    emoji: '📬',
    title: 'Get in Touch',
    desc: "Let's connect! I'm always open for exciting opportunities and collaborations.",
    date: getYesterday().toUTCString(),
    read: false,
    app: CONTACT_US,
  },
];

const ApplicationContext = createContext<ApplicationContextType>({} as ApplicationContextType);

export const ApplicationContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [brightness, setBrightness] = useState(75);
  const { fullscreen, toggleFullscreen } = useFullscreen();
  const [selectedUserType, setSelectedUserType, deleteSelectedUser] = useLocalStorage<UserType | undefined>(
    'selectedUser',
    undefined
  );
  const [savedNotifications, setSavedNotifications] = useLocalStorage<TNotificationState[]>('notifications', []);

  const selectedUser: ImageFile | undefined = selectedUserType ? users[selectedUserType] : undefined;
  const setSelectedUser = (userType: UserType) => setSelectedUserType(userType);
  const updateBrightness = (brightness: number) => {
    document.body.style = `filter: brightness(${brightness + 25}%);`;
    setBrightness(brightness);
  };

  const checkUserType = (userType: UserType) =>
    selectedUser != undefined && selectedUser.alt.toLowerCase() == userType.toLowerCase();

  const notifications = useMemo(() => {
    return NOTIFICATIONS.map((notification) => {
      const saved = savedNotifications.find((item) => item.id === notification.id);

      return saved
        ? {
            ...notification,
            date: saved.date,
            read: saved.read,
          }
        : notification;
    });
  }, [savedNotifications]);

  useEffect(() => {
    if (savedNotifications.length === 0) {
      setSavedNotifications(
        NOTIFICATIONS.map(({ id, date, read }) => ({
          id,
          date,
          read,
        }))
      );
    }
  }, [savedNotifications, setSavedNotifications]);

  const markNotificationsRead = (id: number) => {
    setSavedNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification))
    );
  };

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
        notifications,
        setIsLogin,
        setSelectedUser,
        deleteSelectedUser,
        updateBrightness,
        toggleFullscreen,
        markNotificationsRead,
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
