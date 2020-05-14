// require dependencies
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const util = require("util");

// declare constants
const EXERCISE_NAME = path.basename(__filename);
const START = Date.now();

// declare logging function
const log = (logId, value) =>
  console.log(`\nlog ${logId} (${Date.now() - START} ms):\n`, value);

// --- main script ---
console.log(`\n--- ${EXERCISE_NAME} ---`);

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const fileName1 = process.argv[2];
const filePath1 = path.join(__dirname, fileName1);
log(1, filePath1);

const fileName2 = process.argv[3];
const filePath2 = path.join(__dirname, fileName2);
log(2, filePath2);

log(3, `reading ${fileName1} ...`);
readFilePromise(filePath1, "utf8")
  .then((fileContents1) => {
    log(4, `reading ${fileName2} ...`);
    readFilePromise(filePath2, "utf-8")
      .then((fileContents2) => {
        log(5, "comparing file contents ...");
        const fileOneIsLonger = fileContents1.length > fileContents2.length;

        if (fileOneIsLonger) {
          log(6, `writing to ${fileName2} ...`);
          writeFilePromise(filePath2, fileContents1).then(() => {
            log(7, `reading ${fileName2} ...`);
            readFilePromise(filePath2, "utf-8").then((newFileContents2) => {
              log(8, "asserting ...");
              assert.strictEqual(fileContents1, newFileContents2);
            });
          });
        } else {
          log(6, `writing to ${fileName1} ...`);
          writeFilePromise(filePath1, fileContents2).then(() => {
            log(7, `reading ${fileName1} ...`);
            readFilePromise(filePath1, "utf-8").then((newFileContents1) => {
              log(8, "asserting ...");
              assert.strictEqual(fileContents2, newFileContents1);
            });
          });
        }

        log(9, "\033[32mpass!\x1b[0m");
        fs.appendFileSync(
          __filename,
          `\n// pass: ${new Date().toLocaleString()}`
        );
      })
      .catch((err) => console.error(err));
  })
  .catch((err) => console.error(err));

// log(3, `reading ${fileName1} ...`);
// const fileContents1 = fs.readFileSync(filePath1, "utf-8");

// log(4, `reading ${fileName2} ...`);
// const fileContents2 = fs.readFileSync(filePath2, "utf-8");

// log(5, "comparing file contents ...");
// const fileOneIsLonger = fileContents1.length > fileContents2.length;
// if (fileOneIsLonger) {
//   log(6, `writing to ${fileName2} ...`);
//   fs.writeFileSync(filePath2, fileContents1);
// } else {
//   log(6, `writing to ${fileName1} ...`);
//   fs.writeFileSync(filePath1, fileContents2);
// }

// if (fileOneIsLonger) {
//   log(7, `reading ${fileName2} ...`);
//   const newFileContents2 = fs.readFileSync(filePath2, "utf-8");
//   log(8, "asserting ...");
//   assert.strictEqual(fileContents1, newFileContents2);
// } else {
//   log(7, `reading ${fileName1} ...`);
//   const newFileContents1 = fs.readFileSync(filePath1, "utf-8");
//   log(8, "asserting ...");
//   assert.strictEqual(fileContents2, newFileContents1);
// }

// log(9, "\033[32mpass!\x1b[0m");
// fs.appendFileSync(__filename, `\n// pass: ${new Date().toLocaleString()}`);

// pass: 5/14/2020, 4:43:59 PM

// pass: 5/14/2020, 4:44:51 PM

// pass: 5/14/2020, 5:32:44 PM
// pass: 5/14/2020, 5:36:11 PM
// pass: 5/14/2020, 5:36:27 PM

// pass: 5/14/2020, 5:39:37 PM
