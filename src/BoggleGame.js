function sampleIndex(inputObject){
  var alength = inputObject.length;
  return (Math.floor(Math.random() * alength));
}

function randomizeArray(array){
  var tempArray   = array.slice(0);
  var randomArray = [];
  while(tempArray.length > 0){
    var sIndex = sampleIndex(tempArray);
    var element = tempArray.splice(sIndex, 1);
    randomArray = randomArray.concat(element);
  };
  return randomArray;
}


//
// Boggle Object
//
function Boggle(length, dice){
  var createDice = function(dice){
    tempDice = [];
    for(var i=0; i < dice.length; i++){
      tempDice.push(new Die(dice[i].toLowerCase()));
    }
    return tempDice;
  };

  this.init = function(length, dice){
    this.dice   = createDice(dice);
    this.board  = new Board(this.diceLetters());
    this.numSpaces = Math.pow(length, 2);
    this.width  = length;
    this.shake();
  };
  
  this.diceLetters = function(){
    var letters = [];
    for(var i=0; i < this.dice.length; i++){
      letters.push(this.dice[i].letter)
    };
    return letters;
  };

  this.setSpace = function(row, column, letter){
    return this.board.board[row][column] = letter;
  }

  this.getSpace = function(row, column){
    return this.board.board[row][column]
  }

  this.boardLetters = function(){
    var letters = [];
    for(var i=0; i < this.width; i++){
      for(var j=0; j < this.width; j++){
        letters.push(this.getSpace(i, j));
      }
    }
    return letters;
  }

  this.placeLetters = function(){
    var tempLetters = this.diceLetters()
    for(var i=0; i < this.width; i++){
      for(var j=0; j < this.width; j++){
        this.setSpace(i, j, tempLetters.shift());
      }
    }
  }

  this.shuffleDice = function(){
    var arrayDice = this.dice.slice(0)
    var tempDice = [];
    for(var i=arrayDice.length; i > 0; i--){
      var randomNum = Math.floor(Math.random() * (i));
      var currentDice = arrayDice.splice(randomNum, 1)[0]
      currentDice.setLetter();
      tempDice.push(currentDice);
    }
    return this.dice = tempDice;
  }

  this.shake = function(){
    this.shuffleDice();
    this.placeLetters();
    return this.boardLetters();
  }

  this.showBoard = function(){
    var letters = this.boardLetters();
    for(var i=0; i < letters.length; i += 4){
      var row = letters.slice(i, (i + 4));
      console.log(row)
    }
  }


  this.init(length, dice)
}