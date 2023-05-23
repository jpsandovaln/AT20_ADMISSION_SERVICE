module.exports = {
  verbose: true,
  reporters: [
      "default",
      ["./node_modules/jest-html-reporter", {
      "pageTitle": "Report",
      "outputPath": "./test/report/report.html"
      }]
   ]
};