const shapes = {
  L: [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, -1]
  ],
  I: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0]
  ]
};

const shapeCreator = context => {
  return (_shape, x, y) => {
    const shape = shapes[_shape];

    context.beginPath();

    shape.forEach(([deltaX, deltaY]) => {
      context.rect(
        x + deltaX * tileSize,
        y + deltaY * tileSize,
        tileSize,
        tileSize
      );
    });

    context.stroke();
  };
};
