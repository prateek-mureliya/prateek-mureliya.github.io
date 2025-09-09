import { TCmdError } from "@/types/terminal";

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
        <div key={filePath}>
          <span className='text-orange-500'>{cmd}</span>: invalid path{" "}
          <span className='text-green-700'>&#39;{filePath}&#39;</span>: No such
          file
        </div>
      ))}

      {invalidFolders.map((folderPath) => (
        <div key={folderPath}>
          <span className='text-orange-500'>{cmd}</span>: invalid path{" "}
          <span className='text-green-700'>&#39;{folderPath}&#39;</span>: No
          such directory
        </div>
      ))}
    </>
  );
}
