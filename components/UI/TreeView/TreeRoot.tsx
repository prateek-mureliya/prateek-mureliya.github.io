import { TLucideIcon } from "@/types/lucide-icon";
import { TreeColor } from "@/types/tree";

type TreeRootProps = TreeColor & {
  title: string;
  icon: TLucideIcon;
  children: React.ReactNode;
};

export const TEXT_COLOR: { [key: string]: string } = {
  Yellow: "text-yellow-800 dark:text-yellow-400",
  Blue: "text-blue-800 dark:text-blue-400",
  Green: "text-green-800 dark:text-green-400",
};

export default function TreeRoot({
  title,
  icon: Icon,
  color,
  children,
}: TreeRootProps) {
  return (
    <div className='text-sm'>
      <span className={`font-bold ${TEXT_COLOR[color]}`}>
        <Icon
          strokeWidth={3}
          className={`inline-block size-4 mb-1 ${TEXT_COLOR[color]}`}
        />
        &nbsp;{title}&nbsp;&nbsp;
      </span>
      <span>{children}</span>
    </div>
  );
}
