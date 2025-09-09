import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function joinPath(path: string[]) {
  return "/"+path.join("/");
}

export function isEmptyArray(arr: unknown[]) {
  return arr.length===0;
}

export function isNotEmptyArray(arr: unknown[]) {
  return arr.length > 0;
}