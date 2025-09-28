import { useMemo } from "react";
import {
  TCommandBase,
  TFile,
  THelp,
  TSuggestionAction,
} from "@/types/terminal";
import { getFiles } from "../fs-object";
import { PermissionDenied, SuggestionAction } from "./errors";
import Link from "next/link";

export const help: THelp = {
  cmd: "cat",
  description: "use to view content of a file",
  options: {},
  itemType: "SINGLE_FILE",
};

const NoContent = ({ command, onClick }: TSuggestionAction) => (
  <>
    <span>���k^n$�%6g6��x�*���</span>
    <div className='mt-2'>
      Try
      <SuggestionAction command={`open ${command}`} onClick={onClick} />
      to view a file
    </div>
  </>
);

function CatLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      target='_blank'
      className='hover:underline cursor-pointer'
    >
      {href}
    </Link>
  );
}

export default function Cat({
  path,
  cmd = "",
  files = [],
  onFormSubmit,
}: TCommandBase) {
  const fileObject: TFile = useMemo(
    () => getFiles(path, files)[0],
    [path, files]
  );

  return (
    (fileObject.isProtacted && (
      <PermissionDenied path={files[0]} cmd={cmd} pathType='file' />
    )) ||
    (fileObject.fileType == "link" && <CatLink href={fileObject.href} />) || (
      <NoContent command={files[0]} onClick={onFormSubmit} />
    )
  );
}
