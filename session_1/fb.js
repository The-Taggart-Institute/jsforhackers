// Import argv
const { argv } = require('node:process');
// Get fbSteps
const fbSteps = parseInt(argv[2]) || 10;

function fizzBuzz(n) {
    if(n % 15 == 0) {
        return "FizzBuzz";
    } else if (n % 5 == 0) {
        return "Buzz";
    } else if (n % 3 == 0) {
        return "Fizz";
    } else {
        return n.toString();
    }
}

for (let i=1; i<=fbSteps; i++) {
    // let fbRes = fizzBuzz(i);
    console.log(`${fizzBuzz(i)}!`);
}