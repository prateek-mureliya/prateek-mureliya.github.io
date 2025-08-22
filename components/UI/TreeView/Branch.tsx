import { TLucideIcon } from "@/types/lucide-icon";
import { TreeColor } from "@/types/tree";
import { BORDER_COLOR } from "./Branches";
import { TEXT_COLOR } from "./TreeRoot";

type ItemProps = TreeColor & {
  title: string;
  icon: TLucideIcon;
  children: React.ReactNode;
};

export default function Branch({
  title,
  icon: Icon,
  color,
  children,
}: ItemProps) {
  return (
    <li className='text-sm relative flex'>
      <span
        className={`absolute -left-[1rem] top-2 w-4 border-t ${BORDER_COLOR[color]}`}
      ></span>
      <span className={`font-bold ${TEXT_COLOR[color]} min-w-fit`}>
        <Icon
          strokeWidth={3}
          className={`inline-block size-4 mb-1 ${TEXT_COLOR[color]}`}
        />
        &nbsp;{title}&nbsp;&nbsp;
      </span>
      {children}
    </li>
  );
}
