import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { JOINING_DATE } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function joinPath(path: string[]) {
  return "/" + path.join("/");
}

export function isEmptyArray(arr: unknown[]) {
  return arr.length === 0;
}

export function isNotEmptyArray(arr: unknown[]) {
  return arr.length > 0;
}

export const calYearExperience = () => {
  const joiningDate = new Date(JOINING_DATE);
  const currentDate = new Date();
  const year = currentDate.getFullYear() - joiningDate.getFullYear() - 1;
  return `${year}+`;
};
