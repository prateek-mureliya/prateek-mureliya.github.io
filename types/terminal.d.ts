import { IconType } from "react-icons/lib";
import { BasicOnClick } from "./basic-props";

// file system
export type TFileSystemMeta = {
  name: string;
  owner: string;
  group: string;
  createdAt: string;
  isProtacted?: boolean;
};

type TFileTypeProcess = { fileType: "process"; process: TProcessButton };
type TFileTypeLink = { fileType: "link"; href: string };
type TFileTypeNone = { fileType: "none" };
type TFileType = TFileTypeProcess | TFileTypeLink | TFileTypeNone;
export type TFile = TFileSystemMeta &
  TFileType & {
    type: "file";
    icon?: IconType;
  };

export type TFolder = TFileSystemMeta & {
  type: "folder";
  dir: TFileSystemData[];
};

export type TFileSystemData = TFile | TFolder;

// command
export type TCommandBase = {
  path: string[];
  cmd?: string;
  options?: string[];
  files?: string[];
  folders?: string[];
  showHelp: boolean;
  isLastCmd?: boolean;
  onFormSubmit?: (cmd) => void;
};

export type TFromSubmitArgs = {
  actualCommand: string;
};

export type TCommand = {
  currentBranch: string;
  time?: Date;
  actualCommand?: string;
  response?: React.MemoExoticComponent<
    (props: TCommandBase) => React.JSX.Element | undefined
  >;
  onSubmit?: (args: TFromSubmitArgs) => void;
} & TCommandBase;

// help
type THelpType = {
  [key: string]: string;
};

export type THelp = {
  cmd: string;
  description: string;
  options: THelpType;
  itemType: "NOTHING" | "MULT_FILE_DIR" | "SINGLE_DIR" | "SINGLE_FILE";
  aliases?: THelpType;
};

// error
export type TCmdError = BasicOnClick & { cmd: string };

// suggestion
export type TSuggestionAction = BasicOnClick & {
  command: string;
};
