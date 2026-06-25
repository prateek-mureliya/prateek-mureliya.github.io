import { FINDER } from './finder';
import { CONTACT_US } from './contact-us';
import { MAIL_BOX } from './mailbox';
import { RESUME2016_PDF } from './resume-2016-pdf';
import { RESUME2021_PDF } from './resume-2021-pdf';
import { RESUME_PDF } from './resume-pdf';
import { TERMINAL } from './terminal';
import { TRASH_BIN } from './trash-bin';
import { VS_CODE } from './vs-code';
import { MESSAGES } from './messages';

const apps = {
  [FINDER.id]: FINDER,
  [MESSAGES.id]: MESSAGES,
  [CONTACT_US.id]: CONTACT_US,
  [TERMINAL.id]: TERMINAL,
  [TRASH_BIN.id]: TRASH_BIN,
  [VS_CODE.id]: VS_CODE,
  [MAIL_BOX.id]: MAIL_BOX,
  [RESUME_PDF.id]: RESUME_PDF,
  [RESUME2021_PDF.id]: RESUME2021_PDF,
  [RESUME2016_PDF.id]: RESUME2016_PDF,
};

const otherApps = [MAIL_BOX.id];
const developerApps = [TERMINAL.id, VS_CODE.id];

export function idToApp(appids: string[]) {
  return appids.map((a) => apps[a]);
}

export function getDesktopIcons(isMobile: boolean, isDeveloper: boolean) {
  let final = [RESUME_PDF.id];
  if (isMobile) final = final.concat(otherApps);
  if (isMobile && isDeveloper) final = final.concat(developerApps);
  return idToApp(final);
}

export function getLeftSideArr(isMobile: boolean, isDeveloper: boolean) {
  let final = [FINDER.id, MESSAGES.id, CONTACT_US.id];
  if (!isMobile) final = final.concat(otherApps);
  if (!isMobile && isDeveloper) final = final.concat(developerApps);
  return final;
}

export function getRightSideArr() {
  return [TRASH_BIN.id];
}
