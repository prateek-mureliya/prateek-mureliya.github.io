import { TProcessButton } from '@/types/process-button';
import { TrashBinImg } from '@/lib/media';
import TrashBin from '../../Programs/TrashBin';

export const TRASH_BIN: TProcessButton = {
  type: 'window',
  id: 'trashbin',
  title: TrashBinImg.alt,
  icon: TrashBinImg.src,
  x: 350,
  y: 215,
  width: 775,
  height: 450,
  window: TrashBin,
};
