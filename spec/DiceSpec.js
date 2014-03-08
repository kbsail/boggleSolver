describe('Dice', function(){
  var die;
  beforeEach(function(){
    die = new Die(["a", "b", "c", "d", "e", "f"])
  })


  it('can make a die', function(){
    expect(die).not.toBe(undefined);
  });

  it('has 6 letters (representing sides of die)', function(){
    expect(die.letters.length).toBe(6);
  });

  it('cannot take an input that isn\'t 6 letters', function(){
    expect(function(){new Die(['a', 'b', 'c', 'd', 'e'])}).toThrow()

  })

  it('takes input letters', function(){
    expect(die.letters).toContain('a');
    expect(die.letters).toContain('d');
    expect(die.letters).toContain('f');
  })

  describe('#setLetter', function(){
    beforeEach(function(){
      die.setLetter()
    })
    it('creates the attribute "letter"', function(){
      expect(die.letter).not.toBe(undefined);
    });

    it('sets a letter', function(){
      expect(die.letter).not.toBe(null);
      expect(die.letter).toMatch(/^[a-zA-Z]/);
      expect(die.letter).not.toBe(undefined);     
    })

    it('sets a letter at initiation', function(){
      expect(new Die(["a", "b", "c", "d", "e", "f"]).letter).not.toBe(null);
      expect(new Die(["a", "b", "c", "d", "e", "f"]).letter).toMatch(/^[a-zA-Z]/);
      expect(new Die(["a", "b", "c", "d", "e", "f"]).letter).not.toBe(undefined);
    })

    it('sets a letter from letters', function(){
      expect(die.letter).toMatch(/^[a-f]/)
    })

    it('sets a letter at random', function(){
      var array = [];
      for(var i=0; i < 100; i++){
        die.setLetter();
        array.push(die.letter.charCodeAt(0));
      }
      var sum = array.reduce(function(a, b){ return a + b }).toFixed(2);
      var avg = sum / array.length;
      expect(avg).toBeCloseTo(100, -.3);
    })

    it('sets a random letter', function(){
      // These are the charCodes of a - f
      var characters = [97, 98, 99, 100, 101, 102]
      var array = [];
      var allExist = true;
      // sets the letter 20 times, makes sure each letter has been set
      for(var i=0; i < 20; i++){
        die.setLetter();
        array.push(die.letter.charCodeAt(0));
      }
      for(var i=0; i < characters.length; i++){
        if(array.indexOf(characters[i])===-1){
          return allExist = false;
        }
      }
      return allExist;
      expect(allExist).toBe(true);
    });
    
  });

});