import { ImageFile, PDFType } from '@/types/basic-props';

// author
import ProfileImage from '@/public/images/profile.png';
const ProfileImg: ImageFile = { src: ProfileImage, alt: 'Profile' };
const ProfileBgRemoveImg = '/images/profile-bg-remove.png';

// icon
import AboutMeIcon from '@/public/images/icon/about-me.png';
import ContactUsIcon from '@/public/images/icon/contact-us.png';
import AdobeIcon from '@/public/images/icon/adobe.png';
import TerminalIcon from '@/public/images/icon/terminal.png';
import TrashBinIcon from '@/public/images/icon/trash-bin.png';
import ShutdownIcon from '@/public/images/icon/shutdown.png';
import SiteLinkIcon from '@/public/images/icon/link.png';

const AboutMeImg: ImageFile = { src: AboutMeIcon, alt: 'About Me' };
const ContactUsImg: ImageFile = { src: ContactUsIcon, alt: 'Contact Us' };
const AdobeImg: ImageFile = { src: AdobeIcon, alt: 'Adobe' };
const TerminalImg: ImageFile = { src: TerminalIcon, alt: 'Terminal' };
const TrashBinImg: ImageFile = { src: TrashBinIcon, alt: 'Trash Bin' };
const ShutdownImg: ImageFile = { src: ShutdownIcon, alt: 'Shutdown OS' };
const SiteLinkImg: ImageFile = { src: SiteLinkIcon, alt: 'Site Link' };

// logic user
import UserRecruiter from '@/public/images/user-recruiter.png';
import UserDeveloper from '@/public/images/user-developer.png';
import UserStalker from '@/public/images/user-stalker.png';

const UserRecruiterImg: ImageFile = { src: UserRecruiter, alt: 'Recruiter' };
const UserDeveloperImg: ImageFile = { src: UserDeveloper, alt: 'Developer' };
const UserStalkerImg: ImageFile = { src: UserStalker, alt: 'Stalker' };

// social
import InstagramIcon from '@/public/images/social/instagram/icon.png';
import InstagramPreview from '@/public/images/social/instagram/banner.jpg';
import FacebookIcon from '@/public/images/social/facebook/icon.png';
import FacebookPreview from '@/public/images/social/facebook/banner.png';
import LinkedInIcon from '@/public/images/social/linkedin/icon.png';
import LinkedInPreview from '@/public/images/social/linkedin/banner.jpg';
import GitHubIcon from '@/public/images/social/github/icon.png';
import GitHubPreview from '@/public/images/social/github/banner.jpg';
import XIcon from '@/public/images/social/x/icon.png';
import XPreview from '@/public/images/social/x/banner.png';

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
import Meme1 from '@/public/images/meme-1.png';
import OldPortfolioPreview from '@/public/images/old-portfolio.png';
import ResumePreview from '@/public/images/resume-preview.png';
import ResumePreview2016 from '@/public/images/resume-preview_2016.png';
import ResumePreview2021 from '@/public/images/resume-preview_2021.png';

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
