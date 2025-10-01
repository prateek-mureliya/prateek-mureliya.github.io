"use client";
import { useEffect, useMemo, useState } from "react";
import { TCommandBase, TFile, THelp } from "@/types/terminal";
import { getFiles } from "../fs-object";
import { PermissionDenied } from "./errors";
import { Check } from "lucide-react";
import { useProcessContext } from "@/contexts/process-manager";

export const help: THelp = {
  cmd: "open",
  description: "use to open a file",
  options: {},
  itemType: "SINGLE_FILE",
};

const Loader = ({
  duration = 100,
  isDone,
  onFinish,
}: {
  duration: number;
  isDone: boolean;
  onFinish: () => void;
}) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(isDone);

  useEffect(() => {
    if (!done) {
      const intervalTime = 50; // update every 50ms
      const steps = duration / intervalTime;
      let count = 0;

      const interval = setInterval(() => {
        count++;
        setProgress((count / steps) * 100);

        if (count >= steps) {
          clearInterval(interval);
          setProgress(100);
          if (onFinish) {
            setTimeout(() => {
              setDone(true);
              onFinish();
            }, 300);
          }
        }
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [done, duration, onFinish]);

  // Build ASCII progress bar (20 blocks wide)
  const totalBlocks = 20;
  const filledBlocks = Math.round((progress / 100) * totalBlocks);
  const bar = "█".repeat(filledBlocks) + "-".repeat(totalBlocks - filledBlocks);

  return done ? (
    <div className='flex text-lime-600 font-bold'>
      <Check className='size-4 mr-1 mt-0.5' strokeWidth={2} />
      <div>Opened</div>
    </div>
  ) : (
    <div className='text-lime-600'>
      Opening: [{bar}] {Math.round(progress)}%
    </div>
  );
};

export default function Open({
  path,
  cmd = "",
  files = [],
  isLastCmd = false,
}: TCommandBase) {
  const { handleOpen } = useProcessContext();
  const fileObject: TFile = useMemo(
    () => getFiles(path, files)[0],
    [path, files]
  );

  const handleFinish = () => {
    if (fileObject.fileType === "process") {
      handleOpen({
        ...fileObject.process,
        icon: fileObject.process.viewer || fileObject.process.icon,
      });
    } else if (fileObject.fileType === "link") {
      window.open(fileObject.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    (fileObject.isProtacted && (
      <PermissionDenied path={files[0]} cmd={cmd} pathType='file' />
    )) || <Loader isDone={isLastCmd} duration={1200} onFinish={handleFinish} />
  );
}
