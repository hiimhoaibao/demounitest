const config = {
  collectCoverageFrom: ["<rootDir>/src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  globals: {
    __DEV__: true,
    __RCTProfileIsProfiling: false,
  },
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["js", "mjs", "jsx", "ts", "tsx", "json"],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  notify: true,
  notifyMode: "success-change",
  resetMocks: true,
  roots: ["<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/jest/setupTests.ts"],
  testEnvironment: "jsdom",
  testMatch: [
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
  ],
  transform: {
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)":
      "<rootDir>/jest/fileTransform.js",
    "^.+\\.[jt]sx?$": "esbuild-jest",
    "^.+\\.css$": "<rootDir>/jest/cssTransform.js",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  verbose: true,
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};

module.exports = config;
