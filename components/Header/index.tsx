import { HEADER_FOOTER_Z_INDEX } from "@/lib/constants";
import DigitalClock from "./digital-clock";
import NavigationMenu from "./Menu";

export default function Header() {
  return (
    <header
      className={`absolute left-0 right-0 flex flex-row justify-between items-center px-4 mt-1 mx-1 border rounded-full supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 backdrop-blur-md`}
      style={{
        zIndex: HEADER_FOOTER_Z_INDEX,
      }}
    >
      <div
        role='active-task'
        className='text-sm hidden sm:block sm:invisible'
      ></div>
      <DigitalClock />
      <NavigationMenu />
    </header>
  );
}
