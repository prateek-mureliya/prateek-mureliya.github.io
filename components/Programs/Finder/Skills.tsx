import FolderContent from '../../UI/folder-view/folder-content';
import { TFolderContent } from '@/types/folder-view';
import { Container, LeftSide, RightSideButton } from './UI';
import { BasicProps } from '@/types/basic-props';
import { Badge } from '@/components/UI/badge';
import { cn } from '@/lib/utils';
import { JSX } from 'react';
import GradientText from '@/components/UI/gradient-text';
import { BsStars } from 'react-icons/bs';
import { SkillsIceBerg, SkillsIceBergPopup } from '../SkillsIceberg';
import { isMobile } from 'react-device-detect';
import { Dialog, DialogTrigger } from '@/components/UI/dialog/dialog';
import { GiMountainClimbing } from 'react-icons/gi';
import {
  AWSIcon,
  FastAPIIcon,
  TIconSvg,
  JavaIcon,
  JavaScriptIcon,
  JUnit5Icon,
  MongoDBIcon,
  MySqlIcon,
  NextJSIcon,
  PythonIcon,
  RedisIcon,
  ShadcnUIIcon,
  SpringBootIcon,
  TailwindCSSIcon,
  TypeScriptIcon,
} from '@/components/custom-icons';

type TSkill = { title: string; icon: TIconSvg; description: string | JSX.Element };

function InlineIconBox({ iconName, className, icon: Icon }: BasicProps & { iconName: string; icon: TIconSvg }) {
  return (
    <Badge
      variant={'outline'}
      className={cn('text-xs [&>svg]:size-4 p-0 rounded-none border-none font-extrabold', className)}
    >
      <Icon />
      {iconName}
    </Badge>
  );
}

const PythonDesc = () => (
  <span>
    Proficient in Python development for automation, scripting, API development with{' '}
    <InlineIconBox icon={FastAPIIcon} iconName="FastAPI" className="[&>svg]:size-2.5" />.
  </span>
);
const NextJSDesc = () => (
  <span>
    Currently learning Next.js using{' '}
    <InlineIconBox icon={TailwindCSSIcon} iconName="Tailwind CSS" className="[&>svg]:size-2.5" />,
    <InlineIconBox icon={TypeScriptIcon} iconName="TypeScript" className="[&>svg]:size-2.5" />
    &nbsp;/&nbsp;
    <InlineIconBox icon={JavaScriptIcon} iconName="JavaScript" className="[&>svg]:size-2.5" />
    &nbsp;and&nbsp;
    <InlineIconBox icon={ShadcnUIIcon} iconName="Shadcn/UI" className="[&>svg]:size-2.5" />
    &nbsp;for building responsive and component-driven web applications.
  </span>
);

const SkillGroup = ({ children }: BasicProps) => (
  <div className="border border-card-foreground dark:border-card-foreground/30 rounded-xl overflow-hidden mt-1">
    {children}
  </div>
);

const Skill = ({ title, icon: Icon, description }: TSkill) => (
  <div className="px-2 py-1 not-last:border-b border-card-foreground dark:border-card-foreground/30 flex gap-2 bg-card">
    <Icon className="flex-none size-6 mt-1 block" />
    <div className="flex flex-col gap-1 text-xs">
      <p className="font-extrabold">{title}</p>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

const CORE_SKILLS: TSkill[] = [
  {
    title: 'Java',
    icon: JavaIcon,
    description: 'Expert in Java development with strong knowledge of core Java, multithreading, and JVM internals.',
  },
  {
    title: 'SpringBoot',
    icon: SpringBootIcon,
    description: 'Proficient in Spring Boot ecosystem including Spring MVC, Spring Data and Spring Cloud.',
  },
  {
    title: 'JUnit5',
    icon: JUnit5Icon,
    description: 'Proficient in unit testing and integration testing using JUnit5 and Mockito.',
  },
  {
    title: 'MySql',
    icon: MySqlIcon,
    description: 'Experienced in MySQL database design, query optimization, indexing, and performance tuning.',
  },
  {
    title: 'Redis',
    icon: RedisIcon,
    description: 'Skilled in Redis implementation for low-latency caching and distributed data management.',
  },
  {
    title: 'MongoDB',
    icon: MongoDBIcon,
    description: 'Skilled in MongoDB for schema design, aggregation pipelines, and scalable NoSQL solutions.',
  },
  {
    title: 'AWS',
    icon: AWSIcon,
    description: 'Experienced in AWS cloud services including EC2, S3, RDS, Lambda, and cloud-native deployments.',
  },
];

const OTHER_SKILLS: TSkill[] = [
  {
    title: 'Python',
    icon: PythonIcon,
    description: <PythonDesc />,
  },
  {
    title: 'NextJS',
    icon: NextJSIcon,
    description: <NextJSDesc />,
  },
];

export default function Skills(props: TFolderContent) {
  return (
    <FolderContent {...props} isGrid={false}>
      <Container>
        <LeftSide>
          <h1 className="font-extrabold text-lg">
            What I am <GradientText>good</GradientText> at <BsStars className="inline text-yellow-400" />
          </h1>
          <SkillGroup>
            {CORE_SKILLS.map((s) => (
              <Skill key={s.title} title={s.title} icon={s.icon} description={s.description} />
            ))}
          </SkillGroup>

          <h1 className="font-extrabold text-sm mt-8">
            Additional <GradientText>skills</GradientText> but useful
          </h1>
          <SkillGroup>
            {OTHER_SKILLS.map((s) => (
              <Skill key={s.title} title={s.title} icon={s.icon} description={s.description} />
            ))}
          </SkillGroup>
        </LeftSide>

        {!isMobile && <SkillsIceBerg className="hidden sm:block sticky top-4 w-100 ml-12" />}
      </Container>
      {isMobile && (
        <Dialog>
          <DialogTrigger asChild>
            <RightSideButton icon={GiMountainClimbing} title="Skills" />
          </DialogTrigger>
          <SkillsIceBergPopup />
        </Dialog>
      )}
    </FolderContent>
  );
}
