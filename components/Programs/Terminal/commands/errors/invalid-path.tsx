import { TCmdError } from "@/types/terminal";
import BasicError from "./basic-error";
import Path from "./path";

type InvalidPathProps = TCmdError & {
  invalidFiles: string[];
  invalidFolders: string[];
};

export default function InvalidPath({
  cmd,
  invalidFiles,
  invalidFolders,
}: InvalidPathProps) {
  return (
    <>
      {invalidFiles.map((filePath) => (
        <BasicError key={filePath} cmd={cmd}>
          invalid path <Path>{filePath}</Path>: No such a file
        </BasicError>
      ))}

      {invalidFolders.map((folderPath) => (
        <BasicError key={folderPath} cmd={cmd}>
          invalid path <Path>{folderPath}</Path>: No such a directory
        </BasicError>
      ))}
    </>
  );
}
