export {};

declare global {
  interface WindowEventMap {
    "local-storage": CustomEvent;
  }
  interface Window {
    revealSecrets: () => void;
  }
}
