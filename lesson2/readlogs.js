const fs = require('fs')
const readline = require('readline')


const writeStream1 = fs.createWriteStream('./access-127.0.1.10.log', 'utf8');
const writeStream5 = fs.createWriteStream('./access-127.0.1.5.log', 'utf8');

const readStream = fs.createReadStream('./access.log', {
    encoding: 'utf8',
   highWaterMark: 32
})

readStream.on('error', () => console.log(err))

const rl = readline.createInterface({
    input: readStream
})

rl.on('line', (line) => {
    if (line.includes("127.0.1.10")) {
        writeStream1.write(line + "\n");

    }

    if (line.includes("127.0.1.5")) {
        writeStream5.write(line + "\n");
    }


})

