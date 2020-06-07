var len = 500;
var counter = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  reset();
}

function draw() {
  // divide(width / 2 - len / 2, height / 2 + len * sqrt(3) / 4, len, 1, 10);
}

function reset(){
  background("#F2F2F2");
  noStroke();
  fill(50);
}

function keyTyped(){
 if (key == 'r'){
   reset();
   counter = 1;
 }
}
function mouseClicked(event) {
  // if(event.button === 1) {
    reset();
        divide(width / 2 - len / 2, height / 2 + len * sqrt(3) / 4, len, 1, counter);
  counter += 1;
    // }
    // if(event.button === 2) {
    //     // rightPressed = true;
    //   reset();
    // }
}
function divide(x, y, l, lvl, max) {
  if (lvl == max) {
    tri(x, y, l);
  } else {
    divide(x, y, l / 2, lvl + 1, max);
    divide(x + l / 2, y, l / 2, lvl + 1, max);
    divide(x + l / 4, y - l * sqrt(3) / 4, l / 2, lvl + 1, max);
  }
}

function tri(x, y, l) {
  triangle(x, y, x + l / 2, y - l * sqrt(3) / 2, x + l, y);
}
// }