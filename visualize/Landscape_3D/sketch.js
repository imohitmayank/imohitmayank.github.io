let cols , rows;
let scl = 20;
let pi = Math.PI;
let w = window.innerWidth;
let h = window.innerHeight;
var terrain = [];
// var w = 300;
// var h = 300;

var flying = 0;
var flyingFlag=false;
var flatFlag = true;


function setup()
{
    createCanvas(w,h,WEBGL);

    cols = w / scl;
    rows = h / scl;
  
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function mousePressed(){
  flying = 100*random();
}

function keyTyped(){
  if (key=='r'){
    flatFlag = !flatFlag;
  }
  if (key=='a'){
    flyingFlag = !flyingFlag;
  }
}



function draw()
{
  if (flyingFlag){
    flying -= 0.05;
  }
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      if (!flatFlag) {
        terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      }
      else {
        terrain[x][y] = 0;
      }
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  
    background("#f2f2f2");
    translate(0,h/20,0);
    scale(0.4);
    translate(-w/2,-h/2,0);
    rotateX(pi/5);

    stroke(0);
    strokeWeight(0.5);
    // noFill();
  fill(255, 0, 144, 0);
    for(let y =0; y < rows ; y++ )
    {
        beginShape(TRIANGLE_STRIP);
        for(let x = 0; x < cols; x++)
        {
            vertex(x*scl,y*scl, terrain[x][y]);
            vertex(x*scl,(y+1)*scl, terrain[x][y+1]);
        }
        endShape();
    }
}