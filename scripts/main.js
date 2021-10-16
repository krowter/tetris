/*
 * constants
 */

const tileSize = 20; // px / tiles
const globalStepRate = 150; // miliseconds
const canvasHeight = 20; // tiles
const canvasWidth = 20; // tiles

/*
 * setup canvas
 */

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

canvas.height = canvasHeight * tileSize;
canvas.width = canvasWidth * tileSize;

// 2D array to keep track of drawn tiles
const bakedTilesCoordinate = [];
for (let height = 0; height < canvasHeight; height++) {
  const row = [];
  for (let width = 0; width < canvasWidth; width++) {
    row.push(0);
  }
  bakedTilesCoordinate.push(row);
}

/*
 * driver function
 */

let newShape;
const spawnNewShape = () => {
  newShape = createShape({ shape: "L", x: 200, y: 0 });
};

function drawFrame(context) {
  clearCanvas(context, bakedTilesCoordinate);

  newShape.draw();
  newShape.checkCollision();
}

spawnNewShape();
setInterval(() => drawFrame(context), globalStepRate);
