import  useModel from './useModel.js';
import fs from 'fs';
import readline from 'readline';

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
}

const testCases = await readJsonlFile('testset.jsonl')

testCases.forEach(async (testCase) => {
    const expectedResult = testCase.messages[2].content;
    const calculatedResult = await useModel(testCase.messages[1].content); 
    console.log('expected: ' + expectedResult + ' | calculated ' + calculatedResult)
})
// const response = await useModel('hello world');
// console.log(response)
