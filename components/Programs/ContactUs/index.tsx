import { DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/UI/dialog/dialog';
import { TypingAnimation } from '@/components/UI/typing-animation';
import {
  AUTHOR_EMAIL,
  AUTHOR_NAME,
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
import { DialogDescription } from '@radix-ui/react-dialog';
import Link from 'next/link';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { MdMail } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { TIconType } from '@/types/icon-type';
import { Badge } from '@/components/UI/badge';
import Image from 'next/image';
import {
  FacebookPicImg,
  FacebookQRImg,
  GitHubPicImg,
  GitHubQRImg,
  InstagramPicImg,
  InstagramQRImg,
  LinkedInPicImg,
  LinkedInQRImg,
  XPicImg,
  XQRImg,
} from '@/lib/media';
import { cn, toWindowApp } from '@/lib/utils';
import { ImageFile } from '@/types/basic-props';
import { useProcessContext } from '@/contexts/process-manager';
import { MAIL_BOX } from '@/components/constants/app-icons/mailbox';

enum SocialType {
  LINKEDIN = 'LINKEDIN',
  GITHUB = 'GITHUB',
  INSTAGRAM = 'INSTAGRAM',
  FACEBOOK = 'FACEBOOK',
  XTWITTER = 'XTWITTER',
  MAIL = 'MAIL',
}

const socials: {
  [key in SocialType]: {
    icon: TIconType;
    profile: ImageFile;
    username: string;
    subTitle: string;
    url: string;
    bg: string;
    profileBorder: string;
    qrCode: ImageFile;
  };
} = {
  LINKEDIN: {
    icon: FaLinkedinIn,
    profile: LinkedInPicImg,
    username: LINKEDIN_USERNAME,
    subTitle: 'Building ideas with code 🚀',
    url: LINKEDIN_URL,
    bg: 'bg-gradient-to-r from-blue-600/40 to-transparent',
    profileBorder: 'border-blue-400',
    qrCode: LinkedInQRImg,
  },
  GITHUB: {
    icon: FaGithub,
    profile: GitHubPicImg,
    username: GITHUB_USERNAME,
    subTitle: 'Developer 💻 | Problem Solver ⚡',
    url: GITHUB_URL,
    bg: 'bg-gradient-to-r from-white/30 to-transparent',
    profileBorder: 'border-zinc-200',
    qrCode: GitHubQRImg,
  },
  INSTAGRAM: {
    icon: FaInstagram,
    profile: InstagramPicImg,
    username: INSTAGRAM_USERNAME,
    subTitle: 'Developer by passion 💻',
    url: INSTAGRAM_URL,
    bg: 'bg-[linear-gradient(65deg,_#fa7e1e52_0%,_#d22a7585_29%,_#962fbf4d_70%,_#962fbf14_93%,_transparent_100%)]',
    profileBorder: 'border-pink-600/60',
    qrCode: InstagramQRImg,
  },
  FACEBOOK: {
    icon: FaFacebook,
    profile: FacebookPicImg,
    username: FACEBOOK_USERNAME,
    subTitle: 'Tech • Code • Innovation',
    url: FACEBOOK_URL,
    bg: 'bg-gradient-to-r from-blue-600/40 to-transparent',
    profileBorder: 'border-blue-400',
    qrCode: FacebookQRImg,
  },
  XTWITTER: {
    icon: FaXTwitter,
    profile: XPicImg,
    username: XTwitter_USERNAME,
    subTitle: 'Tech Explorer 🚀|Lifelong Learner 📚',
    url: XTwitter_URL,
    bg: 'bg-gradient-to-r from-blue-600/40 via-75% via-transparent to-transparent',
    profileBorder: 'border-blue-400',
    qrCode: XQRImg,
  },
  MAIL: {
    icon: MdMail,
    profile: LinkedInPicImg,
    username: '',
    subTitle: '',
    url: '',
    bg: '',
    profileBorder: '',
    qrCode: LinkedInQRImg,
  },
};

const buildTogether = ['Product 📦', 'Service 🛠️', 'Experience ✨'];

function CardIcon({ socialType, onClick }: { socialType: SocialType; onClick: (socialType: SocialType) => void }) {
  const { icon: Icon } = socials[socialType];
  return (
    <Icon
      role="button"
      title={socialType}
      className="size-5 opacity-60 hover:opacity-100 cursor-pointer"
      onClick={() => onClick(socialType)}
    />
  );
}

function BackSocialCard({ socialType }: { socialType: SocialType }) {
  const { icon: Icon, profile, username, subTitle, url, bg: bgGradient, profileBorder, qrCode } = socials[socialType];

  return (
    <div className="flex flex-row grow-1 items-center">
      <div className={cn('grow-1 h-full relative pl-6', bgGradient)}>
        <Icon className="absolute top-0 right-10 size-40 opacity-5 rotate-10 z-0" />
        <Image
          src={profile.src}
          alt={profile.alt}
          placeholder="blur"
          className={cn('mt-1 relative z-1 size-18 rounded-full border-3', profileBorder)}
        />
        <Link href={url} target="_blank" className="block mt-1 relative z-1 text-sm">
          @{username}
        </Link>
        <p className="relative z-1 text-xs text-zinc-300 capitalize">{subTitle}</p>
        <div className="mt-2 relative z-1 w-2/3 border-t border-zinc-400"></div>
        <Link
          href={url}
          target="_blank"
          className="block mt-4 w-2/3 relative z-1 text-center text-sm rounded-md px-4 py-1 font-semibold text-white transition bg-blue-500 hover:bg-blue-600"
        >
          Follow
        </Link>
      </div>
      <div className="border-l h-32 border-zinc-400"></div>
      <div className="px-3 h-full flex flex-col gap-2 justify-center items-center pr-6">
        <Image src={qrCode.src} alt={qrCode.alt} placeholder="blur" className="size-24 p-2 bg-white" />
        <p className="text-xs text-zinc-400 capitalize">Scan to Connect</p>
      </div>
    </div>
  );
}

export default function ContactUs() {
  const { handleOpen } = useProcessContext();
  const [flipped, setFlipped] = useState(false);
  const [backSocialType, setBackSocialType] = useState<SocialType>(SocialType.LINKEDIN);

  const handleSocialClick = (socialType: SocialType) => {
    if (socialType == SocialType.MAIL) {
      handleOpen(toWindowApp(MAIL_BOX));
      return;
    }
    setBackSocialType(socialType);
    setFlipped(true);
  };

  const flipBack = () => {
    setFlipped(false);
  };
  return (
    <DialogContent
      hideHeader
      onCloseAutoFocus={(e) => e.preventDefault()}
      className="flex items-center justify-center py-0 w-full sm:w-lg h-88 sm:h-92 max-w-full bg-transparent shadow-none border-none outline-0"
      windowClassName="relative h-full w-full px-2 sm:px-6 py-10 [perspective:1200px]"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className="relative h-full w-full"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* FRONT */}
        <div
          className="
                  absolute inset-0 rounded-3xl
                  bg-gradient-to-br from-zinc-900 to-zinc-700
                  p-6 text-white shadow-2xl
                  [backface-visibility:hidden]
                "
        >
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <DialogHeader className="items-start gap-0">
                <DialogTitle className="text-sm opacity-70">Let&#39;s build together</DialogTitle>
                <DialogDescription className="mt-1 text-xl font-semibold">
                  <TypingAnimation className="leading-0" words={buildTogether} loop />
                </DialogDescription>
              </DialogHeader>

              <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                  <CardIcon socialType={SocialType.LINKEDIN} onClick={handleSocialClick} />
                  <CardIcon socialType={SocialType.GITHUB} onClick={handleSocialClick} />
                  <DialogClose asChild>
                    <CardIcon socialType={SocialType.MAIL} onClick={handleSocialClick} />
                  </DialogClose>
                </div>
                <div className="flex flex-col gap-2">
                  <CardIcon socialType={SocialType.INSTAGRAM} onClick={handleSocialClick} />
                  <CardIcon socialType={SocialType.FACEBOOK} onClick={handleSocialClick} />
                  <CardIcon socialType={SocialType.XTWITTER} onClick={handleSocialClick} />
                </div>
              </div>
            </div>

            <div>
              <Link href={`mailto:${AUTHOR_EMAIL}`} className="text-lg uppercase">
                {AUTHOR_EMAIL}
              </Link>

              <div className="mt-5 flex justify-between text-sm">
                <div>
                  <p className="opacity-60">CARD HOLDER</p>
                  <p>{AUTHOR_NAME}</p>
                </div>

                <div>
                  <p className="opacity-60 text-right">STATUS</p>
                  <Badge className="bg-green-950 text-green-300 -mr-1">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                    </span>
                    <span className="ml-1 capitalize">Open to work</span>
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="
                  absolute inset-0 rounded-3xl
                  bg-gradient-to-br from-neutral-800 to-neutral-950
                  p-0 text-white shadow-2xl
                  [transform:rotateY(180deg)]
                  [backface-visibility:hidden]
                  flex flex-col justify-between overflow-hidden
                "
        >
          <div role="button" className="text-xs text-zinc-400 cursor-pointer text-right pt-2 pr-6" onClick={flipBack}>
            Tap here to flip back
          </div>
          <div className="h-12 bg-black mt-2" />
          <BackSocialCard socialType={backSocialType} />
        </div>
      </motion.div>
    </DialogContent>
  );
}
