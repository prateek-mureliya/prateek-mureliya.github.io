import { JSX } from "react";
import { TCommandBase } from "@/types/terminal";
import Help from "./help";
import pwd, { help as pwdHelp } from "./pwd";
import ls, { help as lsHelp } from "./ls";
import clear, { help as clearHelp } from "./clear";
import cd, { help as cdHelp } from "./cd";
import welcome, { help as welcomeHelp } from "./welcome";
import {
  FileNotAllow,
  InvalidOptions,
  InvalidPath,
  NoArgs,
  NotFound,
  PermissionDenied,
  SingleFolderOnly,
} from "./errors";
import { getAbsolutePath, getDirectory, isValidPath } from "../fs-object";
import { isNotEmptyArray } from "@/lib/utils";

const COMMANDS = { pwd, ls, clear, cd, welcome };
const HELP = {
  pwd: pwdHelp,
  ls: lsHelp,
  clear: clearHelp,
  cd: cdHelp,
  welcome: welcomeHelp,
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
    const invalidFiles = ["MULT_FILE_DIR"].includes(itemType)
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
      response = <NoArgs cmd={cmd} />;
    } else if (isNotEmptyArray(invalidOptions)) {
      response = <InvalidOptions cmd={cmd} invalidOptions={invalidOptions} />;
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
      response = <Help {...help} />;
    } else if (itemType === "SINGLE_DIR" && isNotEmptyArray(files)) {
      response = <FileNotAllow cmd={cmd} files={files} />;
    } else if (itemType === "SINGLE_DIR" && folders.length > 1) {
      response = <SingleFolderOnly cmd={cmd} />;
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
