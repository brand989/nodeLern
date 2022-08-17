const fs = require('fs')
const http = require('http')
const path = require('path');


(async () => {
    const isFile = fileName => {
        return fs.lstatSync(fileName).isFile()
    }

    http.createServer((req, res) => {

        const fullPath = path.join(process.cwd(), req.url)

        if (!fs.existsSync(fullPath)) return res.end('directory is not found')

        if (isFile(fullPath)) {
            return fs.createReadStream(fullPath).pipe(res)
        }

        let linkList = []

        const urlParams = req.url.match(/[\d\w\.]+/gi)

        if (urlParams) {
            urlParams.pop()
            const prevUrl = urlParams.join('/')
            linkList = urlParams.length ? `<li><a href="/${prevUrl}">..</a></li>` : `<li><a href="/">..</a></li>`

        }

        fs.readdirSync(fullPath)
            .forEach(fileName => {
                const filePath = path.join(req.url, fileName)
                linkList += `<li><a href="${filePath}">${fileName}</a></li>`
            })

        const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8').replace('##links', linkList)

        res.writeHead(200, {
            'Contetn-type': 'text/html',
        })

        return res.end(html)
    }).listen(5555)

})()