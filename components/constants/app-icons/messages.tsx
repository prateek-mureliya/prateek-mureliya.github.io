import { TProcessButton } from '@/types/process-button';
import { MessagesImg } from '@/lib/media';
import Messages from '../../Programs/Messages';

export const MESSAGES: TProcessButton = {
  type: 'window',
  id: 'messages',
  title: MessagesImg.alt,
  icon: MessagesImg.src,
  x: 490,
  y: 60,
  width: 620,
  height: 600,
  window: Messages,
};
