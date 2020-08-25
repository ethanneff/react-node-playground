declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    SESSION_SECRET: string;
    REDIS_URL: string;
    SESSION_SECRET: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
  }
}
