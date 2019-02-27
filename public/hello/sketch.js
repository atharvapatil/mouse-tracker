// Event reference for the input: https://p5js.org/reference/#/p5.Element/mouseMoved

// Letting the front end side know to listen to the information being transffered over different  clients
let socket = io();
let alpha;
let r, g, b;


function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);

  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
  });

  socket.on('move', drawPos);

  alpha = random(90, 100);
  r = random(255);
  g = random(255);
  b = random(255);
}

function mouseMoved() {

  // Send information out from the client side to server side to communicate with other client instances.
  // In this case the data being communicated is mouse position
  socket.emit('move',  {x: mouseX, y: mouseY, r, g, b, alpha});

}

// Callback to draw position when new position is received
function drawPos(move) {

  noStroke();
  fill(move.r, move.g, move.b, move.alpha);
  ellipse(move.x, move.y, 20, 20);
}
