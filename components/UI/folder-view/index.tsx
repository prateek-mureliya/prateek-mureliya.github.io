"use client";

import { useEffect, useRef, useState } from "react";
import { SidebarProvider } from "../sidebar";
import { Tabs } from "../tabs";
import WindowBody, { WindowBodyProps } from "../../Window/window-body";
import { TSidebarMenu } from "@/types/folder-view";
import FolderSidebar from "./folder-sidebar";

type FolderViewProps = {
  isMaximized?: boolean;
} & TSidebarMenu &
  WindowBodyProps;

export default function FolderView({
  activeTab,
  defaultOpen = false,
  menuOptions,
  isMaximized,
}: FolderViewProps) {
  const [height, setHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height } = entry.contentRect;
        setHeight(height);
      }
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <WindowBody ref={containerRef}>
      <Tabs defaultValue={activeTab}>
        <SidebarProvider defaultOpen={defaultOpen}>
          <FolderSidebar height={height} menuOptions={menuOptions} />

          {menuOptions.map(({ title, content: Content }) => (
            <Content key={title} value={title} isMaximized={isMaximized} />
          ))}
        </SidebarProvider>
      </Tabs>
    </WindowBody>
  );
}
