describe('Board', function(){
  describe('initializing the board', function(){
    var startletters;
    beforeEach(function(){
      startletters = "abcdefghijklmnop".split("");
    });

    it('can make a board', function(){
      expect(new Board(startletters)).not.toBe(undefined);
    });

    it('is a 4 by 4 nested array', function(){
      var tempBoard = new Board(startletters);
      expect(tempBoard.board.length).toEqual(4);
      expect(tempBoard.board[3].length).toEqual(4);
    });

    it('sets the original letters', function(){
      var tempBoard = new Board(startletters);
      expect(tempBoard.board[0][0]).toEqual("a");
      expect(tempBoard.board[2][0]).toEqual("i");
      expect(tempBoard.board[2][3]).toEqual("l");
      expect(tempBoard.board[3][3]).toEqual("p");
    })
  })

  var bBoard;

  beforeEach(function(){
    bBoard = new Board();
    bBoard.board = ["help".split(""),"xxxx".split(""),"some".split(""),"xxxs".split("")]
  });

  describe('#allSpaces', function(){
    it('loops through each space', function(){
      var method = jasmine.createSpy('method')
      bBoard.allSpaces(method);
      expect(method).toHaveBeenCalledWith(0, 0);
      expect(method).toHaveBeenCalledWith(1, 1);
      expect(method).toHaveBeenCalledWith(2, 2);
      expect(method).toHaveBeenCalledWith(3, 0);
      expect(method).toHaveBeenCalledWith(3, 3);
    })
  })

  describe('#space(row, column)', function(){
    it('retrieves the letter in space x', function(){
      expect(bBoard.space(0, 1)).toEqual("e");
      expect(bBoard.space(2, 0)).toEqual("s");
      expect(bBoard.space(2, 3)).toEqual("e");
      expect(bBoard.space(3, 2)).toEqual("x");
      expect(bBoard.space(3, 3)).toEqual("s");
    });
  });

  describe("#validSpace", function(){
    it('returns true if the space is valid', function(){
      expect(bBoard.validSpace(0, 1)).toBe(true);
      expect(bBoard.validSpace(1, 3)).toBe(true);
      expect(bBoard.validSpace(2, 0)).toBe(true);
      expect(bBoard.validSpace(3, 2)).toBe(true);
    });

    it('returns false if the space is not valid', function(){
      expect(bBoard.validSpace(0, 4)).toBe(false);
      expect(bBoard.validSpace(4, 1)).toBe(false);
      expect(bBoard.validSpace(-1, 2)).toBe(false);
      expect(bBoard.validSpace(3, -1)).toBe(false);
    });
  });

  describe('#allNeighbors(row, column, someFunction)', function(){
    it('loops through all neighbors', function(){
      var spyTrigger = spyOn(bBoard, "validSpace");
      bBoard.allNeighbors(1, 1)
      expect(spyTrigger).toHaveBeenCalledWith(0, 0);
      expect(spyTrigger).toHaveBeenCalledWith(1, 2);
      expect(spyTrigger).toHaveBeenCalledWith(2, 1);
      expect(spyTrigger.calls.count()).toEqual(8);
    });

    it('calls the passed in method', function(){
      var method = jasmine.createSpy('method')
      bBoard.allNeighbors(2,3, method);
      expect(method).toHaveBeenCalledWith(1,3);
      expect(method).toHaveBeenCalledWith(2,2);
      expect(method).toHaveBeenCalledWith(3,3);
      expect(method.calls.count()).toEqual(5);
    })
  });

  describe('#setletters', function(){
    var letters;
    beforeEach(function(){
      letters = "abcdefghijklmnop".split("");
    });

    it('takes has a setLetters function', function(){
      expect(bBoard.setLetters(letters)).not.toBe(undefined);
    });

    it('sets the letters of the board', function(){
      var pre1 = bBoard.space(0,1), pre2 = bBoard.space(1,2), pre3 = bBoard.space(2,3)
      bBoard.setLetters(letters);
      expect(bBoard.space(0,1)).not.toEqual(pre1);
      expect(bBoard.space(0,1)).toEqual("b");
      expect(bBoard.space(1,2)).not.toEqual(pre2);
      expect(bBoard.space(1,2)).toEqual("g");
      expect(bBoard.space(2,3)).not.toEqual(pre3);
      expect(bBoard.space(2,3)).toEqual("l");
    });
  });
});

// it('has board letters', function(){
//     // expect(bBoard.boardLetters()).not.toContain(undefined)
// });

    // describe('#boardLetters', function(){
    //   it('returns an array of 16 letters', function(){
    //     expect(bBoard.boardLetters().length).toEqual(16);
    //     expect(bBoard.boardLetters()).not.toBe(null);
    //     expect(bBoard.boardLetters()).toMatch(/^[a-zA-Z]/);
    //     expect(bBoard.boardLetters()).not.toBe(undefined);
    //   })

    //   it('returns all letters on the board', function(){
    //     expect(bBoard.boardLetters()).toEqual(allLetters)
    //   });
    // });