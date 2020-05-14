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

// async-await
const writeReadAssert = async () => {
  try {
    log(3, `reading ${fileName1} ...`);
    const fileContents1 = await readFilePromise(filePath1, "utf-8");

    log(4, `reading ${fileName2} ...`);
    const fileContents2 = await readFilePromise(filePath2, "utf-8");

    log(5, "comparing file contents ...");
    const fileOneIsLonger = fileContents1.length > fileContents2.length;
    if (fileOneIsLonger) {
      log(6, `writing to ${fileName2} ...`);
      await writeFilePromise(filePath2, fileContents1);
    } else {
      log(6, `writing to ${fileName1} ...`);
      await writeFilePromise(filePath1, fileContents2);
    }
    if (fileOneIsLonger) {
      log(7, `reading ${fileName2} ...`);
      const newFileContents2 = await readFilePromise(filePath2, "utf-8");
      log(8, "asserting ...");
      assert.strictEqual(fileContents1, newFileContents2);
    } else {
      log(7, `reading ${fileName1} ...`);
      const newFileContents1 = await readFilePromise(filePath1, "utf-8");
      log(8, "asserting ...");
      assert.strictEqual(fileContents2, newFileContents1);
    }
    log(9, "\033[32mpass!\x1b[0m");
    fs.appendFileSync(__filename, `\n// pass: ${new Date().toLocaleString()}`);
  } catch (err) {
    console.error(err);
  }
};
writeReadAssert();

log(3, `reading ${fileName1} ...`);
const fileContents1 = fs.readFileSync(filePath1, "utf-8");

log(4, `reading ${fileName2} ...`);
const fileContents2 = fs.readFileSync(filePath2, "utf-8");

log(5, "comparing file contents ...");
const fileOneIsLonger = fileContents1.length > fileContents2.length;
if (fileOneIsLonger) {
  log(6, `writing to ${fileName2} ...`);
  fs.writeFileSync(filePath2, fileContents1);
} else {
  log(6, `writing to ${fileName1} ...`);
  fs.writeFileSync(filePath1, fileContents2);
}

if (fileOneIsLonger) {
  log(7, `reading ${fileName2} ...`);
  const newFileContents2 = fs.readFileSync(filePath2, "utf-8");
  log(8, "asserting ...");
  assert.strictEqual(fileContents1, newFileContents2);
} else {
  log(7, `reading ${fileName1} ...`);
  const newFileContents1 = fs.readFileSync(filePath1, "utf-8");
  log(8, "asserting ...");
  assert.strictEqual(fileContents2, newFileContents1);
}

log(9, "\033[32mpass!\x1b[0m");
fs.appendFileSync(__filename, `\n// pass: ${new Date().toLocaleString()}`);

// pass: 5/14/2020, 11:57:29 AM
// pass: 5/14/2020, 11:57:29 AM
// pass: 5/14/2020, 11:57:58 AM
// pass: 5/14/2020, 11:57:58 AM