import { CancelAction, ConfirmBox, LinkButtonAction } from '../UI/dialog/confirm';
import { ShutdownImg } from '@/lib/media';
import { GITHUB_URL } from '@/lib/constants';
import { ExternalLink } from 'lucide-react';

export default function ShutdownDialog() {
  return (
    <ConfirmBox
      title="Are you sure you want to shut down?"
      description="You&#39;re about to be redirected to my GitHub profile! 🚀 Come explore my work, projects, and
                  passion! 💻✨"
      icon={ShutdownImg.src}
      iconAlt={ShutdownImg.alt}
      action={
        <LinkButtonAction variant={'default'} href={GITHUB_URL}>
          <ExternalLink /> Continue
        </LinkButtonAction>
      }
      cancel={<CancelAction variant={'outline'}>Cancel</CancelAction>}
    />
  );
}
