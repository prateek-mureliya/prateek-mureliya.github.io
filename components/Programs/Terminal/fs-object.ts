import { AUTHOR_USER } from "@/lib/constants";
import { joinPath } from "@/lib/utils";

type TMeta = {
  name: string;
  isProtacted?: boolean;
};

export type TFile = TMeta & {
  type: "file";
};

export type TFolder = TMeta & {
  type: "folder";
  dir: TFileSystemData[];
};

export type TFileSystemData = TFile | TFolder;

type TFileSystem = {
  [key: string]: TFileSystemData;
};

const $bin: TFolder = {
  type: "folder",
  name: "bin",
  isProtacted: true,
  dir: [],
};
const $etc: TFolder = {
  type: "folder",
  name: "etc",
  isProtacted: true,
  dir: [],
};
const $mnt: TFolder = {
  type: "folder",
  name: "mnt",
  isProtacted: true,
  dir: [],
};
const $tmp: TFolder = {
  type: "folder",
  name: "tmp",
  isProtacted: true,
  dir: [],
};
const $usr: TFolder = {
  type: "folder",
  name: "usr",
  isProtacted: true,
  dir: [],
};

const $resume_pdf: TFile = {
  type: "file",
  name: "resume.pdf",
};
const $facebook_connect: TFile = {
  type: "file",
  name: "facebook.connect",
};
const $github_connect: TFile = {
  type: "file",
  name: "github.connect",
};
const $instagram_connect: TFile = {
  type: "file",
  name: "instagram.connect",
};
const $linkedin_connect: TFile = {
  type: "file",
  name: "linkedin.connect",
};
const $twitter_connect: TFile = {
  type: "file",
  name: "twitter.connect",
};
const $social: TFolder = {
  type: "folder",
  name: "social",
  dir: [
    $facebook_connect,
    $github_connect,
    $instagram_connect,
    $linkedin_connect,
    $twitter_connect,
  ],
};
const $portfolio: TFolder = {
  type: "folder",
  name: "portfolio",
  dir: [$resume_pdf, $social],
};
const $user: TFolder = {
  type: "folder",
  name: AUTHOR_USER,
  dir: [$portfolio],
};
const $home: TFolder = {
  type: "folder",
  name: "home",
  dir: [$user],
};

const $root: TFolder = {
  type: "folder",
  name: "root",
  dir: [$bin, $etc, $home, $mnt, $tmp, $usr],
};

const fsObject: TFileSystem = {
  "/": $root,
  "/bin": $bin,
  "/etc": $etc,
  "/home": $home,
  "/home/#USER#": $user,
  "/home/#USER#/portfolio": $portfolio,
  "/home/#USER#/portfolio/resume.pdf": $resume_pdf,
  "/home/#USER#/portfolio/social": $social,
  "/home/#USER#/portfolio/social/facebook.connect": $facebook_connect,
  "/home/#USER#/portfolio/social/github.connect": $github_connect,
  "/home/#USER#/portfolio/social/instagram.connect": $instagram_connect,
  "/home/#USER#/portfolio/social/linkedin.connect": $linkedin_connect,
  "/home/#USER#/portfolio/social/twitter.connect": $twitter_connect,
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
