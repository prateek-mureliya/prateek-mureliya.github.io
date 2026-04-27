import { VS_CODE } from '@/components/constants/app-icons/vs-code';
import { TerminalLoader } from '@/components/UI/terminal-loader';
import { useProcessContext } from '@/contexts/process-manager';
import { toWindowApp } from '@/lib/utils';
import { TCommandBase, THelp } from '@/types/terminal';

export const help: THelp = {
  cmd: 'code',
  description: ': Open VS Code editor',
  options: {},
  itemType: 'NOTHING',
};

export default function Code({ isLastCmd = false }: TCommandBase) {
  const { handleOpen } = useProcessContext();
  const handleFinish = () => {
    handleOpen(toWindowApp(VS_CODE));
  };
  return <TerminalLoader isDone={isLastCmd} duration={1200} onFinish={handleFinish} />;
}
