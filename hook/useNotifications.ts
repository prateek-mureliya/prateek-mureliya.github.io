import { CONTACT_US } from '@/components/constants/app-icons/contact-us';
import { FINDER } from '@/components/constants/app-icons/finder';
import { AUTHOR_NAME } from '@/lib/constants';
import { calYearExperience } from '@/lib/utils';
import { TProcessButton } from '@/types/process-button';
import { useLocalStorage } from './useLocalStorage';
import { useEffect, useMemo } from 'react';

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
    activeTab: 'About Me',
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

export function useNotifications(): [TNotification[], (id: number) => void] {
  const [savedNotifications, setSavedNotifications] = useLocalStorage<TNotificationState[]>('notifications', []);

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

  const markAsRead = (id: number) => {
    setSavedNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification))
    );
  };

  return [notifications, markAsRead];
}
