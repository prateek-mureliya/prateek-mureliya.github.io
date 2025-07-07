import ConsoleMessage from "@/components/console-message";
import Header from "@/components/Header";
import Wallpaper from "@/components/Wallpaper";
import Desktop from "@/components/Desktop";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ConsoleMessage />
      <Header />
      <Wallpaper />
      <Desktop />
      <Footer />
    </>
  );
}
