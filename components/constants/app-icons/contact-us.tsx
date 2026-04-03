import { TProcessButton } from '@/types/process-button';
import { ContactUsImg } from '@/lib/media';
import ContactUs from '../../Programs/ContactUs';

export const CONTACT_US: TProcessButton = {
  type: 'window',
  id: 'contactus',
  title: ContactUsImg.alt,
  icon: ContactUsImg.src,
  x: 390,
  y: 118,
  width: 665,
  height: 450,
  window: ContactUs,
};
