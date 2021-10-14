/*
 * constants
 */

const tileSize = 40; // px / tiles
const globalStepRate = 300; // miliseconds
const canvasHeight = 10; // tiles
const canvasWidth = 10; // tiles

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

bakedTilesCoordinate[7][9] = 1;

/*
 * driver function
 */

function drawFrame(context) {
  clearCanvas(context, bakedTilesCoordinate);
  newTile.draw();

  setTimeout(() => drawFrame(context), globalStepRate);
}

let newTile;
const spawnNewTile = () => {
  newTile = createObject({ x: 200, y: 0 });
};

spawnNewTile();
drawFrame(context);
