import { ImageFile, PDFType } from '@/types/basic-props';

// author
import ProfileImage from '@/public/images/optimized/profile.webp';
const ProfileImg: ImageFile = { src: ProfileImage, alt: 'Profile' };
const ProfileBgRemoveImg = '/images/optimized/profile-bg-remove.webp';

// icon
import AboutMeIcon from '@/public/images/optimized/icon/about-me.webp';
import ContactUsIcon from '@/public/images/optimized/icon/contact-us.webp';
import AdobeIcon from '@/public/images/optimized/icon/adobe.webp';
import TerminalIcon from '@/public/images/optimized/icon/terminal.webp';
import TrashBinIcon from '@/public/images/optimized/icon/trash-bin.webp';
import ShutdownIcon from '@/public/images/optimized/icon/shutdown.webp';
import SiteLinkIcon from '@/public/images/optimized/icon/link.webp';
import VsCodeIcon from '@/public/images/optimized/icon/vscode.webp';
import MailIcon from '@/public/images/optimized/icon/mail.webp';

const AboutMeImg: ImageFile = { src: AboutMeIcon, alt: 'About Me' };
const ContactUsImg: ImageFile = { src: ContactUsIcon, alt: 'Contact Us' };
const AdobeImg: ImageFile = { src: AdobeIcon, alt: 'Adobe' };
const TerminalImg: ImageFile = { src: TerminalIcon, alt: 'Terminal' };
const TrashBinImg: ImageFile = { src: TrashBinIcon, alt: 'Trash Bin' };
const ShutdownImg: ImageFile = { src: ShutdownIcon, alt: 'Shutdown OS' };
const SiteLinkImg: ImageFile = { src: SiteLinkIcon, alt: 'Site Link' };
const VsCodeImg: ImageFile = { src: VsCodeIcon, alt: 'VS Code' };
const MailImg: ImageFile = { src: MailIcon, alt: 'Mail' };

// logic user
import UserRecruiter from '@/public/images/optimized/user-recruiter.webp';
import UserDeveloper from '@/public/images/optimized/user-developer.webp';
import UserStalker from '@/public/images/optimized/user-stalker.webp';

const UserRecruiterImg: ImageFile = { src: UserRecruiter, alt: 'Recruiter' };
const UserDeveloperImg: ImageFile = { src: UserDeveloper, alt: 'Developer' };
const UserStalkerImg: ImageFile = { src: UserStalker, alt: 'Stalker' };

// social
import InstagramIcon from '@/public/images/original/social/instagram/icon.png';
import InstagramPreview from '@/public/images/original/social/instagram/banner.jpg';
import FacebookIcon from '@/public/images/original/social/facebook/icon.png';
import FacebookPreview from '@/public/images/original/social/facebook/banner.png';
import LinkedInIcon from '@/public/images/original/social/linkedin/icon.png';
import LinkedInPreview from '@/public/images/original/social/linkedin/banner.jpg';
import GitHubIcon from '@/public/images/original/social/github/icon.png';
import GitHubPreview from '@/public/images/original/social/github/banner.jpg';
import XIcon from '@/public/images/original/social/x/icon.png';
import XPreview from '@/public/images/original/social/x/banner.png';

const InstagramImg: ImageFile = { src: InstagramIcon, alt: 'Instagram' };
const InstagramPreviewImg: ImageFile = { src: InstagramPreview, alt: 'Instagram' };
const FacebookImg: ImageFile = { src: FacebookIcon, alt: 'Facebook' };
const FacebookPreviewImg: ImageFile = { src: FacebookPreview, alt: 'Facebook' };
const LinkedInImg: ImageFile = { src: LinkedInIcon, alt: 'LinkedIn' };
const LinkedInPreviewImg: ImageFile = { src: LinkedInPreview, alt: 'LinkedIn' };
const GitHubImg: ImageFile = { src: GitHubIcon, alt: 'GitHub' };
const GitHubPreviewImg: ImageFile = { src: GitHubPreview, alt: 'GitHub' };
const XImg: ImageFile = { src: XIcon, alt: 'Twitter / X' };
const XPreviewImg: ImageFile = { src: XPreview, alt: 'Twitter / X' };

// preview
import Meme1 from '@/public/images/optimized/meme-1.webp';
import OldPortfolioPreview from '@/public/images/optimized/old-portfolio.webp';
import ResumePreview from '@/public/images/optimized/resume-preview.webp';
import ResumePreview2016 from '@/public/images/optimized/resume-preview_2016.webp';
import ResumePreview2021 from '@/public/images/optimized/resume-preview_2021.webp';

const Meme1Img: ImageFile = { src: Meme1, alt: 'Decoration Only' };
const OldPortfolioPreviewImg: ImageFile = { src: OldPortfolioPreview, alt: 'Old Portfolio' };
const ResumePreviewImg: ImageFile = { src: ResumePreview, alt: 'Resume Preview' };
const ResumePreview2016Img: ImageFile = { src: ResumePreview2016, alt: '2016 Resume Preview' };
const ResumePreview2021Img: ImageFile = { src: ResumePreview2021, alt: '2021 Resume Preview' };

// pdf
const ResumePDF: PDFType = { file: '/media/Prateek_Kumar_SeniorSoftwareEngineer_Resume.pdf', name: 'Resume.pdf' };
const Resume2016PDF: PDFType = {
  file: '/media/Prateek_Kumar_Fresher_2016.pdf',
  name: 'Prateek_Kumar_Fresher_2016.pdf',
};
const Resume2021PDF: PDFType = {
  file: '/media/Prateek_Kumar_SoftwareEngineer_2021.pdf',
  name: 'Prateek_Kumar_SoftwareEngineer_2021.pdf',
};

// audio
const AUTHOR_NAME_AUDIO = '/media/Prateek_Kumar_Voice.mp3';

export {
  ProfileImg,
  ProfileBgRemoveImg,
  AboutMeImg,
  ContactUsImg,
  AdobeImg,
  TerminalImg,
  TrashBinImg,
  ShutdownImg,
  Meme1Img,
  SiteLinkImg,
  VsCodeImg,
  MailImg,
  UserRecruiterImg,
  UserDeveloperImg,
  UserStalkerImg,
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
  OldPortfolioPreviewImg,
  ResumePreviewImg,
  ResumePreview2016Img,
  ResumePreview2021Img,
  ResumePDF,
  Resume2016PDF,
  Resume2021PDF,
  AUTHOR_NAME_AUDIO,
};
