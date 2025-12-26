const http = require("http");

const server = http.createServer((req, res) => {

    if (req.url === "/" && req.method === "GET") {
        res.end("Home Page");
    }
    else if (req.url === "/about" && req.method === "GET") {
        res.end("About Page");
    }
    else {
        res.statusCode = 404;
        res.end("404 Not Found");
    }

});

server.listen(3000);
