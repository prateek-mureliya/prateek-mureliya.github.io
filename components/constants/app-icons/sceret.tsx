import { TProcessButton } from "@/types/process-button";
import SecretIcon from "@/public/images/icon/secret.png";
import RevealSecrets from "../../Programs/RevealSecrets";

export const SECRET: TProcessButton = {
  type: "dialog",
  id: "secret",
  title: "Secret",
  icon: SecretIcon,
  popup: RevealSecrets,
};
