var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function () {
  //define uma função anônima que será executada quando a página for carregada.
  setGame();
};

function setGame() {
  //Inicializa o jogo. Cria a estrutura do jogo, define o tabuleiro e coloca os valores iniciais nas células do tabuleiro.

  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num); //Atualiza o valor da célula
      document.getElementById("board").append(tile);
    }
  }
  //Percorre todas as células do tabuleiro. Para cada célula, ele cria um elemento div;
  //Adiciona um id que representa a posição da célula no tabuleiro

  setTwo();
  setTwo();
  //Coloca dois números aleatórios no tabuleiro.
}

function updateTile(tile, num) {
  // Atualiza o valor de uma célula do tabuleiro.

  tile.innerText = "";
  tile.classList.value = ""; //limpa a classList
  tile.classList.add("tile");

  if (num > 0) {
    tile.innerText = num.toString();

    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

document.addEventListener("keyup", (e) => {
  //Adiciona um evento de teclado que será executado quando o usuário pressionar uma tecla.

  if (e.code == "ArrowLeft") {
    slideLeft();
    setTwo();
  } else if (e.code == "ArrowRight") {
    slideRight();
    setTwo();
  } else if (e.code == "ArrowUp") {
    slideUp();
    setTwo();
  } else if (e.code == "ArrowDown") {
    slideDown();
    setTwo();
  }
  document.getElementById("score").innerText = score;
});
//Determina qual tecla foi pressionada e chama a função correspondente: (slideLeft(), slideRight(), slideUp() ou slideDown()) para mover os números no tabuleiro.

function filterZero(row) {
  //Filtra os zeros de uma linha, retornando um novo array com todos os números diferentes de zero.
  return row.filter((num) => num != 0);
}

function slide(row) {
  // Ela filtra os zeros da linha, combina números iguais e adiciona zeros no final da linha para manter o comprimento correto.

  //começa: [0, 2, 2, 2]

  row = filterZero(row); //retorna: [2, 2, 2]

  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    }
  } //retorna: [4, 0, 2]

  row = filterZero(row); //retorna: [4, 2]

  //add zeros
  while (row.length < columns) {
    row.push(0);
  } //retorna: [4, 2, 0, 0]

  return row; //A função retorna a linha modificada ([4, 2, 0, 0])
}

function slideLeft() {
  //Responsável por mover todos os números

  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];

      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r]; //[0, 2, 2, 2]
    row.reverse(); //[2, 2, 2, 0]
    row = slide(row); //[4, 2, 0, 0]
    board[r] = row.reverse(); //[0, 0, 2, 4];
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    // board[0][c] = row[0];
    // board[1][c] = row[1];
    // board[2][c] = row[2];
    // board[3][c] = row[3];
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    // board[0][c] = row[0];
    // board[1][c] = row[1];
    // board[2][c] = row[2];
    // board[3][c] = row[3];
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function setTwo() {
  //Adiciona um novo valor "2" aleatoriamente em uma posição vazia do tabuleiro

  if (!hasEmptyTile()) {
    return;
  }

  let found = false;
  while (!found) {
    //find random row and column to place a 2 in
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    //Gera uma posição aleatória no tabuleiro.

    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("x2");
      found = true;
    }
  }
}

function hasEmptyTile() {
  //Verifica se o tabuleiro já está completamente preenchido

  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        //at least one zero in the board
        return true;
      }
    }
  }
  return false;
}
