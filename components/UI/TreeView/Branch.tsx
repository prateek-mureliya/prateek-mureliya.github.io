import { TIconType } from '@/types/icon-type';
import { TreeColor } from '@/types/tree';

type ItemProps = TreeColor & {
  title: string;
  icon: TIconType;
  children: React.ReactNode;
};

export default function Branch({ title, icon: Icon, textColor, borderColor, children }: ItemProps) {
  return (
    <li className="text-sm relative flex">
      <span className={`absolute -left-[1rem] top-2 w-4 border-t ${borderColor}`}></span>
      <span className={`font-bold ${textColor} min-w-fit`}>
        <Icon strokeWidth={3} className={`inline-block size-4 mb-1 ${textColor}`} />
        &nbsp;{title}&nbsp;&nbsp;
      </span>
      {children}
    </li>
  );
}
