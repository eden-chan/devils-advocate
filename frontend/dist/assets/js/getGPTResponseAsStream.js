import { R as React, r as react, a as jsx, d as reactDom, e as commonjsGlobal, f as React__default, j as jsxs, F as Fragment } from "./_virtual_reload-on-update-in-view.js";
import { c as sendMessageToBackground } from "./message.js";
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}
function createStyleElement(options) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  tag.setAttribute("data-s", "");
  return tag;
}
var StyleSheet = /* @__PURE__ */ function() {
  function StyleSheet2(options) {
    var _this = this;
    this._insertTag = function(tag) {
      var before;
      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }
      _this.container.insertBefore(tag, before);
      _this.tags.push(tag);
    };
    this.isSpeedy = options.speedy === void 0 ? true : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce;
    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }
  var _proto = StyleSheet2.prototype;
  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };
  _proto.insert = function insert(rule) {
    if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }
    var tag = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e2) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }
    this.ctr++;
  };
  _proto.flush = function flush() {
    this.tags.forEach(function(tag) {
      return tag.parentNode && tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };
  return StyleSheet2;
}();
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var abs = Math.abs;
var from = String.fromCharCode;
var assign$3 = Object.assign;
function hash$2(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index2) {
  return value.charCodeAt(index2) | 0;
}
function substr(value, begin, end2) {
  return value.slice(begin, end2);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
var line = 1;
var column = 1;
var length = 0;
var position$1 = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children2, length2) {
  return { value, root, parent, type, props, children: children2, line, column, length: length2, return: "" };
}
function copy(root, props) {
  return assign$3(node("", null, null, "", null, null, 0), root, { length: -root.length }, props);
}
function char() {
  return character;
}
function prev() {
  character = position$1 > 0 ? charat(characters, --position$1) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position$1 < length ? charat(characters, position$1++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position$1);
}
function caret() {
  return position$1;
}
function slice(begin, end2) {
  return substr(characters, begin, end2);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position$1 = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position$1 - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index2, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index2, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position$1;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position$1;
}
function commenter(type, index2) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index2, position$1 - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index2) {
  while (!token(peek()))
    next();
  return slice(index2, position$1);
}
function compile(value) {
  return dealloc(parse$1("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse$1(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index2 = 0;
  var offset2 = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children2 = rulesets;
  var reference2 = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index2++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset2:
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference2 = ruleset(characters2, root, parent, index2, offset2, rules, points, type, props = [], children2 = [], length2), rulesets);
            if (character2 === 123)
              if (offset2 === 0)
                parse$1(characters2, root, reference2, reference2, props, rulesets, length2, points, children2);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  case 100:
                  case 109:
                  case 115:
                    parse$1(value, reference2, reference2, rule && append(ruleset(value, reference2, reference2, 0, 0, rules, points, type, rules, props = [], length2), children2), rules, children2, length2, points, rule ? props : children2);
                    break;
                  default:
                    parse$1(characters2, reference2, reference2, reference2, [""], children2, 0, points, children2);
                }
        }
        index2 = offset2 = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset2 > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index2++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset2 = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index2, offset2, rules, points, type, props, children2, length2) {
  var post = offset2 - 1;
  var rule = offset2 === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k2 = 0; i < index2; ++i)
    for (var x2 = 0, y2 = substr(value, post + 1, post = abs(j = points[i])), z2 = value; x2 < size; ++x2)
      if (z2 = trim(j > 0 ? rule[x2] + " " + y2 : replace(y2, /&\f/g, rule[x2])))
        props[k2++] = z2;
  return node(value, root, parent, offset2 === 0 ? RULESET : type, props, children2, length2);
}
function comment(value, root, parent) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length2) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}
function serialize(children2, callback) {
  var output = "";
  var length2 = sizeof(children2);
  for (var i = 0; i < length2; i++)
    output += callback(children2[i], i, children2, callback) || "";
  return output;
}
function stringify(element, index2, children2, callback) {
  switch (element.type) {
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      element.value = element.props.join(",");
  }
  return strlen(children2 = serialize(element.children, callback)) ? element.return = element.value + "{" + children2 + "}" : "";
}
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index2, children2, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index2, children2, callback) || "";
    return output;
  };
}
function rulesheet(callback) {
  return function(element) {
    if (!element.root) {
      if (element = element.return)
        callback(element);
    }
  };
}
var weakMemoize = function weakMemoize2(func) {
  var cache = /* @__PURE__ */ new WeakMap();
  return function(arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};
function memoize$2(fn2) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function(arg) {
    if (cache[arg] === void 0)
      cache[arg] = fn2(arg);
    return cache[arg];
  };
}
var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index2) {
  var previous = 0;
  var character2 = 0;
  while (true) {
    previous = character2;
    character2 = peek();
    if (previous === 38 && character2 === 12) {
      points[index2] = 1;
    }
    if (token(character2)) {
      break;
    }
    next();
  }
  return slice(begin, position$1);
};
var toRules = function toRules2(parsed, points) {
  var index2 = -1;
  var character2 = 44;
  do {
    switch (token(character2)) {
      case 0:
        if (character2 === 38 && peek() === 12) {
          points[index2] = 1;
        }
        parsed[index2] += identifierWithPointTracking(position$1 - 1, points, index2);
        break;
      case 2:
        parsed[index2] += delimit(character2);
        break;
      case 4:
        if (character2 === 44) {
          parsed[++index2] = peek() === 58 ? "&\f" : "";
          points[index2] = parsed[index2].length;
          break;
        }
      default:
        parsed[index2] += from(character2);
    }
  } while (character2 = next());
  return parsed;
};
var getRules = function getRules2(value, points) {
  return dealloc(toRules(alloc(value), points));
};
var fixedElements = /* @__PURE__ */ new WeakMap();
var compat = function compat2(element) {
  if (element.type !== "rule" || !element.parent || element.length < 1) {
    return;
  }
  var value = element.value, parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;
  while (parent.type !== "rule") {
    parent = parent.parent;
    if (!parent)
      return;
  }
  if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
    return;
  }
  if (isImplicitRule) {
    return;
  }
  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;
  for (var i = 0, k2 = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k2++) {
      element.props[k2] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel2(element) {
  if (element.type === "decl") {
    var value = element.value;
    if (value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98) {
      element["return"] = "";
      element.value = "";
    }
  }
};
function prefix(value, length2) {
  switch (hash$2(value, length2)) {
    case 5103:
      return WEBKIT + "print-" + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6)
        switch (charat(value, length2 + 1)) {
          case 109:
            if (charat(value, length2 + 4) !== 45)
              break;
          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
          case 115:
            return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2) + value : value;
        }
      break;
    case 4949:
      if (charat(value, length2 + 1) !== 115)
        break;
    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
        case 107:
          return replace(value, ":", ":" + WEBKIT) + value;
        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
      }
      break;
    case 5936:
      switch (charat(value, length2 + 11)) {
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
      return WEBKIT + value + MS + value + value;
  }
  return value;
}
var prefixer = function prefixer2(element, index2, children2, callback) {
  if (element.length > -1) {
    if (!element["return"])
      switch (element.type) {
        case DECLARATION:
          element["return"] = prefix(element.value, element.length);
          break;
        case KEYFRAMES:
          return serialize([copy(element, {
            value: replace(element.value, "@", "@" + WEBKIT)
          })], callback);
        case RULESET:
          if (element.length)
            return combine(element.props, function(value) {
              switch (match(value, /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  return serialize([copy(element, {
                    props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")]
                  })], callback);
                case "::placeholder":
                  return serialize([copy(element, {
                    props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")]
                  }), copy(element, {
                    props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")]
                  }), copy(element, {
                    props: [replace(value, /:(plac\w+)/, MS + "input-$1")]
                  })], callback);
              }
              return "";
            });
      }
  }
};
var defaultStylisPlugins = [prefixer];
var createCache = function createCache2(options) {
  var key = options.key;
  if (key === "css") {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(ssrStyles, function(node2) {
      var dataEmotionAttribute = node2.getAttribute("data-emotion");
      if (dataEmotionAttribute.indexOf(" ") === -1) {
        return;
      }
      document.head.appendChild(node2);
      node2.setAttribute("data-s", "");
    });
  }
  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
  var inserted = {};
  var container;
  var nodesToHydrate = [];
  {
    container = options.container || document.head;
    Array.prototype.forEach.call(
      document.querySelectorAll('style[data-emotion^="' + key + ' "]'),
      function(node2) {
        var attrib = node2.getAttribute("data-emotion").split(" ");
        for (var i = 1; i < attrib.length; i++) {
          inserted[attrib[i]] = true;
        }
        nodesToHydrate.push(node2);
      }
    );
  }
  var _insert;
  var omnipresentPlugins = [compat, removeLabel];
  {
    var currentSheet;
    var finalizingPlugins = [stringify, rulesheet(function(rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
    var stylis = function stylis2(styles) {
      return serialize(compile(styles), serializer);
    };
    _insert = function insert(selector2, serialized, sheet, shouldCache) {
      currentSheet = sheet;
      stylis(selector2 ? selector2 + "{" + serialized.styles + "}" : serialized.styles);
      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }
  var cache = {
    key,
    sheet: new StyleSheet({
      key,
      container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var reactIs$1 = { exports: {} };
var reactIs_production_min = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b = "function" === typeof Symbol && Symbol.for, c = b ? Symbol.for("react.element") : 60103, d = b ? Symbol.for("react.portal") : 60106, e$1 = b ? Symbol.for("react.fragment") : 60107, f = b ? Symbol.for("react.strict_mode") : 60108, g = b ? Symbol.for("react.profiler") : 60114, h$2 = b ? Symbol.for("react.provider") : 60109, k$1 = b ? Symbol.for("react.context") : 60110, l$1 = b ? Symbol.for("react.async_mode") : 60111, m$1 = b ? Symbol.for("react.concurrent_mode") : 60111, n$2 = b ? Symbol.for("react.forward_ref") : 60112, p$2 = b ? Symbol.for("react.suspense") : 60113, q$2 = b ? Symbol.for("react.suspense_list") : 60120, r$2 = b ? Symbol.for("react.memo") : 60115, t$4 = b ? Symbol.for("react.lazy") : 60116, v$1 = b ? Symbol.for("react.block") : 60121, w$1 = b ? Symbol.for("react.fundamental") : 60117, x = b ? Symbol.for("react.responder") : 60118, y = b ? Symbol.for("react.scope") : 60119;
function z(a) {
  if ("object" === typeof a && null !== a) {
    var u2 = a.$$typeof;
    switch (u2) {
      case c:
        switch (a = a.type, a) {
          case l$1:
          case m$1:
          case e$1:
          case g:
          case f:
          case p$2:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k$1:
              case n$2:
              case t$4:
              case r$2:
              case h$2:
                return a;
              default:
                return u2;
            }
        }
      case d:
        return u2;
    }
  }
}
function A(a) {
  return z(a) === m$1;
}
reactIs_production_min.AsyncMode = l$1;
reactIs_production_min.ConcurrentMode = m$1;
reactIs_production_min.ContextConsumer = k$1;
reactIs_production_min.ContextProvider = h$2;
reactIs_production_min.Element = c;
reactIs_production_min.ForwardRef = n$2;
reactIs_production_min.Fragment = e$1;
reactIs_production_min.Lazy = t$4;
reactIs_production_min.Memo = r$2;
reactIs_production_min.Portal = d;
reactIs_production_min.Profiler = g;
reactIs_production_min.StrictMode = f;
reactIs_production_min.Suspense = p$2;
reactIs_production_min.isAsyncMode = function(a) {
  return A(a) || z(a) === l$1;
};
reactIs_production_min.isConcurrentMode = A;
reactIs_production_min.isContextConsumer = function(a) {
  return z(a) === k$1;
};
reactIs_production_min.isContextProvider = function(a) {
  return z(a) === h$2;
};
reactIs_production_min.isElement = function(a) {
  return "object" === typeof a && null !== a && a.$$typeof === c;
};
reactIs_production_min.isForwardRef = function(a) {
  return z(a) === n$2;
};
reactIs_production_min.isFragment = function(a) {
  return z(a) === e$1;
};
reactIs_production_min.isLazy = function(a) {
  return z(a) === t$4;
};
reactIs_production_min.isMemo = function(a) {
  return z(a) === r$2;
};
reactIs_production_min.isPortal = function(a) {
  return z(a) === d;
};
reactIs_production_min.isProfiler = function(a) {
  return z(a) === g;
};
reactIs_production_min.isStrictMode = function(a) {
  return z(a) === f;
};
reactIs_production_min.isSuspense = function(a) {
  return z(a) === p$2;
};
reactIs_production_min.isValidElementType = function(a) {
  return "string" === typeof a || "function" === typeof a || a === e$1 || a === m$1 || a === g || a === f || a === p$2 || a === q$2 || "object" === typeof a && null !== a && (a.$$typeof === t$4 || a.$$typeof === r$2 || a.$$typeof === h$2 || a.$$typeof === k$1 || a.$$typeof === n$2 || a.$$typeof === w$1 || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v$1);
};
reactIs_production_min.typeOf = z;
(function(module) {
  {
    module.exports = reactIs_production_min;
  }
})(reactIs$1);
var reactIs = reactIs$1.exports;
var FORWARD_REF_STATICS = {
  "$$typeof": true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  "$$typeof": true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
var isBrowser$1 = true;
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = "";
  classNames.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles2(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;
  if ((isStringTag === false || isBrowser$1 === false) && cache.registered[className] === void 0) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles2(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;
  if (cache.inserted[serialized.name] === void 0) {
    var current = serialized;
    do {
      cache.insert(serialized === current ? "." + className : "", current, cache.sheet, true);
      current = current.next;
    } while (current !== void 0);
  }
};
function murmur2(str) {
  var h2 = 0;
  var k2, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k2 = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k2 = (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16);
    k2 ^= k2 >>> 24;
    h2 = (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16) ^ (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h2 ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h2 ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h2 ^= str.charCodeAt(i) & 255;
      h2 = (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  h2 ^= h2 >>> 13;
  h2 = (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  return ((h2 ^ h2 >>> 15) >>> 0).toString(36);
}
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty2(property) {
  return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue2(value) {
  return value != null && typeof value !== "boolean";
};
var processStyleName = /* @__PURE__ */ memoize$2(function(styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
});
var processStyleValue = function processStyleValue2(key, value) {
  switch (key) {
    case "animation":
    case "animationName": {
      if (typeof value === "string") {
        return value.replace(animationRegex, function(match2, p1, p2) {
          cursor = {
            name: p1,
            styles: p2,
            next: cursor
          };
          return p1;
        });
      }
    }
  }
  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
    return value + "px";
  }
  return value;
};
var noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return "";
  }
  if (interpolation.__emotion_styles !== void 0) {
    return interpolation;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      if (interpolation.anim === 1) {
        cursor = {
          name: interpolation.name,
          styles: interpolation.styles,
          next: cursor
        };
        return interpolation.name;
      }
      if (interpolation.styles !== void 0) {
        var next2 = interpolation.next;
        if (next2 !== void 0) {
          while (next2 !== void 0) {
            cursor = {
              name: next2.name,
              styles: next2.styles,
              next: cursor
            };
            next2 = next2.next;
          }
        }
        var styles = interpolation.styles + ";";
        return styles;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
    case "function": {
      if (mergedProps !== void 0) {
        var previousCursor = cursor;
        var result = interpolation(mergedProps);
        cursor = previousCursor;
        return handleInterpolation(mergedProps, registered, result);
      }
      break;
    }
  }
  if (registered == null) {
    return interpolation;
  }
  var cached = registered[interpolation];
  return cached !== void 0 ? cached : interpolation;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = "";
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];
      if (typeof value !== "object") {
        if (registered != null && registered[value] !== void 0) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === "NO_COMPONENT_SELECTOR" && false) {
          throw new Error(noComponentSelectorMessage);
        }
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (_key) {
            case "animation":
            case "animationName": {
              string += processStyleName(_key) + ":" + interpolated + ";";
              break;
            }
            default: {
              string += _key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string;
}
var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var cursor;
var serializeStyles = function serializeStyles2(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
    return args[0];
  }
  var stringMode = true;
  var styles = "";
  cursor = void 0;
  var strings = args[0];
  if (strings == null || strings.raw === void 0) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    styles += strings[0];
  }
  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);
    if (stringMode) {
      styles += strings[i];
    }
  }
  labelPattern.lastIndex = 0;
  var identifierName = "";
  var match2;
  while ((match2 = labelPattern.exec(styles)) !== null) {
    identifierName += "-" + match2[1];
  }
  var name = murmur2(styles) + identifierName;
  return {
    name,
    styles,
    next: cursor
  };
};
var syncFallback = function syncFallback2(create) {
  return create();
};
var useInsertionEffect = React["useInsertionEffect"] ? React["useInsertionEffect"] : false;
var useInsertionEffectAlwaysWithSyncFallback = useInsertionEffect || syncFallback;
var useInsertionEffectWithLayoutFallback = useInsertionEffect || react.exports.useLayoutEffect;
var EmotionCacheContext = /* @__PURE__ */ react.exports.createContext(
  typeof HTMLElement !== "undefined" ? /* @__PURE__ */ createCache({
    key: "css"
  }) : null
);
var CacheProvider = EmotionCacheContext.Provider;
var withEmotionCache = function withEmotionCache2(func) {
  return /* @__PURE__ */ react.exports.forwardRef(function(props, ref) {
    var cache = react.exports.useContext(EmotionCacheContext);
    return func(props, cache, ref);
  });
};
var ThemeContext = /* @__PURE__ */ react.exports.createContext({});
var getTheme = function getTheme2(outerTheme, theme) {
  if (typeof theme === "function") {
    var mergedTheme = theme(outerTheme);
    return mergedTheme;
  }
  return _extends({}, outerTheme, theme);
};
var createCacheWithTheme = /* @__PURE__ */ weakMemoize(function(outerTheme) {
  return weakMemoize(function(theme) {
    return getTheme(outerTheme, theme);
  });
});
var ThemeProvider = function ThemeProvider2(props) {
  var theme = react.exports.useContext(ThemeContext);
  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }
  return /* @__PURE__ */ react.exports.createElement(ThemeContext.Provider, {
    value: theme
  }, props.children);
};
var Global = /* @__PURE__ */ withEmotionCache(function(props, cache) {
  var styles = props.styles;
  var serialized = serializeStyles([styles], void 0, react.exports.useContext(ThemeContext));
  var sheetRef = react.exports.useRef();
  useInsertionEffectWithLayoutFallback(function() {
    var key = cache.key + "-global";
    var sheet = new cache.sheet.constructor({
      key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false;
    var node2 = document.querySelector('style[data-emotion="' + key + " " + serialized.name + '"]');
    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }
    if (node2 !== null) {
      rehydrating = true;
      node2.setAttribute("data-emotion", key);
      sheet.hydrate([node2]);
    }
    sheetRef.current = [sheet, rehydrating];
    return function() {
      sheet.flush();
    };
  }, [cache]);
  useInsertionEffectWithLayoutFallback(function() {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0], rehydrating = sheetRefCurrent[1];
    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }
    if (serialized.next !== void 0) {
      insertStyles(cache, serialized.next, true);
    }
    if (sheet.tags.length) {
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }
    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});
function css$1() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return serializeStyles(args);
}
var keyframes$1 = function keyframes() {
  var insertable = css$1.apply(void 0, arguments);
  var name = "animation-" + insertable.name;
  return {
    name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};
function getErrorMessage(hook, provider) {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`;
}
function createContext(options = {}) {
  const {
    name,
    strict = true,
    hookName = "useContext",
    providerName = "Provider",
    errorMessage
  } = options;
  const Context = react.exports.createContext(void 0);
  Context.displayName = name;
  function useContext() {
    var _a2;
    const context = react.exports.useContext(Context);
    if (!context && strict) {
      const error2 = new Error(
        errorMessage != null ? errorMessage : getErrorMessage(hookName, providerName)
      );
      error2.name = "ContextError";
      (_a2 = Error.captureStackTrace) == null ? void 0 : _a2.call(Error, error2, useContext);
      throw error2;
    }
    return context;
  }
  return [Context.Provider, useContext, Context];
}
var [PortalManagerContextProvider, usePortalManager] = createContext({
  strict: false,
  name: "PortalManagerContext"
});
var useSafeLayoutEffect = Boolean(globalThis == null ? void 0 : globalThis.document) ? react.exports.useLayoutEffect : react.exports.useEffect;
var [PortalContextProvider, usePortalContext] = createContext({
  strict: false,
  name: "PortalContext"
});
var PORTAL_CLASSNAME = "chakra-portal";
var PORTAL_SELECTOR = `.chakra-portal`;
var Container = (props) => /* @__PURE__ */ jsx(
  "div",
  {
    className: "chakra-portal-zIndex",
    style: {
      position: "absolute",
      zIndex: props.zIndex,
      top: 0,
      left: 0,
      right: 0
    },
    children: props.children
  }
);
var DefaultPortal = (props) => {
  const { appendToParentPortal, children: children2 } = props;
  const [tempNode, setTempNode] = react.exports.useState(null);
  const portal = react.exports.useRef(null);
  const [, forceUpdate] = react.exports.useState({});
  react.exports.useEffect(() => forceUpdate({}), []);
  const parentPortal = usePortalContext();
  const manager = usePortalManager();
  useSafeLayoutEffect(() => {
    if (!tempNode)
      return;
    const doc = tempNode.ownerDocument;
    const host = appendToParentPortal ? parentPortal != null ? parentPortal : doc.body : doc.body;
    if (!host)
      return;
    portal.current = doc.createElement("div");
    portal.current.className = PORTAL_CLASSNAME;
    host.appendChild(portal.current);
    forceUpdate({});
    const portalNode = portal.current;
    return () => {
      if (host.contains(portalNode)) {
        host.removeChild(portalNode);
      }
    };
  }, [tempNode]);
  const _children = (manager == null ? void 0 : manager.zIndex) ? /* @__PURE__ */ jsx(Container, { zIndex: manager == null ? void 0 : manager.zIndex, children: children2 }) : children2;
  return portal.current ? reactDom.exports.createPortal(
    /* @__PURE__ */ jsx(PortalContextProvider, { value: portal.current, children: _children }),
    portal.current
  ) : /* @__PURE__ */ jsx(
    "span",
    {
      ref: (el) => {
        if (el)
          setTempNode(el);
      }
    }
  );
};
var ContainerPortal = (props) => {
  const { children: children2, containerRef, appendToParentPortal } = props;
  const containerEl = containerRef.current;
  const host = containerEl != null ? containerEl : typeof window !== "undefined" ? document.body : void 0;
  const portal = react.exports.useMemo(() => {
    const node2 = containerEl == null ? void 0 : containerEl.ownerDocument.createElement("div");
    if (node2)
      node2.className = PORTAL_CLASSNAME;
    return node2;
  }, [containerEl]);
  const [, forceUpdate] = react.exports.useState({});
  useSafeLayoutEffect(() => forceUpdate({}), []);
  useSafeLayoutEffect(() => {
    if (!portal || !host)
      return;
    host.appendChild(portal);
    return () => {
      host.removeChild(portal);
    };
  }, [portal, host]);
  if (host && portal) {
    return reactDom.exports.createPortal(
      /* @__PURE__ */ jsx(PortalContextProvider, { value: appendToParentPortal ? portal : null, children: children2 }),
      portal
    );
  }
  return null;
};
function Portal(props) {
  const portalProps = {
    appendToParentPortal: true,
    ...props
  };
  const { containerRef, ...rest } = portalProps;
  return containerRef ? /* @__PURE__ */ jsx(ContainerPortal, { containerRef, ...rest }) : /* @__PURE__ */ jsx(DefaultPortal, { ...rest });
}
Portal.className = PORTAL_CLASSNAME;
Portal.selector = PORTAL_SELECTOR;
Portal.displayName = "Portal";
function useTheme() {
  const theme = react.exports.useContext(
    ThemeContext
  );
  if (!theme) {
    throw Error(
      "useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<ChakraProvider />` or `<ThemeProvider />`"
    );
  }
  return theme;
}
var ColorModeContext = react.exports.createContext({});
ColorModeContext.displayName = "ColorModeContext";
function useColorMode() {
  const context = react.exports.useContext(ColorModeContext);
  if (context === void 0) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
}
function useChakra() {
  const colorModeResult = useColorMode();
  const theme = useTheme();
  return { ...colorModeResult, theme };
}
var cx = (...classNames) => classNames.filter(Boolean).join(" ");
function isObject(value) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function") && !Array.isArray(value);
}
function runIfFn$1(valueOrFn, ...args) {
  return isFunction$2(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}
var isFunction$2 = (value) => typeof value === "function";
var dataAttr = (condition) => condition ? "" : void 0;
var ariaAttr = (condition) => condition ? true : void 0;
function callAllHandlers(...fns) {
  return function func(event) {
    fns.some((fn2) => {
      fn2 == null ? void 0 : fn2(event);
      return event == null ? void 0 : event.defaultPrevented;
    });
  };
}
var lodash_mergewith = { exports: {} };
(function(module, exports) {
  var LARGE_ARRAY_SIZE = 200;
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var HOT_COUNT = 800, HOT_SPAN = 16;
  var MAX_SAFE_INTEGER = 9007199254740991;
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal.process;
  var nodeUtil = function() {
    try {
      var types2 = freeModule && freeModule.require && freeModule.require("util").types;
      if (types2) {
        return types2;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e2) {
    }
  }();
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }
  function baseTimes(n2, iteratee) {
    var index2 = -1, result = Array(n2);
    while (++index2 < n2) {
      result[index2] = iteratee(index2);
    }
    return result;
  }
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  function getValue2(object, key) {
    return object == null ? void 0 : object[key];
  }
  function overArg(func, transform2) {
    return function(arg) {
      return func(transform2(arg));
    };
  }
  var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
  var coreJsData = root["__core-js_shared__"];
  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  var nativeObjectToString = objectProto.toString;
  var objectCtorString = funcToString.call(Object);
  var reIsNative = RegExp(
    "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  var Buffer = moduleExports ? root.Buffer : void 0, Symbol2 = root.Symbol, Uint8Array = root.Uint8Array, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
  var defineProperty = function() {
    try {
      var func = getNative(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e2) {
    }
  }();
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0, nativeMax = Math.max, nativeNow = Date.now;
  var Map2 = getNative(root, "Map"), nativeCreate = getNative(Object, "create");
  var baseCreate = function() {
    function object() {
    }
    return function(proto) {
      if (!isObject2(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object();
      object.prototype = void 0;
      return result;
    };
  }();
  function Hash(entries) {
    var index2 = -1, length2 = entries == null ? 0 : entries.length;
    this.clear();
    while (++index2 < length2) {
      var entry = entries[index2];
      this.set(entry[0], entry[1]);
    }
  }
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : void 0;
  }
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
  }
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function ListCache(entries) {
    var index2 = -1, length2 = entries == null ? 0 : entries.length;
    this.clear();
    while (++index2 < length2) {
      var entry = entries[index2];
      this.set(entry[0], entry[1]);
    }
  }
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  function listCacheDelete(key) {
    var data = this.__data__, index2 = assocIndexOf(data, key);
    if (index2 < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index2 == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index2, 1);
    }
    --this.size;
    return true;
  }
  function listCacheGet(key) {
    var data = this.__data__, index2 = assocIndexOf(data, key);
    return index2 < 0 ? void 0 : data[index2][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data = this.__data__, index2 = assocIndexOf(data, key);
    if (index2 < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index2][1] = value;
    }
    return this;
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  function MapCache(entries) {
    var index2 = -1, length2 = entries == null ? 0 : entries.length;
    this.clear();
    while (++index2 < length2) {
      var entry = entries[index2];
      this.set(entry[0], entry[1]);
    }
  }
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map2 || ListCache)(),
      "string": new Hash()
    };
  }
  function mapCacheDelete(key) {
    var result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  function mapCacheSet(key, value) {
    var data = getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  function Stack2(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  function stackClear() {
    this.__data__ = new ListCache();
    this.size = 0;
  }
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  function stackGet(key) {
    return this.__data__.get(key);
  }
  function stackHas(key) {
    return this.__data__.has(key);
  }
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  Stack2.prototype.clear = stackClear;
  Stack2.prototype["delete"] = stackDelete;
  Stack2.prototype.get = stackGet;
  Stack2.prototype.has = stackHas;
  Stack2.prototype.set = stackSet;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray2(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length2 = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length2)))) {
        result.push(key);
      }
    }
    return result;
  }
  function assignMergeValue(object, key, value) {
    if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
      baseAssignValue(object, key, value);
    }
  }
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
      baseAssignValue(object, key, value);
    }
  }
  function assocIndexOf(array, key) {
    var length2 = array.length;
    while (length2--) {
      if (eq(array[length2][0], key)) {
        return length2;
      }
    }
    return -1;
  }
  function baseAssignValue(object, key, value) {
    if (key == "__proto__" && defineProperty) {
      defineProperty(object, key, {
        "configurable": true,
        "enumerable": true,
        "value": value,
        "writable": true
      });
    } else {
      object[key] = value;
    }
  }
  var baseFor = createBaseFor();
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag;
  }
  function baseIsNative(value) {
    if (!isObject2(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction2(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }
  function baseKeysIn(object) {
    if (!isObject2(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object), result = [];
    for (var key in object) {
      if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    baseFor(source, function(srcValue, key) {
      stack || (stack = new Stack2());
      if (isObject2(srcValue)) {
        baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      } else {
        var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
        if (newValue === void 0) {
          newValue = srcValue;
        }
        assignMergeValue(object, key, newValue);
      }
    }, keysIn);
  }
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
    if (stacked) {
      assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
    var isCommon = newValue === void 0;
    if (isCommon) {
      var isArr = isArray2(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray2(objValue)) {
          newValue = objValue;
        } else if (isArrayLikeObject(objValue)) {
          newValue = copyArray(objValue);
        } else if (isBuff) {
          isCommon = false;
          newValue = cloneBuffer(srcValue, true);
        } else if (isTyped) {
          isCommon = false;
          newValue = cloneTypedArray(srcValue, true);
        } else {
          newValue = [];
        }
      } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
        newValue = objValue;
        if (isArguments(objValue)) {
          newValue = toPlainObject(objValue);
        } else if (!isObject2(objValue) || isFunction2(objValue)) {
          newValue = initCloneObject(srcValue);
        }
      } else {
        isCommon = false;
      }
    }
    if (isCommon) {
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack["delete"](srcValue);
    }
    assignMergeValue(object, key, newValue);
  }
  function baseRest(func, start2) {
    return setToString(overRest(func, start2, identity2), func + "");
  }
  var baseSetToString = !defineProperty ? identity2 : function(func, string) {
    return defineProperty(func, "toString", {
      "configurable": true,
      "enumerable": false,
      "value": constant(string),
      "writable": true
    });
  };
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length2 = buffer.length, result = allocUnsafe ? allocUnsafe(length2) : new buffer.constructor(length2);
    buffer.copy(result);
    return result;
  }
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
    return result;
  }
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  function copyArray(source, array) {
    var index2 = -1, length2 = source.length;
    array || (array = Array(length2));
    while (++index2 < length2) {
      array[index2] = source[index2];
    }
    return array;
  }
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index2 = -1, length2 = props.length;
    while (++index2 < length2) {
      var key = props[index2];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
      if (newValue === void 0) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue(object, key, newValue);
      } else {
        assignValue(object, key, newValue);
      }
    }
    return object;
  }
  function createAssigner(assigner) {
    return baseRest(function(object, sources) {
      var index2 = -1, length2 = sources.length, customizer = length2 > 1 ? sources[length2 - 1] : void 0, guard = length2 > 2 ? sources[2] : void 0;
      customizer = assigner.length > 3 && typeof customizer == "function" ? (length2--, customizer) : void 0;
      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length2 < 3 ? void 0 : customizer;
        length2 = 1;
      }
      object = Object(object);
      while (++index2 < length2) {
        var source = sources[index2];
        if (source) {
          assigner(object, source, index2, customizer);
        }
      }
      return object;
    });
  }
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index2 = -1, iterable = Object(object), props = keysFunc(object), length2 = props.length;
      while (length2--) {
        var key = props[fromRight ? length2 : ++index2];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function getNative(object, key) {
    var value = getValue2(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e2) {
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  function initCloneObject(object) {
    return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
  }
  function isIndex(value, length2) {
    var type = typeof value;
    length2 = length2 == null ? MAX_SAFE_INTEGER : length2;
    return !!length2 && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length2);
  }
  function isIterateeCall(value, index2, object) {
    if (!isObject2(object)) {
      return false;
    }
    var type = typeof index2;
    if (type == "number" ? isArrayLike(object) && isIndex(index2, object.length) : type == "string" && index2 in object) {
      return eq(object[index2], value);
    }
    return false;
  }
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
    return value === proto;
  }
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  function overRest(func, start2, transform2) {
    start2 = nativeMax(start2 === void 0 ? func.length - 1 : start2, 0);
    return function() {
      var args = arguments, index2 = -1, length2 = nativeMax(args.length - start2, 0), array = Array(length2);
      while (++index2 < length2) {
        array[index2] = args[start2 + index2];
      }
      index2 = -1;
      var otherArgs = Array(start2 + 1);
      while (++index2 < start2) {
        otherArgs[index2] = args[index2];
      }
      otherArgs[start2] = transform2(array);
      return apply(func, this, otherArgs);
    };
  }
  function safeGet(object, key) {
    if (key === "constructor" && typeof object[key] === "function") {
      return;
    }
    if (key == "__proto__") {
      return;
    }
    return object[key];
  }
  var setToString = shortOut(baseSetToString);
  function shortOut(func) {
    var count = 0, lastCalled = 0;
    return function() {
      var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(void 0, arguments);
    };
  }
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e2) {
      }
      try {
        return func + "";
      } catch (e2) {
      }
    }
    return "";
  }
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  var isArguments = baseIsArguments(function() {
    return arguments;
  }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  var isArray2 = Array.isArray;
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction2(value);
  }
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }
  var isBuffer = nativeIsBuffer || stubFalse;
  function isFunction2(value) {
    if (!isObject2(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  function isObject2(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
      return false;
    }
    var proto = getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
  }
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  function toPlainObject(value) {
    return copyObject(value, keysIn(value));
  }
  function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }
  var mergeWith2 = createAssigner(function(object, source, srcIndex, customizer) {
    baseMerge(object, source, srcIndex, customizer);
  });
  function constant(value) {
    return function() {
      return value;
    };
  }
  function identity2(value) {
    return value;
  }
  function stubFalse() {
    return false;
  }
  module.exports = mergeWith2;
})(lodash_mergewith, lodash_mergewith.exports);
const mergeWith = lodash_mergewith.exports;
var isImportant = (value) => /!(important)?$/.test(value);
var withoutImportant = (value) => typeof value === "string" ? value.replace(/!(important)?$/, "").trim() : value;
var tokenToCSSVar = (scale2, value) => (theme) => {
  const valueStr = String(value);
  const important = isImportant(valueStr);
  const valueWithoutImportant = withoutImportant(valueStr);
  const key = scale2 ? `${scale2}.${valueWithoutImportant}` : valueWithoutImportant;
  let transformed = isObject(theme.__cssMap) && key in theme.__cssMap ? theme.__cssMap[key].varRef : value;
  transformed = withoutImportant(transformed);
  return important ? `${transformed} !important` : transformed;
};
function createTransform(options) {
  const { scale: scale2, transform: transform2, compose } = options;
  const fn2 = (value, theme) => {
    var _a2;
    const _value = tokenToCSSVar(scale2, value)(theme);
    let result = (_a2 = transform2 == null ? void 0 : transform2(_value, theme)) != null ? _a2 : _value;
    if (compose) {
      result = compose(result, theme);
    }
    return result;
  };
  return fn2;
}
var pipe$1 = (...fns) => (v2) => fns.reduce((a, b2) => b2(a), v2);
function toConfig(scale2, transform2) {
  return (property) => {
    const result = { property, scale: scale2 };
    result.transform = createTransform({
      scale: scale2,
      transform: transform2
    });
    return result;
  };
}
var getRtl = ({ rtl, ltr }) => (theme) => theme.direction === "rtl" ? rtl : ltr;
function logical(options) {
  const { property, scale: scale2, transform: transform2 } = options;
  return {
    scale: scale2,
    property: getRtl(property),
    transform: scale2 ? createTransform({
      scale: scale2,
      compose: transform2
    }) : transform2
  };
}
var transformTemplate = [
  "rotate(var(--chakra-rotate, 0))",
  "scaleX(var(--chakra-scale-x, 1))",
  "scaleY(var(--chakra-scale-y, 1))",
  "skewX(var(--chakra-skew-x, 0))",
  "skewY(var(--chakra-skew-y, 0))"
];
function getTransformTemplate() {
  return [
    "translateX(var(--chakra-translate-x, 0))",
    "translateY(var(--chakra-translate-y, 0))",
    ...transformTemplate
  ].join(" ");
}
function getTransformGpuTemplate() {
  return [
    "translate3d(var(--chakra-translate-x, 0), var(--chakra-translate-y, 0), 0)",
    ...transformTemplate
  ].join(" ");
}
var filterTemplate = {
  "--chakra-blur": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-brightness": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-contrast": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-grayscale": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-hue-rotate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-invert": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-saturate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-sepia": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-drop-shadow": "var(--chakra-empty,/*!*/ /*!*/)",
  filter: [
    "var(--chakra-blur)",
    "var(--chakra-brightness)",
    "var(--chakra-contrast)",
    "var(--chakra-grayscale)",
    "var(--chakra-hue-rotate)",
    "var(--chakra-invert)",
    "var(--chakra-saturate)",
    "var(--chakra-sepia)",
    "var(--chakra-drop-shadow)"
  ].join(" ")
};
var backdropFilterTemplate = {
  backdropFilter: [
    "var(--chakra-backdrop-blur)",
    "var(--chakra-backdrop-brightness)",
    "var(--chakra-backdrop-contrast)",
    "var(--chakra-backdrop-grayscale)",
    "var(--chakra-backdrop-hue-rotate)",
    "var(--chakra-backdrop-invert)",
    "var(--chakra-backdrop-opacity)",
    "var(--chakra-backdrop-saturate)",
    "var(--chakra-backdrop-sepia)"
  ].join(" "),
  "--chakra-backdrop-blur": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-brightness": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-contrast": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-grayscale": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-hue-rotate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-invert": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-opacity": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-saturate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-sepia": "var(--chakra-empty,/*!*/ /*!*/)"
};
function getRingTemplate(value) {
  return {
    "--chakra-ring-offset-shadow": `var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset-width) var(--chakra-ring-offset-color)`,
    "--chakra-ring-shadow": `var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset-width)) var(--chakra-ring-color)`,
    "--chakra-ring-width": value,
    boxShadow: [
      `var(--chakra-ring-offset-shadow)`,
      `var(--chakra-ring-shadow)`,
      `var(--chakra-shadow, 0 0 #0000)`
    ].join(", ")
  };
}
var flexDirectionTemplate = {
  "row-reverse": {
    space: "--chakra-space-x-reverse",
    divide: "--chakra-divide-x-reverse"
  },
  "column-reverse": {
    space: "--chakra-space-y-reverse",
    divide: "--chakra-divide-y-reverse"
  }
};
var directionMap = {
  "to-t": "to top",
  "to-tr": "to top right",
  "to-r": "to right",
  "to-br": "to bottom right",
  "to-b": "to bottom",
  "to-bl": "to bottom left",
  "to-l": "to left",
  "to-tl": "to top left"
};
var valueSet = new Set(Object.values(directionMap));
var globalSet = /* @__PURE__ */ new Set([
  "none",
  "-moz-initial",
  "inherit",
  "initial",
  "revert",
  "unset"
]);
var trimSpace = (str) => str.trim();
function parseGradient(value, theme) {
  if (value == null || globalSet.has(value))
    return value;
  const regex = /(^[a-z-A-Z]+)\((.*)\)/g;
  const results2 = regex.exec(value);
  const type = results2 == null ? void 0 : results2[1];
  const values = results2 == null ? void 0 : results2[2];
  if (!type || !values)
    return value;
  const _type = type.includes("-gradient") ? type : `${type}-gradient`;
  const [maybeDirection, ...stops] = values.split(",").map(trimSpace).filter(Boolean);
  if ((stops == null ? void 0 : stops.length) === 0)
    return value;
  const direction = maybeDirection in directionMap ? directionMap[maybeDirection] : maybeDirection;
  stops.unshift(direction);
  const _values = stops.map((stop2) => {
    if (valueSet.has(stop2))
      return stop2;
    const firstStop = stop2.indexOf(" ");
    const [_color, _stop] = firstStop !== -1 ? [stop2.substr(0, firstStop), stop2.substr(firstStop + 1)] : [stop2];
    const _stopOrFunc = isCSSFunction(_stop) ? _stop : _stop && _stop.split(" ");
    const key = `colors.${_color}`;
    const color2 = key in theme.__cssMap ? theme.__cssMap[key].varRef : _color;
    return _stopOrFunc ? [
      color2,
      ...Array.isArray(_stopOrFunc) ? _stopOrFunc : [_stopOrFunc]
    ].join(" ") : color2;
  });
  return `${_type}(${_values.join(", ")})`;
}
var isCSSFunction = (value) => {
  return typeof value === "string" && value.includes("(") && value.includes(")");
};
var gradientTransform = (value, theme) => parseGradient(value, theme != null ? theme : {});
function isCssVar(value) {
  return /^var\(--.+\)$/.test(value);
}
var analyzeCSSValue = (value) => {
  const num = parseFloat(value.toString());
  const unit = value.toString().replace(String(num), "");
  return { unitless: !unit, value: num, unit };
};
var wrap = (str) => (value) => `${str}(${value})`;
var transformFunctions = {
  filter(value) {
    return value !== "auto" ? value : filterTemplate;
  },
  backdropFilter(value) {
    return value !== "auto" ? value : backdropFilterTemplate;
  },
  ring(value) {
    return getRingTemplate(transformFunctions.px(value));
  },
  bgClip(value) {
    return value === "text" ? { color: "transparent", backgroundClip: "text" } : { backgroundClip: value };
  },
  transform(value) {
    if (value === "auto")
      return getTransformTemplate();
    if (value === "auto-gpu")
      return getTransformGpuTemplate();
    return value;
  },
  vh(value) {
    return value === "$100vh" ? "var(--chakra-vh)" : value;
  },
  px(value) {
    if (value == null)
      return value;
    const { unitless } = analyzeCSSValue(value);
    return unitless || typeof value === "number" ? `${value}px` : value;
  },
  fraction(value) {
    return !(typeof value === "number") || value > 1 ? value : `${value * 100}%`;
  },
  float(value, theme) {
    const map = { left: "right", right: "left" };
    return theme.direction === "rtl" ? map[value] : value;
  },
  degree(value) {
    if (isCssVar(value) || value == null)
      return value;
    const unitless = typeof value === "string" && !value.endsWith("deg");
    return typeof value === "number" || unitless ? `${value}deg` : value;
  },
  gradient: gradientTransform,
  blur: wrap("blur"),
  opacity: wrap("opacity"),
  brightness: wrap("brightness"),
  contrast: wrap("contrast"),
  dropShadow: wrap("drop-shadow"),
  grayscale: wrap("grayscale"),
  hueRotate: wrap("hue-rotate"),
  invert: wrap("invert"),
  saturate: wrap("saturate"),
  sepia: wrap("sepia"),
  bgImage(value) {
    if (value == null)
      return value;
    const prevent = isCSSFunction(value) || globalSet.has(value);
    return !prevent ? `url(${value})` : value;
  },
  outline(value) {
    const isNoneOrZero = String(value) === "0" || String(value) === "none";
    return value !== null && isNoneOrZero ? { outline: "2px solid transparent", outlineOffset: "2px" } : { outline: value };
  },
  flexDirection(value) {
    var _a2;
    const { space: space2, divide: divide2 } = (_a2 = flexDirectionTemplate[value]) != null ? _a2 : {};
    const result = { flexDirection: value };
    if (space2)
      result[space2] = 1;
    if (divide2)
      result[divide2] = 1;
    return result;
  }
};
var t$3 = {
  borderWidths: toConfig("borderWidths"),
  borderStyles: toConfig("borderStyles"),
  colors: toConfig("colors"),
  borders: toConfig("borders"),
  radii: toConfig("radii", transformFunctions.px),
  space: toConfig("space", pipe$1(transformFunctions.vh, transformFunctions.px)),
  spaceT: toConfig("space", pipe$1(transformFunctions.vh, transformFunctions.px)),
  degreeT(property) {
    return { property, transform: transformFunctions.degree };
  },
  prop(property, scale2, transform2) {
    return {
      property,
      scale: scale2,
      ...scale2 && {
        transform: createTransform({ scale: scale2, transform: transform2 })
      }
    };
  },
  propT(property, transform2) {
    return { property, transform: transform2 };
  },
  sizes: toConfig("sizes", pipe$1(transformFunctions.vh, transformFunctions.px)),
  sizesT: toConfig("sizes", pipe$1(transformFunctions.vh, transformFunctions.fraction)),
  shadows: toConfig("shadows"),
  logical,
  blur: toConfig("blur", transformFunctions.blur)
};
var background = {
  background: t$3.colors("background"),
  backgroundColor: t$3.colors("backgroundColor"),
  backgroundImage: t$3.propT("backgroundImage", transformFunctions.bgImage),
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  backgroundClip: { transform: transformFunctions.bgClip },
  bgSize: t$3.prop("backgroundSize"),
  bgPosition: t$3.prop("backgroundPosition"),
  bg: t$3.colors("background"),
  bgColor: t$3.colors("backgroundColor"),
  bgPos: t$3.prop("backgroundPosition"),
  bgRepeat: t$3.prop("backgroundRepeat"),
  bgAttachment: t$3.prop("backgroundAttachment"),
  bgGradient: t$3.propT("backgroundImage", transformFunctions.gradient),
  bgClip: { transform: transformFunctions.bgClip }
};
Object.assign(background, {
  bgImage: background.backgroundImage,
  bgImg: background.backgroundImage
});
var border = {
  border: t$3.borders("border"),
  borderWidth: t$3.borderWidths("borderWidth"),
  borderStyle: t$3.borderStyles("borderStyle"),
  borderColor: t$3.colors("borderColor"),
  borderRadius: t$3.radii("borderRadius"),
  borderTop: t$3.borders("borderTop"),
  borderBlockStart: t$3.borders("borderBlockStart"),
  borderTopLeftRadius: t$3.radii("borderTopLeftRadius"),
  borderStartStartRadius: t$3.logical({
    scale: "radii",
    property: {
      ltr: "borderTopLeftRadius",
      rtl: "borderTopRightRadius"
    }
  }),
  borderEndStartRadius: t$3.logical({
    scale: "radii",
    property: {
      ltr: "borderBottomLeftRadius",
      rtl: "borderBottomRightRadius"
    }
  }),
  borderTopRightRadius: t$3.radii("borderTopRightRadius"),
  borderStartEndRadius: t$3.logical({
    scale: "radii",
    property: {
      ltr: "borderTopRightRadius",
      rtl: "borderTopLeftRadius"
    }
  }),
  borderEndEndRadius: t$3.logical({
    scale: "radii",
    property: {
      ltr: "borderBottomRightRadius",
      rtl: "borderBottomLeftRadius"
    }
  }),
  borderRight: t$3.borders("borderRight"),
  borderInlineEnd: t$3.borders("borderInlineEnd"),
  borderBottom: t$3.borders("borderBottom"),
  borderBlockEnd: t$3.borders("borderBlockEnd"),
  borderBottomLeftRadius: t$3.radii("borderBottomLeftRadius"),
  borderBottomRightRadius: t$3.radii("borderBottomRightRadius"),
  borderLeft: t$3.borders("borderLeft"),
  borderInlineStart: {
    property: "borderInlineStart",
    scale: "borders"
  },
  borderInlineStartRadius: t$3.logical({
    scale: "radii",
    property: {
      ltr: ["borderTopLeftRadius", "borderBottomLeftRadius"],
      rtl: ["borderTopRightRadius", "borderBottomRightRadius"]
    }
  }),
  borderInlineEndRadius: t$3.logical({
    scale: "radii",
    property: {
      ltr: ["borderTopRightRadius", "borderBottomRightRadius"],
      rtl: ["borderTopLeftRadius", "borderBottomLeftRadius"]
    }
  }),
  borderX: t$3.borders(["borderLeft", "borderRight"]),
  borderInline: t$3.borders("borderInline"),
  borderY: t$3.borders(["borderTop", "borderBottom"]),
  borderBlock: t$3.borders("borderBlock"),
  borderTopWidth: t$3.borderWidths("borderTopWidth"),
  borderBlockStartWidth: t$3.borderWidths("borderBlockStartWidth"),
  borderTopColor: t$3.colors("borderTopColor"),
  borderBlockStartColor: t$3.colors("borderBlockStartColor"),
  borderTopStyle: t$3.borderStyles("borderTopStyle"),
  borderBlockStartStyle: t$3.borderStyles("borderBlockStartStyle"),
  borderBottomWidth: t$3.borderWidths("borderBottomWidth"),
  borderBlockEndWidth: t$3.borderWidths("borderBlockEndWidth"),
  borderBottomColor: t$3.colors("borderBottomColor"),
  borderBlockEndColor: t$3.colors("borderBlockEndColor"),
  borderBottomStyle: t$3.borderStyles("borderBottomStyle"),
  borderBlockEndStyle: t$3.borderStyles("borderBlockEndStyle"),
  borderLeftWidth: t$3.borderWidths("borderLeftWidth"),
  borderInlineStartWidth: t$3.borderWidths("borderInlineStartWidth"),
  borderLeftColor: t$3.colors("borderLeftColor"),
  borderInlineStartColor: t$3.colors("borderInlineStartColor"),
  borderLeftStyle: t$3.borderStyles("borderLeftStyle"),
  borderInlineStartStyle: t$3.borderStyles("borderInlineStartStyle"),
  borderRightWidth: t$3.borderWidths("borderRightWidth"),
  borderInlineEndWidth: t$3.borderWidths("borderInlineEndWidth"),
  borderRightColor: t$3.colors("borderRightColor"),
  borderInlineEndColor: t$3.colors("borderInlineEndColor"),
  borderRightStyle: t$3.borderStyles("borderRightStyle"),
  borderInlineEndStyle: t$3.borderStyles("borderInlineEndStyle"),
  borderTopRadius: t$3.radii(["borderTopLeftRadius", "borderTopRightRadius"]),
  borderBottomRadius: t$3.radii([
    "borderBottomLeftRadius",
    "borderBottomRightRadius"
  ]),
  borderLeftRadius: t$3.radii(["borderTopLeftRadius", "borderBottomLeftRadius"]),
  borderRightRadius: t$3.radii([
    "borderTopRightRadius",
    "borderBottomRightRadius"
  ])
};
Object.assign(border, {
  rounded: border.borderRadius,
  roundedTop: border.borderTopRadius,
  roundedTopLeft: border.borderTopLeftRadius,
  roundedTopRight: border.borderTopRightRadius,
  roundedTopStart: border.borderStartStartRadius,
  roundedTopEnd: border.borderStartEndRadius,
  roundedBottom: border.borderBottomRadius,
  roundedBottomLeft: border.borderBottomLeftRadius,
  roundedBottomRight: border.borderBottomRightRadius,
  roundedBottomStart: border.borderEndStartRadius,
  roundedBottomEnd: border.borderEndEndRadius,
  roundedLeft: border.borderLeftRadius,
  roundedRight: border.borderRightRadius,
  roundedStart: border.borderInlineStartRadius,
  roundedEnd: border.borderInlineEndRadius,
  borderStart: border.borderInlineStart,
  borderEnd: border.borderInlineEnd,
  borderTopStartRadius: border.borderStartStartRadius,
  borderTopEndRadius: border.borderStartEndRadius,
  borderBottomStartRadius: border.borderEndStartRadius,
  borderBottomEndRadius: border.borderEndEndRadius,
  borderStartRadius: border.borderInlineStartRadius,
  borderEndRadius: border.borderInlineEndRadius,
  borderStartWidth: border.borderInlineStartWidth,
  borderEndWidth: border.borderInlineEndWidth,
  borderStartColor: border.borderInlineStartColor,
  borderEndColor: border.borderInlineEndColor,
  borderStartStyle: border.borderInlineStartStyle,
  borderEndStyle: border.borderInlineEndStyle
});
var color$1 = {
  color: t$3.colors("color"),
  textColor: t$3.colors("color"),
  fill: t$3.colors("fill"),
  stroke: t$3.colors("stroke")
};
var effect$3 = {
  boxShadow: t$3.shadows("boxShadow"),
  mixBlendMode: true,
  blendMode: t$3.prop("mixBlendMode"),
  backgroundBlendMode: true,
  bgBlendMode: t$3.prop("backgroundBlendMode"),
  opacity: true
};
Object.assign(effect$3, {
  shadow: effect$3.boxShadow
});
var filter$1 = {
  filter: { transform: transformFunctions.filter },
  blur: t$3.blur("--chakra-blur"),
  brightness: t$3.propT("--chakra-brightness", transformFunctions.brightness),
  contrast: t$3.propT("--chakra-contrast", transformFunctions.contrast),
  hueRotate: t$3.degreeT("--chakra-hue-rotate"),
  invert: t$3.propT("--chakra-invert", transformFunctions.invert),
  saturate: t$3.propT("--chakra-saturate", transformFunctions.saturate),
  dropShadow: t$3.propT("--chakra-drop-shadow", transformFunctions.dropShadow),
  backdropFilter: { transform: transformFunctions.backdropFilter },
  backdropBlur: t$3.blur("--chakra-backdrop-blur"),
  backdropBrightness: t$3.propT(
    "--chakra-backdrop-brightness",
    transformFunctions.brightness
  ),
  backdropContrast: t$3.propT("--chakra-backdrop-contrast", transformFunctions.contrast),
  backdropHueRotate: t$3.degreeT("--chakra-backdrop-hue-rotate"),
  backdropInvert: t$3.propT("--chakra-backdrop-invert", transformFunctions.invert),
  backdropSaturate: t$3.propT("--chakra-backdrop-saturate", transformFunctions.saturate)
};
var flexbox = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: { transform: transformFunctions.flexDirection },
  flex: true,
  flexFlow: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: t$3.sizes("flexBasis"),
  justifySelf: true,
  alignSelf: true,
  order: true,
  placeItems: true,
  placeContent: true,
  placeSelf: true,
  gap: t$3.space("gap"),
  rowGap: t$3.space("rowGap"),
  columnGap: t$3.space("columnGap")
};
Object.assign(flexbox, {
  flexDir: flexbox.flexDirection
});
var grid = {
  gridGap: t$3.space("gridGap"),
  gridColumnGap: t$3.space("gridColumnGap"),
  gridRowGap: t$3.space("gridRowGap"),
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridColumnStart: true,
  gridColumnEnd: true,
  gridRowStart: true,
  gridRowEnd: true,
  gridAutoRows: true,
  gridTemplate: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true
};
var interactivity = {
  appearance: true,
  cursor: true,
  resize: true,
  userSelect: true,
  pointerEvents: true,
  outline: { transform: transformFunctions.outline },
  outlineOffset: true,
  outlineColor: t$3.colors("outlineColor")
};
var layout$1 = {
  width: t$3.sizesT("width"),
  inlineSize: t$3.sizesT("inlineSize"),
  height: t$3.sizes("height"),
  blockSize: t$3.sizes("blockSize"),
  boxSize: t$3.sizes(["width", "height"]),
  minWidth: t$3.sizes("minWidth"),
  minInlineSize: t$3.sizes("minInlineSize"),
  minHeight: t$3.sizes("minHeight"),
  minBlockSize: t$3.sizes("minBlockSize"),
  maxWidth: t$3.sizes("maxWidth"),
  maxInlineSize: t$3.sizes("maxInlineSize"),
  maxHeight: t$3.sizes("maxHeight"),
  maxBlockSize: t$3.sizes("maxBlockSize"),
  overflow: true,
  overflowX: true,
  overflowY: true,
  overscrollBehavior: true,
  overscrollBehaviorX: true,
  overscrollBehaviorY: true,
  display: true,
  hideFrom: {
    scale: "breakpoints",
    transform: (value, theme) => {
      var _a2, _b, _c;
      const mq = (_c = (_b = (_a2 = theme.__breakpoints) == null ? void 0 : _a2.get(value)) == null ? void 0 : _b.minWQuery) != null ? _c : `@media screen and (min-width: ${value})`;
      return { [mq]: { display: "none" } };
    }
  },
  hideBelow: {
    scale: "breakpoints",
    transform: (value, theme) => {
      var _a2, _b, _c;
      const mq = (_c = (_b = (_a2 = theme.__breakpoints) == null ? void 0 : _a2.get(value)) == null ? void 0 : _b.maxWQuery) != null ? _c : `@media screen and (max-width: ${value})`;
      return { [mq]: { display: "none" } };
    }
  },
  verticalAlign: true,
  boxSizing: true,
  boxDecorationBreak: true,
  float: t$3.propT("float", transformFunctions.float),
  objectFit: true,
  objectPosition: true,
  visibility: true,
  isolation: true
};
Object.assign(layout$1, {
  w: layout$1.width,
  h: layout$1.height,
  minW: layout$1.minWidth,
  maxW: layout$1.maxWidth,
  minH: layout$1.minHeight,
  maxH: layout$1.maxHeight,
  overscroll: layout$1.overscrollBehavior,
  overscrollX: layout$1.overscrollBehaviorX,
  overscrollY: layout$1.overscrollBehaviorY
});
var list = {
  listStyleType: true,
  listStylePosition: true,
  listStylePos: t$3.prop("listStylePosition"),
  listStyleImage: true,
  listStyleImg: t$3.prop("listStyleImage")
};
function get$1(obj, path2, fallback, index2) {
  const key = typeof path2 === "string" ? path2.split(".") : [path2];
  for (index2 = 0; index2 < key.length; index2 += 1) {
    if (!obj)
      break;
    obj = obj[key[index2]];
  }
  return obj === void 0 ? fallback : obj;
}
var memoize$1 = (fn2) => {
  const cache = /* @__PURE__ */ new WeakMap();
  const memoizedFn = (obj, path2, fallback, index2) => {
    if (typeof obj === "undefined") {
      return fn2(obj, path2, fallback);
    }
    if (!cache.has(obj)) {
      cache.set(obj, /* @__PURE__ */ new Map());
    }
    const map = cache.get(obj);
    if (map.has(path2)) {
      return map.get(path2);
    }
    const value = fn2(obj, path2, fallback, index2);
    map.set(path2, value);
    return value;
  };
  return memoizedFn;
};
var memoizedGet$1 = memoize$1(get$1);
var srOnly = {
  border: "0px",
  clip: "rect(0, 0, 0, 0)",
  width: "1px",
  height: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute"
};
var srFocusable = {
  position: "static",
  width: "auto",
  height: "auto",
  clip: "auto",
  padding: "0",
  margin: "0",
  overflow: "visible",
  whiteSpace: "normal"
};
var getWithPriority = (theme, key, styles) => {
  const result = {};
  const obj = memoizedGet$1(theme, key, {});
  for (const prop in obj) {
    const isInStyles = prop in styles && styles[prop] != null;
    if (!isInStyles)
      result[prop] = obj[prop];
  }
  return result;
};
var others = {
  srOnly: {
    transform(value) {
      if (value === true)
        return srOnly;
      if (value === "focusable")
        return srFocusable;
      return {};
    }
  },
  layerStyle: {
    processResult: true,
    transform: (value, theme, styles) => getWithPriority(theme, `layerStyles.${value}`, styles)
  },
  textStyle: {
    processResult: true,
    transform: (value, theme, styles) => getWithPriority(theme, `textStyles.${value}`, styles)
  },
  apply: {
    processResult: true,
    transform: (value, theme, styles) => getWithPriority(theme, value, styles)
  }
};
var position = {
  position: true,
  pos: t$3.prop("position"),
  zIndex: t$3.prop("zIndex", "zIndices"),
  inset: t$3.spaceT("inset"),
  insetX: t$3.spaceT(["left", "right"]),
  insetInline: t$3.spaceT("insetInline"),
  insetY: t$3.spaceT(["top", "bottom"]),
  insetBlock: t$3.spaceT("insetBlock"),
  top: t$3.spaceT("top"),
  insetBlockStart: t$3.spaceT("insetBlockStart"),
  bottom: t$3.spaceT("bottom"),
  insetBlockEnd: t$3.spaceT("insetBlockEnd"),
  left: t$3.spaceT("left"),
  insetInlineStart: t$3.logical({
    scale: "space",
    property: { ltr: "left", rtl: "right" }
  }),
  right: t$3.spaceT("right"),
  insetInlineEnd: t$3.logical({
    scale: "space",
    property: { ltr: "right", rtl: "left" }
  })
};
Object.assign(position, {
  insetStart: position.insetInlineStart,
  insetEnd: position.insetInlineEnd
});
var ring = {
  ring: { transform: transformFunctions.ring },
  ringColor: t$3.colors("--chakra-ring-color"),
  ringOffset: t$3.prop("--chakra-ring-offset-width"),
  ringOffsetColor: t$3.colors("--chakra-ring-offset-color"),
  ringInset: t$3.prop("--chakra-ring-inset")
};
var space = {
  margin: t$3.spaceT("margin"),
  marginTop: t$3.spaceT("marginTop"),
  marginBlockStart: t$3.spaceT("marginBlockStart"),
  marginRight: t$3.spaceT("marginRight"),
  marginInlineEnd: t$3.spaceT("marginInlineEnd"),
  marginBottom: t$3.spaceT("marginBottom"),
  marginBlockEnd: t$3.spaceT("marginBlockEnd"),
  marginLeft: t$3.spaceT("marginLeft"),
  marginInlineStart: t$3.spaceT("marginInlineStart"),
  marginX: t$3.spaceT(["marginInlineStart", "marginInlineEnd"]),
  marginInline: t$3.spaceT("marginInline"),
  marginY: t$3.spaceT(["marginTop", "marginBottom"]),
  marginBlock: t$3.spaceT("marginBlock"),
  padding: t$3.space("padding"),
  paddingTop: t$3.space("paddingTop"),
  paddingBlockStart: t$3.space("paddingBlockStart"),
  paddingRight: t$3.space("paddingRight"),
  paddingBottom: t$3.space("paddingBottom"),
  paddingBlockEnd: t$3.space("paddingBlockEnd"),
  paddingLeft: t$3.space("paddingLeft"),
  paddingInlineStart: t$3.space("paddingInlineStart"),
  paddingInlineEnd: t$3.space("paddingInlineEnd"),
  paddingX: t$3.space(["paddingInlineStart", "paddingInlineEnd"]),
  paddingInline: t$3.space("paddingInline"),
  paddingY: t$3.space(["paddingTop", "paddingBottom"]),
  paddingBlock: t$3.space("paddingBlock")
};
Object.assign(space, {
  m: space.margin,
  mt: space.marginTop,
  mr: space.marginRight,
  me: space.marginInlineEnd,
  marginEnd: space.marginInlineEnd,
  mb: space.marginBottom,
  ml: space.marginLeft,
  ms: space.marginInlineStart,
  marginStart: space.marginInlineStart,
  mx: space.marginX,
  my: space.marginY,
  p: space.padding,
  pt: space.paddingTop,
  py: space.paddingY,
  px: space.paddingX,
  pb: space.paddingBottom,
  pl: space.paddingLeft,
  ps: space.paddingInlineStart,
  paddingStart: space.paddingInlineStart,
  pr: space.paddingRight,
  pe: space.paddingInlineEnd,
  paddingEnd: space.paddingInlineEnd
});
var textDecoration = {
  textDecorationColor: t$3.colors("textDecorationColor"),
  textDecoration: true,
  textDecor: { property: "textDecoration" },
  textDecorationLine: true,
  textDecorationStyle: true,
  textDecorationThickness: true,
  textUnderlineOffset: true,
  textShadow: t$3.shadows("textShadow")
};
var transform = {
  clipPath: true,
  transform: t$3.propT("transform", transformFunctions.transform),
  transformOrigin: true,
  translateX: t$3.spaceT("--chakra-translate-x"),
  translateY: t$3.spaceT("--chakra-translate-y"),
  skewX: t$3.degreeT("--chakra-skew-x"),
  skewY: t$3.degreeT("--chakra-skew-y"),
  scaleX: t$3.prop("--chakra-scale-x"),
  scaleY: t$3.prop("--chakra-scale-y"),
  scale: t$3.prop(["--chakra-scale-x", "--chakra-scale-y"]),
  rotate: t$3.degreeT("--chakra-rotate")
};
var transition = {
  transition: true,
  transitionDelay: true,
  animation: true,
  willChange: true,
  transitionDuration: t$3.prop("transitionDuration", "transition.duration"),
  transitionProperty: t$3.prop("transitionProperty", "transition.property"),
  transitionTimingFunction: t$3.prop(
    "transitionTimingFunction",
    "transition.easing"
  )
};
var typography = {
  fontFamily: t$3.prop("fontFamily", "fonts"),
  fontSize: t$3.prop("fontSize", "fontSizes", transformFunctions.px),
  fontWeight: t$3.prop("fontWeight", "fontWeights"),
  lineHeight: t$3.prop("lineHeight", "lineHeights"),
  letterSpacing: t$3.prop("letterSpacing", "letterSpacings"),
  textAlign: true,
  fontStyle: true,
  textIndent: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  textTransform: true,
  whiteSpace: true,
  isTruncated: {
    transform(value) {
      if (value === true) {
        return {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        };
      }
    }
  },
  noOfLines: {
    static: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: "var(--chakra-line-clamp)"
    },
    property: "--chakra-line-clamp"
  }
};
var scroll = {
  scrollBehavior: true,
  scrollSnapAlign: true,
  scrollSnapStop: true,
  scrollSnapType: true,
  scrollMargin: t$3.spaceT("scrollMargin"),
  scrollMarginTop: t$3.spaceT("scrollMarginTop"),
  scrollMarginBottom: t$3.spaceT("scrollMarginBottom"),
  scrollMarginLeft: t$3.spaceT("scrollMarginLeft"),
  scrollMarginRight: t$3.spaceT("scrollMarginRight"),
  scrollMarginX: t$3.spaceT(["scrollMarginLeft", "scrollMarginRight"]),
  scrollMarginY: t$3.spaceT(["scrollMarginTop", "scrollMarginBottom"]),
  scrollPadding: t$3.spaceT("scrollPadding"),
  scrollPaddingTop: t$3.spaceT("scrollPaddingTop"),
  scrollPaddingBottom: t$3.spaceT("scrollPaddingBottom"),
  scrollPaddingLeft: t$3.spaceT("scrollPaddingLeft"),
  scrollPaddingRight: t$3.spaceT("scrollPaddingRight"),
  scrollPaddingX: t$3.spaceT(["scrollPaddingLeft", "scrollPaddingRight"]),
  scrollPaddingY: t$3.spaceT(["scrollPaddingTop", "scrollPaddingBottom"])
};
function resolveReference(operand) {
  if (isObject(operand) && operand.reference) {
    return operand.reference;
  }
  return String(operand);
}
var toExpression = (operator, ...operands) => operands.map(resolveReference).join(` ${operator} `).replace(/calc/g, "");
var add = (...operands) => `calc(${toExpression("+", ...operands)})`;
var subtract = (...operands) => `calc(${toExpression("-", ...operands)})`;
var multiply = (...operands) => `calc(${toExpression("*", ...operands)})`;
var divide = (...operands) => `calc(${toExpression("/", ...operands)})`;
var negate = (x2) => {
  const value = resolveReference(x2);
  if (value != null && !Number.isNaN(parseFloat(value))) {
    return String(value).startsWith("-") ? String(value).slice(1) : `-${value}`;
  }
  return multiply(value, -1);
};
var calc = Object.assign(
  (x2) => ({
    add: (...operands) => calc(add(x2, ...operands)),
    subtract: (...operands) => calc(subtract(x2, ...operands)),
    multiply: (...operands) => calc(multiply(x2, ...operands)),
    divide: (...operands) => calc(divide(x2, ...operands)),
    negate: () => calc(negate(x2)),
    toString: () => x2.toString()
  }),
  {
    add,
    subtract,
    multiply,
    divide,
    negate
  }
);
function replaceWhiteSpace(value, replaceValue = "-") {
  return value.replace(/\s+/g, replaceValue);
}
function escape(value) {
  const valueStr = replaceWhiteSpace(value.toString());
  return escapeSymbol(escapeDot(valueStr));
}
function escapeDot(value) {
  if (value.includes("\\."))
    return value;
  const isDecimal = !Number.isInteger(parseFloat(value.toString()));
  return isDecimal ? value.replace(".", `\\.`) : value;
}
function escapeSymbol(value) {
  return value.replace(/[!-,/:-@[-^`{-~]/g, "\\$&");
}
function addPrefix(value, prefix2 = "") {
  return [prefix2, value].filter(Boolean).join("-");
}
function toVarReference(name, fallback) {
  return `var(${name}${fallback ? `, ${fallback}` : ""})`;
}
function toVarDefinition(value, prefix2 = "") {
  return escape(`--${addPrefix(value, prefix2)}`);
}
function cssVar(name, fallback, cssVarPrefix) {
  const cssVariable = toVarDefinition(name, cssVarPrefix);
  return {
    variable: cssVariable,
    reference: toVarReference(cssVariable, fallback)
  };
}
function getLastItem(array) {
  const length2 = array == null ? 0 : array.length;
  return length2 ? array[length2 - 1] : void 0;
}
function analyzeCSSValue2(value) {
  const num = parseFloat(value.toString());
  const unit = value.toString().replace(String(num), "");
  return { unitless: !unit, value: num, unit };
}
function px$1(value) {
  if (value == null)
    return value;
  const { unitless } = analyzeCSSValue2(value);
  return unitless || typeof value === "number" ? `${value}px` : value;
}
var sortByBreakpointValue = (a, b2) => parseInt(a[1], 10) > parseInt(b2[1], 10) ? 1 : -1;
var sortBps = (breakpoints) => Object.fromEntries(Object.entries(breakpoints).sort(sortByBreakpointValue));
function normalize(breakpoints) {
  const sorted = sortBps(breakpoints);
  return Object.assign(Object.values(sorted), sorted);
}
function keys(breakpoints) {
  const value = Object.keys(sortBps(breakpoints));
  return new Set(value);
}
function subtract2(value) {
  var _a2;
  if (!value)
    return value;
  value = (_a2 = px$1(value)) != null ? _a2 : value;
  const OFFSET = -0.02;
  return typeof value === "number" ? `${value + OFFSET}` : value.replace(/(\d+\.?\d*)/u, (m2) => `${parseFloat(m2) + OFFSET}`);
}
function toMediaQueryString(min2, max2) {
  const query = ["@media screen"];
  if (min2)
    query.push("and", `(min-width: ${px$1(min2)})`);
  if (max2)
    query.push("and", `(max-width: ${px$1(max2)})`);
  return query.join(" ");
}
function analyzeBreakpoints(breakpoints) {
  var _a2;
  if (!breakpoints)
    return null;
  breakpoints.base = (_a2 = breakpoints.base) != null ? _a2 : "0px";
  const normalized = normalize(breakpoints);
  const queries = Object.entries(breakpoints).sort(sortByBreakpointValue).map(([breakpoint, minW], index2, entry) => {
    var _a22;
    let [, maxW] = (_a22 = entry[index2 + 1]) != null ? _a22 : [];
    maxW = parseFloat(maxW) > 0 ? subtract2(maxW) : void 0;
    return {
      _minW: subtract2(minW),
      breakpoint,
      minW,
      maxW,
      maxWQuery: toMediaQueryString(null, maxW),
      minWQuery: toMediaQueryString(minW),
      minMaxQuery: toMediaQueryString(minW, maxW)
    };
  });
  const _keys = keys(breakpoints);
  const _keysArr = Array.from(_keys.values());
  return {
    keys: _keys,
    normalized,
    isResponsive(test2) {
      const keys2 = Object.keys(test2);
      return keys2.length > 0 && keys2.every((key) => _keys.has(key));
    },
    asObject: sortBps(breakpoints),
    asArray: normalize(breakpoints),
    details: queries,
    get(key) {
      return queries.find((q2) => q2.breakpoint === key);
    },
    media: [
      null,
      ...normalized.map((minW) => toMediaQueryString(minW)).slice(1)
    ],
    toArrayValue(test2) {
      if (!isObject(test2)) {
        throw new Error("toArrayValue: value must be an object");
      }
      const result = _keysArr.map((bp) => {
        var _a22;
        return (_a22 = test2[bp]) != null ? _a22 : null;
      });
      while (getLastItem(result) === null) {
        result.pop();
      }
      return result;
    },
    toObjectValue(test2) {
      if (!Array.isArray(test2)) {
        throw new Error("toObjectValue: value must be an array");
      }
      return test2.reduce((acc, value, index2) => {
        const key = _keysArr[index2];
        if (key != null && value != null)
          acc[key] = value;
        return acc;
      }, {});
    }
  };
}
var state = {
  hover: (str, post) => `${str}:hover ${post}, ${str}[data-hover] ${post}`,
  focus: (str, post) => `${str}:focus ${post}, ${str}[data-focus] ${post}`,
  focusVisible: (str, post) => `${str}:focus-visible ${post}`,
  focusWithin: (str, post) => `${str}:focus-within ${post}`,
  active: (str, post) => `${str}:active ${post}, ${str}[data-active] ${post}`,
  disabled: (str, post) => `${str}:disabled ${post}, ${str}[data-disabled] ${post}`,
  invalid: (str, post) => `${str}:invalid ${post}, ${str}[data-invalid] ${post}`,
  checked: (str, post) => `${str}:checked ${post}, ${str}[data-checked] ${post}`,
  indeterminate: (str, post) => `${str}:indeterminate ${post}, ${str}[aria-checked=mixed] ${post}, ${str}[data-indeterminate] ${post}`,
  readOnly: (str, post) => `${str}:read-only ${post}, ${str}[readonly] ${post}, ${str}[data-read-only] ${post}`,
  expanded: (str, post) => `${str}:read-only ${post}, ${str}[aria-expanded=true] ${post}, ${str}[data-expanded] ${post}`,
  placeholderShown: (str, post) => `${str}:placeholder-shown ${post}`
};
var toGroup = (fn2) => merge((v2) => fn2(v2, "&"), "[role=group]", "[data-group]", ".group");
var toPeer = (fn2) => merge((v2) => fn2(v2, "~ &"), "[data-peer]", ".peer");
var merge = (fn2, ...selectors) => selectors.map(fn2).join(", ");
var pseudoSelectors = {
  _hover: "&:hover, &[data-hover]",
  _active: "&:active, &[data-active]",
  _focus: "&:focus, &[data-focus]",
  _highlighted: "&[data-highlighted]",
  _focusWithin: "&:focus-within",
  _focusVisible: "&:focus-visible, &[data-focus-visible]",
  _disabled: "&:disabled, &[disabled], &[aria-disabled=true], &[data-disabled]",
  _readOnly: "&[aria-readonly=true], &[readonly], &[data-readonly]",
  _before: "&::before",
  _after: "&::after",
  _empty: "&:empty",
  _expanded: "&[aria-expanded=true], &[data-expanded]",
  _checked: "&[aria-checked=true], &[data-checked]",
  _grabbed: "&[aria-grabbed=true], &[data-grabbed]",
  _pressed: "&[aria-pressed=true], &[data-pressed]",
  _invalid: "&[aria-invalid=true], &[data-invalid]",
  _valid: "&[data-valid], &[data-state=valid]",
  _loading: "&[data-loading], &[aria-busy=true]",
  _selected: "&[aria-selected=true], &[data-selected]",
  _hidden: "&[hidden], &[data-hidden]",
  _autofill: "&:-webkit-autofill",
  _even: "&:nth-of-type(even)",
  _odd: "&:nth-of-type(odd)",
  _first: "&:first-of-type",
  _last: "&:last-of-type",
  _notFirst: "&:not(:first-of-type)",
  _notLast: "&:not(:last-of-type)",
  _visited: "&:visited",
  _activeLink: "&[aria-current=page]",
  _activeStep: "&[aria-current=step]",
  _indeterminate: "&:indeterminate, &[aria-checked=mixed], &[data-indeterminate]",
  _groupHover: toGroup(state.hover),
  _peerHover: toPeer(state.hover),
  _groupFocus: toGroup(state.focus),
  _peerFocus: toPeer(state.focus),
  _groupFocusVisible: toGroup(state.focusVisible),
  _peerFocusVisible: toPeer(state.focusVisible),
  _groupActive: toGroup(state.active),
  _peerActive: toPeer(state.active),
  _groupDisabled: toGroup(state.disabled),
  _peerDisabled: toPeer(state.disabled),
  _groupInvalid: toGroup(state.invalid),
  _peerInvalid: toPeer(state.invalid),
  _groupChecked: toGroup(state.checked),
  _peerChecked: toPeer(state.checked),
  _groupFocusWithin: toGroup(state.focusWithin),
  _peerFocusWithin: toPeer(state.focusWithin),
  _peerPlaceholderShown: toPeer(state.placeholderShown),
  _placeholder: "&::placeholder",
  _placeholderShown: "&:placeholder-shown",
  _fullScreen: "&:fullscreen",
  _selection: "&::selection",
  _rtl: "[dir=rtl] &, &[dir=rtl]",
  _ltr: "[dir=ltr] &, &[dir=ltr]",
  _mediaDark: "@media (prefers-color-scheme: dark)",
  _mediaReduceMotion: "@media (prefers-reduced-motion: reduce)",
  _dark: ".chakra-ui-dark &:not([data-theme]),[data-theme=dark] &:not([data-theme]),&[data-theme=dark]",
  _light: ".chakra-ui-light &:not([data-theme]),[data-theme=light] &:not([data-theme]),&[data-theme=light]"
};
var pseudoPropNames = Object.keys(
  pseudoSelectors
);
function tokenToCssVar(token2, prefix2) {
  return cssVar(String(token2).replace(/\./g, "-"), void 0, prefix2);
}
function createThemeVars(flatTokens, options) {
  let cssVars2 = {};
  const cssMap = {};
  for (const [token2, tokenValue] of Object.entries(flatTokens)) {
    const { isSemantic, value } = tokenValue;
    const { variable, reference: reference2 } = tokenToCssVar(token2, options == null ? void 0 : options.cssVarPrefix);
    if (!isSemantic) {
      if (token2.startsWith("space")) {
        const keys2 = token2.split(".");
        const [firstKey, ...referenceKeys] = keys2;
        const negativeLookupKey = `${firstKey}.-${referenceKeys.join(".")}`;
        const negativeValue = calc.negate(value);
        const negatedReference = calc.negate(reference2);
        cssMap[negativeLookupKey] = {
          value: negativeValue,
          var: variable,
          varRef: negatedReference
        };
      }
      cssVars2[variable] = value;
      cssMap[token2] = {
        value,
        var: variable,
        varRef: reference2
      };
      continue;
    }
    const lookupToken = (maybeToken) => {
      const scale2 = String(token2).split(".")[0];
      const withScale = [scale2, maybeToken].join(".");
      const resolvedTokenValue = flatTokens[withScale];
      if (!resolvedTokenValue)
        return maybeToken;
      const { reference: reference22 } = tokenToCssVar(withScale, options == null ? void 0 : options.cssVarPrefix);
      return reference22;
    };
    const normalizedValue = isObject(value) ? value : { default: value };
    cssVars2 = mergeWith(
      cssVars2,
      Object.entries(normalizedValue).reduce(
        (acc, [conditionAlias, conditionValue]) => {
          var _a2, _b;
          const maybeReference = lookupToken(conditionValue);
          if (conditionAlias === "default") {
            acc[variable] = maybeReference;
            return acc;
          }
          const conditionSelector = (_b = (_a2 = pseudoSelectors) == null ? void 0 : _a2[conditionAlias]) != null ? _b : conditionAlias;
          acc[conditionSelector] = { [variable]: maybeReference };
          return acc;
        },
        {}
      )
    );
    cssMap[token2] = {
      value: reference2,
      var: variable,
      varRef: reference2
    };
  }
  return {
    cssVars: cssVars2,
    cssMap
  };
}
function omit$2(object, keysToOmit = []) {
  const clone = Object.assign({}, object);
  for (const key of keysToOmit) {
    if (key in clone) {
      delete clone[key];
    }
  }
  return clone;
}
function pick$1(object, keysToPick) {
  const result = {};
  for (const key of keysToPick) {
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}
var tokens = [
  "colors",
  "borders",
  "borderWidths",
  "borderStyles",
  "fonts",
  "fontSizes",
  "fontWeights",
  "letterSpacings",
  "lineHeights",
  "radii",
  "space",
  "shadows",
  "sizes",
  "zIndices",
  "transition",
  "blur",
  "breakpoints"
];
function extractTokens(theme) {
  const _tokens = tokens;
  return pick$1(theme, _tokens);
}
function extractSemanticTokens(theme) {
  return theme.semanticTokens;
}
function omitVars(rawTheme) {
  const { __cssMap, __cssVars, __breakpoints, ...cleanTheme } = rawTheme;
  return cleanTheme;
}
function flattenTokens({
  tokens: tokens2,
  semanticTokens
}) {
  var _a2, _b;
  const tokenEntries = Object.entries((_a2 = flatten$1(tokens2)) != null ? _a2 : {}).map(
    ([token2, value]) => {
      const enhancedToken = { isSemantic: false, value };
      return [token2, enhancedToken];
    }
  );
  const semanticTokenEntries = Object.entries(
    (_b = flatten$1(semanticTokens, 1)) != null ? _b : {}
  ).map(([token2, value]) => {
    const enhancedToken = { isSemantic: true, value };
    return [token2, enhancedToken];
  });
  return Object.fromEntries([
    ...tokenEntries,
    ...semanticTokenEntries
  ]);
}
function flatten$1(target, maxDepth = Infinity) {
  if (!isObject(target) && !Array.isArray(target) || !maxDepth) {
    return target;
  }
  return Object.entries(target).reduce((result, [key, value]) => {
    if (isObject(value) || Array.isArray(value)) {
      Object.entries(flatten$1(value, maxDepth - 1)).forEach(
        ([childKey, childValue]) => {
          result[`${key}.${childKey}`] = childValue;
        }
      );
    } else {
      result[key] = value;
    }
    return result;
  }, {});
}
function toCSSVar(rawTheme) {
  var _a2;
  const theme = omitVars(rawTheme);
  const tokens2 = extractTokens(theme);
  const semanticTokens = extractSemanticTokens(theme);
  const flatTokens = flattenTokens({ tokens: tokens2, semanticTokens });
  const cssVarPrefix = (_a2 = theme.config) == null ? void 0 : _a2.cssVarPrefix;
  const {
    cssMap,
    cssVars: cssVars2
  } = createThemeVars(flatTokens, { cssVarPrefix });
  const defaultCssVars = {
    "--chakra-ring-inset": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-ring-offset-width": "0px",
    "--chakra-ring-offset-color": "#fff",
    "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
    "--chakra-ring-offset-shadow": "0 0 #0000",
    "--chakra-ring-shadow": "0 0 #0000",
    "--chakra-space-x-reverse": "0",
    "--chakra-space-y-reverse": "0"
  };
  Object.assign(theme, {
    __cssVars: { ...defaultCssVars, ...cssVars2 },
    __cssMap: cssMap,
    __breakpoints: analyzeBreakpoints(theme.breakpoints)
  });
  return theme;
}
var systemProps = mergeWith(
  {},
  background,
  border,
  color$1,
  flexbox,
  layout$1,
  filter$1,
  ring,
  interactivity,
  grid,
  others,
  position,
  effect$3,
  space,
  scroll,
  typography,
  textDecoration,
  transform,
  list,
  transition
);
Object.assign({}, space, layout$1, flexbox, grid, position);
var propNames = [...Object.keys(systemProps), ...pseudoPropNames];
var styleProps = { ...systemProps, ...pseudoSelectors };
var isStyleProp = (prop) => prop in styleProps;
var expandResponsive = (styles) => (theme) => {
  if (!theme.__breakpoints)
    return styles;
  const { isResponsive, toArrayValue, media: medias } = theme.__breakpoints;
  const computedStyles = {};
  for (const key in styles) {
    let value = runIfFn$1(styles[key], theme);
    if (value == null)
      continue;
    value = isObject(value) && isResponsive(value) ? toArrayValue(value) : value;
    if (!Array.isArray(value)) {
      computedStyles[key] = value;
      continue;
    }
    const queries = value.slice(0, medias.length).length;
    for (let index2 = 0; index2 < queries; index2 += 1) {
      const media = medias == null ? void 0 : medias[index2];
      if (!media) {
        computedStyles[key] = value[index2];
        continue;
      }
      computedStyles[media] = computedStyles[media] || {};
      if (value[index2] == null) {
        continue;
      }
      computedStyles[media][key] = value[index2];
    }
  }
  return computedStyles;
};
function splitByComma(value) {
  const chunks = [];
  let chunk = "";
  let inParens = false;
  for (let i = 0; i < value.length; i++) {
    const char2 = value[i];
    if (char2 === "(") {
      inParens = true;
      chunk += char2;
    } else if (char2 === ")") {
      inParens = false;
      chunk += char2;
    } else if (char2 === "," && !inParens) {
      chunks.push(chunk);
      chunk = "";
    } else {
      chunk += char2;
    }
  }
  chunk = chunk.trim();
  if (chunk) {
    chunks.push(chunk);
  }
  return chunks;
}
function isCssVar2(value) {
  return /^var\(--.+\)$/.test(value);
}
var isCSSVariableTokenValue = (key, value) => key.startsWith("--") && typeof value === "string" && !isCssVar2(value);
var resolveTokenValue = (theme, value) => {
  var _a2, _b;
  if (value == null)
    return value;
  const getVar = (val) => {
    var _a22, _b2;
    return (_b2 = (_a22 = theme.__cssMap) == null ? void 0 : _a22[val]) == null ? void 0 : _b2.varRef;
  };
  const getValue2 = (val) => {
    var _a22;
    return (_a22 = getVar(val)) != null ? _a22 : val;
  };
  const [tokenValue, fallbackValue] = splitByComma(value);
  value = (_b = (_a2 = getVar(tokenValue)) != null ? _a2 : getValue2(fallbackValue)) != null ? _b : getValue2(value);
  return value;
};
function getCss(options) {
  const { configs = {}, pseudos = {}, theme } = options;
  const css2 = (stylesOrFn, nested = false) => {
    var _a2, _b, _c;
    const _styles = runIfFn$1(stylesOrFn, theme);
    const styles = expandResponsive(_styles)(theme);
    let computedStyles = {};
    for (let key in styles) {
      const valueOrFn = styles[key];
      let value = runIfFn$1(valueOrFn, theme);
      if (key in pseudos) {
        key = pseudos[key];
      }
      if (isCSSVariableTokenValue(key, value)) {
        value = resolveTokenValue(theme, value);
      }
      let config = configs[key];
      if (config === true) {
        config = { property: key };
      }
      if (isObject(value)) {
        computedStyles[key] = (_a2 = computedStyles[key]) != null ? _a2 : {};
        computedStyles[key] = mergeWith(
          {},
          computedStyles[key],
          css2(value, true)
        );
        continue;
      }
      let rawValue = (_c = (_b = config == null ? void 0 : config.transform) == null ? void 0 : _b.call(config, value, theme, _styles)) != null ? _c : value;
      rawValue = (config == null ? void 0 : config.processResult) ? css2(rawValue, true) : rawValue;
      const configProperty = runIfFn$1(config == null ? void 0 : config.property, theme);
      if (!nested && (config == null ? void 0 : config.static)) {
        const staticStyles = runIfFn$1(config.static, theme);
        computedStyles = mergeWith({}, computedStyles, staticStyles);
      }
      if (configProperty && Array.isArray(configProperty)) {
        for (const property of configProperty) {
          computedStyles[property] = rawValue;
        }
        continue;
      }
      if (configProperty) {
        if (configProperty === "&" && isObject(rawValue)) {
          computedStyles = mergeWith({}, computedStyles, rawValue);
        } else {
          computedStyles[configProperty] = rawValue;
        }
        continue;
      }
      if (isObject(rawValue)) {
        computedStyles = mergeWith({}, computedStyles, rawValue);
        continue;
      }
      computedStyles[key] = rawValue;
    }
    return computedStyles;
  };
  return css2;
}
var css = (styles) => (theme) => {
  const cssFn = getCss({
    theme,
    pseudos: pseudoSelectors,
    configs: systemProps
  });
  return cssFn(styles);
};
function defineStyle(styles) {
  return styles;
}
function defineStyleConfig(config) {
  return config;
}
function createMultiStyleConfigHelpers(parts) {
  return {
    definePartsStyle(config) {
      return config;
    },
    defineMultiStyleConfig(config) {
      return { parts, ...config };
    }
  };
}
function normalize2(value, toArray2) {
  if (Array.isArray(value))
    return value;
  if (isObject(value))
    return toArray2(value);
  if (value != null)
    return [value];
}
function getNextIndex(values, i) {
  for (let j = i + 1; j < values.length; j++) {
    if (values[j] != null)
      return j;
  }
  return -1;
}
function createResolver(theme) {
  const breakpointUtil = theme.__breakpoints;
  return function resolver(config, prop, value, props) {
    var _a2, _b;
    if (!breakpointUtil)
      return;
    const result = {};
    const normalized = normalize2(value, breakpointUtil.toArrayValue);
    if (!normalized)
      return result;
    const len = normalized.length;
    const isSingle = len === 1;
    const isMultipart = !!config.parts;
    for (let i = 0; i < len; i++) {
      const key = breakpointUtil.details[i];
      const nextKey = breakpointUtil.details[getNextIndex(normalized, i)];
      const query = toMediaQueryString(key.minW, nextKey == null ? void 0 : nextKey._minW);
      const styles = runIfFn$1((_a2 = config[prop]) == null ? void 0 : _a2[normalized[i]], props);
      if (!styles)
        continue;
      if (isMultipart) {
        (_b = config.parts) == null ? void 0 : _b.forEach((part) => {
          mergeWith(result, {
            [part]: isSingle ? styles[part] : { [query]: styles[part] }
          });
        });
        continue;
      }
      if (!isMultipart) {
        if (isSingle)
          mergeWith(result, styles);
        else
          result[query] = styles;
        continue;
      }
      result[query] = styles;
    }
    return result;
  };
}
function resolveStyleConfig(config) {
  return (props) => {
    var _a2;
    const { variant, size, theme } = props;
    const recipe = createResolver(theme);
    return mergeWith(
      {},
      runIfFn$1((_a2 = config.baseStyle) != null ? _a2 : {}, props),
      recipe(config, "sizes", size, props),
      recipe(config, "variants", variant, props)
    );
  };
}
function getCSSVar(theme, scale2, value) {
  var _a2, _b, _c;
  return (_c = (_b = (_a2 = theme.__cssMap) == null ? void 0 : _a2[`${scale2}.${value}`]) == null ? void 0 : _b.varRef) != null ? _c : value;
}
function omitThemingProps(props) {
  return omit$2(props, ["styleConfig", "size", "variant", "colorScheme"]);
}
function omit$1(object, keys2) {
  const result = {};
  Object.keys(object).forEach((key) => {
    if (keys2.includes(key))
      return;
    result[key] = object[key];
  });
  return result;
}
function get(obj, path2, fallback, index2) {
  const key = typeof path2 === "string" ? path2.split(".") : [path2];
  for (index2 = 0; index2 < key.length; index2 += 1) {
    if (!obj)
      break;
    obj = obj[key[index2]];
  }
  return obj === void 0 ? fallback : obj;
}
var memoize = (fn2) => {
  const cache = /* @__PURE__ */ new WeakMap();
  const memoizedFn = (obj, path2, fallback, index2) => {
    if (typeof obj === "undefined") {
      return fn2(obj, path2, fallback);
    }
    if (!cache.has(obj)) {
      cache.set(obj, /* @__PURE__ */ new Map());
    }
    const map = cache.get(obj);
    if (map.has(path2)) {
      return map.get(path2);
    }
    const value = fn2(obj, path2, fallback, index2);
    map.set(path2, value);
    return value;
  };
  return memoizedFn;
};
var memoizedGet = memoize(get);
function objectFilter(object, fn2) {
  const result = {};
  Object.keys(object).forEach((key) => {
    const value = object[key];
    const shouldPass = fn2(value, key, object);
    if (shouldPass) {
      result[key] = value;
    }
  });
  return result;
}
var filterUndefined = (object) => objectFilter(object, (val) => val !== null && val !== void 0);
function isFunction$1(value) {
  return typeof value === "function";
}
function runIfFn(valueOrFn, ...args) {
  return isFunction$1(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}
var hasElementType = typeof Element !== "undefined";
var hasMap = typeof Map === "function";
var hasSet = typeof Set === "function";
var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
function equal(a, b2) {
  if (a === b2)
    return true;
  if (a && b2 && typeof a == "object" && typeof b2 == "object") {
    if (a.constructor !== b2.constructor)
      return false;
    var length2, i, keys2;
    if (Array.isArray(a)) {
      length2 = a.length;
      if (length2 != b2.length)
        return false;
      for (i = length2; i-- !== 0; )
        if (!equal(a[i], b2[i]))
          return false;
      return true;
    }
    var it;
    if (hasMap && a instanceof Map && b2 instanceof Map) {
      if (a.size !== b2.size)
        return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b2.has(i.value[0]))
          return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!equal(i.value[1], b2.get(i.value[0])))
          return false;
      return true;
    }
    if (hasSet && a instanceof Set && b2 instanceof Set) {
      if (a.size !== b2.size)
        return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b2.has(i.value[0]))
          return false;
      return true;
    }
    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b2)) {
      length2 = a.length;
      if (length2 != b2.length)
        return false;
      for (i = length2; i-- !== 0; )
        if (a[i] !== b2[i])
          return false;
      return true;
    }
    if (a.constructor === RegExp)
      return a.source === b2.source && a.flags === b2.flags;
    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b2.valueOf();
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b2.toString();
    keys2 = Object.keys(a);
    length2 = keys2.length;
    if (length2 !== Object.keys(b2).length)
      return false;
    for (i = length2; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b2, keys2[i]))
        return false;
    if (hasElementType && a instanceof Element)
      return false;
    for (i = length2; i-- !== 0; ) {
      if ((keys2[i] === "_owner" || keys2[i] === "__v" || keys2[i] === "__o") && a.$$typeof) {
        continue;
      }
      if (!equal(a[keys2[i]], b2[keys2[i]]))
        return false;
    }
    return true;
  }
  return a !== a && b2 !== b2;
}
var reactFastCompare = function isEqual(a, b2) {
  try {
    return equal(a, b2);
  } catch (error2) {
    if ((error2.message || "").match(/stack|recursion/i)) {
      console.warn("react-fast-compare cannot handle circular refs");
      return false;
    }
    throw error2;
  }
};
function useStyleConfigImpl(themeKey, props = {}) {
  var _a2;
  const { styleConfig: styleConfigProp, ...rest } = props;
  const { theme, colorMode } = useChakra();
  const themeStyleConfig = themeKey ? memoizedGet(theme, `components.${themeKey}`) : void 0;
  const styleConfig = styleConfigProp || themeStyleConfig;
  const mergedProps = mergeWith(
    { theme, colorMode },
    (_a2 = styleConfig == null ? void 0 : styleConfig.defaultProps) != null ? _a2 : {},
    filterUndefined(omit$1(rest, ["children"]))
  );
  const stylesRef = react.exports.useRef({});
  if (styleConfig) {
    const getStyles = resolveStyleConfig(styleConfig);
    const styles = getStyles(mergedProps);
    const isStyleEqual = reactFastCompare(stylesRef.current, styles);
    if (!isStyleEqual) {
      stylesRef.current = styles;
    }
  }
  return stylesRef.current;
}
function useStyleConfig(themeKey, props = {}) {
  return useStyleConfigImpl(themeKey, props);
}
function useMultiStyleConfig(themeKey, props = {}) {
  return useStyleConfigImpl(themeKey, props);
}
var allPropNames = /* @__PURE__ */ new Set([
  ...propNames,
  "textStyle",
  "layerStyle",
  "apply",
  "noOfLines",
  "focusBorderColor",
  "errorBorderColor",
  "as",
  "__css",
  "css",
  "sx"
]);
var validHTMLProps = /* @__PURE__ */ new Set([
  "htmlWidth",
  "htmlHeight",
  "htmlSize",
  "htmlTranslate"
]);
function shouldForwardProp(prop) {
  return validHTMLProps.has(prop) || !allPropNames.has(prop);
}
function compact(object) {
  const clone = Object.assign({}, object);
  for (let key in clone) {
    if (clone[key] === void 0)
      delete clone[key];
  }
  return clone;
}
function assignAfter(target, ...sources) {
  if (target == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  const result = { ...target };
  for (const nextSource of sources) {
    if (nextSource == null)
      continue;
    for (const nextKey in nextSource) {
      if (!Object.prototype.hasOwnProperty.call(nextSource, nextKey))
        continue;
      if (nextKey in result)
        delete result[nextKey];
      result[nextKey] = nextSource[nextKey];
    }
  }
  return result;
}
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ memoize$2(
  function(prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
  }
);
var testOmitPropsOnStringTag = isPropValid;
var testOmitPropsOnComponent = function testOmitPropsOnComponent2(key) {
  return key !== "theme";
};
var getDefaultShouldForwardProp = function getDefaultShouldForwardProp2(tag) {
  return typeof tag === "string" && tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps2(tag, options, isReal) {
  var shouldForwardProp2;
  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp2 = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }
  if (typeof shouldForwardProp2 !== "function" && isReal) {
    shouldForwardProp2 = tag.__emotion_forwardProp;
  }
  return shouldForwardProp2;
};
var Insertion = function Insertion2(_ref) {
  var cache = _ref.cache, serialized = _ref.serialized, isStringTag = _ref.isStringTag;
  registerStyles(cache, serialized, isStringTag);
  useInsertionEffectAlwaysWithSyncFallback(function() {
    return insertStyles(cache, serialized, isStringTag);
  });
  return null;
};
var createStyled = function createStyled2(tag, options) {
  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;
  if (options !== void 0) {
    identifierName = options.label;
    targetClassName = options.target;
  }
  var shouldForwardProp2 = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp2 || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp("as");
  return function() {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
    if (identifierName !== void 0) {
      styles.push("label:" + identifierName + ";");
    }
    if (args[0] == null || args[0].raw === void 0) {
      styles.push.apply(styles, args);
    } else {
      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;
      for (; i < len; i++) {
        styles.push(args[i], args[0][i]);
      }
    }
    var Styled = withEmotionCache(function(props, cache, ref) {
      var FinalTag = shouldUseAs && props.as || baseTag;
      var className = "";
      var classInterpolations = [];
      var mergedProps = props;
      if (props.theme == null) {
        mergedProps = {};
        for (var key in props) {
          mergedProps[key] = props[key];
        }
        mergedProps.theme = react.exports.useContext(ThemeContext);
      }
      if (typeof props.className === "string") {
        className = getRegisteredStyles(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }
      var serialized = serializeStyles(styles.concat(classInterpolations), cache.registered, mergedProps);
      className += cache.key + "-" + serialized.name;
      if (targetClassName !== void 0) {
        className += " " + targetClassName;
      }
      var finalShouldForwardProp = shouldUseAs && shouldForwardProp2 === void 0 ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp;
      var newProps = {};
      for (var _key in props) {
        if (shouldUseAs && _key === "as")
          continue;
        if (finalShouldForwardProp(_key)) {
          newProps[_key] = props[_key];
        }
      }
      newProps.className = className;
      newProps.ref = ref;
      return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(Insertion, {
        cache,
        serialized,
        isStringTag: typeof FinalTag === "string"
      }), /* @__PURE__ */ react.exports.createElement(FinalTag, newProps));
    });
    Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp2;
    Object.defineProperty(Styled, "toString", {
      value: function value() {
        if (targetClassName === void 0 && false) {
          return "NO_COMPONENT_SELECTOR";
        }
        return "." + targetClassName;
      }
    });
    Styled.withComponent = function(nextTag, nextOptions) {
      return createStyled2(nextTag, _extends({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })).apply(void 0, styles);
    };
    return Styled;
  };
};
var tags = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
var newStyled = createStyled.bind();
tags.forEach(function(tagName) {
  newStyled[tagName] = newStyled(tagName);
});
var _a$1;
var emotion_styled = (_a$1 = newStyled.default) != null ? _a$1 : newStyled;
var toCSSObject = ({
  baseStyle
}) => (props) => {
  const {
    theme,
    css: cssProp,
    __css,
    sx,
    ...rest
  } = props;
  const styleProps2 = objectFilter(rest, (_, prop) => isStyleProp(prop));
  const finalBaseStyle = runIfFn(baseStyle, props);
  const finalStyles = assignAfter({}, __css, finalBaseStyle, filterUndefined(styleProps2), sx);
  const computedCSS = css(finalStyles)(props.theme);
  return cssProp ? [computedCSS, cssProp] : computedCSS;
};
function styled(component, options) {
  const {
    baseStyle,
    ...styledOptions
  } = options != null ? options : {};
  if (!styledOptions.shouldForwardProp) {
    styledOptions.shouldForwardProp = shouldForwardProp;
  }
  const styleObject = toCSSObject({
    baseStyle
  });
  const Component = emotion_styled(component, styledOptions)(styleObject);
  const chakraComponent = React__default.forwardRef(function ChakraComponent(props, ref) {
    const {
      colorMode,
      forced
    } = useColorMode();
    return /* @__PURE__ */ jsx(Component, {
      ref,
      "data-theme": forced ? colorMode : void 0,
      ...props
    });
  });
  return chakraComponent;
}
function factory() {
  const cache = /* @__PURE__ */ new Map();
  return new Proxy(styled, {
    apply(target, thisArg, argArray) {
      return styled(...argArray);
    },
    get(_, element) {
      if (!cache.has(element)) {
        cache.set(element, styled(element));
      }
      return cache.get(element);
    }
  });
}
var chakra = factory();
function forwardRef(component) {
  return react.exports.forwardRef(component);
}
function useCallbackRef(callback, deps = []) {
  const callbackRef = react.exports.useRef(callback);
  react.exports.useEffect(() => {
    callbackRef.current = callback;
  });
  return react.exports.useCallback((...args) => {
    var _a2;
    return (_a2 = callbackRef.current) == null ? void 0 : _a2.call(callbackRef, ...args);
  }, deps);
}
const MotionConfigContext = react.exports.createContext({
  transformPagePoint: (p2) => p2,
  isStatic: false,
  reducedMotion: "never"
});
const MotionContext = react.exports.createContext({});
function useVisualElementContext() {
  return react.exports.useContext(MotionContext).visualElement;
}
const PresenceContext = react.exports.createContext(null);
const isBrowser = typeof document !== "undefined";
const useIsomorphicLayoutEffect = isBrowser ? react.exports.useLayoutEffect : react.exports.useEffect;
const LazyContext = react.exports.createContext({ strict: false });
function useVisualElement(Component, visualState, props, createVisualElement) {
  const parent = useVisualElementContext();
  const lazyContext = react.exports.useContext(LazyContext);
  const presenceContext = react.exports.useContext(PresenceContext);
  const reducedMotionConfig = react.exports.useContext(MotionConfigContext).reducedMotion;
  const visualElementRef = react.exports.useRef();
  createVisualElement = createVisualElement || lazyContext.renderer;
  if (!visualElementRef.current && createVisualElement) {
    visualElementRef.current = createVisualElement(Component, {
      visualState,
      parent,
      props,
      presenceContext,
      blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
      reducedMotionConfig
    });
  }
  const visualElement = visualElementRef.current;
  react.exports.useInsertionEffect(() => {
    visualElement && visualElement.update(props, presenceContext);
  });
  useIsomorphicLayoutEffect(() => {
    visualElement && visualElement.render();
  });
  react.exports.useEffect(() => {
    visualElement && visualElement.updateFeatures();
  });
  const useAnimateChangesEffect = window.HandoffAppearAnimations ? useIsomorphicLayoutEffect : react.exports.useEffect;
  useAnimateChangesEffect(() => {
    if (visualElement && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
  });
  return visualElement;
}
function isRefObject(ref) {
  return typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
function useMotionRef(visualState, visualElement, externalRef) {
  return react.exports.useCallback(
    (instance) => {
      instance && visualState.mount && visualState.mount(instance);
      if (visualElement) {
        instance ? visualElement.mount(instance) : visualElement.unmount();
      }
      if (externalRef) {
        if (typeof externalRef === "function") {
          externalRef(instance);
        } else if (isRefObject(externalRef)) {
          externalRef.current = instance;
        }
      }
    },
    [visualElement]
  );
}
function isVariantLabel(v2) {
  return typeof v2 === "string" || Array.isArray(v2);
}
function isAnimationControls(v2) {
  return typeof v2 === "object" && typeof v2.start === "function";
}
const variantPriorityOrder = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
];
const variantProps = ["initial", ...variantPriorityOrder];
function isControllingVariants(props) {
  return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
}
function isVariantNode(props) {
  return Boolean(isControllingVariants(props) || props.variants);
}
function getCurrentTreeVariants(props, context) {
  if (isControllingVariants(props)) {
    const { initial, animate: animate2 } = props;
    return {
      initial: initial === false || isVariantLabel(initial) ? initial : void 0,
      animate: isVariantLabel(animate2) ? animate2 : void 0
    };
  }
  return props.inherit !== false ? context : {};
}
function useCreateMotionContext(props) {
  const { initial, animate: animate2 } = getCurrentTreeVariants(props, react.exports.useContext(MotionContext));
  return react.exports.useMemo(() => ({ initial, animate: animate2 }), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate2)]);
}
function variantLabelsAsDependency(prop) {
  return Array.isArray(prop) ? prop.join(" ") : prop;
}
const featureProps = {
  animation: [
    "animate",
    "exit",
    "variants",
    "whileHover",
    "whileTap",
    "whileFocus",
    "whileDrag",
    "whileInView"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
const featureDefinitions = {};
for (const key in featureProps) {
  featureDefinitions[key] = {
    isEnabled: (props) => featureProps[key].some((name) => !!props[name])
  };
}
function loadFeatures(features) {
  for (const key in features) {
    featureDefinitions[key] = {
      ...featureDefinitions[key],
      ...features[key]
    };
  }
}
function useConstant$1(init2) {
  const ref = react.exports.useRef(null);
  if (ref.current === null) {
    ref.current = init2();
  }
  return ref.current;
}
const globalProjectionState = {
  hasAnimatedSinceResize: true,
  hasEverUpdated: false
};
let id$2 = 1;
function useProjectionId() {
  return useConstant$1(() => {
    if (globalProjectionState.hasEverUpdated) {
      return id$2++;
    }
  });
}
const LayoutGroupContext = react.exports.createContext({});
const SwitchLayoutGroupContext = react.exports.createContext({});
const motionComponentSymbol = Symbol.for("motionComponentSymbol");
function createMotionComponent({
  preloadedFeatures: preloadedFeatures2,
  createVisualElement,
  useRender,
  useVisualState,
  Component
}) {
  preloadedFeatures2 && loadFeatures(preloadedFeatures2);
  function MotionComponent(props, externalRef) {
    let MeasureLayout2;
    const configAndProps = {
      ...react.exports.useContext(MotionConfigContext),
      ...props,
      layoutId: useLayoutId(props)
    };
    const {
      isStatic
    } = configAndProps;
    const context = useCreateMotionContext(props);
    const projectionId = isStatic ? void 0 : useProjectionId();
    const visualState = useVisualState(props, isStatic);
    if (!isStatic && isBrowser) {
      context.visualElement = useVisualElement(Component, visualState, configAndProps, createVisualElement);
      const initialLayoutGroupConfig = react.exports.useContext(SwitchLayoutGroupContext);
      const isStrict = react.exports.useContext(LazyContext).strict;
      if (context.visualElement) {
        MeasureLayout2 = context.visualElement.loadFeatures(
          configAndProps,
          isStrict,
          preloadedFeatures2,
          projectionId,
          initialLayoutGroupConfig
        );
      }
    }
    return /* @__PURE__ */ jsxs(MotionContext.Provider, {
      value: context,
      children: [MeasureLayout2 && context.visualElement ? /* @__PURE__ */ jsx(MeasureLayout2, {
        visualElement: context.visualElement,
        ...configAndProps
      }) : null, useRender(Component, props, projectionId, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, context.visualElement)]
    });
  }
  const ForwardRefComponent = react.exports.forwardRef(MotionComponent);
  ForwardRefComponent[motionComponentSymbol] = Component;
  return ForwardRefComponent;
}
function useLayoutId({
  layoutId
}) {
  const layoutGroupId = react.exports.useContext(LayoutGroupContext).id;
  return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
function createMotionProxy(createConfig) {
  function custom(Component, customMotionComponentConfig = {}) {
    return createMotionComponent(createConfig(Component, customMotionComponentConfig));
  }
  if (typeof Proxy === "undefined") {
    return custom;
  }
  const componentCache = /* @__PURE__ */ new Map();
  return new Proxy(custom, {
    get: (_target, key) => {
      if (!componentCache.has(key)) {
        componentCache.set(key, custom(key));
      }
      return componentCache.get(key);
    }
  });
}
const lowercaseSVGElements = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function isSVGComponent(Component) {
  if (typeof Component !== "string" || Component.includes("-")) {
    return false;
  } else if (lowercaseSVGElements.indexOf(Component) > -1 || /[A-Z]/.test(Component)) {
    return true;
  }
  return false;
}
const scaleCorrectors = {};
function addScaleCorrector(correctors) {
  Object.assign(scaleCorrectors, correctors);
}
const transformPropOrder = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
];
const transformProps = new Set(transformPropOrder);
function isForcedMotionValue(key, { layout: layout2, layoutId }) {
  return transformProps.has(key) || key.startsWith("origin") || (layout2 || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}
const isMotionValue = (value) => Boolean(value && value.getVelocity);
const translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
const numTransforms = transformPropOrder.length;
function buildTransform(transform2, { enableHardwareAcceleration = true, allowTransformNone = true }, transformIsDefault, transformTemplate2) {
  let transformString = "";
  for (let i = 0; i < numTransforms; i++) {
    const key = transformPropOrder[i];
    if (transform2[key] !== void 0) {
      const transformName = translateAlias[key] || key;
      transformString += `${transformName}(${transform2[key]}) `;
    }
  }
  if (enableHardwareAcceleration && !transform2.z) {
    transformString += "translateZ(0)";
  }
  transformString = transformString.trim();
  if (transformTemplate2) {
    transformString = transformTemplate2(transform2, transformIsDefault ? "" : transformString);
  } else if (allowTransformNone && transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}
const checkStringStartsWith = (token2) => (key) => typeof key === "string" && key.startsWith(token2);
const isCSSVariableName = checkStringStartsWith("--");
const isCSSVariableToken = checkStringStartsWith("var(--");
const getValueAsType = (value, type) => {
  return type && typeof value === "number" ? type.transform(value) : value;
};
const clamp = (min2, max2, v2) => Math.min(Math.max(v2, min2), max2);
const number = {
  test: (v2) => typeof v2 === "number",
  parse: parseFloat,
  transform: (v2) => v2
};
const alpha = {
  ...number,
  transform: (v2) => clamp(0, 1, v2)
};
const scale$1 = {
  ...number,
  default: 1
};
const sanitize = (v2) => Math.round(v2 * 1e5) / 1e5;
const floatRegex = /(-)?([\d]*\.?[\d])+/g;
const colorRegex = /(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi;
const singleColorRegex = /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
function isString$1(v2) {
  return typeof v2 === "string";
}
const createUnitType = (unit) => ({
  test: (v2) => isString$1(v2) && v2.endsWith(unit) && v2.split(" ").length === 1,
  parse: parseFloat,
  transform: (v2) => `${v2}${unit}`
});
const degrees = createUnitType("deg");
const percent = createUnitType("%");
const px = createUnitType("px");
const vh = createUnitType("vh");
const vw = createUnitType("vw");
const progressPercentage = {
  ...percent,
  parse: (v2) => percent.parse(v2) / 100,
  transform: (v2) => percent.transform(v2 * 100)
};
const int = {
  ...number,
  transform: Math.round
};
const numberValueTypes = {
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  size: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale: scale$1,
  scaleX: scale$1,
  scaleY: scale$1,
  scaleZ: scale$1,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px,
  zIndex: int,
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};
function buildHTMLStyles(state2, latestValues, options, transformTemplate2) {
  const { style, vars, transform: transform2, transformOrigin: transformOrigin2 } = state2;
  let hasTransform2 = false;
  let hasTransformOrigin = false;
  let transformIsNone = true;
  for (const key in latestValues) {
    const value = latestValues[key];
    if (isCSSVariableName(key)) {
      vars[key] = value;
      continue;
    }
    const valueType = numberValueTypes[key];
    const valueAsType = getValueAsType(value, valueType);
    if (transformProps.has(key)) {
      hasTransform2 = true;
      transform2[key] = valueAsType;
      if (!transformIsNone)
        continue;
      if (value !== (valueType.default || 0))
        transformIsNone = false;
    } else if (key.startsWith("origin")) {
      hasTransformOrigin = true;
      transformOrigin2[key] = valueAsType;
    } else {
      style[key] = valueAsType;
    }
  }
  if (!latestValues.transform) {
    if (hasTransform2 || transformTemplate2) {
      style.transform = buildTransform(state2.transform, options, transformIsNone, transformTemplate2);
    } else if (style.transform) {
      style.transform = "none";
    }
  }
  if (hasTransformOrigin) {
    const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin2;
    style.transformOrigin = `${originX} ${originY} ${originZ}`;
  }
}
const createHtmlRenderState = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function copyRawValuesOnly(target, source, props) {
  for (const key in source) {
    if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
      target[key] = source[key];
    }
  }
}
function useInitialMotionValues({ transformTemplate: transformTemplate2 }, visualState, isStatic) {
  return react.exports.useMemo(() => {
    const state2 = createHtmlRenderState();
    buildHTMLStyles(state2, visualState, { enableHardwareAcceleration: !isStatic }, transformTemplate2);
    return Object.assign({}, state2.vars, state2.style);
  }, [visualState]);
}
function useStyle(props, visualState, isStatic) {
  const styleProp = props.style || {};
  const style = {};
  copyRawValuesOnly(style, styleProp, props);
  Object.assign(style, useInitialMotionValues(props, visualState, isStatic));
  return props.transformValues ? props.transformValues(style) : style;
}
function useHTMLProps(props, visualState, isStatic) {
  const htmlProps = {};
  const style = useStyle(props, visualState, isStatic);
  if (props.drag && props.dragListener !== false) {
    htmlProps.draggable = false;
    style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
    style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
  }
  if (props.tabIndex === void 0 && (props.onTap || props.onTapStart || props.whileTap)) {
    htmlProps.tabIndex = 0;
  }
  htmlProps.style = style;
  return htmlProps;
}
const validMotionProps = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "transformValues",
  "custom",
  "inherit",
  "onLayoutAnimationStart",
  "onLayoutAnimationComplete",
  "onLayoutMeasure",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "ignoreStrict",
  "viewport"
]);
function isValidMotionProp(key) {
  return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || validMotionProps.has(key);
}
let shouldForward = (key) => !isValidMotionProp(key);
function loadExternalIsValidProp(isValidProp) {
  if (!isValidProp)
    return;
  shouldForward = (key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
}
try {
  loadExternalIsValidProp(require("@emotion/is-prop-valid").default);
} catch (_a2) {
}
function filterProps(props, isDom, forwardMotionProps) {
  const filteredProps = {};
  for (const key in props) {
    if (key === "values" && typeof props.values === "object")
      continue;
    if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || props["draggable"] && key.startsWith("onDrag")) {
      filteredProps[key] = props[key];
    }
  }
  return filteredProps;
}
function calcOrigin$1(origin, offset2, size) {
  return typeof origin === "string" ? origin : px.transform(offset2 + size * origin);
}
function calcSVGTransformOrigin(dimensions, originX, originY) {
  const pxOriginX = calcOrigin$1(originX, dimensions.x, dimensions.width);
  const pxOriginY = calcOrigin$1(originY, dimensions.y, dimensions.height);
  return `${pxOriginX} ${pxOriginY}`;
}
const dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
const camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, length2, spacing = 1, offset2 = 0, useDashCase = true) {
  attrs.pathLength = 1;
  const keys2 = useDashCase ? dashKeys : camelKeys;
  attrs[keys2.offset] = px.transform(-offset2);
  const pathLength = px.transform(length2);
  const pathSpacing = px.transform(spacing);
  attrs[keys2.array] = `${pathLength} ${pathSpacing}`;
}
function buildSVGAttrs(state2, {
  attrX,
  attrY,
  originX,
  originY,
  pathLength,
  pathSpacing = 1,
  pathOffset = 0,
  ...latest
}, options, isSVGTag2, transformTemplate2) {
  buildHTMLStyles(state2, latest, options, transformTemplate2);
  if (isSVGTag2) {
    if (state2.style.viewBox) {
      state2.attrs.viewBox = state2.style.viewBox;
    }
    return;
  }
  state2.attrs = state2.style;
  state2.style = {};
  const { attrs, style, dimensions } = state2;
  if (attrs.transform) {
    if (dimensions)
      style.transform = attrs.transform;
    delete attrs.transform;
  }
  if (dimensions && (originX !== void 0 || originY !== void 0 || style.transform)) {
    style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : 0.5, originY !== void 0 ? originY : 0.5);
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (pathLength !== void 0) {
    buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
  }
}
const createSvgRenderState = () => ({
  ...createHtmlRenderState(),
  attrs: {}
});
const isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";
function useSVGProps(props, visualState, _isStatic, Component) {
  const visualProps = react.exports.useMemo(() => {
    const state2 = createSvgRenderState();
    buildSVGAttrs(state2, visualState, { enableHardwareAcceleration: false }, isSVGTag(Component), props.transformTemplate);
    return {
      ...state2.attrs,
      style: { ...state2.style }
    };
  }, [visualState]);
  if (props.style) {
    const rawStyles = {};
    copyRawValuesOnly(rawStyles, props.style, props);
    visualProps.style = { ...rawStyles, ...visualProps.style };
  }
  return visualProps;
}
function createUseRender(forwardMotionProps = false) {
  const useRender = (Component, props, projectionId, ref, { latestValues }, isStatic) => {
    const useVisualProps = isSVGComponent(Component) ? useSVGProps : useHTMLProps;
    const visualProps = useVisualProps(props, latestValues, isStatic, Component);
    const filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
    const elementProps = {
      ...filteredProps,
      ...visualProps,
      ref
    };
    const { children: children2 } = props;
    const renderedChildren = react.exports.useMemo(() => isMotionValue(children2) ? children2.get() : children2, [children2]);
    if (projectionId) {
      elementProps["data-projection-id"] = projectionId;
    }
    return react.exports.createElement(Component, {
      ...elementProps,
      children: renderedChildren
    });
  };
  return useRender;
}
const camelToDash = (str) => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
function renderHTML(element, { style, vars }, styleProp, projection) {
  Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
  for (const key in vars) {
    element.style.setProperty(key, vars[key]);
  }
}
const camelCaseAttributes = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);
function renderSVG(element, renderState, _styleProp, projection) {
  renderHTML(element, renderState, void 0, projection);
  for (const key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}
function scrapeMotionValuesFromProps$1(props, prevProps) {
  const { style } = props;
  const newValues = {};
  for (const key in style) {
    if (isMotionValue(style[key]) || prevProps.style && isMotionValue(prevProps.style[key]) || isForcedMotionValue(key, props)) {
      newValues[key] = style[key];
    }
  }
  return newValues;
}
function scrapeMotionValuesFromProps(props, prevProps) {
  const newValues = scrapeMotionValuesFromProps$1(props, prevProps);
  for (const key in props) {
    if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
      const targetKey = key === "x" || key === "y" ? "attr" + key.toUpperCase() : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}
function resolveVariantFromProps(props, definition, custom, currentValues = {}, currentVelocity = {}) {
  if (typeof definition === "function") {
    definition = definition(custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
  }
  if (typeof definition === "string") {
    definition = props.variants && props.variants[definition];
  }
  if (typeof definition === "function") {
    definition = definition(custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
  }
  return definition;
}
const isKeyframesTarget = (v2) => {
  return Array.isArray(v2);
};
const isCustomValue = (v2) => {
  return Boolean(v2 && typeof v2 === "object" && v2.mix && v2.toValue);
};
const resolveFinalValueInKeyframes = (v2) => {
  return isKeyframesTarget(v2) ? v2[v2.length - 1] || 0 : v2;
};
function resolveMotionValue(value) {
  const unwrappedValue = isMotionValue(value) ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}
function makeState({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2, createRenderState, onMount }, props, context, presenceContext) {
  const state2 = {
    latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps2),
    renderState: createRenderState()
  };
  if (onMount) {
    state2.mount = (instance) => onMount(props, instance, state2);
  }
  return state2;
}
const makeUseVisualState = (config) => (props, isStatic) => {
  const context = react.exports.useContext(MotionContext);
  const presenceContext = react.exports.useContext(PresenceContext);
  const make = () => makeState(config, props, context, presenceContext);
  return isStatic ? make() : useConstant$1(make);
};
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  const values = {};
  const motionValues = scrapeMotionValues(props, {});
  for (const key in motionValues) {
    values[key] = resolveMotionValue(motionValues[key]);
  }
  let { initial, animate: animate2 } = props;
  const isControllingVariants$1 = isControllingVariants(props);
  const isVariantNode$1 = isVariantNode(props);
  if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
    if (initial === void 0)
      initial = context.initial;
    if (animate2 === void 0)
      animate2 = context.animate;
  }
  let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
  isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
  const variantToSet = isInitialAnimationBlocked ? animate2 : initial;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    const list2 = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    list2.forEach((definition) => {
      const resolved = resolveVariantFromProps(props, definition);
      if (!resolved)
        return;
      const { transitionEnd, transition: transition2, ...target } = resolved;
      for (const key in target) {
        let valueTarget = target[key];
        if (Array.isArray(valueTarget)) {
          const index2 = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
          valueTarget = valueTarget[index2];
        }
        if (valueTarget !== null) {
          values[key] = valueTarget;
        }
      }
      for (const key in transitionEnd)
        values[key] = transitionEnd[key];
    });
  }
  return values;
}
const svgMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps,
    createRenderState: createSvgRenderState,
    onMount: (props, instance, { renderState, latestValues }) => {
      try {
        renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
      } catch (e2) {
        renderState.dimensions = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }
      buildSVGAttrs(renderState, latestValues, { enableHardwareAcceleration: false }, isSVGTag(instance.tagName), props.transformTemplate);
      renderSVG(instance, renderState);
    }
  })
};
const htmlMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
    createRenderState: createHtmlRenderState
  })
};
function createDomMotionConfig(Component, { forwardMotionProps = false }, preloadedFeatures2, createVisualElement) {
  const baseConfig = isSVGComponent(Component) ? svgMotionConfig : htmlMotionConfig;
  return {
    ...baseConfig,
    preloadedFeatures: preloadedFeatures2,
    useRender: createUseRender(forwardMotionProps),
    createVisualElement,
    Component
  };
}
function addDomEvent(target, eventName, handler, options = { passive: true }) {
  target.addEventListener(eventName, handler, options);
  return () => target.removeEventListener(eventName, handler);
}
const isPrimaryPointer = (event) => {
  if (event.pointerType === "mouse") {
    return typeof event.button !== "number" || event.button <= 0;
  } else {
    return event.isPrimary !== false;
  }
};
function extractEventInfo(event, pointType = "page") {
  return {
    point: {
      x: event[pointType + "X"],
      y: event[pointType + "Y"]
    }
  };
}
const addPointerInfo = (handler) => {
  return (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));
};
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, eventName, addPointerInfo(handler), options);
}
const combineFunctions = (a, b2) => (v2) => b2(a(v2));
const pipe = (...transformers) => transformers.reduce(combineFunctions);
function createLock(name) {
  let lock = null;
  return () => {
    const openLock = () => {
      lock = null;
    };
    if (lock === null) {
      lock = name;
      return openLock;
    }
    return false;
  };
}
const globalHorizontalLock = createLock("dragHorizontal");
const globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag2) {
  let lock = false;
  if (drag2 === "y") {
    lock = globalVerticalLock();
  } else if (drag2 === "x") {
    lock = globalHorizontalLock();
  } else {
    const openHorizontal = globalHorizontalLock();
    const openVertical = globalVerticalLock();
    if (openHorizontal && openVertical) {
      lock = () => {
        openHorizontal();
        openVertical();
      };
    } else {
      if (openHorizontal)
        openHorizontal();
      if (openVertical)
        openVertical();
    }
  }
  return lock;
}
function isDragActive() {
  const openGestureLock = getGlobalLock(true);
  if (!openGestureLock)
    return true;
  openGestureLock();
  return false;
}
class Feature {
  constructor(node2) {
    this.isMounted = false;
    this.node = node2;
  }
  update() {
  }
}
function addHoverEvent(node2, isActive) {
  const eventName = "pointer" + (isActive ? "enter" : "leave");
  const callbackName = "onHover" + (isActive ? "Start" : "End");
  const handleEvent = (event, info) => {
    if (event.type === "touch" || isDragActive())
      return;
    const props = node2.getProps();
    if (node2.animationState && props.whileHover) {
      node2.animationState.setActive("whileHover", isActive);
    }
    if (props[callbackName]) {
      props[callbackName](event, info);
    }
  };
  return addPointerEvent(node2.current, eventName, handleEvent, {
    passive: !node2.getProps()[callbackName]
  });
}
class HoverGesture extends Feature {
  mount() {
    this.unmount = pipe(addHoverEvent(this.node, true), addHoverEvent(this.node, false));
  }
  unmount() {
  }
}
class FocusGesture extends Feature {
  constructor() {
    super(...arguments);
    this.isActive = false;
  }
  onFocus() {
    let isFocusVisible = false;
    try {
      isFocusVisible = this.node.current.matches(":focus-visible");
    } catch (e2) {
      isFocusVisible = true;
    }
    if (!isFocusVisible || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", true);
    this.isActive = true;
  }
  onBlur() {
    if (!this.isActive || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", false);
    this.isActive = false;
  }
  mount() {
    this.unmount = pipe(addDomEvent(this.node.current, "focus", () => this.onFocus()), addDomEvent(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
const isNodeOrChild = (parent, child) => {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
};
const noop = (any) => any;
function fireSyntheticPointerEvent(name, handler) {
  if (!handler)
    return;
  const syntheticPointerEvent = new PointerEvent("pointer" + name);
  handler(syntheticPointerEvent, extractEventInfo(syntheticPointerEvent));
}
class PressGesture extends Feature {
  constructor() {
    super(...arguments);
    this.removeStartListeners = noop;
    this.removeEndListeners = noop;
    this.removeAccessibleListeners = noop;
    this.startPointerPress = (startEvent, startInfo) => {
      this.removeEndListeners();
      if (this.isPressing)
        return;
      const props = this.node.getProps();
      const endPointerPress = (endEvent, endInfo) => {
        if (!this.checkPressEnd())
          return;
        const { onTap, onTapCancel } = this.node.getProps();
        !isNodeOrChild(this.node.current, endEvent.target) ? onTapCancel && onTapCancel(endEvent, endInfo) : onTap && onTap(endEvent, endInfo);
      };
      const removePointerUpListener = addPointerEvent(window, "pointerup", endPointerPress, { passive: !(props.onTap || props["onPointerUp"]) });
      const removePointerCancelListener = addPointerEvent(window, "pointercancel", (cancelEvent, cancelInfo) => this.cancelPress(cancelEvent, cancelInfo), { passive: !(props.onTapCancel || props["onPointerCancel"]) });
      this.removeEndListeners = pipe(removePointerUpListener, removePointerCancelListener);
      this.startPress(startEvent, startInfo);
    };
    this.startAccessiblePress = () => {
      const handleKeydown = (keydownEvent) => {
        if (keydownEvent.key !== "Enter" || this.isPressing)
          return;
        const handleKeyup = (keyupEvent) => {
          if (keyupEvent.key !== "Enter" || !this.checkPressEnd())
            return;
          fireSyntheticPointerEvent("up", this.node.getProps().onTap);
        };
        this.removeEndListeners();
        this.removeEndListeners = addDomEvent(this.node.current, "keyup", handleKeyup);
        fireSyntheticPointerEvent("down", (event, info) => {
          this.startPress(event, info);
        });
      };
      const removeKeydownListener = addDomEvent(this.node.current, "keydown", handleKeydown);
      const handleBlur = () => {
        if (!this.isPressing)
          return;
        fireSyntheticPointerEvent("cancel", (cancelEvent, cancelInfo) => this.cancelPress(cancelEvent, cancelInfo));
      };
      const removeBlurListener = addDomEvent(this.node.current, "blur", handleBlur);
      this.removeAccessibleListeners = pipe(removeKeydownListener, removeBlurListener);
    };
  }
  startPress(event, info) {
    this.isPressing = true;
    const { onTapStart, whileTap } = this.node.getProps();
    if (whileTap && this.node.animationState) {
      this.node.animationState.setActive("whileTap", true);
    }
    onTapStart && onTapStart(event, info);
  }
  checkPressEnd() {
    this.removeEndListeners();
    this.isPressing = false;
    const props = this.node.getProps();
    if (props.whileTap && this.node.animationState) {
      this.node.animationState.setActive("whileTap", false);
    }
    return !isDragActive();
  }
  cancelPress(event, info) {
    if (!this.checkPressEnd())
      return;
    const { onTapCancel } = this.node.getProps();
    onTapCancel && onTapCancel(event, info);
  }
  mount() {
    const props = this.node.getProps();
    const removePointerListener = addPointerEvent(this.node.current, "pointerdown", this.startPointerPress, { passive: !(props.onTapStart || props["onPointerStart"]) });
    const removeFocusListener = addDomEvent(this.node.current, "focus", this.startAccessiblePress);
    this.removeStartListeners = pipe(removePointerListener, removeFocusListener);
  }
  unmount() {
    this.removeStartListeners();
    this.removeEndListeners();
    this.removeAccessibleListeners();
  }
}
const observerCallbacks = /* @__PURE__ */ new WeakMap();
const observers = /* @__PURE__ */ new WeakMap();
const fireObserverCallback = (entry) => {
  const callback = observerCallbacks.get(entry.target);
  callback && callback(entry);
};
const fireAllObserverCallbacks = (entries) => {
  entries.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root, ...options }) {
  const lookupRoot = root || document;
  if (!observers.has(lookupRoot)) {
    observers.set(lookupRoot, {});
  }
  const rootObservers = observers.get(lookupRoot);
  const key = JSON.stringify(options);
  if (!rootObservers[key]) {
    rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, { root, ...options });
  }
  return rootObservers[key];
}
function observeIntersection(element, options, callback) {
  const rootInteresectionObserver = initIntersectionObserver(options);
  observerCallbacks.set(element, callback);
  rootInteresectionObserver.observe(element);
  return () => {
    observerCallbacks.delete(element);
    rootInteresectionObserver.unobserve(element);
  };
}
const thresholdNames = {
  some: 0,
  all: 1
};
class InViewFeature extends Feature {
  constructor() {
    super(...arguments);
    this.hasEnteredView = false;
    this.isInView = false;
  }
  startObserver() {
    this.unmount();
    const { viewport: viewport2 = {} } = this.node.getProps();
    const { root, margin: rootMargin, amount = "some", once } = viewport2;
    const options = {
      root: root ? root.current : void 0,
      rootMargin,
      threshold: typeof amount === "number" ? amount : thresholdNames[amount]
    };
    const onIntersectionUpdate = (entry) => {
      const { isIntersecting } = entry;
      if (this.isInView === isIntersecting)
        return;
      this.isInView = isIntersecting;
      if (once && !isIntersecting && this.hasEnteredView) {
        return;
      } else if (isIntersecting) {
        this.hasEnteredView = true;
      }
      if (this.node.animationState) {
        this.node.animationState.setActive("whileInView", isIntersecting);
      }
      const { onViewportEnter, onViewportLeave } = this.node.getProps();
      const callback = isIntersecting ? onViewportEnter : onViewportLeave;
      callback && callback(entry);
    };
    return observeIntersection(this.node.current, options, onIntersectionUpdate);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver === "undefined")
      return;
    const { props, prevProps } = this.node;
    const hasOptionsChanged = ["amount", "margin", "root"].some(hasViewportOptionChanged(props, prevProps));
    if (hasOptionsChanged) {
      this.startObserver();
    }
  }
  unmount() {
  }
}
function hasViewportOptionChanged({ viewport: viewport2 = {} }, { viewport: prevViewport = {} } = {}) {
  return (name) => viewport2[name] !== prevViewport[name];
}
const gestureAnimations = {
  inView: {
    Feature: InViewFeature
  },
  tap: {
    Feature: PressGesture
  },
  focus: {
    Feature: FocusGesture
  },
  hover: {
    Feature: HoverGesture
  }
};
function shallowCompare(next2, prev2) {
  if (!Array.isArray(prev2))
    return false;
  const prevLength = prev2.length;
  if (prevLength !== next2.length)
    return false;
  for (let i = 0; i < prevLength; i++) {
    if (prev2[i] !== next2[i])
      return false;
  }
  return true;
}
const isNumericalString = (v2) => /^\-?\d*\.?\d+$/.test(v2);
const isZeroValueString = (v2) => /^0[^.\s]+$/.test(v2);
const frameData = {
  delta: 0,
  timestamp: 0
};
const defaultTimestep = 1 / 60 * 1e3;
const getCurrentTime = typeof performance !== "undefined" ? () => performance.now() : () => Date.now();
const onNextFrame = typeof window !== "undefined" ? (callback) => window.requestAnimationFrame(callback) : (callback) => setTimeout(() => callback(getCurrentTime()), defaultTimestep);
function createRenderStep(runNextFrame2) {
  let toRun = [];
  let toRunNextFrame = [];
  let numToRun = 0;
  let isProcessing2 = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  const step = {
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing2;
      const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (buffer.indexOf(callback) === -1) {
        buffer.push(callback);
        if (addToCurrentFrame && isProcessing2)
          numToRun = toRun.length;
      }
      return callback;
    },
    cancel: (callback) => {
      const index2 = toRunNextFrame.indexOf(callback);
      if (index2 !== -1)
        toRunNextFrame.splice(index2, 1);
      toKeepAlive.delete(callback);
    },
    process: (frameData2) => {
      if (isProcessing2) {
        flushNextFrame = true;
        return;
      }
      isProcessing2 = true;
      [toRun, toRunNextFrame] = [toRunNextFrame, toRun];
      toRunNextFrame.length = 0;
      numToRun = toRun.length;
      if (numToRun) {
        for (let i = 0; i < numToRun; i++) {
          const callback = toRun[i];
          callback(frameData2);
          if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame2();
          }
        }
      }
      isProcessing2 = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData2);
      }
    }
  };
  return step;
}
const maxElapsed = 40;
let useDefaultElapsed = true;
let runNextFrame = false;
let isProcessing = false;
const stepsOrder = [
  "read",
  "update",
  "preRender",
  "render",
  "postRender"
];
const steps = stepsOrder.reduce((acc, key) => {
  acc[key] = createRenderStep(() => runNextFrame = true);
  return acc;
}, {});
const sync = stepsOrder.reduce((acc, key) => {
  const step = steps[key];
  acc[key] = (process, keepAlive = false, immediate = false) => {
    if (!runNextFrame)
      startLoop();
    return step.schedule(process, keepAlive, immediate);
  };
  return acc;
}, {});
const cancelSync = stepsOrder.reduce((acc, key) => {
  acc[key] = steps[key].cancel;
  return acc;
}, {});
const flushSync = stepsOrder.reduce((acc, key) => {
  acc[key] = () => steps[key].process(frameData);
  return acc;
}, {});
const processStep = (stepId) => steps[stepId].process(frameData);
const processFrame = (timestamp) => {
  runNextFrame = false;
  frameData.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp - frameData.timestamp, maxElapsed), 1);
  frameData.timestamp = timestamp;
  isProcessing = true;
  stepsOrder.forEach(processStep);
  isProcessing = false;
  if (runNextFrame) {
    useDefaultElapsed = false;
    onNextFrame(processFrame);
  }
};
const startLoop = () => {
  runNextFrame = true;
  useDefaultElapsed = true;
  if (!isProcessing)
    onNextFrame(processFrame);
};
function addUniqueItem(arr, item) {
  if (arr.indexOf(item) === -1)
    arr.push(item);
}
function removeItem(arr, item) {
  const index2 = arr.indexOf(item);
  if (index2 > -1)
    arr.splice(index2, 1);
}
class SubscriptionManager {
  constructor() {
    this.subscriptions = [];
  }
  add(handler) {
    addUniqueItem(this.subscriptions, handler);
    return () => removeItem(this.subscriptions, handler);
  }
  notify(a, b2, c2) {
    const numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a, b2, c2);
    } else {
      for (let i = 0; i < numSubscriptions; i++) {
        const handler = this.subscriptions[i];
        handler && handler(a, b2, c2);
      }
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}
const isFloat = (value) => {
  return !isNaN(parseFloat(value));
};
class MotionValue {
  constructor(init2, options = {}) {
    this.version = "10.0.1";
    this.timeDelta = 0;
    this.lastUpdated = 0;
    this.canTrackVelocity = false;
    this.events = {};
    this.updateAndNotify = (v2, render = true) => {
      this.prev = this.current;
      this.current = v2;
      const { delta, timestamp } = frameData;
      if (this.lastUpdated !== timestamp) {
        this.timeDelta = delta;
        this.lastUpdated = timestamp;
        sync.postRender(this.scheduleVelocityCheck);
      }
      if (this.prev !== this.current && this.events.change) {
        this.events.change.notify(this.current);
      }
      if (this.events.velocityChange) {
        this.events.velocityChange.notify(this.getVelocity());
      }
      if (render && this.events.renderRequest) {
        this.events.renderRequest.notify(this.current);
      }
    };
    this.scheduleVelocityCheck = () => sync.postRender(this.velocityCheck);
    this.velocityCheck = ({ timestamp }) => {
      if (timestamp !== this.lastUpdated) {
        this.prev = this.current;
        if (this.events.velocityChange) {
          this.events.velocityChange.notify(this.getVelocity());
        }
      }
    };
    this.hasAnimated = false;
    this.prev = this.current = init2;
    this.canTrackVelocity = isFloat(this.current);
    this.owner = options.owner;
  }
  onChange(subscription) {
    return this.on("change", subscription);
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    const unsubscribe = this.events[eventName].add(callback);
    if (eventName === "change") {
      return () => {
        unsubscribe();
        sync.read(() => {
          if (!this.events.change.getSize()) {
            this.stop();
          }
        });
      };
    }
    return unsubscribe;
  }
  clearListeners() {
    for (const eventManagers in this.events) {
      this.events[eventManagers].clear();
    }
  }
  attach(passiveEffect, stopPassiveEffect) {
    this.passiveEffect = passiveEffect;
    this.stopPassiveEffect = stopPassiveEffect;
  }
  set(v2, render = true) {
    if (!render || !this.passiveEffect) {
      this.updateAndNotify(v2, render);
    } else {
      this.passiveEffect(v2, this.updateAndNotify);
    }
  }
  setWithVelocity(prev2, current, delta) {
    this.set(current);
    this.prev = prev2;
    this.timeDelta = delta;
  }
  jump(v2) {
    this.updateAndNotify(v2);
    this.prev = v2;
    this.stop();
    if (this.stopPassiveEffect)
      this.stopPassiveEffect();
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    return this.canTrackVelocity ? velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta) : 0;
  }
  start(startAnimation) {
    this.stop();
    return new Promise((resolve) => {
      this.hasAnimated = true;
      this.animation = startAnimation(resolve) || null;
      if (this.events.animationStart) {
        this.events.animationStart.notify();
      }
    }).then(() => {
      if (this.events.animationComplete) {
        this.events.animationComplete.notify();
      }
      this.clearAnimation();
    });
  }
  stop() {
    if (this.animation) {
      this.animation.stop();
      if (this.events.animationCancel) {
        this.events.animationCancel.notify();
      }
    }
    this.clearAnimation();
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    this.animation = null;
  }
  destroy() {
    this.clearListeners();
    this.stop();
    if (this.stopPassiveEffect) {
      this.stopPassiveEffect();
    }
  }
}
function motionValue(init2, options) {
  return new MotionValue(init2, options);
}
const isColorString = (type, testProp) => (v2) => {
  return Boolean(isString$1(v2) && singleColorRegex.test(v2) && v2.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v2, testProp));
};
const splitColor = (aName, bName, cName) => (v2) => {
  if (!isString$1(v2))
    return v2;
  const [a, b2, c2, alpha2] = v2.match(floatRegex);
  return {
    [aName]: parseFloat(a),
    [bName]: parseFloat(b2),
    [cName]: parseFloat(c2),
    alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
  };
};
const clampRgbUnit = (v2) => clamp(0, 255, v2);
const rgbUnit = {
  ...number,
  transform: (v2) => Math.round(clampRgbUnit(v2))
};
const rgba = {
  test: isColorString("rgb", "red"),
  parse: splitColor("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};
function parseHex(v2) {
  let r2 = "";
  let g2 = "";
  let b2 = "";
  let a = "";
  if (v2.length > 5) {
    r2 = v2.substring(1, 3);
    g2 = v2.substring(3, 5);
    b2 = v2.substring(5, 7);
    a = v2.substring(7, 9);
  } else {
    r2 = v2.substring(1, 2);
    g2 = v2.substring(2, 3);
    b2 = v2.substring(3, 4);
    a = v2.substring(4, 5);
    r2 += r2;
    g2 += g2;
    b2 += b2;
    a += a;
  }
  return {
    red: parseInt(r2, 16),
    green: parseInt(g2, 16),
    blue: parseInt(b2, 16),
    alpha: a ? parseInt(a, 16) / 255 : 1
  };
}
const hex = {
  test: isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};
const hsla = {
  test: isColorString("hsl", "hue"),
  parse: splitColor("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};
const color = {
  test: (v2) => rgba.test(v2) || hex.test(v2) || hsla.test(v2),
  parse: (v2) => {
    if (rgba.test(v2)) {
      return rgba.parse(v2);
    } else if (hsla.test(v2)) {
      return hsla.parse(v2);
    } else {
      return hex.parse(v2);
    }
  },
  transform: (v2) => {
    return isString$1(v2) ? v2 : v2.hasOwnProperty("red") ? rgba.transform(v2) : hsla.transform(v2);
  }
};
const colorToken = "${c}";
const numberToken = "${n}";
function test(v2) {
  var _a2, _b;
  return isNaN(v2) && isString$1(v2) && (((_a2 = v2.match(floatRegex)) === null || _a2 === void 0 ? void 0 : _a2.length) || 0) + (((_b = v2.match(colorRegex)) === null || _b === void 0 ? void 0 : _b.length) || 0) > 0;
}
function analyseComplexValue(v2) {
  if (typeof v2 === "number")
    v2 = `${v2}`;
  const values = [];
  let numColors = 0;
  let numNumbers = 0;
  const colors = v2.match(colorRegex);
  if (colors) {
    numColors = colors.length;
    v2 = v2.replace(colorRegex, colorToken);
    values.push(...colors.map(color.parse));
  }
  const numbers = v2.match(floatRegex);
  if (numbers) {
    numNumbers = numbers.length;
    v2 = v2.replace(floatRegex, numberToken);
    values.push(...numbers.map(number.parse));
  }
  return { values, numColors, numNumbers, tokenised: v2 };
}
function parse(v2) {
  return analyseComplexValue(v2).values;
}
function createTransformer(source) {
  const { values, numColors, tokenised } = analyseComplexValue(source);
  const numValues = values.length;
  return (v2) => {
    let output = tokenised;
    for (let i = 0; i < numValues; i++) {
      output = output.replace(i < numColors ? colorToken : numberToken, i < numColors ? color.transform(v2[i]) : sanitize(v2[i]));
    }
    return output;
  };
}
const convertNumbersToZero = (v2) => typeof v2 === "number" ? 0 : v2;
function getAnimatableNone$1(v2) {
  const parsed = parse(v2);
  const transformer = createTransformer(v2);
  return transformer(parsed.map(convertNumbersToZero));
}
const complex = { test, parse, createTransformer, getAnimatableNone: getAnimatableNone$1 };
const maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v2) {
  const [name, value] = v2.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v2;
  const [number2] = value.match(floatRegex) || [];
  if (!number2)
    return v2;
  const unit = value.replace(number2, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
const functionRegex = /([a-z-]*)\(.*?\)/g;
const filter = {
  ...complex,
  getAnimatableNone: (v2) => {
    const functions = v2.match(functionRegex);
    return functions ? functions.map(applyDefaultFilter).join(" ") : v2;
  }
};
const defaultValueTypes = {
  ...numberValueTypes,
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  filter,
  WebkitFilter: filter
};
const getDefaultValueType = (key) => defaultValueTypes[key];
function getAnimatableNone(key, value) {
  let defaultValueType = getDefaultValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}
const testValueType = (v2) => (type) => type.test(v2);
const auto$1 = {
  test: (v2) => v2 === "auto",
  parse: (v2) => v2
};
const dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto$1];
const findDimensionValueType = (v2) => dimensionValueTypes.find(testValueType(v2));
const valueTypes = [...dimensionValueTypes, color, complex];
const findValueType = (v2) => valueTypes.find(testValueType(v2));
function getCurrent(visualElement) {
  const current = {};
  visualElement.values.forEach((value, key) => current[key] = value.get());
  return current;
}
function getVelocity$1(visualElement) {
  const velocity = {};
  visualElement.values.forEach((value, key) => velocity[key] = value.getVelocity());
  return velocity;
}
function resolveVariant(visualElement, definition, custom) {
  const props = visualElement.getProps();
  return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, getCurrent(visualElement), getVelocity$1(visualElement));
}
function setMotionValue(visualElement, key, value) {
  if (visualElement.hasValue(key)) {
    visualElement.getValue(key).set(value);
  } else {
    visualElement.addValue(key, motionValue(value));
  }
}
function setTarget(visualElement, definition) {
  const resolved = resolveVariant(visualElement, definition);
  let { transitionEnd = {}, transition: transition2 = {}, ...target } = resolved ? visualElement.makeTargetAnimatable(resolved, false) : {};
  target = { ...target, ...transitionEnd };
  for (const key in target) {
    const value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement, key, value);
  }
}
function checkTargetForNewValues(visualElement, target, origin) {
  var _a2, _b;
  const newValueKeys = Object.keys(target).filter((key) => !visualElement.hasValue(key));
  const numNewValues = newValueKeys.length;
  if (!numNewValues)
    return;
  for (let i = 0; i < numNewValues; i++) {
    const key = newValueKeys[i];
    const targetValue = target[key];
    let value = null;
    if (Array.isArray(targetValue)) {
      value = targetValue[0];
    }
    if (value === null) {
      value = (_b = (_a2 = origin[key]) !== null && _a2 !== void 0 ? _a2 : visualElement.readValue(key)) !== null && _b !== void 0 ? _b : target[key];
    }
    if (value === void 0 || value === null)
      continue;
    if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
      value = parseFloat(value);
    } else if (!findValueType(value) && complex.test(targetValue)) {
      value = getAnimatableNone(key, targetValue);
    }
    visualElement.addValue(key, motionValue(value, { owner: visualElement }));
    if (origin[key] === void 0) {
      origin[key] = value;
    }
    if (value !== null)
      visualElement.setBaseTarget(key, value);
  }
}
function getOriginFromTransition(key, transition2) {
  if (!transition2)
    return;
  const valueTransition = transition2[key] || transition2["default"] || transition2;
  return valueTransition.from;
}
function getOrigin(target, transition2, visualElement) {
  const origin = {};
  for (const key in target) {
    const transitionOrigin = getOriginFromTransition(key, transition2);
    if (transitionOrigin !== void 0) {
      origin[key] = transitionOrigin;
    } else {
      const value = visualElement.getValue(key);
      if (value) {
        origin[key] = value.get();
      }
    }
  }
  return origin;
}
function isWillChangeMotionValue(value) {
  return Boolean(isMotionValue(value) && value.add);
}
const optimizedAppearDataId = "framerAppearId";
const optimizedAppearDataAttribute = "data-" + camelToDash(optimizedAppearDataId);
let warning = noop;
let invariant = noop;
const secondsToMilliseconds = (seconds) => seconds * 1e3;
const instantAnimationState = {
  current: false
};
const mirrorEasing = (easing) => (p2) => p2 <= 0.5 ? easing(2 * p2) / 2 : (2 - easing(2 * (1 - p2))) / 2;
const reverseEasing = (easing) => (p2) => 1 - easing(1 - p2);
const easeIn = (p2) => p2 * p2;
const easeOut = reverseEasing(easeIn);
const easeInOut = mirrorEasing(easeIn);
const mix = (from2, to, progress2) => -progress2 * from2 + progress2 * to + from2;
function hueToRgb(p2, q2, t2) {
  if (t2 < 0)
    t2 += 1;
  if (t2 > 1)
    t2 -= 1;
  if (t2 < 1 / 6)
    return p2 + (q2 - p2) * 6 * t2;
  if (t2 < 1 / 2)
    return q2;
  if (t2 < 2 / 3)
    return p2 + (q2 - p2) * (2 / 3 - t2) * 6;
  return p2;
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q2 = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p2 = 2 * lightness - q2;
    red = hueToRgb(p2, q2, hue + 1 / 3);
    green = hueToRgb(p2, q2, hue);
    blue = hueToRgb(p2, q2, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha2
  };
}
const mixLinearColor = (from2, to, v2) => {
  const fromExpo = from2 * from2;
  return Math.sqrt(Math.max(0, v2 * (to * to - fromExpo) + fromExpo));
};
const colorTypes = [hex, rgba, hsla];
const getColorType = (v2) => colorTypes.find((type) => type.test(v2));
function asRGBA(color2) {
  const type = getColorType(color2);
  let model = type.parse(color2);
  if (type === hsla) {
    model = hslaToRgba(model);
  }
  return model;
}
const mixColor = (from2, to) => {
  const fromRGBA = asRGBA(from2);
  const toRGBA = asRGBA(to);
  const blended = { ...fromRGBA };
  return (v2) => {
    blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v2);
    blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v2);
    blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v2);
    blended.alpha = mix(fromRGBA.alpha, toRGBA.alpha, v2);
    return rgba.transform(blended);
  };
};
function getMixer(origin, target) {
  if (typeof origin === "number") {
    return (v2) => mix(origin, target, v2);
  } else if (color.test(origin)) {
    return mixColor(origin, target);
  } else {
    return mixComplex(origin, target);
  }
}
const mixArray = (from2, to) => {
  const output = [...from2];
  const numValues = output.length;
  const blendValue = from2.map((fromThis, i) => getMixer(fromThis, to[i]));
  return (v2) => {
    for (let i = 0; i < numValues; i++) {
      output[i] = blendValue[i](v2);
    }
    return output;
  };
};
const mixObject = (origin, target) => {
  const output = { ...origin, ...target };
  const blendValue = {};
  for (const key in output) {
    if (origin[key] !== void 0 && target[key] !== void 0) {
      blendValue[key] = getMixer(origin[key], target[key]);
    }
  }
  return (v2) => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v2);
    }
    return output;
  };
};
const mixComplex = (origin, target) => {
  const template = complex.createTransformer(target);
  const originStats = analyseComplexValue(origin);
  const targetStats = analyseComplexValue(target);
  const canInterpolate = originStats.numColors === targetStats.numColors && originStats.numNumbers >= targetStats.numNumbers;
  if (canInterpolate) {
    return pipe(mixArray(originStats.values, targetStats.values), template);
  } else {
    warning(true);
    return (p2) => `${p2 > 0 ? target : origin}`;
  }
};
const progress = (from2, to, value) => {
  const toFromDifference = to - from2;
  return toFromDifference === 0 ? 1 : (value - from2) / toFromDifference;
};
const mixNumber = (from2, to) => (p2) => mix(from2, to, p2);
function detectMixerFactory(v2) {
  if (typeof v2 === "number") {
    return mixNumber;
  } else if (typeof v2 === "string") {
    if (color.test(v2)) {
      return mixColor;
    } else {
      return mixComplex;
    }
  } else if (Array.isArray(v2)) {
    return mixArray;
  } else if (typeof v2 === "object") {
    return mixObject;
  }
  return mixNumber;
}
function createMixers(output, ease2, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || detectMixerFactory(output[0]);
  const numMixers = output.length - 1;
  for (let i = 0; i < numMixers; i++) {
    let mixer = mixerFactory(output[i], output[i + 1]);
    if (ease2) {
      const easingFunction = Array.isArray(ease2) ? ease2[i] : ease2;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function interpolate(input, output, { clamp: isClamp = true, ease: ease2, mixer } = {}) {
  const inputLength = input.length;
  invariant(inputLength === output.length);
  invariant(!ease2 || !Array.isArray(ease2) || ease2.length === inputLength - 1);
  if (input[0] > input[inputLength - 1]) {
    input = [...input].reverse();
    output = [...output].reverse();
  }
  const mixers = createMixers(output, ease2, mixer);
  const numMixers = mixers.length;
  const interpolator = (v2) => {
    let i = 0;
    if (numMixers > 1) {
      for (; i < input.length - 2; i++) {
        if (v2 < input[i + 1])
          break;
      }
    }
    const progressInRange = progress(input[i], input[i + 1], v2);
    return mixers[i](progressInRange);
  };
  return isClamp ? (v2) => interpolator(clamp(input[0], input[inputLength - 1], v2)) : interpolator;
}
function fillOffset(offset2, remaining) {
  const min2 = offset2[offset2.length - 1];
  for (let i = 1; i <= remaining; i++) {
    const offsetProgress = progress(0, remaining, i);
    offset2.push(mix(min2, 1, offsetProgress));
  }
}
function defaultOffset(arr) {
  const offset2 = [0];
  fillOffset(offset2, arr.length - 1);
  return offset2;
}
function convertOffsetToTimes(offset2, duration) {
  return offset2.map((o) => o * duration);
}
const calcBezier = (t2, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t2 + (3 * a2 - 6 * a1)) * t2 + 3 * a1) * t2;
const subdivisionPrecision = 1e-7;
const subdivisionMaxIterations = 12;
function binarySubdivide(x2, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - x2;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noop;
  const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
  return (t2) => t2 === 0 || t2 === 1 ? t2 : calcBezier(getTForX(t2), mY1, mY2);
}
const circIn = (p2) => 1 - Math.sin(Math.acos(p2));
const circOut = reverseEasing(circIn);
const circInOut = mirrorEasing(circOut);
const backOut = cubicBezier(0.33, 1.53, 0.69, 0.99);
const backIn = reverseEasing(backOut);
const backInOut = mirrorEasing(backIn);
const anticipate = (p2) => (p2 *= 2) < 1 ? 0.5 * backIn(p2) : 0.5 * (2 - Math.pow(2, -10 * (p2 - 1)));
const easingLookup = {
  linear: noop,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate
};
const easingDefinitionToFunction = (definition) => {
  if (Array.isArray(definition)) {
    invariant(definition.length === 4);
    const [x1, y1, x2, y2] = definition;
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    return easingLookup[definition];
  }
  return definition;
};
const isEasingArray = (ease2) => {
  return Array.isArray(ease2) && typeof ease2[0] !== "number";
};
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function keyframes2({ keyframes: keyframeValues, ease: ease2 = easeInOut, times, duration = 300 }) {
  keyframeValues = [...keyframeValues];
  const easingFunctions = isEasingArray(ease2) ? ease2.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease2);
  const state2 = {
    done: false,
    value: keyframeValues[0]
  };
  const absoluteTimes = convertOffsetToTimes(
    times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues),
    duration
  );
  function createInterpolator() {
    return interpolate(absoluteTimes, keyframeValues, {
      ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions)
    });
  }
  let interpolator = createInterpolator();
  return {
    next: (t2) => {
      state2.value = interpolator(t2);
      state2.done = t2 >= duration;
      return state2;
    },
    flipTarget: () => {
      keyframeValues.reverse();
      interpolator = createInterpolator();
    }
  };
}
const safeMin = 1e-3;
const minDuration = 0.01;
const maxDuration = 10;
const minDamping = 0.05;
const maxDamping = 1;
function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1 }) {
  let envelope;
  let derivative;
  warning(duration <= maxDuration * 1e3);
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp(minDamping, maxDamping, dampingRatio);
  duration = clamp(minDuration, maxDuration, duration / 1e3);
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a = exponentialDecay - velocity;
      const b2 = calcAngularFreq(undampedFreq2, dampingRatio);
      const c2 = Math.exp(-delta);
      return safeMin - a / b2 * c2;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d2 = delta * velocity + velocity;
      const e2 = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f2 = Math.exp(-delta);
      const g2 = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d2 - e2) * f2) / g2;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b2 = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a * b2;
    };
    derivative = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b2 = (velocity - undampedFreq2) * (duration * duration);
      return a * b2;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = duration * 1e3;
  if (isNaN(undampedFreq)) {
    return {
      stiffness: 100,
      damping: 10,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
const rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
const durationKeys = ["duration", "bounce"];
const physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys2) {
  return keys2.some((key) => options[key] !== void 0);
}
function getSpringOptions(options) {
  let springOptions = {
    velocity: 0,
    stiffness: 100,
    damping: 10,
    mass: 1,
    isResolvedFromDuration: false,
    ...options
  };
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    const derived = findSpring(options);
    springOptions = {
      ...springOptions,
      ...derived,
      velocity: 0,
      mass: 1
    };
    springOptions.isResolvedFromDuration = true;
  }
  return springOptions;
}
const velocitySampleDuration = 5;
function spring({ keyframes: keyframes3, restDelta, restSpeed, ...options }) {
  let origin = keyframes3[0];
  let target = keyframes3[keyframes3.length - 1];
  const state2 = { done: false, value: origin };
  const { stiffness, damping, mass, velocity, duration, isResolvedFromDuration } = getSpringOptions(options);
  let resolveSpring = zero;
  let initialVelocity = velocity ? -(velocity / 1e3) : 0;
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  function createSpring() {
    const initialDelta = target - origin;
    const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
    const isGranularScale = Math.abs(initialDelta) < 5;
    restSpeed || (restSpeed = isGranularScale ? 0.01 : 2);
    restDelta || (restDelta = isGranularScale ? 5e-3 : 0.5);
    if (dampingRatio < 1) {
      const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
      resolveSpring = (t2) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
        return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t2) + initialDelta * Math.cos(angularFreq * t2));
      };
    } else if (dampingRatio === 1) {
      resolveSpring = (t2) => target - Math.exp(-undampedAngularFreq * t2) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t2);
    } else {
      const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
      resolveSpring = (t2) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
        const freqForT = Math.min(dampedAngularFreq * t2, 300);
        return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
      };
    }
  }
  createSpring();
  return {
    next: (t2) => {
      const current = resolveSpring(t2);
      if (!isResolvedFromDuration) {
        let currentVelocity = initialVelocity;
        if (t2 !== 0) {
          if (dampingRatio < 1) {
            const prevT = Math.max(0, t2 - velocitySampleDuration);
            currentVelocity = velocityPerSecond(current - resolveSpring(prevT), t2 - prevT);
          } else {
            currentVelocity = 0;
          }
        }
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(target - current) <= restDelta;
        state2.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state2.done = t2 >= duration;
      }
      state2.value = state2.done ? target : current;
      return state2;
    },
    flipTarget: () => {
      initialVelocity = -initialVelocity;
      [origin, target] = [target, origin];
      createSpring();
    }
  };
}
spring.needsInterpolation = (a, b2) => typeof a === "string" || typeof b2 === "string";
const zero = (_t) => 0;
function decay({
  keyframes: keyframes3 = [0],
  velocity = 0,
  power = 0.8,
  timeConstant = 350,
  restDelta = 0.5,
  modifyTarget
}) {
  const origin = keyframes3[0];
  const state2 = { done: false, value: origin };
  let amplitude = power * velocity;
  const ideal = origin + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - origin;
  return {
    next: (t2) => {
      const delta = -amplitude * Math.exp(-t2 / timeConstant);
      state2.done = !(delta > restDelta || delta < -restDelta);
      state2.value = state2.done ? target : target + delta;
      return state2;
    },
    flipTarget: () => {
    }
  };
}
const types = {
  decay,
  keyframes: keyframes2,
  tween: keyframes2,
  spring
};
function loopElapsed(elapsed, duration, delay2 = 0) {
  return elapsed - duration - delay2;
}
function reverseElapsed(elapsed, duration = 0, delay2 = 0, isForwardPlayback = true) {
  return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay2) : duration - (elapsed - duration) + delay2;
}
function hasRepeatDelayElapsed(elapsed, duration, delay2, isForwardPlayback) {
  return isForwardPlayback ? elapsed >= duration + delay2 : elapsed <= -delay2;
}
const framesync = (update2) => {
  const passTimestamp = ({ delta }) => update2(delta);
  return {
    start: () => sync.update(passTimestamp, true),
    stop: () => cancelSync.update(passTimestamp)
  };
};
function animateValue({ duration, driver = framesync, elapsed = 0, repeat: repeatMax = 0, repeatType = "loop", repeatDelay = 0, keyframes: keyframes$12, autoplay = true, onPlay, onStop, onComplete, onRepeat, onUpdate, type = "keyframes", ...options }) {
  const initialElapsed = elapsed;
  let driverControls;
  let repeatCount = 0;
  let computedDuration = duration;
  let isComplete = false;
  let isForwardPlayback = true;
  let interpolateFromNumber;
  const animator = types[keyframes$12.length > 2 ? "keyframes" : type] || keyframes2;
  const origin = keyframes$12[0];
  const target = keyframes$12[keyframes$12.length - 1];
  let state2 = { done: false, value: origin };
  const { needsInterpolation } = animator;
  if (needsInterpolation && needsInterpolation(origin, target)) {
    interpolateFromNumber = interpolate([0, 100], [origin, target], {
      clamp: false
    });
    keyframes$12 = [0, 100];
  }
  const animation = animator({
    ...options,
    duration,
    keyframes: keyframes$12
  });
  function repeat() {
    repeatCount++;
    if (repeatType === "reverse") {
      isForwardPlayback = repeatCount % 2 === 0;
      elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
    } else {
      elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
      if (repeatType === "mirror")
        animation.flipTarget();
    }
    isComplete = false;
    onRepeat && onRepeat();
  }
  function complete() {
    driverControls && driverControls.stop();
    onComplete && onComplete();
  }
  function update2(delta) {
    if (!isForwardPlayback)
      delta = -delta;
    elapsed += delta;
    if (!isComplete) {
      state2 = animation.next(Math.max(0, elapsed));
      if (interpolateFromNumber)
        state2.value = interpolateFromNumber(state2.value);
      isComplete = isForwardPlayback ? state2.done : elapsed <= 0;
    }
    onUpdate && onUpdate(state2.value);
    if (isComplete) {
      if (repeatCount === 0) {
        computedDuration = computedDuration !== void 0 ? computedDuration : elapsed;
      }
      if (repeatCount < repeatMax) {
        hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
      } else {
        complete();
      }
    }
  }
  function play() {
    onPlay && onPlay();
    driverControls = driver(update2);
    driverControls.start();
  }
  autoplay && play();
  return {
    stop: () => {
      onStop && onStop();
      driverControls && driverControls.stop();
    },
    set currentTime(t2) {
      elapsed = initialElapsed;
      update2(t2);
    },
    sample: (t2, isControlled = false) => {
      elapsed = initialElapsed;
      if (isControlled) {
        update2(t2);
        return state2;
      }
      const sampleResolution = duration && typeof duration === "number" ? Math.max(duration * 0.5, 50) : 50;
      let sampleElapsed = 0;
      update2(0);
      while (sampleElapsed <= t2) {
        const remaining = t2 - sampleElapsed;
        update2(Math.min(remaining, sampleResolution));
        sampleElapsed += sampleResolution;
      }
      return state2;
    }
  };
}
function isWaapiSupportedEasing(easing) {
  return !easing || Array.isArray(easing) || typeof easing === "string" && supportedWaapiEasing[easing];
}
const cubicBezierAsString = ([a, b2, c2, d2]) => `cubic-bezier(${a}, ${b2}, ${c2}, ${d2})`;
const supportedWaapiEasing = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: cubicBezierAsString([0, 0.65, 0.55, 1]),
  circOut: cubicBezierAsString([0.55, 0, 1, 0.45]),
  backIn: cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
  backOut: cubicBezierAsString([0.33, 1.53, 0.69, 0.99])
};
function mapEasingToNativeEasing(easing) {
  if (!easing)
    return void 0;
  return Array.isArray(easing) ? cubicBezierAsString(easing) : supportedWaapiEasing[easing];
}
function animateStyle(element, valueName, keyframes3, { delay: delay2 = 0, duration, repeat = 0, repeatType = "loop", ease: ease2, times } = {}) {
  return element.animate({ [valueName]: keyframes3, offset: times }, {
    delay: delay2,
    duration,
    easing: mapEasingToNativeEasing(ease2),
    fill: "both",
    iterations: repeat + 1,
    direction: repeatType === "reverse" ? "alternate" : "normal"
  });
}
const featureTests = {
  waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate")
};
const results = {};
const supports = {};
for (const key in featureTests) {
  supports[key] = () => {
    if (results[key] === void 0)
      results[key] = featureTests[key]();
    return results[key];
  };
}
function getFinalKeyframe(keyframes3, { repeat, repeatType = "loop" }) {
  const index2 = repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : keyframes3.length - 1;
  return keyframes3[index2];
}
const acceleratedValues = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform",
  "backgroundColor"
]);
const sampleDelta = 10;
const requiresPregeneratedKeyframes = (valueName, options) => options.type === "spring" || valueName === "backgroundColor" || !isWaapiSupportedEasing(options.ease);
function createAcceleratedAnimation(value, valueName, { onUpdate, onComplete, ...options }) {
  const canAccelerateAnimation = supports.waapi() && acceleratedValues.has(valueName) && !options.repeatDelay && options.repeatType !== "mirror" && options.damping !== 0;
  if (!canAccelerateAnimation)
    return false;
  let { keyframes: keyframes3, duration = 300, elapsed = 0, ease: ease2 } = options;
  if (requiresPregeneratedKeyframes(valueName, options)) {
    const sampleAnimation = animateValue({
      ...options,
      repeat: 0,
      elapsed: 0
    });
    let state2 = { done: false, value: keyframes3[0] };
    const pregeneratedKeyframes = [];
    let t2 = 0;
    while (!state2.done && t2 < 2e4) {
      state2 = sampleAnimation.sample(t2, true);
      pregeneratedKeyframes.push(state2.value);
      t2 += sampleDelta;
    }
    keyframes3 = pregeneratedKeyframes;
    duration = t2 - sampleDelta;
    ease2 = "linear";
  }
  const animation = animateStyle(value.owner.current, valueName, keyframes3, {
    ...options,
    delay: -elapsed,
    duration,
    ease: ease2
  });
  animation.onfinish = () => {
    value.set(getFinalKeyframe(keyframes3, options));
    sync.update(() => animation.cancel());
    onComplete && onComplete();
  };
  return {
    get currentTime() {
      return animation.currentTime || 0;
    },
    set currentTime(t2) {
      animation.currentTime = t2;
    },
    stop: () => {
      const { currentTime } = animation;
      if (currentTime) {
        const sampleAnimation = animateValue({
          ...options,
          autoplay: false
        });
        value.setWithVelocity(sampleAnimation.sample(currentTime - sampleDelta).value, sampleAnimation.sample(currentTime).value, sampleDelta);
      }
      sync.update(() => animation.cancel());
    }
  };
}
function delay(callback, timeout) {
  const start2 = performance.now();
  const checkElapsed = ({ timestamp }) => {
    const elapsed = timestamp - start2;
    if (elapsed >= timeout) {
      cancelSync.read(checkElapsed);
      callback(elapsed - timeout);
    }
  };
  sync.read(checkElapsed, true);
  return () => cancelSync.read(checkElapsed);
}
function createInstantAnimation({ keyframes: keyframes3, elapsed, onUpdate, onComplete }) {
  const setValue = () => {
    onUpdate && onUpdate(keyframes3[keyframes3.length - 1]);
    onComplete && onComplete();
  };
  return elapsed ? { stop: delay(setValue, -elapsed) } : setValue();
}
function inertia({ keyframes: keyframes3, velocity = 0, min: min2, max: max2, power = 0.8, timeConstant = 750, bounceStiffness = 500, bounceDamping = 10, restDelta = 1, modifyTarget, driver, onUpdate, onComplete, onStop }) {
  const origin = keyframes3[0];
  let currentAnimation;
  function isOutOfBounds(v2) {
    return min2 !== void 0 && v2 < min2 || max2 !== void 0 && v2 > max2;
  }
  function findNearestBoundary(v2) {
    if (min2 === void 0)
      return max2;
    if (max2 === void 0)
      return min2;
    return Math.abs(min2 - v2) < Math.abs(max2 - v2) ? min2 : max2;
  }
  function startAnimation(options) {
    currentAnimation && currentAnimation.stop();
    currentAnimation = animateValue({
      keyframes: [0, 1],
      velocity: 0,
      ...options,
      driver,
      onUpdate: (v2) => {
        onUpdate && onUpdate(v2);
        options.onUpdate && options.onUpdate(v2);
      },
      onComplete,
      onStop
    });
  }
  function startSpring(options) {
    startAnimation({
      type: "spring",
      stiffness: bounceStiffness,
      damping: bounceDamping,
      restDelta,
      ...options
    });
  }
  if (isOutOfBounds(origin)) {
    startSpring({
      velocity,
      keyframes: [origin, findNearestBoundary(origin)]
    });
  } else {
    let target = power * velocity + origin;
    if (typeof modifyTarget !== "undefined")
      target = modifyTarget(target);
    const boundary = findNearestBoundary(target);
    const heading = boundary === min2 ? -1 : 1;
    let prev2;
    let current;
    const checkBoundary = (v2) => {
      prev2 = current;
      current = v2;
      velocity = velocityPerSecond(v2 - prev2, frameData.delta);
      if (heading === 1 && v2 > boundary || heading === -1 && v2 < boundary) {
        startSpring({ keyframes: [v2, boundary], velocity });
      }
    };
    startAnimation({
      type: "decay",
      keyframes: [origin, 0],
      velocity,
      timeConstant,
      power,
      restDelta,
      modifyTarget,
      onUpdate: isOutOfBounds(target) ? checkBoundary : void 0
    });
  }
  return {
    stop: () => currentAnimation && currentAnimation.stop()
  };
}
const underDampedSpring = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
};
const criticallyDampedSpring = (target) => ({
  type: "spring",
  stiffness: 550,
  damping: target === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
});
const keyframesTransition = {
  type: "keyframes",
  duration: 0.8
};
const ease = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
};
const getDefaultTransition = (valueKey, { keyframes: keyframes3 }) => {
  if (keyframes3.length > 2) {
    return keyframesTransition;
  } else if (transformProps.has(valueKey)) {
    return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes3[1]) : underDampedSpring;
  }
  return ease;
};
const isAnimatable = (key, value) => {
  if (key === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && complex.test(value) && !value.startsWith("url(")) {
    return true;
  }
  return false;
};
function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from: from2, elapsed, ...transition2 }) {
  return !!Object.keys(transition2).length;
}
function isZero(value) {
  return value === 0 || typeof value === "string" && parseFloat(value) === 0 && value.indexOf(" ") === -1;
}
function getZeroUnit(potentialUnitType) {
  return typeof potentialUnitType === "number" ? 0 : getAnimatableNone("", potentialUnitType);
}
function getValueTransition(transition2, key) {
  return transition2[key] || transition2["default"] || transition2;
}
function getKeyframes(value, valueName, target, transition2) {
  const isTargetAnimatable = isAnimatable(valueName, target);
  let origin = transition2.from !== void 0 ? transition2.from : value.get();
  if (origin === "none" && isTargetAnimatable && typeof target === "string") {
    origin = getAnimatableNone(valueName, target);
  } else if (isZero(origin) && typeof target === "string") {
    origin = getZeroUnit(target);
  } else if (!Array.isArray(target) && isZero(target) && typeof origin === "string") {
    target = getZeroUnit(origin);
  }
  if (Array.isArray(target)) {
    if (target[0] === null) {
      target[0] = origin;
    }
    return target;
  } else {
    return [origin, target];
  }
}
const createMotionValueAnimation = (valueName, value, target, transition2 = {}) => {
  return (onComplete) => {
    const valueTransition = getValueTransition(transition2, valueName) || {};
    const delay2 = valueTransition.delay || transition2.delay || 0;
    let { elapsed = 0 } = transition2;
    elapsed = elapsed - secondsToMilliseconds(delay2);
    const keyframes3 = getKeyframes(value, valueName, target, valueTransition);
    const originKeyframe = keyframes3[0];
    const targetKeyframe = keyframes3[keyframes3.length - 1];
    const isOriginAnimatable = isAnimatable(valueName, originKeyframe);
    const isTargetAnimatable = isAnimatable(valueName, targetKeyframe);
    warning(isOriginAnimatable === isTargetAnimatable);
    let options = {
      keyframes: keyframes3,
      velocity: value.getVelocity(),
      ...valueTransition,
      elapsed,
      onUpdate: (v2) => {
        value.set(v2);
        valueTransition.onUpdate && valueTransition.onUpdate(v2);
      },
      onComplete: () => {
        onComplete();
        valueTransition.onComplete && valueTransition.onComplete();
      }
    };
    if (!isOriginAnimatable || !isTargetAnimatable || instantAnimationState.current || valueTransition.type === false) {
      return createInstantAnimation(options);
    } else if (valueTransition.type === "inertia") {
      return inertia(options);
    }
    if (!isTransitionDefined(valueTransition)) {
      options = {
        ...options,
        ...getDefaultTransition(valueName, options)
      };
    }
    if (options.duration) {
      options.duration = secondsToMilliseconds(options.duration);
    }
    if (options.repeatDelay) {
      options.repeatDelay = secondsToMilliseconds(options.repeatDelay);
    }
    if (value.owner && value.owner.current instanceof HTMLElement && !value.owner.getProps().onUpdate) {
      const acceleratedAnimation = createAcceleratedAnimation(value, valueName, options);
      if (acceleratedAnimation)
        return acceleratedAnimation;
    }
    return animateValue(options);
  };
};
function animateVisualElement(visualElement, definition, options = {}) {
  visualElement.notify("AnimationStart", definition);
  let animation;
  if (Array.isArray(definition)) {
    const animations2 = definition.map((variant) => animateVariant(visualElement, variant, options));
    animation = Promise.all(animations2);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement, definition, options);
  } else {
    const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement, definition, options.custom) : definition;
    animation = animateTarget(visualElement, resolvedDefinition, options);
  }
  return animation.then(() => visualElement.notify("AnimationComplete", definition));
}
function animateVariant(visualElement, variant, options = {}) {
  const resolved = resolveVariant(visualElement, variant, options.custom);
  let { transition: transition2 = visualElement.getDefaultTransition() || {} } = resolved || {};
  if (options.transitionOverride) {
    transition2 = options.transitionOverride;
  }
  const getAnimation = resolved ? () => animateTarget(visualElement, resolved, options) : () => Promise.resolve();
  const getChildAnimations = visualElement.variantChildren && visualElement.variantChildren.size ? (forwardDelay = 0) => {
    const { delayChildren = 0, staggerChildren, staggerDirection } = transition2;
    return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
  } : () => Promise.resolve();
  const { when } = transition2;
  if (when) {
    const [first, last] = when === "beforeChildren" ? [getAnimation, getChildAnimations] : [getChildAnimations, getAnimation];
    return first().then(last);
  } else {
    return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
  }
}
function animateTarget(visualElement, definition, { delay: delay2 = 0, transitionOverride, type } = {}) {
  let { transition: transition2 = visualElement.getDefaultTransition(), transitionEnd, ...target } = visualElement.makeTargetAnimatable(definition);
  const willChange = visualElement.getValue("willChange");
  if (transitionOverride)
    transition2 = transitionOverride;
  const animations2 = [];
  const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
  for (const key in target) {
    const value = visualElement.getValue(key);
    const valueTarget = target[key];
    if (!value || valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    const valueTransition = { delay: delay2, elapsed: 0, ...transition2 };
    if (window.HandoffAppearAnimations && !value.hasAnimated) {
      const appearId = visualElement.getProps()[optimizedAppearDataAttribute];
      if (appearId) {
        valueTransition.elapsed = window.HandoffAppearAnimations(appearId, key, value, sync);
      }
    }
    let animation = value.start(createMotionValueAnimation(key, value, valueTarget, visualElement.shouldReduceMotion && transformProps.has(key) ? { type: false } : valueTransition));
    if (isWillChangeMotionValue(willChange)) {
      willChange.add(key);
      animation = animation.then(() => willChange.remove(key));
    }
    animations2.push(animation);
  }
  return Promise.all(animations2).then(() => {
    transitionEnd && setTarget(visualElement, transitionEnd);
  });
}
function animateChildren(visualElement, variant, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
  const animations2 = [];
  const maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
  const generateStaggerDuration = staggerDirection === 1 ? (i = 0) => i * staggerChildren : (i = 0) => maxStaggerDuration - i * staggerChildren;
  Array.from(visualElement.variantChildren).sort(sortByTreeOrder).forEach((child, i) => {
    child.notify("AnimationStart", variant);
    animations2.push(animateVariant(child, variant, {
      ...options,
      delay: delayChildren + generateStaggerDuration(i)
    }).then(() => child.notify("AnimationComplete", variant)));
  });
  return Promise.all(animations2);
}
function sortByTreeOrder(a, b2) {
  return a.sortNodePosition(b2);
}
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
  const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}
const reversePriorityOrder = [...variantPriorityOrder].reverse();
const numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement) {
  return (animations2) => Promise.all(animations2.map(({ animation, options }) => animateVisualElement(visualElement, animation, options)));
}
function createAnimationState(visualElement) {
  let animate2 = animateList(visualElement);
  const state2 = createState();
  let isInitialRender = true;
  const buildResolvedTypeValues = (acc, definition) => {
    const resolved = resolveVariant(visualElement, definition);
    if (resolved) {
      const { transition: transition2, transitionEnd, ...target } = resolved;
      acc = { ...acc, ...target, ...transitionEnd };
    }
    return acc;
  };
  function setAnimateFunction(makeAnimator) {
    animate2 = makeAnimator(visualElement);
  }
  function animateChanges(options, changedActiveType) {
    const props = visualElement.getProps();
    const context = visualElement.getVariantContext(true) || {};
    const animations2 = [];
    const removedKeys = /* @__PURE__ */ new Set();
    let encounteredKeys = {};
    let removedVariantIndex = Infinity;
    for (let i = 0; i < numAnimationTypes; i++) {
      const type = reversePriorityOrder[i];
      const typeState = state2[type];
      const prop = props[type] !== void 0 ? props[type] : context[type];
      const propIsVariant = isVariantLabel(prop);
      const activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i;
      let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = { ...encounteredKeys };
      if (!typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || isAnimationControls(prop) || typeof prop === "boolean") {
        continue;
      }
      const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
      let shouldAnimateType = variantDidChange || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i > removedVariantIndex && propIsVariant;
      const definitionList = Array.isArray(prop) ? prop : [prop];
      let resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
      if (activeDelta === false)
        resolvedValues = {};
      const { prevResolvedValues = {} } = typeState;
      const allKeys = {
        ...prevResolvedValues,
        ...resolvedValues
      };
      const markToAnimate = (key) => {
        shouldAnimateType = true;
        removedKeys.delete(key);
        typeState.needsAnimating[key] = true;
      };
      for (const key in allKeys) {
        const next2 = resolvedValues[key];
        const prev2 = prevResolvedValues[key];
        if (encounteredKeys.hasOwnProperty(key))
          continue;
        if (next2 !== prev2) {
          if (isKeyframesTarget(next2) && isKeyframesTarget(prev2)) {
            if (!shallowCompare(next2, prev2) || variantDidChange) {
              markToAnimate(key);
            } else {
              typeState.protectedKeys[key] = true;
            }
          } else if (next2 !== void 0) {
            markToAnimate(key);
          } else {
            removedKeys.add(key);
          }
        } else if (next2 !== void 0 && removedKeys.has(key)) {
          markToAnimate(key);
        } else {
          typeState.protectedKeys[key] = true;
        }
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) {
        encounteredKeys = { ...encounteredKeys, ...resolvedValues };
      }
      if (isInitialRender && visualElement.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      if (shouldAnimateType && !isInherited) {
        animations2.push(...definitionList.map((animation) => ({
          animation,
          options: { type, ...options }
        })));
      }
    }
    if (removedKeys.size) {
      const fallbackAnimation = {};
      removedKeys.forEach((key) => {
        const fallbackTarget = visualElement.getBaseTarget(key);
        if (fallbackTarget !== void 0) {
          fallbackAnimation[key] = fallbackTarget;
        }
      });
      animations2.push({ animation: fallbackAnimation });
    }
    let shouldAnimate = Boolean(animations2.length);
    if (isInitialRender && props.initial === false && !visualElement.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    return shouldAnimate ? animate2(animations2) : Promise.resolve();
  }
  function setActive(type, isActive, options) {
    var _a2;
    if (state2[type].isActive === isActive)
      return Promise.resolve();
    (_a2 = visualElement.variantChildren) === null || _a2 === void 0 ? void 0 : _a2.forEach((child) => {
      var _a3;
      return (_a3 = child.animationState) === null || _a3 === void 0 ? void 0 : _a3.setActive(type, isActive);
    });
    state2[type].isActive = isActive;
    const animations2 = animateChanges(options, type);
    for (const key in state2) {
      state2[key].protectedKeys = {};
    }
    return animations2;
  }
  return {
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: () => state2
  };
}
function checkVariantsDidChange(prev2, next2) {
  if (typeof next2 === "string") {
    return next2 !== prev2;
  } else if (Array.isArray(next2)) {
    return !shallowCompare(next2, prev2);
  }
  return false;
}
function createTypeState(isActive = false) {
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function createState() {
  return {
    animate: createTypeState(true),
    whileInView: createTypeState(),
    whileHover: createTypeState(),
    whileTap: createTypeState(),
    whileDrag: createTypeState(),
    whileFocus: createTypeState(),
    exit: createTypeState()
  };
}
class AnimationFeature extends Feature {
  constructor(node2) {
    super(node2);
    node2.animationState || (node2.animationState = createAnimationState(node2));
  }
  updateAnimationControlsSubscription() {
    const { animate: animate2 } = this.node.getProps();
    this.unmount();
    if (isAnimationControls(animate2)) {
      this.unmount = animate2.subscribe(this.node);
    }
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: animate2 } = this.node.getProps();
    const { animate: prevAnimate } = this.node.prevProps || {};
    if (animate2 !== prevAnimate) {
      this.updateAnimationControlsSubscription();
    }
  }
  unmount() {
  }
}
let id$1 = 0;
class ExitAnimationFeature extends Feature {
  constructor() {
    super(...arguments);
    this.id = id$1++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent, onExitComplete, custom } = this.node.presenceContext;
    const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || isPresent === prevIsPresent) {
      return;
    }
    const exitAnimation = this.node.animationState.setActive("exit", !isPresent, { custom: custom !== null && custom !== void 0 ? custom : this.node.getProps().custom });
    if (onExitComplete && !isPresent) {
      exitAnimation.then(() => onExitComplete(this.id));
    }
  }
  mount() {
    const { register } = this.node.presenceContext || {};
    if (register) {
      this.unmount = register(this.id);
    }
  }
  unmount() {
  }
}
const animations = {
  animation: {
    Feature: AnimationFeature
  },
  exit: {
    Feature: ExitAnimationFeature
  }
};
const distance = (a, b2) => Math.abs(a - b2);
function distance2D(a, b2) {
  const xDelta = distance(a.x, b2.x);
  const yDelta = distance(a.y, b2.y);
  return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}
class PanSession {
  constructor(event, handlers, { transformPagePoint } = {}) {
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.handlers = {};
    this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const info2 = getPanInfo(this.lastMoveEventInfo, this.history);
      const isPanStarted = this.startEvent !== null;
      const isDistancePastThreshold = distance2D(info2.offset, { x: 0, y: 0 }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      const { point: point2 } = info2;
      const { timestamp: timestamp2 } = frameData;
      this.history.push({ ...point2, timestamp: timestamp2 });
      const { onStart, onMove } = this.handlers;
      if (!isPanStarted) {
        onStart && onStart(this.lastMoveEvent, info2);
        this.startEvent = this.lastMoveEvent;
      }
      onMove && onMove(this.lastMoveEvent, info2);
    };
    this.handlePointerMove = (event2, info2) => {
      this.lastMoveEvent = event2;
      this.lastMoveEventInfo = transformPoint(info2, this.transformPagePoint);
      sync.update(this.updatePoint, true);
    };
    this.handlePointerUp = (event2, info2) => {
      this.end();
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const { onEnd, onSessionEnd } = this.handlers;
      const panInfo = getPanInfo(event2.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info2, this.transformPagePoint), this.history);
      if (this.startEvent && onEnd) {
        onEnd(event2, panInfo);
      }
      onSessionEnd && onSessionEnd(event2, panInfo);
    };
    if (!isPrimaryPointer(event))
      return;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    const info = extractEventInfo(event);
    const initialInfo = transformPoint(info, this.transformPagePoint);
    const { point } = initialInfo;
    const { timestamp } = frameData;
    this.history = [{ ...point, timestamp }];
    const { onSessionStart } = handlers;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(handlers) {
    this.handlers = handlers;
  }
  end() {
    this.removeListeners && this.removeListeners();
    cancelSync.update(this.updatePoint);
  }
}
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b2) {
  return { x: a.x - b2.x, y: a.y - b2.y };
}
function getPanInfo({ point }, history) {
  return {
    point,
    delta: subtractPoint(point, lastDevicePoint(history)),
    offset: subtractPoint(point, startDevicePoint(history)),
    velocity: getVelocity(history, 0.1)
  };
}
function startDevicePoint(history) {
  return history[0];
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  let i = history.length - 1;
  let timestampedPoint = null;
  const lastPoint = lastDevicePoint(history);
  while (i >= 0) {
    timestampedPoint = history[i];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }
    i--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  const time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1e3;
  if (time === 0) {
    return { x: 0, y: 0 };
  }
  const currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time,
    y: (lastPoint.y - timestampedPoint.y) / time
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}
function calcLength(axis) {
  return axis.max - axis.min;
}
function isNear(value, target = 0, maxDistance = 0.01) {
  return Math.abs(value - target) <= maxDistance;
}
function calcAxisDelta(delta, source, target, origin = 0.5) {
  delta.origin = origin;
  delta.originPoint = mix(source.min, source.max, delta.origin);
  delta.scale = calcLength(target) / calcLength(source);
  if (isNear(delta.scale, 1, 1e-4) || isNaN(delta.scale))
    delta.scale = 1;
  delta.translate = mix(target.min, target.max, delta.origin) - delta.originPoint;
  if (isNear(delta.translate) || isNaN(delta.translate))
    delta.translate = 0;
}
function calcBoxDelta(delta, source, target, origin) {
  calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : void 0);
  calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : void 0);
}
function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent) {
  calcRelativeAxis(target.x, relative.x, parent.x);
  calcRelativeAxis(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition(target, layout2, parent) {
  target.min = layout2.min - parent.min;
  target.max = target.min + calcLength(layout2);
}
function calcRelativePosition(target, layout2, parent) {
  calcRelativeAxisPosition(target.x, layout2.x, parent.x);
  calcRelativeAxisPosition(target.y, layout2.y, parent.y);
}
function applyConstraints(point, { min: min2, max: max2 }, elastic) {
  if (min2 !== void 0 && point < min2) {
    point = elastic ? mix(min2, point, elastic.min) : Math.max(point, min2);
  } else if (max2 !== void 0 && point > max2) {
    point = elastic ? mix(max2, point, elastic.max) : Math.min(point, max2);
  }
  return point;
}
function calcRelativeAxisConstraints(axis, min2, max2) {
  return {
    min: min2 !== void 0 ? axis.min + min2 : void 0,
    max: max2 !== void 0 ? axis.max + max2 - (axis.max - axis.min) : void 0
  };
}
function calcRelativeConstraints(layoutBox, { top: top2, left: left2, bottom: bottom2, right: right2 }) {
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left2, right2),
    y: calcRelativeAxisConstraints(layoutBox.y, top2, bottom2)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  let min2 = constraintsAxis.min - layoutAxis.min;
  let max2 = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    [min2, max2] = [max2, min2];
  }
  return { min: min2, max: max2 };
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcOrigin(source, target) {
  let origin = 0.5;
  const sourceLength = calcLength(source);
  const targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clamp(0, 1, origin);
}
function rebaseAxisConstraints(layout2, constraints) {
  const relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout2.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout2.min;
  }
  return relativeConstraints;
}
const defaultElastic = 0.35;
function resolveDragElastic(dragElastic = defaultElastic) {
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
function resolvePointElastic(dragElastic, label) {
  return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
}
const createAxisDelta = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
});
const createDelta = () => ({
  x: createAxisDelta(),
  y: createAxisDelta()
});
const createAxis = () => ({ min: 0, max: 0 });
const createBox = () => ({
  x: createAxis(),
  y: createAxis()
});
function eachAxis(callback) {
  return [callback("x"), callback("y")];
}
function convertBoundingBoxToBox({ top: top2, left: left2, right: right2, bottom: bottom2 }) {
  return {
    x: { min: left2, max: right2 },
    y: { min: top2, max: bottom2 }
  };
}
function convertBoxToBoundingBox({ x: x2, y: y2 }) {
  return { top: y2.min, right: x2.max, bottom: y2.max, left: x2.min };
}
function transformBoxPoints(point, transformPoint2) {
  if (!transformPoint2)
    return point;
  const topLeft = transformPoint2({ x: point.left, y: point.top });
  const bottomRight = transformPoint2({ x: point.right, y: point.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}
function isIdentityScale(scale2) {
  return scale2 === void 0 || scale2 === 1;
}
function hasScale({ scale: scale2, scaleX, scaleY }) {
  return !isIdentityScale(scale2) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
function hasTransform(values) {
  return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY;
}
function has2DTranslate(values) {
  return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
  return value && value !== "0%";
}
function scalePoint(point, scale2, originPoint) {
  const distanceFromOrigin = point - originPoint;
  const scaled = scale2 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta(point, translate, scale2, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point = scalePoint(point, boxScale, originPoint);
  }
  return scalePoint(point, scale2, originPoint) + translate;
}
function applyAxisDelta(axis, translate = 0, scale2 = 1, originPoint, boxScale) {
  axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function applyBoxDelta(box, { x: x2, y: y2 }) {
  applyAxisDelta(box.x, x2.translate, x2.scale, x2.originPoint);
  applyAxisDelta(box.y, y2.translate, y2.scale, y2.originPoint);
}
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
  const treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  let node2;
  let delta;
  for (let i = 0; i < treeLength; i++) {
    node2 = treePath[i];
    delta = node2.projectionDelta;
    const instance = node2.instance;
    if (instance && instance.style && instance.style.display === "contents") {
      continue;
    }
    if (isSharedTransition && node2.options.layoutScroll && node2.scroll && node2 !== node2.root) {
      transformBox(box, {
        x: -node2.scroll.offset.x,
        y: -node2.scroll.offset.y
      });
    }
    if (delta) {
      treeScale.x *= delta.x.scale;
      treeScale.y *= delta.y.scale;
      applyBoxDelta(box, delta);
    }
    if (isSharedTransition && hasTransform(node2.latestValues)) {
      transformBox(box, node2.latestValues);
    }
  }
  treeScale.x = snapToDefault(treeScale.x);
  treeScale.y = snapToDefault(treeScale.y);
}
function snapToDefault(scale2) {
  if (Number.isInteger(scale2))
    return scale2;
  return scale2 > 1.0000000000001 || scale2 < 0.999999999999 ? scale2 : 1;
}
function translateAxis(axis, distance2) {
  axis.min = axis.min + distance2;
  axis.max = axis.max + distance2;
}
function transformAxis(axis, transforms2, [key, scaleKey, originKey]) {
  const axisOrigin = transforms2[originKey] !== void 0 ? transforms2[originKey] : 0.5;
  const originPoint = mix(axis.min, axis.max, axisOrigin);
  applyAxisDelta(axis, transforms2[key], transforms2[scaleKey], originPoint, transforms2.scale);
}
const xKeys$1 = ["x", "scaleX", "originX"];
const yKeys$1 = ["y", "scaleY", "originY"];
function transformBox(box, transform2) {
  transformAxis(box.x, transform2, xKeys$1);
  transformAxis(box.y, transform2, yKeys$1);
}
function measureViewportBox(instance, transformPoint2) {
  return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint2));
}
function measurePageBox(element, rootProjectionNode2, transformPagePoint) {
  const viewportBox = measureViewportBox(element, transformPagePoint);
  const { scroll: scroll2 } = rootProjectionNode2;
  if (scroll2) {
    translateAxis(viewportBox.x, scroll2.offset.x);
    translateAxis(viewportBox.y, scroll2.offset.y);
  }
  return viewportBox;
}
const elementDragControls = /* @__PURE__ */ new WeakMap();
class VisualElementDragControls {
  constructor(visualElement) {
    this.openGlobalLock = null;
    this.isDragging = false;
    this.currentDirection = null;
    this.originPoint = { x: 0, y: 0 };
    this.constraints = false;
    this.hasMutatedConstraints = false;
    this.elastic = createBox();
    this.visualElement = visualElement;
  }
  start(originEvent, { snapToCursor = false } = {}) {
    const { presenceContext } = this.visualElement;
    if (presenceContext && presenceContext.isPresent === false)
      return;
    const onSessionStart = (event) => {
      this.stopAnimation();
      if (snapToCursor) {
        this.snapToCursor(extractEventInfo(event, "page").point);
      }
    };
    const onStart = (event, info) => {
      const { drag: drag2, dragPropagation, onDragStart } = this.getProps();
      if (drag2 && !dragPropagation) {
        if (this.openGlobalLock)
          this.openGlobalLock();
        this.openGlobalLock = getGlobalLock(drag2);
        if (!this.openGlobalLock)
          return;
      }
      this.isDragging = true;
      this.currentDirection = null;
      this.resolveConstraints();
      if (this.visualElement.projection) {
        this.visualElement.projection.isAnimationBlocked = true;
        this.visualElement.projection.target = void 0;
      }
      eachAxis((axis) => {
        let current = this.getAxisMotionValue(axis).get() || 0;
        if (percent.test(current)) {
          const { projection } = this.visualElement;
          if (projection && projection.layout) {
            const measuredAxis = projection.layout.layoutBox[axis];
            if (measuredAxis) {
              const length2 = calcLength(measuredAxis);
              current = length2 * (parseFloat(current) / 100);
            }
          }
        }
        this.originPoint[axis] = current;
      });
      onDragStart && onDragStart(event, info);
      const { animationState } = this.visualElement;
      animationState && animationState.setActive("whileDrag", true);
    };
    const onMove = (event, info) => {
      const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
      if (!dragPropagation && !this.openGlobalLock)
        return;
      const { offset: offset2 } = info;
      if (dragDirectionLock && this.currentDirection === null) {
        this.currentDirection = getCurrentDirection(offset2);
        if (this.currentDirection !== null) {
          onDirectionLock && onDirectionLock(this.currentDirection);
        }
        return;
      }
      this.updateAxis("x", info.point, offset2);
      this.updateAxis("y", info.point, offset2);
      this.visualElement.render();
      onDrag && onDrag(event, info);
    };
    const onSessionEnd = (event, info) => this.stop(event, info);
    this.panSession = new PanSession(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onSessionEnd
    }, { transformPagePoint: this.visualElement.getTransformPagePoint() });
  }
  stop(event, info) {
    const isDragging = this.isDragging;
    this.cancel();
    if (!isDragging)
      return;
    const { velocity } = info;
    this.startAnimation(velocity);
    const { onDragEnd } = this.getProps();
    onDragEnd && onDragEnd(event, info);
  }
  cancel() {
    this.isDragging = false;
    const { projection, animationState } = this.visualElement;
    if (projection) {
      projection.isAnimationBlocked = false;
    }
    this.panSession && this.panSession.end();
    this.panSession = void 0;
    const { dragPropagation } = this.getProps();
    if (!dragPropagation && this.openGlobalLock) {
      this.openGlobalLock();
      this.openGlobalLock = null;
    }
    animationState && animationState.setActive("whileDrag", false);
  }
  updateAxis(axis, _point, offset2) {
    const { drag: drag2 } = this.getProps();
    if (!offset2 || !shouldDrag(axis, drag2, this.currentDirection))
      return;
    const axisValue = this.getAxisMotionValue(axis);
    let next2 = this.originPoint[axis] + offset2[axis];
    if (this.constraints && this.constraints[axis]) {
      next2 = applyConstraints(next2, this.constraints[axis], this.elastic[axis]);
    }
    axisValue.set(next2);
  }
  resolveConstraints() {
    const { dragConstraints, dragElastic } = this.getProps();
    const { layout: layout2 } = this.visualElement.projection || {};
    const prevConstraints = this.constraints;
    if (dragConstraints && isRefObject(dragConstraints)) {
      if (!this.constraints) {
        this.constraints = this.resolveRefConstraints();
      }
    } else {
      if (dragConstraints && layout2) {
        this.constraints = calcRelativeConstraints(layout2.layoutBox, dragConstraints);
      } else {
        this.constraints = false;
      }
    }
    this.elastic = resolveDragElastic(dragElastic);
    if (prevConstraints !== this.constraints && layout2 && this.constraints && !this.hasMutatedConstraints) {
      eachAxis((axis) => {
        if (this.getAxisMotionValue(axis)) {
          this.constraints[axis] = rebaseAxisConstraints(layout2.layoutBox[axis], this.constraints[axis]);
        }
      });
    }
  }
  resolveRefConstraints() {
    const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
    if (!constraints || !isRefObject(constraints))
      return false;
    const constraintsElement = constraints.current;
    const { projection } = this.visualElement;
    if (!projection || !projection.layout)
      return false;
    const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
    let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
    if (onMeasureDragConstraints) {
      const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToBox(userConstraints);
      }
    }
    return measuredConstraints;
  }
  startAnimation(velocity) {
    const { drag: drag2, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
    const constraints = this.constraints || {};
    const momentumAnimations = eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, this.currentDirection)) {
        return;
      }
      let transition2 = constraints && constraints[axis] || {};
      if (dragSnapToOrigin)
        transition2 = { min: 0, max: 0 };
      const bounceStiffness = dragElastic ? 200 : 1e6;
      const bounceDamping = dragElastic ? 40 : 1e7;
      const inertia2 = {
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness,
        bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...dragTransition,
        ...transition2
      };
      return this.startAxisValueAnimation(axis, inertia2);
    });
    return Promise.all(momentumAnimations).then(onDragTransitionEnd);
  }
  startAxisValueAnimation(axis, transition2) {
    const axisValue = this.getAxisMotionValue(axis);
    return axisValue.start(createMotionValueAnimation(axis, axisValue, 0, transition2));
  }
  stopAnimation() {
    eachAxis((axis) => this.getAxisMotionValue(axis).stop());
  }
  getAxisMotionValue(axis) {
    const dragKey = "_drag" + axis.toUpperCase();
    const props = this.visualElement.getProps();
    const externalMotionValue = props[dragKey];
    return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (props.initial ? props.initial[axis] : void 0) || 0);
  }
  snapToCursor(point) {
    eachAxis((axis) => {
      const { drag: drag2 } = this.getProps();
      if (!shouldDrag(axis, drag2, this.currentDirection))
        return;
      const { projection } = this.visualElement;
      const axisValue = this.getAxisMotionValue(axis);
      if (projection && projection.layout) {
        const { min: min2, max: max2 } = projection.layout.layoutBox[axis];
        axisValue.set(point[axis] - mix(min2, max2, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: drag2, dragConstraints } = this.getProps();
    const { projection } = this.visualElement;
    if (!isRefObject(dragConstraints) || !projection || !this.constraints)
      return;
    this.stopAnimation();
    const boxProgress = { x: 0, y: 0 };
    eachAxis((axis) => {
      const axisValue = this.getAxisMotionValue(axis);
      if (axisValue) {
        const latest = axisValue.get();
        boxProgress[axis] = calcOrigin({ min: latest, max: latest }, this.constraints[axis]);
      }
    });
    const { transformTemplate: transformTemplate2 } = this.visualElement.getProps();
    this.visualElement.current.style.transform = transformTemplate2 ? transformTemplate2({}, "") : "none";
    projection.root && projection.root.updateScroll();
    projection.updateLayout();
    this.resolveConstraints();
    eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, null))
        return;
      const axisValue = this.getAxisMotionValue(axis);
      const { min: min2, max: max2 } = this.constraints[axis];
      axisValue.set(mix(min2, max2, boxProgress[axis]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    elementDragControls.set(this.visualElement, this);
    const element = this.visualElement.current;
    const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
      const { drag: drag2, dragListener = true } = this.getProps();
      drag2 && dragListener && this.start(event);
    });
    const measureDragConstraints = () => {
      const { dragConstraints } = this.getProps();
      if (isRefObject(dragConstraints)) {
        this.constraints = this.resolveRefConstraints();
      }
    };
    const { projection } = this.visualElement;
    const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
    if (projection && !projection.layout) {
      projection.root && projection.root.updateScroll();
      projection.updateLayout();
    }
    measureDragConstraints();
    const stopResizeListener = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints());
    const stopLayoutUpdateListener = projection.addEventListener("didUpdate", ({ delta, hasLayoutChanged }) => {
      if (this.isDragging && hasLayoutChanged) {
        eachAxis((axis) => {
          const motionValue2 = this.getAxisMotionValue(axis);
          if (!motionValue2)
            return;
          this.originPoint[axis] += delta[axis].translate;
          motionValue2.set(motionValue2.get() + delta[axis].translate);
        });
        this.visualElement.render();
      }
    });
    return () => {
      stopResizeListener();
      stopPointerListener();
      stopMeasureLayoutListener();
      stopLayoutUpdateListener && stopLayoutUpdateListener();
    };
  }
  getProps() {
    const props = this.visualElement.getProps();
    const { drag: drag2 = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
    return {
      ...props,
      drag: drag2,
      dragDirectionLock,
      dragPropagation,
      dragConstraints,
      dragElastic,
      dragMomentum
    };
  }
}
function shouldDrag(direction, drag2, currentDirection) {
  return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset2, lockThreshold = 10) {
  let direction = null;
  if (Math.abs(offset2.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset2.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}
class DragGesture extends Feature {
  constructor(node2) {
    super(node2);
    this.removeGroupControls = noop;
    this.removeListeners = noop;
    this.controls = new VisualElementDragControls(node2);
  }
  mount() {
    const { dragControls } = this.node.getProps();
    if (dragControls) {
      this.removeGroupControls = dragControls.subscribe(this.controls);
    }
    this.removeListeners = this.controls.addListeners() || noop;
  }
  unmount() {
    this.removeGroupControls();
    this.removeListeners();
  }
}
class PanGesture extends Feature {
  constructor() {
    super(...arguments);
    this.removePointerDownListener = noop;
  }
  onPointerDown(pointerDownEvent) {
    this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), { transformPagePoint: this.node.getTransformPagePoint() });
  }
  createPanHandlers() {
    const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
    return {
      onSessionStart: onPanSessionStart,
      onStart: onPanStart,
      onMove: onPan,
      onEnd: (event, info) => {
        delete this.session;
        onPanEnd && onPanEnd(event, info);
      }
    };
  }
  mount() {
    this.removePointerDownListener = addPointerEvent(this.node.current, "pointerdown", (event) => this.onPointerDown(event));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener();
    this.session && this.session.end();
  }
}
function usePresence() {
  const context = react.exports.useContext(PresenceContext);
  if (context === null)
    return [true, null];
  const { isPresent, onExitComplete, register } = context;
  const id2 = react.exports.useId();
  react.exports.useEffect(() => register(id2), []);
  const safeToRemove = () => onExitComplete && onExitComplete(id2);
  return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}
function pixelsToPercent(pixels, axis) {
  if (axis.max === axis.min)
    return 0;
  return pixels / (axis.max - axis.min) * 100;
}
const correctBorderRadius = {
  correct: (latest, node2) => {
    if (!node2.target)
      return latest;
    if (typeof latest === "string") {
      if (px.test(latest)) {
        latest = parseFloat(latest);
      } else {
        return latest;
      }
    }
    const x2 = pixelsToPercent(latest, node2.target.x);
    const y2 = pixelsToPercent(latest, node2.target.y);
    return `${x2}% ${y2}%`;
  }
};
const cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function parseCSSVariable(current) {
  const match2 = cssVariableRegex.exec(current);
  if (!match2)
    return [,];
  const [, token2, fallback] = match2;
  return [token2, fallback];
}
function getVariableValue(current, element, depth = 1) {
  const [token2, fallback] = parseCSSVariable(current);
  if (!token2)
    return;
  const resolved = window.getComputedStyle(element).getPropertyValue(token2);
  if (resolved) {
    return resolved.trim();
  } else if (isCSSVariableToken(fallback)) {
    return getVariableValue(fallback, element, depth + 1);
  } else {
    return fallback;
  }
}
function resolveCSSVariables(visualElement, { ...target }, transitionEnd) {
  const element = visualElement.current;
  if (!(element instanceof Element))
    return { target, transitionEnd };
  if (transitionEnd) {
    transitionEnd = { ...transitionEnd };
  }
  visualElement.values.forEach((value) => {
    const current = value.get();
    if (!isCSSVariableToken(current))
      return;
    const resolved = getVariableValue(current, element);
    if (resolved)
      value.set(resolved);
  });
  for (const key in target) {
    const current = target[key];
    if (!isCSSVariableToken(current))
      continue;
    const resolved = getVariableValue(current, element);
    if (!resolved)
      continue;
    target[key] = resolved;
    if (transitionEnd && transitionEnd[key] === void 0) {
      transitionEnd[key] = current;
    }
  }
  return { target, transitionEnd };
}
const varToken = "_$css";
const correctBoxShadow = {
  correct: (latest, { treeScale, projectionDelta }) => {
    const original = latest;
    const containsCSSVariables = latest.includes("var(");
    const cssVariables = [];
    if (containsCSSVariables) {
      latest = latest.replace(cssVariableRegex, (match2) => {
        cssVariables.push(match2);
        return varToken;
      });
    }
    const shadow = complex.parse(latest);
    if (shadow.length > 5)
      return original;
    const template = complex.createTransformer(latest);
    const offset2 = typeof shadow[0] !== "number" ? 1 : 0;
    const xScale = projectionDelta.x.scale * treeScale.x;
    const yScale = projectionDelta.y.scale * treeScale.y;
    shadow[0 + offset2] /= xScale;
    shadow[1 + offset2] /= yScale;
    const averageScale = mix(xScale, yScale, 0.5);
    if (typeof shadow[2 + offset2] === "number")
      shadow[2 + offset2] /= averageScale;
    if (typeof shadow[3 + offset2] === "number")
      shadow[3 + offset2] /= averageScale;
    let output = template(shadow);
    if (containsCSSVariables) {
      let i = 0;
      output = output.replace(varToken, () => {
        const cssVariable = cssVariables[i];
        i++;
        return cssVariable;
      });
    }
    return output;
  }
};
class MeasureLayoutWithContext extends React__default.Component {
  componentDidMount() {
    const {
      visualElement,
      layoutGroup,
      switchLayoutGroup,
      layoutId
    } = this.props;
    const {
      projection
    } = visualElement;
    addScaleCorrector(defaultScaleCorrectors);
    if (projection) {
      if (layoutGroup.group)
        layoutGroup.group.add(projection);
      if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
        switchLayoutGroup.register(projection);
      }
      projection.root.didUpdate();
      projection.addEventListener("animationComplete", () => {
        this.safeToRemove();
      });
      projection.setOptions({
        ...projection.options,
        onExitComplete: () => this.safeToRemove()
      });
    }
    globalProjectionState.hasEverUpdated = true;
  }
  getSnapshotBeforeUpdate(prevProps) {
    const {
      layoutDependency,
      visualElement,
      drag: drag2,
      isPresent
    } = this.props;
    const projection = visualElement.projection;
    if (!projection)
      return null;
    projection.isPresent = isPresent;
    if (drag2 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0) {
      projection.willUpdate();
    } else {
      this.safeToRemove();
    }
    if (prevProps.isPresent !== isPresent) {
      if (isPresent) {
        projection.promote();
      } else if (!projection.relegate()) {
        sync.postRender(() => {
          const stack = projection.getStack();
          if (!stack || !stack.members.length) {
            this.safeToRemove();
          }
        });
      }
    }
    return null;
  }
  componentDidUpdate() {
    const {
      projection
    } = this.props.visualElement;
    if (projection) {
      projection.root.didUpdate();
      if (!projection.currentAnimation && projection.isLead()) {
        this.safeToRemove();
      }
    }
  }
  componentWillUnmount() {
    const {
      visualElement,
      layoutGroup,
      switchLayoutGroup: promoteContext
    } = this.props;
    const {
      projection
    } = visualElement;
    if (projection) {
      projection.scheduleCheckAfterUnmount();
      if (layoutGroup && layoutGroup.group)
        layoutGroup.group.remove(projection);
      if (promoteContext && promoteContext.deregister)
        promoteContext.deregister(projection);
    }
  }
  safeToRemove() {
    const {
      safeToRemove
    } = this.props;
    safeToRemove && safeToRemove();
  }
  render() {
    return null;
  }
}
function MeasureLayout(props) {
  const [isPresent, safeToRemove] = usePresence();
  const layoutGroup = react.exports.useContext(LayoutGroupContext);
  return /* @__PURE__ */ jsx(MeasureLayoutWithContext, {
    ...props,
    layoutGroup,
    switchLayoutGroup: react.exports.useContext(SwitchLayoutGroupContext),
    isPresent,
    safeToRemove
  });
}
const defaultScaleCorrectors = {
  borderRadius: {
    ...correctBorderRadius,
    applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"]
  },
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};
function animate(from2, to, transition2 = {}) {
  const value = isMotionValue(from2) ? from2 : motionValue(from2);
  value.start(createMotionValueAnimation("", value, to, transition2));
  return {
    stop: () => value.stop(),
    isAnimating: () => value.isAnimating()
  };
}
const borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
const numBorders = borders.length;
const asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
const isPx = (value) => typeof value === "number" || px.test(value);
function mixValues(target, follow, lead, progress2, shouldCrossfadeOpacity, isOnlyMember) {
  if (shouldCrossfadeOpacity) {
    target.opacity = mix(
      0,
      lead.opacity !== void 0 ? lead.opacity : 1,
      easeCrossfadeIn(progress2)
    );
    target.opacityExit = mix(follow.opacity !== void 0 ? follow.opacity : 1, 0, easeCrossfadeOut(progress2));
  } else if (isOnlyMember) {
    target.opacity = mix(follow.opacity !== void 0 ? follow.opacity : 1, lead.opacity !== void 0 ? lead.opacity : 1, progress2);
  }
  for (let i = 0; i < numBorders; i++) {
    const borderLabel = `border${borders[i]}Radius`;
    let followRadius = getRadius(follow, borderLabel);
    let leadRadius = getRadius(lead, borderLabel);
    if (followRadius === void 0 && leadRadius === void 0)
      continue;
    followRadius || (followRadius = 0);
    leadRadius || (leadRadius = 0);
    const canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
    if (canMix) {
      target[borderLabel] = Math.max(mix(asNumber(followRadius), asNumber(leadRadius), progress2), 0);
      if (percent.test(leadRadius) || percent.test(followRadius)) {
        target[borderLabel] += "%";
      }
    } else {
      target[borderLabel] = leadRadius;
    }
  }
  if (follow.rotate || lead.rotate) {
    target.rotate = mix(follow.rotate || 0, lead.rotate || 0, progress2);
  }
}
function getRadius(values, radiusName) {
  return values[radiusName] !== void 0 ? values[radiusName] : values.borderRadius;
}
const easeCrossfadeIn = compress(0, 0.5, circOut);
const easeCrossfadeOut = compress(0.5, 0.95, noop);
function compress(min2, max2, easing) {
  return (p2) => {
    if (p2 < min2)
      return 0;
    if (p2 > max2)
      return 1;
    return easing(progress(min2, max2, p2));
  };
}
function copyAxisInto(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
function copyBoxInto(box, originBox) {
  copyAxisInto(box.x, originBox.x);
  copyAxisInto(box.y, originBox.y);
}
function removePointDelta(point, translate, scale2, originPoint, boxScale) {
  point -= translate;
  point = scalePoint(point, 1 / scale2, originPoint);
  if (boxScale !== void 0) {
    point = scalePoint(point, 1 / boxScale, originPoint);
  }
  return point;
}
function removeAxisDelta(axis, translate = 0, scale2 = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
  if (percent.test(translate)) {
    translate = parseFloat(translate);
    const relativeProgress = mix(sourceAxis.min, sourceAxis.max, translate / 100);
    translate = relativeProgress - sourceAxis.min;
  }
  if (typeof translate !== "number")
    return;
  let originPoint = mix(originAxis.min, originAxis.max, origin);
  if (axis === originAxis)
    originPoint -= translate;
  axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms2, [key, scaleKey, originKey], origin, sourceAxis) {
  removeAxisDelta(axis, transforms2[key], transforms2[scaleKey], transforms2[originKey], transforms2.scale, origin, sourceAxis);
}
const xKeys = ["x", "scaleX", "originX"];
const yKeys = ["y", "scaleY", "originY"];
function removeBoxTransforms(box, transforms2, originBox, sourceBox) {
  removeAxisTransforms(box.x, transforms2, xKeys, originBox ? originBox.x : void 0, sourceBox ? sourceBox.x : void 0);
  removeAxisTransforms(box.y, transforms2, yKeys, originBox ? originBox.y : void 0, sourceBox ? sourceBox.y : void 0);
}
function isAxisDeltaZero(delta) {
  return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
  return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function boxEquals(a, b2) {
  return a.x.min === b2.x.min && a.x.max === b2.x.max && a.y.min === b2.y.min && a.y.max === b2.y.max;
}
function aspectRatio(box) {
  return calcLength(box.x) / calcLength(box.y);
}
class NodeStack {
  constructor() {
    this.members = [];
  }
  add(node2) {
    addUniqueItem(this.members, node2);
    node2.scheduleRender();
  }
  remove(node2) {
    removeItem(this.members, node2);
    if (node2 === this.prevLead) {
      this.prevLead = void 0;
    }
    if (node2 === this.lead) {
      const prevLead = this.members[this.members.length - 1];
      if (prevLead) {
        this.promote(prevLead);
      }
    }
  }
  relegate(node2) {
    const indexOfNode = this.members.findIndex((member) => node2 === member);
    if (indexOfNode === 0)
      return false;
    let prevLead;
    for (let i = indexOfNode; i >= 0; i--) {
      const member = this.members[i];
      if (member.isPresent !== false) {
        prevLead = member;
        break;
      }
    }
    if (prevLead) {
      this.promote(prevLead);
      return true;
    } else {
      return false;
    }
  }
  promote(node2, preserveFollowOpacity) {
    const prevLead = this.lead;
    if (node2 === prevLead)
      return;
    this.prevLead = prevLead;
    this.lead = node2;
    node2.show();
    if (prevLead) {
      prevLead.instance && prevLead.scheduleRender();
      node2.scheduleRender();
      node2.resumeFrom = prevLead;
      if (preserveFollowOpacity) {
        node2.resumeFrom.preserveOpacity = true;
      }
      if (prevLead.snapshot) {
        node2.snapshot = prevLead.snapshot;
        node2.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
      }
      if (node2.root && node2.root.isUpdating) {
        node2.isLayoutDirty = true;
      }
      const { crossfade } = node2.options;
      if (crossfade === false) {
        prevLead.hide();
      }
    }
  }
  exitAnimationComplete() {
    this.members.forEach((node2) => {
      const { options, resumingFrom } = node2;
      options.onExitComplete && options.onExitComplete();
      if (resumingFrom) {
        resumingFrom.options.onExitComplete && resumingFrom.options.onExitComplete();
      }
    });
  }
  scheduleRender() {
    this.members.forEach((node2) => {
      node2.instance && node2.scheduleRender(false);
    });
  }
  removeLeadSnapshot() {
    if (this.lead && this.lead.snapshot) {
      this.lead.snapshot = void 0;
    }
  }
}
function buildProjectionTransform(delta, treeScale, latestTransform) {
  let transform2 = "";
  const xTranslate = delta.x.translate / treeScale.x;
  const yTranslate = delta.y.translate / treeScale.y;
  if (xTranslate || yTranslate) {
    transform2 = `translate3d(${xTranslate}px, ${yTranslate}px, 0) `;
  }
  if (treeScale.x !== 1 || treeScale.y !== 1) {
    transform2 += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
  }
  if (latestTransform) {
    const { rotate, rotateX, rotateY } = latestTransform;
    if (rotate)
      transform2 += `rotate(${rotate}deg) `;
    if (rotateX)
      transform2 += `rotateX(${rotateX}deg) `;
    if (rotateY)
      transform2 += `rotateY(${rotateY}deg) `;
  }
  const elementScaleX = delta.x.scale * treeScale.x;
  const elementScaleY = delta.y.scale * treeScale.y;
  if (elementScaleX !== 1 || elementScaleY !== 1) {
    transform2 += `scale(${elementScaleX}, ${elementScaleY})`;
  }
  return transform2 || "none";
}
const compareByDepth = (a, b2) => a.depth - b2.depth;
class FlatTree {
  constructor() {
    this.children = [];
    this.isDirty = false;
  }
  add(child) {
    addUniqueItem(this.children, child);
    this.isDirty = true;
  }
  remove(child) {
    removeItem(this.children, child);
    this.isDirty = true;
  }
  forEach(callback) {
    this.isDirty && this.children.sort(compareByDepth);
    this.isDirty = false;
    this.children.forEach(callback);
  }
}
function record(data) {
  if (window.MotionDebug) {
    window.MotionDebug.record(data);
  }
}
const transformAxes = ["", "X", "Y", "Z"];
const animationTarget = 1e3;
let id = 0;
const projectionFrameData = {
  type: "projectionFrame",
  totalNodes: 0,
  resolvedTargetDeltas: 0,
  recalculatedProjection: 0
};
function createProjectionNode({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
  return class ProjectionNode {
    constructor(elementId, latestValues = {}, parent = defaultParent === null || defaultParent === void 0 ? void 0 : defaultParent()) {
      this.id = id++;
      this.animationId = 0;
      this.children = /* @__PURE__ */ new Set();
      this.options = {};
      this.isTreeAnimating = false;
      this.isAnimationBlocked = false;
      this.isLayoutDirty = false;
      this.isProjectionDirty = false;
      this.isSharedProjectionDirty = false;
      this.isTransformDirty = false;
      this.updateManuallyBlocked = false;
      this.updateBlockedByResize = false;
      this.isUpdating = false;
      this.isSVG = false;
      this.needsReset = false;
      this.shouldResetTransform = false;
      this.treeScale = { x: 1, y: 1 };
      this.eventHandlers = /* @__PURE__ */ new Map();
      this.potentialNodes = /* @__PURE__ */ new Map();
      this.checkUpdateFailed = () => {
        if (this.isUpdating) {
          this.isUpdating = false;
          this.clearAllSnapshots();
        }
      };
      this.updateProjection = () => {
        projectionFrameData.totalNodes = projectionFrameData.resolvedTargetDeltas = projectionFrameData.recalculatedProjection = 0;
        this.nodes.forEach(propagateDirtyNodes);
        this.nodes.forEach(resolveTargetDelta);
        this.nodes.forEach(calcProjection);
        this.nodes.forEach(cleanDirtyNodes);
        record(projectionFrameData);
      };
      this.hasProjected = false;
      this.isVisible = true;
      this.animationProgress = 0;
      this.sharedNodes = /* @__PURE__ */ new Map();
      this.elementId = elementId;
      this.latestValues = latestValues;
      this.root = parent ? parent.root || parent : this;
      this.path = parent ? [...parent.path, parent] : [];
      this.parent = parent;
      this.depth = parent ? parent.depth + 1 : 0;
      elementId && this.root.registerPotentialNode(elementId, this);
      for (let i = 0; i < this.path.length; i++) {
        this.path[i].shouldResetTransform = true;
      }
      if (this.root === this)
        this.nodes = new FlatTree();
    }
    addEventListener(name, handler) {
      if (!this.eventHandlers.has(name)) {
        this.eventHandlers.set(name, new SubscriptionManager());
      }
      return this.eventHandlers.get(name).add(handler);
    }
    notifyListeners(name, ...args) {
      const subscriptionManager = this.eventHandlers.get(name);
      subscriptionManager && subscriptionManager.notify(...args);
    }
    hasListeners(name) {
      return this.eventHandlers.has(name);
    }
    registerPotentialNode(elementId, node2) {
      this.potentialNodes.set(elementId, node2);
    }
    mount(instance, isLayoutDirty = false) {
      if (this.instance)
        return;
      this.isSVG = instance instanceof SVGElement && instance.tagName !== "svg";
      this.instance = instance;
      const { layoutId, layout: layout2, visualElement } = this.options;
      if (visualElement && !visualElement.current) {
        visualElement.mount(instance);
      }
      this.root.nodes.add(this);
      this.parent && this.parent.children.add(this);
      this.elementId && this.root.potentialNodes.delete(this.elementId);
      if (isLayoutDirty && (layout2 || layoutId)) {
        this.isLayoutDirty = true;
      }
      if (attachResizeListener) {
        let cancelDelay;
        const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
        attachResizeListener(instance, () => {
          this.root.updateBlockedByResize = true;
          cancelDelay && cancelDelay();
          cancelDelay = delay(resizeUnblockUpdate, 250);
          if (globalProjectionState.hasAnimatedSinceResize) {
            globalProjectionState.hasAnimatedSinceResize = false;
            this.nodes.forEach(finishAnimation);
          }
        });
      }
      if (layoutId) {
        this.root.registerSharedNode(layoutId, this);
      }
      if (this.options.animate !== false && visualElement && (layoutId || layout2)) {
        this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeTargetChanged, layout: newLayout }) => {
          if (this.isTreeAnimationBlocked()) {
            this.target = void 0;
            this.relativeTarget = void 0;
            return;
          }
          const layoutTransition = this.options.transition || visualElement.getDefaultTransition() || defaultLayoutTransition;
          const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
          const targetChanged = !this.targetLayout || !boxEquals(this.targetLayout, newLayout) || hasRelativeTargetChanged;
          const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeTargetChanged;
          if (this.options.layoutRoot || this.resumeFrom && this.resumeFrom.instance || hasOnlyRelativeTargetChanged || hasLayoutChanged && (targetChanged || !this.currentAnimation)) {
            if (this.resumeFrom) {
              this.resumingFrom = this.resumeFrom;
              this.resumingFrom.resumingFrom = void 0;
            }
            this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
            const animationOptions = {
              ...getValueTransition(layoutTransition, "layout"),
              onPlay: onLayoutAnimationStart,
              onComplete: onLayoutAnimationComplete
            };
            if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
              animationOptions.delay = 0;
              animationOptions.type = false;
            }
            this.startAnimation(animationOptions);
          } else {
            if (!hasLayoutChanged && this.animationProgress === 0) {
              finishAnimation(this);
            }
            if (this.isLead() && this.options.onExitComplete) {
              this.options.onExitComplete();
            }
          }
          this.targetLayout = newLayout;
        });
      }
    }
    unmount() {
      this.options.layoutId && this.willUpdate();
      this.root.nodes.remove(this);
      const stack = this.getStack();
      stack && stack.remove(this);
      this.parent && this.parent.children.delete(this);
      this.instance = void 0;
      cancelSync.preRender(this.updateProjection);
    }
    blockUpdate() {
      this.updateManuallyBlocked = true;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = false;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
    }
    startUpdate() {
      if (this.isUpdateBlocked())
        return;
      this.isUpdating = true;
      this.nodes && this.nodes.forEach(resetRotation);
      this.animationId++;
    }
    getTransformTemplate() {
      const { visualElement } = this.options;
      return visualElement && visualElement.getProps().transformTemplate;
    }
    willUpdate(shouldNotifyListeners = true) {
      if (this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      !this.root.isUpdating && this.root.startUpdate();
      if (this.isLayoutDirty)
        return;
      this.isLayoutDirty = true;
      for (let i = 0; i < this.path.length; i++) {
        const node2 = this.path[i];
        node2.shouldResetTransform = true;
        node2.updateScroll("snapshot");
        if (node2.options.layoutRoot) {
          node2.willUpdate(false);
        }
      }
      const { layoutId, layout: layout2 } = this.options;
      if (layoutId === void 0 && !layout2)
        return;
      const transformTemplate2 = this.getTransformTemplate();
      this.prevTransformTemplateValue = transformTemplate2 ? transformTemplate2(this.latestValues, "") : void 0;
      this.updateSnapshot();
      shouldNotifyListeners && this.notifyListeners("willUpdate");
    }
    didUpdate() {
      const updateWasBlocked = this.isUpdateBlocked();
      if (updateWasBlocked) {
        this.unblockUpdate();
        this.clearAllSnapshots();
        this.nodes.forEach(clearMeasurements);
        return;
      }
      if (!this.isUpdating)
        return;
      this.isUpdating = false;
      if (this.potentialNodes.size) {
        this.potentialNodes.forEach(mountNodeEarly);
        this.potentialNodes.clear();
      }
      this.nodes.forEach(resetTransformStyle);
      this.nodes.forEach(updateLayout);
      this.nodes.forEach(notifyLayoutUpdate);
      this.clearAllSnapshots();
      flushSync.update();
      flushSync.preRender();
      flushSync.render();
    }
    clearAllSnapshots() {
      this.nodes.forEach(clearSnapshot);
      this.sharedNodes.forEach(removeLeadSnapshots);
    }
    scheduleUpdateProjection() {
      sync.preRender(this.updateProjection, false, true);
    }
    scheduleCheckAfterUnmount() {
      sync.postRender(() => {
        if (this.isLayoutDirty) {
          this.root.didUpdate();
        } else {
          this.root.checkUpdateFailed();
        }
      });
    }
    updateSnapshot() {
      if (this.snapshot || !this.instance)
        return;
      this.snapshot = this.measure();
    }
    updateLayout() {
      if (!this.instance)
        return;
      this.updateScroll();
      if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
        return;
      }
      if (this.resumeFrom && !this.resumeFrom.instance) {
        for (let i = 0; i < this.path.length; i++) {
          const node2 = this.path[i];
          node2.updateScroll();
        }
      }
      const prevLayout = this.layout;
      this.layout = this.measure(false);
      this.layoutCorrected = createBox();
      this.isLayoutDirty = false;
      this.projectionDelta = void 0;
      this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement } = this.options;
      visualElement && visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : void 0);
    }
    updateScroll(phase = "measure") {
      let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) {
        needsMeasurement = false;
      }
      if (needsMeasurement) {
        this.scroll = {
          animationId: this.root.animationId,
          phase,
          isRoot: checkIsScrollRoot(this.instance),
          offset: measureScroll(this.instance)
        };
      }
    }
    resetTransform() {
      if (!resetTransform)
        return;
      const isResetRequested = this.isLayoutDirty || this.shouldResetTransform;
      const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
      const transformTemplate2 = this.getTransformTemplate();
      const transformTemplateValue = transformTemplate2 ? transformTemplate2(this.latestValues, "") : void 0;
      const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
      if (isResetRequested && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
        resetTransform(this.instance, transformTemplateValue);
        this.shouldResetTransform = false;
        this.scheduleRender();
      }
    }
    measure(removeTransform = true) {
      const pageBox = this.measurePageBox();
      let layoutBox = this.removeElementScroll(pageBox);
      if (removeTransform) {
        layoutBox = this.removeTransform(layoutBox);
      }
      roundBox(layoutBox);
      return {
        animationId: this.root.animationId,
        measuredBox: pageBox,
        layoutBox,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement } = this.options;
      if (!visualElement)
        return createBox();
      const box = visualElement.measureViewportBox();
      const { scroll: scroll2 } = this.root;
      if (scroll2) {
        translateAxis(box.x, scroll2.offset.x);
        translateAxis(box.y, scroll2.offset.y);
      }
      return box;
    }
    removeElementScroll(box) {
      const boxWithoutScroll = createBox();
      copyBoxInto(boxWithoutScroll, box);
      for (let i = 0; i < this.path.length; i++) {
        const node2 = this.path[i];
        const { scroll: scroll2, options } = node2;
        if (node2 !== this.root && scroll2 && options.layoutScroll) {
          if (scroll2.isRoot) {
            copyBoxInto(boxWithoutScroll, box);
            const { scroll: rootScroll } = this.root;
            if (rootScroll) {
              translateAxis(boxWithoutScroll.x, -rootScroll.offset.x);
              translateAxis(boxWithoutScroll.y, -rootScroll.offset.y);
            }
          }
          translateAxis(boxWithoutScroll.x, scroll2.offset.x);
          translateAxis(boxWithoutScroll.y, scroll2.offset.y);
        }
      }
      return boxWithoutScroll;
    }
    applyTransform(box, transformOnly = false) {
      const withTransforms = createBox();
      copyBoxInto(withTransforms, box);
      for (let i = 0; i < this.path.length; i++) {
        const node2 = this.path[i];
        if (!transformOnly && node2.options.layoutScroll && node2.scroll && node2 !== node2.root) {
          transformBox(withTransforms, {
            x: -node2.scroll.offset.x,
            y: -node2.scroll.offset.y
          });
        }
        if (!hasTransform(node2.latestValues))
          continue;
        transformBox(withTransforms, node2.latestValues);
      }
      if (hasTransform(this.latestValues)) {
        transformBox(withTransforms, this.latestValues);
      }
      return withTransforms;
    }
    removeTransform(box) {
      const boxWithoutTransform = createBox();
      copyBoxInto(boxWithoutTransform, box);
      for (let i = 0; i < this.path.length; i++) {
        const node2 = this.path[i];
        if (!node2.instance)
          continue;
        if (!hasTransform(node2.latestValues))
          continue;
        hasScale(node2.latestValues) && node2.updateSnapshot();
        const sourceBox = createBox();
        const nodeBox = node2.measurePageBox();
        copyBoxInto(sourceBox, nodeBox);
        removeBoxTransforms(boxWithoutTransform, node2.latestValues, node2.snapshot ? node2.snapshot.layoutBox : void 0, sourceBox);
      }
      if (hasTransform(this.latestValues)) {
        removeBoxTransforms(boxWithoutTransform, this.latestValues);
      }
      return boxWithoutTransform;
    }
    setTargetDelta(delta) {
      this.targetDelta = delta;
      this.root.scheduleUpdateProjection();
      this.isProjectionDirty = true;
    }
    setOptions(options) {
      this.options = {
        ...this.options,
        ...options,
        crossfade: options.crossfade !== void 0 ? options.crossfade : true
      };
    }
    clearMeasurements() {
      this.scroll = void 0;
      this.layout = void 0;
      this.snapshot = void 0;
      this.prevTransformTemplateValue = void 0;
      this.targetDelta = void 0;
      this.target = void 0;
      this.isLayoutDirty = false;
    }
    resolveTargetDelta() {
      var _a2;
      const lead = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
      this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
      this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      const canSkip = !(isShared && this.isSharedProjectionDirty || this.isProjectionDirty || ((_a2 = this.parent) === null || _a2 === void 0 ? void 0 : _a2.isProjectionDirty) || this.attemptToResolveRelativeTarget);
      if (canSkip)
        return;
      const { layout: layout2, layoutId } = this.options;
      if (!this.layout || !(layout2 || layoutId))
        return;
      if (!this.targetDelta && !this.relativeTarget) {
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && relativeParent.layout) {
          this.relativeParent = relativeParent;
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.layout.layoutBox, relativeParent.layout.layoutBox);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      if (!this.relativeTarget && !this.targetDelta)
        return;
      if (!this.target) {
        this.target = createBox();
        this.targetWithTransforms = createBox();
      }
      if (this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
        calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
      } else if (this.targetDelta) {
        if (Boolean(this.resumingFrom)) {
          this.target = this.applyTransform(this.layout.layoutBox);
        } else {
          copyBoxInto(this.target, this.layout.layoutBox);
        }
        applyBoxDelta(this.target, this.targetDelta);
      } else {
        copyBoxInto(this.target, this.layout.layoutBox);
      }
      if (this.attemptToResolveRelativeTarget) {
        this.attemptToResolveRelativeTarget = false;
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target) {
          this.relativeParent = relativeParent;
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.target, relativeParent.target);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      projectionFrameData.resolvedTargetDeltas++;
    }
    getClosestProjectingParent() {
      if (!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues)) {
        return void 0;
      }
      if (this.parent.isProjecting()) {
        return this.parent;
      } else {
        return this.parent.getClosestProjectingParent();
      }
    }
    isProjecting() {
      return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      var _a2;
      const lead = this.getLead();
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      let canSkip = true;
      if (this.isProjectionDirty || ((_a2 = this.parent) === null || _a2 === void 0 ? void 0 : _a2.isProjectionDirty)) {
        canSkip = false;
      }
      if (isShared && (this.isSharedProjectionDirty || this.isTransformDirty)) {
        canSkip = false;
      }
      if (canSkip)
        return;
      const { layout: layout2, layoutId } = this.options;
      this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
      if (!this.isTreeAnimating) {
        this.targetDelta = this.relativeTarget = void 0;
      }
      if (!this.layout || !(layout2 || layoutId))
        return;
      copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
      applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, isShared);
      const { target } = lead;
      if (!target)
        return;
      if (!this.projectionDelta) {
        this.projectionDelta = createDelta();
        this.projectionDeltaWithTransform = createDelta();
      }
      const prevTreeScaleX = this.treeScale.x;
      const prevTreeScaleY = this.treeScale.y;
      const prevProjectionTransform = this.projectionTransform;
      calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
      this.projectionTransform = buildProjectionTransform(this.projectionDelta, this.treeScale);
      if (this.projectionTransform !== prevProjectionTransform || this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY) {
        this.hasProjected = true;
        this.scheduleRender();
        this.notifyListeners("projectionUpdate", target);
      }
      projectionFrameData.recalculatedProjection++;
    }
    hide() {
      this.isVisible = false;
    }
    show() {
      this.isVisible = true;
    }
    scheduleRender(notifyAll = true) {
      this.options.scheduleRender && this.options.scheduleRender();
      if (notifyAll) {
        const stack = this.getStack();
        stack && stack.scheduleRender();
      }
      if (this.resumingFrom && !this.resumingFrom.instance) {
        this.resumingFrom = void 0;
      }
    }
    setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
      const snapshot = this.snapshot;
      const snapshotLatestValues = snapshot ? snapshot.latestValues : {};
      const mixedValues = { ...this.latestValues };
      const targetDelta = createDelta();
      if (!this.relativeParent || !this.relativeParent.options.layoutRoot) {
        this.relativeTarget = this.relativeTargetOrigin = void 0;
      }
      this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
      const relativeLayout = createBox();
      const snapshotSource = snapshot ? snapshot.source : void 0;
      const layoutSource = this.layout ? this.layout.source : void 0;
      const isSharedLayoutAnimation = snapshotSource !== layoutSource;
      const stack = this.getStack();
      const isOnlyMember = !stack || stack.members.length <= 1;
      const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
      this.animationProgress = 0;
      let prevRelativeTarget;
      this.mixTargetDelta = (latest) => {
        const progress2 = latest / 1e3;
        mixAxisDelta(targetDelta.x, delta.x, progress2);
        mixAxisDelta(targetDelta.y, delta.y, progress2);
        this.setTargetDelta(targetDelta);
        if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
          calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
          mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress2);
          if (prevRelativeTarget && boxEquals(this.relativeTarget, prevRelativeTarget)) {
            this.isProjectionDirty = false;
          }
          if (!prevRelativeTarget)
            prevRelativeTarget = createBox();
          copyBoxInto(prevRelativeTarget, this.relativeTarget);
        }
        if (isSharedLayoutAnimation) {
          this.animationValues = mixedValues;
          mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress2, shouldCrossfadeOpacity, isOnlyMember);
        }
        this.root.scheduleUpdateProjection();
        this.scheduleRender();
        this.animationProgress = progress2;
      };
      this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(options) {
      this.notifyListeners("animationStart");
      this.currentAnimation && this.currentAnimation.stop();
      if (this.resumingFrom && this.resumingFrom.currentAnimation) {
        this.resumingFrom.currentAnimation.stop();
      }
      if (this.pendingAnimation) {
        cancelSync.update(this.pendingAnimation);
        this.pendingAnimation = void 0;
      }
      this.pendingAnimation = sync.update(() => {
        globalProjectionState.hasAnimatedSinceResize = true;
        this.currentAnimation = animate(0, animationTarget, {
          ...options,
          onUpdate: (latest) => {
            this.mixTargetDelta(latest);
            options.onUpdate && options.onUpdate(latest);
          },
          onComplete: () => {
            options.onComplete && options.onComplete();
            this.completeAnimation();
          }
        });
        if (this.resumingFrom) {
          this.resumingFrom.currentAnimation = this.currentAnimation;
        }
        this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      if (this.resumingFrom) {
        this.resumingFrom.currentAnimation = void 0;
        this.resumingFrom.preserveOpacity = void 0;
      }
      const stack = this.getStack();
      stack && stack.exitAnimationComplete();
      this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
      this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      if (this.currentAnimation) {
        this.mixTargetDelta && this.mixTargetDelta(animationTarget);
        this.currentAnimation.stop();
      }
      this.completeAnimation();
    }
    applyTransformsToTarget() {
      const lead = this.getLead();
      let { targetWithTransforms, target, layout: layout2, latestValues } = lead;
      if (!targetWithTransforms || !target || !layout2)
        return;
      if (this !== lead && this.layout && layout2 && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout2.layoutBox)) {
        target = this.target || createBox();
        const xLength = calcLength(this.layout.layoutBox.x);
        target.x.min = lead.target.x.min;
        target.x.max = target.x.min + xLength;
        const yLength = calcLength(this.layout.layoutBox.y);
        target.y.min = lead.target.y.min;
        target.y.max = target.y.min + yLength;
      }
      copyBoxInto(targetWithTransforms, target);
      transformBox(targetWithTransforms, latestValues);
      calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
    }
    registerSharedNode(layoutId, node2) {
      if (!this.sharedNodes.has(layoutId)) {
        this.sharedNodes.set(layoutId, new NodeStack());
      }
      const stack = this.sharedNodes.get(layoutId);
      stack.add(node2);
      const config = node2.options.initialPromotionConfig;
      node2.promote({
        transition: config ? config.transition : void 0,
        preserveFollowOpacity: config && config.shouldPreserveFollowOpacity ? config.shouldPreserveFollowOpacity(node2) : void 0
      });
    }
    isLead() {
      const stack = this.getStack();
      return stack ? stack.lead === this : true;
    }
    getLead() {
      var _a2;
      const { layoutId } = this.options;
      return layoutId ? ((_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.lead) || this : this;
    }
    getPrevLead() {
      var _a2;
      const { layoutId } = this.options;
      return layoutId ? (_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.prevLead : void 0;
    }
    getStack() {
      const { layoutId } = this.options;
      if (layoutId)
        return this.root.sharedNodes.get(layoutId);
    }
    promote({ needsReset, transition: transition2, preserveFollowOpacity } = {}) {
      const stack = this.getStack();
      if (stack)
        stack.promote(this, preserveFollowOpacity);
      if (needsReset) {
        this.projectionDelta = void 0;
        this.needsReset = true;
      }
      if (transition2)
        this.setOptions({ transition: transition2 });
    }
    relegate() {
      const stack = this.getStack();
      if (stack) {
        return stack.relegate(this);
      } else {
        return false;
      }
    }
    resetRotation() {
      const { visualElement } = this.options;
      if (!visualElement)
        return;
      let hasRotate = false;
      const { latestValues } = visualElement;
      if (latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ) {
        hasRotate = true;
      }
      if (!hasRotate)
        return;
      const resetValues = {};
      for (let i = 0; i < transformAxes.length; i++) {
        const key = "rotate" + transformAxes[i];
        if (latestValues[key]) {
          resetValues[key] = latestValues[key];
          visualElement.setStaticValue(key, 0);
        }
      }
      visualElement.render();
      for (const key in resetValues) {
        visualElement.setStaticValue(key, resetValues[key]);
      }
      visualElement.scheduleRender();
    }
    getProjectionStyles(styleProp = {}) {
      var _a2, _b;
      const styles = {};
      if (!this.instance || this.isSVG)
        return styles;
      if (!this.isVisible) {
        return { visibility: "hidden" };
      } else {
        styles.visibility = "";
      }
      const transformTemplate2 = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = false;
        styles.opacity = "";
        styles.pointerEvents = resolveMotionValue(styleProp.pointerEvents) || "";
        styles.transform = transformTemplate2 ? transformTemplate2(this.latestValues, "") : "none";
        return styles;
      }
      const lead = this.getLead();
      if (!this.projectionDelta || !this.layout || !lead.target) {
        const emptyStyles = {};
        if (this.options.layoutId) {
          emptyStyles.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
          emptyStyles.pointerEvents = resolveMotionValue(styleProp.pointerEvents) || "";
        }
        if (this.hasProjected && !hasTransform(this.latestValues)) {
          emptyStyles.transform = transformTemplate2 ? transformTemplate2({}, "") : "none";
          this.hasProjected = false;
        }
        return emptyStyles;
      }
      const valuesToRender = lead.animationValues || lead.latestValues;
      this.applyTransformsToTarget();
      styles.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
      if (transformTemplate2) {
        styles.transform = transformTemplate2(valuesToRender, styles.transform);
      }
      const { x: x2, y: y2 } = this.projectionDelta;
      styles.transformOrigin = `${x2.origin * 100}% ${y2.origin * 100}% 0`;
      if (lead.animationValues) {
        styles.opacity = lead === this ? (_b = (_a2 = valuesToRender.opacity) !== null && _a2 !== void 0 ? _a2 : this.latestValues.opacity) !== null && _b !== void 0 ? _b : 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
      } else {
        styles.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
      }
      for (const key in scaleCorrectors) {
        if (valuesToRender[key] === void 0)
          continue;
        const { correct, applyTo } = scaleCorrectors[key];
        const corrected = styles.transform === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
        if (applyTo) {
          const num = applyTo.length;
          for (let i = 0; i < num; i++) {
            styles[applyTo[i]] = corrected;
          }
        } else {
          styles[key] = corrected;
        }
      }
      if (this.options.layoutId) {
        styles.pointerEvents = lead === this ? resolveMotionValue(styleProp.pointerEvents) || "" : "none";
      }
      return styles;
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach((node2) => {
        var _a2;
        return (_a2 = node2.currentAnimation) === null || _a2 === void 0 ? void 0 : _a2.stop();
      });
      this.root.nodes.forEach(clearMeasurements);
      this.root.sharedNodes.clear();
    }
  };
}
function updateLayout(node2) {
  node2.updateLayout();
}
function notifyLayoutUpdate(node2) {
  var _a2;
  const snapshot = ((_a2 = node2.resumeFrom) === null || _a2 === void 0 ? void 0 : _a2.snapshot) || node2.snapshot;
  if (node2.isLead() && node2.layout && snapshot && node2.hasListeners("didUpdate")) {
    const { layoutBox: layout2, measuredBox: measuredLayout } = node2.layout;
    const { animationType } = node2.options;
    const isShared = snapshot.source !== node2.layout.source;
    if (animationType === "size") {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length2 = calcLength(axisSnapshot);
        axisSnapshot.min = layout2[axis].min;
        axisSnapshot.max = axisSnapshot.min + length2;
      });
    } else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout2)) {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length2 = calcLength(layout2[axis]);
        axisSnapshot.max = axisSnapshot.min + length2;
      });
    }
    const layoutDelta = createDelta();
    calcBoxDelta(layoutDelta, layout2, snapshot.layoutBox);
    const visualDelta = createDelta();
    if (isShared) {
      calcBoxDelta(visualDelta, node2.applyTransform(measuredLayout, true), snapshot.measuredBox);
    } else {
      calcBoxDelta(visualDelta, layout2, snapshot.layoutBox);
    }
    const hasLayoutChanged = !isDeltaZero(layoutDelta);
    let hasRelativeTargetChanged = false;
    if (!node2.resumeFrom) {
      const relativeParent = node2.getClosestProjectingParent();
      if (relativeParent && !relativeParent.resumeFrom) {
        const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
        if (parentSnapshot && parentLayout) {
          const relativeSnapshot = createBox();
          calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
          const relativeLayout = createBox();
          calcRelativePosition(relativeLayout, layout2, parentLayout.layoutBox);
          if (!boxEquals(relativeSnapshot, relativeLayout)) {
            hasRelativeTargetChanged = true;
          }
          if (relativeParent.options.layoutRoot) {
            node2.relativeTarget = relativeLayout;
            node2.relativeTargetOrigin = relativeSnapshot;
            node2.relativeParent = relativeParent;
          }
        }
      }
    }
    node2.notifyListeners("didUpdate", {
      layout: layout2,
      snapshot,
      delta: visualDelta,
      layoutDelta,
      hasLayoutChanged,
      hasRelativeTargetChanged
    });
  } else if (node2.isLead()) {
    const { onExitComplete } = node2.options;
    onExitComplete && onExitComplete();
  }
  node2.options.transition = void 0;
}
function propagateDirtyNodes(node2) {
  projectionFrameData.totalNodes++;
  if (!node2.parent)
    return;
  if (!node2.isProjecting()) {
    node2.isProjectionDirty = node2.parent.isProjectionDirty;
  }
  node2.isSharedProjectionDirty || (node2.isSharedProjectionDirty = Boolean(node2.isProjectionDirty || node2.parent.isProjectionDirty || node2.parent.isSharedProjectionDirty));
  node2.isTransformDirty || (node2.isTransformDirty = node2.parent.isTransformDirty);
}
function cleanDirtyNodes(node2) {
  node2.isProjectionDirty = node2.isSharedProjectionDirty = node2.isTransformDirty = false;
}
function clearSnapshot(node2) {
  node2.clearSnapshot();
}
function clearMeasurements(node2) {
  node2.clearMeasurements();
}
function resetTransformStyle(node2) {
  const { visualElement } = node2.options;
  if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) {
    visualElement.notify("BeforeLayoutMeasure");
  }
  node2.resetTransform();
}
function finishAnimation(node2) {
  node2.finishAnimation();
  node2.targetDelta = node2.relativeTarget = node2.target = void 0;
}
function resolveTargetDelta(node2) {
  node2.resolveTargetDelta();
}
function calcProjection(node2) {
  node2.calcProjection();
}
function resetRotation(node2) {
  node2.resetRotation();
}
function removeLeadSnapshots(stack) {
  stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p2) {
  output.translate = mix(delta.translate, 0, p2);
  output.scale = mix(delta.scale, 1, p2);
  output.origin = delta.origin;
  output.originPoint = delta.originPoint;
}
function mixAxis(output, from2, to, p2) {
  output.min = mix(from2.min, to.min, p2);
  output.max = mix(from2.max, to.max, p2);
}
function mixBox(output, from2, to, p2) {
  mixAxis(output.x, from2.x, to.x, p2);
  mixAxis(output.y, from2.y, to.y, p2);
}
function hasOpacityCrossfade(node2) {
  return node2.animationValues && node2.animationValues.opacityExit !== void 0;
}
const defaultLayoutTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
};
function mountNodeEarly(node2, elementId) {
  let searchNode = node2.root;
  for (let i = node2.path.length - 1; i >= 0; i--) {
    if (Boolean(node2.path[i].instance)) {
      searchNode = node2.path[i];
      break;
    }
  }
  const searchElement = searchNode && searchNode !== node2.root ? searchNode.instance : document;
  const element = searchElement.querySelector(`[data-projection-id="${elementId}"]`);
  if (element)
    node2.mount(element, true);
}
function roundAxis(axis) {
  axis.min = Math.round(axis.min);
  axis.max = Math.round(axis.max);
}
function roundBox(box) {
  roundAxis(box.x);
  roundAxis(box.y);
}
function shouldAnimatePositionOnly(animationType, snapshot, layout2) {
  return animationType === "position" || animationType === "preserve-aspect" && !isNear(aspectRatio(snapshot), aspectRatio(layout2), 0.2);
}
const DocumentProjectionNode = createProjectionNode({
  attachResizeListener: (ref, notify) => addDomEvent(ref, "resize", notify),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => true
});
const rootProjectionNode = {
  current: void 0
};
const HTMLProjectionNode = createProjectionNode({
  measureScroll: (instance) => ({
    x: instance.scrollLeft,
    y: instance.scrollTop
  }),
  defaultParent: () => {
    if (!rootProjectionNode.current) {
      const documentNode = new DocumentProjectionNode(0, {});
      documentNode.mount(window);
      documentNode.setOptions({ layoutScroll: true });
      rootProjectionNode.current = documentNode;
    }
    return rootProjectionNode.current;
  },
  resetTransform: (instance, value) => {
    instance.style.transform = value !== void 0 ? value : "none";
  },
  checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
});
const drag = {
  pan: {
    Feature: PanGesture
  },
  drag: {
    Feature: DragGesture,
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
};
const positionalKeys = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  "x",
  "y"
]);
const isPositionalKey = (key) => positionalKeys.has(key);
const hasPositionalKey = (target) => {
  return Object.keys(target).some(isPositionalKey);
};
const isNumOrPxType = (v2) => v2 === number || v2 === px;
const getPosFromMatrix = (matrix, pos) => parseFloat(matrix.split(", ")[pos]);
const getTranslateFromMatrix = (pos2, pos3) => (_bbox, { transform: transform2 }) => {
  if (transform2 === "none" || !transform2)
    return 0;
  const matrix3d = transform2.match(/^matrix3d\((.+)\)$/);
  if (matrix3d) {
    return getPosFromMatrix(matrix3d[1], pos3);
  } else {
    const matrix = transform2.match(/^matrix\((.+)\)$/);
    if (matrix) {
      return getPosFromMatrix(matrix[1], pos2);
    } else {
      return 0;
    }
  }
};
const transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
const nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
  const removedTransforms = [];
  nonTranslationalTransformKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  if (removedTransforms.length)
    visualElement.render();
  return removedTransforms;
}
const positionalValues = {
  width: ({ x: x2 }, { paddingLeft = "0", paddingRight = "0" }) => x2.max - x2.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
  height: ({ y: y2 }, { paddingTop = "0", paddingBottom = "0" }) => y2.max - y2.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
  top: (_bbox, { top: top2 }) => parseFloat(top2),
  left: (_bbox, { left: left2 }) => parseFloat(left2),
  bottom: ({ y: y2 }, { top: top2 }) => parseFloat(top2) + (y2.max - y2.min),
  right: ({ x: x2 }, { left: left2 }) => parseFloat(left2) + (x2.max - x2.min),
  x: getTranslateFromMatrix(4, 13),
  y: getTranslateFromMatrix(5, 14)
};
const convertChangedValueTypes = (target, visualElement, changedKeys) => {
  const originBbox = visualElement.measureViewportBox();
  const element = visualElement.current;
  const elementComputedStyle = getComputedStyle(element);
  const { display } = elementComputedStyle;
  const origin = {};
  if (display === "none") {
    visualElement.setStaticValue("display", target.display || "block");
  }
  changedKeys.forEach((key) => {
    origin[key] = positionalValues[key](originBbox, elementComputedStyle);
  });
  visualElement.render();
  const targetBbox = visualElement.measureViewportBox();
  changedKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    value && value.jump(origin[key]);
    target[key] = positionalValues[key](targetBbox, elementComputedStyle);
  });
  return target;
};
const checkAndConvertChangedValueTypes = (visualElement, target, origin = {}, transitionEnd = {}) => {
  target = { ...target };
  transitionEnd = { ...transitionEnd };
  const targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
  let removedTransformValues = [];
  let hasAttemptedToRemoveTransformValues = false;
  const changedValueTypeKeys = [];
  targetPositionalKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    if (!visualElement.hasValue(key))
      return;
    let from2 = origin[key];
    let fromType = findDimensionValueType(from2);
    const to = target[key];
    let toType;
    if (isKeyframesTarget(to)) {
      const numKeyframes = to.length;
      const fromIndex = to[0] === null ? 1 : 0;
      from2 = to[fromIndex];
      fromType = findDimensionValueType(from2);
      for (let i = fromIndex; i < numKeyframes; i++) {
        if (!toType) {
          toType = findDimensionValueType(to[i]);
        } else {
          invariant(findDimensionValueType(to[i]) === toType);
        }
      }
    } else {
      toType = findDimensionValueType(to);
    }
    if (fromType !== toType) {
      if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
        const current = value.get();
        if (typeof current === "string") {
          value.set(parseFloat(current));
        }
        if (typeof to === "string") {
          target[key] = parseFloat(to);
        } else if (Array.isArray(to) && toType === px) {
          target[key] = to.map(parseFloat);
        }
      } else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) && (toType === null || toType === void 0 ? void 0 : toType.transform) && (from2 === 0 || to === 0)) {
        if (from2 === 0) {
          value.set(toType.transform(from2));
        } else {
          target[key] = fromType.transform(to);
        }
      } else {
        if (!hasAttemptedToRemoveTransformValues) {
          removedTransformValues = removeNonTranslationalTransform(visualElement);
          hasAttemptedToRemoveTransformValues = true;
        }
        changedValueTypeKeys.push(key);
        transitionEnd[key] = transitionEnd[key] !== void 0 ? transitionEnd[key] : target[key];
        value.jump(to);
      }
    }
  });
  if (changedValueTypeKeys.length) {
    const scrollY = changedValueTypeKeys.indexOf("height") >= 0 ? window.pageYOffset : null;
    const convertedTarget = convertChangedValueTypes(target, visualElement, changedValueTypeKeys);
    if (removedTransformValues.length) {
      removedTransformValues.forEach(([key, value]) => {
        visualElement.getValue(key).set(value);
      });
    }
    visualElement.render();
    if (isBrowser && scrollY !== null) {
      window.scrollTo({ top: scrollY });
    }
    return { target: convertedTarget, transitionEnd };
  } else {
    return { target, transitionEnd };
  }
};
function unitConversion(visualElement, target, origin, transitionEnd) {
  return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement, target, origin, transitionEnd) : { target, transitionEnd };
}
const parseDomVariant = (visualElement, target, origin, transitionEnd) => {
  const resolved = resolveCSSVariables(visualElement, target, transitionEnd);
  target = resolved.target;
  transitionEnd = resolved.transitionEnd;
  return unitConversion(visualElement, target, origin, transitionEnd);
};
const prefersReducedMotion = { current: null };
const hasReducedMotionListener = { current: false };
function initPrefersReducedMotion() {
  hasReducedMotionListener.current = true;
  if (!isBrowser)
    return;
  if (window.matchMedia) {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
    const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
    motionMediaQuery.addListener(setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion.current = false;
  }
}
function updateMotionValuesFromProps(element, next2, prev2) {
  const { willChange } = next2;
  for (const key in next2) {
    const nextValue = next2[key];
    const prevValue = prev2[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
      if (isWillChangeMotionValue(willChange)) {
        willChange.add(key);
      }
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue, { owner: element }));
      if (isWillChangeMotionValue(willChange)) {
        willChange.remove(key);
      }
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        const existingValue = element.getValue(key);
        !existingValue.hasAnimated && existingValue.set(nextValue);
      } else {
        const latestValue = element.getStaticValue(key);
        element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
      }
    }
  }
  for (const key in prev2) {
    if (next2[key] === void 0)
      element.removeValue(key);
  }
  return next2;
}
const featureNames = Object.keys(featureDefinitions);
const numFeatures = featureNames.length;
const propEventHandlers = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
const numVariantProps = variantProps.length;
class VisualElement {
  constructor({ parent, props, presenceContext, reducedMotionConfig, visualState }, options = {}) {
    this.current = null;
    this.children = /* @__PURE__ */ new Set();
    this.isVariantNode = false;
    this.isControllingVariants = false;
    this.shouldReduceMotion = null;
    this.values = /* @__PURE__ */ new Map();
    this.features = {};
    this.valueSubscriptions = /* @__PURE__ */ new Map();
    this.prevMotionValues = {};
    this.events = {};
    this.propEventSubscriptions = {};
    this.notifyUpdate = () => this.notify("Update", this.latestValues);
    this.render = () => {
      if (!this.current)
        return;
      this.triggerBuild();
      this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
    };
    this.scheduleRender = () => sync.render(this.render, false, true);
    const { latestValues, renderState } = visualState;
    this.latestValues = latestValues;
    this.baseTarget = { ...latestValues };
    this.initialValues = props.initial ? { ...latestValues } : {};
    this.renderState = renderState;
    this.parent = parent;
    this.props = props;
    this.presenceContext = presenceContext;
    this.depth = parent ? parent.depth + 1 : 0;
    this.reducedMotionConfig = reducedMotionConfig;
    this.options = options;
    this.isControllingVariants = isControllingVariants(props);
    this.isVariantNode = isVariantNode(props);
    if (this.isVariantNode) {
      this.variantChildren = /* @__PURE__ */ new Set();
    }
    this.manuallyAnimateOnMount = Boolean(parent && parent.current);
    const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {});
    for (const key in initialMotionValues) {
      const value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue(value)) {
        value.set(latestValues[key], false);
        if (isWillChangeMotionValue(willChange)) {
          willChange.add(key);
        }
      }
    }
  }
  scrapeMotionValuesFromProps(_props, _prevProps) {
    return {};
  }
  mount(instance) {
    this.current = instance;
    if (this.projection) {
      this.projection.mount(instance);
    }
    if (this.parent && this.isVariantNode && !this.isControllingVariants) {
      this.removeFromVariantTree = this.parent.addVariantChild(this);
    }
    this.values.forEach((value, key) => this.bindToMotionValue(key, value));
    if (!hasReducedMotionListener.current) {
      initPrefersReducedMotion();
    }
    this.shouldReduceMotion = this.reducedMotionConfig === "never" ? false : this.reducedMotionConfig === "always" ? true : prefersReducedMotion.current;
    if (this.parent)
      this.parent.children.add(this);
    this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount();
    cancelSync.update(this.notifyUpdate);
    cancelSync.render(this.render);
    this.valueSubscriptions.forEach((remove) => remove());
    this.removeFromVariantTree && this.removeFromVariantTree();
    this.parent && this.parent.children.delete(this);
    for (const key in this.events) {
      this.events[key].clear();
    }
    for (const key in this.features) {
      this.features[key].unmount();
    }
    this.current = null;
  }
  bindToMotionValue(key, value) {
    const valueIsTransform = transformProps.has(key);
    const removeOnChange = value.on("change", (latestValue) => {
      this.latestValues[key] = latestValue;
      this.props.onUpdate && sync.update(this.notifyUpdate, false, true);
      if (valueIsTransform && this.projection) {
        this.projection.isTransformDirty = true;
      }
    });
    const removeOnRenderRequest = value.on("renderRequest", this.scheduleRender);
    this.valueSubscriptions.set(key, () => {
      removeOnChange();
      removeOnRenderRequest();
    });
  }
  sortNodePosition(other) {
    if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
      return 0;
    }
    return this.sortInstanceNodePosition(this.current, other.current);
  }
  loadFeatures({ children: children2, ...renderedProps }, isStrict, preloadedFeatures2, projectionId, initialLayoutGroupConfig) {
    let ProjectionNodeConstructor;
    let MeasureLayout2;
    for (let i = 0; i < numFeatures; i++) {
      const name = featureNames[i];
      const { isEnabled, Feature: FeatureConstructor, ProjectionNode, MeasureLayout: MeasureLayoutComponent } = featureDefinitions[name];
      if (ProjectionNode)
        ProjectionNodeConstructor = ProjectionNode;
      if (isEnabled(renderedProps)) {
        if (!this.features[name] && FeatureConstructor) {
          this.features[name] = new FeatureConstructor(this);
        }
        if (MeasureLayoutComponent) {
          MeasureLayout2 = MeasureLayoutComponent;
        }
      }
    }
    if (!this.projection && ProjectionNodeConstructor) {
      this.projection = new ProjectionNodeConstructor(projectionId, this.latestValues, this.parent && this.parent.projection);
      const { layoutId, layout: layout2, drag: drag2, dragConstraints, layoutScroll, layoutRoot } = renderedProps;
      this.projection.setOptions({
        layoutId,
        layout: layout2,
        alwaysMeasureLayout: Boolean(drag2) || dragConstraints && isRefObject(dragConstraints),
        visualElement: this,
        scheduleRender: () => this.scheduleRender(),
        animationType: typeof layout2 === "string" ? layout2 : "both",
        initialPromotionConfig: initialLayoutGroupConfig,
        layoutScroll,
        layoutRoot
      });
    }
    return MeasureLayout2;
  }
  updateFeatures() {
    for (const key in this.features) {
      const feature = this.features[key];
      if (feature.isMounted) {
        feature.update(this.props, this.prevProps);
      } else {
        feature.mount();
        feature.isMounted = true;
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.options, this.props);
  }
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
  }
  getStaticValue(key) {
    return this.latestValues[key];
  }
  setStaticValue(key, value) {
    this.latestValues[key] = value;
  }
  makeTargetAnimatable(target, canMutate = true) {
    return this.makeTargetAnimatableFromInstance(target, this.props, canMutate);
  }
  update(props, presenceContext) {
    if (props.transformTemplate || this.props.transformTemplate) {
      this.scheduleRender();
    }
    this.prevProps = this.props;
    this.props = props;
    this.prevPresenceContext = this.presenceContext;
    this.presenceContext = presenceContext;
    for (let i = 0; i < propEventHandlers.length; i++) {
      const key = propEventHandlers[i];
      if (this.propEventSubscriptions[key]) {
        this.propEventSubscriptions[key]();
        delete this.propEventSubscriptions[key];
      }
      const listener = props["on" + key];
      if (listener) {
        this.propEventSubscriptions[key] = this.on(key, listener);
      }
    }
    this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps), this.prevMotionValues);
    if (this.handleChildMotionValue) {
      this.handleChildMotionValue();
    }
  }
  getProps() {
    return this.props;
  }
  getVariant(name) {
    return this.props.variants ? this.props.variants[name] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  getVariantContext(startAtParent = false) {
    if (startAtParent) {
      return this.parent ? this.parent.getVariantContext() : void 0;
    }
    if (!this.isControllingVariants) {
      const context2 = this.parent ? this.parent.getVariantContext() || {} : {};
      if (this.props.initial !== void 0) {
        context2.initial = this.props.initial;
      }
      return context2;
    }
    const context = {};
    for (let i = 0; i < numVariantProps; i++) {
      const name = variantProps[i];
      const prop = this.props[name];
      if (isVariantLabel(prop) || prop === false) {
        context[name] = prop;
      }
    }
    return context;
  }
  addVariantChild(child) {
    const closestVariantNode = this.getClosestVariantNode();
    if (closestVariantNode) {
      closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
      return () => closestVariantNode.variantChildren.delete(child);
    }
  }
  addValue(key, value) {
    if (value !== this.values.get(key)) {
      this.removeValue(key);
      this.bindToMotionValue(key, value);
    }
    this.values.set(key, value);
    this.latestValues[key] = value.get();
  }
  removeValue(key) {
    this.values.delete(key);
    const unsubscribe = this.valueSubscriptions.get(key);
    if (unsubscribe) {
      unsubscribe();
      this.valueSubscriptions.delete(key);
    }
    delete this.latestValues[key];
    this.removeValueFromRenderState(key, this.renderState);
  }
  hasValue(key) {
    return this.values.has(key);
  }
  getValue(key, defaultValue) {
    if (this.props.values && this.props.values[key]) {
      return this.props.values[key];
    }
    let value = this.values.get(key);
    if (value === void 0 && defaultValue !== void 0) {
      value = motionValue(defaultValue, { owner: this });
      this.addValue(key, value);
    }
    return value;
  }
  readValue(key) {
    return this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : this.readValueFromInstance(this.current, key, this.options);
  }
  setBaseTarget(key, value) {
    this.baseTarget[key] = value;
  }
  getBaseTarget(key) {
    var _a2;
    const { initial } = this.props;
    const valueFromInitial = typeof initial === "string" || typeof initial === "object" ? (_a2 = resolveVariantFromProps(this.props, initial)) === null || _a2 === void 0 ? void 0 : _a2[key] : void 0;
    if (initial && valueFromInitial !== void 0) {
      return valueFromInitial;
    }
    const target = this.getBaseTargetFromProps(this.props, key);
    if (target !== void 0 && !isMotionValue(target))
      return target;
    return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    return this.events[eventName].add(callback);
  }
  notify(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].notify(...args);
    }
  }
}
class DOMVisualElement extends VisualElement {
  sortInstanceNodePosition(a, b2) {
    return a.compareDocumentPosition(b2) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(props, key) {
    return props.style ? props.style[key] : void 0;
  }
  removeValueFromRenderState(key, { vars, style }) {
    delete vars[key];
    delete style[key];
  }
  makeTargetAnimatableFromInstance({ transition: transition2, transitionEnd, ...target }, { transformValues }, isMounted) {
    let origin = getOrigin(target, transition2 || {}, this);
    if (transformValues) {
      if (transitionEnd)
        transitionEnd = transformValues(transitionEnd);
      if (target)
        target = transformValues(target);
      if (origin)
        origin = transformValues(origin);
    }
    if (isMounted) {
      checkTargetForNewValues(this, target, origin);
      const parsed = parseDomVariant(this, target, origin, transitionEnd);
      transitionEnd = parsed.transitionEnd;
      target = parsed.target;
    }
    return {
      transition: transition2,
      transitionEnd,
      ...target
    };
  }
}
function getComputedStyle$2(element) {
  return window.getComputedStyle(element);
}
class HTMLVisualElement extends DOMVisualElement {
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    } else {
      const computedStyle = getComputedStyle$2(instance);
      const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
      return typeof value === "string" ? value.trim() : value;
    }
  }
  measureInstanceViewportBox(instance, { transformPagePoint }) {
    return measureViewportBox(instance, transformPagePoint);
  }
  build(renderState, latestValues, options, props) {
    buildHTMLStyles(renderState, latestValues, options, props.transformTemplate);
  }
  scrapeMotionValuesFromProps(props, prevProps) {
    return scrapeMotionValuesFromProps$1(props, prevProps);
  }
  handleChildMotionValue() {
    if (this.childSubscription) {
      this.childSubscription();
      delete this.childSubscription;
    }
    const { children: children2 } = this.props;
    if (isMotionValue(children2)) {
      this.childSubscription = children2.on("change", (latest) => {
        if (this.current)
          this.current.textContent = `${latest}`;
      });
    }
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderHTML(instance, renderState, styleProp, projection);
  }
}
class SVGVisualElement extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.isSVGTag = false;
  }
  getBaseTargetFromProps(props, key) {
    return props[key];
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    }
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return instance.getAttribute(key);
  }
  measureInstanceViewportBox() {
    return createBox();
  }
  scrapeMotionValuesFromProps(props, prevProps) {
    return scrapeMotionValuesFromProps(props, prevProps);
  }
  build(renderState, latestValues, options, props) {
    buildSVGAttrs(renderState, latestValues, options, this.isSVGTag, props.transformTemplate);
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderSVG(instance, renderState, styleProp, projection);
  }
  mount(instance) {
    this.isSVGTag = isSVGTag(instance.tagName);
    super.mount(instance);
  }
}
const createDomVisualElement = (Component, options) => {
  return isSVGComponent(Component) ? new SVGVisualElement(options, { enableHardwareAcceleration: false }) : new HTMLVisualElement(options, { enableHardwareAcceleration: true });
};
const layout = {
  layout: {
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
};
const preloadedFeatures = {
  ...animations,
  ...gestureAnimations,
  ...drag,
  ...layout
};
const motion = /* @__PURE__ */ createMotionProxy((Component, config) => createDomMotionConfig(Component, config, preloadedFeatures, createDomVisualElement));
function useIsMounted() {
  const isMounted = react.exports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}
function useForceUpdate() {
  const isMounted = useIsMounted();
  const [forcedRenderCount, setForcedRenderCount] = react.exports.useState(0);
  const forceRender = react.exports.useCallback(() => {
    isMounted.current && setForcedRenderCount(forcedRenderCount + 1);
  }, [forcedRenderCount]);
  const deferredForceRender = react.exports.useCallback(() => sync.postRender(forceRender), [forceRender]);
  return [deferredForceRender, forcedRenderCount];
}
class PopChildMeasure extends react.exports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (element && prevProps.isPresent && !this.props.isPresent) {
      const size = this.props.sizeRef.current;
      size.height = element.offsetHeight || 0;
      size.width = element.offsetWidth || 0;
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
    }
    return null;
  }
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({
  children: children2,
  isPresent
}) {
  const id2 = react.exports.useId();
  const ref = react.exports.useRef(null);
  const size = react.exports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0
  });
  react.exports.useInsertionEffect(() => {
    const {
      width,
      height,
      top: top2,
      left: left2
    } = size.current;
    if (isPresent || !ref.current || !width || !height)
      return;
    ref.current.dataset.motionPopId = id2;
    const style = document.createElement("style");
    document.head.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id2}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            top: ${top2}px !important;
            left: ${left2}px !important;
          }
        `);
    }
    return () => {
      document.head.removeChild(style);
    };
  }, [isPresent]);
  return /* @__PURE__ */ jsx(PopChildMeasure, {
    isPresent,
    childRef: ref,
    sizeRef: size,
    children: react.exports.cloneElement(children2, {
      ref
    })
  });
}
const PresenceChild = ({
  children: children2,
  initial,
  isPresent,
  onExitComplete,
  custom,
  presenceAffectsLayout,
  mode
}) => {
  const presenceChildren = useConstant$1(newChildrenMap);
  const id2 = react.exports.useId();
  const context = react.exports.useMemo(
    () => ({
      id: id2,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    }),
    presenceAffectsLayout ? void 0 : [isPresent]
  );
  react.exports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  react.exports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  if (mode === "popLayout") {
    children2 = /* @__PURE__ */ jsx(PopChild, {
      isPresent,
      children: children2
    });
  }
  return /* @__PURE__ */ jsx(PresenceContext.Provider, {
    value: context,
    children: children2
  });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
function useUnmountEffect(callback) {
  return react.exports.useEffect(() => () => callback(), []);
}
const getChildKey = (child) => child.key || "";
function updateChildLookup(children2, allChildren) {
  children2.forEach((child) => {
    const key = getChildKey(child);
    allChildren.set(key, child);
  });
}
function onlyElements(children2) {
  const filtered = [];
  react.exports.Children.forEach(children2, (child) => {
    if (react.exports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({
  children: children2,
  custom,
  initial = true,
  onExitComplete,
  exitBeforeEnter,
  presenceAffectsLayout = true,
  mode = "sync"
}) => {
  invariant(!exitBeforeEnter);
  let [forceRender] = useForceUpdate();
  const forceRenderLayoutGroup = react.exports.useContext(LayoutGroupContext).forceRender;
  if (forceRenderLayoutGroup)
    forceRender = forceRenderLayoutGroup;
  const isMounted = useIsMounted();
  const filteredChildren = onlyElements(children2);
  let childrenToRender = filteredChildren;
  const exiting = /* @__PURE__ */ new Set();
  const presentChildren = react.exports.useRef(childrenToRender);
  const allChildren = react.exports.useRef(/* @__PURE__ */ new Map()).current;
  const isInitialRender = react.exports.useRef(true);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    updateChildLookup(filteredChildren, allChildren);
    presentChildren.current = childrenToRender;
  });
  useUnmountEffect(() => {
    isInitialRender.current = true;
    allChildren.clear();
    exiting.clear();
  });
  if (isInitialRender.current) {
    return /* @__PURE__ */ jsx(Fragment, {
      children: childrenToRender.map((child) => /* @__PURE__ */ jsx(PresenceChild, {
        isPresent: true,
        initial: initial ? void 0 : false,
        presenceAffectsLayout,
        mode,
        children: child
      }, getChildKey(child)))
    });
  }
  childrenToRender = [...childrenToRender];
  const presentKeys = presentChildren.current.map(getChildKey);
  const targetKeys = filteredChildren.map(getChildKey);
  const numPresent = presentKeys.length;
  for (let i = 0; i < numPresent; i++) {
    const key = presentKeys[i];
    if (targetKeys.indexOf(key) === -1) {
      exiting.add(key);
    }
  }
  if (mode === "wait" && exiting.size) {
    childrenToRender = [];
  }
  exiting.forEach((key) => {
    if (targetKeys.indexOf(key) !== -1)
      return;
    const child = allChildren.get(key);
    if (!child)
      return;
    const insertionIndex = presentKeys.indexOf(key);
    const onExit = () => {
      allChildren.delete(key);
      exiting.delete(key);
      const removeIndex = presentChildren.current.findIndex((presentChild) => presentChild.key === key);
      presentChildren.current.splice(removeIndex, 1);
      if (!exiting.size) {
        presentChildren.current = filteredChildren;
        if (isMounted.current === false)
          return;
        forceRender();
        onExitComplete && onExitComplete();
      }
    };
    childrenToRender.splice(insertionIndex, 0, /* @__PURE__ */ jsx(PresenceChild, {
      isPresent: false,
      onExitComplete: onExit,
      custom,
      presenceAffectsLayout,
      mode,
      children: child
    }, getChildKey(child)));
  });
  childrenToRender = childrenToRender.map((child) => {
    const key = child.key;
    return exiting.has(key) ? child : /* @__PURE__ */ jsx(PresenceChild, {
      isPresent: true,
      presenceAffectsLayout,
      mode,
      children: child
    }, getChildKey(child));
  });
  return /* @__PURE__ */ jsx(Fragment, {
    children: exiting.size ? childrenToRender : childrenToRender.map((child) => react.exports.cloneElement(child))
  });
};
var fallbackIcon = {
  path: /* @__PURE__ */ jsxs("g", { stroke: "currentColor", strokeWidth: "1.5", children: [
    /* @__PURE__ */ jsx(
      "path",
      {
        strokeLinecap: "round",
        fill: "none",
        d: "M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: "currentColor",
        strokeLinecap: "round",
        d: "M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
      }
    ),
    /* @__PURE__ */ jsx("circle", { fill: "none", strokeMiterlimit: "10", cx: "12", cy: "12", r: "11.25" })
  ] }),
  viewBox: "0 0 24 24"
};
var Icon = forwardRef((props, ref) => {
  const {
    as: element,
    viewBox,
    color: color2 = "currentColor",
    focusable = false,
    children: children2,
    className,
    __css,
    ...rest
  } = props;
  const _className = cx("chakra-icon", className);
  const customStyles = useStyleConfig("Icon", props);
  const styles = {
    w: "1em",
    h: "1em",
    display: "inline-block",
    lineHeight: "1em",
    flexShrink: 0,
    color: color2,
    ...__css,
    ...customStyles
  };
  const shared = {
    ref,
    focusable,
    className: _className,
    __css: styles
  };
  const _viewBox = viewBox != null ? viewBox : fallbackIcon.viewBox;
  if (element && typeof element !== "string") {
    return /* @__PURE__ */ jsx(chakra.svg, { as: element, ...shared, ...rest });
  }
  const _path = children2 != null ? children2 : fallbackIcon.path;
  return /* @__PURE__ */ jsx(chakra.svg, { verticalAlign: "middle", viewBox: _viewBox, ...shared, ...rest, children: _path });
});
Icon.displayName = "Icon";
var spin = keyframes$1({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});
var Spinner = forwardRef((props, ref) => {
  const styles = useStyleConfig("Spinner", props);
  const {
    label = "Loading...",
    thickness = "2px",
    speed = "0.45s",
    emptyColor = "transparent",
    className,
    ...rest
  } = omitThemingProps(props);
  const _className = cx("chakra-spinner", className);
  const spinnerStyles = {
    display: "inline-block",
    borderColor: "currentColor",
    borderStyle: "solid",
    borderRadius: "99999px",
    borderWidth: thickness,
    borderBottomColor: emptyColor,
    borderLeftColor: emptyColor,
    animation: `${spin} ${speed} linear infinite`,
    ...styles
  };
  return /* @__PURE__ */ jsx(
    chakra.div,
    {
      ref,
      __css: spinnerStyles,
      className: _className,
      ...rest,
      children: label && /* @__PURE__ */ jsx(chakra.span, { srOnly: true, children: label })
    }
  );
});
Spinner.displayName = "Spinner";
function assignRef(ref, value) {
  if (ref == null)
    return;
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  try {
    ref.current = value;
  } catch (error2) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
}
function mergeRefs(...refs) {
  return (node2) => {
    refs.forEach((ref) => {
      assignRef(ref, node2);
    });
  };
}
function useMergeRefs(...refs) {
  return react.exports.useMemo(() => mergeRefs(...refs), refs);
}
function getValidChildren(children2) {
  return react.exports.Children.toArray(children2).filter(
    (child) => react.exports.isValidElement(child)
  );
}
var [ButtonGroupProvider, useButtonGroup] = createContext({
  strict: false,
  name: "ButtonGroupContext"
});
function useButtonType(value) {
  const [isButton, setIsButton] = react.exports.useState(!value);
  const refCallback = react.exports.useCallback((node2) => {
    if (!node2)
      return;
    setIsButton(node2.tagName === "BUTTON");
  }, []);
  const type = isButton ? "button" : void 0;
  return { ref: refCallback, type };
}
function ButtonIcon(props) {
  const { children: children2, className, ...rest } = props;
  const _children = react.exports.isValidElement(children2) ? react.exports.cloneElement(children2, {
    "aria-hidden": true,
    focusable: false
  }) : children2;
  const _className = cx("chakra-button__icon", className);
  return /* @__PURE__ */ jsx(
    chakra.span,
    {
      display: "inline-flex",
      alignSelf: "center",
      flexShrink: 0,
      ...rest,
      className: _className,
      children: _children
    }
  );
}
ButtonIcon.displayName = "ButtonIcon";
function ButtonSpinner(props) {
  const {
    label,
    placement,
    spacing = "0.5rem",
    children: children2 = /* @__PURE__ */ jsx(Spinner, { color: "currentColor", width: "1em", height: "1em" }),
    className,
    __css,
    ...rest
  } = props;
  const _className = cx("chakra-button__spinner", className);
  const marginProp = placement === "start" ? "marginEnd" : "marginStart";
  const spinnerStyles = react.exports.useMemo(
    () => ({
      display: "flex",
      alignItems: "center",
      position: label ? "relative" : "absolute",
      [marginProp]: label ? spacing : 0,
      fontSize: "1em",
      lineHeight: "normal",
      ...__css
    }),
    [__css, label, marginProp, spacing]
  );
  return /* @__PURE__ */ jsx(chakra.div, { className: _className, ...rest, __css: spinnerStyles, children: children2 });
}
ButtonSpinner.displayName = "ButtonSpinner";
var Button = forwardRef((props, ref) => {
  const group = useButtonGroup();
  const styles = useStyleConfig("Button", { ...group, ...props });
  const {
    isDisabled = group == null ? void 0 : group.isDisabled,
    isLoading,
    isActive,
    children: children2,
    leftIcon,
    rightIcon,
    loadingText,
    iconSpacing = "0.5rem",
    type,
    spinner,
    spinnerPlacement = "start",
    className,
    as,
    ...rest
  } = omitThemingProps(props);
  const buttonStyles = react.exports.useMemo(() => {
    const _focus = { ...styles == null ? void 0 : styles["_focus"], zIndex: 1 };
    return {
      display: "inline-flex",
      appearance: "none",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      position: "relative",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      outline: "none",
      ...styles,
      ...!!group && { _focus }
    };
  }, [styles, group]);
  const { ref: _ref, type: defaultType } = useButtonType(as);
  const contentProps = { rightIcon, leftIcon, iconSpacing, children: children2 };
  return /* @__PURE__ */ jsxs(
    chakra.button,
    {
      ref: useMergeRefs(ref, _ref),
      as,
      type: type != null ? type : defaultType,
      "data-active": dataAttr(isActive),
      "data-loading": dataAttr(isLoading),
      __css: buttonStyles,
      className: cx("chakra-button", className),
      ...rest,
      disabled: isDisabled || isLoading,
      children: [
        isLoading && spinnerPlacement === "start" && /* @__PURE__ */ jsx(
          ButtonSpinner,
          {
            className: "chakra-button__spinner--start",
            label: loadingText,
            placement: "start",
            spacing: iconSpacing,
            children: spinner
          }
        ),
        isLoading ? loadingText || /* @__PURE__ */ jsx(chakra.span, { opacity: 0, children: /* @__PURE__ */ jsx(ButtonContent, { ...contentProps }) }) : /* @__PURE__ */ jsx(ButtonContent, { ...contentProps }),
        isLoading && spinnerPlacement === "end" && /* @__PURE__ */ jsx(
          ButtonSpinner,
          {
            className: "chakra-button__spinner--end",
            label: loadingText,
            placement: "end",
            spacing: iconSpacing,
            children: spinner
          }
        )
      ]
    }
  );
});
Button.displayName = "Button";
function ButtonContent(props) {
  const { leftIcon, rightIcon, children: children2, iconSpacing } = props;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    leftIcon && /* @__PURE__ */ jsx(ButtonIcon, { marginEnd: iconSpacing, children: leftIcon }),
    children2,
    rightIcon && /* @__PURE__ */ jsx(ButtonIcon, { marginStart: iconSpacing, children: rightIcon })
  ] });
}
var [FormControlStylesProvider, useFormControlStyles] = createContext({
  name: `FormControlStylesContext`,
  errorMessage: `useFormControlStyles returned is 'undefined'. Seems you forgot to wrap the components in "<FormControl />" `
});
var [FormControlProvider, useFormControlContext] = createContext({
  strict: false,
  name: "FormControlContext"
});
function useFormControlProvider(props) {
  const {
    id: idProp,
    isRequired,
    isInvalid,
    isDisabled,
    isReadOnly,
    ...htmlProps
  } = props;
  const uuid = react.exports.useId();
  const id2 = idProp || `field-${uuid}`;
  const labelId = `${id2}-label`;
  const feedbackId = `${id2}-feedback`;
  const helpTextId = `${id2}-helptext`;
  const [hasFeedbackText, setHasFeedbackText] = react.exports.useState(false);
  const [hasHelpText, setHasHelpText] = react.exports.useState(false);
  const [isFocused, setFocus] = react.exports.useState(false);
  const getHelpTextProps = react.exports.useCallback(
    (props2 = {}, forwardedRef = null) => ({
      id: helpTextId,
      ...props2,
      ref: mergeRefs(forwardedRef, (node2) => {
        if (!node2)
          return;
        setHasHelpText(true);
      })
    }),
    [helpTextId]
  );
  const getLabelProps = react.exports.useCallback(
    (props2 = {}, forwardedRef = null) => {
      var _a2, _b;
      return {
        ...props2,
        ref: forwardedRef,
        "data-focus": dataAttr(isFocused),
        "data-disabled": dataAttr(isDisabled),
        "data-invalid": dataAttr(isInvalid),
        "data-readonly": dataAttr(isReadOnly),
        id: (_a2 = props2.id) != null ? _a2 : labelId,
        htmlFor: (_b = props2.htmlFor) != null ? _b : id2
      };
    },
    [id2, isDisabled, isFocused, isInvalid, isReadOnly, labelId]
  );
  const getErrorMessageProps = react.exports.useCallback(
    (props2 = {}, forwardedRef = null) => ({
      id: feedbackId,
      ...props2,
      ref: mergeRefs(forwardedRef, (node2) => {
        if (!node2)
          return;
        setHasFeedbackText(true);
      }),
      "aria-live": "polite"
    }),
    [feedbackId]
  );
  const getRootProps = react.exports.useCallback(
    (props2 = {}, forwardedRef = null) => ({
      ...props2,
      ...htmlProps,
      ref: forwardedRef,
      role: "group"
    }),
    [htmlProps]
  );
  const getRequiredIndicatorProps = react.exports.useCallback(
    (props2 = {}, forwardedRef = null) => ({
      ...props2,
      ref: forwardedRef,
      role: "presentation",
      "aria-hidden": true,
      children: props2.children || "*"
    }),
    []
  );
  return {
    isRequired: !!isRequired,
    isInvalid: !!isInvalid,
    isReadOnly: !!isReadOnly,
    isDisabled: !!isDisabled,
    isFocused: !!isFocused,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    hasFeedbackText,
    setHasFeedbackText,
    hasHelpText,
    setHasHelpText,
    id: id2,
    labelId,
    feedbackId,
    helpTextId,
    htmlProps,
    getHelpTextProps,
    getErrorMessageProps,
    getRootProps,
    getLabelProps,
    getRequiredIndicatorProps
  };
}
var FormControl = forwardRef(
  function FormControl2(props, ref) {
    const styles = useMultiStyleConfig("Form", props);
    const ownProps = omitThemingProps(props);
    const {
      getRootProps,
      htmlProps: _,
      ...context
    } = useFormControlProvider(ownProps);
    const className = cx("chakra-form-control", props.className);
    return /* @__PURE__ */ jsx(FormControlProvider, { value: context, children: /* @__PURE__ */ jsx(FormControlStylesProvider, { value: styles, children: /* @__PURE__ */ jsx(
      chakra.div,
      {
        ...getRootProps({}, ref),
        className,
        __css: styles["container"]
      }
    ) }) });
  }
);
FormControl.displayName = "FormControl";
var FormHelperText = forwardRef(
  function FormHelperText2(props, ref) {
    const field = useFormControlContext();
    const styles = useFormControlStyles();
    const className = cx("chakra-form__helper-text", props.className);
    return /* @__PURE__ */ jsx(
      chakra.div,
      {
        ...field == null ? void 0 : field.getHelpTextProps(props, ref),
        __css: styles.helperText,
        className
      }
    );
  }
);
FormHelperText.displayName = "FormHelperText";
function useFormControl(props) {
  const { isDisabled, isInvalid, isReadOnly, isRequired, ...rest } = useFormControlProps(props);
  return {
    ...rest,
    disabled: isDisabled,
    readOnly: isReadOnly,
    required: isRequired,
    "aria-invalid": ariaAttr(isInvalid),
    "aria-required": ariaAttr(isRequired),
    "aria-readonly": ariaAttr(isReadOnly)
  };
}
function useFormControlProps(props) {
  var _a2, _b, _c;
  const field = useFormControlContext();
  const {
    id: id2,
    disabled,
    readOnly,
    required,
    isRequired,
    isInvalid,
    isReadOnly,
    isDisabled,
    onFocus,
    onBlur,
    ...rest
  } = props;
  const labelIds = props["aria-describedby"] ? [props["aria-describedby"]] : [];
  if ((field == null ? void 0 : field.hasFeedbackText) && (field == null ? void 0 : field.isInvalid)) {
    labelIds.push(field.feedbackId);
  }
  if (field == null ? void 0 : field.hasHelpText) {
    labelIds.push(field.helpTextId);
  }
  return {
    ...rest,
    "aria-describedby": labelIds.join(" ") || void 0,
    id: id2 != null ? id2 : field == null ? void 0 : field.id,
    isDisabled: (_a2 = disabled != null ? disabled : isDisabled) != null ? _a2 : field == null ? void 0 : field.isDisabled,
    isReadOnly: (_b = readOnly != null ? readOnly : isReadOnly) != null ? _b : field == null ? void 0 : field.isReadOnly,
    isRequired: (_c = required != null ? required : isRequired) != null ? _c : field == null ? void 0 : field.isRequired,
    isInvalid: isInvalid != null ? isInvalid : field == null ? void 0 : field.isInvalid,
    onFocus: callAllHandlers(field == null ? void 0 : field.onFocus, onFocus),
    onBlur: callAllHandlers(field == null ? void 0 : field.onBlur, onBlur)
  };
}
function useEventListener(target, event, handler, options) {
  const listener = useCallbackRef(handler);
  react.exports.useEffect(() => {
    const node2 = typeof target === "function" ? target() : target != null ? target : document;
    if (!handler || !node2)
      return;
    node2.addEventListener(event, listener, options);
    return () => {
      node2.removeEventListener(event, listener, options);
    };
  }, [event, target, options, listener, handler]);
  return () => {
    const node2 = typeof target === "function" ? target() : target != null ? target : document;
    node2 == null ? void 0 : node2.removeEventListener(event, listener, options);
  };
}
var Input = forwardRef(function Input2(props, ref) {
  const { htmlSize, ...rest } = props;
  const styles = useMultiStyleConfig("Input", rest);
  const ownProps = omitThemingProps(rest);
  const input = useFormControl(ownProps);
  const _className = cx("chakra-input", props.className);
  return /* @__PURE__ */ jsx(
    chakra.input,
    {
      size: htmlSize,
      ...input,
      __css: styles.field,
      ref,
      className: _className
    }
  );
});
Input.displayName = "Input";
Input.id = "Input";
Object.freeze([
  "base",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl"
]);
function mapResponsive(prop, mapper) {
  if (Array.isArray(prop)) {
    return prop.map((item) => item === null ? null : mapper(item));
  }
  if (isObject(prop)) {
    return Object.keys(prop).reduce((result, key) => {
      result[key] = mapper(prop[key]);
      return result;
    }, {});
  }
  if (prop != null) {
    return mapper(prop);
  }
  return null;
}
var Text = forwardRef(function Text2(props, ref) {
  const styles = useStyleConfig("Text", props);
  const { className, align, decoration, casing, ...rest } = omitThemingProps(props);
  const aliasedProps = compact({
    textAlign: props.align,
    textDecoration: props.decoration,
    textTransform: props.casing
  });
  return /* @__PURE__ */ jsx(
    chakra.p,
    {
      ref,
      className: cx("chakra-text", props.className),
      ...aliasedProps,
      ...rest,
      __css: styles
    }
  );
});
Text.displayName = "Text";
var StackItem = (props) => /* @__PURE__ */ jsx(
  chakra.div,
  {
    className: "chakra-stack__item",
    ...props,
    __css: {
      display: "inline-block",
      flex: "0 0 auto",
      minWidth: 0,
      ...props["__css"]
    }
  }
);
StackItem.displayName = "StackItem";
var selector = "& > *:not(style) ~ *:not(style)";
function getStackStyles(options) {
  const { spacing, direction } = options;
  const directionStyles = {
    column: {
      marginTop: spacing,
      marginEnd: 0,
      marginBottom: 0,
      marginStart: 0
    },
    row: { marginTop: 0, marginEnd: 0, marginBottom: 0, marginStart: spacing },
    "column-reverse": {
      marginTop: 0,
      marginEnd: 0,
      marginBottom: spacing,
      marginStart: 0
    },
    "row-reverse": {
      marginTop: 0,
      marginEnd: spacing,
      marginBottom: 0,
      marginStart: 0
    }
  };
  return {
    flexDirection: direction,
    [selector]: mapResponsive(
      direction,
      (value) => directionStyles[value]
    )
  };
}
function getDividerStyles(options) {
  const { spacing, direction } = options;
  const dividerStyles = {
    column: {
      my: spacing,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    },
    "column-reverse": {
      my: spacing,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    },
    row: {
      mx: spacing,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0
    },
    "row-reverse": {
      mx: spacing,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0
    }
  };
  return {
    "&": mapResponsive(
      direction,
      (value) => dividerStyles[value]
    )
  };
}
var Stack = forwardRef((props, ref) => {
  const {
    isInline,
    direction: directionProp,
    align,
    justify,
    spacing = "0.5rem",
    wrap: wrap2,
    children: children2,
    divider,
    className,
    shouldWrapChildren,
    ...rest
  } = props;
  const direction = isInline ? "row" : directionProp != null ? directionProp : "column";
  const styles = react.exports.useMemo(
    () => getStackStyles({ direction, spacing }),
    [direction, spacing]
  );
  const dividerStyle = react.exports.useMemo(
    () => getDividerStyles({ spacing, direction }),
    [spacing, direction]
  );
  const hasDivider = !!divider;
  const shouldUseChildren = !shouldWrapChildren && !hasDivider;
  const clones = react.exports.useMemo(() => {
    const validChildren = getValidChildren(children2);
    return shouldUseChildren ? validChildren : validChildren.map((child, index2) => {
      const key = typeof child.key !== "undefined" ? child.key : index2;
      const isLast = index2 + 1 === validChildren.length;
      const wrappedChild = /* @__PURE__ */ jsx(StackItem, { children: child }, key);
      const _child = shouldWrapChildren ? wrappedChild : child;
      if (!hasDivider)
        return _child;
      const clonedDivider = react.exports.cloneElement(
        divider,
        {
          __css: dividerStyle
        }
      );
      const _divider = isLast ? null : clonedDivider;
      return /* @__PURE__ */ jsxs(react.exports.Fragment, { children: [
        _child,
        _divider
      ] }, key);
    });
  }, [
    divider,
    dividerStyle,
    hasDivider,
    shouldUseChildren,
    shouldWrapChildren,
    children2
  ]);
  const _className = cx("chakra-stack", className);
  return /* @__PURE__ */ jsx(
    chakra.div,
    {
      ref,
      display: "flex",
      alignItems: align,
      justifyContent: justify,
      flexDirection: styles.flexDirection,
      flexWrap: wrap2,
      className: _className,
      __css: hasDivider ? {} : { [selector]: styles[selector] },
      ...rest,
      children: clones
    }
  );
});
Stack.displayName = "Stack";
var VStack = forwardRef((props, ref) => /* @__PURE__ */ jsx(Stack, { align: "center", ...props, direction: "column", ref }));
VStack.displayName = "VStack";
var HStack = forwardRef((props, ref) => /* @__PURE__ */ jsx(Stack, { align: "center", ...props, direction: "row", ref }));
HStack.displayName = "HStack";
var Box = chakra("div");
Box.displayName = "Box";
var Square = forwardRef(function Square2(props, ref) {
  const { size, centerContent = true, ...rest } = props;
  const styles = centerContent ? { display: "flex", alignItems: "center", justifyContent: "center" } : {};
  return /* @__PURE__ */ jsx(
    Box,
    {
      ref,
      boxSize: size,
      __css: {
        ...styles,
        flexShrink: 0,
        flexGrow: 0
      },
      ...rest
    }
  );
});
Square.displayName = "Square";
var Circle = forwardRef(function Circle2(props, ref) {
  const { size, ...rest } = props;
  return /* @__PURE__ */ jsx(Square, { size, ref, borderRadius: "9999px", ...rest });
});
Circle.displayName = "Circle";
var toVar = (value, fallback) => ({
  var: value,
  varRef: fallback ? `var(${value}, ${fallback})` : `var(${value})`
});
var cssVars = {
  arrowShadowColor: toVar("--popper-arrow-shadow-color"),
  arrowSize: toVar("--popper-arrow-size", "8px"),
  arrowSizeHalf: toVar("--popper-arrow-size-half"),
  arrowBg: toVar("--popper-arrow-bg"),
  transformOrigin: toVar("--popper-transform-origin"),
  arrowOffset: toVar("--popper-arrow-offset")
};
function getBoxShadow(placement) {
  if (placement.includes("top"))
    return `1px 1px 1px 0 var(--popper-arrow-shadow-color)`;
  if (placement.includes("bottom"))
    return `-1px -1px 1px 0 var(--popper-arrow-shadow-color)`;
  if (placement.includes("right"))
    return `-1px 1px 1px 0 var(--popper-arrow-shadow-color)`;
  if (placement.includes("left"))
    return `1px -1px 1px 0 var(--popper-arrow-shadow-color)`;
}
var transforms = {
  top: "bottom center",
  "top-start": "bottom left",
  "top-end": "bottom right",
  bottom: "top center",
  "bottom-start": "top left",
  "bottom-end": "top right",
  left: "right center",
  "left-start": "right top",
  "left-end": "right bottom",
  right: "left center",
  "right-start": "left top",
  "right-end": "left bottom"
};
var toTransformOrigin = (placement) => transforms[placement];
var defaultEventListeners = {
  scroll: true,
  resize: true
};
function getEventListenerOptions(value) {
  let eventListeners2;
  if (typeof value === "object") {
    eventListeners2 = {
      enabled: true,
      options: { ...defaultEventListeners, ...value }
    };
  } else {
    eventListeners2 = {
      enabled: value,
      options: defaultEventListeners
    };
  }
  return eventListeners2;
}
var matchWidth = {
  name: "matchWidth",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: ({ state: state2 }) => {
    state2.styles.popper.width = `${state2.rects.reference.width}px`;
  },
  effect: ({ state: state2 }) => () => {
    const reference2 = state2.elements.reference;
    state2.elements.popper.style.width = `${reference2.offsetWidth}px`;
  }
};
var transformOrigin = {
  name: "transformOrigin",
  enabled: true,
  phase: "write",
  fn: ({ state: state2 }) => {
    setTransformOrigin(state2);
  },
  effect: ({ state: state2 }) => () => {
    setTransformOrigin(state2);
  }
};
var setTransformOrigin = (state2) => {
  state2.elements.popper.style.setProperty(
    cssVars.transformOrigin.var,
    toTransformOrigin(state2.placement)
  );
};
var positionArrow = {
  name: "positionArrow",
  enabled: true,
  phase: "afterWrite",
  fn: ({ state: state2 }) => {
    setArrowStyles(state2);
  }
};
var setArrowStyles = (state2) => {
  var _a2;
  if (!state2.placement)
    return;
  const overrides = getArrowStyle$1(state2.placement);
  if (((_a2 = state2.elements) == null ? void 0 : _a2.arrow) && overrides) {
    Object.assign(state2.elements.arrow.style, {
      [overrides.property]: overrides.value,
      width: cssVars.arrowSize.varRef,
      height: cssVars.arrowSize.varRef,
      zIndex: -1
    });
    const vars = {
      [cssVars.arrowSizeHalf.var]: `calc(${cssVars.arrowSize.varRef} / 2)`,
      [cssVars.arrowOffset.var]: `calc(${cssVars.arrowSizeHalf.varRef} * -1)`
    };
    for (const property in vars) {
      state2.elements.arrow.style.setProperty(property, vars[property]);
    }
  }
};
var getArrowStyle$1 = (placement) => {
  if (placement.startsWith("top")) {
    return { property: "bottom", value: cssVars.arrowOffset.varRef };
  }
  if (placement.startsWith("bottom")) {
    return { property: "top", value: cssVars.arrowOffset.varRef };
  }
  if (placement.startsWith("left")) {
    return { property: "right", value: cssVars.arrowOffset.varRef };
  }
  if (placement.startsWith("right")) {
    return { property: "left", value: cssVars.arrowOffset.varRef };
  }
};
var innerArrow = {
  name: "innerArrow",
  enabled: true,
  phase: "main",
  requires: ["arrow"],
  fn: ({ state: state2 }) => {
    setInnerArrowStyles(state2);
  },
  effect: ({ state: state2 }) => () => {
    setInnerArrowStyles(state2);
  }
};
var setInnerArrowStyles = (state2) => {
  if (!state2.elements.arrow)
    return;
  const inner = state2.elements.arrow.querySelector(
    "[data-popper-arrow-inner]"
  );
  if (!inner)
    return;
  const boxShadow = getBoxShadow(state2.placement);
  if (boxShadow) {
    inner.style.setProperty("--popper-arrow-default-shadow", boxShadow);
  }
  Object.assign(inner.style, {
    transform: "rotate(45deg)",
    background: cssVars.arrowBg.varRef,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "inherit",
    boxShadow: `var(--popper-arrow-shadow, var(--popper-arrow-default-shadow))`
  });
};
var logicals = {
  "start-start": { ltr: "left-start", rtl: "right-start" },
  "start-end": { ltr: "left-end", rtl: "right-end" },
  "end-start": { ltr: "right-start", rtl: "left-start" },
  "end-end": { ltr: "right-end", rtl: "left-end" },
  start: { ltr: "left", rtl: "right" },
  end: { ltr: "right", rtl: "left" }
};
var opposites = {
  "auto-start": "auto-end",
  "auto-end": "auto-start",
  "top-start": "top-end",
  "top-end": "top-start",
  "bottom-start": "bottom-end",
  "bottom-end": "bottom-start"
};
function getPopperPlacement(placement, dir = "ltr") {
  var _a2, _b;
  const value = ((_a2 = logicals[placement]) == null ? void 0 : _a2[dir]) || placement;
  if (dir === "ltr")
    return value;
  return (_b = opposites[placement]) != null ? _b : value;
}
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start$2 = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start$2, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start$2, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getWindow(node2) {
  if (node2 == null) {
    return window;
  }
  if (node2.toString() !== "[object Window]") {
    var ownerDocument = node2.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node2;
}
function isElement(node2) {
  var OwnElement = getWindow(node2).Element;
  return node2 instanceof OwnElement || node2 instanceof Element;
}
function isHTMLElement(node2) {
  var OwnElement = getWindow(node2).HTMLElement;
  return node2 instanceof OwnElement || node2 instanceof HTMLElement;
}
function isShadowRoot(node2) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node2).ShadowRoot;
  return node2 instanceof OwnElement || node2 instanceof ShadowRoot;
}
function applyStyles(_ref) {
  var state2 = _ref.state;
  Object.keys(state2.elements).forEach(function(name) {
    var style = state2.styles[name] || {};
    var attributes = state2.attributes[name] || {};
    var element = state2.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect$2(_ref2) {
  var state2 = _ref2.state;
  var initialStyles = {
    popper: {
      position: state2.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state2.elements.popper.style, initialStyles.popper);
  state2.styles = initialStyles;
  if (state2.elements.arrow) {
    Object.assign(state2.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state2.elements).forEach(function(name) {
      var element = state2.elements[name];
      var attributes = state2.attributes[name] || {};
      var styleProperties = Object.keys(state2.styles.hasOwnProperty(name) ? state2.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
const applyStyles$1 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect$2,
  requires: ["computeStyles"]
};
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
var max = Math.max;
var min = Math.min;
var round = Math.round;
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x2 = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y2 = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y2,
    right: x2 + width,
    bottom: y2 + height,
    left: x2,
    x: x2,
    y: y2
  };
}
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next2 = child;
    do {
      if (next2 && parent.isSameNode(next2)) {
        return true;
      }
      next2 = next2.parentNode || next2.host;
    } while (next2);
  }
  return false;
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle$1(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css2 = getComputedStyle$1(currentNode);
    if (css2.transform !== "none" || css2.perspective !== "none" || css2.contain === "paint" || ["transform", "perspective"].indexOf(css2.willChange) !== -1 || isFirefox && css2.willChange === "filter" || isFirefox && css2.filter && css2.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min2, value, max2) {
  var v2 = within(min2, value, max2);
  return v2 > max2 ? max2 : v2;
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
function expandToHashMap(value, keys2) {
  return keys2.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
var toPaddingObject = function toPaddingObject2(padding, state2) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state2.rects, {
    placement: state2.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state2 = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state2.elements.arrow;
  var popperOffsets2 = state2.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state2.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state2);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state2.rects.reference[len] + state2.rects.reference[axis] - popperOffsets2[axis] - state2.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state2.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state2.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect$1(_ref2) {
  var state2 = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state2.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state2.elements.popper, arrowElement)) {
    return;
  }
  state2.elements.arrow = arrowElement;
}
const arrow$1 = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect$1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function getVariation(placement) {
  return placement.split("-")[1];
}
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x2 = _ref.x, y2 = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x2 * dpr) / dpr || 0,
    y: round(y2 * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position2 = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x2 = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y2 = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x: x2,
    y: y2
  }) : {
    x: x2,
    y: y2
  };
  x2 = _ref3.x;
  y2 = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle$1(offsetParent).position !== "static" && position2 === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y2 -= offsetY - popperRect.height;
      y2 *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x2 -= offsetX - popperRect.width;
      x2 *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position: position2
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x2,
    y: y2
  }) : {
    x: x2,
    y: y2
  };
  x2 = _ref4.x;
  y2 = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x2 + "px, " + y2 + "px)" : "translate3d(" + x2 + "px, " + y2 + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y2 + "px" : "", _Object$assign2[sideX] = hasX ? x2 + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state2 = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state2.placement),
    variation: getVariation(state2.placement),
    popper: state2.elements.popper,
    popperRect: state2.rects.popper,
    gpuAcceleration,
    isFixed: state2.options.strategy === "fixed"
  };
  if (state2.modifiersData.popperOffsets != null) {
    state2.styles.popper = Object.assign({}, state2.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state2.modifiersData.popperOffsets,
      position: state2.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state2.modifiersData.arrow != null) {
    state2.styles.arrow = Object.assign({}, state2.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state2.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state2.attributes.popper = Object.assign({}, state2.attributes.popper, {
    "data-popper-placement": state2.placement
  });
}
const computeStyles$1 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
var passive = {
  passive: true
};
function effect(_ref) {
  var state2 = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll2 = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state2.elements.popper);
  var scrollParents = [].concat(state2.scrollParents.reference, state2.scrollParents.popper);
  if (scroll2) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll2) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
const eventListeners = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash$1[matched];
  });
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash[matched];
  });
}
function getWindowScroll(node2) {
  var win = getWindow(node2);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x2 = 0;
  var y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x2 = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x2 + getWindowScrollBarX(element),
    y: y2
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x2 = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y2 = -winScroll.scrollTop;
  if (getComputedStyle$1(body || html).direction === "rtl") {
    x2 += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle$1(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function getScrollParent(node2) {
  if (["html", "body", "#document"].indexOf(getNodeName(node2)) >= 0) {
    return node2.ownerDocument.body;
  }
  if (isHTMLElement(node2) && isScrollParent(node2)) {
    return node2;
  }
  return getScrollParent(getParentNode(node2));
}
function listScrollParents(element, list2) {
  var _element$ownerDocumen;
  if (list2 === void 0) {
    list2 = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list2.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle$1(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start$2:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
    }
  }
  return offsets;
}
function detectOverflow(state2, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state2.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state2.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state2.rects.popper;
  var element = state2.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state2.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state2.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state2.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply2 = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply2;
    });
  }
  return overflowOffsets;
}
function computeAutoPlacement(state2, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state2, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b2) {
    return overflows[a] - overflows[b2];
  });
}
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state2 = _ref.state, options = _ref.options, name = _ref.name;
  if (state2.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state2.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state2, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state2.rects.reference;
  var popperRect = state2.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start$2;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state2, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state2.placement !== firstFittingPlacement) {
    state2.modifiersData[name]._skip = true;
    state2.placement = firstFittingPlacement;
    state2.reset = true;
  }
}
const flip$1 = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state2 = _ref.state, name = _ref.name;
  var referenceRect = state2.rects.reference;
  var popperRect = state2.rects.popper;
  var preventedOffsets = state2.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state2, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state2, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state2.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state2.attributes.popper = Object.assign({}, state2.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
const hide$1 = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance2 = _ref[1];
  skidding = skidding || 0;
  distance2 = (distance2 || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance2,
    y: skidding
  } : {
    x: skidding,
    y: distance2
  };
}
function offset(_ref2) {
  var state2 = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state2.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state2.placement], x2 = _data$state$placement.x, y2 = _data$state$placement.y;
  if (state2.modifiersData.popperOffsets != null) {
    state2.modifiersData.popperOffsets.x += x2;
    state2.modifiersData.popperOffsets.y += y2;
  }
  state2.modifiersData[name] = data;
}
const offset$1 = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
function popperOffsets(_ref) {
  var state2 = _ref.state, name = _ref.name;
  state2.modifiersData[name] = computeOffsets({
    reference: state2.rects.reference,
    element: state2.rects.popper,
    strategy: "absolute",
    placement: state2.placement
  });
}
const popperOffsets$1 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function preventOverflow(_ref) {
  var state2 = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state2, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state2.placement);
  var variation = getVariation(state2.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state2.modifiersData.popperOffsets;
  var referenceRect = state2.rects.reference;
  var popperRect = state2.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state2.rects, {
    placement: state2.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state2.modifiersData.offset ? state2.modifiersData.offset[state2.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min$1 = offset2 + overflow[mainSide];
    var max$1 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start$2 ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start$2 ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state2.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state2.modifiersData["arrow#persistent"] ? state2.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state2.elements.arrow && getOffsetParent(state2.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state2.modifiersData[name] = data;
}
const preventOverflow$1 = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node2) {
  if (node2 === getWindow(node2) || !isHTMLElement(node2)) {
    return getWindowScroll(node2);
  } else {
    return getHTMLElementScroll(node2);
  }
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll2 = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll2 = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll2.scrollLeft - offsets.x,
    y: rect.top + scroll2.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions2 = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions2;
    }
    var state2 = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions2),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state2,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state2.options) : setOptionsAction;
        cleanupModifierEffects();
        state2.options = Object.assign({}, defaultOptions2, state2.options, options2);
        state2.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state2.options.modifiers)));
        state2.orderedModifiers = orderedModifiers.filter(function(m2) {
          return m2.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state2.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state2.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state2.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state2.reset = false;
        state2.placement = state2.options.placement;
        state2.orderedModifiers.forEach(function(modifier) {
          return state2.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index2 = 0; index2 < state2.orderedModifiers.length; index2++) {
          if (state2.reset === true) {
            state2.reset = false;
            index2 = -1;
            continue;
          }
          var _state$orderedModifie = state2.orderedModifiers[index2], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state2 = fn2({
              state: state2,
              options: _options,
              name,
              instance
            }) || state2;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state2);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state3) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state3);
      }
    });
    function runModifierEffects() {
      state2.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect2 = _ref3.effect;
        if (typeof effect2 === "function") {
          var cleanupFn = effect2({
            state: state2,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
function usePopper(props = {}) {
  const {
    enabled = true,
    modifiers,
    placement: placementProp = "bottom",
    strategy = "absolute",
    arrowPadding = 8,
    eventListeners: eventListeners2 = true,
    offset: offset2,
    gutter = 8,
    flip: flip2 = true,
    boundary = "clippingParents",
    preventOverflow: preventOverflow2 = true,
    matchWidth: matchWidth2,
    direction = "ltr"
  } = props;
  const reference2 = react.exports.useRef(null);
  const popper2 = react.exports.useRef(null);
  const instance = react.exports.useRef(null);
  const placement = getPopperPlacement(placementProp, direction);
  const cleanup = react.exports.useRef(() => {
  });
  const setupPopper = react.exports.useCallback(() => {
    var _a2;
    if (!enabled || !reference2.current || !popper2.current)
      return;
    (_a2 = cleanup.current) == null ? void 0 : _a2.call(cleanup);
    instance.current = createPopper(reference2.current, popper2.current, {
      placement,
      modifiers: [
        innerArrow,
        positionArrow,
        transformOrigin,
        {
          ...matchWidth,
          enabled: !!matchWidth2
        },
        {
          name: "eventListeners",
          ...getEventListenerOptions(eventListeners2)
        },
        {
          name: "arrow",
          options: { padding: arrowPadding }
        },
        {
          name: "offset",
          options: {
            offset: offset2 != null ? offset2 : [0, gutter]
          }
        },
        {
          name: "flip",
          enabled: !!flip2,
          options: { padding: 8 }
        },
        {
          name: "preventOverflow",
          enabled: !!preventOverflow2,
          options: { boundary }
        },
        ...modifiers != null ? modifiers : []
      ],
      strategy
    });
    instance.current.forceUpdate();
    cleanup.current = instance.current.destroy;
  }, [
    placement,
    enabled,
    modifiers,
    matchWidth2,
    eventListeners2,
    arrowPadding,
    offset2,
    gutter,
    flip2,
    preventOverflow2,
    boundary,
    strategy
  ]);
  react.exports.useEffect(() => {
    return () => {
      var _a2;
      if (!reference2.current && !popper2.current) {
        (_a2 = instance.current) == null ? void 0 : _a2.destroy();
        instance.current = null;
      }
    };
  }, []);
  const referenceRef = react.exports.useCallback(
    (node2) => {
      reference2.current = node2;
      setupPopper();
    },
    [setupPopper]
  );
  const getReferenceProps = react.exports.useCallback(
    (props2 = {}, ref = null) => ({
      ...props2,
      ref: mergeRefs(referenceRef, ref)
    }),
    [referenceRef]
  );
  const popperRef = react.exports.useCallback(
    (node2) => {
      popper2.current = node2;
      setupPopper();
    },
    [setupPopper]
  );
  const getPopperProps = react.exports.useCallback(
    (props2 = {}, ref = null) => ({
      ...props2,
      ref: mergeRefs(popperRef, ref),
      style: {
        ...props2.style,
        position: strategy,
        minWidth: matchWidth2 ? void 0 : "max-content",
        inset: "0 auto auto 0"
      }
    }),
    [strategy, popperRef, matchWidth2]
  );
  const getArrowProps = react.exports.useCallback((props2 = {}, ref = null) => {
    const { size, shadowColor, bg, style, ...rest } = props2;
    return {
      ...rest,
      ref,
      "data-popper-arrow": "",
      style: getArrowStyle(props2)
    };
  }, []);
  const getArrowInnerProps = react.exports.useCallback(
    (props2 = {}, ref = null) => ({
      ...props2,
      ref,
      "data-popper-arrow-inner": ""
    }),
    []
  );
  return {
    update() {
      var _a2;
      (_a2 = instance.current) == null ? void 0 : _a2.update();
    },
    forceUpdate() {
      var _a2;
      (_a2 = instance.current) == null ? void 0 : _a2.forceUpdate();
    },
    transformOrigin: cssVars.transformOrigin.varRef,
    referenceRef,
    popperRef,
    getPopperProps,
    getArrowProps,
    getArrowInnerProps,
    getReferenceProps
  };
}
function getArrowStyle(props) {
  const { size, shadowColor, bg, style } = props;
  const computedStyle = { ...style, position: "absolute" };
  if (size) {
    computedStyle["--popper-arrow-size"] = size;
  }
  if (shadowColor) {
    computedStyle["--popper-arrow-shadow-color"] = shadowColor;
  }
  if (bg) {
    computedStyle["--popper-arrow-bg"] = bg;
  }
  return computedStyle;
}
function useDisclosure(props = {}) {
  const {
    onClose: onCloseProp,
    onOpen: onOpenProp,
    isOpen: isOpenProp,
    id: idProp
  } = props;
  const handleOpen = useCallbackRef(onOpenProp);
  const handleClose = useCallbackRef(onCloseProp);
  const [isOpenState, setIsOpen] = react.exports.useState(props.defaultIsOpen || false);
  const isOpen = isOpenProp !== void 0 ? isOpenProp : isOpenState;
  const isControlled = isOpenProp !== void 0;
  const uid = react.exports.useId();
  const id2 = idProp != null ? idProp : `disclosure-${uid}`;
  const onClose = react.exports.useCallback(() => {
    if (!isControlled) {
      setIsOpen(false);
    }
    handleClose == null ? void 0 : handleClose();
  }, [isControlled, handleClose]);
  const onOpen = react.exports.useCallback(() => {
    if (!isControlled) {
      setIsOpen(true);
    }
    handleOpen == null ? void 0 : handleOpen();
  }, [isControlled, handleOpen]);
  const onToggle = react.exports.useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onOpen, onClose]);
  function getButtonProps(props2 = {}) {
    return {
      ...props2,
      "aria-expanded": isOpen,
      "aria-controls": id2,
      onClick(event) {
        var _a2;
        (_a2 = props2.onClick) == null ? void 0 : _a2.call(props2, event);
        onToggle();
      }
    };
  }
  function getDisclosureProps(props2 = {}) {
    return {
      ...props2,
      hidden: !isOpen,
      id: id2
    };
  }
  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    isControlled,
    getButtonProps,
    getDisclosureProps
  };
}
var scale = {
  exit: {
    scale: 0.85,
    opacity: 0,
    transition: {
      opacity: { duration: 0.15, easings: "easeInOut" },
      scale: { duration: 0.2, easings: "easeInOut" }
    }
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      opacity: { easings: "easeOut", duration: 0.2 },
      scale: { duration: 0.2, ease: [0.175, 0.885, 0.4, 1.1] }
    }
  }
};
var getDoc = (ref) => {
  var _a2;
  return ((_a2 = ref.current) == null ? void 0 : _a2.ownerDocument) || document;
};
var getWin = (ref) => {
  var _a2, _b;
  return ((_b = (_a2 = ref.current) == null ? void 0 : _a2.ownerDocument) == null ? void 0 : _b.defaultView) || window;
};
function useTooltip(props = {}) {
  const {
    openDelay = 0,
    closeDelay = 0,
    closeOnClick = true,
    closeOnMouseDown,
    closeOnScroll,
    closeOnPointerDown = closeOnMouseDown,
    closeOnEsc = true,
    onOpen: onOpenProp,
    onClose: onCloseProp,
    placement,
    id: id2,
    isOpen: isOpenProp,
    defaultIsOpen,
    arrowSize = 10,
    arrowShadowColor,
    arrowPadding,
    modifiers,
    isDisabled,
    gutter,
    offset: offset2,
    direction,
    ...htmlProps
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure({
    isOpen: isOpenProp,
    defaultIsOpen,
    onOpen: onOpenProp,
    onClose: onCloseProp
  });
  const { referenceRef, getPopperProps, getArrowInnerProps, getArrowProps } = usePopper({
    enabled: isOpen,
    placement,
    arrowPadding,
    modifiers,
    gutter,
    offset: offset2,
    direction
  });
  const uuid = react.exports.useId();
  const uid = id2 != null ? id2 : uuid;
  const tooltipId = `tooltip-${uid}`;
  const ref = react.exports.useRef(null);
  const enterTimeout = react.exports.useRef();
  const clearEnterTimeout = react.exports.useCallback(() => {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
      enterTimeout.current = void 0;
    }
  }, []);
  const exitTimeout = react.exports.useRef();
  const clearExitTimeout = react.exports.useCallback(() => {
    if (exitTimeout.current) {
      clearTimeout(exitTimeout.current);
      exitTimeout.current = void 0;
    }
  }, []);
  const closeNow = react.exports.useCallback(() => {
    clearExitTimeout();
    onClose();
  }, [onClose, clearExitTimeout]);
  const dispatchCloseEvent = useCloseEvent(ref, closeNow);
  const openWithDelay = react.exports.useCallback(() => {
    if (!isDisabled && !enterTimeout.current) {
      dispatchCloseEvent();
      const win = getWin(ref);
      enterTimeout.current = win.setTimeout(onOpen, openDelay);
    }
  }, [dispatchCloseEvent, isDisabled, onOpen, openDelay]);
  const closeWithDelay = react.exports.useCallback(() => {
    clearEnterTimeout();
    const win = getWin(ref);
    exitTimeout.current = win.setTimeout(closeNow, closeDelay);
  }, [closeDelay, closeNow, clearEnterTimeout]);
  const onClick = react.exports.useCallback(() => {
    if (isOpen && closeOnClick) {
      closeWithDelay();
    }
  }, [closeOnClick, closeWithDelay, isOpen]);
  const onPointerDown = react.exports.useCallback(() => {
    if (isOpen && closeOnPointerDown) {
      closeWithDelay();
    }
  }, [closeOnPointerDown, closeWithDelay, isOpen]);
  const onKeyDown = react.exports.useCallback(
    (event) => {
      if (isOpen && event.key === "Escape") {
        closeWithDelay();
      }
    },
    [isOpen, closeWithDelay]
  );
  useEventListener(
    () => getDoc(ref),
    "keydown",
    closeOnEsc ? onKeyDown : void 0
  );
  useEventListener(
    () => getDoc(ref),
    "scroll",
    () => {
      if (isOpen && closeOnScroll) {
        closeNow();
      }
    }
  );
  react.exports.useEffect(() => {
    if (!isDisabled)
      return;
    clearEnterTimeout();
    if (isOpen)
      onClose();
  }, [isDisabled, isOpen, onClose, clearEnterTimeout]);
  react.exports.useEffect(
    () => () => {
      clearEnterTimeout();
      clearExitTimeout();
    },
    [clearEnterTimeout, clearExitTimeout]
  );
  useEventListener(() => ref.current, "pointerleave", closeWithDelay);
  const getTriggerProps = react.exports.useCallback(
    (props2 = {}, _ref = null) => {
      const triggerProps = {
        ...props2,
        ref: mergeRefs(ref, _ref, referenceRef),
        onPointerEnter: callAllHandlers(props2.onPointerEnter, (e2) => {
          if (e2.pointerType === "touch")
            return;
          openWithDelay();
        }),
        onClick: callAllHandlers(props2.onClick, onClick),
        onPointerDown: callAllHandlers(props2.onPointerDown, onPointerDown),
        onFocus: callAllHandlers(props2.onFocus, openWithDelay),
        onBlur: callAllHandlers(props2.onBlur, closeWithDelay),
        "aria-describedby": isOpen ? tooltipId : void 0
      };
      return triggerProps;
    },
    [
      openWithDelay,
      closeWithDelay,
      onPointerDown,
      isOpen,
      tooltipId,
      onClick,
      referenceRef
    ]
  );
  const getTooltipPositionerProps = react.exports.useCallback(
    (props2 = {}, forwardedRef = null) => getPopperProps(
      {
        ...props2,
        style: {
          ...props2.style,
          [cssVars.arrowSize.var]: arrowSize ? `${arrowSize}px` : void 0,
          [cssVars.arrowShadowColor.var]: arrowShadowColor
        }
      },
      forwardedRef
    ),
    [getPopperProps, arrowSize, arrowShadowColor]
  );
  const getTooltipProps = react.exports.useCallback(
    (props2 = {}, ref2 = null) => {
      const styles = {
        ...props2.style,
        position: "relative",
        transformOrigin: cssVars.transformOrigin.varRef
      };
      return {
        ref: ref2,
        ...htmlProps,
        ...props2,
        id: tooltipId,
        role: "tooltip",
        style: styles
      };
    },
    [htmlProps, tooltipId]
  );
  return {
    isOpen,
    show: openWithDelay,
    hide: closeWithDelay,
    getTriggerProps,
    getTooltipProps,
    getTooltipPositionerProps,
    getArrowProps,
    getArrowInnerProps
  };
}
var closeEventName = "chakra-ui:close-tooltip";
function useCloseEvent(ref, close) {
  react.exports.useEffect(() => {
    const doc = getDoc(ref);
    doc.addEventListener(closeEventName, close);
    return () => doc.removeEventListener(closeEventName, close);
  }, [close, ref]);
  return () => {
    const doc = getDoc(ref);
    const win = getWin(ref);
    doc.dispatchEvent(new win.CustomEvent(closeEventName));
  };
}
function omit(object, keysToOmit = []) {
  const clone = Object.assign({}, object);
  for (const key of keysToOmit) {
    if (key in clone) {
      delete clone[key];
    }
  }
  return clone;
}
function pick(object, keysToPick) {
  const result = {};
  for (const key of keysToPick) {
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}
var MotionDiv = chakra(motion.div);
var Tooltip = forwardRef((props, ref) => {
  var _a2, _b;
  const styles = useStyleConfig("Tooltip", props);
  const ownProps = omitThemingProps(props);
  const theme = useTheme();
  const {
    children: children2,
    label,
    shouldWrapChildren,
    "aria-label": ariaLabel,
    hasArrow,
    bg,
    portalProps,
    background: background2,
    backgroundColor,
    bgColor,
    motionProps,
    ...rest
  } = ownProps;
  const userDefinedBg = (_b = (_a2 = background2 != null ? background2 : backgroundColor) != null ? _a2 : bg) != null ? _b : bgColor;
  if (userDefinedBg) {
    styles.bg = userDefinedBg;
    const bgVar = getCSSVar(theme, "colors", userDefinedBg);
    styles[cssVars.arrowBg.var] = bgVar;
  }
  const tooltip = useTooltip({ ...rest, direction: theme.direction });
  const shouldWrap = typeof children2 === "string" || shouldWrapChildren;
  let trigger;
  if (shouldWrap) {
    trigger = /* @__PURE__ */ jsx(
      chakra.span,
      {
        display: "inline-block",
        tabIndex: 0,
        ...tooltip.getTriggerProps(),
        children: children2
      }
    );
  } else {
    const child = react.exports.Children.only(children2);
    trigger = react.exports.cloneElement(
      child,
      tooltip.getTriggerProps(child.props, child.ref)
    );
  }
  const hasAriaLabel = !!ariaLabel;
  const _tooltipProps = tooltip.getTooltipProps({}, ref);
  const tooltipProps = hasAriaLabel ? omit(_tooltipProps, ["role", "id"]) : _tooltipProps;
  const srOnlyProps = pick(_tooltipProps, ["role", "id"]);
  if (!label) {
    return /* @__PURE__ */ jsx(Fragment, { children: children2 });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    trigger,
    /* @__PURE__ */ jsx(AnimatePresence, { children: tooltip.isOpen && /* @__PURE__ */ jsx(Portal, { ...portalProps, children: /* @__PURE__ */ jsx(
      chakra.div,
      {
        ...tooltip.getTooltipPositionerProps(),
        __css: {
          zIndex: styles.zIndex,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ jsxs(
          MotionDiv,
          {
            variants: scale,
            initial: "exit",
            animate: "enter",
            exit: "exit",
            ...motionProps,
            ...tooltipProps,
            __css: styles,
            children: [
              label,
              hasAriaLabel && /* @__PURE__ */ jsx(chakra.span, { srOnly: true, ...srOnlyProps, children: ariaLabel }),
              hasArrow && /* @__PURE__ */ jsx(
                chakra.div,
                {
                  "data-popper-arrow": true,
                  className: "chakra-tooltip__arrow-wrapper",
                  children: /* @__PURE__ */ jsx(
                    chakra.div,
                    {
                      "data-popper-arrow-inner": true,
                      className: "chakra-tooltip__arrow",
                      __css: { bg: styles.bg }
                    }
                  )
                }
              )
            ]
          }
        )
      }
    ) }) })
  ] });
});
Tooltip.displayName = "Tooltip";
function t$2(messageNameKey) {
  return chrome.i18n.getMessage(messageNameKey);
}
const _StyledButton = newStyled(Button)`
  position: relative;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  line-height: 14px;
  font-weight: bold;

  ${(p2) => {
  return p2.isDisabled && css$1`
        cursor: not-allowed;

        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background-color: rgba(255, 255, 255, 0.5);
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
      `;
}};
  ${(p2) => {
  return p2.isDisabled || css$1`
        &:active {
          transition: all ease-in-out 100ms;
          transform: scale(0.95);
        }
        &:hover {
          outline: solid 1px white;
        }
        &:focus {
          outline: solid 1px white;
        }
      `;
}}
`;
const StyledButton = ({
  ...restProps
}) => {
  return /* @__PURE__ */ jsx(_StyledButton, {
    colorScheme: "whiteAlpha",
    variant: "solid",
    size: "sm",
    h: "24px",
    ...restProps
  });
};
const COLORS = {
  CONTENT_BACKGROUND: "#fff9d8",
  POPUP_BACKGROUND: "#282c34",
  PRIMARY: "#3F75E5FF",
  WHITE: "#f5f5f5",
  RED: "#e35353"
};
const Z_INDEX = {
  ROOT: 2147483647
};
var withSelector = { exports: {} };
var withSelector_production_min = {};
var shim = { exports: {} };
var useSyncExternalStoreShim_production_min = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var e = react.exports;
function h$1(a, b2) {
  return a === b2 && (0 !== a || 1 / a === 1 / b2) || a !== a && b2 !== b2;
}
var k = "function" === typeof Object.is ? Object.is : h$1, l = e.useState, m = e.useEffect, n$1 = e.useLayoutEffect, p$1 = e.useDebugValue;
function q$1(a, b2) {
  var d2 = b2(), f2 = l({ inst: { value: d2, getSnapshot: b2 } }), c2 = f2[0].inst, g2 = f2[1];
  n$1(function() {
    c2.value = d2;
    c2.getSnapshot = b2;
    r$1(c2) && g2({ inst: c2 });
  }, [a, d2, b2]);
  m(function() {
    r$1(c2) && g2({ inst: c2 });
    return a(function() {
      r$1(c2) && g2({ inst: c2 });
    });
  }, [a]);
  p$1(d2);
  return d2;
}
function r$1(a) {
  var b2 = a.getSnapshot;
  a = a.value;
  try {
    var d2 = b2();
    return !k(a, d2);
  } catch (f2) {
    return true;
  }
}
function t$1(a, b2) {
  return b2();
}
var u$1 = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? t$1 : q$1;
useSyncExternalStoreShim_production_min.useSyncExternalStore = void 0 !== e.useSyncExternalStore ? e.useSyncExternalStore : u$1;
(function(module) {
  {
    module.exports = useSyncExternalStoreShim_production_min;
  }
})(shim);
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var h = react.exports, n = shim.exports;
function p(a, b2) {
  return a === b2 && (0 !== a || 1 / a === 1 / b2) || a !== a && b2 !== b2;
}
var q = "function" === typeof Object.is ? Object.is : p, r = n.useSyncExternalStore, t = h.useRef, u = h.useEffect, v = h.useMemo, w = h.useDebugValue;
withSelector_production_min.useSyncExternalStoreWithSelector = function(a, b2, e2, l2, g2) {
  var c2 = t(null);
  if (null === c2.current) {
    var f2 = { hasValue: false, value: null };
    c2.current = f2;
  } else
    f2 = c2.current;
  c2 = v(function() {
    function a2(a3) {
      if (!c3) {
        c3 = true;
        d3 = a3;
        a3 = l2(a3);
        if (void 0 !== g2 && f2.hasValue) {
          var b3 = f2.value;
          if (g2(b3, a3))
            return k2 = b3;
        }
        return k2 = a3;
      }
      b3 = k2;
      if (q(d3, a3))
        return b3;
      var e3 = l2(a3);
      if (void 0 !== g2 && g2(b3, e3))
        return b3;
      d3 = a3;
      return k2 = e3;
    }
    var c3 = false, d3, k2, m2 = void 0 === e2 ? null : e2;
    return [function() {
      return a2(b2());
    }, null === m2 ? void 0 : function() {
      return a2(m2());
    }];
  }, [b2, e2, l2, g2]);
  var d2 = r(a, c2[0], c2[1]);
  u(function() {
    f2.hasValue = true;
    f2.value = d2;
  }, [d2]);
  w(d2);
  return d2;
};
(function(module) {
  {
    module.exports = withSelector_production_min;
  }
})(withSelector);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign$1 = function() {
  __assign$1 = Object.assign || function __assign2(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$1.apply(this, arguments);
};
function __rest$1(s, e2) {
  var t2 = {};
  for (var p2 in s)
    if (Object.prototype.hasOwnProperty.call(s, p2) && e2.indexOf(p2) < 0)
      t2[p2] = s[p2];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p2 = Object.getOwnPropertySymbols(s); i < p2.length; i++) {
      if (e2.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p2[i]))
        t2[p2[i]] = s[p2[i]];
    }
  return t2;
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m2 = s && o[s], i = 0;
  if (m2)
    return m2.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read$1(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i = m2.call(o), r2, ar = [], e2;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i.next()).done)
      ar.push(r2.value);
  } catch (error2) {
    e2 = { error: error2 };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar;
}
function __spreadArray(to, from2, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l2 = from2.length, ar; i < l2; i++) {
      if (ar || !(i in from2)) {
        if (!ar)
          ar = Array.prototype.slice.call(from2, 0, i);
        ar[i] = from2[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from2));
}
var ActionTypes;
(function(ActionTypes2) {
  ActionTypes2["Start"] = "xstate.start";
  ActionTypes2["Stop"] = "xstate.stop";
  ActionTypes2["Raise"] = "xstate.raise";
  ActionTypes2["Send"] = "xstate.send";
  ActionTypes2["Cancel"] = "xstate.cancel";
  ActionTypes2["NullEvent"] = "";
  ActionTypes2["Assign"] = "xstate.assign";
  ActionTypes2["After"] = "xstate.after";
  ActionTypes2["DoneState"] = "done.state";
  ActionTypes2["DoneInvoke"] = "done.invoke";
  ActionTypes2["Log"] = "xstate.log";
  ActionTypes2["Init"] = "xstate.init";
  ActionTypes2["Invoke"] = "xstate.invoke";
  ActionTypes2["ErrorExecution"] = "error.execution";
  ActionTypes2["ErrorCommunication"] = "error.communication";
  ActionTypes2["ErrorPlatform"] = "error.platform";
  ActionTypes2["ErrorCustom"] = "xstate.error";
  ActionTypes2["Update"] = "xstate.update";
  ActionTypes2["Pure"] = "xstate.pure";
  ActionTypes2["Choose"] = "xstate.choose";
})(ActionTypes || (ActionTypes = {}));
var SpecialTargets;
(function(SpecialTargets2) {
  SpecialTargets2["Parent"] = "#_parent";
  SpecialTargets2["Internal"] = "#_internal";
})(SpecialTargets || (SpecialTargets = {}));
var start$1 = ActionTypes.Start;
var stop$1 = ActionTypes.Stop;
var raise$1 = ActionTypes.Raise;
var send$1 = ActionTypes.Send;
var cancel$1 = ActionTypes.Cancel;
var nullEvent = ActionTypes.NullEvent;
var assign$2 = ActionTypes.Assign;
ActionTypes.After;
ActionTypes.DoneState;
var log = ActionTypes.Log;
var init = ActionTypes.Init;
var invoke = ActionTypes.Invoke;
ActionTypes.ErrorExecution;
var errorPlatform = ActionTypes.ErrorPlatform;
var error$1 = ActionTypes.ErrorCustom;
var update = ActionTypes.Update;
var choose = ActionTypes.Choose;
var pure = ActionTypes.Pure;
var STATE_DELIMITER = ".";
var EMPTY_ACTIVITY_MAP = {};
var DEFAULT_GUARD_TYPE = "xstate.guard";
var TARGETLESS_KEY = "";
var IS_PRODUCTION = true;
var _a;
function matchesState(parentStateId, childStateId, delimiter2) {
  if (delimiter2 === void 0) {
    delimiter2 = STATE_DELIMITER;
  }
  var parentStateValue = toStateValue(parentStateId, delimiter2);
  var childStateValue = toStateValue(childStateId, delimiter2);
  if (isString(childStateValue)) {
    if (isString(parentStateValue)) {
      return childStateValue === parentStateValue;
    }
    return false;
  }
  if (isString(parentStateValue)) {
    return parentStateValue in childStateValue;
  }
  return Object.keys(parentStateValue).every(function(key) {
    if (!(key in childStateValue)) {
      return false;
    }
    return matchesState(parentStateValue[key], childStateValue[key]);
  });
}
function getEventType(event) {
  try {
    return isString(event) || typeof event === "number" ? "".concat(event) : event.type;
  } catch (e2) {
    throw new Error("Events must be strings or objects with a string event.type property.");
  }
}
function toStatePath(stateId, delimiter2) {
  try {
    if (isArray(stateId)) {
      return stateId;
    }
    return stateId.toString().split(delimiter2);
  } catch (e2) {
    throw new Error("'".concat(stateId, "' is not a valid state path."));
  }
}
function isStateLike(state2) {
  return typeof state2 === "object" && "value" in state2 && "context" in state2 && "event" in state2 && "_event" in state2;
}
function toStateValue(stateValue, delimiter2) {
  if (isStateLike(stateValue)) {
    return stateValue.value;
  }
  if (isArray(stateValue)) {
    return pathToStateValue(stateValue);
  }
  if (typeof stateValue !== "string") {
    return stateValue;
  }
  var statePath = toStatePath(stateValue, delimiter2);
  return pathToStateValue(statePath);
}
function pathToStateValue(statePath) {
  if (statePath.length === 1) {
    return statePath[0];
  }
  var value = {};
  var marker = value;
  for (var i = 0; i < statePath.length - 1; i++) {
    if (i === statePath.length - 2) {
      marker[statePath[i]] = statePath[i + 1];
    } else {
      marker[statePath[i]] = {};
      marker = marker[statePath[i]];
    }
  }
  return value;
}
function mapValues(collection, iteratee) {
  var result = {};
  var collectionKeys = Object.keys(collection);
  for (var i = 0; i < collectionKeys.length; i++) {
    var key = collectionKeys[i];
    result[key] = iteratee(collection[key], key, collection, i);
  }
  return result;
}
function mapFilterValues(collection, iteratee, predicate) {
  var e_1, _a2;
  var result = {};
  try {
    for (var _b = __values(Object.keys(collection)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var key = _c.value;
      var item = collection[key];
      if (!predicate(item)) {
        continue;
      }
      result[key] = iteratee(item, key, collection);
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (_c && !_c.done && (_a2 = _b.return))
        _a2.call(_b);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  return result;
}
var path = function(props) {
  return function(object) {
    var e_2, _a2;
    var result = object;
    try {
      for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
        var prop = props_1_1.value;
        result = result[prop];
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (props_1_1 && !props_1_1.done && (_a2 = props_1.return))
          _a2.call(props_1);
      } finally {
        if (e_2)
          throw e_2.error;
      }
    }
    return result;
  };
};
function nestedPath(props, accessorProp) {
  return function(object) {
    var e_3, _a2;
    var result = object;
    try {
      for (var props_2 = __values(props), props_2_1 = props_2.next(); !props_2_1.done; props_2_1 = props_2.next()) {
        var prop = props_2_1.value;
        result = result[accessorProp][prop];
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (props_2_1 && !props_2_1.done && (_a2 = props_2.return))
          _a2.call(props_2);
      } finally {
        if (e_3)
          throw e_3.error;
      }
    }
    return result;
  };
}
function toStatePaths(stateValue) {
  if (!stateValue) {
    return [[]];
  }
  if (isString(stateValue)) {
    return [[stateValue]];
  }
  var result = flatten(Object.keys(stateValue).map(function(key) {
    var subStateValue = stateValue[key];
    if (typeof subStateValue !== "string" && (!subStateValue || !Object.keys(subStateValue).length)) {
      return [[key]];
    }
    return toStatePaths(stateValue[key]).map(function(subPath) {
      return [key].concat(subPath);
    });
  }));
  return result;
}
function flatten(array) {
  var _a2;
  return (_a2 = []).concat.apply(_a2, __spreadArray([], __read$1(array), false));
}
function toArrayStrict(value) {
  if (isArray(value)) {
    return value;
  }
  return [value];
}
function toArray(value) {
  if (value === void 0) {
    return [];
  }
  return toArrayStrict(value);
}
function mapContext(mapper, context, _event) {
  var e_5, _a2;
  if (isFunction(mapper)) {
    return mapper(context, _event.data);
  }
  var result = {};
  try {
    for (var _b = __values(Object.keys(mapper)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var key = _c.value;
      var subMapper = mapper[key];
      if (isFunction(subMapper)) {
        result[key] = subMapper(context, _event.data);
      } else {
        result[key] = subMapper;
      }
    }
  } catch (e_5_1) {
    e_5 = {
      error: e_5_1
    };
  } finally {
    try {
      if (_c && !_c.done && (_a2 = _b.return))
        _a2.call(_b);
    } finally {
      if (e_5)
        throw e_5.error;
    }
  }
  return result;
}
function isBuiltInEvent(eventType) {
  return /^(done|error)\./.test(eventType);
}
function isPromiseLike(value) {
  if (value instanceof Promise) {
    return true;
  }
  if (value !== null && (isFunction(value) || typeof value === "object") && isFunction(value.then)) {
    return true;
  }
  return false;
}
function isBehavior(value) {
  return value !== null && typeof value === "object" && "transition" in value && typeof value.transition === "function";
}
function partition(items, predicate) {
  var e_6, _a2;
  var _b = __read$1([[], []], 2), truthy = _b[0], falsy = _b[1];
  try {
    for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
      var item = items_1_1.value;
      if (predicate(item)) {
        truthy.push(item);
      } else {
        falsy.push(item);
      }
    }
  } catch (e_6_1) {
    e_6 = {
      error: e_6_1
    };
  } finally {
    try {
      if (items_1_1 && !items_1_1.done && (_a2 = items_1.return))
        _a2.call(items_1);
    } finally {
      if (e_6)
        throw e_6.error;
    }
  }
  return [truthy, falsy];
}
function updateHistoryStates(hist, stateValue) {
  return mapValues(hist.states, function(subHist, key) {
    if (!subHist) {
      return void 0;
    }
    var subStateValue = (isString(stateValue) ? void 0 : stateValue[key]) || (subHist ? subHist.current : void 0);
    if (!subStateValue) {
      return void 0;
    }
    return {
      current: subStateValue,
      states: updateHistoryStates(subHist, subStateValue)
    };
  });
}
function updateHistoryValue(hist, stateValue) {
  return {
    current: stateValue,
    states: updateHistoryStates(hist, stateValue)
  };
}
function updateContext(context, _event, assignActions, state2) {
  var updatedContext = context ? assignActions.reduce(function(acc, assignAction) {
    var e_7, _a2;
    var assignment = assignAction.assignment;
    var meta = {
      state: state2,
      action: assignAction,
      _event
    };
    var partialUpdate = {};
    if (isFunction(assignment)) {
      partialUpdate = assignment(acc, _event.data, meta);
    } else {
      try {
        for (var _b = __values(Object.keys(assignment)), _c = _b.next(); !_c.done; _c = _b.next()) {
          var key = _c.value;
          var propAssignment = assignment[key];
          partialUpdate[key] = isFunction(propAssignment) ? propAssignment(acc, _event.data, meta) : propAssignment;
        }
      } catch (e_7_1) {
        e_7 = {
          error: e_7_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a2 = _b.return))
            _a2.call(_b);
        } finally {
          if (e_7)
            throw e_7.error;
        }
      }
    }
    return Object.assign({}, acc, partialUpdate);
  }, context) : context;
  return updatedContext;
}
var warn = function() {
};
function isArray(value) {
  return Array.isArray(value);
}
function isFunction(value) {
  return typeof value === "function";
}
function isString(value) {
  return typeof value === "string";
}
function toGuard(condition, guardMap) {
  if (!condition) {
    return void 0;
  }
  if (isString(condition)) {
    return {
      type: DEFAULT_GUARD_TYPE,
      name: condition,
      predicate: guardMap ? guardMap[condition] : void 0
    };
  }
  if (isFunction(condition)) {
    return {
      type: DEFAULT_GUARD_TYPE,
      name: condition.name,
      predicate: condition
    };
  }
  return condition;
}
function isObservable(value) {
  try {
    return "subscribe" in value && isFunction(value.subscribe);
  } catch (e2) {
    return false;
  }
}
var symbolObservable = /* @__PURE__ */ function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();
_a = {}, _a[symbolObservable] = function() {
  return this;
}, _a[Symbol.observable] = function() {
  return this;
}, _a;
function isMachine(value) {
  return !!value && "__xstatenode" in value;
}
function isActor$1(value) {
  return !!value && typeof value.send === "function";
}
function toEventObject(event, payload) {
  if (isString(event) || typeof event === "number") {
    return __assign$1({
      type: event
    }, payload);
  }
  return event;
}
function toSCXMLEvent(event, scxmlEvent) {
  if (!isString(event) && "$$type" in event && event.$$type === "scxml") {
    return event;
  }
  var eventObject = toEventObject(event);
  return __assign$1({
    name: eventObject.type,
    data: eventObject,
    $$type: "scxml",
    type: "external"
  }, scxmlEvent);
}
function toTransitionConfigArray(event, configLike) {
  var transitions = toArrayStrict(configLike).map(function(transitionLike) {
    if (typeof transitionLike === "undefined" || typeof transitionLike === "string" || isMachine(transitionLike)) {
      return {
        target: transitionLike,
        event
      };
    }
    return __assign$1(__assign$1({}, transitionLike), {
      event
    });
  });
  return transitions;
}
function normalizeTarget(target) {
  if (target === void 0 || target === TARGETLESS_KEY) {
    return void 0;
  }
  return toArray(target);
}
function evaluateGuard(machine, guard, context, _event, state2) {
  var guards = machine.options.guards;
  var guardMeta = {
    state: state2,
    cond: guard,
    _event
  };
  if (guard.type === DEFAULT_GUARD_TYPE) {
    return ((guards === null || guards === void 0 ? void 0 : guards[guard.name]) || guard.predicate)(context, _event.data, guardMeta);
  }
  var condFn = guards === null || guards === void 0 ? void 0 : guards[guard.type];
  if (!condFn) {
    throw new Error("Guard '".concat(guard.type, "' is not implemented on machine '").concat(machine.id, "'."));
  }
  return condFn(context, _event.data, guardMeta);
}
function toInvokeSource$1(src) {
  if (typeof src === "string") {
    return {
      type: src
    };
  }
  return src;
}
function toObserver(nextHandler, errorHandler, completionHandler) {
  var noop2 = function() {
  };
  var isObserver = typeof nextHandler === "object";
  var self2 = isObserver ? nextHandler : null;
  return {
    next: ((isObserver ? nextHandler.next : nextHandler) || noop2).bind(self2),
    error: ((isObserver ? nextHandler.error : errorHandler) || noop2).bind(self2),
    complete: ((isObserver ? nextHandler.complete : completionHandler) || noop2).bind(self2)
  };
}
function createInvokeId(stateNodeId, index2) {
  return "".concat(stateNodeId, ":invocation[").concat(index2, "]");
}
function isRaisableAction(action) {
  return (action.type === raise$1 || action.type === send$1 && action.to === SpecialTargets.Internal) && typeof action.delay !== "number";
}
var initEvent = /* @__PURE__ */ toSCXMLEvent({
  type: init
});
function getActionFunction(actionType, actionFunctionMap) {
  return actionFunctionMap ? actionFunctionMap[actionType] || void 0 : void 0;
}
function toActionObject(action, actionFunctionMap) {
  var actionObject;
  if (isString(action) || typeof action === "number") {
    var exec = getActionFunction(action, actionFunctionMap);
    if (isFunction(exec)) {
      actionObject = {
        type: action,
        exec
      };
    } else if (exec) {
      actionObject = exec;
    } else {
      actionObject = {
        type: action,
        exec: void 0
      };
    }
  } else if (isFunction(action)) {
    actionObject = {
      type: action.name || action.toString(),
      exec: action
    };
  } else {
    var exec = getActionFunction(action.type, actionFunctionMap);
    if (isFunction(exec)) {
      actionObject = __assign$1(__assign$1({}, action), {
        exec
      });
    } else if (exec) {
      var actionType = exec.type || action.type;
      actionObject = __assign$1(__assign$1(__assign$1({}, exec), action), {
        type: actionType
      });
    } else {
      actionObject = action;
    }
  }
  return actionObject;
}
var toActionObjects = function(action, actionFunctionMap) {
  if (!action) {
    return [];
  }
  var actions = isArray(action) ? action : [action];
  return actions.map(function(subAction) {
    return toActionObject(subAction, actionFunctionMap);
  });
};
function toActivityDefinition(action) {
  var actionObject = toActionObject(action);
  return __assign$1(__assign$1({
    id: isString(action) ? action : actionObject.id
  }, actionObject), {
    type: actionObject.type
  });
}
function raise(event, options) {
  return {
    type: raise$1,
    event: typeof event === "function" ? event : toEventObject(event),
    delay: options ? options.delay : void 0,
    id: options === null || options === void 0 ? void 0 : options.id
  };
}
function resolveRaise(action, ctx, _event, delaysMap) {
  var meta = {
    _event
  };
  var resolvedEvent = toSCXMLEvent(isFunction(action.event) ? action.event(ctx, _event.data, meta) : action.event);
  var resolvedDelay;
  if (isString(action.delay)) {
    var configDelay = delaysMap && delaysMap[action.delay];
    resolvedDelay = isFunction(configDelay) ? configDelay(ctx, _event.data, meta) : configDelay;
  } else {
    resolvedDelay = isFunction(action.delay) ? action.delay(ctx, _event.data, meta) : action.delay;
  }
  return __assign$1(__assign$1({}, action), {
    type: raise$1,
    _event: resolvedEvent,
    delay: resolvedDelay
  });
}
function send(event, options) {
  return {
    to: options ? options.to : void 0,
    type: send$1,
    event: isFunction(event) ? event : toEventObject(event),
    delay: options ? options.delay : void 0,
    id: options && options.id !== void 0 ? options.id : isFunction(event) ? event.name : getEventType(event)
  };
}
function resolveSend(action, ctx, _event, delaysMap) {
  var meta = {
    _event
  };
  var resolvedEvent = toSCXMLEvent(isFunction(action.event) ? action.event(ctx, _event.data, meta) : action.event);
  var resolvedDelay;
  if (isString(action.delay)) {
    var configDelay = delaysMap && delaysMap[action.delay];
    resolvedDelay = isFunction(configDelay) ? configDelay(ctx, _event.data, meta) : configDelay;
  } else {
    resolvedDelay = isFunction(action.delay) ? action.delay(ctx, _event.data, meta) : action.delay;
  }
  var resolvedTarget = isFunction(action.to) ? action.to(ctx, _event.data, meta) : action.to;
  return __assign$1(__assign$1({}, action), {
    to: resolvedTarget,
    _event: resolvedEvent,
    event: resolvedEvent.data,
    delay: resolvedDelay
  });
}
var resolveLog = function(action, ctx, _event) {
  return __assign$1(__assign$1({}, action), {
    value: isString(action.expr) ? action.expr : action.expr(ctx, _event.data, {
      _event
    })
  });
};
var cancel = function(sendId) {
  return {
    type: cancel$1,
    sendId
  };
};
function start(activity) {
  var activityDef = toActivityDefinition(activity);
  return {
    type: ActionTypes.Start,
    activity: activityDef,
    exec: void 0
  };
}
function stop(actorRef) {
  var activity = isFunction(actorRef) ? actorRef : toActivityDefinition(actorRef);
  return {
    type: ActionTypes.Stop,
    activity,
    exec: void 0
  };
}
function resolveStop(action, context, _event) {
  var actorRefOrString = isFunction(action.activity) ? action.activity(context, _event.data) : action.activity;
  var resolvedActorRef = typeof actorRefOrString === "string" ? {
    id: actorRefOrString
  } : actorRefOrString;
  var actionObject = {
    type: ActionTypes.Stop,
    activity: resolvedActorRef
  };
  return actionObject;
}
var assign$1 = function(assignment) {
  return {
    type: assign$2,
    assignment
  };
};
function after(delayRef, id2) {
  var idSuffix = id2 ? "#".concat(id2) : "";
  return "".concat(ActionTypes.After, "(").concat(delayRef, ")").concat(idSuffix);
}
function done(id2, data) {
  var type = "".concat(ActionTypes.DoneState, ".").concat(id2);
  var eventObject = {
    type,
    data
  };
  eventObject.toString = function() {
    return type;
  };
  return eventObject;
}
function doneInvoke(id2, data) {
  var type = "".concat(ActionTypes.DoneInvoke, ".").concat(id2);
  var eventObject = {
    type,
    data
  };
  eventObject.toString = function() {
    return type;
  };
  return eventObject;
}
function error(id2, data) {
  var type = "".concat(ActionTypes.ErrorPlatform, ".").concat(id2);
  var eventObject = {
    type,
    data
  };
  eventObject.toString = function() {
    return type;
  };
  return eventObject;
}
var pluckAssigns = function(actionBlocks) {
  var e_1, _a2;
  var assignActions = [];
  try {
    for (var actionBlocks_1 = __values(actionBlocks), actionBlocks_1_1 = actionBlocks_1.next(); !actionBlocks_1_1.done; actionBlocks_1_1 = actionBlocks_1.next()) {
      var block = actionBlocks_1_1.value;
      var i = 0;
      while (i < block.actions.length) {
        if (block.actions[i].type === assign$2) {
          assignActions.push(block.actions[i]);
          block.actions.splice(i, 1);
          continue;
        }
        i++;
      }
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (actionBlocks_1_1 && !actionBlocks_1_1.done && (_a2 = actionBlocks_1.return))
        _a2.call(actionBlocks_1);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  return assignActions;
};
function resolveActions(machine, currentState, currentContext, _event, actionBlocks, predictableExec, preserveActionOrder) {
  if (preserveActionOrder === void 0) {
    preserveActionOrder = false;
  }
  var assignActions = preserveActionOrder ? [] : pluckAssigns(actionBlocks);
  var updatedContext = assignActions.length ? updateContext(currentContext, _event, assignActions, currentState) : currentContext;
  var preservedContexts = preserveActionOrder ? [currentContext] : void 0;
  var deferredToBlockEnd = [];
  function handleAction(blockType, actionObject) {
    var _a2;
    switch (actionObject.type) {
      case raise$1: {
        var raisedAction = resolveRaise(actionObject, updatedContext, _event, machine.options.delays);
        if (predictableExec && typeof raisedAction.delay === "number") {
          predictableExec(raisedAction, updatedContext, _event);
        }
        return raisedAction;
      }
      case send$1:
        var sendAction = resolveSend(actionObject, updatedContext, _event, machine.options.delays);
        if (predictableExec && sendAction.to !== SpecialTargets.Internal) {
          if (blockType === "entry") {
            deferredToBlockEnd.push(sendAction);
          } else {
            predictableExec(sendAction, updatedContext, _event);
          }
        }
        return sendAction;
      case log: {
        var resolved = resolveLog(actionObject, updatedContext, _event);
        predictableExec === null || predictableExec === void 0 ? void 0 : predictableExec(resolved, updatedContext, _event);
        return resolved;
      }
      case choose: {
        var chooseAction = actionObject;
        var matchedActions = (_a2 = chooseAction.conds.find(function(condition) {
          var guard = toGuard(condition.cond, machine.options.guards);
          return !guard || evaluateGuard(machine, guard, updatedContext, _event, !predictableExec ? currentState : void 0);
        })) === null || _a2 === void 0 ? void 0 : _a2.actions;
        if (!matchedActions) {
          return [];
        }
        var _b = __read$1(resolveActions(machine, currentState, updatedContext, _event, [{
          type: blockType,
          actions: toActionObjects(toArray(matchedActions), machine.options.actions)
        }], predictableExec, preserveActionOrder), 2), resolvedActionsFromChoose = _b[0], resolvedContextFromChoose = _b[1];
        updatedContext = resolvedContextFromChoose;
        preservedContexts === null || preservedContexts === void 0 ? void 0 : preservedContexts.push(updatedContext);
        return resolvedActionsFromChoose;
      }
      case pure: {
        var matchedActions = actionObject.get(updatedContext, _event.data);
        if (!matchedActions) {
          return [];
        }
        var _c = __read$1(resolveActions(machine, currentState, updatedContext, _event, [{
          type: blockType,
          actions: toActionObjects(toArray(matchedActions), machine.options.actions)
        }], predictableExec, preserveActionOrder), 2), resolvedActionsFromPure = _c[0], resolvedContext = _c[1];
        updatedContext = resolvedContext;
        preservedContexts === null || preservedContexts === void 0 ? void 0 : preservedContexts.push(updatedContext);
        return resolvedActionsFromPure;
      }
      case stop$1: {
        var resolved = resolveStop(actionObject, updatedContext, _event);
        predictableExec === null || predictableExec === void 0 ? void 0 : predictableExec(resolved, currentContext, _event);
        return resolved;
      }
      case assign$2: {
        updatedContext = updateContext(updatedContext, _event, [actionObject], !predictableExec ? currentState : void 0);
        preservedContexts === null || preservedContexts === void 0 ? void 0 : preservedContexts.push(updatedContext);
        break;
      }
      default:
        var resolvedActionObject = toActionObject(actionObject, machine.options.actions);
        var exec_1 = resolvedActionObject.exec;
        if (predictableExec) {
          predictableExec(resolvedActionObject, updatedContext, _event);
        } else if (exec_1 && preservedContexts) {
          var contextIndex_1 = preservedContexts.length - 1;
          var wrapped = __assign$1(__assign$1({}, resolvedActionObject), {
            exec: function(_ctx) {
              var args = [];
              for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
              }
              exec_1.apply(void 0, __spreadArray([preservedContexts[contextIndex_1]], __read$1(args), false));
            }
          });
          resolvedActionObject = wrapped;
        }
        return resolvedActionObject;
    }
  }
  function processBlock(block) {
    var e_2, _a2;
    var resolvedActions2 = [];
    try {
      for (var _b = __values(block.actions), _c = _b.next(); !_c.done; _c = _b.next()) {
        var action = _c.value;
        var resolved = handleAction(block.type, action);
        if (resolved) {
          resolvedActions2 = resolvedActions2.concat(resolved);
        }
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return))
          _a2.call(_b);
      } finally {
        if (e_2)
          throw e_2.error;
      }
    }
    deferredToBlockEnd.forEach(function(action2) {
      predictableExec(action2, updatedContext, _event);
    });
    deferredToBlockEnd.length = 0;
    return resolvedActions2;
  }
  var resolvedActions = flatten(actionBlocks.map(processBlock));
  return [resolvedActions, updatedContext];
}
var provide = function(service, fn2) {
  var result = fn2(service);
  return result;
};
function createNullActor(id2) {
  var _a2;
  return _a2 = {
    id: id2,
    send: function() {
      return void 0;
    },
    subscribe: function() {
      return {
        unsubscribe: function() {
          return void 0;
        }
      };
    },
    getSnapshot: function() {
      return void 0;
    },
    toJSON: function() {
      return {
        id: id2
      };
    }
  }, _a2[symbolObservable] = function() {
    return this;
  }, _a2;
}
function createInvocableActor(invokeDefinition, machine, context, _event) {
  var _a2;
  var invokeSrc = toInvokeSource$1(invokeDefinition.src);
  var serviceCreator = (_a2 = machine === null || machine === void 0 ? void 0 : machine.options.services) === null || _a2 === void 0 ? void 0 : _a2[invokeSrc.type];
  var resolvedData = invokeDefinition.data ? mapContext(invokeDefinition.data, context, _event) : void 0;
  var tempActor = serviceCreator ? createDeferredActor(serviceCreator, invokeDefinition.id, resolvedData) : createNullActor(invokeDefinition.id);
  tempActor.meta = invokeDefinition;
  return tempActor;
}
function createDeferredActor(entity, id2, data) {
  var tempActor = createNullActor(id2);
  tempActor.deferred = true;
  if (isMachine(entity)) {
    var initialState_1 = tempActor.state = provide(void 0, function() {
      return (data ? entity.withContext(data) : entity).initialState;
    });
    tempActor.getSnapshot = function() {
      return initialState_1;
    };
  }
  return tempActor;
}
function isActor(item) {
  try {
    return typeof item.send === "function";
  } catch (e2) {
    return false;
  }
}
function isSpawnedActor(item) {
  return isActor(item) && "id" in item;
}
function toActorRef(actorRefLike) {
  var _a2;
  return __assign$1((_a2 = {
    subscribe: function() {
      return {
        unsubscribe: function() {
          return void 0;
        }
      };
    },
    id: "anonymous",
    getSnapshot: function() {
      return void 0;
    }
  }, _a2[symbolObservable] = function() {
    return this;
  }, _a2), actorRefLike);
}
var isLeafNode = function(stateNode) {
  return stateNode.type === "atomic" || stateNode.type === "final";
};
function getAllChildren(stateNode) {
  return Object.keys(stateNode.states).map(function(key) {
    return stateNode.states[key];
  });
}
function getChildren(stateNode) {
  return getAllChildren(stateNode).filter(function(sn) {
    return sn.type !== "history";
  });
}
function getAllStateNodes(stateNode) {
  var stateNodes = [stateNode];
  if (isLeafNode(stateNode)) {
    return stateNodes;
  }
  return stateNodes.concat(flatten(getChildren(stateNode).map(getAllStateNodes)));
}
function getConfiguration(prevStateNodes, stateNodes) {
  var e_1, _a2, e_2, _b, e_3, _c, e_4, _d;
  var prevConfiguration = new Set(prevStateNodes);
  var prevAdjList = getAdjList(prevConfiguration);
  var configuration = new Set(stateNodes);
  try {
    for (var configuration_1 = __values(configuration), configuration_1_1 = configuration_1.next(); !configuration_1_1.done; configuration_1_1 = configuration_1.next()) {
      var s = configuration_1_1.value;
      var m2 = s.parent;
      while (m2 && !configuration.has(m2)) {
        configuration.add(m2);
        m2 = m2.parent;
      }
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (configuration_1_1 && !configuration_1_1.done && (_a2 = configuration_1.return))
        _a2.call(configuration_1);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  var adjList = getAdjList(configuration);
  try {
    for (var configuration_2 = __values(configuration), configuration_2_1 = configuration_2.next(); !configuration_2_1.done; configuration_2_1 = configuration_2.next()) {
      var s = configuration_2_1.value;
      if (s.type === "compound" && (!adjList.get(s) || !adjList.get(s).length)) {
        if (prevAdjList.get(s)) {
          prevAdjList.get(s).forEach(function(sn) {
            return configuration.add(sn);
          });
        } else {
          s.initialStateNodes.forEach(function(sn) {
            return configuration.add(sn);
          });
        }
      } else {
        if (s.type === "parallel") {
          try {
            for (var _e = (e_3 = void 0, __values(getChildren(s))), _f = _e.next(); !_f.done; _f = _e.next()) {
              var child = _f.value;
              if (!configuration.has(child)) {
                configuration.add(child);
                if (prevAdjList.get(child)) {
                  prevAdjList.get(child).forEach(function(sn) {
                    return configuration.add(sn);
                  });
                } else {
                  child.initialStateNodes.forEach(function(sn) {
                    return configuration.add(sn);
                  });
                }
              }
            }
          } catch (e_3_1) {
            e_3 = {
              error: e_3_1
            };
          } finally {
            try {
              if (_f && !_f.done && (_c = _e.return))
                _c.call(_e);
            } finally {
              if (e_3)
                throw e_3.error;
            }
          }
        }
      }
    }
  } catch (e_2_1) {
    e_2 = {
      error: e_2_1
    };
  } finally {
    try {
      if (configuration_2_1 && !configuration_2_1.done && (_b = configuration_2.return))
        _b.call(configuration_2);
    } finally {
      if (e_2)
        throw e_2.error;
    }
  }
  try {
    for (var configuration_3 = __values(configuration), configuration_3_1 = configuration_3.next(); !configuration_3_1.done; configuration_3_1 = configuration_3.next()) {
      var s = configuration_3_1.value;
      var m2 = s.parent;
      while (m2 && !configuration.has(m2)) {
        configuration.add(m2);
        m2 = m2.parent;
      }
    }
  } catch (e_4_1) {
    e_4 = {
      error: e_4_1
    };
  } finally {
    try {
      if (configuration_3_1 && !configuration_3_1.done && (_d = configuration_3.return))
        _d.call(configuration_3);
    } finally {
      if (e_4)
        throw e_4.error;
    }
  }
  return configuration;
}
function getValueFromAdj(baseNode, adjList) {
  var childStateNodes = adjList.get(baseNode);
  if (!childStateNodes) {
    return {};
  }
  if (baseNode.type === "compound") {
    var childStateNode = childStateNodes[0];
    if (childStateNode) {
      if (isLeafNode(childStateNode)) {
        return childStateNode.key;
      }
    } else {
      return {};
    }
  }
  var stateValue = {};
  childStateNodes.forEach(function(csn) {
    stateValue[csn.key] = getValueFromAdj(csn, adjList);
  });
  return stateValue;
}
function getAdjList(configuration) {
  var e_5, _a2;
  var adjList = /* @__PURE__ */ new Map();
  try {
    for (var configuration_4 = __values(configuration), configuration_4_1 = configuration_4.next(); !configuration_4_1.done; configuration_4_1 = configuration_4.next()) {
      var s = configuration_4_1.value;
      if (!adjList.has(s)) {
        adjList.set(s, []);
      }
      if (s.parent) {
        if (!adjList.has(s.parent)) {
          adjList.set(s.parent, []);
        }
        adjList.get(s.parent).push(s);
      }
    }
  } catch (e_5_1) {
    e_5 = {
      error: e_5_1
    };
  } finally {
    try {
      if (configuration_4_1 && !configuration_4_1.done && (_a2 = configuration_4.return))
        _a2.call(configuration_4);
    } finally {
      if (e_5)
        throw e_5.error;
    }
  }
  return adjList;
}
function getValue(rootNode, configuration) {
  var config = getConfiguration([rootNode], configuration);
  return getValueFromAdj(rootNode, getAdjList(config));
}
function has(iterable, item) {
  if (Array.isArray(iterable)) {
    return iterable.some(function(member) {
      return member === item;
    });
  }
  if (iterable instanceof Set) {
    return iterable.has(item);
  }
  return false;
}
function nextEvents(configuration) {
  return __spreadArray([], __read$1(new Set(flatten(__spreadArray([], __read$1(configuration.map(function(sn) {
    return sn.ownEvents;
  })), false)))), false);
}
function isInFinalState(configuration, stateNode) {
  if (stateNode.type === "compound") {
    return getChildren(stateNode).some(function(s) {
      return s.type === "final" && has(configuration, s);
    });
  }
  if (stateNode.type === "parallel") {
    return getChildren(stateNode).every(function(sn) {
      return isInFinalState(configuration, sn);
    });
  }
  return false;
}
function getMeta(configuration) {
  if (configuration === void 0) {
    configuration = [];
  }
  return configuration.reduce(function(acc, stateNode) {
    if (stateNode.meta !== void 0) {
      acc[stateNode.id] = stateNode.meta;
    }
    return acc;
  }, {});
}
function getTagsFromConfiguration(configuration) {
  return new Set(flatten(configuration.map(function(sn) {
    return sn.tags;
  })));
}
function stateValuesEqual(a, b2) {
  if (a === b2) {
    return true;
  }
  if (a === void 0 || b2 === void 0) {
    return false;
  }
  if (isString(a) || isString(b2)) {
    return a === b2;
  }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b2);
  return aKeys.length === bKeys.length && aKeys.every(function(key) {
    return stateValuesEqual(a[key], b2[key]);
  });
}
function isStateConfig(state2) {
  if (typeof state2 !== "object" || state2 === null) {
    return false;
  }
  return "value" in state2 && "_event" in state2;
}
function bindActionToState(action, state2) {
  var exec = action.exec;
  var boundAction = __assign$1(__assign$1({}, action), {
    exec: exec !== void 0 ? function() {
      return exec(state2.context, state2.event, {
        action,
        state: state2,
        _event: state2._event
      });
    } : void 0
  });
  return boundAction;
}
var State = /* @__PURE__ */ function() {
  function State2(config) {
    var _this = this;
    var _a2;
    this.actions = [];
    this.activities = EMPTY_ACTIVITY_MAP;
    this.meta = {};
    this.events = [];
    this.value = config.value;
    this.context = config.context;
    this._event = config._event;
    this._sessionid = config._sessionid;
    this.event = this._event.data;
    this.historyValue = config.historyValue;
    this.history = config.history;
    this.actions = config.actions || [];
    this.activities = config.activities || EMPTY_ACTIVITY_MAP;
    this.meta = getMeta(config.configuration);
    this.events = config.events || [];
    this.matches = this.matches.bind(this);
    this.toStrings = this.toStrings.bind(this);
    this.configuration = config.configuration;
    this.transitions = config.transitions;
    this.children = config.children;
    this.done = !!config.done;
    this.tags = (_a2 = Array.isArray(config.tags) ? new Set(config.tags) : config.tags) !== null && _a2 !== void 0 ? _a2 : /* @__PURE__ */ new Set();
    this.machine = config.machine;
    Object.defineProperty(this, "nextEvents", {
      get: function() {
        return nextEvents(_this.configuration);
      }
    });
  }
  State2.from = function(stateValue, context) {
    if (stateValue instanceof State2) {
      if (stateValue.context !== context) {
        return new State2({
          value: stateValue.value,
          context,
          _event: stateValue._event,
          _sessionid: null,
          historyValue: stateValue.historyValue,
          history: stateValue.history,
          actions: [],
          activities: stateValue.activities,
          meta: {},
          events: [],
          configuration: [],
          transitions: [],
          children: {}
        });
      }
      return stateValue;
    }
    var _event = initEvent;
    return new State2({
      value: stateValue,
      context,
      _event,
      _sessionid: null,
      historyValue: void 0,
      history: void 0,
      actions: [],
      activities: void 0,
      meta: void 0,
      events: [],
      configuration: [],
      transitions: [],
      children: {}
    });
  };
  State2.create = function(config) {
    return new State2(config);
  };
  State2.inert = function(stateValue, context) {
    if (stateValue instanceof State2) {
      if (!stateValue.actions.length) {
        return stateValue;
      }
      var _event = initEvent;
      return new State2({
        value: stateValue.value,
        context,
        _event,
        _sessionid: null,
        historyValue: stateValue.historyValue,
        history: stateValue.history,
        activities: stateValue.activities,
        configuration: stateValue.configuration,
        transitions: [],
        children: {}
      });
    }
    return State2.from(stateValue, context);
  };
  State2.prototype.toStrings = function(stateValue, delimiter2) {
    var _this = this;
    if (stateValue === void 0) {
      stateValue = this.value;
    }
    if (delimiter2 === void 0) {
      delimiter2 = ".";
    }
    if (isString(stateValue)) {
      return [stateValue];
    }
    var valueKeys = Object.keys(stateValue);
    return valueKeys.concat.apply(valueKeys, __spreadArray([], __read$1(valueKeys.map(function(key) {
      return _this.toStrings(stateValue[key], delimiter2).map(function(s) {
        return key + delimiter2 + s;
      });
    })), false));
  };
  State2.prototype.toJSON = function() {
    var _a2 = this;
    _a2.configuration;
    _a2.transitions;
    var tags2 = _a2.tags;
    _a2.machine;
    var jsonValues = __rest$1(_a2, ["configuration", "transitions", "tags", "machine"]);
    return __assign$1(__assign$1({}, jsonValues), {
      tags: Array.from(tags2)
    });
  };
  State2.prototype.matches = function(parentStateValue) {
    return matchesState(parentStateValue, this.value);
  };
  State2.prototype.hasTag = function(tag) {
    return this.tags.has(tag);
  };
  State2.prototype.can = function(event) {
    var _a2;
    {
      warn(!!this.machine);
    }
    var transitionData = (_a2 = this.machine) === null || _a2 === void 0 ? void 0 : _a2.getTransitionData(this, event);
    return !!(transitionData === null || transitionData === void 0 ? void 0 : transitionData.transitions.length) && transitionData.transitions.some(function(t2) {
      return t2.target !== void 0 || t2.actions.length;
    });
  };
  return State2;
}();
var defaultOptions = {
  deferEvents: false
};
var Scheduler = /* @__PURE__ */ function() {
  function Scheduler2(options) {
    this.processingEvent = false;
    this.queue = [];
    this.initialized = false;
    this.options = __assign$1(__assign$1({}, defaultOptions), options);
  }
  Scheduler2.prototype.initialize = function(callback) {
    this.initialized = true;
    if (callback) {
      if (!this.options.deferEvents) {
        this.schedule(callback);
        return;
      }
      this.process(callback);
    }
    this.flushEvents();
  };
  Scheduler2.prototype.schedule = function(task) {
    if (!this.initialized || this.processingEvent) {
      this.queue.push(task);
      return;
    }
    if (this.queue.length !== 0) {
      throw new Error("Event queue should be empty when it is not processing events");
    }
    this.process(task);
    this.flushEvents();
  };
  Scheduler2.prototype.clear = function() {
    this.queue = [];
  };
  Scheduler2.prototype.flushEvents = function() {
    var nextCallback = this.queue.shift();
    while (nextCallback) {
      this.process(nextCallback);
      nextCallback = this.queue.shift();
    }
  };
  Scheduler2.prototype.process = function(callback) {
    this.processingEvent = true;
    try {
      callback();
    } catch (e2) {
      this.clear();
      throw e2;
    } finally {
      this.processingEvent = false;
    }
  };
  return Scheduler2;
}();
var children = /* @__PURE__ */ new Map();
var sessionIdIndex = 0;
var registry = {
  bookId: function() {
    return "x:".concat(sessionIdIndex++);
  },
  register: function(id2, actor) {
    children.set(id2, actor);
    return id2;
  },
  get: function(id2) {
    return children.get(id2);
  },
  free: function(id2) {
    children.delete(id2);
  }
};
function getGlobal() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
}
function getDevTools() {
  var global2 = getGlobal();
  if (global2 && "__xstate__" in global2) {
    return global2.__xstate__;
  }
  return void 0;
}
function registerService(service) {
  if (!getGlobal()) {
    return;
  }
  var devTools = getDevTools();
  if (devTools) {
    devTools.register(service);
  }
}
function spawnBehavior(behavior, options) {
  if (options === void 0) {
    options = {};
  }
  var state2 = behavior.initialState;
  var observers2 = /* @__PURE__ */ new Set();
  var mailbox = [];
  var flushing = false;
  var flush = function() {
    if (flushing) {
      return;
    }
    flushing = true;
    while (mailbox.length > 0) {
      var event_1 = mailbox.shift();
      state2 = behavior.transition(state2, event_1, actorCtx);
      observers2.forEach(function(observer) {
        return observer.next(state2);
      });
    }
    flushing = false;
  };
  var actor = toActorRef({
    id: options.id,
    send: function(event) {
      mailbox.push(event);
      flush();
    },
    getSnapshot: function() {
      return state2;
    },
    subscribe: function(next2, handleError, complete) {
      var observer = toObserver(next2, handleError, complete);
      observers2.add(observer);
      observer.next(state2);
      return {
        unsubscribe: function() {
          observers2.delete(observer);
        }
      };
    }
  });
  var actorCtx = {
    parent: options.parent,
    self: actor,
    id: options.id || "anonymous",
    observers: observers2
  };
  state2 = behavior.start ? behavior.start(actorCtx) : state2;
  return actor;
}
var DEFAULT_SPAWN_OPTIONS = {
  sync: false,
  autoForward: false
};
var InterpreterStatus;
(function(InterpreterStatus2) {
  InterpreterStatus2[InterpreterStatus2["NotStarted"] = 0] = "NotStarted";
  InterpreterStatus2[InterpreterStatus2["Running"] = 1] = "Running";
  InterpreterStatus2[InterpreterStatus2["Stopped"] = 2] = "Stopped";
})(InterpreterStatus || (InterpreterStatus = {}));
var Interpreter = /* @__PURE__ */ function() {
  function Interpreter2(machine, options) {
    if (options === void 0) {
      options = Interpreter2.defaultOptions;
    }
    var _this = this;
    this.machine = machine;
    this.delayedEventsMap = {};
    this.listeners = /* @__PURE__ */ new Set();
    this.contextListeners = /* @__PURE__ */ new Set();
    this.stopListeners = /* @__PURE__ */ new Set();
    this.doneListeners = /* @__PURE__ */ new Set();
    this.eventListeners = /* @__PURE__ */ new Set();
    this.sendListeners = /* @__PURE__ */ new Set();
    this.initialized = false;
    this.status = InterpreterStatus.NotStarted;
    this.children = /* @__PURE__ */ new Map();
    this.forwardTo = /* @__PURE__ */ new Set();
    this._outgoingQueue = [];
    this.init = this.start;
    this.send = function(event, payload) {
      if (isArray(event)) {
        _this.batch(event);
        return _this.state;
      }
      var _event = toSCXMLEvent(toEventObject(event, payload));
      if (_this.status === InterpreterStatus.Stopped) {
        return _this.state;
      }
      if (_this.status !== InterpreterStatus.Running && !_this.options.deferEvents) {
        throw new Error('Event "'.concat(_event.name, '" was sent to uninitialized service "').concat(
          _this.machine.id,
          '". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.\nEvent: '
        ).concat(JSON.stringify(_event.data)));
      }
      _this.scheduler.schedule(function() {
        _this.forward(_event);
        var nextState = _this._nextState(_event);
        _this.update(nextState, _event);
      });
      return _this._state;
    };
    this.sendTo = function(event, to, immediate) {
      var isParent = _this.parent && (to === SpecialTargets.Parent || _this.parent.id === to);
      var target = isParent ? _this.parent : isString(to) ? to === SpecialTargets.Internal ? _this : _this.children.get(to) || registry.get(to) : isActor$1(to) ? to : void 0;
      if (!target) {
        if (!isParent) {
          throw new Error("Unable to send event to child '".concat(to, "' from service '").concat(_this.id, "'."));
        }
        return;
      }
      if ("machine" in target) {
        if (_this.status !== InterpreterStatus.Stopped || _this.parent !== target || _this.state.done) {
          var scxmlEvent = __assign$1(__assign$1({}, event), {
            name: event.name === error$1 ? "".concat(error(_this.id)) : event.name,
            origin: _this.sessionId
          });
          if (!immediate && _this.machine.config.predictableActionArguments) {
            _this._outgoingQueue.push([target, scxmlEvent]);
          } else {
            target.send(scxmlEvent);
          }
        }
      } else {
        if (!immediate && _this.machine.config.predictableActionArguments) {
          _this._outgoingQueue.push([target, event.data]);
        } else {
          target.send(event.data);
        }
      }
    };
    this._exec = function(action, context, _event, actionFunctionMap) {
      if (actionFunctionMap === void 0) {
        actionFunctionMap = _this.machine.options.actions;
      }
      var actionOrExec = action.exec || getActionFunction(action.type, actionFunctionMap);
      var exec = isFunction(actionOrExec) ? actionOrExec : actionOrExec ? actionOrExec.exec : action.exec;
      if (exec) {
        try {
          return exec(context, _event.data, !_this.machine.config.predictableActionArguments ? {
            action,
            state: _this.state,
            _event
          } : {
            action,
            _event
          });
        } catch (err) {
          if (_this.parent) {
            _this.parent.send({
              type: "xstate.error",
              data: err
            });
          }
          throw err;
        }
      }
      switch (action.type) {
        case raise$1: {
          var sendAction_1 = action;
          _this.defer(sendAction_1);
          break;
        }
        case send$1:
          var sendAction = action;
          if (typeof sendAction.delay === "number") {
            _this.defer(sendAction);
            return;
          } else {
            if (sendAction.to) {
              _this.sendTo(sendAction._event, sendAction.to, _event === initEvent);
            } else {
              _this.send(sendAction._event);
            }
          }
          break;
        case cancel$1:
          _this.cancel(action.sendId);
          break;
        case start$1: {
          if (_this.status !== InterpreterStatus.Running) {
            return;
          }
          var activity = action.activity;
          if (!_this.machine.config.predictableActionArguments && !_this.state.activities[activity.id || activity.type]) {
            break;
          }
          if (activity.type === ActionTypes.Invoke) {
            var invokeSource = toInvokeSource$1(activity.src);
            var serviceCreator = _this.machine.options.services ? _this.machine.options.services[invokeSource.type] : void 0;
            var id3 = activity.id, data = activity.data;
            var autoForward = "autoForward" in activity ? activity.autoForward : !!activity.forward;
            if (!serviceCreator) {
              return;
            }
            var resolvedData = data ? mapContext(data, context, _event) : void 0;
            if (typeof serviceCreator === "string") {
              return;
            }
            var source = isFunction(serviceCreator) ? serviceCreator(context, _event.data, {
              data: resolvedData,
              src: invokeSource,
              meta: activity.meta
            }) : serviceCreator;
            if (!source) {
              return;
            }
            var options2 = void 0;
            if (isMachine(source)) {
              source = resolvedData ? source.withContext(resolvedData) : source;
              options2 = {
                autoForward
              };
            }
            _this.spawn(source, id3, options2);
          } else {
            _this.spawnActivity(activity);
          }
          break;
        }
        case stop$1: {
          _this.stopChild(action.activity.id);
          break;
        }
        case log:
          var _a2 = action, label = _a2.label, value = _a2.value;
          if (label) {
            _this.logger(label, value);
          } else {
            _this.logger(value);
          }
          break;
      }
    };
    var resolvedOptions = __assign$1(__assign$1({}, Interpreter2.defaultOptions), options);
    var clock = resolvedOptions.clock, logger = resolvedOptions.logger, parent = resolvedOptions.parent, id2 = resolvedOptions.id;
    var resolvedId = id2 !== void 0 ? id2 : machine.id;
    this.id = resolvedId;
    this.logger = logger;
    this.clock = clock;
    this.parent = parent;
    this.options = resolvedOptions;
    this.scheduler = new Scheduler({
      deferEvents: this.options.deferEvents
    });
    this.sessionId = registry.bookId();
  }
  Object.defineProperty(Interpreter2.prototype, "initialState", {
    get: function() {
      var _this = this;
      if (this._initialState) {
        return this._initialState;
      }
      return provide(this, function() {
        _this._initialState = _this.machine.initialState;
        return _this._initialState;
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Interpreter2.prototype, "state", {
    get: function() {
      return this._state;
    },
    enumerable: false,
    configurable: true
  });
  Interpreter2.prototype.execute = function(state2, actionsConfig) {
    var e_1, _a2;
    try {
      for (var _b = __values(state2.actions), _c = _b.next(); !_c.done; _c = _b.next()) {
        var action = _c.value;
        this.exec(action, state2, actionsConfig);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return))
          _a2.call(_b);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
  };
  Interpreter2.prototype.update = function(state2, _event) {
    var e_2, _a2, e_3, _b, e_4, _c, e_5, _d;
    var _this = this;
    state2._sessionid = this.sessionId;
    this._state = state2;
    if ((!this.machine.config.predictableActionArguments || _event === initEvent) && this.options.execute) {
      this.execute(this.state);
    } else {
      var item = void 0;
      while (item = this._outgoingQueue.shift()) {
        item[0].send(item[1]);
      }
    }
    this.children.forEach(function(child) {
      _this.state.children[child.id] = child;
    });
    if (this.devTools) {
      this.devTools.send(_event.data, state2);
    }
    if (state2.event) {
      try {
        for (var _e = __values(this.eventListeners), _f = _e.next(); !_f.done; _f = _e.next()) {
          var listener = _f.value;
          listener(state2.event);
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      } finally {
        try {
          if (_f && !_f.done && (_a2 = _e.return))
            _a2.call(_e);
        } finally {
          if (e_2)
            throw e_2.error;
        }
      }
    }
    try {
      for (var _g = __values(this.listeners), _h = _g.next(); !_h.done; _h = _g.next()) {
        var listener = _h.value;
        listener(state2, state2.event);
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (_h && !_h.done && (_b = _g.return))
          _b.call(_g);
      } finally {
        if (e_3)
          throw e_3.error;
      }
    }
    try {
      for (var _j = __values(this.contextListeners), _k = _j.next(); !_k.done; _k = _j.next()) {
        var contextListener = _k.value;
        contextListener(this.state.context, this.state.history ? this.state.history.context : void 0);
      }
    } catch (e_4_1) {
      e_4 = {
        error: e_4_1
      };
    } finally {
      try {
        if (_k && !_k.done && (_c = _j.return))
          _c.call(_j);
      } finally {
        if (e_4)
          throw e_4.error;
      }
    }
    if (this.state.done) {
      var finalChildStateNode = state2.configuration.find(function(sn) {
        return sn.type === "final" && sn.parent === _this.machine;
      });
      var doneData = finalChildStateNode && finalChildStateNode.doneData ? mapContext(finalChildStateNode.doneData, state2.context, _event) : void 0;
      this._doneEvent = doneInvoke(this.id, doneData);
      try {
        for (var _l = __values(this.doneListeners), _m = _l.next(); !_m.done; _m = _l.next()) {
          var listener = _m.value;
          listener(this._doneEvent);
        }
      } catch (e_5_1) {
        e_5 = {
          error: e_5_1
        };
      } finally {
        try {
          if (_m && !_m.done && (_d = _l.return))
            _d.call(_l);
        } finally {
          if (e_5)
            throw e_5.error;
        }
      }
      this._stop();
      this._stopChildren();
      registry.free(this.sessionId);
    }
  };
  Interpreter2.prototype.onTransition = function(listener) {
    this.listeners.add(listener);
    if (this.status === InterpreterStatus.Running) {
      listener(this.state, this.state.event);
    }
    return this;
  };
  Interpreter2.prototype.subscribe = function(nextListenerOrObserver, _, completeListener) {
    var _this = this;
    var observer = toObserver(nextListenerOrObserver, _, completeListener);
    this.listeners.add(observer.next);
    if (this.status !== InterpreterStatus.NotStarted) {
      observer.next(this.state);
    }
    var completeOnce = function() {
      _this.doneListeners.delete(completeOnce);
      _this.stopListeners.delete(completeOnce);
      observer.complete();
    };
    if (this.status === InterpreterStatus.Stopped) {
      observer.complete();
    } else {
      this.onDone(completeOnce);
      this.onStop(completeOnce);
    }
    return {
      unsubscribe: function() {
        _this.listeners.delete(observer.next);
        _this.doneListeners.delete(completeOnce);
        _this.stopListeners.delete(completeOnce);
      }
    };
  };
  Interpreter2.prototype.onEvent = function(listener) {
    this.eventListeners.add(listener);
    return this;
  };
  Interpreter2.prototype.onSend = function(listener) {
    this.sendListeners.add(listener);
    return this;
  };
  Interpreter2.prototype.onChange = function(listener) {
    this.contextListeners.add(listener);
    return this;
  };
  Interpreter2.prototype.onStop = function(listener) {
    this.stopListeners.add(listener);
    return this;
  };
  Interpreter2.prototype.onDone = function(listener) {
    if (this.status === InterpreterStatus.Stopped && this._doneEvent) {
      listener(this._doneEvent);
    } else {
      this.doneListeners.add(listener);
    }
    return this;
  };
  Interpreter2.prototype.off = function(listener) {
    this.listeners.delete(listener);
    this.eventListeners.delete(listener);
    this.sendListeners.delete(listener);
    this.stopListeners.delete(listener);
    this.doneListeners.delete(listener);
    this.contextListeners.delete(listener);
    return this;
  };
  Interpreter2.prototype.start = function(initialState) {
    var _this = this;
    if (this.status === InterpreterStatus.Running) {
      return this;
    }
    this.machine._init();
    registry.register(this.sessionId, this);
    this.initialized = true;
    this.status = InterpreterStatus.Running;
    var resolvedState = initialState === void 0 ? this.initialState : provide(this, function() {
      return isStateConfig(initialState) ? _this.machine.resolveState(initialState) : _this.machine.resolveState(State.from(initialState, _this.machine.context));
    });
    if (this.options.devTools) {
      this.attachDev();
    }
    this.scheduler.initialize(function() {
      _this.update(resolvedState, initEvent);
    });
    return this;
  };
  Interpreter2.prototype._stopChildren = function() {
    this.children.forEach(function(child) {
      if (isFunction(child.stop)) {
        child.stop();
      }
    });
    this.children.clear();
  };
  Interpreter2.prototype._stop = function() {
    var e_6, _a2, e_7, _b, e_8, _c, e_9, _d, e_10, _e;
    try {
      for (var _f = __values(this.listeners), _g = _f.next(); !_g.done; _g = _f.next()) {
        var listener = _g.value;
        this.listeners.delete(listener);
      }
    } catch (e_6_1) {
      e_6 = {
        error: e_6_1
      };
    } finally {
      try {
        if (_g && !_g.done && (_a2 = _f.return))
          _a2.call(_f);
      } finally {
        if (e_6)
          throw e_6.error;
      }
    }
    try {
      for (var _h = __values(this.stopListeners), _j = _h.next(); !_j.done; _j = _h.next()) {
        var listener = _j.value;
        listener();
        this.stopListeners.delete(listener);
      }
    } catch (e_7_1) {
      e_7 = {
        error: e_7_1
      };
    } finally {
      try {
        if (_j && !_j.done && (_b = _h.return))
          _b.call(_h);
      } finally {
        if (e_7)
          throw e_7.error;
      }
    }
    try {
      for (var _k = __values(this.contextListeners), _l = _k.next(); !_l.done; _l = _k.next()) {
        var listener = _l.value;
        this.contextListeners.delete(listener);
      }
    } catch (e_8_1) {
      e_8 = {
        error: e_8_1
      };
    } finally {
      try {
        if (_l && !_l.done && (_c = _k.return))
          _c.call(_k);
      } finally {
        if (e_8)
          throw e_8.error;
      }
    }
    try {
      for (var _m = __values(this.doneListeners), _o = _m.next(); !_o.done; _o = _m.next()) {
        var listener = _o.value;
        this.doneListeners.delete(listener);
      }
    } catch (e_9_1) {
      e_9 = {
        error: e_9_1
      };
    } finally {
      try {
        if (_o && !_o.done && (_d = _m.return))
          _d.call(_m);
      } finally {
        if (e_9)
          throw e_9.error;
      }
    }
    if (!this.initialized) {
      return this;
    }
    this.initialized = false;
    this.status = InterpreterStatus.Stopped;
    this._initialState = void 0;
    try {
      for (var _p = __values(Object.keys(this.delayedEventsMap)), _q = _p.next(); !_q.done; _q = _p.next()) {
        var key = _q.value;
        this.clock.clearTimeout(this.delayedEventsMap[key]);
      }
    } catch (e_10_1) {
      e_10 = {
        error: e_10_1
      };
    } finally {
      try {
        if (_q && !_q.done && (_e = _p.return))
          _e.call(_p);
      } finally {
        if (e_10)
          throw e_10.error;
      }
    }
    this.scheduler.clear();
    this.scheduler = new Scheduler({
      deferEvents: this.options.deferEvents
    });
  };
  Interpreter2.prototype.stop = function() {
    var _this = this;
    var scheduler = this.scheduler;
    this._stop();
    scheduler.schedule(function() {
      var _event = toSCXMLEvent({
        type: "xstate.stop"
      });
      var nextState = provide(_this, function() {
        var exitActions = flatten(__spreadArray([], __read$1(_this.state.configuration), false).sort(function(a, b2) {
          return b2.order - a.order;
        }).map(function(stateNode) {
          return toActionObjects(stateNode.onExit, _this.machine.options.actions);
        }));
        var _a2 = __read$1(resolveActions(_this.machine, _this.state, _this.state.context, _event, [{
          type: "exit",
          actions: exitActions
        }], _this.machine.config.predictableActionArguments ? _this._exec : void 0, _this.machine.config.predictableActionArguments || _this.machine.config.preserveActionOrder), 2), resolvedActions = _a2[0], updatedContext = _a2[1];
        var newState = new State({
          value: _this.state.value,
          context: updatedContext,
          _event,
          _sessionid: _this.sessionId,
          historyValue: void 0,
          history: _this.state,
          actions: resolvedActions.filter(function(action) {
            return !isRaisableAction(action);
          }),
          activities: {},
          events: [],
          configuration: [],
          transitions: [],
          children: {},
          done: _this.state.done,
          tags: _this.state.tags,
          machine: _this.machine
        });
        newState.changed = true;
        return newState;
      });
      _this.update(nextState, _event);
      _this._stopChildren();
      registry.free(_this.sessionId);
    });
    return this;
  };
  Interpreter2.prototype.batch = function(events) {
    var _this = this;
    if (this.status === InterpreterStatus.NotStarted && this.options.deferEvents)
      ;
    else if (this.status !== InterpreterStatus.Running) {
      throw new Error(
        "".concat(events.length, ' event(s) were sent to uninitialized service "').concat(this.machine.id, '". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.')
      );
    }
    if (!events.length) {
      return;
    }
    var exec = !!this.machine.config.predictableActionArguments && this._exec;
    this.scheduler.schedule(function() {
      var e_11, _a2;
      var nextState = _this.state;
      var batchChanged = false;
      var batchedActions = [];
      var _loop_1 = function(event_12) {
        var _event = toSCXMLEvent(event_12);
        _this.forward(_event);
        nextState = provide(_this, function() {
          return _this.machine.transition(nextState, _event, void 0, exec || void 0);
        });
        batchedActions.push.apply(batchedActions, __spreadArray([], __read$1(_this.machine.config.predictableActionArguments ? nextState.actions : nextState.actions.map(function(a) {
          return bindActionToState(a, nextState);
        })), false));
        batchChanged = batchChanged || !!nextState.changed;
      };
      try {
        for (var events_1 = __values(events), events_1_1 = events_1.next(); !events_1_1.done; events_1_1 = events_1.next()) {
          var event_1 = events_1_1.value;
          _loop_1(event_1);
        }
      } catch (e_11_1) {
        e_11 = {
          error: e_11_1
        };
      } finally {
        try {
          if (events_1_1 && !events_1_1.done && (_a2 = events_1.return))
            _a2.call(events_1);
        } finally {
          if (e_11)
            throw e_11.error;
        }
      }
      nextState.changed = batchChanged;
      nextState.actions = batchedActions;
      _this.update(nextState, toSCXMLEvent(events[events.length - 1]));
    });
  };
  Interpreter2.prototype.sender = function(event) {
    return this.send.bind(this, event);
  };
  Interpreter2.prototype._nextState = function(event, exec) {
    var _this = this;
    if (exec === void 0) {
      exec = !!this.machine.config.predictableActionArguments && this._exec;
    }
    var _event = toSCXMLEvent(event);
    if (_event.name.indexOf(errorPlatform) === 0 && !this.state.nextEvents.some(function(nextEvent) {
      return nextEvent.indexOf(errorPlatform) === 0;
    })) {
      throw _event.data.data;
    }
    var nextState = provide(this, function() {
      return _this.machine.transition(_this.state, _event, void 0, exec || void 0);
    });
    return nextState;
  };
  Interpreter2.prototype.nextState = function(event) {
    return this._nextState(event, false);
  };
  Interpreter2.prototype.forward = function(event) {
    var e_12, _a2;
    try {
      for (var _b = __values(this.forwardTo), _c = _b.next(); !_c.done; _c = _b.next()) {
        var id2 = _c.value;
        var child = this.children.get(id2);
        if (!child) {
          throw new Error("Unable to forward event '".concat(event, "' from interpreter '").concat(this.id, "' to nonexistant child '").concat(id2, "'."));
        }
        child.send(event);
      }
    } catch (e_12_1) {
      e_12 = {
        error: e_12_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return))
          _a2.call(_b);
      } finally {
        if (e_12)
          throw e_12.error;
      }
    }
  };
  Interpreter2.prototype.defer = function(sendAction) {
    var _this = this;
    var timerId = this.clock.setTimeout(function() {
      if ("to" in sendAction && sendAction.to) {
        _this.sendTo(sendAction._event, sendAction.to, true);
      } else {
        _this.send(sendAction._event);
      }
    }, sendAction.delay);
    if (sendAction.id) {
      this.delayedEventsMap[sendAction.id] = timerId;
    }
  };
  Interpreter2.prototype.cancel = function(sendId) {
    this.clock.clearTimeout(this.delayedEventsMap[sendId]);
    delete this.delayedEventsMap[sendId];
  };
  Interpreter2.prototype.exec = function(action, state2, actionFunctionMap) {
    if (actionFunctionMap === void 0) {
      actionFunctionMap = this.machine.options.actions;
    }
    this._exec(action, state2.context, state2._event, actionFunctionMap);
  };
  Interpreter2.prototype.removeChild = function(childId) {
    var _a2;
    this.children.delete(childId);
    this.forwardTo.delete(childId);
    (_a2 = this.state) === null || _a2 === void 0 ? true : delete _a2.children[childId];
  };
  Interpreter2.prototype.stopChild = function(childId) {
    var child = this.children.get(childId);
    if (!child) {
      return;
    }
    this.removeChild(childId);
    if (isFunction(child.stop)) {
      child.stop();
    }
  };
  Interpreter2.prototype.spawn = function(entity, name, options) {
    if (this.status !== InterpreterStatus.Running) {
      return createDeferredActor(entity, name);
    }
    if (isPromiseLike(entity)) {
      return this.spawnPromise(Promise.resolve(entity), name);
    } else if (isFunction(entity)) {
      return this.spawnCallback(entity, name);
    } else if (isSpawnedActor(entity)) {
      return this.spawnActor(entity, name);
    } else if (isObservable(entity)) {
      return this.spawnObservable(entity, name);
    } else if (isMachine(entity)) {
      return this.spawnMachine(entity, __assign$1(__assign$1({}, options), {
        id: name
      }));
    } else if (isBehavior(entity)) {
      return this.spawnBehavior(entity, name);
    } else {
      throw new Error('Unable to spawn entity "'.concat(name, '" of type "').concat(typeof entity, '".'));
    }
  };
  Interpreter2.prototype.spawnMachine = function(machine, options) {
    var _this = this;
    if (options === void 0) {
      options = {};
    }
    var childService = new Interpreter2(machine, __assign$1(__assign$1({}, this.options), {
      parent: this,
      id: options.id || machine.id
    }));
    var resolvedOptions = __assign$1(__assign$1({}, DEFAULT_SPAWN_OPTIONS), options);
    if (resolvedOptions.sync) {
      childService.onTransition(function(state2) {
        _this.send(update, {
          state: state2,
          id: childService.id
        });
      });
    }
    var actor = childService;
    this.children.set(childService.id, actor);
    if (resolvedOptions.autoForward) {
      this.forwardTo.add(childService.id);
    }
    childService.onDone(function(doneEvent) {
      _this.removeChild(childService.id);
      _this.send(toSCXMLEvent(doneEvent, {
        origin: childService.id
      }));
    }).start();
    return actor;
  };
  Interpreter2.prototype.spawnBehavior = function(behavior, id2) {
    var actorRef = spawnBehavior(behavior, {
      id: id2,
      parent: this
    });
    this.children.set(id2, actorRef);
    return actorRef;
  };
  Interpreter2.prototype.spawnPromise = function(promise, id2) {
    var _a2;
    var _this = this;
    var canceled = false;
    var resolvedData;
    promise.then(function(response) {
      if (!canceled) {
        resolvedData = response;
        _this.removeChild(id2);
        _this.send(toSCXMLEvent(doneInvoke(id2, response), {
          origin: id2
        }));
      }
    }, function(errorData) {
      if (!canceled) {
        _this.removeChild(id2);
        var errorEvent = error(id2, errorData);
        try {
          _this.send(toSCXMLEvent(errorEvent, {
            origin: id2
          }));
        } catch (error2) {
          if (_this.devTools) {
            _this.devTools.send(errorEvent, _this.state);
          }
          if (_this.machine.strict) {
            _this.stop();
          }
        }
      }
    });
    var actor = (_a2 = {
      id: id2,
      send: function() {
        return void 0;
      },
      subscribe: function(next2, handleError, complete) {
        var observer = toObserver(next2, handleError, complete);
        var unsubscribed = false;
        promise.then(function(response) {
          if (unsubscribed) {
            return;
          }
          observer.next(response);
          if (unsubscribed) {
            return;
          }
          observer.complete();
        }, function(err) {
          if (unsubscribed) {
            return;
          }
          observer.error(err);
        });
        return {
          unsubscribe: function() {
            return unsubscribed = true;
          }
        };
      },
      stop: function() {
        canceled = true;
      },
      toJSON: function() {
        return {
          id: id2
        };
      },
      getSnapshot: function() {
        return resolvedData;
      }
    }, _a2[symbolObservable] = function() {
      return this;
    }, _a2);
    this.children.set(id2, actor);
    return actor;
  };
  Interpreter2.prototype.spawnCallback = function(callback, id2) {
    var _a2;
    var _this = this;
    var canceled = false;
    var receivers = /* @__PURE__ */ new Set();
    var listeners = /* @__PURE__ */ new Set();
    var emitted;
    var receive = function(e2) {
      emitted = e2;
      listeners.forEach(function(listener) {
        return listener(e2);
      });
      if (canceled) {
        return;
      }
      _this.send(toSCXMLEvent(e2, {
        origin: id2
      }));
    };
    var callbackStop;
    try {
      callbackStop = callback(receive, function(newListener) {
        receivers.add(newListener);
      });
    } catch (err) {
      this.send(error(id2, err));
    }
    if (isPromiseLike(callbackStop)) {
      return this.spawnPromise(callbackStop, id2);
    }
    var actor = (_a2 = {
      id: id2,
      send: function(event) {
        return receivers.forEach(function(receiver) {
          return receiver(event);
        });
      },
      subscribe: function(next2) {
        var observer = toObserver(next2);
        listeners.add(observer.next);
        return {
          unsubscribe: function() {
            listeners.delete(observer.next);
          }
        };
      },
      stop: function() {
        canceled = true;
        if (isFunction(callbackStop)) {
          callbackStop();
        }
      },
      toJSON: function() {
        return {
          id: id2
        };
      },
      getSnapshot: function() {
        return emitted;
      }
    }, _a2[symbolObservable] = function() {
      return this;
    }, _a2);
    this.children.set(id2, actor);
    return actor;
  };
  Interpreter2.prototype.spawnObservable = function(source, id2) {
    var _a2;
    var _this = this;
    var emitted;
    var subscription = source.subscribe(function(value) {
      emitted = value;
      _this.send(toSCXMLEvent(value, {
        origin: id2
      }));
    }, function(err) {
      _this.removeChild(id2);
      _this.send(toSCXMLEvent(error(id2, err), {
        origin: id2
      }));
    }, function() {
      _this.removeChild(id2);
      _this.send(toSCXMLEvent(doneInvoke(id2), {
        origin: id2
      }));
    });
    var actor = (_a2 = {
      id: id2,
      send: function() {
        return void 0;
      },
      subscribe: function(next2, handleError, complete) {
        return source.subscribe(next2, handleError, complete);
      },
      stop: function() {
        return subscription.unsubscribe();
      },
      getSnapshot: function() {
        return emitted;
      },
      toJSON: function() {
        return {
          id: id2
        };
      }
    }, _a2[symbolObservable] = function() {
      return this;
    }, _a2);
    this.children.set(id2, actor);
    return actor;
  };
  Interpreter2.prototype.spawnActor = function(actor, name) {
    this.children.set(name, actor);
    return actor;
  };
  Interpreter2.prototype.spawnActivity = function(activity) {
    var implementation = this.machine.options && this.machine.options.activities ? this.machine.options.activities[activity.type] : void 0;
    if (!implementation) {
      return;
    }
    var dispose = implementation(this.state.context, activity);
    this.spawnEffect(activity.id, dispose);
  };
  Interpreter2.prototype.spawnEffect = function(id2, dispose) {
    var _a2;
    this.children.set(id2, (_a2 = {
      id: id2,
      send: function() {
        return void 0;
      },
      subscribe: function() {
        return {
          unsubscribe: function() {
            return void 0;
          }
        };
      },
      stop: dispose || void 0,
      getSnapshot: function() {
        return void 0;
      },
      toJSON: function() {
        return {
          id: id2
        };
      }
    }, _a2[symbolObservable] = function() {
      return this;
    }, _a2));
  };
  Interpreter2.prototype.attachDev = function() {
    var global2 = getGlobal();
    if (this.options.devTools && global2) {
      if (global2.__REDUX_DEVTOOLS_EXTENSION__) {
        var devToolsOptions = typeof this.options.devTools === "object" ? this.options.devTools : void 0;
        this.devTools = global2.__REDUX_DEVTOOLS_EXTENSION__.connect(__assign$1(__assign$1({
          name: this.id,
          autoPause: true,
          stateSanitizer: function(state2) {
            return {
              value: state2.value,
              context: state2.context,
              actions: state2.actions
            };
          }
        }, devToolsOptions), {
          features: __assign$1({
            jump: false,
            skip: false
          }, devToolsOptions ? devToolsOptions.features : void 0)
        }), this.machine);
        this.devTools.init(this.state);
      }
      registerService(this);
    }
  };
  Interpreter2.prototype.toJSON = function() {
    return {
      id: this.id
    };
  };
  Interpreter2.prototype[symbolObservable] = function() {
    return this;
  };
  Interpreter2.prototype.getSnapshot = function() {
    if (this.status === InterpreterStatus.NotStarted) {
      return this.initialState;
    }
    return this._state;
  };
  Interpreter2.defaultOptions = {
    execute: true,
    deferEvents: true,
    clock: {
      setTimeout: function(fn2, ms) {
        return setTimeout(fn2, ms);
      },
      clearTimeout: function(id2) {
        return clearTimeout(id2);
      }
    },
    logger: /* @__PURE__ */ console.log.bind(console),
    devTools: false
  };
  Interpreter2.interpret = interpret;
  return Interpreter2;
}();
function interpret(machine, options) {
  var interpreter = new Interpreter(machine, options);
  return interpreter;
}
function toInvokeSource(src) {
  if (typeof src === "string") {
    var simpleSrc = {
      type: src
    };
    simpleSrc.toString = function() {
      return src;
    };
    return simpleSrc;
  }
  return src;
}
function toInvokeDefinition(invokeConfig) {
  return __assign$1(__assign$1({
    type: invoke
  }, invokeConfig), {
    toJSON: function() {
      invokeConfig.onDone;
      invokeConfig.onError;
      var invokeDef = __rest$1(invokeConfig, ["onDone", "onError"]);
      return __assign$1(__assign$1({}, invokeDef), {
        type: invoke,
        src: toInvokeSource(invokeConfig.src)
      });
    }
  });
}
var NULL_EVENT = "";
var STATE_IDENTIFIER = "#";
var WILDCARD = "*";
var EMPTY_OBJECT = {};
var isStateId = function(str) {
  return str[0] === STATE_IDENTIFIER;
};
var createDefaultOptions = function() {
  return {
    actions: {},
    guards: {},
    services: {},
    activities: {},
    delays: {}
  };
};
var StateNode = /* @__PURE__ */ function() {
  function StateNode2(config, options, _context, _stateInfo) {
    if (_context === void 0) {
      _context = "context" in config ? config.context : void 0;
    }
    var _this = this;
    var _a2;
    this.config = config;
    this._context = _context;
    this.order = -1;
    this.__xstatenode = true;
    this.__cache = {
      events: void 0,
      relativeValue: /* @__PURE__ */ new Map(),
      initialStateValue: void 0,
      initialState: void 0,
      on: void 0,
      transitions: void 0,
      candidates: {},
      delayedTransitions: void 0
    };
    this.idMap = {};
    this.tags = [];
    this.options = Object.assign(createDefaultOptions(), options);
    this.parent = _stateInfo === null || _stateInfo === void 0 ? void 0 : _stateInfo.parent;
    this.key = this.config.key || (_stateInfo === null || _stateInfo === void 0 ? void 0 : _stateInfo.key) || this.config.id || "(machine)";
    this.machine = this.parent ? this.parent.machine : this;
    this.path = this.parent ? this.parent.path.concat(this.key) : [];
    this.delimiter = this.config.delimiter || (this.parent ? this.parent.delimiter : STATE_DELIMITER);
    this.id = this.config.id || __spreadArray([this.machine.key], __read$1(this.path), false).join(this.delimiter);
    this.version = this.parent ? this.parent.version : this.config.version;
    this.type = this.config.type || (this.config.parallel ? "parallel" : this.config.states && Object.keys(this.config.states).length ? "compound" : this.config.history ? "history" : "atomic");
    this.schema = this.parent ? this.machine.schema : (_a2 = this.config.schema) !== null && _a2 !== void 0 ? _a2 : {};
    this.description = this.config.description;
    this.initial = this.config.initial;
    this.states = this.config.states ? mapValues(this.config.states, function(stateConfig, key) {
      var _a3;
      var stateNode = new StateNode2(stateConfig, {}, void 0, {
        parent: _this,
        key
      });
      Object.assign(_this.idMap, __assign$1((_a3 = {}, _a3[stateNode.id] = stateNode, _a3), stateNode.idMap));
      return stateNode;
    }) : EMPTY_OBJECT;
    var order2 = 0;
    function dfs(stateNode) {
      var e_1, _a3;
      stateNode.order = order2++;
      try {
        for (var _b = __values(getAllChildren(stateNode)), _c = _b.next(); !_c.done; _c = _b.next()) {
          var child = _c.value;
          dfs(child);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a3 = _b.return))
            _a3.call(_b);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
    }
    dfs(this);
    this.history = this.config.history === true ? "shallow" : this.config.history || false;
    this._transient = !!this.config.always || (!this.config.on ? false : Array.isArray(this.config.on) ? this.config.on.some(function(_a3) {
      var event = _a3.event;
      return event === NULL_EVENT;
    }) : NULL_EVENT in this.config.on);
    this.strict = !!this.config.strict;
    this.onEntry = toArray(this.config.entry || this.config.onEntry).map(function(action) {
      return toActionObject(action);
    });
    this.onExit = toArray(this.config.exit || this.config.onExit).map(function(action) {
      return toActionObject(action);
    });
    this.meta = this.config.meta;
    this.doneData = this.type === "final" ? this.config.data : void 0;
    this.invoke = toArray(this.config.invoke).map(function(invokeConfig, i) {
      var _a3, _b;
      if (isMachine(invokeConfig)) {
        var invokeId = createInvokeId(_this.id, i);
        _this.machine.options.services = __assign$1((_a3 = {}, _a3[invokeId] = invokeConfig, _a3), _this.machine.options.services);
        return toInvokeDefinition({
          src: invokeId,
          id: invokeId
        });
      } else if (isString(invokeConfig.src)) {
        var invokeId = invokeConfig.id || createInvokeId(_this.id, i);
        return toInvokeDefinition(__assign$1(__assign$1({}, invokeConfig), {
          id: invokeId,
          src: invokeConfig.src
        }));
      } else if (isMachine(invokeConfig.src) || isFunction(invokeConfig.src)) {
        var invokeId = invokeConfig.id || createInvokeId(_this.id, i);
        _this.machine.options.services = __assign$1((_b = {}, _b[invokeId] = invokeConfig.src, _b), _this.machine.options.services);
        return toInvokeDefinition(__assign$1(__assign$1({
          id: invokeId
        }, invokeConfig), {
          src: invokeId
        }));
      } else {
        var invokeSource = invokeConfig.src;
        return toInvokeDefinition(__assign$1(__assign$1({
          id: createInvokeId(_this.id, i)
        }, invokeConfig), {
          src: invokeSource
        }));
      }
    });
    this.activities = toArray(this.config.activities).concat(this.invoke).map(function(activity) {
      return toActivityDefinition(activity);
    });
    this.transition = this.transition.bind(this);
    this.tags = toArray(this.config.tags);
  }
  StateNode2.prototype._init = function() {
    if (this.__cache.transitions) {
      return;
    }
    getAllStateNodes(this).forEach(function(stateNode) {
      return stateNode.on;
    });
  };
  StateNode2.prototype.withConfig = function(options, context) {
    var _a2 = this.options, actions = _a2.actions, activities = _a2.activities, guards = _a2.guards, services = _a2.services, delays = _a2.delays;
    return new StateNode2(this.config, {
      actions: __assign$1(__assign$1({}, actions), options.actions),
      activities: __assign$1(__assign$1({}, activities), options.activities),
      guards: __assign$1(__assign$1({}, guards), options.guards),
      services: __assign$1(__assign$1({}, services), options.services),
      delays: __assign$1(__assign$1({}, delays), options.delays)
    }, context !== null && context !== void 0 ? context : this.context);
  };
  StateNode2.prototype.withContext = function(context) {
    return new StateNode2(this.config, this.options, context);
  };
  Object.defineProperty(StateNode2.prototype, "context", {
    get: function() {
      return isFunction(this._context) ? this._context() : this._context;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StateNode2.prototype, "definition", {
    get: function() {
      return {
        id: this.id,
        key: this.key,
        version: this.version,
        context: this.context,
        type: this.type,
        initial: this.initial,
        history: this.history,
        states: mapValues(this.states, function(state2) {
          return state2.definition;
        }),
        on: this.on,
        transitions: this.transitions,
        entry: this.onEntry,
        exit: this.onExit,
        activities: this.activities || [],
        meta: this.meta,
        order: this.order || -1,
        data: this.doneData,
        invoke: this.invoke,
        description: this.description,
        tags: this.tags
      };
    },
    enumerable: false,
    configurable: true
  });
  StateNode2.prototype.toJSON = function() {
    return this.definition;
  };
  Object.defineProperty(StateNode2.prototype, "on", {
    get: function() {
      if (this.__cache.on) {
        return this.__cache.on;
      }
      var transitions = this.transitions;
      return this.__cache.on = transitions.reduce(function(map, transition2) {
        map[transition2.eventType] = map[transition2.eventType] || [];
        map[transition2.eventType].push(transition2);
        return map;
      }, {});
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StateNode2.prototype, "after", {
    get: function() {
      return this.__cache.delayedTransitions || (this.__cache.delayedTransitions = this.getDelayedTransitions(), this.__cache.delayedTransitions);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StateNode2.prototype, "transitions", {
    get: function() {
      return this.__cache.transitions || (this.__cache.transitions = this.formatTransitions(), this.__cache.transitions);
    },
    enumerable: false,
    configurable: true
  });
  StateNode2.prototype.getCandidates = function(eventName) {
    if (this.__cache.candidates[eventName]) {
      return this.__cache.candidates[eventName];
    }
    var transient = eventName === NULL_EVENT;
    var candidates = this.transitions.filter(function(transition2) {
      var sameEventType = transition2.eventType === eventName;
      return transient ? sameEventType : sameEventType || transition2.eventType === WILDCARD;
    });
    this.__cache.candidates[eventName] = candidates;
    return candidates;
  };
  StateNode2.prototype.getDelayedTransitions = function() {
    var _this = this;
    var afterConfig = this.config.after;
    if (!afterConfig) {
      return [];
    }
    var mutateEntryExit = function(delay2, i) {
      var delayRef = isFunction(delay2) ? "".concat(_this.id, ":delay[").concat(i, "]") : delay2;
      var eventType = after(delayRef, _this.id);
      _this.onEntry.push(send(eventType, {
        delay: delay2
      }));
      _this.onExit.push(cancel(eventType));
      return eventType;
    };
    var delayedTransitions = isArray(afterConfig) ? afterConfig.map(function(transition2, i) {
      var eventType = mutateEntryExit(transition2.delay, i);
      return __assign$1(__assign$1({}, transition2), {
        event: eventType
      });
    }) : flatten(Object.keys(afterConfig).map(function(delay2, i) {
      var configTransition = afterConfig[delay2];
      var resolvedTransition = isString(configTransition) ? {
        target: configTransition
      } : configTransition;
      var resolvedDelay = !isNaN(+delay2) ? +delay2 : delay2;
      var eventType = mutateEntryExit(resolvedDelay, i);
      return toArray(resolvedTransition).map(function(transition2) {
        return __assign$1(__assign$1({}, transition2), {
          event: eventType,
          delay: resolvedDelay
        });
      });
    }));
    return delayedTransitions.map(function(delayedTransition) {
      var delay2 = delayedTransition.delay;
      return __assign$1(__assign$1({}, _this.formatTransition(delayedTransition)), {
        delay: delay2
      });
    });
  };
  StateNode2.prototype.getStateNodes = function(state2) {
    var _a2;
    var _this = this;
    if (!state2) {
      return [];
    }
    var stateValue = state2 instanceof State ? state2.value : toStateValue(state2, this.delimiter);
    if (isString(stateValue)) {
      var initialStateValue = this.getStateNode(stateValue).initial;
      return initialStateValue !== void 0 ? this.getStateNodes((_a2 = {}, _a2[stateValue] = initialStateValue, _a2)) : [this, this.states[stateValue]];
    }
    var subStateKeys = Object.keys(stateValue);
    var subStateNodes = [this];
    subStateNodes.push.apply(subStateNodes, __spreadArray([], __read$1(flatten(subStateKeys.map(function(subStateKey) {
      return _this.getStateNode(subStateKey).getStateNodes(stateValue[subStateKey]);
    }))), false));
    return subStateNodes;
  };
  StateNode2.prototype.handles = function(event) {
    var eventType = getEventType(event);
    return this.events.includes(eventType);
  };
  StateNode2.prototype.resolveState = function(state2) {
    var stateFromConfig = state2 instanceof State ? state2 : State.create(state2);
    var configuration = Array.from(getConfiguration([], this.getStateNodes(stateFromConfig.value)));
    return new State(__assign$1(__assign$1({}, stateFromConfig), {
      value: this.resolve(stateFromConfig.value),
      configuration,
      done: isInFinalState(configuration, this),
      tags: getTagsFromConfiguration(configuration),
      machine: this.machine
    }));
  };
  StateNode2.prototype.transitionLeafNode = function(stateValue, state2, _event) {
    var stateNode = this.getStateNode(stateValue);
    var next2 = stateNode.next(state2, _event);
    if (!next2 || !next2.transitions.length) {
      return this.next(state2, _event);
    }
    return next2;
  };
  StateNode2.prototype.transitionCompoundNode = function(stateValue, state2, _event) {
    var subStateKeys = Object.keys(stateValue);
    var stateNode = this.getStateNode(subStateKeys[0]);
    var next2 = stateNode._transition(stateValue[subStateKeys[0]], state2, _event);
    if (!next2 || !next2.transitions.length) {
      return this.next(state2, _event);
    }
    return next2;
  };
  StateNode2.prototype.transitionParallelNode = function(stateValue, state2, _event) {
    var e_2, _a2;
    var transitionMap = {};
    try {
      for (var _b = __values(Object.keys(stateValue)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var subStateKey = _c.value;
        var subStateValue = stateValue[subStateKey];
        if (!subStateValue) {
          continue;
        }
        var subStateNode = this.getStateNode(subStateKey);
        var next2 = subStateNode._transition(subStateValue, state2, _event);
        if (next2) {
          transitionMap[subStateKey] = next2;
        }
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return))
          _a2.call(_b);
      } finally {
        if (e_2)
          throw e_2.error;
      }
    }
    var stateTransitions = Object.keys(transitionMap).map(function(key) {
      return transitionMap[key];
    });
    var enabledTransitions = flatten(stateTransitions.map(function(st) {
      return st.transitions;
    }));
    var willTransition = stateTransitions.some(function(st) {
      return st.transitions.length > 0;
    });
    if (!willTransition) {
      return this.next(state2, _event);
    }
    var configuration = flatten(Object.keys(transitionMap).map(function(key) {
      return transitionMap[key].configuration;
    }));
    return {
      transitions: enabledTransitions,
      exitSet: flatten(stateTransitions.map(function(t2) {
        return t2.exitSet;
      })),
      configuration,
      source: state2,
      actions: flatten(Object.keys(transitionMap).map(function(key) {
        return transitionMap[key].actions;
      }))
    };
  };
  StateNode2.prototype._transition = function(stateValue, state2, _event) {
    if (isString(stateValue)) {
      return this.transitionLeafNode(stateValue, state2, _event);
    }
    if (Object.keys(stateValue).length === 1) {
      return this.transitionCompoundNode(stateValue, state2, _event);
    }
    return this.transitionParallelNode(stateValue, state2, _event);
  };
  StateNode2.prototype.getTransitionData = function(state2, event) {
    return this._transition(state2.value, state2, toSCXMLEvent(event));
  };
  StateNode2.prototype.next = function(state2, _event) {
    var e_3, _a2;
    var _this = this;
    var eventName = _event.name;
    var actions = [];
    var nextStateNodes = [];
    var selectedTransition;
    try {
      for (var _b = __values(this.getCandidates(eventName)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var candidate = _c.value;
        var cond = candidate.cond, stateIn = candidate.in;
        var resolvedContext = state2.context;
        var isInState = stateIn ? isString(stateIn) && isStateId(stateIn) ? state2.matches(toStateValue(this.getStateNodeById(stateIn).path, this.delimiter)) : matchesState(toStateValue(stateIn, this.delimiter), path(this.path.slice(0, -2))(state2.value)) : true;
        var guardPassed = false;
        try {
          guardPassed = !cond || evaluateGuard(this.machine, cond, resolvedContext, _event, state2);
        } catch (err) {
          throw new Error("Unable to evaluate guard '".concat(cond.name || cond.type, "' in transition for event '").concat(eventName, "' in state node '").concat(this.id, "':\n").concat(err.message));
        }
        if (guardPassed && isInState) {
          if (candidate.target !== void 0) {
            nextStateNodes = candidate.target;
          }
          actions.push.apply(actions, __spreadArray([], __read$1(candidate.actions), false));
          selectedTransition = candidate;
          break;
        }
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return))
          _a2.call(_b);
      } finally {
        if (e_3)
          throw e_3.error;
      }
    }
    if (!selectedTransition) {
      return void 0;
    }
    if (!nextStateNodes.length) {
      return {
        transitions: [selectedTransition],
        exitSet: [],
        configuration: state2.value ? [this] : [],
        source: state2,
        actions
      };
    }
    var allNextStateNodes = flatten(nextStateNodes.map(function(stateNode) {
      return _this.getRelativeStateNodes(stateNode, state2.historyValue);
    }));
    var isInternal = !!selectedTransition.internal;
    return {
      transitions: [selectedTransition],
      exitSet: isInternal ? [] : flatten(nextStateNodes.map(function(targetNode) {
        return _this.getPotentiallyReenteringNodes(targetNode);
      })),
      configuration: allNextStateNodes,
      source: state2,
      actions
    };
  };
  StateNode2.prototype.getPotentiallyReenteringNodes = function(targetNode) {
    if (this.order < targetNode.order) {
      return [this];
    }
    var nodes = [];
    var marker = this;
    var possibleAncestor = targetNode;
    while (marker && marker !== possibleAncestor) {
      nodes.push(marker);
      marker = marker.parent;
    }
    if (marker !== possibleAncestor) {
      return [];
    }
    nodes.push(possibleAncestor);
    return nodes;
  };
  StateNode2.prototype.getActions = function(resolvedConfig, isDone, transition2, currentContext, _event, prevState, predictableExec) {
    var e_4, _a2, e_5, _b;
    var _this = this;
    var prevConfig = prevState ? getConfiguration([], this.getStateNodes(prevState.value)) : [];
    var entrySet = /* @__PURE__ */ new Set();
    try {
      for (var _c = __values(Array.from(resolvedConfig).sort(function(a, b2) {
        return a.order - b2.order;
      })), _d = _c.next(); !_d.done; _d = _c.next()) {
        var sn = _d.value;
        if (!has(prevConfig, sn) || has(transition2.exitSet, sn) || sn.parent && entrySet.has(sn.parent)) {
          entrySet.add(sn);
        }
      }
    } catch (e_4_1) {
      e_4 = {
        error: e_4_1
      };
    } finally {
      try {
        if (_d && !_d.done && (_a2 = _c.return))
          _a2.call(_c);
      } finally {
        if (e_4)
          throw e_4.error;
      }
    }
    try {
      for (var prevConfig_1 = __values(prevConfig), prevConfig_1_1 = prevConfig_1.next(); !prevConfig_1_1.done; prevConfig_1_1 = prevConfig_1.next()) {
        var sn = prevConfig_1_1.value;
        if (!has(resolvedConfig, sn) || has(transition2.exitSet, sn.parent)) {
          transition2.exitSet.push(sn);
        }
      }
    } catch (e_5_1) {
      e_5 = {
        error: e_5_1
      };
    } finally {
      try {
        if (prevConfig_1_1 && !prevConfig_1_1.done && (_b = prevConfig_1.return))
          _b.call(prevConfig_1);
      } finally {
        if (e_5)
          throw e_5.error;
      }
    }
    transition2.exitSet.sort(function(a, b2) {
      return b2.order - a.order;
    });
    var entryStates = Array.from(entrySet).sort(function(a, b2) {
      return a.order - b2.order;
    });
    var exitStates = new Set(transition2.exitSet);
    var doneEvents = flatten(entryStates.map(function(sn2) {
      var events = [];
      if (sn2.type !== "final") {
        return events;
      }
      var parent = sn2.parent;
      if (!parent.parent) {
        return events;
      }
      events.push(
        done(sn2.id, sn2.doneData),
        done(parent.id, sn2.doneData ? mapContext(sn2.doneData, currentContext, _event) : void 0)
      );
      var grandparent = parent.parent;
      if (grandparent.type === "parallel") {
        if (getChildren(grandparent).every(function(parentNode) {
          return isInFinalState(transition2.configuration, parentNode);
        })) {
          events.push(done(grandparent.id));
        }
      }
      return events;
    }));
    var entryActions = entryStates.map(function(stateNode) {
      var entryActions2 = stateNode.onEntry;
      var invokeActions = stateNode.activities.map(function(activity) {
        return start(activity);
      });
      return {
        type: "entry",
        actions: toActionObjects(predictableExec ? __spreadArray(__spreadArray([], __read$1(entryActions2), false), __read$1(invokeActions), false) : __spreadArray(__spreadArray([], __read$1(invokeActions), false), __read$1(entryActions2), false), _this.machine.options.actions)
      };
    }).concat({
      type: "state_done",
      actions: doneEvents.map(function(event) {
        return raise(event);
      })
    });
    var exitActions = Array.from(exitStates).map(function(stateNode) {
      return {
        type: "exit",
        actions: toActionObjects(__spreadArray(__spreadArray([], __read$1(stateNode.onExit), false), __read$1(stateNode.activities.map(function(activity) {
          return stop(activity);
        })), false), _this.machine.options.actions)
      };
    });
    var actions = exitActions.concat({
      type: "transition",
      actions: toActionObjects(transition2.actions, this.machine.options.actions)
    }).concat(entryActions);
    if (isDone) {
      var stopActions = toActionObjects(flatten(__spreadArray([], __read$1(resolvedConfig), false).sort(function(a, b2) {
        return b2.order - a.order;
      }).map(function(stateNode) {
        return stateNode.onExit;
      })), this.machine.options.actions).filter(function(action) {
        return !isRaisableAction(action);
      });
      return actions.concat({
        type: "stop",
        actions: stopActions
      });
    }
    return actions;
  };
  StateNode2.prototype.transition = function(state2, event, context, exec) {
    if (state2 === void 0) {
      state2 = this.initialState;
    }
    var _event = toSCXMLEvent(event);
    var currentState;
    if (state2 instanceof State) {
      currentState = context === void 0 ? state2 : this.resolveState(State.from(state2, context));
    } else {
      var resolvedStateValue = isString(state2) ? this.resolve(pathToStateValue(this.getResolvedPath(state2))) : this.resolve(state2);
      var resolvedContext = context !== null && context !== void 0 ? context : this.machine.context;
      currentState = this.resolveState(State.from(resolvedStateValue, resolvedContext));
    }
    if (this.strict) {
      if (!this.events.includes(_event.name) && !isBuiltInEvent(_event.name)) {
        throw new Error("Machine '".concat(this.id, "' does not accept event '").concat(_event.name, "'"));
      }
    }
    var stateTransition = this._transition(currentState.value, currentState, _event) || {
      transitions: [],
      configuration: [],
      exitSet: [],
      source: currentState,
      actions: []
    };
    var prevConfig = getConfiguration([], this.getStateNodes(currentState.value));
    var resolvedConfig = stateTransition.configuration.length ? getConfiguration(prevConfig, stateTransition.configuration) : prevConfig;
    stateTransition.configuration = __spreadArray([], __read$1(resolvedConfig), false);
    return this.resolveTransition(stateTransition, currentState, currentState.context, exec, _event);
  };
  StateNode2.prototype.resolveRaisedTransition = function(state2, _event, originalEvent, predictableExec) {
    var _a2;
    var currentActions = state2.actions;
    state2 = this.transition(state2, _event, void 0, predictableExec);
    state2._event = originalEvent;
    state2.event = originalEvent.data;
    (_a2 = state2.actions).unshift.apply(_a2, __spreadArray([], __read$1(currentActions), false));
    return state2;
  };
  StateNode2.prototype.resolveTransition = function(stateTransition, currentState, context, predictableExec, _event) {
    var e_6, _a2, e_7, _b;
    var _this = this;
    if (_event === void 0) {
      _event = initEvent;
    }
    var configuration = stateTransition.configuration;
    var willTransition = !currentState || stateTransition.transitions.length > 0;
    var resolvedConfiguration = willTransition ? stateTransition.configuration : currentState ? currentState.configuration : [];
    var isDone = isInFinalState(resolvedConfiguration, this);
    var resolvedStateValue = willTransition ? getValue(this.machine, configuration) : void 0;
    var historyValue = currentState ? currentState.historyValue ? currentState.historyValue : stateTransition.source ? this.machine.historyValue(currentState.value) : void 0 : void 0;
    var actionBlocks = this.getActions(new Set(resolvedConfiguration), isDone, stateTransition, context, _event, currentState, predictableExec);
    var activities = currentState ? __assign$1({}, currentState.activities) : {};
    try {
      for (var actionBlocks_1 = __values(actionBlocks), actionBlocks_1_1 = actionBlocks_1.next(); !actionBlocks_1_1.done; actionBlocks_1_1 = actionBlocks_1.next()) {
        var block = actionBlocks_1_1.value;
        try {
          for (var _c = (e_7 = void 0, __values(block.actions)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var action = _d.value;
            if (action.type === start$1) {
              activities[action.activity.id || action.activity.type] = action;
            } else if (action.type === stop$1) {
              activities[action.activity.id || action.activity.type] = false;
            }
          }
        } catch (e_7_1) {
          e_7 = {
            error: e_7_1
          };
        } finally {
          try {
            if (_d && !_d.done && (_b = _c.return))
              _b.call(_c);
          } finally {
            if (e_7)
              throw e_7.error;
          }
        }
      }
    } catch (e_6_1) {
      e_6 = {
        error: e_6_1
      };
    } finally {
      try {
        if (actionBlocks_1_1 && !actionBlocks_1_1.done && (_a2 = actionBlocks_1.return))
          _a2.call(actionBlocks_1);
      } finally {
        if (e_6)
          throw e_6.error;
      }
    }
    var _e = __read$1(resolveActions(this, currentState, context, _event, actionBlocks, predictableExec, this.machine.config.predictableActionArguments || this.machine.config.preserveActionOrder), 2), resolvedActions = _e[0], updatedContext = _e[1];
    var _f = __read$1(partition(resolvedActions, isRaisableAction), 2), raisedEvents = _f[0], nonRaisedActions = _f[1];
    var invokeActions = resolvedActions.filter(function(action2) {
      var _a3;
      return action2.type === start$1 && ((_a3 = action2.activity) === null || _a3 === void 0 ? void 0 : _a3.type) === invoke;
    });
    var children2 = invokeActions.reduce(function(acc, action2) {
      acc[action2.activity.id] = createInvocableActor(action2.activity, _this.machine, updatedContext, _event);
      return acc;
    }, currentState ? __assign$1({}, currentState.children) : {});
    var nextState = new State({
      value: resolvedStateValue || currentState.value,
      context: updatedContext,
      _event,
      _sessionid: currentState ? currentState._sessionid : null,
      historyValue: resolvedStateValue ? historyValue ? updateHistoryValue(historyValue, resolvedStateValue) : void 0 : currentState ? currentState.historyValue : void 0,
      history: !resolvedStateValue || stateTransition.source ? currentState : void 0,
      actions: resolvedStateValue ? nonRaisedActions : [],
      activities: resolvedStateValue ? activities : currentState ? currentState.activities : {},
      events: [],
      configuration: resolvedConfiguration,
      transitions: stateTransition.transitions,
      children: children2,
      done: isDone,
      tags: getTagsFromConfiguration(resolvedConfiguration),
      machine: this
    });
    var didUpdateContext = context !== updatedContext;
    nextState.changed = _event.name === update || didUpdateContext;
    var history = nextState.history;
    if (history) {
      delete history.history;
    }
    var hasAlwaysTransitions = !isDone && (this._transient || configuration.some(function(stateNode) {
      return stateNode._transient;
    }));
    if (!willTransition && (!hasAlwaysTransitions || _event.name === NULL_EVENT)) {
      return nextState;
    }
    var maybeNextState = nextState;
    if (!isDone) {
      if (hasAlwaysTransitions) {
        maybeNextState = this.resolveRaisedTransition(maybeNextState, {
          type: nullEvent
        }, _event, predictableExec);
      }
      while (raisedEvents.length) {
        var raisedEvent = raisedEvents.shift();
        maybeNextState = this.resolveRaisedTransition(maybeNextState, raisedEvent._event, _event, predictableExec);
      }
    }
    var changed = maybeNextState.changed || (history ? !!maybeNextState.actions.length || didUpdateContext || typeof history.value !== typeof maybeNextState.value || !stateValuesEqual(maybeNextState.value, history.value) : void 0);
    maybeNextState.changed = changed;
    maybeNextState.history = history;
    return maybeNextState;
  };
  StateNode2.prototype.getStateNode = function(stateKey) {
    if (isStateId(stateKey)) {
      return this.machine.getStateNodeById(stateKey);
    }
    if (!this.states) {
      throw new Error("Unable to retrieve child state '".concat(stateKey, "' from '").concat(this.id, "'; no child states exist."));
    }
    var result = this.states[stateKey];
    if (!result) {
      throw new Error("Child state '".concat(stateKey, "' does not exist on '").concat(this.id, "'"));
    }
    return result;
  };
  StateNode2.prototype.getStateNodeById = function(stateId) {
    var resolvedStateId = isStateId(stateId) ? stateId.slice(STATE_IDENTIFIER.length) : stateId;
    if (resolvedStateId === this.id) {
      return this;
    }
    var stateNode = this.machine.idMap[resolvedStateId];
    if (!stateNode) {
      throw new Error("Child state node '#".concat(resolvedStateId, "' does not exist on machine '").concat(this.id, "'"));
    }
    return stateNode;
  };
  StateNode2.prototype.getStateNodeByPath = function(statePath) {
    if (typeof statePath === "string" && isStateId(statePath)) {
      try {
        return this.getStateNodeById(statePath.slice(1));
      } catch (e2) {
      }
    }
    var arrayStatePath = toStatePath(statePath, this.delimiter).slice();
    var currentStateNode = this;
    while (arrayStatePath.length) {
      var key = arrayStatePath.shift();
      if (!key.length) {
        break;
      }
      currentStateNode = currentStateNode.getStateNode(key);
    }
    return currentStateNode;
  };
  StateNode2.prototype.resolve = function(stateValue) {
    var _a2;
    var _this = this;
    if (!stateValue) {
      return this.initialStateValue || EMPTY_OBJECT;
    }
    switch (this.type) {
      case "parallel":
        return mapValues(this.initialStateValue, function(subStateValue, subStateKey) {
          return subStateValue ? _this.getStateNode(subStateKey).resolve(stateValue[subStateKey] || subStateValue) : EMPTY_OBJECT;
        });
      case "compound":
        if (isString(stateValue)) {
          var subStateNode = this.getStateNode(stateValue);
          if (subStateNode.type === "parallel" || subStateNode.type === "compound") {
            return _a2 = {}, _a2[stateValue] = subStateNode.initialStateValue, _a2;
          }
          return stateValue;
        }
        if (!Object.keys(stateValue).length) {
          return this.initialStateValue || {};
        }
        return mapValues(stateValue, function(subStateValue, subStateKey) {
          return subStateValue ? _this.getStateNode(subStateKey).resolve(subStateValue) : EMPTY_OBJECT;
        });
      default:
        return stateValue || EMPTY_OBJECT;
    }
  };
  StateNode2.prototype.getResolvedPath = function(stateIdentifier) {
    if (isStateId(stateIdentifier)) {
      var stateNode = this.machine.idMap[stateIdentifier.slice(STATE_IDENTIFIER.length)];
      if (!stateNode) {
        throw new Error("Unable to find state node '".concat(stateIdentifier, "'"));
      }
      return stateNode.path;
    }
    return toStatePath(stateIdentifier, this.delimiter);
  };
  Object.defineProperty(StateNode2.prototype, "initialStateValue", {
    get: function() {
      var _a2;
      if (this.__cache.initialStateValue) {
        return this.__cache.initialStateValue;
      }
      var initialStateValue;
      if (this.type === "parallel") {
        initialStateValue = mapFilterValues(this.states, function(state2) {
          return state2.initialStateValue || EMPTY_OBJECT;
        }, function(stateNode) {
          return !(stateNode.type === "history");
        });
      } else if (this.initial !== void 0) {
        if (!this.states[this.initial]) {
          throw new Error("Initial state '".concat(this.initial, "' not found on '").concat(this.key, "'"));
        }
        initialStateValue = isLeafNode(this.states[this.initial]) ? this.initial : (_a2 = {}, _a2[this.initial] = this.states[this.initial].initialStateValue, _a2);
      } else {
        initialStateValue = {};
      }
      this.__cache.initialStateValue = initialStateValue;
      return this.__cache.initialStateValue;
    },
    enumerable: false,
    configurable: true
  });
  StateNode2.prototype.getInitialState = function(stateValue, context) {
    this._init();
    var configuration = this.getStateNodes(stateValue);
    return this.resolveTransition({
      configuration,
      exitSet: [],
      transitions: [],
      source: void 0,
      actions: []
    }, void 0, context !== null && context !== void 0 ? context : this.machine.context, void 0);
  };
  Object.defineProperty(StateNode2.prototype, "initialState", {
    get: function() {
      var initialStateValue = this.initialStateValue;
      if (!initialStateValue) {
        throw new Error("Cannot retrieve initial state from simple state '".concat(this.id, "'."));
      }
      return this.getInitialState(initialStateValue);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StateNode2.prototype, "target", {
    get: function() {
      var target;
      if (this.type === "history") {
        var historyConfig = this.config;
        if (isString(historyConfig.target)) {
          target = isStateId(historyConfig.target) ? pathToStateValue(this.machine.getStateNodeById(historyConfig.target).path.slice(this.path.length - 1)) : historyConfig.target;
        } else {
          target = historyConfig.target;
        }
      }
      return target;
    },
    enumerable: false,
    configurable: true
  });
  StateNode2.prototype.getRelativeStateNodes = function(relativeStateId, historyValue, resolve) {
    if (resolve === void 0) {
      resolve = true;
    }
    return resolve ? relativeStateId.type === "history" ? relativeStateId.resolveHistory(historyValue) : relativeStateId.initialStateNodes : [relativeStateId];
  };
  Object.defineProperty(StateNode2.prototype, "initialStateNodes", {
    get: function() {
      var _this = this;
      if (isLeafNode(this)) {
        return [this];
      }
      if (this.type === "compound" && !this.initial) {
        return [this];
      }
      var initialStateNodePaths = toStatePaths(this.initialStateValue);
      return flatten(initialStateNodePaths.map(function(initialPath) {
        return _this.getFromRelativePath(initialPath);
      }));
    },
    enumerable: false,
    configurable: true
  });
  StateNode2.prototype.getFromRelativePath = function(relativePath) {
    if (!relativePath.length) {
      return [this];
    }
    var _a2 = __read$1(relativePath), stateKey = _a2[0], childStatePath = _a2.slice(1);
    if (!this.states) {
      throw new Error("Cannot retrieve subPath '".concat(stateKey, "' from node with no states"));
    }
    var childStateNode = this.getStateNode(stateKey);
    if (childStateNode.type === "history") {
      return childStateNode.resolveHistory();
    }
    if (!this.states[stateKey]) {
      throw new Error("Child state '".concat(stateKey, "' does not exist on '").concat(this.id, "'"));
    }
    return this.states[stateKey].getFromRelativePath(childStatePath);
  };
  StateNode2.prototype.historyValue = function(relativeStateValue) {
    if (!Object.keys(this.states).length) {
      return void 0;
    }
    return {
      current: relativeStateValue || this.initialStateValue,
      states: mapFilterValues(this.states, function(stateNode, key) {
        if (!relativeStateValue) {
          return stateNode.historyValue();
        }
        var subStateValue = isString(relativeStateValue) ? void 0 : relativeStateValue[key];
        return stateNode.historyValue(subStateValue || stateNode.initialStateValue);
      }, function(stateNode) {
        return !stateNode.history;
      })
    };
  };
  StateNode2.prototype.resolveHistory = function(historyValue) {
    var _this = this;
    if (this.type !== "history") {
      return [this];
    }
    var parent = this.parent;
    if (!historyValue) {
      var historyTarget = this.target;
      return historyTarget ? flatten(toStatePaths(historyTarget).map(function(relativeChildPath) {
        return parent.getFromRelativePath(relativeChildPath);
      })) : parent.initialStateNodes;
    }
    var subHistoryValue = nestedPath(parent.path, "states")(historyValue).current;
    if (isString(subHistoryValue)) {
      return [parent.getStateNode(subHistoryValue)];
    }
    return flatten(toStatePaths(subHistoryValue).map(function(subStatePath) {
      return _this.history === "deep" ? parent.getFromRelativePath(subStatePath) : [parent.states[subStatePath[0]]];
    }));
  };
  Object.defineProperty(StateNode2.prototype, "stateIds", {
    get: function() {
      var _this = this;
      var childStateIds = flatten(Object.keys(this.states).map(function(stateKey) {
        return _this.states[stateKey].stateIds;
      }));
      return [this.id].concat(childStateIds);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StateNode2.prototype, "events", {
    get: function() {
      var e_8, _a2, e_9, _b;
      if (this.__cache.events) {
        return this.__cache.events;
      }
      var states = this.states;
      var events = new Set(this.ownEvents);
      if (states) {
        try {
          for (var _c = __values(Object.keys(states)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var stateId = _d.value;
            var state2 = states[stateId];
            if (state2.states) {
              try {
                for (var _e = (e_9 = void 0, __values(state2.events)), _f = _e.next(); !_f.done; _f = _e.next()) {
                  var event_1 = _f.value;
                  events.add("".concat(event_1));
                }
              } catch (e_9_1) {
                e_9 = {
                  error: e_9_1
                };
              } finally {
                try {
                  if (_f && !_f.done && (_b = _e.return))
                    _b.call(_e);
                } finally {
                  if (e_9)
                    throw e_9.error;
                }
              }
            }
          }
        } catch (e_8_1) {
          e_8 = {
            error: e_8_1
          };
        } finally {
          try {
            if (_d && !_d.done && (_a2 = _c.return))
              _a2.call(_c);
          } finally {
            if (e_8)
              throw e_8.error;
          }
        }
      }
      return this.__cache.events = Array.from(events);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StateNode2.prototype, "ownEvents", {
    get: function() {
      var events = new Set(this.transitions.filter(function(transition2) {
        return !(!transition2.target && !transition2.actions.length && transition2.internal);
      }).map(function(transition2) {
        return transition2.eventType;
      }));
      return Array.from(events);
    },
    enumerable: false,
    configurable: true
  });
  StateNode2.prototype.resolveTarget = function(_target) {
    var _this = this;
    if (_target === void 0) {
      return void 0;
    }
    return _target.map(function(target) {
      if (!isString(target)) {
        return target;
      }
      var isInternalTarget = target[0] === _this.delimiter;
      if (isInternalTarget && !_this.parent) {
        return _this.getStateNodeByPath(target.slice(1));
      }
      var resolvedTarget = isInternalTarget ? _this.key + target : target;
      if (_this.parent) {
        try {
          var targetStateNode = _this.parent.getStateNodeByPath(resolvedTarget);
          return targetStateNode;
        } catch (err) {
          throw new Error("Invalid transition definition for state node '".concat(_this.id, "':\n").concat(err.message));
        }
      } else {
        return _this.getStateNodeByPath(resolvedTarget);
      }
    });
  };
  StateNode2.prototype.formatTransition = function(transitionConfig) {
    var _this = this;
    var normalizedTarget = normalizeTarget(transitionConfig.target);
    var internal = "internal" in transitionConfig ? transitionConfig.internal : normalizedTarget ? normalizedTarget.some(function(_target) {
      return isString(_target) && _target[0] === _this.delimiter;
    }) : true;
    var guards = this.machine.options.guards;
    var target = this.resolveTarget(normalizedTarget);
    var transition2 = __assign$1(__assign$1({}, transitionConfig), {
      actions: toActionObjects(toArray(transitionConfig.actions)),
      cond: toGuard(transitionConfig.cond, guards),
      target,
      source: this,
      internal,
      eventType: transitionConfig.event,
      toJSON: function() {
        return __assign$1(__assign$1({}, transition2), {
          target: transition2.target ? transition2.target.map(function(t2) {
            return "#".concat(t2.id);
          }) : void 0,
          source: "#".concat(_this.id)
        });
      }
    });
    return transition2;
  };
  StateNode2.prototype.formatTransitions = function() {
    var e_10, _a2;
    var _this = this;
    var onConfig;
    if (!this.config.on) {
      onConfig = [];
    } else if (Array.isArray(this.config.on)) {
      onConfig = this.config.on;
    } else {
      var _b = this.config.on, _c = WILDCARD, _d = _b[_c], wildcardConfigs = _d === void 0 ? [] : _d, strictTransitionConfigs_1 = __rest$1(_b, [typeof _c === "symbol" ? _c : _c + ""]);
      onConfig = flatten(Object.keys(strictTransitionConfigs_1).map(function(key) {
        var transitionConfigArray = toTransitionConfigArray(key, strictTransitionConfigs_1[key]);
        return transitionConfigArray;
      }).concat(toTransitionConfigArray(WILDCARD, wildcardConfigs)));
    }
    var eventlessConfig = this.config.always ? toTransitionConfigArray("", this.config.always) : [];
    var doneConfig = this.config.onDone ? toTransitionConfigArray(String(done(this.id)), this.config.onDone) : [];
    var invokeConfig = flatten(this.invoke.map(function(invokeDef) {
      var settleTransitions = [];
      if (invokeDef.onDone) {
        settleTransitions.push.apply(settleTransitions, __spreadArray([], __read$1(toTransitionConfigArray(String(doneInvoke(invokeDef.id)), invokeDef.onDone)), false));
      }
      if (invokeDef.onError) {
        settleTransitions.push.apply(settleTransitions, __spreadArray([], __read$1(toTransitionConfigArray(String(error(invokeDef.id)), invokeDef.onError)), false));
      }
      return settleTransitions;
    }));
    var delayedTransitions = this.after;
    var formattedTransitions = flatten(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read$1(doneConfig), false), __read$1(invokeConfig), false), __read$1(onConfig), false), __read$1(eventlessConfig), false).map(function(transitionConfig) {
      return toArray(transitionConfig).map(function(transition2) {
        return _this.formatTransition(transition2);
      });
    }));
    try {
      for (var delayedTransitions_1 = __values(delayedTransitions), delayedTransitions_1_1 = delayedTransitions_1.next(); !delayedTransitions_1_1.done; delayedTransitions_1_1 = delayedTransitions_1.next()) {
        var delayedTransition = delayedTransitions_1_1.value;
        formattedTransitions.push(delayedTransition);
      }
    } catch (e_10_1) {
      e_10 = {
        error: e_10_1
      };
    } finally {
      try {
        if (delayedTransitions_1_1 && !delayedTransitions_1_1.done && (_a2 = delayedTransitions_1.return))
          _a2.call(delayedTransitions_1);
      } finally {
        if (e_10)
          throw e_10.error;
      }
    }
    return formattedTransitions;
  };
  return StateNode2;
}();
var warned = false;
function createMachine(config, options) {
  if (!IS_PRODUCTION && !("predictableActionArguments" in config) && !warned) {
    warned = true;
    console.warn("It is highly recommended to set `predictableActionArguments` to `true` when using `createMachine`. https://xstate.js.org/docs/guides/actions.html");
  }
  return new StateNode(config, options);
}
var assign = assign$1;
var index = react.exports.useLayoutEffect;
function useConstant(fn2) {
  var ref = react.exports.useRef();
  if (!ref.current) {
    ref.current = { v: fn2() };
  }
  return ref.current.v;
}
var __assign = globalThis && globalThis.__assign || function() {
  __assign = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign.apply(this, arguments);
};
var __rest = globalThis && globalThis.__rest || function(s, e2) {
  var t2 = {};
  for (var p2 in s)
    if (Object.prototype.hasOwnProperty.call(s, p2) && e2.indexOf(p2) < 0)
      t2[p2] = s[p2];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p2 = Object.getOwnPropertySymbols(s); i < p2.length; i++) {
      if (e2.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p2[i]))
        t2[p2[i]] = s[p2[i]];
    }
  return t2;
};
globalThis && globalThis.__read || function(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i = m2.call(o), r2, ar = [], e2;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i.next()).done)
      ar.push(r2.value);
  } catch (error2) {
    e2 = { error: error2 };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar;
};
function useIdleInterpreter(getMachine, options) {
  var machine = useConstant(function() {
    return typeof getMachine === "function" ? getMachine() : getMachine;
  });
  var context = options.context, guards = options.guards, actions = options.actions, activities = options.activities, services = options.services, delays = options.delays;
  options.state;
  var interpreterOptions = __rest(options, ["context", "guards", "actions", "activities", "services", "delays", "state"]);
  var service = useConstant(function() {
    var machineConfig = {
      context,
      guards,
      actions,
      activities,
      services,
      delays
    };
    var machineWithConfig = machine.withConfig(machineConfig, function() {
      return __assign(__assign({}, machine.context), context);
    });
    return interpret(machineWithConfig, interpreterOptions);
  });
  index(function() {
    Object.assign(service.machine.options.actions, actions);
    Object.assign(service.machine.options.guards, guards);
    Object.assign(service.machine.options.activities, activities);
    Object.assign(service.machine.options.services, services);
    Object.assign(service.machine.options.delays, delays);
  }, [actions, guards, activities, services, delays]);
  return service;
}
globalThis && globalThis.__read || function(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i = m2.call(o), r2, ar = [], e2;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i.next()).done)
      ar.push(r2.value);
  } catch (error2) {
    e2 = { error: error2 };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar;
};
globalThis && globalThis.__values || function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m2 = s && o[s], i = 0;
  if (m2)
    return m2.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
function isInterpreterStateEqual(service, prevState, nextState) {
  if (service.status === InterpreterStatus.NotStarted) {
    return true;
  }
  var initialStateChanged = nextState.changed === void 0 && (Object.keys(nextState.children).length > 0 || typeof prevState.changed === "boolean");
  return !(nextState.changed || initialStateChanged);
}
var __read = globalThis && globalThis.__read || function(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i = m2.call(o), r2, ar = [], e2;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i.next()).done)
      ar.push(r2.value);
  } catch (error2) {
    e2 = { error: error2 };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar;
};
function identity(a) {
  return a;
}
function useMachine(getMachine) {
  var _a2 = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    _a2[_i - 1] = arguments[_i];
  }
  var _b = __read(_a2, 1), _c = _b[0], options = _c === void 0 ? {} : _c;
  var service = useIdleInterpreter(getMachine, options);
  var getSnapshot = react.exports.useCallback(function() {
    if (service.status === InterpreterStatus.NotStarted) {
      return options.state ? State.create(options.state) : service.machine.initialState;
    }
    return service.getSnapshot();
  }, [service]);
  var isEqual2 = react.exports.useCallback(function(prevState, nextState) {
    return isInterpreterStateEqual(service, prevState, nextState);
  }, [service]);
  var subscribe = react.exports.useCallback(function(handleStoreChange) {
    var unsubscribe = service.subscribe(handleStoreChange).unsubscribe;
    return unsubscribe;
  }, [service]);
  var storeSnapshot = withSelector.exports.useSyncExternalStoreWithSelector(subscribe, getSnapshot, getSnapshot, identity, isEqual2);
  react.exports.useEffect(function() {
    var rehydratedState = options.state;
    service.start(rehydratedState ? State.create(rehydratedState) : void 0);
    return function() {
      service.stop();
      service.status = InterpreterStatus.NotStarted;
    };
  }, []);
  return [storeSnapshot, service.send, service];
}
function UserChat({
  ...restProps
}) {
  return /* @__PURE__ */ jsx(Box, {
    alignSelf: "flex-end",
    ...restProps
  });
}
function ChatText({
  isError,
  bold,
  padding = 6,
  border: border2 = true,
  children: children2,
  ...restProps
}) {
  return /* @__PURE__ */ jsx(Text, {
    borderRadius: 4,
    whiteSpace: "pre-wrap",
    border: border2 ? "1px solid #f0ffff2e" : void 0,
    padding: `${padding}px`,
    textAlign: "start",
    color: isError ? "red" : "black",
    lineHeight: 1.3,
    fontWeight: bold ? "bold" : "normal",
    ...restProps,
    children: typeof children2 === "string" ? children2.trim() : children2
  });
}
function AssistantChat({
  ...restProps
}) {
  return /* @__PURE__ */ jsx(Box, {
    alignSelf: "flex-start",
    ...restProps
  });
}
function useScrollDownEffect(deps) {
  const scrollDownRef = react.exports.useRef(null);
  react.exports.useEffect(() => {
    if (!scrollDownRef.current) {
      return;
    }
    scrollDownRef.current.scrollTo({
      top: scrollDownRef.current.scrollHeight
    });
  }, deps);
  return { scrollDownRef };
}
function useCopyClipboard(copiedResetEffectDeps) {
  const [isCopied, setIsCopied] = react.exports.useState(false);
  react.exports.useEffect(() => {
    setIsCopied(false);
  }, copiedResetEffectDeps);
  const copy2 = async (lastResponseText) => {
    await copyToClipboard(lastResponseText);
    setIsCopied(true);
  };
  return {
    isCopied,
    copy: copy2
  };
}
async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}
const initialContext = {
  inputText: "",
  chats: [],
  tempResponse: ""
};
const streamChatStateMachine = createMachine(
  {
    id: "stream-chat-state",
    initial: "init",
    predictableActionArguments: true,
    context: initialContext,
    schema: {
      context: {},
      events: {},
      services: {}
    },
    tsTypes: {},
    states: {
      init: {
        invoke: {
          src: "getChatHistoryFromBackground",
          onDone: { target: "idle", actions: "setChats" },
          onError: { target: "idle" }
        }
      },
      idle: {
        on: {
          QUERY: {
            target: "loading",
            actions: ["addUserChat", "resetChatText"],
            cond: "isValidText"
          },
          EXIT: "finish",
          RESET: { actions: "resetChatData" },
          CHANGE_TEXT: {
            actions: "updateChatText"
          }
        }
      },
      loading: {
        invoke: {
          src: "getGPTResponse",
          onDone: {
            target: "receiving",
            actions: ["addInitialAssistantChat", "setCancelReceive"]
          },
          onError: { target: "idle", actions: "addErrorChat" }
        },
        on: {
          EXIT: "finish",
          RESET: { actions: "resetChatData" },
          CHANGE_TEXT: {
            actions: "updateChatText"
          }
        }
      },
      receiving: {
        on: {
          RECEIVE_ING: { target: "receiving", actions: "addResponseToken" },
          RECEIVE_DONE: { target: "idle", actions: "replaceLastResponse" },
          RECEIVE_CANCEL: { target: "idle", actions: "execCancelReceive" },
          CHANGE_TEXT: {
            actions: "updateChatText"
          }
        }
      },
      finish: {
        type: "final",
        entry: "exitChatting"
      }
    }
  },
  {
    actions: {
      setChats: assign({
        chats: (_, event) => event.data
      }),
      addUserChat: assign({
        chats: (context) => context.chats.concat({
          role: "user",
          content: context.inputText
        })
      }),
      addInitialAssistantChat: assign({
        chats: (context, event) => context.chats.concat({
          role: "assistant",
          content: event.data.firstChunk
        })
      }),
      addResponseToken: assign({
        chats: (context, event) => {
          return context.chats.map((chat, index2) => {
            if (index2 === context.chats.length - 1) {
              return { ...chat, content: chat.content + event.data };
            }
            return chat;
          });
        }
      }),
      replaceLastResponse: assign({
        chats: (context, event) => {
          return context.chats.map((chat, index2) => {
            if (index2 === context.chats.length - 1) {
              return { ...chat, content: event.data };
            }
            return chat;
          });
        }
      }),
      setCancelReceive: assign({
        cancelReceive: (_, event) => event.data.cancel
      }),
      execCancelReceive: (context) => {
        var _a2;
        (_a2 = context.cancelReceive) == null ? void 0 : _a2.call(context);
      },
      addErrorChat: assign({
        chats: (context, event) => {
          const error2 = event.data;
          return context.chats.concat({
            role: "error",
            content: `${error2 == null ? void 0 : error2.name}
${error2 == null ? void 0 : error2.message}`
          });
        }
      }),
      updateChatText: assign({
        inputText: (_, event) => event.data
      }),
      resetChatText: assign({
        inputText: () => ""
      }),
      resetChatData: assign({ chats: () => [] })
    },
    guards: {
      isValidText: (context) => context.inputText.length > 0
    }
  }
);
async function getQuickGPTResponseAsStream({
  messages,
  onDelta,
  onFinish
}) {
  return new Promise(
    (resolve, reject) => {
      const { disconnect } = sendMessageToBackground({
        message: {
          type: "RequestQuickChatGPTStream",
          input: messages
        },
        handleSuccess: (response) => {
          if (response.isDone || !response.chunk) {
            return onFinish(response.result);
          }
          resolve({ cancel: disconnect, firstChunk: response.chunk });
          onDelta(response.chunk);
        },
        handleError: reject
      });
    }
  );
}
async function getDragGPTResponseAsStream({
  messages,
  onDelta,
  onFinish
}) {
  return new Promise(
    (resolve, reject) => {
      const { disconnect } = sendMessageToBackground({
        message: {
          type: "RequestDragGPTStream",
          input: messages
        },
        handleSuccess: (response) => {
          if (response.isDone || !response.chunk) {
            return onFinish(response.result);
          }
          resolve({ cancel: disconnect, firstChunk: response.chunk });
          onDelta(response.chunk);
        },
        handleError: reject
      });
    }
  );
}
export {
  useMachine as A,
  Box as B,
  COLORS as C,
  streamChatStateMachine as D,
  getQuickGPTResponseAsStream as E,
  useScrollDownEffect as F,
  Global as G,
  HStack as H,
  Icon as I,
  useCopyClipboard as J,
  AssistantChat as K,
  ChatText as L,
  useSafeLayoutEffect as M,
  Stack as N,
  getDragGPTResponseAsStream as O,
  createCache as P,
  CacheProvider as Q,
  Spinner as S,
  ThemeProvider as T,
  UserChat as U,
  VStack as V,
  Z_INDEX as Z,
  cssVar as a,
  defineStyleConfig as b,
  createMultiStyleConfigHelpers as c,
  defineStyle as d,
  createContext as e,
  forwardRef as f,
  useMultiStyleConfig as g,
  getValidChildren as h,
  isObject as i,
  chakra as j,
  useStyleConfig as k,
  cx as l,
  mergeRefs as m,
  useTheme as n,
  omitThemingProps as o,
  useFormControl as p,
  Text as q,
  t$2 as r,
  Input as s,
  toCSSVar as t,
  useCallbackRef as u,
  StyledButton as v,
  createMachine as w,
  assign as x,
  newStyled as y,
  Tooltip as z
};
