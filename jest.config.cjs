module.exports = {
  testRegex: "./test/.+\\.js$",
  testPathIgnorePatterns: ["/node_modules/", "/test/fixtures/"],
  testEnvironment: "node",
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
};
