'use client';
import { useMemo } from 'react';
import { TCommandBase, TFile, THelp } from '@/types/terminal';
import { getFiles } from '../fs-object';
import { PermissionDenied } from './errors';
import { useProcessContext } from '@/contexts/process-manager';
import { TerminalLoader } from '@/components/UI/terminal-loader';
import { toWindowApp } from '@/lib/utils';

export const help: THelp = {
  cmd: 'open',
  description: 'use to open a file',
  options: {},
  itemType: 'SINGLE_FILE',
};

export default function Open({ path, cmd = '', files = [], isLastCmd = false }: TCommandBase) {
  const { handleOpen } = useProcessContext();
  const fileObject: TFile = useMemo(() => getFiles(path, files)[0], [path, files]);

  const handleFinish = () => {
    if (fileObject.fileType === 'process') {
      handleOpen(toWindowApp(fileObject.process));
    } else if (fileObject.fileType === 'link') {
      window.open(fileObject.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    (fileObject.isProtacted && <PermissionDenied path={files[0]} cmd={cmd} pathType="file" />) || (
      <TerminalLoader isDone={isLastCmd} duration={1200} onFinish={handleFinish} />
    )
  );
}
