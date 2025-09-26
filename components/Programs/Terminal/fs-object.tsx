import { joinPath } from "@/lib/utils";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaRegUser,
  FaLink,
  FaImage,
} from "react-icons/fa6";
import { ImFilePdf } from "react-icons/im";
import {
  AUTHOR_USER,
  FACEBOOK_URL,
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  OLD_SITE_URL,
  XTwitter_URL,
} from "@/lib/constants";
import { TFile, TFileSystemData, TFolder } from "@/types/terminal";
import { RESUME_PDF } from "../../constants/app-icons/resume-pdf";
import { RESUME2021_PDF } from "../../constants/app-icons/resume-2021-pdf";
import { RESUME2016_PDF } from "../../constants/app-icons/resume-2016-pdf";
import { ABOUT_ME } from "../../constants/app-icons/about-me";

const $bin: TFolder = {
  type: "folder",
  owner: "root",
  group: "root",
  createdAt: "Jul 3, 1:58 PM GMT+5:30",
  name: "bin",
  isProtacted: true,
  dir: [],
};
const $etc: TFolder = {
  type: "folder",
  owner: "root",
  group: "root",
  createdAt: "Jul 3, 1:58 PM GMT+5:30",
  name: "etc",
  isProtacted: true,
  dir: [],
};
const $mnt: TFolder = {
  type: "folder",
  owner: "root",
  group: "root",
  createdAt: "Jul 3, 1:58 PM GMT+5:30",
  name: "mnt",
  isProtacted: true,
  dir: [],
};
const $tmp: TFolder = {
  type: "folder",
  owner: "root",
  group: "root",
  createdAt: "Jul 3, 1:58 PM GMT+5:30",
  name: "tmp",
  isProtacted: true,
  dir: [],
};
const $usr: TFolder = {
  type: "folder",
  owner: "root",
  group: "root",
  createdAt: "Jul 3, 1:58 PM GMT+5:30",
  name: "usr",
  isProtacted: true,
  dir: [],
};

const $about_me_run: TFile = {
  type: "file",
  owner: "mureliya",
  group: "dev",
  createdAt: "Aug 14, 11:27 AM GMT+5:30",
  name: "about-me.run",
  icon: FaRegUser,
  fileType: "process",
  process: ABOUT_ME,
};
const $resume_pdf: TFile = {
  type: "file",
  owner: "mureliya",
  group: "dev",
  createdAt: "Aug 20, 6:26 PM GMT+5:30",
  name: "resume.pdf",
  icon: ImFilePdf,
  fileType: "process",
  process: RESUME_PDF,
};

const $facebook_connect: TFile = {
  type: "file",
  owner: "mureliya",
  group: "dev",
  createdAt: "Aug 31, 4:58 AM GMT+5:30",
  name: "facebook.connect",
  icon: FaFacebook,
  fileType: "link",
  href: FACEBOOK_URL,
};
const $github_connect: TFile = {
  type: "file",
  owner: "mureliya",
  group: "dev",
  createdAt: "Aug 31, 4:58 AM GMT+5:30",
  name: "github.connect",
  icon: FaGithub,
  fileType: "link",
  href: GITHUB_URL,
};
const $instagram_connect: TFile = {
  type: "file",
  owner: "mureliya",
  group: "dev",
  createdAt: "Aug 31, 4:58 AM GMT+5:30",
  name: "instagram.connect",
  icon: FaInstagram,
  fileType: "link",
  href: INSTAGRAM_URL,
};
const $linkedin_connect: TFile = {
  type: "file",
  owner: "mureliya",
  group: "dev",
  createdAt: "Aug 31, 4:58 AM GMT+5:30",
  name: "linkedin.connect",
  icon: FaLinkedin,
  fileType: "link",
  href: LINKEDIN_URL,
};
const $twitter_connect: TFile = {
  type: "file",
  owner: "mureliya",
  group: "dev",
  createdAt: "Aug 31, 4:58 AM GMT+5:30",
  name: "twitter.connect",
  icon: FaXTwitter,
  fileType: "link",
  href: XTwitter_URL,
};
const $social: TFolder = {
  type: "folder",
  owner: "mureliya",
  group: "dev",
  createdAt: "Aug 31, 4:58 AM GMT+5:30",
  name: "social",
  dir: [
    $facebook_connect,
    $github_connect,
    $instagram_connect,
    $linkedin_connect,
    $twitter_connect,
  ],
};

const $decoration_only_png: TFile = {
  type: "file",
  owner: "mureliya",
  group: "dev",
  createdAt: "Aug 31, 7:14 PM GMT+5:30",
  name: "decoration-only.png",
  icon: FaImage,
  fileType: "none",
  isProtacted: true,
};
const $old_portfolio_connect: TFile = {
  type: "file",
  owner: "mureliya",
  group: "dev",
  createdAt: "Aug 31, 7:14 PM GMT+5:30",
  name: "old-portfolio.connect",
  icon: FaLink,
  fileType: "link",
  href: OLD_SITE_URL,
};
const $resume_2021_pdf: TFile = {
  type: "file",
  owner: "mureliya",
  group: "dev",
  createdAt: "Aug 31, 7:14 PM GMT+5:30",
  name: "Prateek_Kumar_SoftwareEngineer_2021.pdf",
  icon: ImFilePdf,
  fileType: "process",
  process: RESUME2021_PDF,
};
const $resume_2016_pdf: TFile = {
  type: "file",
  owner: "mureliya",
  group: "dev",
  createdAt: "Aug 31, 7:14 PM GMT+5:30",
  name: "Prateek_Kumar_Fresher_2016.pdf",
  icon: ImFilePdf,
  fileType: "process",
  process: RESUME2016_PDF,
};
const $snap_bin: TFolder = {
  type: "folder",
  owner: "mureliya",
  group: "dev",
  createdAt: "Aug 31, 7:14 PM GMT+5:30",
  name: "snap-bin",
  dir: [
    $decoration_only_png,
    $resume_2021_pdf,
    $old_portfolio_connect,
    $resume_2016_pdf,
  ],
};

