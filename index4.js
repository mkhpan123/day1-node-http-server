const http = require("http");

const server = http.createServer((req, res) => {

    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Home Page");
    }

    else if (req.url === "/api/user" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            id: 1,
            name: "User",
            role: "Student"
        }));
    }

    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
