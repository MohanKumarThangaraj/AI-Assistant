declare module "speak-tts" {
  export default class Speech {
    constructor();
    init(options?: {
      volume?: number;
      lang?: string;
      rate?: number;
      pitch?: number;
      voice?: string;
      splitSentences?: boolean;
    }): Promise<void>;
    hasBrowserSupport(): boolean;
    speak(options: { text: string }): void;
    cancel(): void;
    pause(): void;
    resume(): void;
  }
}
