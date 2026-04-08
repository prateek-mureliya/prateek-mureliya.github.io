import { AUTHOR_PORTFOLIO, HEADER_FOOTER_Z_INDEX } from '@/lib/constants';
import DigitalClock from './digital-clock';
import NavigationMenu from './Menu';
import { cn } from '@/lib/utils';

export default function Header() {
  const bgColor = 'bg-stone-300/50 dark:bg-indigo-950/70';
  return (
    <header
      className={cn('absolute left-0 right-0 grid grid-cols-[1fr_auto] gap-3 py-1.5 px-3 border-b', bgColor)}
      style={{
        zIndex: HEADER_FOOTER_Z_INDEX,
      }}
    >
      <div className="text-sm cursor-default select-none font-semibold col-start-1">{AUTHOR_PORTFOLIO}</div>
      <NavigationMenu className={'bg-stone-300 dark:bg-indigo-950'} />
      <DigitalClock />
    </header>
  );
}
