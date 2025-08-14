"use client";

import { AnimatePresence } from "motion/react";
import { AboutMe } from "../Programs";
import { useProcessContext } from "@/contexts/process-manager";
import ProcessWindow from "../Window/process-window";

export default function ProcessManager() {
  const {
    processes,
    handleClose,
    handleMinimized,
    handleMaximized,
    handleFocus,
  } = useProcessContext();

  return (
    <AnimatePresence>
      {processes.map(({ id, ...props }) => (
        <ProcessWindow
          {...props}
          key={id}
          onClose={() => handleClose(id)}
          onMinimize={() => handleMinimized(id)}
          onMaximizeRestore={() => handleMaximized(id)}
          onFocus={() => handleFocus(id, props.focus)}
        >
          <AboutMe isMaximize={props.isMaximized} />
        </ProcessWindow>
      ))}
    </AnimatePresence>
  );
}
