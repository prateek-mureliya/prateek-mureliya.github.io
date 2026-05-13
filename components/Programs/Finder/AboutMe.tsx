import FolderContent from '../../UI/folder-view/folder-content';
import { TFolderContent } from '@/types/folder-view';
import { AUTHOR_NAME_AUDIO, Illustrations1Img } from '@/lib/media';
import { AUTHOR_NAME, AUTHOR_ROLES, AUTHOR_SKILLS } from '@/lib/constants';
import { Button } from '@/components/UI/button';
import { Dialog, DialogTrigger } from '@/components/UI/dialog/dialog';
import ContactUs from '../ContactUs';
import { Badge } from '@/components/UI/badge';
import { calYearExperience, cn } from '@/lib/utils';
import { TEXT_COLOR } from '@/components/UI/TreeView/TreeRoot';
import { BORDER_COLOR } from '@/components/UI/TreeView/Branches';
import { Container, LeftSide, LineComment, RightSideImage } from './UI';
import { BadgeCheck, Volume2 } from 'lucide-react';

export default function AboutMe(props: TFolderContent) {
  const handlePlay = () => {
    const audio = new Audio(AUTHOR_NAME_AUDIO);
    audio.play();
  };

  return (
    <FolderContent {...props} isGrid={false}>
      <Container>
        <LeftSide>
          <div>
            <span className={cn('font-extrabold', TEXT_COLOR.Purple)}>String</span>
            <span className="mx-1 text-foreground text-2xl sm:text-5xl font-extrabold">
              {AUTHOR_NAME.replace(' ', '')}
            </span>
            <span className={cn('font-extrabold', TEXT_COLOR.Purple)}>=</span>
            <BadgeCheck className="inline size-4 ml-1 text-blue-800 dark:text-blue-400" />
            <Volume2 onClick={handlePlay} className="inline size-4 ml-1 text-muted-foreground hover:text-foreground" />
          </div>

          <div className={cn('border-l pl-2 sm:pl-4 mt-6', BORDER_COLOR.Yellow)}>
            <div className="mb-2 last:mb-0">
              <span className={cn('font-extrabold mr-2', TEXT_COLOR.Yellow)}>role:</span>
              <span>&apos;{AUTHOR_ROLES[0]}&apos;</span>
            </div>
            <div className="mb-2 last:mb-0">
              <span className={cn('font-extrabold mr-2', TEXT_COLOR.Yellow)}>focus:</span>
              <span>&apos;{AUTHOR_ROLES[1]}&apos;</span>
            </div>
            <div className="mb-2 last:mb-0">
              <span className={cn('font-extrabold mr-2', TEXT_COLOR.Yellow)}>stack:</span>
              <span>[&apos;{AUTHOR_SKILLS.join("', '")}&apos;]</span>
            </div>
          </div>

          <LineComment className="mt-6">Built scalable services with Java & Spring Boot</LineComment>
          <LineComment>Designed reliable event-driven microservices</LineComment>
          <LineComment>Improved system performance with Redis Cache</LineComment>
          <LineComment>Deployed services on cloud-native platforms (AWS)</LineComment>

          <Badge className="flex bg-transparent text-foreground mt-6 border border-foreground/10">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
            </span>
            <span className="ml-1">{calYearExperience()} Years of Experience</span>
          </Badge>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant={'outline'} className="rounded-full mt-6">
                Get In Touch
              </Button>
            </DialogTrigger>
            <ContactUs />
          </Dialog>
        </LeftSide>

        <RightSideImage src={Illustrations1Img.src} alt={Illustrations1Img.alt} />
      </Container>
    </FolderContent>
  );
}
