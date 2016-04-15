(function() {

  var DOMNodeCollection = function(array) {
    this.collection = array;
  };

  window.$l = function(input) {
    if(input instanceof HTMLElement) {
      return new DOMNodeCollection([input]);
    } else {
      var htmlCollec = document.getElementsByTagName(input);
      var htmlArray = Array.prototype.slice.call(htmlCollec);
      return new DOMNodeCollection(htmlArray);
    }
  };

  console.log("I loaded");
})();
