const drawTile = (context, x, y) => {
  context.beginPath();
  context.rect(x, y, TILE_SIZE, TILE_SIZE);
  context.fill();
};

// draw shapes based on _shape param: L or I
const drawShape = (context, _shape, x, y) => {
  const shape = shapes[_shape];

  shape.forEach(([deltaX, deltaY]) => {
    drawTile(context, x + deltaX * TILE_SIZE, y + deltaY * TILE_SIZE);
  });

  return shape;
};

// draw tiles into bakedTilesCoordinate so it gets drawn on next clearCanvas
const bakeTiles = (bakedTilesCoordinate, tilesCoordinate) => {
  tilesCoordinate.forEach(tile => {
    bakedTilesCoordinate[tile[1] - 1 + 1][tile[0]] = 1;
  });
};

const isColliding = (bakedTilesCoordinate, tiles) => {
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];

    // collision with bottom of canvas
    if ((tile[1] + 2) * TILE_SIZE > canvas.height) {
      return true;
    }

    // collision with another tile
    if (bakedTilesCoordinate[tile[1] + 1][tile[0]] === 1) {
      return true;
    }
  }
};

const handleCollision = (bakedTilesCoordinate, tilesCoordinate) => {
  bakeTiles(bakedTilesCoordinate, tilesCoordinate);
  spawnNewShape();

  const points = checkTilesForPoints(bakedTilesCoordinate);

  if (points) {
    const currentPoint = document.getElementById("points").textContent;
    document.getElementById("points").innerHTML =
      parseInt(currentPoint) + points;
  }
};

// clear canvas for redrawing and draw baked tiles
const clearCanvas = (context, bakedTilesCoordinate) => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  bakedTilesCoordinate.forEach((row, rowIndex) => {
    row.forEach((tile, columnIndex) => {
      if (tile === 1) {
        const positionX = columnIndex * TILE_SIZE;
        const positionY = rowIndex * TILE_SIZE;

        drawTile(context, positionX, positionY);
      }
    });
  });
};

const checkTilesForPoints = bakedTilesCoordinate => {
  let fullRowIndexes = [];

  for (let i = 0; i < bakedTilesCoordinate.length; i++) {
    const row = bakedTilesCoordinate[i];

    if (row.every(tile => tile === 1)) {
      fullRowIndexes.push(i);
    }
  }

  const emptyRow = Array.from(Array(CANVAS_WIDTH)).map(() => 0);
  fullRowIndexes.forEach(index => {
    bakedTilesCoordinate.splice(index, 1);
    bakedTilesCoordinate.unshift(emptyRow);
  });

  // use canvas width as points, ie 20 tiles worth 20 points
  return CANVAS_WIDTH * fullRowIndexes.length;
};

// create a shape and return callback to draw it
const createShape = ({ shape, x, y }) => {
  let positionY = y,
    positionX = x,
    rotation = 0,
    tiles = [];

  document.body.addEventListener("keydown", event => {
    if (event.key === "ArrowRight") {
      positionX += TILE_SIZE;
    }
    if (event.key === "ArrowLeft") {
      positionX -= TILE_SIZE;
    }
    if (event.key === "ArrowUp") {
      rotation += 90;
      rotation %= 360;
    }
    if (event.key === "ArrowDown") {
      globalStepRate.setToFast();
    }
  });

  document.body.addEventListener("keyup", event => {
    if (event.key === "ArrowDown") {
      globalStepRate.reset();
    }
  });

  return {
    draw: () => {
      positionY += TILE_SIZE;
      tiles = drawShape(context, shape + rotation, positionX, positionY);
    },
    checkCollision: () => {
      const tilesCoordinate = tiles.map(tile => [
        tile[0] + positionX / TILE_SIZE,
        tile[1] + positionY / TILE_SIZE
      ]);

      if (isColliding(bakedTilesCoordinate, tilesCoordinate)) {
        handleCollision(bakedTilesCoordinate, tilesCoordinate);
      }
    }
  };
};

const pickRandomItem = array => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
