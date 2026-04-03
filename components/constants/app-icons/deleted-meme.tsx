import { TProcessButton } from '@/types/process-button';
import { Meme1Img } from '@/lib/media';

export const DELETED_MEME: TProcessButton = {
  type: 'raw',
  id: 'meme1',
  title: Meme1Img.alt,
  icon: Meme1Img.src,
};
