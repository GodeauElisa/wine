let glass;
let startColor;
let endColor;
let lerpAmt = 0;
let direction = 1;
let wine;
let images = [];
let imageIndex = 0;
let vert;
let glassCount = 0;
let sober;

function preload() {
  // Load all 5 PNG images into the images array
  for (let i = 0; i < 5; i++) {
    images[i] = loadImage(`/PNG${i + 1}.png`, () => {
      console.log(`PNG${i + 1}.png loaded successfully`); // Log successful load
    }, (err) => {
      console.error(`Error loading PNG${i + 1}.png: ${err}`); // Log any load errors
    });
  }

  // Load other necessary images
  glass = loadImage("/glass.png");
  wine = loadImage("/VIN.gif");
  vert = loadImage("/petitverre.png");
  sober = loadImage("/sober.png");
}

// Setup canvas and initial colors
function setup() {
  createCanvas(windowWidth, windowHeight);
  startColor = color(245, 190, 10);
  endColor = color(19, 17, 55);
}

// Draw function (runs 60 times a second)
function draw() { 
  let bgColor = lerpColor(startColor, endColor, lerpAmt);
  background(bgColor);
  lerpAmt += 0.001575 * direction;
  if (lerpAmt > 1 || lerpAmt < 0) {
    direction *= -1;
    lerpAmt = constrain(lerpAmt, 0, 1); 
  }

  // Display the glass and wine images
  image(glass, 55 , 190, 300, 600);
  image(wine, 20, 190, 900, 560);

  // Display the current image from the images array based on imageIndex
  if (imageIndex < images.length) {
    image(images[imageIndex], 300, 0);
  }

  // Display additional small images (vert) for each glass
  for (let i = 0; i < glassCount; i++) {
    image(vert, 10 + i * 70, 10, 60, 90); 
  }

  // Display the Sober button with hover effect
  let soberSize = 320;
  let soberX = width - soberSize - 10;
  let soberY = 10;

  if (
    mouseX >= soberX && mouseX <= soberX + soberSize &&
    mouseY >= soberY && mouseY <= soberY + soberSize
  ) {
    push();
    tint(255, 180); // Apply transparency to the sober button
    image(sober, soberX - 5, soberY - 5, soberSize + 10, soberSize + 10);
    pop();
  } else {
    image(sober, soberX, soberY, soberSize, soberSize);
  }
}

// Handle mousePressed to increment the imageIndex
function mousePressed() {
  let soberSize = 320;
  let soberX = width - soberSize - 10;
  let soberY = 10;

  // If clicked on the Sober button, reload the page
  if (
    mouseX >= soberX && mouseX <= soberX + soberSize &&
    mouseY >= soberY && mouseY <= soberY + soberSize
  ) {
    location.reload();
    return;
  }

  // Increment imageIndex to show the next image in the sequence
  if (imageIndex < images.length - 1) {
    imageIndex++;
  }

  wine = loadImage("VIN.gif");
  glassCount++;
}