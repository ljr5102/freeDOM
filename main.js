(function() {

  var DOMNodeCollection = function(array) {
    this.collection = array;
  };

  DOMNodeCollection.prototype.each = function(cb) {
    this.collection.forEach(function(el) {
      cb(el);
    });
  };

  DOMNodeCollection.prototype.html = function(html) {
    if(html || html === "") {
      this.each(function(item) {
        item.innerHTML = html;
      });
    } else {
      return this.collection[0].innerHTML;
    }
  };

  DOMNodeCollection.prototype.empty = function() {
    this.html("");
    this.collection = [];
  };

  DOMNodeCollection.prototype.append = function(arg) {
    if (arg instanceof DOMNodeCollection) {
      arg.each(function(child) {
        this.collection[0].appendChild(child);
      }.bind(this));
      // this.collection[0].appendChild(arg.collection[0]);
    } else if (arg instanceof HTMLElement) {

    } else if (typeof arg === "string") {

    }
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
