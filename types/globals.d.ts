export {}

declare global {
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
