"use client";

import React, { memo, useCallback, useState } from "react";
import { AUTHOR_USER } from "@/lib/constants";
import { TCommand } from "@/types/terminal";
import WindowBody, { WindowBodyProps } from "../../Window/window-body";
import Cursor, { TFromSubmitArgs } from "./Cursor";
import CommandResponse from "./commands";
import { getAbsolutePath } from "./fs-object";

const currentBranch = "main";
const initPath = ["home", AUTHOR_USER, "portfolio"];
const initHistory: TCommand = {
  path: initPath,
  actualCommand: "welcome",
  currentBranch: currentBranch,
  response: memo(CommandResponse),
  cmd: "welcome",
  options: [],
  files: [],
  folders: [],
  showHelp: false,
};

export default function Terminal({ isMaximized }: WindowBodyProps) {
  const [history, sethistory] = useState<TCommand[]>([
    { ...initHistory, time: new Date() },
  ]);
  const [path, setPath] = useState(initPath);

  const addHistory = useCallback((newHistory: TCommand) => {
    sethistory((prev) => [...prev, newHistory]);
  }, []);

  const handleSubmit = ({ actualCommand }: TFromSubmitArgs) => {
    const parts = actualCommand.split(/\s+/);
    const cmd = parts[0];

    const optionsSet = new Set<string>();
    const filesSet = new Set<string>();
    const foldersSet = new Set<string>();
    let showHelp = false;

    for (const part of parts) {
      if (part == "--help" || part == "—help") {
        showHelp = true;
      } else if (part.startsWith("-")) {
        for (const ch of part.slice(1)) {
          optionsSet.add("-" + ch);
        }
      } else if (part.match(/\.[a-zA-Z0-9]+$/)) {
        filesSet.add(part);
      } else if (part !== cmd) {
        foldersSet.add(part);
      }
    }

    const options = Array.from(optionsSet);
    const files = Array.from(filesSet);
    const folders = Array.from(foldersSet);
    const response = CommandResponse;

    const newHistory: TCommand = {
      path: path,
      time: new Date(),
      actualCommand: actualCommand,
      currentBranch: currentBranch,
      response: memo(response),
      cmd: cmd,
      options: options,
      files: files,
      folders: folders,
      showHelp: showHelp,
    };

    if (cmd === "clear" && !response(newHistory)) {
      sethistory([]);
    } else {
      if (cmd === "cd" && !response(newHistory)) {
        const changeDir = getAbsolutePath(path, folders[0])
          .replace("#USER#", AUTHOR_USER)
          .split("/")
          .filter((x) => x !== "");
        setPath(changeDir);
      }
      addHistory(newHistory);
    }
  };

  return (
    <WindowBody isMaximized={isMaximized} className='p-2 font-mono text-sm'>
      {history.map((values, index) => (
        <Cursor key={index} {...values} />
      ))}
      <Cursor
        path={path}
        showHelp={false}
        currentBranch={currentBranch}
        onSubmit={handleSubmit}
      />
    </WindowBody>
  );
}
