import { TFolderContent } from '@/types/folder-view';
import { TProcessButton } from '@/types/process-button';
import {
  InstagramImg,
  InstagramPreviewImg,
  FacebookImg,
  FacebookPreviewImg,
  LinkedInImg,
  LinkedInPreviewImg,
  GitHubImg,
  GitHubPreviewImg,
  XImg,
  XPreviewImg,
} from '@/lib/media';
import FolderContent from '../../UI/folder-view/folder-content';
import FolderIcon from '../../UI/folder-view/folder-icon';
import {
  FACEBOOK_URL,
  FACEBOOK_USERNAME,
  GITHUB_URL,
  GITHUB_USERNAME,
  INSTAGRAM_URL,
  INSTAGRAM_USERNAME,
  LINKEDIN_URL,
  LINKEDIN_USERNAME,
  XTwitter_URL,
  XTwitter_USERNAME,
} from '@/lib/constants';

type SocialLinksProps = TFolderContent;

const FILES: TProcessButton[] = [
  {
    type: 'link',
    id: 'linkedin',
    title: LinkedInImg.alt,
    icon: LinkedInImg.src,
    viewer: LinkedInPreviewImg.src,
    linkTitle: `@${LINKEDIN_USERNAME}`,
    link: LINKEDIN_URL,
  },
  {
    type: 'link',
    id: 'github',
    title: GitHubImg.alt,
    icon: GitHubImg.src,
    viewer: GitHubPreviewImg.src,
    linkTitle: `@${GITHUB_USERNAME}`,
    link: GITHUB_URL,
  },
  {
    type: 'link',
    id: 'instagram',
    title: InstagramImg.alt,
    icon: InstagramImg.src,
    viewer: InstagramPreviewImg.src,
    linkTitle: `@${INSTAGRAM_USERNAME}`,
    link: INSTAGRAM_URL,
  },
  {
    type: 'link',
    id: 'facebook',
    title: FacebookImg.alt,
    icon: FacebookImg.src,
    viewer: FacebookPreviewImg.src,
    linkTitle: `@${FACEBOOK_USERNAME}`,
    link: FACEBOOK_URL,
  },
  {
    type: 'link',
    id: 'x',
    title: XImg.alt,
    icon: XImg.src,
    viewer: XPreviewImg.src,
    linkTitle: `@${XTwitter_USERNAME}`,
    link: XTwitter_URL,
  },
];

export default function SocialLinks(props: SocialLinksProps) {
  return (
    <FolderContent {...props}>
      {FILES.map((options) => (
        <FolderIcon key={options.id} {...options} />
      ))}
    </FolderContent>
  );
}
