import { TBadgeData } from "@/types/tree";
import { Badge } from "./badge";

type BadgeContainerProps = {
  data: TBadgeData[];
};

export default function BadgeContainer({ data }: BadgeContainerProps) {
  return (
    <div className='flex flex-wrap gap-1 pb-2'>
      {data.map(({ icon: Icon, title }) => (
        <Badge key={title} variant={"outline"}>
          <Icon />
          {title}
        </Badge>
      ))}
    </div>
  );
}
