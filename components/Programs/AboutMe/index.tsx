"use client";

import WindowBody, { WindowBodyProps } from "../../Window/window-body";
import Avatar from "./Avatar";
import AboutFooter from "./AboutFooter";
import {
  BadgeCheck,
  CalendarDays,
  Cog,
  ContactRound,
  Container,
  Cpu,
  Gpu,
  HardDrive,
  Laptop,
  Leaf,
  MemoryStick,
  Palette,
  PencilRuler,
  Terminal,
  TrendingUp,
  Volume2,
} from "lucide-react";
import { Branch, Branches, Tree, TreeRoot, TreeView } from "../../UI/TreeView";
import { TColor } from "@/types/tree";
import { TLucideIcon } from "@/types/lucide-icon";
import { TextLoop } from "@/components/UI/text-loop";

type TBaseTreeData = {
  icon: TLucideIcon;
  title: string;
  details: React.ReactNode;
};

type TTreeData = TBaseTreeData & {
  color: TColor;
  branches: TBaseTreeData[];
};

const calYearExperience = () => {
  const joiningDate = new Date("2018-12-05");
  const currentDate = new Date();
  const year = currentDate.getFullYear() - joiningDate.getFullYear() - 1;
  return `${year}+`;
};

const TREE_DATA: TTreeData[] = [
  {
    color: "Yellow",
    icon: Laptop,
    title: "OS",
    details: <OSName />,
    branches: [
      {
        icon: ContactRound,
        title: "Iam",
        details: (
          <TextLoop
            words={[
              "Software Engineer",
              "Backend Developer",
              "Building scalable backend systems",
              "Optimizing system performance",
              "Managing databases effectively",
              "Writing clean and maintainable code",
              "Debugging and troubleshooting complex systems",
            ]}
            className='text-muted-foreground'
          />
        ),
      },
      {
        icon: Cog,
        title: "Kernel",
        details: "Java | SpringBoot | Next.js | REST APIs | Microservices",
      },
      {
        icon: Terminal,
        title: "Shell",
        details: "Bash / Git / CI-CD / Docker / Kubernetes",
      },
      {
        icon: CalendarDays,
        title: "Uptime",
        details: `${calYearExperience()} Years (Continuous Integration)`,
      },
      {
        icon: TrendingUp,
        title: "Status",
        details: "Actively Building Cool Stuff",
      },
    ],
  },
  {
    color: "Purple",
    icon: Leaf,
    title: "Resolution",
    details: "Focused | Punctual | Self-Motivated",
    branches: [
      {
        icon: Cpu,
        title: "CPU",
        details: "Multithreaded Thinking @ 5.0 GHz",
      },
      {
        icon: Gpu,
        title: "GPU",
        details: "Creative Vision Engine",
      },
      {
        icon: MemoryStick,
        title: "Memory",
        details: "16GB + Unlimited Curiosity",
      },
      {
        icon: HardDrive,
        title: "Disk",
        details: "1TB of Experience (SSD - Solid Skill Drive)",
      },
    ],
  },
  {
    color: "Green",
    icon: Container,
    title: "Environment",
    details: "Agile / Scrum",
    branches: [
      {
        icon: Palette,
        title: "Tool",
        details: "VS Code / IntelliJ IDEA",
      },
      {
        icon: PencilRuler,
        title: "Theme",
        details: "Dark Mode Always",
      },
    ],
  },
];

function OSName() {
  const handlePlay = () => {
    const audio = new Audio("/media/Prateek_Kumar_Voice.mp3");
    audio.play();
  };

  return (
    <span>
      Prateek Kumar
      <BadgeCheck className='inline size-4 ml-1 text-blue-800 dark:text-blue-400' />
      <Volume2
        onClick={handlePlay}
        className='inline size-4 ml-1 text-muted-foreground hover:text-foreground'
      />
    </span>
  );
}

export default function AboutMe({ isMaximized }: WindowBodyProps) {
  return (
    <WindowBody isMaximized={isMaximized} className='flex flex-col p-4'>
      <div className='flex flex-1 flex-col sm:flex-row sm:max-w-210 mx-auto'>
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
