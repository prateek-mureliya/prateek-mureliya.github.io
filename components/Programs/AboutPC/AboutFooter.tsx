import { AUTHOR_NAME } from '@/lib/constants';

export default function AboutFooter() {
  return (
    <div className="text-muted-foreground text-xs text-center">
      Made with
      <span className="relative mx-1">
        <span className="absolute animate-ping">❤️</span>
        <span>❤️</span>
      </span>
      by {AUTHOR_NAME}
    </div>
  );
}
