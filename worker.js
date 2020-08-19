const http = require('http');
const pid = process.pid;
const port = process.env.PORT || 8001;

http.createServer((req, res) => {

    //ANY HEAVY TASK
    for (let i = 0; i < 1e7; i++) { }

    res.end(`Server created\n`)
}).listen(port, () => {
    console.log(`Server started. PID: ${pid}  PORT: ${port}`)
})