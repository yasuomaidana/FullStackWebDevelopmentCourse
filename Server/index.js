//http library
const http = require('http');
//file sistem library
const fs = require('fs');
//path module
const path = require('path');

//Configuration of server
const hostname = 'localhost';
const port = 3000;

//Simple response server
/*
const server = http.createServer((req, res) => {
    console.log("Request for "+req.url+" by method "+req.method);
    if(req.method == 'GET'){
         var fileURL;
         if (req.url == "/"){ fileURL = "/index.html"}
         else{fileURL =req.url}

         var filePath = path.resolve("./public"+fileURL);
         const fileExt = path.extname(filePath);
         if(fileExt == ".html "){
              fs.stat(filePath,(exists)=>{
                  if(!exists) { 
                      res.statusCode = "404";
                      res.setHeader("Content-Type","text/html");
                      res.end('<html><body><h1>Error 404: ' + fileUrl + 
                      ' not found</h1></body></html>');
                      return; 
                    }
                  res.statusCode="202";
                  res.setHeader("Content-Type","text/html");
                  fs.createReadStream(filePath).pipe(res);

              });
         }
         else{
            res.statusCode = "404";
            res.setHeader("Content-Type","text/html");
            res.end('<html><body><h1>Error 404: ' + fileUrl + 
            ' not an html file</h1></body></html>');
            return; 
         }
    }else{
        res.statusCode = "404";
        res.setHeader("Content-Type","text/html");
        res.end('<html><body><h1>Error 404: ' + req.method + 
        ' not supported </h1></body></html>');
        return; 
    }
})*/
const server = http.createServer((req, res) => {
    console.log('Request for ' + req.url + ' by method ' + req.method);
  
    if (req.method == 'GET') {
      var fileUrl;
      if (req.url == '/') fileUrl = '/index.html';
      else fileUrl = req.url;
  
      var filePath = path.resolve('./public'+fileUrl);
      const fileExt = path.extname(filePath);
      if (fileExt == '.html') {
        fs.exists(filePath, (exists) => {
          if (!exists) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + fileUrl + 
                        ' not found</h1></body></html>');
            return;
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          fs.createReadStream(filePath).pipe(res);
        });
      }
      else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + fileUrl + 
                ' not a HTML file</h1></body></html>');
      }
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method + 
                ' not supported</h1></body></html>');
    }
  });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});