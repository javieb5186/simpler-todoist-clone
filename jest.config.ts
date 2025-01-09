import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^.+\\.css$": "identity-obj-proxy",
    "^.+\\.module\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.[jt]sx?$": "ts-jest",
  },
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
  moduleDirectories: ["node_modules", "src"],
};

export default config;
