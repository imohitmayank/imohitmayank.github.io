// Coding Challenge 129: Koch Snowflake
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/129-koch-snowflake.html
// https://youtu.be/X8bXDKqMsXE

let segments = [];

function addAll(arr, list) {
  for (let s of arr) {
    list.push(s);
  }
}

function setup() {
  segments = [];
  var xoffset = 500; 
  var yoffset = 200;
  createCanvas(windowWidth, windowHeight);
  let a = createVector(xoffset + 150, yoffset+0);
  let b = createVector(xoffset + 450, yoffset+0);
  let s1 = new Segment(a, b);

  let len = p5.Vector.dist(a, b);
  let h = len * sqrt(3) / 2;
  let c = createVector(xoffset + 300, yoffset+h);
  
  let s2 = new Segment(b, c);
  let s3 = new Segment(c, a);
  segments.push(s1);
  segments.push(s2);
  segments.push(s3);

  //println(children);
}

function keyTyped() {
  setup();
}

function mousePressed() {
  let nextGeneration = [];

  for (let s of segments) {
    let children = s.generate();
    addAll(children, nextGeneration);
  }
  segments = nextGeneration;
}


function draw() {
  background("#f2f2f2");
  translate(0, 100);

  // stroke(255, 0, 0);
  for (let s of segments) {
    s.show();
  }
}


// Coding Challenge 129: Koch Snowflake
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/129-koch-snowflake.html
// https://youtu.be/X8bXDKqMsXE

class Segment {
  
  constructor(a, b) {
    this.a = a.copy();
    this.b = b.copy();
  }
  
 generate() {
    let children = [];
    
    let v = p5.Vector.sub(this.b, this.a);
    v.div(3);
    
    // Segment 0
    let b1 = p5.Vector.add(this.a, v);
    children[0] = new Segment(this.a, b1);
    
    // Segment 3
    let a1 = p5.Vector.sub(this.b, v);
    children[3] = new Segment(a1, this.b);
    
    v.rotate(-PI/3);
    let c = p5.Vector.add(b1,v);

    // Segment 2
    children[1] = new Segment(b1, c);
    // Segment 3
    children[2] = new Segment(c, a1);
    return children;
  }
  
  show() {
    stroke(0);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

