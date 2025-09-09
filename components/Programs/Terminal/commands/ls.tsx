import { cn, isEmptyArray, isNotEmptyArray } from "@/lib/utils";
import { TCommandBase, THelp } from "@/types/terminal";
import { getCurrentDir, getDirectories, getFiles, TFolder } from "../fs-object";
import { useMemo } from "react";
import { BasicOnClick, BasicProps } from "@/types/basic-props";
import { PermissionDenied } from "./errors";

type ItemProps = BasicProps &
  BasicOnClick & {
    name: string;
    isProtacted: boolean;
  };

export const help: THelp = {
  cmd: "ls",
  description: "stands for list: it's list all the items in a directory",
  options: {
    "-l": "shows detailed list of each items in a directory",
  },
  itemType: "MULT_FILE_DIR",
};

function Folder({ name, isProtacted, className, onClick }: ItemProps) {
  return (
    <span
      className={cn(
        "mr-4 text-blue-700 dark:text-blue-400 font-bold",
        isProtacted ? "text-red-700 dark:text-red-400" : "",
        className
      )}
      onClick={() => onClick && onClick(name + "/")}
    >
      {name + "/"}
    </span>
  );
}
function DetailedFolder(props: ItemProps) {
  return (
    <tr>
      <td className='min-w-25 w-25'>drwxr-xr-x</td>
      <td className='min-w-8 w-8'>2</td>
      <td className='min-w-21 w-21'>mureliya</td>
      <td className='min-w-11 w-11'>dev</td>
      <td className='min-w-14 w-14'>4096</td>
      <td className='min-w-27 w-27'>Sep 1 21:21</td>
      <td className='whitespace-nowrap'>
        <Folder {...props} />
      </td>
    </tr>
  );
}

function File({ name, isProtacted, className, onClick }: ItemProps) {
  return (
    <span
      className={cn(
        "mr-4",
        isProtacted ? "text-red-700 dark:text-red-400" : "",
        className
      )}
      onClick={() => onClick && onClick(name)}
    >
      {name}
    </span>
  );
}
function DetailedFile(props: ItemProps) {
  return (
    <tr>
      <td className='min-w-25 w-25'>-rw-r--r--</td>
      <td className='min-w-8 w-8'>1</td>
      <td className='min-w-21 w-21'>mureliya</td>
      <td className='min-w-11 w-11'>dev</td>
      <td className='min-w-14 w-14'>1024</td>
      <td className='min-w-27 w-27'>Sep 1 21:21</td>
      <td className='whitespace-nowrap'>
        <File {...props} />
      </td>
    </tr>
  );
}

function LsSummaryView({
  content,
  className,
  onClick,
}: { content: TFolder } & BasicProps & BasicOnClick) {
  return (
    <>
      {content.dir.map(({ type, name, isProtacted = false }, index) =>
        type === "folder" ? (
          <Folder
            key={index}
            name={name}
            isProtacted={isProtacted}
            className={className}
            onClick={onClick}
          />
        ) : (
          <File
            key={index}
            name={name}
            isProtacted={isProtacted}
            className={className}
            onClick={onClick}
          />
        )
      )}
    </>
  );
}

function LsDetailedView({
  content,
  className,
  onClick,
}: { content: TFolder } & BasicProps & BasicOnClick) {
  return (
    <table className='w-full'>
      <tbody>
        {content.dir.map(({ type, name, isProtacted = false }, index) =>
          type === "folder" ? (
            <DetailedFolder
              key={index}
              name={name}
              isProtacted={isProtacted}
              className={className}
              onClick={onClick}
            />
          ) : (
            <DetailedFile
              key={index}
              name={name}
              isProtacted={isProtacted}
              className={className}
              onClick={onClick}
            />
          )
        )}
      </tbody>
    </table>
  );
}

function LsView({
  isDetailed,
  content,
  className,
  onClick,
}: {
  isDetailed: boolean;
  content: TFolder;
} & BasicProps &
  BasicOnClick) {
  return isDetailed ? (
    <LsDetailedView content={content} className={className} onClick={onClick} />
  ) : (
    <LsSummaryView content={content} className={className} onClick={onClick} />
  );
}

export default function Ls({
  path,
  cmd = "",
  options = [],
  files = [],
  folders = [],
  className,
  onClick,
}: TCommandBase & BasicProps & BasicOnClick) {
  const isDetailed = useMemo(() => options.includes("-l"), [options]);
  const currentDir: TFolder = useMemo(() => getCurrentDir(path), [path]);
  const fileObjects: TFolder = useMemo(
    () => ({
      type: "folder",
      name: "dummy",
      dir: getFiles(path, files),
    }),
    [path, files]
  );
  const folderObjects: TFolder[] = useMemo(
    () => getDirectories(path, folders),
    [path, folders]
  );

  return (
    <>
      {isEmptyArray(files) && isEmptyArray(folders) && (
        <div className='overflow-x-auto'>
          <LsView
            isDetailed={isDetailed}
            content={currentDir}
            className={className}
            onClick={onClick}
          />
        </div>
      )}

      {isNotEmptyArray(files) && (
        <div className='overflow-x-auto'>
          <LsView
            isDetailed={isDetailed}
            content={fileObjects}
            className={className}
            onClick={onClick}
          />
        </div>
      )}

      {isNotEmptyArray(folders) &&
        folderObjects.map((folderObject, index) => (
          <div key={index} className='mt-6 first:mt-0 overflow-x-auto'>
            <div
              className={cn(
                "font-bold",
                files.length == 0 && folders.length == 1 ? "hidden" : "block"
              )}
            >
              {folders[index]}: (total: {folderObject.dir.length})
            </div>
            {folderObject.isProtacted ? (
              <PermissionDenied
                cmd={cmd}
                path={folders[index]}
                pathType='directory'
              />
            ) : (
              <LsView
                isDetailed={isDetailed}
                content={folderObject}
                className={className}
                onClick={onClick}
              />
            )}
          </div>
        ))}
    </>
  );
}
