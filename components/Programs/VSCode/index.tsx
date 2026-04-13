import WindowBody, { WindowBodyProps } from '@/components/Window/window-body';
import { GITHUB_USERNAME } from '@/lib/constants';

export default function VsCode({ isMaximized }: WindowBodyProps) {
  return (
    <WindowBody isMaximized={isMaximized}>
      <iframe
        src={`https://github1s.com/${GITHUB_USERNAME}/${GITHUB_USERNAME}.github.io`}
        allowFullScreen
        sandbox="allow-scripts allow-same-origin"
        className="size-full"
      ></iframe>
    </WindowBody>
  );
}
