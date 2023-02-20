let socket = io("http://localhost:5050", { path: '/real-time' })
let canvas;
let controllerX, controllerY = 0;

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
    controllerX = windowWidth / 2;
    controllerY = windowHeight / 2;
    background(0);
}

function draw() {
    background(0,5);
    newCursor(pmouseX, pmouseY);
    fill(255);
    ellipse(controllerX, controllerY, 50, 50)

}

function mouseDragged() {
    console.log(`pos X: ${pmouseX}, Pos Y: ${pmouseY}`);
    let msn = {controlX :pmouseX, controlY : pmouseY}
    socket.emit("positions", msn);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor(x, y) {
    noStroke();
    fill(255);
    ellipse(x, y, 10, 10);
}

//Add an .on() event on the socket

socket.on("display-positions", msn => {
    console.log(msn);
    let { controlX, controlY} = msn;
    controllerX = controlX;
    controllerY = controlY;
});