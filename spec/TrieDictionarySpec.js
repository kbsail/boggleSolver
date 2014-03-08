describe('TrieDictionary', function(){
  var trieDictionary;
  var dictionary = ["hello", "helpful", "world", "awesome", "help", "he", "aw"]

  beforeEach(function(){
    trieDictionary = new TrieDictionary();
  });

  it('can make a trieDictionary', function(){
    expect(trieDictionary).not.toBe(undefined);
  });

  it('initiates a trie structure', function(){
    expect(trieDictionary.trie).toEqual(jasmine.any(TrieObject));
  });

  it('has a children property', function(){
    expect(trieDictionary.trie.children).not.toBe(undefined);
  });

  describe('#importWord', function(){
    it('can import a single word', function(){
      trieDictionary.importWord('hello');
      expect(trieDictionary.trie.children['h']).toEqual(jasmine.any(TrieObject));
      expect(trieDictionary.trie.children['h'].children['e']).toEqual(jasmine.any(TrieObject));
    });
    it('can import two words', function(){
      trieDictionary.importWord('hello');
      trieDictionary.importWord('goodbye');
      expect(trieDictionary.trie.children['h']).toEqual(jasmine.any(TrieObject));
      expect(trieDictionary.trie.children['g']).toEqual(jasmine.any(TrieObject));
    });

  });

describe('#searchWord', function(){
  beforeEach(function(){
    trieDictionary.importWord('hello')
  });
  it('returns "match" if word exists', function(){
    expect(trieDictionary.searchWord('hello')).toBe('match');
  });
  it('returns "not_found" if the word doesn\'t exist', function(){
    expect(trieDictionary.searchWord('goodbye')).toBe('not_found')
  });
  it('returns "prefix" if word is not a match but is a prefix', function(){
    expect(trieDictionary.searchWord('hel')).toBe('prefix')
  });
});

// Maybe have a function to create a full word that dynamcically creates trie.children['h'].children['e'].children['l']...
  describe('#importDict', function(){
    it('has calls #importDict', function(){
      trieDictionary.importDict(dictionary);
    });

    it('can add multiple words', function(){
      trieDictionary.importDict(dictionary);
      expect(Object.keys(trieDictionary.trie.children).length).toBe(3);
    });

    it('can find the words input', function(){
      trieDictionary.importDict(dictionary);
      expect(trieDictionary.searchWord('hello')).toBe('match');
      expect(trieDictionary.searchWord('help')).toBe('match');
      expect(trieDictionary.searchWord('helpful')).toBe('match');
    });

    it('only imports words 3 letters or longer', function(){
      trieDictionary.importDict(dictionary);
      expect(trieDictionary.searchWord("he")).not.toBe('match')
      expect(trieDictionary.searchWord("aw")).not.toBe('match')
    });
  });

  describe('#importDict with 20,000 words', function(){
    it('imports a large amount of words', function(){
      trieDictionary.importDict(TESTDICTIONARY);
      expect(trieDictionary.searchWord("aalii")).toBe('match')
      expect(trieDictionary.searchWord("recomplaint")).toBe('match')
      expect(trieDictionary.searchWord("fusillade")).toBe('match')
      expect(trieDictionary.searchWord("zythum")).toBe('match')
    });
  });

})