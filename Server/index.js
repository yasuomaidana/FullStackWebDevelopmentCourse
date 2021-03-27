const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const hostname = "localhost";
const port = 3000;

const app =express();
app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

///////// For dishes
app.all('/dishes',(req,res,next)=>{
  res.statusCode = 200;
  res.setHeader("Content-Type","text/plain");
  next();
});

app.get('/dishes' , (req , res,next)=>{
   res.end('Will send dishes')
});

app.post('/dishes' , (req , res,next)=>{
   res.end('Will add the dish :'+req.body.name + '\n with details :'
   +req.body.description);
})

app.put('/dishes',(req,res,next)=>{
  res.status = 403;
  res.end("Put operation not supported for dishes");
});

app.delete('/dishes',(req,res,next)=>{
  res.status = 403;
 res.end("Delete operation not supported for dishes");
});

app.get('/dishes/:dishId' , (req , res,next)=>{
  res.end('Will send details of dish:'+req.params.dishId);
});

app.post('/dishes/:dishId' , (req , res,next)=>{
  res.end('Delete operation not supported for dishes/'+req.params.dishId);
}) 

app.put('/dishes/:dishId',(req,res,next)=>{
 res.write("Updating the dish:"+req.params.dishId+"\n");
 res.end('Will update  the dish :'+req.body.name + '\n with details :'
   +req.body.description);

});

app.delete('/dishes/:dishId',(req,res,next)=>{
  res.end('Will delete dish:'+req.params.dishId);
});
//////// dishes end
app.use((req,res,next)=>{
  //Morgan show something
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');
  
}); 

const server = http.createServer(app);

server.listen(port,hostname,()=>{
  console.log(`Server running at http://${hostname}:${port}/`); 
});