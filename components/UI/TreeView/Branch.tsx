import { TLucideIcon } from "@/types/lucide-icon";
import { TreeColor } from "@/types/tree";
import { BORDER_COLOR } from "./Branches";
import { TEXT_COLOR } from "./TreeRoot";

type ItemProps = TreeColor & {
  title: string;
  details: string;
  icon: TLucideIcon;
};

export default function Branch({
  title,
  details,
  icon: Icon,
  color,
}: ItemProps) {
  return (
    <li className='text-sm relative'>
      <span
        className={`absolute -left-[1rem] top-1/2 w-4 border-t ${BORDER_COLOR[color]}`}
      ></span>
      <span className={`font-bold ${TEXT_COLOR[color]}`}>
        <Icon
          strokeWidth={3}
          className={`inline-block size-4 mb-1 ${TEXT_COLOR[color]}`}
        />
        &nbsp;{title}&nbsp;&nbsp;
      </span>
      <span>{details}</span>
    </li>
  );
}
