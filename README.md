# freeDOM

freeDOM is a small but feature-rich JavaScript library.  Its goal is to assist with DOM interaction by simplifying HTML document manipulation, event handling, and ajax requests.

freeDOM can be used for a multitude of JavaScript projects.  One example of its use can be found here on this [game of Blackjack made with freeDOM.](http://ljr5102.github.io/Blackjack)

## Getting Started

1.  Clone this repository.
2.  Add the freeDOM.js file into the directory of your project.
3.  Add a script tag in your HTML document referencing the freeDOM.js file.
4.  You're all set up!  freeDOM away!

## Features

* Versatile DOM selector function that allows for easy selection of any element within the DOM.
* Allows for passing of callbacks into selector function that will only execute after the HTML Document has been fully loaded.
* Provides iteration over freeDOM object for simple interaction with DOM Nodes.
* Provides functions for manipulation of DOM through inner/outer HTML updates, and  class and attribute removal/addition.
* Enables event delegation through "on" and "off" functions.
* Simplifies ajax requests by providing single function that takes in JavaScript object of options.

###Public API
#### DOMNodeCollection

* `$l(selector)` - Create new DOMNodeCollection object or have callback invoked when DOM Content Loaded.

#### AJAX

* `$l.ajax(options)` - Asynchronous XMLHttpRequest

#### DOMNodeCollection Prototype

* `each(callback)` - Iterate over individual DOMNodes
* `html( )` - Returns the inner html of the first element
* `html(arg)` - Sets the inner html of all elements
* `empty( )` - Removes the inner html of all elements
* `append(arg)` - Add children elements to first element
* `attr(attribute)` - Returns value of the attribute for the first element
* `attr(attribute, val)` - Sets value of the attribute for all elements
* `val( )` - Returns value of first element
* `addClass(class)` - Adds given class to each element
* `removeClass(class)` - Removes given class from each element
* `removeClass( )` - Removes all classes from each element
* `children( )` - Returns DOMNodeCollection of all children of all elements
* `parent( )` - Returns DOMNodeCollection of all parents of all elements
* `find(selector)` - Returns DOMNodeCollection of items matching selector
* `remove( )` - Removes outer html of all elements
* `on(event, callback)` - Sets event listener for each element
* `off(event, callback)` - Removes event listener for each element
