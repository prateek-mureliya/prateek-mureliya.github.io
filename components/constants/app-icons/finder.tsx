import { TProcessButton } from '@/types/process-button';
import { FinderImg } from '@/lib/media';
import Finder from '../../Programs/Finder';

export const FINDER: TProcessButton = {
  type: 'window',
  id: 'finder',
  title: FinderImg.alt,
  icon: FinderImg.src,
  x: 258,
  y: 62,
  width: 1070,
  height: 540,
  window: Finder,
};
