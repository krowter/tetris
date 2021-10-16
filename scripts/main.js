/*
 * constants
 */

const tileSize = 20; // px / tiles
const canvasHeight = 20; // tiles
const canvasWidth = 20; // tiles

const defaultStepRate = 300; // miliseconds
const globalStepRate = (() => {
  let current = defaultStepRate;

  return {
    get value() {
      return current;
    },
    setTo(value) {
      current = value;
    },
    reset() {
      current = defaultStepRate;
    }
  };
})();

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
  const shapes = ["L", "I", "S", "Z"];
  newShape = createShape({ shape: pickRandomItem(shapes), x: 200, y: 0 });
};

function drawFrame(context) {
  clearCanvas(context, bakedTilesCoordinate);

  newShape.draw();
  newShape.checkCollision();

  setTimeout(() => drawFrame(context), globalStepRate.value);
}

spawnNewShape();
drawFrame(context);
