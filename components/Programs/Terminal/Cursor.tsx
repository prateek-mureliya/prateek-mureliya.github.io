import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BasicProps } from "@/types/basic-props";
import { cn, isEmptyArray, joinPath } from "@/lib/utils";
import { DynamicIcon, dynamicIconImports } from "lucide-react/dynamic";
import { AUTHOR_USER } from "@/lib/constants";
import { TCommand } from "@/types/terminal";
import Ls from "./commands/ls";
import { useState } from "react";
import { getAbsolutePath, isFolder, isValidPath } from "./fs-object";

type IconName = keyof typeof dynamicIconImports;
type CursorProps = TCommand;

function getTime(time: Date) {
  const hour = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  return `${hour}:${minutes}`;
}

function getClock(time: Date): IconName {
  const hour = time.getHours() % 12;
  switch (hour) {
    case 1:
      return "clock-1";
    case 2:
      return "clock-2";
    case 3:
      return "clock-3";
    case 4:
      return "clock-4";
    case 5:
      return "clock-5";
    case 6:
      return "clock-6";
    case 7:
      return "clock-7";
    case 8:
      return "clock-8";
    case 9:
      return "clock-9";
    case 10:
      return "clock-10";
    case 11:
      return "clock-11";
    default:
      return "clock-12";
  }
}

function shortenPath(path: string[]) {
  let shortpath: string;
  if (path.length > 1 && path[0] == "home" && path[1] == AUTHOR_USER) {
    const userPath = path.slice(2);
    if (isEmptyArray(userPath)) {
      shortpath = "~";
    } else if (userPath.length > 2) {
      shortpath = `~/../${userPath[userPath.length - 1]}`;
    } else {
      shortpath = "~/" + userPath.join("/");
    }
  } else if (path.length > 2) {
    shortpath = `/${path[0]}/../${path[path.length - 1]}`;
  } else {
    shortpath = joinPath(path);
  }
  return shortpath;
}

function Caret({
  iconName,
  className,
  children,
}: { iconName?: IconName } & BasicProps) {
  return (
    <span
      className={cn(
        "inline-block bg-muted first:rounded-s-full relative pr-1",
        "before:absolute before:z-1 before:content-[''] before:-right-3.5 before:border-y-10 before:border-l-15 before:border-y-transparent before:border-l-muted",
        children ? "pl-4" : "pl-2",
        className
      )}
    >
      {iconName && (
        <DynamicIcon
          name={iconName}
          className='inline-block size-4 -mt-1 mr-1'
        />
      )}
      {children ? children : <span>&nbsp;</span>}
    </span>
  );
}

const formSchema = z.object({ cmd: z.string() });

export default function Cursor({
  path,
  time,
  actualCommand = "",
  response: Response,
  currentBranch,
  onSubmit,
  ...props
}: CursorProps) {
  const [suggestionPath, setSuggestionPath] = useState(path);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { register, handleSubmit, reset, setValue, setFocus, getValues } =
    useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        cmd: "",
      },
    });

  const onFormSubmit = (data: z.infer<typeof formSchema>) => {
    if (onSubmit) {
      onSubmit({
        actualCommand: data.cmd.trim().toLowerCase(),
      });
      reset();
      setSuggestionPath(path);
      setShowSuggestions(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueCursor = e.currentTarget.value;
    setValue("cmd", valueCursor);

    const parts = valueCursor.split(/\s+/);
    if (parts.length > 1) {
      const inputPath = parts[parts.length - 1];
      const absolutePath = getAbsolutePath(path, inputPath);
      const fsObject = isValidPath(absolutePath);
      const absolutePathParts = absolutePath.split("/").filter((p) => p !== "");

      if (fsObject) {
        if (isFolder(fsObject)) {
          setSuggestionPath(absolutePath.split("/").filter((p) => p !== ""));
          setShowSuggestions(true);
        } else if (showSuggestions) {
          setShowSuggestions(false);
        }
      } else if (absolutePathParts.length == suggestionPath.length) {
        setSuggestionPath(
          absolutePath
            .split("/")
            .filter((p) => p !== "")
            .slice(0, -1)
        );
        setShowSuggestions(true);
      } else if (inputPath.startsWith("-") || inputPath.startsWith("—")) {
        setShowSuggestions(false);
      } else {
        setShowSuggestions(true);
      }
    } else if (showSuggestions) {
      setShowSuggestions(false);
    }
  };

  return (
    <div>
      <div>
        <Caret className='bg-emerald-200 before:border-l-emerald-200 dark:bg-emerald-700 dark:before:border-l-emerald-700'>
          {AUTHOR_USER}
        </Caret>
        <Caret
          iconName='git-branch'
          className='bg-sky-300 before:border-l-sky-300 dark:bg-sky-900 dark:before:border-l-sky-900'
        >
          {currentBranch}
        </Caret>
        <Caret className='bg-gray-300 before:border-l-gray-300 dark:bg-gray-600 dark:before:border-l-gray-600'>
          {shortenPath(path)}
        </Caret>
        {time ? (
          <Caret iconName={getClock(time)}>{getTime(time)}</Caret>
        ) : (
          <Caret></Caret>
        )}
      </div>
      {!time && (
        <div>
          <form onSubmit={handleSubmit(onFormSubmit)} className='w-full'>
            <label className='flex'>
              <span>$</span>
              <input
                type='text'
                className='outline-0 ml-2 w-full'
                autoFocus
                autoComplete='off'
                placeholder='type your command here'
                {...register("cmd")}
                onChange={onChange}
                onFocus={onChange}
              />
            </label>
          </form>
          <div className={showSuggestions ? "block" : "hidden"}>
            <Ls
              path={suggestionPath}
              showHelp={false}
              className='cursor-pointer select-none opacity-50 hover:underline hover:opacity-100'
              onClick={(name) => {
                const fieldName = "cmd";
                const value = getValues(fieldName);

                let newValue;
                if (value.endsWith(" ") || value.endsWith("/")) {
                  newValue = `${value}${name}`;
                } else if (
                  value.match(/^.*\s+[~.\/]$/) ||
                  value.match(/^.*\s+[.]{2}$/)
                ) {
                  newValue = `${value}/${name}`;
                } else {
                  const parts = value.split(" ");
                  const lastReletivePath = parts.slice(-1).toString();
                  const absolutePath = getAbsolutePath(path, lastReletivePath);
                  const fsObject = isValidPath(absolutePath);
                  if (fsObject) {
                    newValue = `${value}/${name}`;
                  } else {
                    newValue = `${value.slice(
                      0,
                      parts.length === 2 && value.indexOf("/") === -1
                        ? value.lastIndexOf(" ") + 1
                        : value.lastIndexOf("/") + 1
                    )}${name}`;
                  }
                }

                setValue(fieldName, newValue);
                setFocus(fieldName);
              }}
            />
          </div>
        </div>
      )}
      {Response && (
        <div>
          <div>{"$ " + actualCommand}</div>
          <div className='pt-2 pb-4 first:pb-0'>
            <Response
              path={path}
              {...props}
              onFormSubmit={(cmd) => {
                onFormSubmit({ cmd });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
