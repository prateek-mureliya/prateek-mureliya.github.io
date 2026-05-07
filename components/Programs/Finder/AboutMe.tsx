import Image from 'next/image';
import FolderContent from '../../UI/folder-view/folder-content';
import { TFolderContent } from '@/types/folder-view';
import { Illustrations1Img } from '@/lib/media';
import { AUTHOR_NAME, AUTHOR_ROLES, AUTHOR_SKILLS } from '@/lib/constants';
import { Button } from '@/components/UI/button';
import { Dialog, DialogTrigger } from '@/components/UI/dialog/dialog';
import ContactUs from '../ContactUs';
import { Badge } from '@/components/UI/badge';
import { calYearExperience } from '@/lib/utils';

export default function AboutMe(props: TFolderContent) {
  return (
    <FolderContent {...props} isGrid={false} className="max-sm:pl-14">
      <div className="relative z-0 flex flex-col-reverse sm:flex-row sm:max-w-228 mx-auto">
        <div className="font-mono text-xs sm:text-sm grow-1 pt-4">
          <div>
            <span className="text-emerald-600 font-extrabold">String</span>
            <span className="mx-1 text-foreground text-3xl sm:text-5xl font-extrabold">
              {AUTHOR_NAME.replace(' ', '')}
            </span>
            <span className="text-emerald-600 font-extrabold">=</span>
          </div>

          <div className="border-l border-indigo-600 pl-4 mt-6">
            <div className="mb-2">
              <span className="text-indigo-600 font-extrabold mr-2">role:</span>
              <span>&apos;{AUTHOR_ROLES[0]}&apos;</span>
            </div>
            <div className="mb-2">
              <span className="text-indigo-600 font-extrabold mr-2">focus:</span>
              <span>&apos;{AUTHOR_ROLES[1]}&apos;</span>
            </div>
            <div>
              <span className="text-indigo-600 font-extrabold mr-2">stack:</span>
              <span>[&apos;{AUTHOR_SKILLS.join("', '")}&apos;]</span>
            </div>
          </div>

          <div className="mt-6 text-gray-500">{'// Built scalable services with Java & Spring Boot'}</div>
          <div className="mt-2 text-gray-500">{'// Designed reliable event-driven microservices'}</div>
          <div className="mt-2 text-gray-500">{'// Improved system performance with Redis Cache'}</div>
          <div className="mt-2 text-gray-500">{'// Deployed services on cloud-native platforms (AWS)'}</div>

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
        </div>
        <Image
          src={Illustrations1Img.src}
          alt={Illustrations1Img.alt}
          placeholder="blur"
          className="hidden sm:block size-100 mx-auto"
        />
      </div>
    </FolderContent>
  );
}
