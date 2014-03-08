
function TrieObject() {
  this.children = {};
  this.endpoint = false;

  this.search = function(key) {
    if(key.length === 0 ) { 
      if (this.endpoint) {
        return Trie.MATCH;
      } else {
        return Trie.PREFIX;
      }
    }

    var child = this.children[key[0]];
    if (child === undefined) {
      return Trie.NOT_FOUND;
    } else {
      return child.search(key.slice(1));
    }
  };

  this.addKey = function(key) {
    var firstCharacter = key[0];
    if (firstCharacter === undefined) { this.endpoint = true; return; }
    var child = this.children[firstCharacter];
    if (child === undefined) {
      child = new TrieObject();
      this.children[firstCharacter] = child;
    }
    child.addKey(key.slice(1));
  };

  this.childCount = function() {
    return Object.keys(this.children).length;
  }

}

Trie = {
  NOT_FOUND: 'not_found',
  MATCH: 'match',
  PREFIX: 'prefix',

  init: function() {
    return new TrieObject();
  },

}
