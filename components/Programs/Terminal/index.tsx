"use client";

import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { AUTHOR_USER } from "@/lib/constants";
import { TCommand, TFromSubmitArgs } from "@/types/terminal";
import WindowBody, { WindowBodyProps } from "../../Window/window-body";
import Cursor from "./Cursor";
import CommandResponse from "./commands";
import { getAbsolutePath } from "./fs-object";
import { useLocalStorage } from "@/hook/useLocalStorage";

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
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [, setStoredHistory] = useLocalStorage<string[]>("storedHistory", []);
  const [history, sethistory] = useState<TCommand[]>([
    { ...initHistory, time: new Date() },
  ]);
  const [path, setPath] = useState(initPath);

  const addHistory = useCallback((newHistory: TCommand) => {
    sethistory((prev) => [...prev, newHistory]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = ({ actualCommand }: TFromSubmitArgs) => {
    const parts = actualCommand.split(/\s+/);
    let cmd = parts[0].toLowerCase();

    const optionsSet = new Set<string>();
    const filesSet = new Set<string>();
    const foldersSet = new Set<string>();
    let showHelp = false;

    if (cmd === "ll") {
      cmd = "ls";
      optionsSet.add("-l");
    } else if (cmd === "help" && parts.length > 1) {
      cmd = parts[1];
      showHelp = true;
    }

    for (const part of parts.slice(1)) {
      if (part == "--help" || part == "—help") {
        showHelp = true;
      } else if (part.startsWith("-")) {
        for (const ch of part.slice(1)) {
          optionsSet.add("-" + ch.toLowerCase());
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

    if (actualCommand && actualCommand !== "clear") {
      setStoredHistory((prev) => [
        ...prev.slice(Math.max(prev.length - 9, 0)),
        actualCommand,
      ]);
    }
  };

  return (
    <WindowBody isMaximized={isMaximized} className='p-2 font-mono text-sm'>
      {history.map((values, index) => (
        <Cursor
          key={index}
          {...values}
          onSubmit={handleSubmit}
          isLastCmd={index < history.length - 1}
        />
      ))}
      <Cursor
        path={path}
        showHelp={false}
        currentBranch={currentBranch}
        onSubmit={handleSubmit}
      />

      <div ref={bottomRef} className='h-6'></div>
    </WindowBody>
  );
}
