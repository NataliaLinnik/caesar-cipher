var http = require("http");
const fs = require("fs");
const pipeline = util.promisify(stream.pipeline);
const { program } = require("commander");
const cipher = require("./test");

program.storeOptionsAsProperties(true);

program
  .option("-s, --shift <number>", "a number for shifting")
  .option("-i, --input <file>", "an input file")
  .option("-o, --output <file>", "an output file")
  .option("-a, --action <type>", "an action encode/decode");

program.parse(process.argv);

// fs.writeFile("output.txt", decodedText, err => {
//   console.log("ERROR: TODO: WRITE THE RIGHT TEXT");
// });

async function run() {
  await pipeline(
    fs.createReadStream(program.input),
    async function (source) {
      if (program.shift && program.input && program.action) {
        const decodedText = cipher(
          program.input,
          program.shift,
          program.action
        );
      }
    },
    fs.createWriteStream(program.output)
  );
  console.log("Pipeline succeeded.");
}

run().catch(console.error);
