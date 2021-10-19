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
      testMatch: ["<rootDir>/**/*.spec.tsx"]
    },
    {
      displayName: "Node",
      testEnvironment: "node",
      testMatch: ["<rootDir>/**/*.spec.ts"]
    }
  ]
}

export default config
