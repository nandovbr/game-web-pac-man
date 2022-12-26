const canvas = document.querySelector('canvas');
const cContext = canvas.getContext('2d');
// console.log(c);

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
  static width = 40;
  static height = 40;

  constructor({ position, image }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.image = image;
  }

  draw() {
    // cContext.fillStyle = 'blue';
    // cContext.fillRect(this.position.x, this.position.y, this.width, this.height);

    cContext.drawImage(this.image, this.position.x, this.position.y);
  }
};

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 14.5;
  }

  draw() {
    cContext.beginPath();
    cContext.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    cContext.fillStyle = 'yellow';
    cContext.fill();
    cContext.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
};

class LittleDot {
  constructor({ position }) {
    this.position = position;
    this.radius = 3;
  }

  draw() {
    cContext.beginPath();
    cContext.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    cContext.fillStyle = 'white';
    cContext.fill();
    cContext.closePath();
  }
};

const LittleDots = [];
const boundaries = [];
const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2
  },
  velocity: {
    x: 0,
    y: 0
  }
});

const keys = {
  w: {
    isPressed: false,
  },
  a: {
    isPressed: false,
  },
  s: {
    isPressed: false,
  },
  d: {
    isPressed: false,
  }
};

let lastKey = '';

const map = [
  ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
  ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
];

function createImage(src) {
  const image = new Image();
  image.src = src;
  return image;
};

map.forEach((row, indexRow) => {
  row.forEach((symbol, indexSymbol) => {
    // console.log(symbol);
    switch(symbol) {
      case '-':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * indexSymbol,
            y: Boundary.height * indexRow
          },
          image: createImage('./images-map/pipeHorizontal.png')
        })
      );
        break;
      case '|':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * indexSymbol,
            y: Boundary.height * indexRow
          },
          image: createImage('./images-map/pipeVertical.png')
        })
      );
        break;
      case '1':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * indexSymbol,
            y: Boundary.height * indexRow
          },
          image: createImage('./images-map/pipeCorner1.png')
        })
      );
        break;
      case '2':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * indexSymbol,
            y: Boundary.height * indexRow
          },
          image: createImage('./images-map/pipeCorner2.png')
        })
      );
        break;
      case '3':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * indexSymbol,
            y: Boundary.height * indexRow
          },
          image: createImage('./images-map/pipeCorner3.png')
        })
      );
        break;
      case '4':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * indexSymbol,
            y: Boundary.height * indexRow
          },
          image: createImage('./images-map/pipeCorner4.png')
        })
      );
        break;
      case 'b':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * indexSymbol,
            y: Boundary.height * indexRow
          },
          image: createImage('./images-map/block.png')
        })
      );
        break;
      case '[':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * indexSymbol,
            y: Boundary.height * indexRow
          },
          image: createImage('./images-map/capLeft.png')
        })
      );
        break;
      case ']':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * indexSymbol,
            y: Boundary.height * indexRow
          },
          image: createImage('./images-map/capRight.png')
        })
      );
        break;
      case '_':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * indexSymbol,
            y: Boundary.height * indexRow
          },
          image: createImage('./images-map/capBottom.png')
        })
      );
        break;
      case '^':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * indexSymbol,
            y: Boundary.height * indexRow
          },
          image: createImage('./images-map/capTop.png')
        })
      );
        break;
      case '+':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * indexSymbol,
            y: Boundary.height * indexRow
          },
          image: createImage('./images-map/pipeCross.png')
        })
      );
        break;
      case '5':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * indexSymbol,
            y: Boundary.height * indexRow
          },
          color: 'blue',
          image: createImage('./images-map/pipeConnectorTop.png')
        })
      );
        break;
      case '6':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * indexSymbol,
            y: Boundary.height * indexRow
          },
          color: 'blue',
          image: createImage('./images-map/pipeConnectorRight.png')
        })
      );
        break;
      case '7':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * indexSymbol,
            y: Boundary.height * indexRow
          },
          color: 'blue',
          image: createImage('./images-map/pipeConnectorBottom.png')
        })
      );
        break;
      case '8':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * indexSymbol,
            y: Boundary.height * indexRow
          },
          // color: 'blue',
          image: createImage('./images-map/pipeConnectorLeft.png')
        })
      );
        break;
      case '.':
        LittleDots.push(new LittleDot({
          position: {
            x: Boundary.width * indexSymbol + Boundary.width / 2,
            y: Boundary.height * indexRow + Boundary.height / 2
          }
        })
      );
        break;
    }
  })
});

