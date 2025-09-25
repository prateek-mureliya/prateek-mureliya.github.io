import { JSX, useMemo } from "react";
import { TCommandBase, THelp, TSuggestionAction } from "@/types/terminal";
import { getFiles } from "../fs-object";
import { SuggestionAction } from "./errors";

export const help: THelp = {
  cmd: "cat",
  description: "stands for concatenate is used to view file",
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

export default function Cat({ path, files = [], onFormSubmit }: TCommandBase) {
  const fileObject: JSX.Element | undefined = useMemo(
    () => getFiles(path, files)[0].content,
    [path, files]
  );

  return fileObject || <NoContent command={files[0]} onClick={onFormSubmit} />;
}
