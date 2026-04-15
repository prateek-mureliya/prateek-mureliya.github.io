'use client';
import ConsoleMessage from '@/components/console-message';
import WelcomeMessage from '@/components/welcome-message';
import Header from '@/components/Header';
import Wallpaper from '@/components/Wallpaper';
import Desktop from '@/components/Desktop';
import Footer from '@/components/Footer';
import ProcessManager from '@/components/ProcessManager';
import LockScreen from '@/components/LockScreen';
import { useApplicationContext } from '@/contexts/application-context';

export default function Home() {
  const { isLogin } = useApplicationContext();

  return (
    <>
      <ConsoleMessage />
      <Header />
      <Wallpaper />
      {isLogin && <Desktop />}
      {isLogin && <Footer />}
      <ProcessManager />
      <WelcomeMessage />
      <LockScreen />
    </>
  );
}
