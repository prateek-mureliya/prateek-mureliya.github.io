import { TNotification } from '@/contexts/application-context';
import { cn } from '@/lib/utils';
import { TProcessButton, TProcessButtonDialog } from '@/types/process-button';
import { Dialog, DialogTrigger } from '../UI/dialog/dialog';

function timeAgo(now: Date, date: Date) {
  const diffMs = now.getTime() - date.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  if (diffMs < 5 * minute) {
    return 'now';
  }

  if (diffMs < hour) {
    const minutes = Math.floor(diffMs / minute);
    return `${minutes}m ago`;
  }

  if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);
    return `${hours}h ago`;
  }

  if (diffMs < month) {
    const days = Math.floor(diffMs / day);
    return `${days}d ago`;
  }

  if (diffMs < year) {
    const months = Math.floor(diffMs / month);
    return `${months} month${months > 1 ? 's' : ''}`;
  }

  const years = Math.floor(diffMs / year);
  return `${years}y ago`;
}

function Notification({
  emoji,
  title,
  desc,
  read,
  date,
  now,
  onClick,
}: TNotification & { now: Date; onClick?: () => void }) {
  return (
    <div
      className={cn(
        'relative flex gap-2 items-center bg-white/80 text-black p-2 mb-3 last:mb-0 rounded-md shadow-2xl dark:shadow-xs cursor-pointer hover:bg-white/90 active:scale-95',
        read ? 'opacity-75' : ''
      )}
      onClick={onClick}
    >
      <div className="text-2xl">{emoji}</div>
      <div className="text-xs select-none">
        <div className="font-bold">{title}</div>
        <div>{desc}</div>
      </div>
      <div className="absolute top-2 right-2 text-xs text-black/60">{timeAgo(now, new Date(date))}</div>
    </div>
  );
}

export default function Notifications({
  notifications,
  action,
}: {
  notifications: TNotification[];
  action: (id: number, app: TProcessButton, read: boolean, activeTab: string | undefined) => void;
}) {
  const now = new Date();
  const sortedNotifications = notifications.sort((a, b) => {
    if (a.read !== b.read) {
      return Number(a.read) - Number(b.read); // unread first
    }

    return a.id - b.id; // sort by id
  });

  return (
    <>
      <div className="text-xs text-shadow-2xs font-bold pl-4">Notifications</div>
      <div className="max-h-60 p-4 pt-0 overflow-auto" style={{ scrollbarWidth: 'none' }}>
        {sortedNotifications.map((props) => {
          if (props.app.type == 'dialog') {
            const others = props.app as TProcessButtonDialog;
            return (
              <Dialog key={props.id}>
                <DialogTrigger asChild onClick={() => action(props.id, props.app, props.read, props.activeTab)}>
                  <Notification {...props} now={now} />
                </DialogTrigger>
                <others.popup />
              </Dialog>
            );
          }

          return (
            <Notification
              key={props.id}
              {...props}
              now={now}
              onClick={() => action(props.id, props.app, props.read, props.activeTab)}
            />
          );
        })}
      </div>
    </>
  );
}
