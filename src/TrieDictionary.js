

function TrieDictionary(){
  this.trie = Trie.init();
}

TrieDictionary.prototype.importWord = function(word){
  return this.trie.addKey(word);
}

TrieDictionary.prototype.searchWord = function(word){
  return this.trie.search(word);
}

TrieDictionary.prototype.importDict = function(dictionary) {
  var length = dictionary.length;
  for(var i=0; i < length; i++){
    if(dictionary[i].length > 2){
      this.importWord(dictionary[i].toLowerCase());
    }
  }
  return true
};


