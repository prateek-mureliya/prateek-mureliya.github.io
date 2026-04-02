import { AUTHOR_PORTFOLIO, HEADER_FOOTER_Z_INDEX } from '@/lib/constants';
import DigitalClock from './digital-clock';
import NavigationMenu from './Menu';

export default function Header() {
  return (
    <header
      className={`absolute left-0 right-0 grid grid-cols-[1fr_auto] gap-3 py-1.5 px-3 border-b bg-stone-300/50 dark:bg-indigo-950/70 supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 backdrop-blur-md`}
      style={{
        zIndex: HEADER_FOOTER_Z_INDEX,
      }}
    >
      <div className="text-sm cursor-default select-none font-semibold col-start-1">{AUTHOR_PORTFOLIO}</div>
      <NavigationMenu />
      <DigitalClock />
    </header>
  );
}
