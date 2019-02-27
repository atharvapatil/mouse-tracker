// Open and connect output socket
let socket = io('/watcher');

// Listen for confirmation of connection
socket.on('connect', function() {
  console.log("Connected");
});

// Keep track of users
let users = {};

// Create new user in the middle
function createNewUser(id) {
  users[id] = {
    users[id] = {
      pos: {
          x : mouseX,
          y : mouseY
        },
      r : 220,
      g : 220,
      b : 220,
      alpha: 20
    }
  }
}


function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);

  socket.on('move', function (message) {
  console.log(message);
  let id = message.id;
  let data = message.data;

  // let vel = { x: data.x/10, y: data.y/10 };

  // Create new user
  if (!(id in users)) {
    createNewUser(id);
  }


  // Update user data
  // Location of nose
  let user = users[id];
  // Current position becomes previous position
  user.x = data.x;
  user.y = data.y;
  user.r = data.r;
  user.g = data.g;
  user.b = data.b;
  user.alpha = data.alpha;

  blip(user.pos.x, user.pos.y, user.r, user.g, user.b, user.alpha);
});

}
function blip(userX, userY,r,g,b,alpha) {
  noStroke();
  fill(r,g,b,alpha);
  ellipse(userX, userY, 20, 20);
}
