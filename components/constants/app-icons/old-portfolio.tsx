import { TProcessButton } from '@/types/process-button';
import { SiteLinkImg, OldPortfolioPreviewImg } from '@/lib/media';
import { OLD_SITE_URI, OLD_SITE_URL } from '@/lib/constants';

export const OLD_PORTFOLIO: TProcessButton = {
  type: 'link',
  id: 'old-portfolio',
  title: OldPortfolioPreviewImg.alt,
  icon: SiteLinkImg.src,
  viewer: OldPortfolioPreviewImg.src,
  linkTitle: OLD_SITE_URI,
  link: OLD_SITE_URL,
};
