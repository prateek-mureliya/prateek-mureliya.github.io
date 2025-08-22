import { HEADER_FOOTER_Z_INDEX } from "@/lib/constants";
import DigitalClock from "./digital-clock";
import NavigationMenu from "./Menu";

export default function Header() {
  return (
    <header
      className={`absolute left-0 right-0 grid grid-cols-[1fr_auto_1fr] py-1.5 px-3 mt-1 mx-1 border rounded-full supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 backdrop-blur-md`}
      style={{
        zIndex: HEADER_FOOTER_Z_INDEX,
      }}
    >
      <DigitalClock />
      <NavigationMenu />
    </header>
  );
}
