/*
rect defined inside
var rect = {
	perimeter: (x, y) => (2*(x+y)),
	area: (x, y) => (x*y)
};
*/

// Imports variable
//const rectangle = require('./rectangle');
var rect = require('./rectangle');

/* Using exports
function solveRect(l,b) {
    console.log("Solving for rectangle with l = " + l + " and b = " + b);

    if (l <= 0 || b <= 0) {
        console.log("Rectangle dimensions should be greater than zero:  l = "
               + l + ",  and b = " + b);
    }
    else {
	    console.log("The area of the rectangle is " + rect.area(l,b));
	    console.log("The perimeter of the rectangle is " + rect.perimeter(l,b));
    }
}*/

//Using module
function solveRect(l,b) {
    console.log("Solving for rectangle with l = " + l + " and b = " + b);
    rect(l,b,(err,rectangle)=>{
        if(err){ console.log("Error for rectangle of l: "+l+" and b: "+b);}
        else{
            console.log("For recangle of l:"+l+" and b: "+b);
            console.log("Area: "+rectangle.area());
            console.log("Permimeter: "+rectangle.perimeter());
        }
    });
}

solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-3,5);