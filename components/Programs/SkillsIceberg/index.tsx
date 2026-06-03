import { DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/UI/dialog/dialog';
import { WindowActionClose } from '@/components/Window/window-action-button';
import { cn, randomNumber } from '@/lib/utils';
import { BasicProps } from '@/types/basic-props';
import { TIconType } from '@/types/icon-type';
import { BiInjection } from 'react-icons/bi';
import { FaAws, FaGitAlt } from 'react-icons/fa6';
import {
  SiApachekafka,
  SiAuth0,
  SiDocker,
  SiFastapi,
  SiFlyway,
  SiJsonwebtokens,
  SiKeycloak,
  SiMongodb,
  SiRabbitmq,
  SiRedis,
  SiSpring,
  SiSpringboot,
  SiSpringsecurity,
  SiSwagger,
} from 'react-icons/si';
import { RiNextjsLine } from 'react-icons/ri';
import { VscJson } from 'react-icons/vsc';
import { GrMysql } from 'react-icons/gr';
import { BsFiletypeXml } from 'react-icons/bs';
import { JavaIcon, PythonIcon } from '@/components/custom-icons';

const IconLevel = ({ icon: Icon, title }: { icon?: TIconType; title: string }) => {
  return (
    <div className="text-xs px-2 py-0.5 rounded-2xl bg-white/20 dark:bg-white/4 border border-white/20 dark:border-white/4 backdrop-blur-md text-slate-800 dark:text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/30 shadow-md dark:shadow-xs cursor-default">
      {Icon && <Icon className="inline-block mr-1" />}
      {title}
    </div>
  );
};

const techSections = [
  {
    title: 'CORE FRAMEWORK',
    items: ['SpringBoot', 'IoC/DI', 'FastAPI', 'NextJS'],
    icons: [SiSpringboot, BiInjection, SiFastapi, RiNextjsLine],
  },
  {
    title: 'SECURITY',
    items: ['SpringSecurity', 'JWT', 'OAuth2', 'Keycloak'],
    icons: [SiSpringsecurity, SiJsonwebtokens, SiAuth0, SiKeycloak],
  },
  {
    title: 'DATA LAYER',
    items: ['SpringDataJPA', 'Flyway', 'MySQL', 'MongoDB'],
    icons: [SiSpring, SiFlyway, GrMysql, SiMongodb],
  },

  {
    title: 'MESSAGING & ASYNC',
    items: ['Kafka', 'RabbitMQ', 'Event Driven', 'Saga'],
    icons: [SiApachekafka, SiRabbitmq, ,],
  },
  {
    title: 'WEB & APIs',
    items: ['RestAPIs', 'gRPC', 'Swagger', 'JSON ', 'XML'],
    icons: [, , SiSwagger, VscJson, BsFiletypeXml],
  },
  {
    title: 'CACHING & OTHER',
    items: ['Redis', 'AWS', 'Docker', 'git'],
    icons: [SiRedis, FaAws, SiDocker, FaGitAlt],
  },
];

const Bubbles = () =>
  [...Array(15)].map((_, i) => (
    <div
      key={i}
      className="absolute z-1 -bottom-15 rounded-full bg-white/25 dark:bg-white/5 animate-bubble"
      style={{
        left: `${randomNumber(0, 100)}%`,
        width: `${randomNumber(20, 20)}px`,
        height: `${randomNumber(20, 20)}px`,
        animationDuration: `${randomNumber(8, 10)}s`,
        animationDelay: `${randomNumber(0, 5)}s`,
      }}
    />
  ));

function SkillsIceBerg({ className }: BasicProps) {
  return (
    <div
      className={cn(
        'relative h-140 sm:h-126 overflow-hidden bg-gradient-to-b from-background to-cyan-500/15 dark:to-cyan-800/8 shadow-2xl flex-none',
        className
      )}
    >
      {/* Floating bubbles */}
      <Bubbles />

      {/* Water Layer */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-cyan-400/30 dark:bg-cyan-800/4 backdrop-blur-sm" />

        {/* Waves */}
        <div className="absolute z-1 -top-1 left-0 w-2/1 h-31 bg-white/40 dark:bg-black/30 rounded-b-[45%] animate-wave" />
        <div className="absolute z-1 top-0 left-0 w-2/1 h-31 bg-white/20 dark:bg-black/20 rounded-b-[45%] animate-waveSlow" />
      </div>

      {/* Iceberg */}
      <div className="absolute z-0 w-full h-130 sm:h-122.5 mt-4 p-2 pt-8 animate-float">
        <div
          className="absolute inset-0 border border-white/8 backdrop-blur-xl bg-white/20 dark:bg-white/5 shadow-2xl"
          style={{
            clipPath: 'polygon(50% 0%, 72% 10%, 88% 40%, 78% 100%, 22% 100%, 12% 40%, 28% 10%)',
          }}
        ></div>
      </div>
      <div className="relative z-2 w-full mt-4 p-2 pt-8 animate-float">
        {/* Header */}
        <div className="relative text-center">
          <div>
            <JavaIcon className="inline-block size-6 pr-2" />
            <PythonIcon className="inline-block size-6 border-l border-l-foreground pl-2" />
          </div>
          <h1 className="font-black text-slate-800 dark:text-slate-400 tracking-tight">Java & Python</h1>
          <p className="text-slate-400 dark:text-slate-500">what everyone sees</p>
          <p className="text-slate-400 dark:text-slate-500 mt-6">what I actually know</p>
        </div>

        {/* Sections */}
        <div className="mt-1 space-y-2">
          {techSections.map(({ title, items, icons }) => (
            <div key={title} className="p-1">
              <div className="relative z-1 text-center text-xs font-bold tracking-[0.3em] text-cyan-900 dark:text-cyan-500">
                {title}
              </div>

              <div className="flex flex-wrap justify-center gap-1 mt-1">
                {items.map((item, idx) => (
                  <IconLevel key={item} title={item} icon={icons[idx]} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillsIceBergPopup() {
  return (
    <DialogContent
      hideHeader
      onCloseAutoFocus={(e) => e.preventDefault()}
      className="bg-transparent rounded-none shadow-none border-none outline-0 top-[unset] bottom-0 translate-y-0 w-full max-w-full p-2"
      windowClassName="p-0 gap-2"
    >
      <DialogTitle hidden>SkillsIceBergPopup DialogTitle</DialogTitle>
      <DialogDescription hidden>SkillsIceBergPopup DialogDescription</DialogDescription>
      <DialogClose asChild>
        <WindowActionClose>
          <span className="sr-only">Close</span>
        </WindowActionClose>
      </DialogClose>
      <SkillsIceBerg />
    </DialogContent>
  );
}

export { SkillsIceBerg, SkillsIceBergPopup };
