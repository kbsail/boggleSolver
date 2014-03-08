Array.prototype.includesArray = function(array){
  for(var i=0; i < this.length; i++){
    if(this[i].length !== array.length) { return false }
    var original = this[i].toString();
    var checked = array.toString();
    if(original === checked) { return true }
  }
  return false;
}


function Solver(board, trieDict){
  this.board = board;
  this.dictionary = trieDict;
  this.foundWords = [];

  this.solveBoard = function(){
    var currentSolver = this;
    this.board.allSpaces(function(i, j){
      currentSolver.checkSpace(i, j);
    });
  };

  this.checkSpace = function(row, column, curWord, visitedSpaces){
    curWord = typeof curWord == 'undefined' ? "" : curWord.slice(); 
    visitedSpaces = typeof visitedSpaces == 'undefined' ? [] : visitedSpaces.slice();
    
    var currentSolver = this;
    var letter = this.board.space(row, column);

    curWord = curWord.concat(letter);
    visitedSpaces.push([row, column]);
    
    switch(this.dictSearch(curWord)){
      case "not_found":
        return false;
      case "match":
        if(this.foundWords.indexOf(curWord)=== -1 ){ this.foundWords.push(curWord) };
        break;
      };
    if(visitedSpaces.length===16){ return }
    this.board.allNeighbors(row, column, function(r,c){
      if(!visitedSpaces.includesArray([r, c])){
        currentSolver.checkSpace(r, c, curWord, visitedSpaces);
      };
    });
  };

  // this.allNeighbors = function(row, column, curWord, checkedSpaces){
  //   for(var i = row - 1; i <= row + 1; i++){
  //     for(var j = column - 1; j <= column + 1; j++){
  //       if(i === row && j === column) { continue; }
  //       if(this.board.validSpace(i, j) && !checkedSpaces.includesArray([i, j])) { 
  //         this.checkSpace(i, j, curWord, checkedSpaces); 
  //       }
  //     }
  //   };
  // };

  this.dictSearch = function(word){
    return this.dictionary.searchWord(word);
  };
};

