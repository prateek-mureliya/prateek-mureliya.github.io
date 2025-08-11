export {}

declare global {
    interface WindowEventMap {
        'local-storage': CustomEvent
    }
    interface Window {
        revealSecrets: () => void;
    }
    namespace NodeJS {
        interface ProcessEnv {
            GITHUB_PROFILE: string;
            SECRET: string;
        }
    }
}
