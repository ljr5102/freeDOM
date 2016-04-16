(function() {

  var DOMNodeCollection = function(array) {
    this.collection = array;
    this.first = this.collection[0];
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
      return this.first.innerHTML;
    }
  };

  DOMNodeCollection.prototype.empty = function() {
    this.html("");
    this.collection = [];
  };

  DOMNodeCollection.prototype.append = function(arg) {
    if (arg instanceof DOMNodeCollection) {
      arg.each(function(child) {
        this.first.appendChild(child);
      }.bind(this));
    } else if (arg instanceof HTMLElement) {
      this.first.appendChild(arg);
    } else if (typeof arg === "string") {
      this.first.innerHTML += arg;
    }
  };

  DOMNodeCollection.prototype.attr = function(attrib, val) {
    if (arguments.length === 1) {
      return this.first.getAttribute(attrib);
    } else {
      this.each(function(el) {
        el.setAttribute(attrib, val);
      });
    }
  };

  DOMNodeCollection.prototype.addClass = function(newClass) {
    this.each(function(el){
      el.classList.add(newClass);
    });
  };

  DOMNodeCollection.prototype.removeClass = function(classToRemove) {
    this.each(function(el) {
      if(classToRemove) {
        el.classList.remove(classToRemove);
      } else {
        el.className = "";
      }
    });
  };

  DOMNodeCollection.prototype.children = function() {
    var allChildren = [];
    this.each(function(el) {
      if (el.children.length === 1) {
        allChildren.push(el.children[0]);
      }
    });
    return new DOMNodeCollection(allChildren);
  };

  DOMNodeCollection.prototype.parent = function() {
    var allParents = [];
    this.each(function(el) {
      if (el.parentNode) {
        allParents.push(el.parentNode);
      }
    });
    return new DOMNodeCollection(allParents);
  };

  DOMNodeCollection.prototype.find = function(selector) {
    var found = [];
    this.each(function(el) {
      var foundNodes = el.querySelectorAll(selector);
      var foundArray = Array.prototype.slice.call(foundNodes);
      found = found.concat(foundArray);
    });
    return new DOMNodeCollection(found);
  };

  DOMNodeCollection.prototype.remove = function() {
    this.each(function(el) {
      el.outerHTML = "";
    });
    this.collection = [];
  };

  DOMNodeCollection.prototype.on = function(event, cb) {
    this.each(function(el) {
      el.addEventListener(event, cb);
    });
  };

  DOMNodeCollection.prototype.off = function(event, cb) {
    this.each(function(el) {
      el.removeEventListener(event, cb);
    });
  };

  window.$l = function(input) {
    var cbs = [];
    var cbExecution = function() {
      cbs.forEach(function(cb) {
        cb();
      });
    };
    if(input instanceof Function) {
      if(!this.domLoaded) {
        cbs.push(input);
        document.addEventListener("DOMContentLoaded", cbExecution);
        this.domLoaded = true;
      } else {
        input();
      }
    } else if(input instanceof HTMLElement) {
      return new DOMNodeCollection([input]);
    } else {
      var htmlCollec = document.getElementsByTagName(input);
      var htmlArray = Array.prototype.slice.call(htmlCollec);
      return new DOMNodeCollection(htmlArray);
    }
  };

  var serialize = function(obj) {
    var str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  };

  var merge = function() {
    var obj;
    var otherObj;
    var idx = arguments.length - 1;
    for(idx; idx > 0; idx--) {
      obj = arguments[idx];
      otherObj = arguments[idx - 1];
      for(var key in obj) {
        otherObj[key] = obj[key];
      }
    }
    return otherObj;
  };

  window.$l.ajax = function(options) {
    var defaults = {
      url: "http://api.icndb.com/jokes/random?firstName=Chuck&amp;lastName=Norris",
      method: "GET",
      data: {},
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function(data) {
        console.log(data.value.joke);
      },
      error: function() {}
    };

    var req = merge(defaults, options);

    if (req.method.toUpperCase() === "GET" && serialize(req.data) !== ""){
       req.url += "?" + serialize(req.data);
    }


    var xhr = new XMLHttpRequest();
    xhr.open(req.method, req.url, true);

    xhr.onload = function(e) {
      if(xhr.status === 200) {
        req.success(JSON.parse(xhr.response));
      } else  {
        req.error(xhr.response);
      }

    };
    xhr.send(serialize(req.data));
  };

  console.log("I loaded");
})();
