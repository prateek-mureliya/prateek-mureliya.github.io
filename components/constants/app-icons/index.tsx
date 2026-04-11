import { ABOUT_ME } from './about-me';
import { CONTACT_US } from './contact-us';
import { RESUME2016_PDF } from './resume-2016-pdf';
import { RESUME2021_PDF } from './resume-2021-pdf';
import { RESUME_PDF } from './resume-pdf';
import { TERMINAL } from './terminal';
import { TRASH_BIN } from './trash-bin';

const apps = {
  [ABOUT_ME.id]: ABOUT_ME,
  [CONTACT_US.id]: CONTACT_US,
  [TERMINAL.id]: TERMINAL,
  [TRASH_BIN.id]: TRASH_BIN,
  [RESUME_PDF.id]: RESUME_PDF,
  [RESUME2021_PDF.id]: RESUME2021_PDF,
  [RESUME2016_PDF.id]: RESUME2016_PDF,
};

const developerApps = [TERMINAL.id];

export function idToApp(appids: string[]) {
  return appids.map((a) => apps[a]);
}

export function getDesktopIcons(isMobile: boolean, isDeveloper: boolean) {
  let final = [RESUME_PDF.id];
  if (isMobile && isDeveloper) final = final.concat(developerApps);
  return idToApp(final);
}

export function getLeftSideArr(isMobile: boolean, isDeveloper: boolean) {
  let final = [ABOUT_ME.id, CONTACT_US.id];
  if (!isMobile && isDeveloper) final = final.concat(developerApps);
  return final;
}

export function getRightSideArr() {
  return [TRASH_BIN.id];
}
