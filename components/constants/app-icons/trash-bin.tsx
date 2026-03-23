import { TProcessButton } from '@/types/process-button';
import TrashBinIcon from '@/public/images/icon/trash-bin.png';
import TrashBin from '../../Programs/TrashBin';

export const TRASH_BIN: TProcessButton = {
  type: 'window',
  id: 'trashbin',
  title: 'Trash Bin',
  icon: TrashBinIcon,
  x: 350,
  y: 215,
  width: 665,
  height: 450,
  window: TrashBin,
};
