module.exports = {
   verbose: true,
   collectCoverage: true,
   collectCoverageFrom: [
   "src/**/*.{js,jsx}",
   ],
   "coverageReporters": [
      "lcov",
   ],
   reporters: [
      "default",
      ["./node_modules/jest-html-reporter", {
         "pageTitle": "Report",
         "outputPath": "./test/report/report.html"
      }]
   ]
};