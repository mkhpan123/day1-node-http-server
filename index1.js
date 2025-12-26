// const http = require("http");

// const server = http.createServer((req, res) => {
//     res.end("Hello World");
// });

// server.listen(3000);

const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req.method);
    console.log(req.url);

    res.end("Request received");
});

server.listen(3000);
