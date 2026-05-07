import VsCode from '@/components/Programs/VSCode';
import { VsCodeImg } from '@/lib/media';
import { TProcessButton } from '@/types/process-button';

export const VS_CODE: TProcessButton = {
  type: 'window',
  id: 'vscode',
  title: VsCodeImg.alt,
  icon: VsCodeImg.src,
  iconX: 1,
  iconY: 3,
  x: 175,
  y: 55,
  width: 980,
  height: 628,
  window: VsCode,
};
