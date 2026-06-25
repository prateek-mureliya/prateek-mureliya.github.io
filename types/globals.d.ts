import { JSX } from 'react';
export {};

export type TStringElement = string | JSX.Element;

declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent;
  }
  interface Window {
    revealSecrets: () => void;
  }

  declare module '*.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }
}
