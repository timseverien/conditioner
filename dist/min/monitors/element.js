!function(e,t){"use strict";var n=function(t){var n=e.innerHeight,i=t.getBoundingClientRect();return i.top>0&&i.top<n||i.bottom>0&&i.bottom<n},i=function(e){return parseInt(e,10)},o={trigger:{resize:e,scroll:e},test:{visible:function(e){return e.seen=n(e.element),e.seen&&e.expected},"min-width":function(e){return i(e.expected)<=e.element.offsetWidth},"max-width":function(e){return i(e.expected)>=e.element.offsetWidth},"min-height":function(e){return i(e.expected)<=e.element.offsetHeight},"max-height":function(e){return i(e.expected)>=e.element.offsetHeight}}};"undefined"!=typeof module&&module.exports?module.exports=o:"function"==typeof define&&define.amd&&define(function(){return o})}(this);