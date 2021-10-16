const drawTile = (context, x, y) => {
  context.beginPath();
  context.rect(x, y, tileSize, tileSize);
  context.stroke();
};

// draw shapes based on _shape param: L or I
const drawShape = (context, _shape, x, y) => {
  const shape = shapes[_shape];

  shape.forEach(([deltaX, deltaY]) => {
    drawTile(context, x + deltaX * tileSize, y + deltaY * tileSize);
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
    if ((tile[1] + 2) * tileSize > canvas.height) {
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
        const positionX = columnIndex * tileSize;
        const positionY = rowIndex * tileSize;

        drawTile(context, positionX, positionY);
      }
    });
  });
};

const checkTilesForPoints = bakedTilesCoordinate => {
  for (let i = 0; i < bakedTilesCoordinate.length; i++) {
    const row = bakedTilesCoordinate[i];

    if (row.every(tile => tile === 1)) {
      bakedTilesCoordinate.pop();

      const emptyRow = Array.from(Array(canvasWidth)).map(() => 0);

      bakedTilesCoordinate.unshift(emptyRow);
      return canvasWidth;
    }
  }

  return null;
};

// create a shape and return callback to draw it
const createShape = ({ shape, x, y }) => {
  let positionY = y,
    positionX = x,
    rotation = 0,
    tiles = [];

  document.body.addEventListener("keydown", event => {
    if (event.key === "ArrowRight") {
      positionX += tileSize;
    }
    if (event.key === "ArrowLeft") {
      positionX -= tileSize;
    }
    if (event.key === "ArrowUp") {
      rotation += 90;
      rotation %= 360;
    }
  });
  return {
    draw: () => {
      positionY += tileSize;
      tiles = drawShape(context, shape + rotation, positionX, positionY);
    },
    checkCollision: () => {
      const tilesCoordinate = tiles.map(tile => [
        tile[0] + positionX / tileSize,
        tile[1] + positionY / tileSize
      ]);

      if (isColliding(bakedTilesCoordinate, tilesCoordinate)) {
        handleCollision(bakedTilesCoordinate, tilesCoordinate);
      }
    }
  };
};
