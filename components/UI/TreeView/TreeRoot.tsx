import { TIconType } from '@/types/icon-type';
import { TreeColor, TColor } from '@/types/tree';

type TreeRootProps = TreeColor & {
  title: string;
  icon: TIconType;
  children: React.ReactNode;
};

export const TEXT_COLOR: { [key in TColor]: string } = {
  Yellow: 'text-yellow-800 dark:text-yellow-400',
  Purple: 'text-purple-800 dark:text-purple-400',
  Green: 'text-green-800 dark:text-green-400',
};

export default function TreeRoot({ title, icon: Icon, color, children }: TreeRootProps) {
  return (
    <div className="text-sm flex">
      <span className={`font-bold ${TEXT_COLOR[color]}`}>
        <Icon strokeWidth={3} className={`inline-block size-4 mb-1 ${TEXT_COLOR[color]}`} />
        &nbsp;{title}&nbsp;&nbsp;
      </span>
      {children}
    </div>
  );
}
