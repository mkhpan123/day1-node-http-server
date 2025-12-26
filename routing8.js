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
    // GET /health
    else if (req.method === "GET" && url.pathname === "/health") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "ok" }));
    }

    // POST /users

    //     else if (req.method === "POST" && url.pathname === "/users") {
    //     res.writeHead(201, { "Content-Type": "text/plain" });
    //     res.end("User created");
    // }

    else if (req.method === "POST" && url.pathname === "/users") {

        let body = "";

        // receive data chunks
        req.on("data", chunk => {
            body += chunk;
        });

        // all data received
        req.on("end", () => {
            try {
                const data = JSON.parse(body);
                console.log("Received data:", data);

                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    message: "User created",
                    user: data
                }));
            } catch (err) {
                res.writeHead(400, { "Content-Type": "text/plain" });
                res.end("Invalid JSON");
            }
        });
    }



    // 404
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

server.listen(3000);
