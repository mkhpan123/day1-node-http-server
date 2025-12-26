const http = require("http");

function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}

function sendText(res, statusCode, message) {
    res.writeHead(statusCode, { "Content-Type": "text/plain" });
    res.end(message);
}

const server = http.createServer((request, response) => {
    const { method, url, headers } = request;
    const parsedUrl = new URL(url, `http://${headers.host}`);

    console.log(`[${method}] ${parsedUrl.pathname}`);

    // ✅ GET /
    if (method === "GET" && parsedUrl.pathname === "/") {
        return sendText(response, 200, "Home Page");
    }

    // ✅ GET /users
    if (method === "GET" && parsedUrl.pathname === "/users") {
        return sendJSON(response, 200, ["Alice", "Bob"]);
    }

    // ✅ GET /health
    if (method === "GET" && parsedUrl.pathname === "/health") {
        return sendJSON(response, 200, { status: "ok" });
    }

    // ✅ POST /users
    if (method === "POST" && parsedUrl.pathname === "/users") {
        let body = "";

        request.on("data", chunk => {
            body += chunk;
        });

        request.on("end", () => {
            try {
                const data = JSON.parse(body);
                console.log("Received data:", data);

                sendJSON(response, 201, {
                    message: "User created",
                    user: data
                });
            } catch {
                sendText(response, 400, "Invalid JSON");
            }
        });

        return; // ⬅️ IMPORTANT
    }

    // ❌ No route matched
    return sendText(response, 404, "Not Found");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
