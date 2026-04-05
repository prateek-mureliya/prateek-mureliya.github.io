import { StaticImageData } from 'next/image';

export type BasicProps = {
  className?: string;
  children?: React.ReactNode;
};

export type BasicOnClick = {
  onClick?: (name: string) => void;
};

export type ImageFile = { src: StaticImageData; alt: string };
export type PDFType = { file: string; name: string };
