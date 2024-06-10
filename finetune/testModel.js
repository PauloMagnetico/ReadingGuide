import  useModel from './useModel.js';
import fs from 'fs';
import readline from 'readline';

//Function to read a jsonl file into an array
async function readJsonlFile(filePath) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const lines = [];
    for await (const line of rl) {
        lines.push(JSON.parse(line));
    }
    return lines;
};

//calling the function to load my testcase from the file
const testCases = await readJsonlFile('testset.jsonl')

//evaluating the testcases and logging the result
testCases.forEach(async (testCase) => {
    const expectedResult = testCase.messages[2].content;
    const calculatedResult = await useModel(testCase.messages[1].content); 
    console.log('expected: ' + expectedResult + ' | calculated ' + calculatedResult)
});
