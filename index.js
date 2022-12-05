const canvas = document.querySelector('canvas');
const cContext = canvas.getContext('2d');
// console.log(c);

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
  static width = 40;
  static height = 40;

  constructor({ position }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }

  draw() {
    cContext.fillStyle = 'blue';
    cContext.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

//<< cria o mapa de forma mais fácil de compreender
const map = [
  ['-', '-', '-', '-', '-', '-', ],
  ['-', ' ', ' ', ' ', ' ', '-', ],
  ['-', ' ', '-', '-', ' ', '-', ],
  ['-', ' ', ' ', ' ', ' ', '-', ],
  ['-', '-', '-', '-', '-', '-', ]
];

const boundaries = [];

map.forEach((row, indexRow) => {
  row.forEach((symbol, indexSymbol) => {
    // console.log(symbol);
    switch(symbol) {
      case '-':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * indexSymbol,
            y: Boundary.height * indexRow
          }
        })
      );
        break;
    }
  })
})

boundaries.forEach((boundary) => { 
  boundary.draw();
});
// cria o mapa de forma mais fácil de compreender >>\\