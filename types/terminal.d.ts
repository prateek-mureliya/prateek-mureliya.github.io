import { BasicOnClick } from "./basic-props";

export type TCommandBase = {
  path: string[];
  cmd?: string;
  options?: string[];
  files?: string[];
  folders?: string[];
  showHelp: boolean;
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

type THelpType = {
  [key: string]: string;
};

export type THelp = {
  cmd: string;
  description: string;
  options: THelpType;
  itemType: "NOTHING" | "MULT_FILE_DIR" | "SINGLE_DIR";
  aliases?: THelpType;
};

export type TCmdError = BasicOnClick & { cmd: string };
