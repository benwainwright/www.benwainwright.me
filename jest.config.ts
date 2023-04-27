
const config = {
  resetMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx,js}"],
  projects: [
    {
      displayName: "JSDOM",
      testEnvironment: "jsdom",
      transform: {
        "^.+\\.(svg|css|png|jpg)$": "jest-transform-stub",
        "^.+\\.[jt]sx?$": "<rootDir>/jest-preprocess.js"
      },
      setupFilesAfterEnv: ["<rootDir>/test-setup.ts"],
      testMatch: ["<rootDir>/**/*.spec.tsx"]
    },
    {
      displayName: "Node",
      setupFilesAfterEnv: ["<rootDir>/test-setup.ts"],
      testEnvironment: "node",
      testMatch: ["<rootDir>/**/*.spec.ts"]
    }
  ]
}

export default config
