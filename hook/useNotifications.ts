import { CONTACT_US } from '@/components/constants/app-icons/contact-us';
import { FINDER } from '@/components/constants/app-icons/finder';
import { AUTHOR_NAME } from '@/lib/constants';
import { calYearExperience } from '@/lib/utils';
import { TProcessButton } from '@/types/process-button';
import { useLocalStorage } from './useLocalStorage';
import { useEffect, useMemo } from 'react';

type TNotificationState = {
  id: string;
  date: string;
  read: boolean;
};

export type TNotification = TNotificationState & {
  rank: number;
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

const getPasthours = () => {
  const d = new Date();
  d.setMinutes(d.getHours() - 2);

  return d;
};

const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d;
};

const NOTIFICATIONS: TNotification[] = [
  {
    id: 'aboutme',
    rank: 1,
    emoji: '👋',
    title: 'Welcome to My Portfolio',
    desc: `Hi, I'm ${AUTHOR_NAME} — a Senior Backend Engineer with ${calYearExperience()} years of experience.`,
    date: new Date().toUTCString(),
    read: false,
    app: FINDER,
    activeTab: 'About Me',
  },
  {
    id: 'skills',
    rank: 2,
    emoji: '🚀',
    title: 'Technical Expertise',
    desc: 'Specialized in microservices, cloud infrastructure and distributed systems.',
    date: getPastminues().toUTCString(),
    read: false,
    app: FINDER,
    activeTab: 'Skills',
  },
  {
    id: 'experience',
    rank: 3,
    emoji: '💼',
    title: 'Explore My Experience',
    desc: "Dive into my professional journey and the impact I've made across various projects.",
    date: getPasthours().toUTCString(),
    read: false,
    app: FINDER,
    activeTab: 'Experience',
  },
  {
    id: 'education',
    rank: 4,
    emoji: '🎓',
    title: 'Educational Background',
    desc: 'Discover my academic journey, qualifications, and the foundation of my technical expertise.',
    date: getPasthours().toUTCString(),
    read: false,
    app: FINDER,
    activeTab: 'Education',
  },
  {
    id: 'contactus',
    rank: 4,
    emoji: '📬',
    title: 'Get in Touch',
    desc: "Let's connect! I'm always open for exciting opportunities and collaborations.",
    date: getYesterday().toUTCString(),
    read: false,
    app: CONTACT_US,
  },
];

export function useNotifications(): [TNotification[], (id: string) => void] {
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
    if (savedNotifications.length !== NOTIFICATIONS.length) {
      const result = savedNotifications.reduce<Record<string, boolean>>((acc, { id, read }) => {
        acc[id] = read;
        return acc;
      }, {});

      setSavedNotifications(
        NOTIFICATIONS.map(({ id, date, read }) => ({
          id,
          date,
          read: result.hasOwnProperty(id) ? result[id] : read,
        }))
      );
    }
  }, [savedNotifications, setSavedNotifications]);

  const markAsRead = (id: string) => {
    setSavedNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification))
    );
  };

  return [notifications, markAsRead];
}
