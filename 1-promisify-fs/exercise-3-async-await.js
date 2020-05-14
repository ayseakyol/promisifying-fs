// require dependencies
const fs = require(`fs`);
const path = require(`path`);
const assert = require(`assert`);
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
const appendFilePromise = util.promisify(fs.appendFile);

const fileName1 = process.argv[2];
const fileToRead = path.join(__dirname, fileName1);
log(1, fileToRead);

const fileName2 = process.argv[3];
const fileToAppend = path.join(__dirname, fileName2);
log(2, fileToAppend);

// async-await
const appendAssert = async () => {
  try {
    log(3, `reading original contents from ${fileName2} ...`);
    const oldContents = await readFilePromise(fileToAppend, "utf-8");

    log(4, `reading from ${fileName1} ...`);
    const contentToAppend = await readFilePromise(fileToRead, "utf-8");

    log(5, `writing to ${fileName2} ...`);
    await appendFilePromise(fileToAppend, contentToAppend);

    log(6, `reading from ${fileName2} ...`);
    const newContent = await readFilePromise(fileToAppend, "utf-8");

    log(7, `asserting ...`);
    assert.strictEqual(newContent, oldContents + contentToAppend);

    log(8, "\033[32mpass!\x1b[0m");
    fs.appendFileSync(__filename, `\n// pass: ${new Date().toLocaleString()}`);
  } catch (err) {
    console.error(err);
  }
};
appendAssert();

// log(3, `reading original contents from ${fileName2} ...`);
// fs.readFile(fileToAppend, `utf-8`, (err, oldContents) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   log(4, `reading from ${fileName1} ...`);
//   fs.readFile(fileToRead, `utf-8`, (err, contentToAppend) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     log(5, `writing to ${fileName2} ...`);
//     fs.appendFile(fileToAppend, contentToAppend, (err) => {
//       if (err) {
//         console.error(err);
//         return;
//       }

//       log(6, `reading from ${fileName2} ...`);
//       fs.readFile(fileToAppend, `utf-8`, (err, newContent) => {
//         if (err) {
//           console.error(err);
//           return;
//         }

//         log(7, `asserting ...`);
//         assert.strictEqual(newContent, oldContents + contentToAppend);
//         log(8, "\033[32mpass!\x1b[0m");
//         fs.appendFileSync(
//           __filename,
//           `\n// pass: ${new Date().toLocaleString()}`
//         );
//       });
//     });
//   });
// });

// pass: 5/14/2020, 2:15:13 AM