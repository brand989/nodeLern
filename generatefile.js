const fs = require('fs');


const accessLog = './access.log'
const writeStreamLogs = fs.createWriteStream(accessLog, {
    encoding: 'utf8',
    flags: 'a'
});

let ip = 2


let funcWrite = async () => new Promise((res, rej) => writeStreamLogs.write(`"127.0.1.${ip}"- - [25/May/2021:00:07:24 +0000] "POST /baz HTTP/1.1" 200 0 "-" "curl/7.47.0" \n`))

const addLogg = async () => {
    ip += 1

    funcWrite()

    if (fs.lstatSync('./access.log').size < 10000) {
        addLogg()
    } else {
        writeStreamLogs.end(() => console.log("файл загружен"))
    }
}


addLogg()