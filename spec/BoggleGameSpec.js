
describe('Boggle', function(){
  var boggle;

  var diceOptions = ["AAEEGN", "ELRTTY", "AOOTTW", "ABBJOO", "EHRTVW", "CIMOTU", "DISTTY", "EIOSST", "DELRVY", "ACHOPS", "HIMNQU", "EEINSU", "EEGHNW", "AFFKPS", "HLNNRZ", "DEILRX"]
  
  beforeEach(function(){
    boggle = new Boggle(4, diceOptions);
  })

  it('can make a Boggle object', function(){
    expect(new Boggle(4, diceOptions)).not.toBe(undefined)
  })
  
  describe('the board attribute', function(){
    it('has a board attribute', function(){
      expect(boggle.board).not.toBe(undefined);
    });

    it('has a 4 by 4 board', function(){
      expect(boggle.board.board.length).toEqual(4);
      expect(boggle.board.board[3].length).toEqual(4);
    })
  })

  describe('#createDice', function(){
    it('has 16 dice', function(){
      expect(boggle.dice.length).toEqual(16);
    });

    it('has dice objects', function(){
      expect(boggle.dice).toContain(jasmine.any(Die))
    });
  });

  describe('#placeLetters', function(){
    it('gives each space a letter', function(){
      spyOn(boggle, 'diceLetters').and.returnValue("helloworldtigers".split(""));
      boggle.placeLetters();
      expect(boggle.boardLetters()).toEqual("helloworldtigers".split(""));
    });
  });

  describe('#shuffleDice', function(){
    it('randomizes the dice array', function(){
      var previous = boggle.dice.slice(0);
      boggle.shuffleDice();
      expect(boggle.dice).not.toEqual(previous);
      expect(boggle.dice.length).toEqual(16);
    })

    describe('changing all the dice letters', function(){
      var previous;
      beforeEach(function(){
        previous = boggle.diceLetters().slice(0);
        boggle.shuffleDice();
      });
      
      it('creates a new array of letters', function(){
        expect(boggle.diceLetters()).not.toEqual(previous);
        expect(boggle.diceLetters()).toContain(jasmine.any(String))
        expect(boggle.diceLetters()).not.toContain(undefined)
      })

      it('makes the letters randomized', function(){
        expect(boggle.diceLetters()).not.toEqual(previous);
        expect(boggle.diceLetters().length).toEqual(16);
        expect(boggle.diceLetters()[0]).not.toEqual(previous[0]);
        expect(boggle.diceLetters()[8]).not.toEqual(previous[8]);
        expect(boggle.diceLetters()[15]).not.toEqual(previous[15]);
      });      
    });
  });

  describe('#shake', function(){
    beforeEach(function(){
      spyOn(boggle, 'shuffleDice').and.callThrough();
      spyOn(boggle, 'placeLetters').and.callThrough();
      boggle.placeLetters();
    });

    it('has board letters', function(){
      expect(boggle.boardLetters()).not.toContain(undefined);
    })
    
    it('calls #shuffleDice', function(){
      boggle.shake();
      expect(boggle.shuffleDice).toHaveBeenCalled();
    });

    it('calls #placeLetters', function(){
      boggle.shake();
      expect(boggle.shuffleDice).toHaveBeenCalled();
    });

    it('changes all the board letters', function(){
      var previous = boggle.boardLetters();
      boggle.shake();
      expect(boggle.boardLetters).not.toEqual(previous);
    });
  });

  describe('#showBoard', function(){
    it('has a showBoard function', function(){
      boggle.showBoard();
    })
  })
});


