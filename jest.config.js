module.exports = {
  preset: "ts-jest",
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "lib",
  testRegex: ".*\\.spec\\.ts$",
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  jestTimeout: 10000,
};
