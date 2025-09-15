import { TBadgeData, TBaseTreeData } from "@/types/tree";
import {
  BadgeCheck,
  CalendarDays,
  Cog,
  ContactRound,
  Container,
  Cpu,
  DatabaseIcon,
  Gpu,
  HardDrive,
  Laptop,
  Leaf,
  MemoryStick,
  Palette,
  PencilRuler,
  TrendingUp,
  Volume2,
} from "lucide-react";
import {
  SiApachekafka,
  SiDocker,
  SiElasticsearch,
  SiFastapi,
  SiFlask,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiReact,
  SiRedis,
  SiSpringboot,
  SiTypescript,
} from "react-icons/si";
import {
  FaArrowsRotate,
  FaArrowsSplitUpAndLeft,
  FaAws,
  FaGitAlt,
  FaJava,
  FaPython,
} from "react-icons/fa6";
import { GrMysql } from "react-icons/gr";
import { AUTHOR_NAME, AUTHOR_ROLES } from "@/lib/constants";
import { TextLoop } from "./UI/text-loop";
import { calYearExperience } from "@/lib/utils";
import BadgeContainer from "./UI/badge-container";

const ENVIRONMENT: TBadgeData[] = [
  {
    icon: FaArrowsSplitUpAndLeft,
    title: "Agile",
  },
  {
    icon: FaArrowsRotate,
    title: "Scrum",
  },
];
const BACKEND: TBadgeData[] = [
  {
    icon: FaJava,
    title: "Java",
  },
  {
    icon: FaPython,
    title: "Python",
  },
  {
    icon: SiSpringboot,
    title: "SpringBoot",
  },
  {
    icon: SiFlask,
    title: "Flask",
  },
  {
    icon: SiFastapi,
    title: "FastAPI",
  },
];

const FRONTEND: TBadgeData[] = [
  {
    icon: SiJavascript,
    title: "Javascript",
  },
  {
    icon: SiTypescript,
    title: "Typescript",
  },
  {
    icon: SiReact,
    title: "React.js",
  },
  {
    icon: SiNextdotjs,
    title: "Next.js",
  },
];

const DATABASE: TBadgeData[] = [
  {
    icon: GrMysql,
    title: "MySql",
  },
  {
    icon: SiMongodb,
    title: "MongoDB",
  },
  {
    icon: SiRedis,
    title: "Redis",
  },
  {
    icon: SiApachekafka,
    title: "Kafka",
  },
  {
    icon: SiElasticsearch,
    title: "Elasticsearch",
  },
];

const TOOLS: TBadgeData[] = [
  {
    icon: FaGitAlt,
    title: "Git",
  },
  {
    icon: SiDocker,
    title: "Docker",
  },
  {
    icon: SiKubernetes,
    title: "Kubernetes",
  },
  {
    icon: FaAws,
    title: "AWS Cloud",
  },
];

export const OS: TBaseTreeData = {
  icon: Laptop,
  title: "OS",
  details: <OSName />,
};

export const Iam: TBaseTreeData = {
  icon: ContactRound,
  title: "Iam",
  details: <TextLoop words={AUTHOR_ROLES} className='text-muted-foreground' />,
};

export const Uptime: TBaseTreeData = {
  icon: CalendarDays,
  title: "Uptime",
  details: `${calYearExperience()} Years (Continuous Integration)`,
};

export const Status: TBaseTreeData = {
  icon: TrendingUp,
  title: "Status",
  details: "Actively Building Cool Stuff",
};

export const Environment: TBaseTreeData = {
  icon: Container,
  title: "Environment",
  details: <BadgeContainer data={ENVIRONMENT} />,
};

export const Backend: TBaseTreeData = {
  icon: Cog,
  title: "Backend",
  details: <BadgeContainer data={BACKEND} />,
};

export const Frontend: TBaseTreeData = {
  icon: Palette,
  title: "Frontend",
  details: <BadgeContainer data={FRONTEND} />,
};

export const Database: TBaseTreeData = {
  icon: DatabaseIcon,
  title: "Database",
  details: <BadgeContainer data={DATABASE} />,
};

export const Tool: TBaseTreeData = {
  icon: PencilRuler,
  title: "Tool",
  details: <BadgeContainer data={TOOLS} />,
};

export const Resolution: TBaseTreeData = {
  icon: Leaf,
  title: "Resolution",
  details: "Focused | Punctual | Self-Motivated",
};

export const CPU: TBaseTreeData = {
  icon: Cpu,
  title: "CPU",
  details: "Multithreaded Thinking @ 5.0 GHz",
};

export const GPU: TBaseTreeData = {
  icon: Gpu,
  title: "GPU",
  details: "Creative Vision Engine",
};
export const Memory: TBaseTreeData = {
  icon: MemoryStick,
  title: "Memory",
  details: "16GB + Unlimited Curiosity",
};
export const Disk: TBaseTreeData = {
  icon: HardDrive,
  title: "Disk",
  details: "1TB of Experience (SSD - Solid Skill Drive)",
};

function OSName() {
  const handlePlay = () => {
    const audio = new Audio("/media/Prateek_Kumar_Voice.mp3");
    audio.play();
  };

  return (
    <span>
      {AUTHOR_NAME}
      <BadgeCheck className='inline size-4 ml-1 text-blue-800 dark:text-blue-400' />
      <Volume2
        onClick={handlePlay}
        className='inline size-4 ml-1 text-muted-foreground hover:text-foreground'
      />
    </span>
  );
}
