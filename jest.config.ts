export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/src/test/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/test/__mocks__/fileMock.js",
    "features/(.*)": "<rootDir>/src/features/$1",
    "shared/(.*)": "<rootDir>/src/shared/$1",
  },
  moduleDirectories: ["<rootDir>/node_modules", "<rootDir>/src"],
  //   modulePaths: ["src/"],
};
