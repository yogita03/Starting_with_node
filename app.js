const http = require('http');

const server = http.createServer((req,res) =>{
    // console.log('Hello, my name is Yogita');
    res.end(`Hello, my name is Yogita`);

});
server.listen(4000);


