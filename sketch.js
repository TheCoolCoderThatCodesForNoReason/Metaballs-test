alert("If you have a crappy laptop, please make the browser window smaller, it will lag for you.");

let r = 50,
  val,
  grid = [],
  circles = [];
let num = 5;
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < width; i++) {
    grid[i] = [];
    for (let j = 0; j < height; j++) {
      grid[i][j] = 0;
    }
  }
  for (let i = 0; i < num; i++) {
    circles[i] = new Circle();
  }
}

function draw() {
  loadPixels();
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let val = 0;
      for (let k = 0; k < num; k++) {
        val +=
          (circles[k].r * circles[k].r) /
          ((i - circles[k].x) * (i - circles[k].x) +
            (j - circles[k].y) * (j - circles[k].y));
      }
      grid[i][j] = val;
      let v = val * 255;
      let index = 4 * (i + j * width);
      pixels[index + 0] = 0;
      pixels[index + 1] = 0;
      pixels[index + 2] = v;
      pixels[index + 3] = 255;
    }
  }
  for (let i = 0; i < num; i++) {
    circles[i].move();
  }
  updatePixels();
}
class Circle {
  constructor() {
    this.r = random(20, 50);
    this.x = random(this.r, width - this.r);
    this.y = random(this.r, height - this.r);
    this.dx = 2;
    this.dy = 1;
  }
  move() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x >= width - this.r || this.x < this.r) {
      this.dx *= -1;
    }
    if (this.y >= height - this.r || this.y < this.r) {
      this.dy *= -1;
    }
  }
}
