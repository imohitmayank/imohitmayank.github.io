// The Chaos Game Controller
// by, Mohit Mayank
// Inspired by, TheCodingTrain (Daniel Shiffman)
// Part 1: https://youtu.be/7gNzMtYo9n4
// https://thecodingtrain.com/CodingChallenges/123.1-chaos-game
// Part 2: https://youtu.be/A0NHGT̥ggoOQ
// https://thecodingtrain.com/CodingChallenges/123.2-chaos-game

// Game controllers
var controllers = {
  'compressionRatio' : 0.5,
  'verticesCount' : '3',
  'iterations': 100,
  'free_flow_flag' : false,
  'backgroundColor': "#232323",
  // "pointRotation": "0{-45}",
  "notPrevious": false,
  "noAdjacent":false,
  "no2PreviousSame":false,
  'pointStroke': 1
}

// GUI
var settings;

// computational variables
let points;
let current;
let previous;
let earlier;
var rWidth, rHeight;

// init the game controller
function create_game_controller(){
  settings = QuickSettings.create(20, 20, "Chaos Game Controller")
  settings.bindText("verticesCount", controllers.verticesCount, controllers);
  settings.bindRange("compressionRatio", 0.0, 1,controllers.compressionRatio, 0.01, controllers);
  settings.bindRange("pointStroke", 0, 10,controllers.pointStroke, 1, controllers);
  settings.bindDropDown("iterations", [1, 10, 100, 1000, 2000], controllers);
  settings.bindColor("backgroundColor", controllers.backgroundColor, controllers);
  settings.bindBoolean("notPrevious", controllers.notPrevious, controllers);
  settings.bindBoolean("noAdjacent", controllers.chooseClockwise, controllers);
  settings.bindBoolean("no2PreviousSame", controllers.no2PreviousSame, controllers);
  settings.addButton("Go step", go_step_pressed);
  settings.addButton("Go wild!", go_wild_pressed);
  settings.addButton("Reset", reset);
}

// setup the canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  var minDim = min(windowWidth, windowHeight);
  rWidth = minDim;
  rHeight = minDim;
  reset();
  create_game_controller()
}

// reset the game (also init it again)
function reset() {
  // clear all points
  points = [];
  // set background
  background(controllers.backgroundColor);
  // for all vertices draw it
  for (let i = 0; i < controllers.verticesCount; i++) {
    let angle = i * TWO_PI / controllers.verticesCount;
    let v = p5.Vector.fromAngle(angle);
    v.mult((rWidth-50) / 2);
    v.add(250+rWidth/2, rHeight / 2);
    // add to points
    points.push(v);
    // draw points
    strokeWeight(10);
    stroke("#EC7272");
    point(v.x, v.y);
    // textSize(32);
    // fill(0, 102, 153);
    // text(i, v.x+10, v.y+10);
  }
  // create current point
  current = createVector(random(width), random(height));
}

function mod_index(index){
  if (index === -1) return points.length -1;
  return index % points.length;
}

// draw the next set(s) of points
function draw_step(){
  // perform these many iterations
  for (let i = 0; i < controllers.iterations; i++) {
    // set the styling of points
    strokeWeight(controllers.pointStroke);
    // stroke("#EC7272");
    stroke(255);
    // pick next points
    let next = random(points);
    // skip to match condition
    if (controllers.notPrevious && next === previous) continue;
    if (controllers.noAdjacent) {
      var indexOfPrev = points.indexOf(previous)
      if (abs(points.indexOf(next) - indexOfPrev) == 2) continue;
    }
    if (controllers.no2PreviousSame && earlier === previous){
      var indexOfPrev = points.indexOf(previous);
      var indexOfNext = points.indexOf(next);
      if (indexOfNext === mod_index(indexOfPrev-1)) continue;
      if (indexOfNext === mod_index(indexOfPrev+1)) continue;
    }
    // universal step, update current and plot it
    current.x = lerp(current.x, next.x, controllers.compressionRatio);
    current.y = lerp(current.y, next.y, controllers.compressionRatio);
    // if (points.indexOf(next)==0)
    // {
    //   // current = rotation_x.mult(current.x).add(rotation_y.mult(current.y));
    //   current = createVector(
    //     p5.Vector.dot(createVector(0, 1), current),
    //     p5.Vector.dot(createVector(-1, 0), current)
    //   )
    // }
    point(current.x, current.y);
    // current is nesxt
    earlier = previous;
    previous = next;
  }
}

// on mouse press draw point and set it as current
function mousePressed(){
  strokeWeight(controllers.pointStroke);
  stroke(255);
  current = createVector(mouseX, mouseY);
  point(mouseX, mouseY);
}

// step once with specified iteration
function go_step_pressed(){
  draw_step();
}

// step with frame i.e. non-stop
function go_wild_pressed(){
  controllers.free_flow_flag = !controllers.free_flow_flag;
}

// the main draw function
function draw() {
  if (controllers.free_flow_flag) {
    draw_step();
  }

}
