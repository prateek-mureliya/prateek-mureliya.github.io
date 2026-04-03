import { TProcessButton } from '@/types/process-button';
import { SecretImg } from '@/lib/media';
import RevealSecrets from '../../Programs/RevealSecrets';

export const SECRET: TProcessButton = {
  type: 'dialog',
  id: 'secret',
  title: SecretImg.alt,
  icon: SecretImg.src,
  popup: RevealSecrets,
};
