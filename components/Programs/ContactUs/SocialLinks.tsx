import { TFolderContent } from "@/types/folder-view";
import { TProcessButton } from "@/types/process-button";
import InstagramIcon from "@/public/images/icon/social/instagram.png";
import InstagramPreview from "@/public/images/instagram-bg.jpg";
import FacebookIcon from "@/public/images/icon/social/facebook.png";
import FacebookPreview from "@/public/images/facebook-bg.png";
import LinkedInIcon from "@/public/images/icon/social/linkedin.png";
import LinkedInPreview from "@/public/images/linkedin-bg.jpg";
import GitHubIcon from "@/public/images/icon/social/github.png";
import GitHubPreview from "@/public/images/github-bg.jpg";
import XIcon from "@/public/images/icon/social/x.png";
import XPreview from "@/public/images/x-bg.png";
import FolderContent from "../../UI/folder-view/folder-content";
import FolderIcon from "../../UI/folder-view/folder-icon";
import {
  FACEBOOK_URL,
  FACEBOOK_USERNAME,
  GITHUB_URL,
  GITHUB_USERNAME,
  INSTAGRAM_URL,
  INSTAGRAM_USERNAME,
  LINKEDIN_URL,
  LINKEDIN_USERNAME,
  X_URL,
  X_USERNAME,
} from "@/lib/constants";

type SocialLinksProps = TFolderContent;

const FILES: TProcessButton[] = [
  {
    type: "link",
    id: "linkedin",
    title: "LinkedIn",
    icon: LinkedInIcon,
    viewer: LinkedInPreview,
    linkTitle: `@${LINKEDIN_USERNAME}`,
    link: LINKEDIN_URL,
  },
  {
    type: "link",
    id: "github",
    title: "GitHub",
    icon: GitHubIcon,
    viewer: GitHubPreview,
    linkTitle: `@${GITHUB_USERNAME}`,
    link: GITHUB_URL,
  },
  {
    type: "link",
    id: "instagram",
    title: "Instagram",
    icon: InstagramIcon,
    viewer: InstagramPreview,
    linkTitle: `@${INSTAGRAM_USERNAME}`,
    link: INSTAGRAM_URL,
  },
  {
    type: "link",
    id: "facebook",
    title: "Facebook",
    icon: FacebookIcon,
    viewer: FacebookPreview,
    linkTitle: `@${FACEBOOK_USERNAME}`,
    link: FACEBOOK_URL,
  },
  {
    type: "link",
    id: "x",
    title: "Twitter / X",
    icon: XIcon,
    viewer: XPreview,
    linkTitle: `@${X_USERNAME}`,
    link: X_URL,
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
