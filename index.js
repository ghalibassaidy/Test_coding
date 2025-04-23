const readline = require("readline");
const {
  convertToNumbers,
  mathOps,
  numberToCharSequence,
  transformChars,
  finalNumbers
} = require("./logic");

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Masukan Kalimat: ", function (input) {
    const step1 = convertToNumbers(input);
    console.log("Step 1:", step1.join(' '));

    const step2 = mathOps(step1);
    console.log("Step 2:", step2);

    const step3 = numberToCharSequence(step2);
    console.log("Step 3:", step3.join(' '));

    const step4 = transformChars(step3);
    console.log("Step 4:", step4.join(' '));

    const step5 = finalNumbers(step4);
    console.log("Step 5:", step5.join(' '));

    rl.close();
  });
}

main();