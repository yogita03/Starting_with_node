const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) =>{
    res.setHeader('Content-Type','text/html')
    if(req.url === '/message' && req.method === 'POST'){
        const body = [];
        req.on('data' , (chunk)=>{
            body.push(chunk);
        })
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message =  parsedBody.split('=')[1];
            fs.writeFileSync('message.txt' , message);

        })
        res.statusCode = 302 ;
        res.setHeader('Location' , '/')
        return res.end();
    }
    else{
        fs.readFile('./message.txt', 'utf8', (err, data) => {
            if (err) {
              res.statusCode = 500;
              res.end('Error reading the file.');
              return;
            }
            res.statusCode = 200;
            res.write("<html><head></head><body>")
            res.write("<p>")
            res.write(data)
            res.write("</p>")
            res.write("<form action='/message' method='POST'><input name='message'></input><button type='submit'> send </button></form>")
            res.write('</body></html>')
            return res.end();
          })
       
    }
    
})

server.listen(3000)
