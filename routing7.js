const http = require("http");

const server = http.createServer((req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`);

    // GET /
    if (req.method === "GET" && url.pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Home Page");
    }

    // GET /users
    else if (req.method === "GET" && url.pathname === "/users") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(["Alice", "Bob"]));
    }

    // POST /users
    else if (req.method === "POST" && url.pathname === "/users") {
        res.writeHead(201, { "Content-Type": "text/plain" });
        res.end("User created");
    }

    // 404
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

server.listen(3000);
