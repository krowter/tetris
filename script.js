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
/*
 * drawing functions
 */

const drawShape = shapeCreator(context);

// clear canvas for redrawing and draw baked tiles
const clearCanvas = (context, bakedTilesCoordinate) => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  bakedTilesCoordinate.forEach((row, rowIndex) => {
    row.forEach((tile, columnIndex) => {
      if (tile === 1) {
        const positionX = (rowIndex + 1) * tileSize;
        const positionY = (columnIndex + 1) * tileSize;

        context.beginPath();
        context.rect(positionX, positionY, tileSize, tileSize);
        context.stroke();
      }
    });
  });
};

const createObject = ({ x, y }) => {
  let positionY = y;

  return {
    draw: () => {
      // calculate collision in y-direction
      if (positionY + 2 * tileSize > canvas.height) {
        positionY = canvas.height - tileSize;
      } else {
        positionY += tileSize;
      }

      drawShape("I", x, positionY);
    },
    bakeToCanvas: () => {}
  };
};

let newTile;
const spawnNewTile = () => {
  newTile = createObject({ x: 200, y: 0 });
};

function drawFrame() {
  clearCanvas(context, bakedTilesCoordinate);
  newTile.draw();

  setTimeout(drawFrame, globalStepRate);
}

spawnNewTile();
drawFrame();
