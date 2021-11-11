// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.sass":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/constans.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RADIUS_CIRCLE = exports.ROWS_COUNT = exports.VIEW_WIDTH = exports.VIEW_WIDTH_SLIDER = exports.VIEW_HEIGHT_SLIDER = exports.VIEW_HEIGHT = exports.DPI_HEIGHT_SLIDER = exports.DPI_HEIGHT = exports.DPI_WIDTH_SLIDER = exports.DPI_WIDTH = exports.PENDING = exports.HEIGHT_SLIDER = exports.HEIGHT = exports.WIDTH_SLIDER = exports.WIDTH = void 0;
var WIDTH = 600;
exports.WIDTH = WIDTH;
var WIDTH_SLIDER = 600;
exports.WIDTH_SLIDER = WIDTH_SLIDER;
var HEIGHT = 200;
exports.HEIGHT = HEIGHT;
var HEIGHT_SLIDER = 50;
exports.HEIGHT_SLIDER = HEIGHT_SLIDER;
var PENDING = 40;
exports.PENDING = PENDING;
var DPI_WIDTH = 2 * WIDTH;
exports.DPI_WIDTH = DPI_WIDTH;
var DPI_WIDTH_SLIDER = 2 * WIDTH_SLIDER;
exports.DPI_WIDTH_SLIDER = DPI_WIDTH_SLIDER;
var DPI_HEIGHT = 2 * HEIGHT;
exports.DPI_HEIGHT = DPI_HEIGHT;
var DPI_HEIGHT_SLIDER = 10 * HEIGHT_SLIDER;
exports.DPI_HEIGHT_SLIDER = DPI_HEIGHT_SLIDER;
var VIEW_HEIGHT = DPI_HEIGHT - 2 * PENDING;
exports.VIEW_HEIGHT = VIEW_HEIGHT;
var VIEW_HEIGHT_SLIDER = DPI_HEIGHT_SLIDER;
exports.VIEW_HEIGHT_SLIDER = VIEW_HEIGHT_SLIDER;
var VIEW_WIDTH_SLIDER = DPI_WIDTH_SLIDER;
exports.VIEW_WIDTH_SLIDER = VIEW_WIDTH_SLIDER;
var VIEW_WIDTH = DPI_WIDTH;
exports.VIEW_WIDTH = VIEW_WIDTH;
var ROWS_COUNT = 5;
exports.ROWS_COUNT = ROWS_COUNT;
var RADIUS_CIRCLE = 8;
exports.RADIUS_CIRCLE = RADIUS_CIRCLE;
},{}],"src/tooltip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.template = template;
exports.tooltip = void 0;

function template(data) {
  /*html*/
  return "\n        <div class=\"date\">".concat(data.title, "</div>\n        <div class=\"data\">\n            ").concat(data.items.map(function (item) {
    return "<div class=\"data__item\" style=\"color: ".concat(item.color, ";\">").concat(item.value, "</div>");
  }).join(''), "\n        </div>\n    ");
}

var tooltip = function tooltip($el) {
  var clear = function clear() {
    return $el.innerHTML = '';
  };

  return {
    hide: function hide() {
      $el.style.display = 'none';
    },
    show: function show(_ref, data) {
      var left = _ref.left,
          top = _ref.top;
      clear();

      var _$el$getBoundingClien = $el.getBoundingClientRect(),
          height = _$el$getBoundingClien.height,
          width = _$el$getBoundingClien.width;

      $el.style.display = 'block';
      $el.style.top = top - height + 'px';
      $el.style.left = left + width / 2 + 'px';
      $el.insertAdjacentHTML('afterbegin', template(data));
    }
  };
};

exports.tooltip = tooltip;
},{}],"src/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.circle = circle;
exports.getBoundaries = getBoundaries;
exports.toDate = toDate;
exports.line = line;
exports.toCoords = toCoords;
exports.isOver = isOver;
exports.yAxis = yAxis;
exports.xAxis = xAxis;

