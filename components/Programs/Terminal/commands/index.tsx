import { JSX } from "react";
import { TCommandBase } from "@/types/terminal";
import CmdHelp from "./cmd-help";
import pwd, { help as pwdHelp } from "./pwd";
import ls, { help as lsHelp } from "./ls";
import clear, { help as clearHelp } from "./clear";
import cd, { help as cdHelp } from "./cd";
import help, { help as helpHelp } from "./help";
import welcome, { help as welcomeHelp } from "./welcome";
import cat, { help as catHelp } from "./cat";
import {
  FileNotAllow,
  FolderNotAllow,
  InvalidOptions,
  InvalidPath,
  NoArgs,
  NotFound,
  PermissionDenied,
  SingleFileOnly,
  SingleFolderOnly,
} from "./errors";
import { getAbsolutePath, getDirectory, isValidPath } from "../fs-object";
import { isNotEmptyArray } from "@/lib/utils";

const COMMANDS = { pwd, ls, clear, cd, help, welcome, cat };
const HELP = {
  pwd: pwdHelp,
  ls: lsHelp,
  clear: clearHelp,
  cd: cdHelp,
  welcome: welcomeHelp,
  help: helpHelp,
  cat: catHelp,
};

type TCommands = keyof typeof COMMANDS;

const isCommands = (value: string): value is TCommands => {
  return value in COMMANDS;
};

export default function CommandResponse(props: TCommandBase) {
  const {
    path,
    cmd = "",
    options = [],
    files = [],
    folders = [],
    showHelp,
  } = props;
  let response: JSX.Element | undefined;

  if (isCommands(cmd)) {
    const Element = COMMANDS[cmd];
    const help = HELP[cmd];
    const itemType = help.itemType;
    const validOptions = Object.keys(help.options);

    const invalidOptions = isNotEmptyArray(options)
      ? options.filter((element) => !validOptions.includes(element))
      : [];
    const invalidFiles = ["MULT_FILE_DIR", "SINGLE_FILE"].includes(itemType)
      ? files.filter((x) => !isValidPath(getAbsolutePath(path, x)))
      : [];
    const invalidFolders = ["MULT_FILE_DIR", "SINGLE_DIR"].includes(itemType)
      ? folders.filter((x) => !isValidPath(getAbsolutePath(path, x)))
      : [];

    if (
      itemType === "NOTHING" &&
      (isNotEmptyArray(options) ||
        isNotEmptyArray(files) ||
        isNotEmptyArray(folders))
    ) {
      response = <NoArgs cmd={cmd} onClick={props.onFormSubmit} />;
    } else if (isNotEmptyArray(invalidOptions)) {
      response = (
        <InvalidOptions
          cmd={cmd}
          invalidOptions={invalidOptions}
          onClick={props.onFormSubmit}
        />
      );
    } else if (
      isNotEmptyArray(invalidFiles) ||
      isNotEmptyArray(invalidFolders)
    ) {
      response = (
        <InvalidPath
          cmd={cmd}
          invalidFiles={invalidFiles}
          invalidFolders={invalidFolders}
        />
      );
    } else if (showHelp) {
      response = <CmdHelp {...help} />;
    } else if (itemType === "SINGLE_FILE" && isNotEmptyArray(folders)) {
      response = (
        <FolderNotAllow
          cmd={cmd}
          folders={folders}
          onClick={props.onFormSubmit}
        />
      );
    } else if (itemType === "SINGLE_FILE" && files.length > 1) {
      response = <SingleFileOnly cmd={cmd} onClick={props.onFormSubmit} />;
    } else if (itemType === "SINGLE_DIR" && isNotEmptyArray(files)) {
      response = (
        <FileNotAllow cmd={cmd} files={files} onClick={props.onFormSubmit} />
      );
    } else if (itemType === "SINGLE_DIR" && folders.length > 1) {
      response = <SingleFolderOnly cmd={cmd} onClick={props.onFormSubmit} />;
    } else if (["clear", "cd"].includes(cmd)) {
      if (cmd == "cd") {
        if (!folders[0]) folders.push("~/portfolio");
        const { isProtacted = false } = getDirectory(
          getAbsolutePath(path, folders[0])
        );
        if (isProtacted)
          response = (
            <PermissionDenied
              cmd={cmd}
              path={folders[0]}
              pathType='directory'
            />
          );
      }
    } else {
      response = <Element {...props} />;
    }
  } else if (cmd !== "") {
    response = <NotFound cmd={cmd} />;
  }

  return response;
}
