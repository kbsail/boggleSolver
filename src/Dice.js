

function checkArrayLength(array, length){
  if(array.length === length){
    return array;
  } else {
    throw "invalid number of elements";
  };
};

function sampleElement(inputObject){
  var alength = inputObject.length;
  return inputObject[(Math.floor(Math.random() * alength))]
}

function Die(inputLetters){
  this.letters = checkArrayLength(inputLetters, 6);

  this.setLetter = function(){
    this.letter = sampleElement(this.letters);
  }

  this.setLetter();
}