var _constans = require("./constans.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function circle(ctx, _ref, color) {
  var _ref2 = _slicedToArray(_ref, 2),
      x = _ref2[0],
      y = _ref2[1];

  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = color;
  ctx.arc(x, y, _constans.RADIUS_CIRCLE, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function getBoundaries(_ref3) {
  var columns = _ref3.columns,
      types = _ref3.types;
  var valuesY = [];
  columns.forEach(function (column) {
    if (types[column[0]] !== 'line') {
      return;
    }

    valuesY.push.apply(valuesY, _toConsumableArray(column.slice(1)));
  });
  return [Math.min.apply(Math, valuesY), Math.max.apply(Math, valuesY)];
}

function toDate(timestamp, withDay) {
  var date = new Date(timestamp);

  if (withDay) {
    return "".concat(shortDays[date.getDay()], ", ").concat(shortMonths[date.getMonth()], " ").concat(date.getDate());
  }

  return "".concat(shortMonths[date.getMonth()], " ").concat(date.getDate());
}

function line(ctx, coords, _ref4) {
  var color = _ref4.color;
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = color;

  var _iterator = _createForOfIteratorHelper(coords),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          x = _step$value[0],
          y = _step$value[1];

      ctx.lineTo(x, y);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  ctx.stroke();
  ctx.closePath();
}

function toCoords(xRatio, yRatio, height) {
  return function (y, ind) {
    return [Math.floor((ind - 1) * xRatio), Math.floor(height - _constans.PENDING - y * yRatio)];
  };
}

function isOver(mouse, x, length) {
  if (!mouse) {
    return false;
  } // console.log(mouse.x, x);


  var width = _constans.DPI_WIDTH / length;
  return Math.abs(mouse.x - x) < width / 2;
}

function yAxis(ctx, maxY, minY) {
  var step = _constans.VIEW_HEIGHT / _constans.ROWS_COUNT;
  var textStep = (maxY - minY) / _constans.ROWS_COUNT;
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#cee";
  ctx.fillStyle = "#234";
  ctx.font = "22px sans-serif";

  for (var i = 1; i <= _constans.ROWS_COUNT; i++) {
    var y = step * i;
    ctx.moveTo(0, y + _constans.PENDING);
    ctx.lineTo(_constans.DPI_WIDTH, y + _constans.PENDING);
    var text = Math.round(maxY - textStep * i);
    ctx.fillText(text, 5, y + _constans.PENDING - 10);
  }

  ctx.stroke();
  ctx.closePath();
}

function xAxis(ctx, data, xRatio, _ref5) {
  var mouse = _ref5.mouse;
  var count = 6;
  var step = Math.round(data.length / count);
  ctx.beginPath();
  ctx.fillStyle = "#234";
  ctx.font = "22px sans-serif";

  for (var i = 1; i < data.length; i++) {
    var x = i * xRatio;

    if ((i - 1) % step === 0) {
      var text = toDate(data[i - 1]);
      ctx.fillText(text, x, _constans.DPI_HEIGHT - 10);
    }

    if (isOver(mouse, x, data.length)) {
      // console.log('over');
      ctx.save();
      ctx.moveTo(x, _constans.PENDING);
      ctx.lineTo(x, _constans.DPI_HEIGHT - _constans.PENDING);
      ctx.restore();
    }
  }

  ctx.stroke();
  ctx.closePath();
}
},{"./constans.js":"src/constans.js"}],"src/chart.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chart = chart;

var _constans = require("./constans.js");

var _tooltip = require("./tooltip.js");

