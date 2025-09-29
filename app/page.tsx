import ConsoleMessage from "@/components/console-message";
import SplashCursor from "@/components/UI/splash-cursor";
import WelcomeMessage from "@/components/welcome-message";
import Header from "@/components/Header";
import Wallpaper from "@/components/Wallpaper";
import Desktop from "@/components/Desktop";
import Footer from "@/components/Footer";
import ProcessManager from "@/components/ProcessManager";

export default function Home() {
  return (
    <>
      <ConsoleMessage />
      <Header />
      <Wallpaper />
      <Desktop />
      <Footer />
      <ProcessManager />
      <SplashCursor />
      <WelcomeMessage />
    </>
  );
}
