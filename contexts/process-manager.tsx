"use client";

import { StaticImageData } from "next/image";
import { createContext, JSX, ReactNode, useContext, useReducer } from "react";
import { isMobile } from "react-device-detect";
import { WindowBodyProps } from "@/components/Window/window-body";

enum ProcessState {
  open,
  minimized,
  maximized,
}

type TProcess = {
  id: string;
  icon: StaticImageData;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  link?: string;
  window: (props: WindowBodyProps) => JSX.Element;
};

type TProcessProps = TProcess & {
  style: { zIndex: number };
  state: ProcessState;
  focus: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  showMaximized: boolean;
};

type ProcessContextType = {
  processes: TProcessProps[];
  handleOpen: (options: TProcess) => void;
  handleClose: (id: string) => void;
  handleMinimized: (id: string) => void;
  handleMaximized: (id: string) => void;
  handleFocus: (id: string, isFocus: boolean) => void;
  handleHome: () => void;
};

const ProcessContext = createContext<ProcessContextType | undefined>(undefined);

// Actions
type ProcessOpen = { type: "open"; payload: TProcess };
type ProcessOption = {
  type: "close" | "minimized" | "maximized";
  id: string;
};
type ProcessHome = { type: "home" };
type ProcessFocus = {
  type: "focus";
  id: string;
  isFocus: boolean;
};
type ProcessActions = ProcessOpen | ProcessOption | ProcessHome | ProcessFocus;

const BASE_Z_INDEX = 10;

const normalizeZIndex = (processes: TProcessProps[], pid: string) => {
  let focusId = "";
  const sortedProcesses = [...processes]
    .filter((p) => p.id !== pid)
    .sort((a, b) => a.style.zIndex - b.style.zIndex);

  const processesToZ: { [key: string]: number } = {};
  sortedProcesses.forEach((p, i) => {
    processesToZ[p.id] = BASE_Z_INDEX + i;
    if (!p.isMinimized) {
      focusId = p.id;
    }
  });

  return {
    processesToZ,
    focusId,
  };
};

const addProcess = (processes: TProcessProps[], process: TProcess) => {
  const newProcess = {
    ...process,
    state: isMobile ? ProcessState.maximized : ProcessState.open,
    isMinimized: false,
    isMaximized: isMobile,
    focus: true,
    showMaximized: !isMobile,
    style: {
      zIndex: BASE_Z_INDEX + processes.length,
    },
  };

  const unfocusedProcesses = processes.map((p) => {
    if (p.focus) return { ...p, focus: false };
    return p;
  });

  return [...unfocusedProcesses, newProcess];
};

const openProcess = (processes: TProcessProps[], payload: TProcess) => {
  if (processes.findIndex(({ id }) => id === payload.id) > -1) {
    const { processesToZ } = normalizeZIndex(processes, payload.id);
    return processes.map((p) =>
      p.id === payload.id
        ? {
            ...p,
            state: p.isMaximized ? ProcessState.maximized : ProcessState.open,
            isMinimized: false,
            style: {
              zIndex: BASE_Z_INDEX + processes.length - 1,
            },
            focus: true,
          }
        : { ...p, style: { zIndex: processesToZ[p.id] }, focus: false }
    );
  }
  return addProcess(processes, payload);
};

const closeProcess = (processes: TProcessProps[], pid: string) => {
  const processes_length = processes.length;
  const { processesToZ, focusId } = normalizeZIndex(processes, pid);
  return processes
    .filter(({ id }) => id !== pid)
    .map((p) => ({
      ...p,
      focus: p.id === focusId,
      style: {
        zIndex:
          p.id === pid
            ? BASE_Z_INDEX + processes_length - 1
            : processesToZ[p.id],
      },
    }));
};

const minimizedProcess = (processes: TProcessProps[], pid: string) => {
  const { focusId } = normalizeZIndex(processes, pid);
  return processes.map((p) =>
    p.id === pid
      ? {
          ...p,
          state: ProcessState.minimized,
          isMinimized: true,
          focus: false,
        }
      : { ...p, focus: p.id === focusId }
  );
};

const maximizedProcess = (processes: TProcessProps[], pid: string) => {
  const { processesToZ } = normalizeZIndex(processes, pid);
  return processes.map((p) =>
    p.id === pid
      ? {
          ...p,
          state:
            p.state === ProcessState.maximized
              ? ProcessState.open
              : ProcessState.maximized,
          isMinimized: false,
          isMaximized: p.state !== ProcessState.maximized,
          style: {
            zIndex: BASE_Z_INDEX + processes.length - 1,
          },
          focus: true,
        }
      : { ...p, style: { zIndex: processesToZ[p.id] }, focus: false }
  );
};

const bringToFront = (
  processes: TProcessProps[],
  pid: string,
  isFocus: boolean
) => {
  if (isFocus) return processes;

  const { processesToZ } = normalizeZIndex(processes, pid);
  return processes.map((p) => ({
    ...p,
    focus: p.id === pid,
    style: {
      zIndex:
        p.id === pid ? BASE_Z_INDEX + processes.length - 1 : processesToZ[p.id],
    },
  }));
};

const home = (processes: TProcessProps[]) => {
  if (processes.every((p) => p.isMinimized)) {
    const focusId = processes.reduce(
      (max, obj) => (obj.style.zIndex > max.style.zIndex ? obj : max),
      { style: { zIndex: 0 } } as TProcessProps
    ).id;

    return processes.map((p) => ({
      ...p,
      state: p.isMaximized ? ProcessState.maximized : ProcessState.open,
      isMinimized: false,
      focus: focusId == p.id,
    }));
  } else {
    return processes.map((p) =>
      p.isMinimized
        ? p
        : {
            ...p,
            state: ProcessState.minimized,
            isMinimized: true,
            focus: false,
          }
    );
  }
};

const processReducer = (prev: TProcessProps[], action: ProcessActions) => {
  switch (action.type) {
    case "open":
      return openProcess(prev, action.payload);
    case "close":
      return closeProcess(prev, action.id);
    case "minimized":
      return minimizedProcess(prev, action.id);
    case "maximized":
      return maximizedProcess(prev, action.id);
    case "focus":
      return bringToFront(prev, action.id, action.isFocus);
    case "home":
      return home(prev);
    default:
      return prev;
  }
};

export const ProcessContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [processes, dispatch] = useReducer(processReducer, []);

  return (
    <ProcessContext.Provider
      value={{
        processes,
        handleOpen: (payload: TProcess) => {
          dispatch({ type: "open", payload });
        },
        handleClose: (id: string) => {
          dispatch({ type: "close", id });
        },
        handleMinimized: (id: string) => {
          dispatch({
            type: "minimized",
            id,
          });
        },
        handleMaximized: (id: string) => {
          if (!isMobile) {
            dispatch({
              type: "maximized",
              id,
            });
          }
        },
        handleHome: () => {
          dispatch({
            type: "home",
          });
        },
        handleFocus: (id: string, isFocus: boolean) => {
          dispatch({
            type: "focus",
            id,
            isFocus,
          });
        },
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
};

// Custom hook to use the ProcessContext
export const useProcessContext = () => {
  const context = useContext(ProcessContext);

  if (!context) {
    throw new Error(
      "useProcessContext must be used within a ProcessContextProvider"
    );
  }

  return context;
};
