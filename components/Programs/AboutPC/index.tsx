'use client';

import WindowBody, { WindowBodyProps } from '../../Window/window-body';
import Avatar from './Avatar';
import AboutFooter from './AboutFooter';

import { Branch, Branches, Tree, TreeRoot, TreeView } from '../../UI/TreeView';
import { TBaseTreeData } from '@/types/tree';
import {
  Backend,
  CPU,
  Database,
  Disk,
  Environment,
  Frontend,
  GPU,
  Iam,
  Memory,
  OS,
  Resolution,
  Status,
  Tool,
  Uptime,
} from '../../constants/os-info';

type TTreeData = TBaseTreeData & {
  textColor: string;
  borderColor: string;
  branches: TBaseTreeData[];
};

const TREE_DATA: TTreeData[] = [
  {
    textColor: 'text-yellow',
    borderColor: 'border-yellow',
    icon: OS.icon,
    title: OS.title,
    details: OS.details,
    branches: [Iam, Uptime, Status],
  },
  {
    textColor: 'text-purple',
    borderColor: 'border-purple',
    icon: Environment.icon,
    title: Environment.title,
    details: Environment.details,
    branches: [Backend, Frontend, Database, Tool],
  },
  {
    textColor: 'text-green',
    borderColor: 'border-green',
    icon: Resolution.icon,
    title: Resolution.title,
    details: Resolution.details,
    branches: [CPU, GPU, Memory, Disk],
  },
];

export default function AboutPC({ isMaximized }: WindowBodyProps) {
  return (
    <WindowBody isMaximized={isMaximized} className="flex flex-col p-4">
      <div className="flex flex-1 flex-col sm:flex-row sm:max-w-228 mx-auto">
        <div className="flex justify-center w-full sm:w-80">
          <Avatar className="sm:mt-8 size-30 sm:size-50" />
        </div>
        <TreeView className="py-4 flex-1">
          {TREE_DATA.map((root) => (
            <Tree key={root.title}>
              <TreeRoot {...root}>{root.details}</TreeRoot>
              <Branches borderColor={root.borderColor}>
                {root.branches.map(({ title, icon, details }) => (
                  <Branch
                    key={title}
                    title={title}
                    icon={icon}
                    textColor={root.textColor}
                    borderColor={root.borderColor}
                  >
                    {details}
                  </Branch>
                ))}
              </Branches>
            </Tree>
          ))}
        </TreeView>
      </div>
      <AboutFooter />
    </WindowBody>
  );
}