function colisionMap({ circle, rectangle }) {
  return (circle.position.y - circle.radius + circle.velocity.y <=
    rectangle.position.y + rectangle.height &&
    circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
    circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
    circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width)
};

function animate() {
  requestAnimationFrame(animate);
  // console.log('animate');

  cContext.clearRect(0, 0, canvas.width, canvas.height);

  if (keys.w.isPressed && lastKey === 'w') {
    for (let index = 0; index < boundaries.length; index++) {
      const boundary = boundaries[index];
      if(colisionMap({
        circle: { ...player, velocity: { x: 0, y: -5 } },
        rectangle: boundary
      })) {
        player.velocity.y = 0;
        break
      } else {
        player.velocity.y = -5;
      }
    }

  } else if (keys.a.isPressed && lastKey === 'a') {
    for (let index = 0; index < boundaries.length; index++) {
      const boundary = boundaries[index];
      if(colisionMap({
        circle: { ...player, velocity: { x: -5, y: 0 } },
        rectangle: boundary
      })) {
        player.velocity.x = 0;
        break
      } else {
        player.velocity.x = -5;
      }
    }

  } else if (keys.s.isPressed && lastKey === 's') {
    for (let index = 0; index < boundaries.length; index++) {
      const boundary = boundaries[index];
      if(colisionMap({
        circle: { ...player, velocity: { x: 0, y: 5 } },
        rectangle: boundary
      })) {
        player.velocity.y = 0;
        break
      } else {
        player.velocity.y = 5;
      }
    }

  } else if (keys.d.isPressed && lastKey === 'd') {
    for (let index = 0; index < boundaries.length; index++) {
      const boundary = boundaries[index];
      if(colisionMap({
        circle: { ...player, velocity: { x: 5, y: 0 } },
        rectangle: boundary
      })) {
        player.velocity.x = 0;
        break
      } else {
        player.velocity.x = 5;
      }
    }
  }

  for (let index = LittleDots.length -1; 0< index; index--) {
    const LittleDot = LittleDots[index];

    LittleDot.draw();

    // some com o LittleDot quando o Player colide com ele
    if (Math.hypot(LittleDot.position.x - player.position.x,
      LittleDot.position.y - player.position.y) < LittleDot.radius + player.radius) {
        LittleDots.splice(index, 1);
      }
  };

  boundaries.forEach((boundary) => {
    boundary.draw();

    if (colisionMap({ circle: player, rectangle: boundary })) {
        player.velocity.x = 0;
        player.velocity.y = 0;
      }
  });
  
  player.update();
  player.velocity.x = 0;
  player.velocity.y = 0;
};

animate();

// Event Listeners
// Ao pressionar as teclas o Player se move
window.addEventListener('keydown', ({ key }) => {
  // console.log(key); // mostra a tecla pressionada
  switch(key) {
    case 'w':
      keys.w.isPressed = true
      lastKey = 'w';
      break;
    case 'a':
      keys.a.isPressed = true
      lastKey = 'a';
      break;
    case 's':
      keys.s.isPressed = true
      lastKey = 's';
      break;
    case 'd':
      keys.d.isPressed = true
      lastKey = 'd';
      break;
  }
  // console.log(keys.d.isPressed);
  // console.log(keys.s.isPressed);
});

// ao soltar a tecla o Player para
window.addEventListener('keyup', ({ key }) => {
  // console.log(key); // mostra a tecla pressionada
  switch(key) {
    case 'w':
      keys.w.isPressed = false;
      break;
    case 'a':
      keys.a.isPressed = false;
      break;
    case 's':
      keys.s.isPressed = false;
      break;
    case 'd':
      keys.d.isPressed = false;
      break;
  }
  // console.log(player.velocity);
});