var _utils = require("./utils.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function chart(root) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var canvas = root.querySelector('canvas');
  var raf;
  var tip = (0, _tooltip.tooltip)(root.querySelector('[data-el="tooltip"]'));
  canvas.style.width = _constans.WIDTH + 'px';
  canvas.style.height = _constans.HEIGHT + 'px';
  canvas.height = _constans.DPI_HEIGHT;
  canvas.width = _constans.DPI_WIDTH;
  var ctx = canvas.getContext('2d');
  canvas.addEventListener('mousemove', mousemove);
  canvas.addEventListener('mouseleave', mouseleave);
  var proxy = new Proxy({}, {
    set: function set() {
      raf = requestAnimationFrame(paint);
      return Reflect.set.apply(Reflect, arguments);
    }
  });

  function clear() {
    ctx.clearRect(0, 0, _constans.DPI_WIDTH, _constans.DPI_HEIGHT);
  }

  function mouseleave() {
    proxy.mouse = null;
    tip.hide();
  }

  function mousemove(_ref) {
    var clientX = _ref.clientX,
        clientY = _ref.clientY;

    var _canvas$getBoundingCl = canvas.getBoundingClientRect(),
        left = _canvas$getBoundingCl.left,
        top = _canvas$getBoundingCl.top;

    proxy.mouse = {
      x: (clientX - left) * 2,
      tooltip: {
        left: clientX - left,
        top: clientY - top
      }
    };
  }

  function paint() {
    clear();

    var _getBoundaries = (0, _utils.getBoundaries)(data),
        _getBoundaries2 = _slicedToArray(_getBoundaries, 2),
        minY = _getBoundaries2[0],
        maxY = _getBoundaries2[1];

    var yRatio = _constans.VIEW_HEIGHT / (maxY - minY);
    var xRatio = _constans.VIEW_WIDTH / (data.columns[0].length - 2);
    var timestamps = data.columns[0].slice(1);
    (0, _utils.yAxis)(ctx, maxY, minY);
    (0, _utils.xAxis)(ctx, timestamps, xRatio, proxy);
    var dataY = data.columns.map(function (column) {
      if (data.types[column[0]] !== 'line') {
        return;
      }

      return column;
    });
    dataY.forEach(function (coords) {
      if (Array.isArray(coords)) {
        var xyCoords = coords.map((0, _utils.toCoords)(xRatio, yRatio, _constans.DPI_HEIGHT)).filter(function (_, i) {
          return i > 0;
        });
        var type = coords[0];
        (0, _utils.line)(ctx, xyCoords, {
          color: data.colors[type]
        });
        xyCoords.forEach(function (_ref2, ind) {
          var _ref3 = _slicedToArray(_ref2, 2),
              x = _ref3[0],
              y = _ref3[1];

          if ((0, _utils.isOver)(proxy.mouse, x, xyCoords.length)) {
            (0, _utils.circle)(ctx, [x, y], data.colors[type]);
            tip.show(proxy.mouse.tooltip, {
              title: (0, _utils.toDate)(timestamps[ind], true),
              items: dataY.slice(1).map(function (v) {
                return v.filter(function (_, i) {
                  return i == ind + 1;
                });
              }).map(function (value, index) {
                return {
                  value: value,
                  color: data.colors[data.columns.slice(1)[index][0]]
                };
              })
            });
          }
        });
      }
    });
  }

  return {
    destroy: function destroy() {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('mousemove', mousemove);
      canvas.removeEventListener('mouseleave', mouseleave);
    },
    init: function init() {
      paint();
    }
  };
}
},{"./constans.js":"src/constans.js","./tooltip.js":"src/tooltip.js","./utils.js":"src/utils.js"}],"src/slider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slider = slider;

var _constans = require("./constans.js");

var _utils = require("./utils.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function slider(root) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var canvas = root.querySelector('canvas');
  var slider = document.querySelector('[data-type="slider"]');
  slider.addEventListener('mousedown', mousedown);
  canvas.style.width = _constans.WIDTH_SLIDER + 'px';
  canvas.style.height = _constans.HEIGHT_SLIDER + 'px';
  canvas.height = _constans.DPI_HEIGHT_SLIDER;
  canvas.width = _constans.DPI_WIDTH_SLIDER;
  var ctx = canvas.getContext('2d');

  function mousedown(e) {
    if (e.target.dataset.type === 'resize') {
      var $el = e.target.closest('[data-el]'); // console.log($el.dataset.el);

      if ($el.dataset.el === 'left') {
        // $el.style.left = `calc( 2px - 45% + ${e.offsetX}px)`
        slider.onmousemove = function (e) {
          // console.log(e.offsetX);
          $el.style.left = "calc( 2px - 45% + ".concat(e.offsetX, "px)");
        };

        slider.onmouseup = function (e) {
          $el.style.left = "calc( 2px - 45% + ".concat(e.offsetX, "px)"); // $el.style.width = e.offsetX + 'px'

          slider.onmousemove = null;
        };
      } else if ($el.dataset.el === 'right') {
        slider.onmousemove = function (e) {// $el.style.width = ( WIDTH_SLIDER - e.offsetX ) + 'px'
        };

        slider.onmouseup = function (e) {
          // $el.style.width = ( WIDTH_SLIDER - e.offsetX ) + 'px'
          slider.onmousemove = null;
        };
      }
    } else if (e.target.dataset.el === 'window') {// console.log(e.target.dataset.el);
    }
  }

  function paint() {
    var _getBoundaries = (0, _utils.getBoundaries)(data),
        _getBoundaries2 = _slicedToArray(_getBoundaries, 2),
        minY = _getBoundaries2[0],
        maxY = _getBoundaries2[1];

    var yRatio = _constans.VIEW_HEIGHT_SLIDER / (maxY - minY);
    var xRatio = _constans.VIEW_WIDTH_SLIDER / (data.columns[0].length - 2);
    var dataY = data.columns.map(function (column) {
      if (data.types[column[0]] !== 'line') {
        return;
      }

      return column;
    });
    dataY.forEach(function (coords) {
      if (Array.isArray(coords)) {
        var xyCoords = coords.map((0, _utils.toCoords)(xRatio, yRatio, _constans.DPI_HEIGHT_SLIDER + 80)).filter(function (_, i) {
          return i > 0;
        });
        var type = coords[0];
        (0, _utils.line)(ctx, xyCoords, {
          color: data.colors[type]
        });
      }
    });
  }

  return {
    init: function init() {
      paint();
    }
  };
}
},{"./constans.js":"src/constans.js","./utils.js":"src/utils.js"}],"src/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChartData = getChartData;

