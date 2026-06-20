import FolderContent from '@/components/UI/folder-view/folder-content';
import { TFolderContent } from '@/types/folder-view';
import {
  Container,
  LeftSide,
  RightSideButton,
  Timeline,
  TimelineBadge,
  TimelineBadges,
  TimelineItem,
  TTimeline,
} from '../UI';
import GradientText from '@/components/UI/gradient-text';
import { BsStars } from 'react-icons/bs';
import { FaJava, FaPython, FaSchool, FaUserGraduate } from 'react-icons/fa6';
import { GiOpenBook } from 'react-icons/gi';
import { isMobile } from 'react-device-detect';
import { Dialog, DialogTrigger } from '@/components/UI/dialog/dialog';
import { PiGraduationCapBold, PiGraph } from 'react-icons/pi';
import { Achievements, AchievementsPopup } from './Achievements';

const educations: TTimeline[] = [
  {
    interval: '2012 - 2016',
    title: 'Bachelor of Engineering',
    desc: 'Computer Science and Engineering',
    location: 'NRIITM, Gwalior M.P.',
    points: (
      <TimelineBadges>
        <TimelineBadge title="CGPA 6.86" color="Sky" />
        <TimelineBadge title="DSA" color="Sky" icon={PiGraph} />
        <TimelineBadge title="Java" color="Sky" icon={FaJava} />
        <TimelineBadge title="Python" color="Sky" icon={FaPython} />
      </TimelineBadges>
    ),
    color: 'Sky',
    icon: FaUserGraduate,
    impacts: [],
  },
  {
    interval: '2011 - 2012',
    title: 'Higher Secondary (12th)',
    desc: 'Science (PCM)',
    location: 'Govt. Jiwaji Rao H.S. School, Gwalior M.P.',
    points: (
      <TimelineBadges>
        <TimelineBadge title="70.2%" color="Pink" />
        <TimelineBadge title="Physics" color="Pink" />
        <TimelineBadge title="Chemistry" color="Pink" />
        <TimelineBadge title="Mathematics" color="Pink" />
      </TimelineBadges>
    ),
    color: 'Pink',
    icon: FaSchool,
    impacts: [],
  },
  {
    interval: '2009 - 2010',
    title: 'Secondary School (10th)',
    desc: 'General',
    location: 'Govt. Jiwaji Rao H.S. School, Gwalior M.P.',
    points: (
      <TimelineBadges>
        <TimelineBadge title="84.83%" color="Green" />
        <TimelineBadge title="Hindi" color="Green" />
        <TimelineBadge title="English" color="Green" />
        <TimelineBadge title="Science" color="Green" />
      </TimelineBadges>
    ),
    color: 'Green',
    icon: GiOpenBook,
    impacts: [],
  },
];

export default function Education(props: TFolderContent) {
  return (
    <FolderContent {...props} isGrid={false}>
      <Container>
        <LeftSide>
          <h1 className="font-extrabold text-lg mb-2">
            Education <GradientText>Journey</GradientText> <BsStars className="inline text-yellow-400" />
          </h1>

          <Timeline>
            {educations.map((props, idx) => (
              <TimelineItem key={idx} {...props} />
            ))}
          </Timeline>
        </LeftSide>

        {!isMobile && <Achievements className="hidden sm:block sticky top-4 w-100 ml-12" />}
      </Container>
      {isMobile && (
        <Dialog>
          <DialogTrigger asChild>
            <RightSideButton icon={PiGraduationCapBold} title="Education" />
          </DialogTrigger>
          <AchievementsPopup />
        </Dialog>
      )}
    </FolderContent>
  );
}
