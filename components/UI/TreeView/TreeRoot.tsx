import { TIconType } from '@/types/icon-type';
import { TreeColor } from '@/types/tree';

type TreeRootProps = TreeColor & {
  title: string;
  icon: TIconType;
  children: React.ReactNode;
};

export default function TreeRoot({ title, icon: Icon, textColor = '', children }: TreeRootProps) {
  return (
    <div className="text-sm flex">
      <span className={`font-bold ${textColor}`}>
        <Icon strokeWidth={3} className={`inline-block size-4 mb-1 ${textColor}`} />
        &nbsp;{title}&nbsp;&nbsp;
      </span>
      {children}
    </div>
  );
}
