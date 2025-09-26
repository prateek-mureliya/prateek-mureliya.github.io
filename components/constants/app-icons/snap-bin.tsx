import { TProcessButton } from "@/types/process-button";
import SnapBinIcon from "@/public/images/icon/snap-bin.png";
import SnapBin from "../../Programs/SnapBin";

export const SNAP_BIN: TProcessButton = {
  type: "window",
  id: "snapbin",
  title: "Snap Bin",
  icon: SnapBinIcon,
  x: 350,
  y: 215,
  width: 665,
  height: 450,
  window: SnapBin,
};