const $portfolio: TFolder = {
  type: "folder",
  owner: "mureliya",
  group: "dev",
  createdAt: "Jul 3, 1:58 PM GMT+5:30",
  name: "portfolio",
  dir: [$about_me_run, $resume_pdf, $social, $snap_bin],
};
const $user: TFolder = {
  type: "folder",
  owner: "root",
  group: "root",
  createdAt: "Jul 3, 1:58 PM GMT+5:30",
  name: AUTHOR_USER,
  dir: [$portfolio],
};
const $home: TFolder = {
  type: "folder",
  owner: "root",
  group: "root",
  createdAt: "Jul 3, 1:58 PM GMT+5:30",
  name: "home",
  dir: [$user],
};

const $root: TFolder = {
  type: "folder",
  owner: "root",
  group: "root",
  createdAt: "Jul 3, 1:58 PM GMT+5:30",
  name: "root",
  dir: [$bin, $etc, $home, $mnt, $tmp, $usr],
};

type TFileSystem = {
  [key: string]: TFileSystemData;
};
const fsObject: TFileSystem = {
  "/": $root,
  "/bin": $bin,
  "/etc": $etc,
  "/home": $home,
  "/home/#USER#": $user,
  "/home/#USER#/portfolio": $portfolio,
  "/home/#USER#/portfolio/about-me.run": $about_me_run,
  "/home/#USER#/portfolio/resume.pdf": $resume_pdf,
  "/home/#USER#/portfolio/social": $social,
  "/home/#USER#/portfolio/social/facebook.connect": $facebook_connect,
  "/home/#USER#/portfolio/social/github.connect": $github_connect,
  "/home/#USER#/portfolio/social/instagram.connect": $instagram_connect,
  "/home/#USER#/portfolio/social/linkedin.connect": $linkedin_connect,
  "/home/#USER#/portfolio/social/twitter.connect": $twitter_connect,
  "/home/#USER#/portfolio/snap-bin": $snap_bin,
  "/home/#USER#/portfolio/snap-bin/decoration-only.png": $decoration_only_png,
  "/home/#USER#/portfolio/snap-bin/Prateek_Kumar_SoftwareEngineer_2021.pdf":
    $resume_2021_pdf,
  "/home/#USER#/portfolio/snap-bin/old-portfolio.connect":
    $old_portfolio_connect,
  "/home/#USER#/portfolio/snap-bin/Prateek_Kumar_Fresher_2016.pdf":
    $resume_2016_pdf,
  "/mnt": $mnt,
  "/tmp": $tmp,
  "/usr": $usr,
};

export const isFolder = (obj: TFileSystemData): obj is TFolder => {
  return obj.type === "folder";
};

export const isFile = (obj: TFileSystemData): obj is TFile => {
  return obj.type === "file";
};

const mergePath = (path: string[], reletivePath: string) => {
  const pathCopy = path.slice();
  const parts = reletivePath.split("/");
  parts.forEach((part) => {
    if (part === "..") pathCopy.pop();
    else if (part !== ".") pathCopy.push(part);
  });

  return joinPath(pathCopy).replace(AUTHOR_USER, "#USER#");
};

export const getAbsolutePath = (path: string[], reletivePath: string = "") => {
  let absolutePath;
  if (reletivePath.startsWith("/")) {
    absolutePath = mergePath([], reletivePath.substring(1));
  } else if (reletivePath.startsWith("~")) {
    const userPath = ["home", AUTHOR_USER];
    absolutePath =
      reletivePath === "~"
        ? mergePath(userPath, "")
        : reletivePath.startsWith("~/")
        ? mergePath(userPath, reletivePath.substring(2))
        : mergePath(userPath, reletivePath);
  } else {
    absolutePath = mergePath(path, reletivePath);
  }
  return absolutePath !== "/" && absolutePath.endsWith("/")
    ? absolutePath.substring(0, absolutePath.length - 1)
    : absolutePath;
};

export const isValidPath = (absolutePath: string): TFileSystemData | false => {
  return absolutePath in fsObject && fsObject[absolutePath];
};

const getFile = (absolutePath: string): TFile => {
  const next = fsObject[absolutePath];
  if (!isFile(next)) {
    throw new Error(`Invalid path: "${absolutePath}" is not a file`);
  }
  return next;
};

export const getDirectory = (absolutePath: string): TFolder => {
  const next = fsObject[absolutePath];
  if (!isFolder(next)) {
    throw new Error(`Invalid path: "${absolutePath}" is not a folder`);
  }
  return next;
};

export const getFiles = (path: string[], reletivePaths: string[]): TFile[] => {
  return reletivePaths.map((reletivePath) =>
    getFile(getAbsolutePath(path, reletivePath))
  );
};

export const getDirectories = (
  path: string[],
  reletivePaths: string[]
): TFolder[] => {
  return reletivePaths.map((reletivePath) =>
    getDirectory(getAbsolutePath(path, reletivePath))
  );
};

export const getCurrentDir = (path: string[]): TFolder => {
  return getDirectory(getAbsolutePath(path));
};
