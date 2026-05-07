import { ImageFile, PDFType } from '@/types/basic-props';

// author
import ProfileImage from '@/public/images/optimized/profile.webp';
import Illustrations1 from '@/public/images/original/Illustrations_1.png';

const ProfileImg: ImageFile = { src: ProfileImage, alt: 'Profile' };
const Illustrations1Img: ImageFile = { src: Illustrations1, alt: 'Illustrations 1' };
const ProfileBgRemoveImg = '/images/optimized/profile-bg-remove.webp';

// icon
import FinderIcon from '@/public/images/optimized/icon/finder.webp';
import AboutPCIcon from '@/public/images/optimized/icon/about-pc.webp';
import ContactUsIcon from '@/public/images/optimized/icon/contact-us.webp';
import AdobeIcon from '@/public/images/optimized/icon/adobe.webp';
import TerminalIcon from '@/public/images/optimized/icon/terminal.webp';
import TrashBinIcon from '@/public/images/optimized/icon/trash-bin.webp';
import ShutdownIcon from '@/public/images/optimized/icon/shutdown.webp';
import SiteLinkIcon from '@/public/images/optimized/icon/link.webp';
import VsCodeIcon from '@/public/images/optimized/icon/vscode.webp';
import MailIcon from '@/public/images/optimized/icon/mail.webp';

const FinderImg: ImageFile = { src: FinderIcon, alt: 'Finder' };
const AboutPCImg: ImageFile = { src: AboutPCIcon, alt: 'About This PC' };
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
import InstagramQR from '@/public/images/original/social/instagram/qr.png';
import InstagramPic from '@/public/images/original/social/instagram/profile.png';
import FacebookQR from '@/public/images/original/social/facebook/qr.png';
import FacebookPic from '@/public/images/original/social/facebook/profile.png';
import LinkedInQR from '@/public/images/original/social/linkedin/qr.png';
import LinkedInPic from '@/public/images/original/social/linkedin/profile.png';
import GitHubQR from '@/public/images/original/social/github/qr.png';
import GitHubPic from '@/public/images/original/social/github/profile.png';
import XQR from '@/public/images/original/social/x/qr.png';
import XPic from '@/public/images/original/social/x/profile.png';

const InstagramQRImg: ImageFile = { src: InstagramQR, alt: 'Instagram QR' };
const InstagramPicImg: ImageFile = { src: InstagramPic, alt: 'Instagram Profile' };
const FacebookQRImg: ImageFile = { src: FacebookQR, alt: 'Facebook QR' };
const FacebookPicImg: ImageFile = { src: FacebookPic, alt: 'Facebook Profile' };
const LinkedInQRImg: ImageFile = { src: LinkedInQR, alt: 'LinkedIn QR' };
const LinkedInPicImg: ImageFile = { src: LinkedInPic, alt: 'LinkedIn Profile' };
const GitHubQRImg: ImageFile = { src: GitHubQR, alt: 'GitHub QR' };
const GitHubPicImg: ImageFile = { src: GitHubPic, alt: 'GitHub Profile' };
const XQRImg: ImageFile = { src: XQR, alt: 'XTwitter QR' };
const XPicImg: ImageFile = { src: XPic, alt: 'XTwitter Profile' };

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
  Illustrations1Img,
  ProfileBgRemoveImg,
  FinderImg,
  AboutPCImg,
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
  InstagramQRImg,
  InstagramPicImg,
  FacebookQRImg,
  FacebookPicImg,
  LinkedInQRImg,
  LinkedInPicImg,
  GitHubQRImg,
  GitHubPicImg,
  XQRImg,
  XPicImg,
  OldPortfolioPreviewImg,
  ResumePreviewImg,
  ResumePreview2016Img,
  ResumePreview2021Img,
  ResumePDF,
  Resume2016PDF,
  Resume2021PDF,
  AUTHOR_NAME_AUDIO,
};
