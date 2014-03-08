describe('FullSearch - Testing my complete boggle solver', function(){
  var dictionary;
  beforeEach(function(){
    dictionary = new TrieDictionary()
    dictionary.importDict(TESTDICTIONARY);    
  })

  // describe('with a pre-determined board', function(){
  //   var solver1, wordAnswers
  //   beforeEach(function(){
  //     var board = new Board(["d", "e", "h", "n", "k", "t", "m", "b", "c", "r", "e", "n", "f", "a", "d", "t"]);
  //     solver1   = new Solver(board, dictionary);
  //     wordAnswers = [ 'acre', 'acred', 'act', 'ade', 'adet', 'aer', 'afret', 'arc', 'arcked', 'ardeb', 'ardent', 
  //     'are', 'ared', 'arend', 'arent', 'arete', 'ark', 'arm', 'armed', 'armet', 'art', 'bea', 'bead', 'bear', 'beard', 
  //     'bearm', 'bed', 'bedark', 'ben', 'bend', 'benda', 'bent', 'ber', 'berm', 'bert', 'berth', 'berthed', 'bet', 'beth', 
  //     'cad', 'cade', 'cadent', 'cader', 'cadet', 'cadre', 'car', 'card', 'care', 'caret', 'cark', 'carmen', 'cart', 'carte', 
  //     'crea', 'crete', 'dae', 'daer', 'dar', 'dare', 'daren', 'dark', 'dart', 'deaf', 'dear', 'dearth', 'deb', 'deme', 
  //     'dement', 'den', 'dent', 'derm', 'detent', 'deter', 'ear', 'earth', 'earthed', 'embed', 'ember', 'eme', 'emend', 'end', 
  //     'era', 'erd', 'erth', 'fack', 'fact', 'fad', 'fade', 'faden', 'fader', 'fae', 'far', 'farde', 'fare', 'farm', 'fra', 
  //     'frack', 'fracted', 'frae', 'fred', 'fret', 'hem', 'heme', 'hemen', 'hemera', 'het', 'ked', 'kemb', 'ket', 'keten', 
  //     'kra', 'mead', 'men', 'mend', 'ment', 'mer', 'merk', 'met', 'mete', 'meter', 'metra', 'nea', 'neb', 'ned', 'net', 
  //     'nete', 'neth', 'rack', 'racket', 'rad', 'rea', 'react', 'read', 'reb', 'red', 'redact', 'rend', 'rent', 'ret', 'retem', 
  //     'rethe', 'tck', 'tea', 'tead', 'tear', 'teart', 'ted', 'teda', 'tembe', 'temne', 'ten', 'tend', 'tent', 'tera', 'term', 
  //     'tete', 'teth', 'tetra', 'tetrad', 'the', 'them', 'theme', 'themer', 'tra', 'track', 'tracked', 'trade', 'tread', 'trend', 
  //     'trent', 'tret' ];
  //     solver1.solveBoard();
  //     console.log(board.board);
  //     console.log(solver1.foundWords)
  //   })

  //   it('can find all words', function(){
  //     expect(solver1.foundWords.length).toEqual(wordAnswers.length);
  //     expect(solver1.foundWords.sort()).toEqual(wordAnswers.sort());
  //   });

  //   it('ensures that there are diagonal words', function(){
  //     expect(solver1.foundWords).toContain('bed')
  //     expect(solver1.foundWords).toContain('tear')
  //   });

  //   it('ensures there are snaked words (horizontal and vertical)', function(){
  //     expect(solver1.foundWords).toContain('fare');
  //     expect(solver1.foundWords).toContain('fad');
  //     expect(solver1.foundWords).toContain('red');
  //   });

  //   it('has only 3 letter words', function(){
  //     for(var i = 0; i < solver1.foundWords; i++){
  //       expect(solver1.foundWords[i].length).toBeGreaterThan(2);
  //     }
  //   });

  //   it('only has 1 of each word', function(){
  //     function onlyUnique(value, index, self) { 
  //       return self.indexOf(value) === index;
  //     }
  //     var unique = solver1.foundWords.filter( onlyUnique );
  //     expect(solver1.foundWords).toEqual(unique)
  //   })

  // })

  describe('with a random new board', function(){
    var boggle, solver;
    var diceOptions = ["AAEEGN", "ELRTTY", "AOOTTW", "ABBJOO", "EHRTVW", "CIMOTU", "DISTTY", "EIOSST", "DELRVY", "ACHOPS", "HIMNQU", "EEINSU", "EEGHNW", "AFFKPS", "HLNNRZ", "DEILRX"]
    
    beforeEach(function(){
      boggle = new Boggle(4, diceOptions);
      solver = new Solver(boggle.board, dictionary);
    })


    it('can solve the entire board', function(){
      solver.solveBoard();
      expect(solver.foundWords.length).not.toEqual(0);
      boggle.showBoard();
      console.log(solver.foundWords)
    })    
  })
})