import Tree from "./Tree";
import TreeRoot from "./TreeRoot";
import Branches from "./Branches";
import Branch from "./Branch";
import { BasicProps } from "@/types/basic-props";

function TreeView({ className, children }: BasicProps) {
  return <ul className={className}>{children}</ul>;
}

export { TreeView, Tree, TreeRoot, Branches, Branch };
