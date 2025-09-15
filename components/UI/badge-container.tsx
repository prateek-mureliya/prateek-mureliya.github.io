import { TBadgeData } from "@/types/tree";
import { Badge } from "./badge";

type BadgeContainerProps = {
  data: TBadgeData[];
};

export default function BadgeContainer({ data }: BadgeContainerProps) {
  return (
    <div className='flex flex-wrap gap-1'>
      {data.map(({ icon: Icon, title }) => (
        <div key={title}>
          <Badge variant={"outline"}>
            <Icon />
            {title}
          </Badge>
        </div>
      ))}
    </div>
  );
}
