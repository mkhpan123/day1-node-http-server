const http = require("http")
const server = http.createServer((req,res)=>{
        console.log(req.method,req.url);
        res.end("hello");
});
server.listen(3000);