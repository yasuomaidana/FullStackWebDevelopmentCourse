const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const hostname = "localhost";
const port = 3000;

const app =express();

//Import routes
const dishRoutes = require("./routes/dishes/dishRouter");
const promoRoutes = require("./routes/promotions/promotionsRouter");
const leaderRoutes = require("./routes/leaders/leaderRouter");

app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

//Apply routes
app.use("/dishes",dishRoutes);
app.use("/promotions",promoRoutes);
app.use("/leaders",leaderRoutes);

//Create server
const server = http.createServer(app);

//Start server
server.listen(port,hostname,()=>{
  console.log(`Server running at http://${hostname}:${port}/`); 
});