import { TProcessButton } from '@/types/process-button';
import { MailImg } from '@/lib/media';
import MailBox from '../../Programs/MailBox';

export const MAIL_BOX: TProcessButton = {
  type: 'window',
  id: 'mailbox',
  title: MailImg.alt,
  icon: MailImg.src,
  x: 440,
  y: 90,
  width: 665,
  height: 450,
  window: MailBox,
};
