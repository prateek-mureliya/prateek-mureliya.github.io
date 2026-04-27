import { TProcessButton } from '@/types/process-button';
import { ContactUsImg } from '@/lib/media';
import ContactUs from '../../Programs/ContactUs';

export const CONTACT_US: TProcessButton = {
  type: 'dialog',
  id: 'contactus',
  title: ContactUsImg.alt,
  icon: ContactUsImg.src,
  popup: ContactUs,
};
