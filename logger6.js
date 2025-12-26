const http = require("http");
const server = http.createServer((req,res)=>{
    
    // Log every request
    console.log(`[${req.method}] ${req.url}`);
    
    if(req.url === "/health"){
        if(req.method === "GET"){
            res.writeHead(200,{"Content-Type":"application/json"});
            res.end(JSON.stringify({status:"ok"}));
        }
        else{
            res.writeHead(405,{"Content-Type":"text/plain"});
            res.end("not allowed");
        }
    }
    else{
        res.writeHead(404,{"Content-Type":"text/plain"})
        res.end("404 not found");
    }
})

server.listen(3000, () => {
    console.log("Server running on port 3000");
});