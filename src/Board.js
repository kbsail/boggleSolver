function Board(inputLetters){
  this.allSpaces = function(callback){
    for(var i=0; i < 4; i++){
      for(var j=0; j < 4; j++){
        callback(i, j);
      };
    };
  };

  var createBoard = function(letters){
    letters = letters || [];
    var tempBoard = new Array(4)
    for(var i=0; i < tempBoard.length; i++){
      tempBoard[i] = new Array(4);
      for(var j=0; j < tempBoard[i].length; j++){
        var letter = letters.shift()
        if(typeof letter!=='undefined') { tempBoard[i][j] = letter.toLowerCase();}
      };
    };
    return tempBoard;
  };

  this.board = createBoard(inputLetters);
  this.WIDTH = this.board.length;

  this.space = function(row, column){
    return this.board[row][column];
  };

  this.validSpace = function(row, column){
    return 0 <= row && row < this.WIDTH && 0 <= column && column < this.WIDTH;
  };

  this.allNeighbors = function(row, column, callback){
    for(var i = row - 1; i <= row + 1; i++){
      for(var j = column - 1; j <= column + 1; j++){
        if(i === row && j === column) { continue; }
        if(this.validSpace(i, j)) { callback(i, j); }
      }
    };
  };

  this.setLetters = function(letters){
    for(var i=0; i < this.WIDTH; i++){
      for(var j=0; j < this.WIDTH; j++){
        this.board[i][j] = letters.shift().toLowerCase();
      };
    };
    return true;
  };
}