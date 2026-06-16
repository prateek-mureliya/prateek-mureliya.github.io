import FolderContent from '../../UI/folder-view/folder-content';
import { TFolderContent } from '@/types/folder-view';
import { AUTHOR_NAME_AUDIO } from '@/lib/media';
import { AUTHOR_NAME, AUTHOR_ROLES, AUTHOR_SKILLS } from '@/lib/constants';
import { Button } from '@/components/UI/button';
import { Dialog, DialogTrigger } from '@/components/UI/dialog/dialog';
import ContactUs from '../ContactUs';
import { Badge } from '@/components/UI/badge';
import { calYearExperience } from '@/lib/utils';
import LineComment from '@/components/UI/line-comment';
import { Container, LeftSide, RightSideButton } from './UI';
import { Volume2 } from 'lucide-react';
import { GameBox, GameBoxPopup } from '../GameBox';
import { isMobile } from 'react-device-detect';
import { MdOutlineVideogameAsset } from 'react-icons/md';
import { TirangaIcon } from '@/components/custom-icons';

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
            <span className="font-extrabold text-purple">String</span>
            <span className="mx-1 text-foreground text-2xl sm:text-5xl font-extrabold">
              {AUTHOR_NAME.replace(' ', '')}
            </span>
            <span className="font-extrabold text-purple">=</span>
            <TirangaIcon className="inline size-4 ml-1" />
            <Volume2 onClick={handlePlay} className="inline size-4 ml-1 text-muted-foreground hover:text-foreground" />
          </div>

          <div className="border-l pl-2 sm:pl-4 mt-6 border-yellow">
            <div className="mb-2 last:mb-0">
              <span className="font-extrabold mr-2 text-yellow">role:</span>
              <span>&apos;{AUTHOR_ROLES[0]}&apos;</span>
            </div>
            <div className="mb-2 last:mb-0">
              <span className="font-extrabold mr-2 text-yellow">focus:</span>
              <span>&apos;{AUTHOR_ROLES[1]}&apos;</span>
            </div>
            <div className="mb-2 last:mb-0">
              <span className="font-extrabold mr-2 text-yellow">stack:</span>
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

        {!isMobile && (
          <GameBox focus={props.focus ? props.focus : false} className="hidden sm:block sticky top-4 w-100" />
        )}
      </Container>
      {isMobile && (
        <Dialog>
          <DialogTrigger asChild>
            <RightSideButton icon={MdOutlineVideogameAsset} title="Games" />
          </DialogTrigger>
          <GameBoxPopup />
        </Dialog>
      )}
    </FolderContent>
  );
}
