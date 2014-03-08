describe('solver', function(){
  var solver, board, dictionary;
  beforeEach(function(){
    board = new Board("helpsolfworusldl".split(""));
    dictionary = new TrieDictionary()
    dictionary.importDict(["hell", "loose", "hello", "helpful", "world", "awesome", "help", "he", "aw", "helo"]);
    solver = new Solver(board, dictionary);
  })

  it('can make a boggle solver', function(){
    expect(new Solver()).not.toBe(undefined);
  });

  it('has a board', function(){
    expect(solver.board).not.toBe(undefined);
  });

  it('has a dictionary', function(){
    expect(solver.dictionary).not.toBe(undefined)
  });

  describe('#dictSearch', function(){
    it('checks if the current word is in the dictionary', function(){
      var spy = spyOn(solver.dictionary, 'searchWord');
      solver.dictSearch("help");
      expect(spy).toHaveBeenCalled();
    });

    it('returns "prefix", "match", "not_found"', function(){
      expect(solver.dictSearch("help")).toEqual("match");
      expect(solver.dictSearch("awe")).toEqual("prefix");
      expect(solver.dictSearch("bla")).toEqual("not_found");
    });
  });

  describe('#solveBoard', function(){
    it('calls allSpaces on the board', function(){
      var allSpaces = spyOn(solver.board, 'allSpaces').and.callThrough();
      solver.solveBoard();
      expect(allSpaces).toHaveBeenCalled();
    });

    describe('#checkSpace', function(){
      var space
      beforeEach(function(){
        space = spyOn(solver.board, 'space').and.callThrough();
      })

      it('retrieves the letter from the space', function(){
        solver.checkSpace(0,0);
        expect(space).toHaveBeenCalled();
      })

      it('creates a new word string if no string exists', function(){
        var string = "he"
        expect(function(){solver.checkSpace(0,0)}).not.toThrow();
        expect(function(){solver.checkSpace(0,0, string)}).not.toThrow();
      });

      it('searches the dictionary', function(){
        var spy = spyOn(solver, "dictSearch").and.callThrough();
        solver.checkSpace(0,0);
        expect(spy).toHaveBeenCalled();
      });

      it('does not search spaces already searched', function(){
        var spy = spyOn(solver, 'checkSpace').and.callThrough();
        var visited = [[0,0], [0,1], [0,2]]
        solver.checkSpace(0,3, "hel", visited)
        visited.push([0,3])
        expect(spy).not.toHaveBeenCalledWith(0,2, "help", visited);
        expect(spy).toHaveBeenCalledWith(1,2, "help", visited);
      })

      describe('when dictSearch equals match', function(){
        var spy;
        beforeEach(function(){
          spy = spyOn(solver, 'checkSpace').and.callThrough();
          solver.checkSpace(0,3, "hel", [[0,0],[0,1],[0,2]])
        })
        it('adds the word to the foundWords array', function(){
          expect(solver.foundWords).toContain("help");
        });

        it('calls all its neighbors', function(){
          expect(spy).toHaveBeenCalledWith(1,2, "help", [[0,0],[0,1],[0,2],[0,3]]);
          expect(spy).toHaveBeenCalledWith(1,3, "help", [[0,0],[0,1],[0,2],[0,3]]);
        });
      });

      describe('when dictSearch equals prefix', function(){
        it('calls all its neighbors', function(){
          var spy = spyOn(solver, 'checkSpace').and.callThrough();
          solver.checkSpace(0,2, "he", [[0,0], [0,1]])
          expect(spy).toHaveBeenCalledWith(0,3, "hel", [[0,0], [0,1], [0,2]]);
          expect(spy).toHaveBeenCalledWith(1,1, "hel", [[0,0], [0,1], [0,2]]);
          expect(spy).toHaveBeenCalledWith(1,2, "hel", [[0,0], [0,1], [0,2]]);
        });
      });

      describe('when dictSearch equals not_found', function(){
        it('returns out of the recursion', function(){
          expect(solver.checkSpace(0,3,"he", [[0,1],[0,2]])).toBe(false);
        });

        it('does not call the neighbors', function(){
          var spy = spyOn(solver.board, 'allNeighbors');
          solver.checkSpace(0, 3, "he", [[0,1],[0,2]]);
          expect(spy).not.toHaveBeenCalled();
        })
      });

    });

    describe('#solveBoard', function(){
      it('solves the board', function(){
        solver.solveBoard();
        expect(solver.foundWords).toContain("hello")
        expect(solver.foundWords).toContain("helpful")
        expect(solver.foundWords).toContain("hell")
        console.log(solver.foundWords)
      })
    })
  });
});