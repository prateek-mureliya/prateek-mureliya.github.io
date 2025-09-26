import { TProcessButton } from "@/types/process-button";
import LinkIcon from "@/public/images/icon/social/link.png";
import OldPortfolioPreview from "@/public/images/old-portfolio.png";
import { OLD_SITE_URI, OLD_SITE_URL } from "@/lib/constants";

export const OLD_PORTFOLIO: TProcessButton = {
  type: "link",
  id: "old-portfolio",
  title: "Old Portfolio",
  icon: LinkIcon,
  viewer: OldPortfolioPreview,
  linkTitle: OLD_SITE_URI,
  link: OLD_SITE_URL,
};
