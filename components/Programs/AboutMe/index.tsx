"use client";

import WindowBody, { WindowBodyProps } from "../../Window/window-body";
import Avatar from "./Avatar";
import AboutFooter from "./AboutFooter";

import { Branch, Branches, Tree, TreeRoot, TreeView } from "../../UI/TreeView";
import { TBaseTreeData, TColor } from "@/types/tree";
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
} from "../../constants/os-info";

type TTreeData = TBaseTreeData & {
  color: TColor;
  branches: TBaseTreeData[];
};

const TREE_DATA: TTreeData[] = [
  {
    color: "Yellow",
    icon: OS.icon,
    title: OS.title,
    details: OS.details,
    branches: [Iam, Uptime, Status],
  },
  {
    color: "Purple",
    icon: Environment.icon,
    title: Environment.title,
    details: Environment.details,
    branches: [Backend, Frontend, Database, Tool],
  },
  {
    color: "Green",
    icon: Resolution.icon,
    title: Resolution.title,
    details: Resolution.details,
    branches: [CPU, GPU, Memory, Disk],
  },
];

export default function AboutMe({ isMaximized }: WindowBodyProps) {
  return (
    <WindowBody isMaximized={isMaximized} className='flex flex-col p-4'>
      <div className='flex flex-1 flex-col sm:flex-row sm:max-w-228 mx-auto'>
        <div className='flex justify-center w-full sm:w-80'>
          <Avatar className='sm:mt-8 size-30 sm:size-50' />
        </div>
        <TreeView className='py-4 flex-1'>
          {TREE_DATA.map((root) => (
            <Tree key={root.title}>
              <TreeRoot title={root.title} icon={root.icon} color={root.color}>
                {root.details}
              </TreeRoot>
              <Branches color={root.color}>
                {root.branches.map((branch) => (
                  <Branch
                    key={branch.title}
                    icon={branch.icon}
                    title={branch.title}
                    color={root.color}
                  >
                    {branch.details}
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
