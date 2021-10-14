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

bakedTilesCoordinate[9][5] = 1;
bakedTilesCoordinate[8][5] = 1;

/*
 * driver function
 */

let newTile;
const spawnNewTile = () => {
  newTile = createObject({ shape: "I", x: 200, y: 0 });
};

function drawFrame(context) {
  clearCanvas(context, bakedTilesCoordinate);
  const { shape, position } = newTile.draw();

  const tilesCoordinate = shape.map(tile => [
    tile[0] + position.x / tileSize,
    tile[1] + position.y / tileSize
  ]);

  setTimeout(() => {
    if (isColliding(bakedTilesCoordinate, tilesCoordinate)) {
      spawnNewTile();
      bakeTiles(bakedTilesCoordinate, tilesCoordinate);
    }

    drawFrame(context);
  }, globalStepRate);
}

spawnNewTile();
drawFrame(context);
