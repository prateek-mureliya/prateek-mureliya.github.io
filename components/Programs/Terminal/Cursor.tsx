import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BasicProps } from "@/types/basic-props";
import { cn, isEmptyArray, joinPath } from "@/lib/utils";
import { DynamicIcon, dynamicIconImports } from "lucide-react/dynamic";
import { AUTHOR_USER } from "@/lib/constants";
import { TCommand, TFromSubmitArgs } from "@/types/terminal";
import Ls from "./commands/ls";
import { useState } from "react";
import { getAbsolutePath, isFolder, isValidPath } from "./fs-object";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../UI/dialog";
import { isMobile } from "react-device-detect";

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

function CaretContainer({
  path,
  time,
  currentBranch,
}: {
  path: string[];
  time?: Date;
  currentBranch: string;
}) {
  return (
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
  );
}

const fieldName = "cmd";
const formSchema = z.object({ [fieldName]: z.string() });

function ActualCommand({
  fieldValue,
  isBlink = true,
}: {
  fieldValue?: string;
  isBlink?: boolean;
}) {
  return (
    <>
      <span>$</span>
      <span className='ml-2 inline-block whitespace-break-spaces'>
        {fieldValue ? (
          <>
            {fieldValue}
            {isBlink && (
              <span
                className='border-r border-r-foreground animate-blink select-none'
                aria-hidden='true'
              />
            )}
          </>
        ) : (
          <>
            <span
              className='border-r border-r-foreground animate-blink select-none'
              aria-hidden='true'
            />
            <span className='text-muted-foreground select-none'>
              type your command here
            </span>
          </>
        )}
      </span>
    </>
  );
}

function CommandForm({
  path,
  onSubmit,
}: {
  path: string[];
  onSubmit?: (args: TFromSubmitArgs) => void;
}) {
  const [suggestionPath, setSuggestionPath] = useState(path);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    getValues,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cmd: "",
    },
  });
  const fieldValue = watch(fieldName, "");

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
    setValue(fieldName, valueCursor);

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
      <form onSubmit={handleSubmit(onFormSubmit)} className='w-full'>
        <label className='flex'>
          <input
            type='text'
            className='w-0 absolute -left-99999'
            autoFocus
            autoComplete='off'
            {...register(fieldName)}
            onChange={onChange}
            onFocus={onChange}
          />
          <ActualCommand fieldValue={fieldValue} />
        </label>
      </form>
      <div className={showSuggestions ? "block" : "hidden"}>
        <Ls
          path={suggestionPath}
          showHelp={false}
          className='cursor-pointer select-none opacity-50 hover:underline hover:opacity-100'
          onClick={(name) => {
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
                  parts.length >= 2 && value.indexOf("/") === -1
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
  );
}

function DialogCommandForm({
  path,
  currentBranch,
  onSubmit,
}: {
  path: string[];
  currentBranch: string;
  onSubmit?: (args: TFromSubmitArgs) => void;
}) {
  const [open, setOpen] = useState(false);

  const onFormSubmit = (args: TFromSubmitArgs) => {
    setOpen(false);
    if (onSubmit) onSubmit(args);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <div className='flex'>
          <ActualCommand />
        </div>
      </DialogTrigger>
      <DialogContent hideHeader className='sm:w-128 p-2 font-mono text-sm'>
        <DialogHeader className='hidden'>
          <DialogTitle>hidden title</DialogTitle>
        </DialogHeader>
        <CaretContainer path={path} currentBranch={currentBranch} />
        <CommandForm path={path} onSubmit={onFormSubmit} />
      </DialogContent>
    </Dialog>
  );
}

export default function Cursor({
  path,
  time,
  actualCommand = "",
  response: Response,
  currentBranch,
  onSubmit,
  ...props
}: CursorProps) {
  return (
    <div>
      <CaretContainer path={path} currentBranch={currentBranch} time={time} />
      {!time &&
        (isMobile ? (
          <DialogCommandForm
            path={path}
            currentBranch={currentBranch}
            onSubmit={onSubmit}
          />
        ) : (
          <CommandForm path={path} onSubmit={onSubmit} />
        ))}
      {Response && (
        <div>
          <div className='flex'>
            <ActualCommand fieldValue={actualCommand} isBlink={false} />
          </div>
          <div className='pt-2 pb-4 first:pb-0'>
            <Response
              path={path}
              {...props}
              onFormSubmit={(cmd) =>
                onSubmit && onSubmit({ actualCommand: cmd })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
