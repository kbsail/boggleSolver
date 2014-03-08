describe("Trie", function() {
  var trie;
  beforeEach(function () {
    trie = Trie.init();
  })

  it("can make one", function() {
    expect(trie).not.toBe(undefined);
  });

  it("can search for a key", function() {
    expect(trie.search('foo')).toEqual(Trie.NOT_FOUND);
  });

  it("Can add a one character key", function() {
    trie.addKey('f');
  });

  it("can find an existing key", function() {
    trie.addKey('f');
    expect(trie.search('f')).toEqual(Trie.MATCH);
  });

  it("returns not found if the first character of the search is not the first character in the trie", function() {
    trie.addKey('a');
    expect(trie.search('b')).toEqual(Trie.NOT_FOUND);
  });

  it("looks at all of the children", function () {
    trie.addKey('a');
    trie.addKey('q');
    trie.addKey('z');
    expect(trie.search('z')).toEqual(Trie.MATCH);
    expect(trie.search('a')).toEqual(Trie.MATCH);
    expect(trie.search('x')).toEqual(Trie.NOT_FOUND);
  });

  it('looks at the first character when there are more than one', function () {
    trie.addKey('ab');
    expect(trie.search('ab')).toEqual(Trie.MATCH);
  });

  it("looks at the second character of the key too", function() {
    trie.addKey('ab');
    expect(trie.search('ac')).toEqual(Trie.NOT_FOUND);
  });

  it('looks at third characters too', function() {
    trie.addKey('abc');
    expect(trie.search('abc')).toEqual(Trie.MATCH);
  });

  it('returns not found if the search key is too long', function() {
    trie.addKey('ab');
    expect(trie.search('abc')).toEqual(Trie.NOT_FOUND);
  });

  it('returns PREFIX if there is a match which is longer, but not an exact one', function() {
    trie.addKey('abc');
    expect(trie.search('ab')).toEqual(Trie.PREFIX);
  });

  it('returns MATCH if something is both a prefix and an exact match', function() {
    trie.addKey('hello');
    trie.addKey('hell');
    expect(trie.search('hell')).toEqual(Trie.MATCH);
  });

  it ('re-uses nodes when it can, to save memory', function() {
    trie.addKey('a');
    trie.addKey('ab');
    expect(trie.childCount()).toEqual(1);
  });

  it('does not over-write existing child trees', function() {
    trie.addKey('ab');
    trie.addKey('ac');
    expect(trie.search('ab')).toEqual(Trie.MATCH);
  })

});