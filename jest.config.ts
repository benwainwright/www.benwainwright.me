import { Config } from "@jest/types"

const config: Config.InitialOptions = {
  resetMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx,js}"],
  projects: [
    {
      displayName: "JSDOM",
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/test-setup.ts"],
      testMatch: ["<rootDir>/**/*.spec.tsx"],
    },
    {
      displayName: "Node",
      setupFilesAfterEnv: ["<rootDir>/test-setup.ts"],
      testEnvironment: "node",
      testMatch: ["<rootDir>/**/*.spec.ts"],
    },
  ],
}

export default config
