'use client';

import { useEffect, useRef, useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '../sidebar';
import { Tabs } from '../tabs';
import WindowBody, { WindowBodyProps } from '../../Window/window-body';
import { TSidebarMenu } from '@/types/folder-view';
import FolderSidebar from './folder-sidebar';

type FolderViewProps = TSidebarMenu & WindowBodyProps;

export default function FolderView({ activeTab, menuOptions, isMaximized, focus }: FolderViewProps) {
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
    <WindowBody ref={containerRef} focus={focus}>
      <Tabs defaultValue={activeTab}>
        <SidebarProvider defaultOpen={false}>
          <FolderSidebar height={height} menuOptions={menuOptions} />

          {menuOptions.map(({ title, content: Content }) => (
            <Content key={title} value={title} height={height} isMaximized={isMaximized} focus={focus} />
          ))}
          <SidebarTrigger className="absolute top-2 left-17 sm:left-19" />
        </SidebarProvider>
      </Tabs>
    </WindowBody>
  );
}
