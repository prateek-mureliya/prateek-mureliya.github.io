import { TProcessButton } from "@/types/process-button";
import ContactUsIcon from "@/public/images/icon/contact-us.png";
import ContactUs from "../../Programs/ContactUs";

export const CONTACT_US: TProcessButton = {
  type: "window",
  id: "contactus",
  title: "Contact Us",
  icon: ContactUsIcon,
  x: 450,
  y: 150,
  width: 665,
  height: 450,
  window: ContactUs,
};