function getChartData() {
  return [{
    columns: [['x', 1542412800000, 1542499200000, 1542585600000, 1542672000000, 1542758400000, 1542844800000, 1542931200000, 1543017600000, 1543104000000, 1543190400000, 1543276800000, 1543363200000, 1543449600000, 1543536000000, 1543622400000, 1543708800000, 1543795200000, 1543881600000, 1543968000000, 1544054400000, 1544140800000, 1544227200000, 1544313600000, 1544400000000, 1544486400000, 1544572800000, 1544659200000, 1544745600000, 1544832000000, 1544918400000, 1545004800000, 1545091200000, 1545177600000, 1545264000000, 1545350400000, 1545436800000, 1545523200000, 1545609600000, 1545696000000, 1545782400000, 1545868800000, 1545955200000, 1546041600000, 1546128000000, 1546214400000, 1546300800000, 1546387200000, 1546473600000, 1546560000000, 1546646400000, 1546732800000, 1546819200000, 1546905600000, 1546992000000, 1547078400000, 1547164800000, 1547251200000, 1547337600000, 1547424000000, 1547510400000, 1547596800000, 1547683200000, 1547769600000, 1547856000000, 1547942400000, 1548028800000, 1548115200000, 1548201600000, 1548288000000, 1548374400000, 1548460800000, 1548547200000, 1548633600000, 1548720000000, 1548806400000, 1548892800000, 1548979200000, 1549065600000, 1549152000000, 1549238400000, 1549324800000, 1549411200000, 1549497600000, 1549584000000, 1549670400000, 1549756800000, 1549843200000, 1549929600000, 1550016000000, 1550102400000, 1550188800000, 1550275200000, 1550361600000, 1550448000000, 1550534400000, 1550620800000, 1550707200000, 1550793600000, 1550880000000, 1550966400000, 1551052800000, 1551139200000, 1551225600000, 1551312000000, 1551398400000, 1551484800000, 1551571200000, 1551657600000, 1551744000000, 1551830400000, 1551916800000, 1552003200000], ['y0', 37, 20, 32, 39, 32, 35, 19, 65, 36, 62, 113, 69, 120, 60, 51, 49, 71, 122, 149, 69, 57, 21, 33, 55, 92, 62, 47, 50, 56, 116, 63, 60, 55, 65, 76, 33, 45, 64, 54, 81, 180, 123, 106, 37, 60, 70, 46, 68, 46, 51, 33, 57, 75, 70, 95, 70, 50, 68, 63, 66, 53, 38, 52, 109, 121, 53, 36, 71, 96, 55, 58, 29, 31, 55, 52, 44, 126, 191, 73, 87, 255, 278, 219, 170, 129, 125, 126, 84, 65, 53, 154, 57, 71, 64, 75, 72, 39, 47, 52, 73, 89, 156, 86, 105, 88, 45, 33, 56, 142, 124, 114, 64], ['y1', 22, 12, 30, 40, 33, 23, 18, 41, 45, 69, 57, 61, 70, 47, 31, 34, 40, 55, 27, 57, 48, 32, 40, 49, 54, 49, 34, 51, 51, 51, 66, 51, 94, 60, 64, 28, 44, 96, 49, 73, 30, 88, 63, 42, 56, 67, 52, 67, 35, 61, 40, 55, 63, 61, 105, 59, 51, 76, 63, 57, 47, 56, 51, 98, 103, 62, 54, 104, 48, 41, 41, 37, 30, 28, 26, 37, 65, 86, 70, 81, 54, 74, 70, 50, 74, 79, 85, 62, 36, 46, 68, 43, 66, 50, 28, 66, 39, 23, 63, 74, 83, 66, 40, 60, 29, 36, 27, 54, 89, 50, 73, 52]],
    types: {
      y0: 'line',
      y1: 'line',
      x: 'x'
    },
    names: {
      y0: '#0',
      y1: '#1'
    },
    colors: {
      y0: '#3DC23F',
      y1: '#F34C44'
    }
  }][0];
}
},{}],"src/app.js":[function(require,module,exports) {
"use strict";

require("./styles.sass");

var _chart = require("./chart.js");

var _slider = require("./slider.js");

var _data = require("./data.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var mainChart = document.querySelector('.main-chart');
var sliderEl = document.querySelector('.slider');
var telegramChart = (0, _chart.chart)(mainChart, (0, _data.getChartData)());
var sliderChart = (0, _slider.slider)(sliderEl, (0, _data.getChartData)());
telegramChart.init();
sliderChart.init();

function groupBy(arr, prop) {
  var isFunc = typeof prop === 'function';
  return arr.reduce(function (group, item) {
    var key = isFunc ? prop(item) : item[prop];

    if (!(key in group)) {
      group[key] = [];
    }

    group[key].push(item);
    return group;
  }, {});
}

function differenceBy(firstArr, secondArr, prop) {
  var isFunc = typeof prop === 'function';
  return [].concat(_toConsumableArray(firstArr.filter(function (valueFirst) {
    return !secondArr.map(function (val) {
      return isFunc ? prop(val) : val[prop];
    }).includes(isFunc ? prop(valueFirst) : valueFirst[prop]);
  })), _toConsumableArray(secondArr.filter(function (valueSecond) {
    return !firstArr.map(function (val) {
      return isFunc ? prop(val) : val[prop];
    }).includes(isFunc ? prop(valueSecond) : valueSecond[prop]);
  })));
}

function intersectionBy(firstArr, secondArr, prop) {
  var isFunc = typeof prop === 'function';
  return firstArr.filter(function (valueFirst) {
    return secondArr.map(function (val) {
      return isFunc ? prop(val) : val[prop];
    }).includes(isFunc ? prop(valueFirst) : valueFirst[prop]);
  });
}

console.log(intersectionBy([{
  'x': 2,
  y: 9
}], [{
  x: 2,
  y: 9
}, {
  'x': 1,
  y: 78
}], 'y'));
console.log(differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor));

var Node = function Node(name) {
  _classCallCheck(this, Node);

  this.name = name;
  this.visited = false;
};

var A = new Node('A');
var B = new Node('B');
var C = new Node('C');
var D = new Node('D');
var F = new Node('F');
var adj = new Map();
adj.set(A, [C, F]);
adj.set(C, [D]);

function dfs(adj, s, t) {
  if (s.name === t.name) return true;
  if (s.visited) return false;
  s.visited = true;
  var childs = adj.get(s);
  if (!childs) return false;

  var _iterator = _createForOfIteratorHelper(childs),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var neighbor = _step.value;

      if (!neighbor.visited) {
        var reached = dfs(adj, neighbor, t);
        if (reached) return true;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return false;
}

function bfs(adj, s, t) {
  var queue = [];
  queue.push(s);
  s.visited = true;

  while (queue.length > 0) {
    var _s = queue.shift();

    var childs = adj.get(_s);
    if (!childs) return false;

    var _iterator2 = _createForOfIteratorHelper(childs),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var neighbor = _step2.value;

        if (!neighbor.visited) {
          queue.push(neighbor);
          neighbor.visited = true;
          if (neighbor === t) return true;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  return false;
}

console.log(bfs(adj, A, D));
},{"./styles.sass":"src/styles.sass","./chart.js":"src/chart.js","./slider.js":"src/slider.js","./data.js":"src/data.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63198" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app.js"], null)
//# sourceMappingURL=/app.a6a4d504.js.map