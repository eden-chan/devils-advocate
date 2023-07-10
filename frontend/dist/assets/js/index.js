import { r as react, a as jsx, g as getAugmentedNamespace, d as reactDom, j as jsxs, F as Fragment, b as addHmrIntoView, c as createRoot } from "./_virtual_reload-on-update-in-view.js";
import { f as forwardRef, I as Icon, k as useStyleConfig, o as omitThemingProps, j as chakra, M as useSafeLayoutEffect$1, y as newStyled, Z as Z_INDEX, C as COLORS, z as Tooltip, q as Text, S as Spinner, N as Stack, H as HStack, A as useMachine, F as useScrollDownEffect, J as useCopyClipboard, r as t, V as VStack, v as StyledButton, s as Input, D as streamChatStateMachine, O as getDragGPTResponseAsStream, K as AssistantChat, L as ChatText, U as UserChat, w as createMachine, x as assign, P as createCache, Q as CacheProvider } from "./getGPTResponseAsStream.js";
import { b as sendMessageToBackgroundAsync, c as sendMessageToBackground } from "./message.js";
import { S as SlotsManipulatorService } from "./slotsManipulatorService.js";
function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
var isBrowser = /* @__PURE__ */ canUseDOM();
function createIcon(options) {
  const {
    viewBox = "0 0 24 24",
    d: pathDefinition,
    displayName,
    defaultProps = {}
  } = options;
  const path = react.exports.Children.toArray(options.path);
  const Comp = forwardRef((props, ref) => /* @__PURE__ */ jsx(Icon, { ref, viewBox, ...defaultProps, ...props, children: path.length ? path : /* @__PURE__ */ jsx("path", { fill: "currentColor", d: pathDefinition }) }));
  Comp.displayName = displayName;
  return Comp;
}
function CloseIcon(props) {
  return /* @__PURE__ */ jsx(Icon, { focusable: "false", "aria-hidden": true, ...props, children: /* @__PURE__ */ jsx(
    "path",
    {
      fill: "currentColor",
      d: "M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
    }
  ) });
}
var CloseButton = forwardRef(
  function CloseButton2(props, ref) {
    const styles = useStyleConfig("CloseButton", props);
    const { children, isDisabled, __css, ...rest } = omitThemingProps(props);
    const baseStyle = {
      outline: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    };
    return /* @__PURE__ */ jsx(
      chakra.button,
      {
        type: "button",
        "aria-label": "Close",
        ref,
        disabled: isDisabled,
        __css: {
          ...baseStyle,
          ...styles,
          ...__css
        },
        ...rest,
        children: children || /* @__PURE__ */ jsx(CloseIcon, { width: "1em", height: "1em" })
      }
    );
  }
);
CloseButton.displayName = "CloseButton";
var NativeImage = forwardRef(function NativeImage2(props, ref) {
  const { htmlWidth, htmlHeight, alt, ...rest } = props;
  return /* @__PURE__ */ jsx("img", { width: htmlWidth, height: htmlHeight, ref, alt, ...rest });
});
NativeImage.displayName = "NativeImage";
function useImage(props) {
  const {
    loading,
    src,
    srcSet,
    onLoad,
    onError,
    crossOrigin,
    sizes,
    ignoreFallback
  } = props;
  const [status, setStatus] = react.exports.useState("pending");
  react.exports.useEffect(() => {
    setStatus(src ? "loading" : "pending");
  }, [src]);
  const imageRef = react.exports.useRef();
  const load = react.exports.useCallback(() => {
    if (!src)
      return;
    flush();
    const img = new Image();
    img.src = src;
    if (crossOrigin)
      img.crossOrigin = crossOrigin;
    if (srcSet)
      img.srcset = srcSet;
    if (sizes)
      img.sizes = sizes;
    if (loading)
      img.loading = loading;
    img.onload = (event) => {
      flush();
      setStatus("loaded");
      onLoad == null ? void 0 : onLoad(event);
    };
    img.onerror = (error) => {
      flush();
      setStatus("failed");
      onError == null ? void 0 : onError(error);
    };
    imageRef.current = img;
  }, [src, crossOrigin, srcSet, sizes, onLoad, onError, loading]);
  const flush = () => {
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current.onerror = null;
      imageRef.current = null;
    }
  };
  useSafeLayoutEffect$1(() => {
    if (ignoreFallback)
      return void 0;
    if (status === "loading") {
      load();
    }
    return () => {
      flush();
    };
  }, [status, load, ignoreFallback]);
  return ignoreFallback ? "loaded" : status;
}
var shouldShowFallbackImage = (status, fallbackStrategy) => status !== "loaded" && fallbackStrategy === "beforeLoadOrError" || status === "failed" && fallbackStrategy === "onError";
function omit(object, keysToOmit = []) {
  const clone = Object.assign({}, object);
  for (const key of keysToOmit) {
    if (key in clone) {
      delete clone[key];
    }
  }
  return clone;
}
var Image$1 = forwardRef(function Image2(props, ref) {
  const {
    fallbackSrc,
    fallback,
    src,
    srcSet,
    align,
    fit,
    loading,
    ignoreFallback,
    crossOrigin,
    fallbackStrategy = "beforeLoadOrError",
    referrerPolicy,
    ...rest
  } = props;
  const providedFallback = fallbackSrc !== void 0 || fallback !== void 0;
  const shouldIgnoreFallbackImage = loading != null || ignoreFallback || !providedFallback;
  const status = useImage({
    ...props,
    ignoreFallback: shouldIgnoreFallbackImage
  });
  const showFallbackImage = shouldShowFallbackImage(status, fallbackStrategy);
  const shared = {
    ref,
    objectFit: fit,
    objectPosition: align,
    ...shouldIgnoreFallbackImage ? rest : omit(rest, ["onError", "onLoad"])
  };
  if (showFallbackImage) {
    if (fallback)
      return fallback;
    return /* @__PURE__ */ jsx(
      chakra.img,
      {
        as: NativeImage,
        className: "chakra-image__placeholder",
        src: fallbackSrc,
        ...shared
      }
    );
  }
  return /* @__PURE__ */ jsx(
    chakra.img,
    {
      as: NativeImage,
      src,
      srcSet,
      crossOrigin,
      loading,
      referrerPolicy,
      className: "chakra-image",
      ...shared
    }
  );
});
Image$1.displayName = "Image";
var propTypes = { exports: {} };
var ReactPropTypesSecret$1 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;
var ReactPropTypesSecret = ReactPropTypesSecret_1;
function emptyFunction() {
}
function emptyFunctionWithReset() {
}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      return;
    }
    var err = new Error(
      "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
    );
    err.name = "Invariant Violation";
    throw err;
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};
{
  propTypes.exports = factoryWithThrowingShims();
}
var useSafeLayoutEffect = isBrowser ? react.exports.useLayoutEffect : react.exports.useEffect;
function useCallbackRef(fn, deps = []) {
  const ref = react.exports.useRef(fn);
  useSafeLayoutEffect(() => {
    ref.current = fn;
  });
  return react.exports.useCallback((...args) => {
    var _a;
    return (_a = ref.current) == null ? void 0 : _a.call(ref, ...args);
  }, deps);
}
function useInterval(callback, delay) {
  const fn = useCallbackRef(callback);
  react.exports.useEffect(() => {
    let intervalId = null;
    const tick = () => fn();
    if (delay !== null) {
      intervalId = window.setInterval(tick, delay);
    }
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [delay, fn]);
}
function getSelectionText() {
  var _a, _b;
  return (_b = (_a = window.getSelection()) == null ? void 0 : _a.toString()) != null ? _b : "";
}
function getSelectionNodeRect() {
  var _a, _b, _c;
  try {
    return (_c = (_b = (_a = window.getSelection()) == null ? void 0 : _a.getRangeAt(0)) == null ? void 0 : _b.getBoundingClientRect()) != null ? _c : void 0;
  } catch {
    return void 0;
  }
}
var DragHandleIcon = createIcon({
  viewBox: "0 0 10 10",
  d: "M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z",
  displayName: "DragHandleIcon"
});
var ChatIcon = createIcon({
  d: "M0.913134,0.920639 C1.49851,0.331726 2.29348,0 3.12342,0 L10.8766,0 C11.7065,0 12.5015,0.331725 13.0869,0.920639 C13.6721,1.50939 14,2.30689 14,3.13746 L14,8.12943 C13.9962,8.51443 13.9059,8.97125 13.7629,9.32852 C13.6128,9.683 13.3552,10.0709 13.0869,10.3462 C12.813,10.6163 12.4265,10.8761 12.0734,11.0274 C11.7172,11.1716 11.2607,11.263 10.8766,11.2669 L10.1234,11.2669 L10.1234,12.5676 L10.1209,12.5676 C10.1204,12.793 10.0633,13.0791 9.97807,13.262 C9.8627,13.466 9.61158,13.7198 9.40818,13.8382 L9.40824,13.8383 C9.4077,13.8386 9.40716,13.8388 9.40661,13.8391 C9.40621,13.8393 9.4058,13.8396 9.40539,13.8398 L9.40535,13.8397 C9.22958,13.9254 8.94505,13.9951 8.75059,14 L8.74789,14 C8.35724,13.9963 7.98473,13.8383 7.71035,13.5617 L5.39553,11.2669 L3.12342,11.2669 C2.29348,11.2669 1.49851,10.9352 0.913134,10.3462 C0.644826,10.0709 0.387187,9.683 0.23711,9.32852 C0.0941235,8.97125 0.00379528,8.51443 0,8.12943 L0,3.13746 C0,2.30689 0.327915,1.50939 0.913134,0.920639 Z M3.12342,1.59494 C2.71959,1.59494 2.33133,1.75628 2.04431,2.04503 C1.75713,2.33395 1.59494,2.72681 1.59494,3.13746 L1.59494,8.12943 C1.59114,8.35901 1.62114,8.51076 1.71193,8.72129 C1.79563,8.9346 1.88065,9.06264 2.04431,9.22185 C2.33133,9.5106 2.71959,9.67195 3.12342,9.67195 L5.72383,9.67195 C5.93413,9.67195 6.13592,9.75502 6.28527,9.90308 L8.52848,12.1269 L8.52848,10.4694 C8.52848,10.029 8.88552,9.67195 9.32595,9.67195 L10.8766,9.67195 C11.1034,9.67583 11.2517,9.64614 11.4599,9.55518 C11.6712,9.47132 11.7976,9.38635 11.9557,9.22185 C12.1193,9.06264 12.2044,8.9346 12.2881,8.72129 C12.3789,8.51076 12.4089,8.35901 12.4051,8.12943 L12.4051,3.13746 C12.4051,2.72681 12.2429,2.33394 11.9557,2.04503 C11.6687,1.75628 11.2804,1.59494 10.8766,1.59494 L3.12342,1.59494 Z",
  displayName: "ChatIcon",
  viewBox: "0 0 14 14"
});
const GAP$1 = 4;
const StyledRequestButton = newStyled.button`
  border: none;
  padding: 0;
  position: absolute;
  z-index: ${Z_INDEX.ROOT};
  width: 20px;
  height: 20px;
  background: ${COLORS.POPUP_BACKGROUND};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  outline: none;
  box-shadow: none;

  &:hover {
    border: 1px solid #ffffff;
  }

  &:active {
    transform: scale(0.9);
    transition: all ease-in-out 100ms;
  }
`;
const labelTextInlineStyle = {
  display: "block",
  fontSize: "13px",
  lineHeight: 1,
  margin: 0,
  maxWidth: "160px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  fontFamily: "Noto Sans KR, sans-serif"
};
function GPTRequestButton({
  top,
  left,
  loading,
  style,
  selectedSlot,
  ...restProps
}) {
  return /* @__PURE__ */ jsx(Tooltip, {
    label: (selectedSlot == null ? void 0 : selectedSlot.name) && /* @__PURE__ */ jsx(Text, {
      style: labelTextInlineStyle,
      children: selectedSlot.name
    }),
    children: /* @__PURE__ */ jsx(StyledRequestButton, {
      "aria-busy": loading,
      disabled: loading,
      style: {
        ...style,
        top: `${top + GAP$1}px`,
        left: `${left + GAP$1}px`
      },
      ...restProps,
      children: loading ? /* @__PURE__ */ jsx(Spinner, {
        color: "white",
        width: 8,
        height: 8
      }) : /* @__PURE__ */ jsx(ChatIcon, {
        "aria-label": "request",
        color: "white",
        boxSize: 12
      })
    })
  });
}
const ROOT_ID = "chrome-extension-boilerplate-react-vite-content-view-root";
const SHADOW_ROOT_ID = "shadow-root";
function useRootOutsideClick({
  ref,
  handler,
  isDisabled
}) {
  react.exports.useEffect(() => {
    if (!ref.current) {
      return;
    }
    const root2 = ref.current.getRootNode();
    const onClick = (event) => {
      if (isDisabled) {
        return;
      }
      if (event.target.id === ROOT_ID) {
        return;
      }
      if (root2.contains(event.target)) {
        return;
      }
      handler(event);
    };
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [ref.current, handler, isDisabled]);
}
function getSafePixel(pixelNumber) {
  return `${Math.max(pixelNumber, 0)}px`;
}
var cjs = { exports: {} };
var Draggable$1 = {};
function r(e) {
  var t2, f, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e))
      for (t2 = 0; t2 < e.length; t2++)
        e[t2] && (f = r(e[t2])) && (n && (n += " "), n += f);
    else
      for (t2 in e)
        e[t2] && (n && (n += " "), n += t2);
  return n;
}
function clsx() {
  for (var e, t2, f = 0, n = ""; f < arguments.length; )
    (e = arguments[f++]) && (t2 = r(e)) && (n && (n += " "), n += t2);
  return n;
}
const clsx_m = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clsx,
  default: clsx
}, Symbol.toStringTag, { value: "Module" }));
const require$$3 = /* @__PURE__ */ getAugmentedNamespace(clsx_m);
var domFns = {};
var shims = {};
Object.defineProperty(shims, "__esModule", {
  value: true
});
shims.dontSetMe = dontSetMe;
shims.findInArray = findInArray;
shims.int = int;
shims.isFunction = isFunction;
shims.isNum = isNum;
function findInArray(array, callback) {
  for (var i = 0, length = array.length; i < length; i++) {
    if (callback.apply(callback, [array[i], i, array]))
      return array[i];
  }
}
function isFunction(func) {
  return typeof func === "function" || Object.prototype.toString.call(func) === "[object Function]";
}
function isNum(num) {
  return typeof num === "number" && !isNaN(num);
}
function int(a) {
  return parseInt(a, 10);
}
function dontSetMe(props, propName, componentName) {
  if (props[propName]) {
    return new Error("Invalid prop ".concat(propName, " passed to ").concat(componentName, " - do not set this, set it on the child."));
  }
}
var getPrefix$1 = {};
Object.defineProperty(getPrefix$1, "__esModule", {
  value: true
});
getPrefix$1.browserPrefixToKey = browserPrefixToKey;
getPrefix$1.browserPrefixToStyle = browserPrefixToStyle;
getPrefix$1.default = void 0;
getPrefix$1.getPrefix = getPrefix;
var prefixes = ["Moz", "Webkit", "O", "ms"];
function getPrefix() {
  var _window$document, _window$document$docu;
  var prop = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "transform";
  if (typeof window === "undefined")
    return "";
  var style = (_window$document = window.document) === null || _window$document === void 0 ? void 0 : (_window$document$docu = _window$document.documentElement) === null || _window$document$docu === void 0 ? void 0 : _window$document$docu.style;
  if (!style)
    return "";
  if (prop in style)
    return "";
  for (var i = 0; i < prefixes.length; i++) {
    if (browserPrefixToKey(prop, prefixes[i]) in style)
      return prefixes[i];
  }
  return "";
}
function browserPrefixToKey(prop, prefix) {
  return prefix ? "".concat(prefix).concat(kebabToTitleCase(prop)) : prop;
}
function browserPrefixToStyle(prop, prefix) {
  return prefix ? "-".concat(prefix.toLowerCase(), "-").concat(prop) : prop;
}
function kebabToTitleCase(str) {
  var out = "";
  var shouldCapitalize = true;
  for (var i = 0; i < str.length; i++) {
    if (shouldCapitalize) {
      out += str[i].toUpperCase();
      shouldCapitalize = false;
    } else if (str[i] === "-") {
      shouldCapitalize = true;
    } else {
      out += str[i];
    }
  }
  return out;
}
var _default = getPrefix();
getPrefix$1.default = _default;
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$1(obj);
}
Object.defineProperty(domFns, "__esModule", {
  value: true
});
domFns.addClassName = addClassName;
domFns.addEvent = addEvent;
domFns.addUserSelectStyles = addUserSelectStyles;
domFns.createCSSTransform = createCSSTransform;
domFns.createSVGTransform = createSVGTransform;
domFns.getTouch = getTouch;
domFns.getTouchIdentifier = getTouchIdentifier;
domFns.getTranslation = getTranslation;
domFns.innerHeight = innerHeight;
domFns.innerWidth = innerWidth;
domFns.matchesSelector = matchesSelector;
domFns.matchesSelectorAndParentsTo = matchesSelectorAndParentsTo;
domFns.offsetXYFromParent = offsetXYFromParent;
domFns.outerHeight = outerHeight;
domFns.outerWidth = outerWidth;
domFns.removeClassName = removeClassName;
domFns.removeEvent = removeEvent;
domFns.removeUserSelectStyles = removeUserSelectStyles;
var _shims$2 = shims;
var _getPrefix = _interopRequireWildcard$1(getPrefix$1);
function _getRequireWildcardCache$1(nodeInterop) {
  if (typeof WeakMap !== "function")
    return null;
  var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
  var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
  return (_getRequireWildcardCache$1 = function _getRequireWildcardCache2(nodeInterop2) {
    return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard$1(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || _typeof$1(obj) !== "object" && typeof obj !== "function") {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache$1(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var matchesSelectorFunc = "";
function matchesSelector(el, selector) {
  if (!matchesSelectorFunc) {
    matchesSelectorFunc = (0, _shims$2.findInArray)(["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"], function(method) {
      return (0, _shims$2.isFunction)(el[method]);
    });
  }
  if (!(0, _shims$2.isFunction)(el[matchesSelectorFunc]))
    return false;
  return el[matchesSelectorFunc](selector);
}
function matchesSelectorAndParentsTo(el, selector, baseNode) {
  var node = el;
  do {
    if (matchesSelector(node, selector))
      return true;
    if (node === baseNode)
      return false;
    node = node.parentNode;
  } while (node);
  return false;
}
function addEvent(el, event, handler, inputOptions) {
  if (!el)
    return;
  var options = _objectSpread({
    capture: true
  }, inputOptions);
  if (el.addEventListener) {
    el.addEventListener(event, handler, options);
  } else if (el.attachEvent) {
    el.attachEvent("on" + event, handler);
  } else {
    el["on" + event] = handler;
  }
}
function removeEvent(el, event, handler, inputOptions) {
  if (!el)
    return;
  var options = _objectSpread({
    capture: true
  }, inputOptions);
  if (el.removeEventListener) {
    el.removeEventListener(event, handler, options);
  } else if (el.detachEvent) {
    el.detachEvent("on" + event, handler);
  } else {
    el["on" + event] = null;
  }
}
function outerHeight(node) {
  var height = node.clientHeight;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height += (0, _shims$2.int)(computedStyle.borderTopWidth);
  height += (0, _shims$2.int)(computedStyle.borderBottomWidth);
  return height;
}
function outerWidth(node) {
  var width = node.clientWidth;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width += (0, _shims$2.int)(computedStyle.borderLeftWidth);
  width += (0, _shims$2.int)(computedStyle.borderRightWidth);
  return width;
}
function innerHeight(node) {
  var height = node.clientHeight;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height -= (0, _shims$2.int)(computedStyle.paddingTop);
  height -= (0, _shims$2.int)(computedStyle.paddingBottom);
  return height;
}
function innerWidth(node) {
  var width = node.clientWidth;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width -= (0, _shims$2.int)(computedStyle.paddingLeft);
  width -= (0, _shims$2.int)(computedStyle.paddingRight);
  return width;
}
function offsetXYFromParent(evt, offsetParent2, scale) {
  var isBody = offsetParent2 === offsetParent2.ownerDocument.body;
  var offsetParentRect = isBody ? {
    left: 0,
    top: 0
  } : offsetParent2.getBoundingClientRect();
  var x = (evt.clientX + offsetParent2.scrollLeft - offsetParentRect.left) / scale;
  var y = (evt.clientY + offsetParent2.scrollTop - offsetParentRect.top) / scale;
  return {
    x,
    y
  };
}
function createCSSTransform(controlPos, positionOffset) {
  var translation = getTranslation(controlPos, positionOffset, "px");
  return _defineProperty$1({}, (0, _getPrefix.browserPrefixToKey)("transform", _getPrefix.default), translation);
}
function createSVGTransform(controlPos, positionOffset) {
  var translation = getTranslation(controlPos, positionOffset, "");
  return translation;
}
function getTranslation(_ref2, positionOffset, unitSuffix) {
  var x = _ref2.x, y = _ref2.y;
  var translation = "translate(".concat(x).concat(unitSuffix, ",").concat(y).concat(unitSuffix, ")");
  if (positionOffset) {
    var defaultX = "".concat(typeof positionOffset.x === "string" ? positionOffset.x : positionOffset.x + unitSuffix);
    var defaultY = "".concat(typeof positionOffset.y === "string" ? positionOffset.y : positionOffset.y + unitSuffix);
    translation = "translate(".concat(defaultX, ", ").concat(defaultY, ")") + translation;
  }
  return translation;
}
function getTouch(e, identifier) {
  return e.targetTouches && (0, _shims$2.findInArray)(e.targetTouches, function(t2) {
    return identifier === t2.identifier;
  }) || e.changedTouches && (0, _shims$2.findInArray)(e.changedTouches, function(t2) {
    return identifier === t2.identifier;
  });
}
function getTouchIdentifier(e) {
  if (e.targetTouches && e.targetTouches[0])
    return e.targetTouches[0].identifier;
  if (e.changedTouches && e.changedTouches[0])
    return e.changedTouches[0].identifier;
}
function addUserSelectStyles(doc) {
  if (!doc)
    return;
  var styleEl = doc.getElementById("react-draggable-style-el");
  if (!styleEl) {
    styleEl = doc.createElement("style");
    styleEl.type = "text/css";
    styleEl.id = "react-draggable-style-el";
    styleEl.innerHTML = ".react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n";
    styleEl.innerHTML += ".react-draggable-transparent-selection *::selection {all: inherit;}\n";
    doc.getElementsByTagName("head")[0].appendChild(styleEl);
  }
  if (doc.body)
    addClassName(doc.body, "react-draggable-transparent-selection");
}
function removeUserSelectStyles(doc) {
  if (!doc)
    return;
  try {
    if (doc.body)
      removeClassName(doc.body, "react-draggable-transparent-selection");
    if (doc.selection) {
      doc.selection.empty();
    } else {
      var selection = (doc.defaultView || window).getSelection();
      if (selection && selection.type !== "Caret") {
        selection.removeAllRanges();
      }
    }
  } catch (e) {
  }
}
function addClassName(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    if (!el.className.match(new RegExp("(?:^|\\s)".concat(className, "(?!\\S)")))) {
      el.className += " ".concat(className);
    }
  }
}
function removeClassName(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp("(?:^|\\s)".concat(className, "(?!\\S)"), "g"), "");
  }
}
var positionFns = {};
Object.defineProperty(positionFns, "__esModule", {
  value: true
});
positionFns.canDragX = canDragX;
positionFns.canDragY = canDragY;
positionFns.createCoreData = createCoreData;
positionFns.createDraggableData = createDraggableData;
positionFns.getBoundPosition = getBoundPosition;
positionFns.getControlPosition = getControlPosition;
positionFns.snapToGrid = snapToGrid;
var _shims$1 = shims;
var _domFns$1 = domFns;
function getBoundPosition(draggable, x, y) {
  if (!draggable.props.bounds)
    return [x, y];
  var bounds = draggable.props.bounds;
  bounds = typeof bounds === "string" ? bounds : cloneBounds(bounds);
  var node = findDOMNode(draggable);
  if (typeof bounds === "string") {
    var ownerDocument = node.ownerDocument;
    var ownerWindow = ownerDocument.defaultView;
    var boundNode;
    if (bounds === "parent") {
      boundNode = node.parentNode;
    } else {
      boundNode = ownerDocument.querySelector(bounds);
    }
    if (!(boundNode instanceof ownerWindow.HTMLElement)) {
      throw new Error('Bounds selector "' + bounds + '" could not find an element.');
    }
    var boundNodeEl = boundNode;
    var nodeStyle = ownerWindow.getComputedStyle(node);
    var boundNodeStyle = ownerWindow.getComputedStyle(boundNodeEl);
    bounds = {
      left: -node.offsetLeft + (0, _shims$1.int)(boundNodeStyle.paddingLeft) + (0, _shims$1.int)(nodeStyle.marginLeft),
      top: -node.offsetTop + (0, _shims$1.int)(boundNodeStyle.paddingTop) + (0, _shims$1.int)(nodeStyle.marginTop),
      right: (0, _domFns$1.innerWidth)(boundNodeEl) - (0, _domFns$1.outerWidth)(node) - node.offsetLeft + (0, _shims$1.int)(boundNodeStyle.paddingRight) - (0, _shims$1.int)(nodeStyle.marginRight),
      bottom: (0, _domFns$1.innerHeight)(boundNodeEl) - (0, _domFns$1.outerHeight)(node) - node.offsetTop + (0, _shims$1.int)(boundNodeStyle.paddingBottom) - (0, _shims$1.int)(nodeStyle.marginBottom)
    };
  }
  if ((0, _shims$1.isNum)(bounds.right))
    x = Math.min(x, bounds.right);
  if ((0, _shims$1.isNum)(bounds.bottom))
    y = Math.min(y, bounds.bottom);
  if ((0, _shims$1.isNum)(bounds.left))
    x = Math.max(x, bounds.left);
  if ((0, _shims$1.isNum)(bounds.top))
    y = Math.max(y, bounds.top);
  return [x, y];
}
function snapToGrid(grid, pendingX, pendingY) {
  var x = Math.round(pendingX / grid[0]) * grid[0];
  var y = Math.round(pendingY / grid[1]) * grid[1];
  return [x, y];
}
function canDragX(draggable) {
  return draggable.props.axis === "both" || draggable.props.axis === "x";
}
function canDragY(draggable) {
  return draggable.props.axis === "both" || draggable.props.axis === "y";
}
function getControlPosition(e, touchIdentifier, draggableCore) {
  var touchObj = typeof touchIdentifier === "number" ? (0, _domFns$1.getTouch)(e, touchIdentifier) : null;
  if (typeof touchIdentifier === "number" && !touchObj)
    return null;
  var node = findDOMNode(draggableCore);
  var offsetParent2 = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
  return (0, _domFns$1.offsetXYFromParent)(touchObj || e, offsetParent2, draggableCore.props.scale);
}
function createCoreData(draggable, x, y) {
  var state = draggable.state;
  var isStart = !(0, _shims$1.isNum)(state.lastX);
  var node = findDOMNode(draggable);
  if (isStart) {
    return {
      node,
      deltaX: 0,
      deltaY: 0,
      lastX: x,
      lastY: y,
      x,
      y
    };
  } else {
    return {
      node,
      deltaX: x - state.lastX,
      deltaY: y - state.lastY,
      lastX: state.lastX,
      lastY: state.lastY,
      x,
      y
    };
  }
}
function createDraggableData(draggable, coreData) {
  var scale = draggable.props.scale;
  return {
    node: coreData.node,
    x: draggable.state.x + coreData.deltaX / scale,
    y: draggable.state.y + coreData.deltaY / scale,
    deltaX: coreData.deltaX / scale,
    deltaY: coreData.deltaY / scale,
    lastX: draggable.state.x,
    lastY: draggable.state.y
  };
}
function cloneBounds(bounds) {
  return {
    left: bounds.left,
    top: bounds.top,
    right: bounds.right,
    bottom: bounds.bottom
  };
}
function findDOMNode(draggable) {
  var node = draggable.findDOMNode();
  if (!node) {
    throw new Error("<DraggableCore>: Unmounted during event!");
  }
  return node;
}
var DraggableCore$2 = {};
var log$1 = {};
Object.defineProperty(log$1, "__esModule", {
  value: true
});
log$1.default = log;
function log() {
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
Object.defineProperty(DraggableCore$2, "__esModule", {
  value: true
});
DraggableCore$2.default = void 0;
var React = _interopRequireWildcard(react.exports);
var _propTypes = _interopRequireDefault(propTypes.exports);
var _reactDom = _interopRequireDefault(reactDom.exports);
var _domFns = domFns;
var _positionFns = positionFns;
var _shims = shims;
var _log = _interopRequireDefault(log$1);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function")
    return null;
  var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
  var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
    return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var eventsFor = {
  touch: {
    start: "touchstart",
    move: "touchmove",
    stop: "touchend"
  },
  mouse: {
    start: "mousedown",
    move: "mousemove",
    stop: "mouseup"
  }
};
var dragEventFor = eventsFor.mouse;
var DraggableCore$1 = /* @__PURE__ */ function(_React$Component) {
  _inherits(DraggableCore2, _React$Component);
  var _super = _createSuper(DraggableCore2);
  function DraggableCore2() {
    var _this;
    _classCallCheck(this, DraggableCore2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      dragging: false,
      lastX: NaN,
      lastY: NaN,
      touchIdentifier: null
    });
    _defineProperty(_assertThisInitialized(_this), "mounted", false);
    _defineProperty(_assertThisInitialized(_this), "handleDragStart", function(e) {
      _this.props.onMouseDown(e);
      if (!_this.props.allowAnyClick && typeof e.button === "number" && e.button !== 0)
        return false;
      var thisNode = _this.findDOMNode();
      if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
        throw new Error("<DraggableCore> not mounted on DragStart!");
      }
      var ownerDocument = thisNode.ownerDocument;
      if (_this.props.disabled || !(e.target instanceof ownerDocument.defaultView.Node) || _this.props.handle && !(0, _domFns.matchesSelectorAndParentsTo)(e.target, _this.props.handle, thisNode) || _this.props.cancel && (0, _domFns.matchesSelectorAndParentsTo)(e.target, _this.props.cancel, thisNode)) {
        return;
      }
      if (e.type === "touchstart")
        e.preventDefault();
      var touchIdentifier = (0, _domFns.getTouchIdentifier)(e);
      _this.setState({
        touchIdentifier
      });
      var position = (0, _positionFns.getControlPosition)(e, touchIdentifier, _assertThisInitialized(_this));
      if (position == null)
        return;
      var x = position.x, y = position.y;
      var coreEvent = (0, _positionFns.createCoreData)(_assertThisInitialized(_this), x, y);
      (0, _log.default)("DraggableCore: handleDragStart: %j", coreEvent);
      (0, _log.default)("calling", _this.props.onStart);
      var shouldUpdate = _this.props.onStart(e, coreEvent);
      if (shouldUpdate === false || _this.mounted === false)
        return;
      if (_this.props.enableUserSelectHack)
        (0, _domFns.addUserSelectStyles)(ownerDocument);
      _this.setState({
        dragging: true,
        lastX: x,
        lastY: y
      });
      (0, _domFns.addEvent)(ownerDocument, dragEventFor.move, _this.handleDrag);
      (0, _domFns.addEvent)(ownerDocument, dragEventFor.stop, _this.handleDragStop);
    });
    _defineProperty(_assertThisInitialized(_this), "handleDrag", function(e) {
      var position = (0, _positionFns.getControlPosition)(e, _this.state.touchIdentifier, _assertThisInitialized(_this));
      if (position == null)
        return;
      var x = position.x, y = position.y;
      if (Array.isArray(_this.props.grid)) {
        var deltaX = x - _this.state.lastX, deltaY = y - _this.state.lastY;
        var _snapToGrid = (0, _positionFns.snapToGrid)(_this.props.grid, deltaX, deltaY);
        var _snapToGrid2 = _slicedToArray(_snapToGrid, 2);
        deltaX = _snapToGrid2[0];
        deltaY = _snapToGrid2[1];
        if (!deltaX && !deltaY)
          return;
        x = _this.state.lastX + deltaX, y = _this.state.lastY + deltaY;
      }
      var coreEvent = (0, _positionFns.createCoreData)(_assertThisInitialized(_this), x, y);
      (0, _log.default)("DraggableCore: handleDrag: %j", coreEvent);
      var shouldUpdate = _this.props.onDrag(e, coreEvent);
      if (shouldUpdate === false || _this.mounted === false) {
        try {
          _this.handleDragStop(new MouseEvent("mouseup"));
        } catch (err) {
          var event = document.createEvent("MouseEvents");
          event.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          _this.handleDragStop(event);
        }
        return;
      }
      _this.setState({
        lastX: x,
        lastY: y
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleDragStop", function(e) {
      if (!_this.state.dragging)
        return;
      var position = (0, _positionFns.getControlPosition)(e, _this.state.touchIdentifier, _assertThisInitialized(_this));
      if (position == null)
        return;
      var x = position.x, y = position.y;
      if (Array.isArray(_this.props.grid)) {
        var deltaX = x - _this.state.lastX || 0;
        var deltaY = y - _this.state.lastY || 0;
        var _snapToGrid3 = (0, _positionFns.snapToGrid)(_this.props.grid, deltaX, deltaY);
        var _snapToGrid4 = _slicedToArray(_snapToGrid3, 2);
        deltaX = _snapToGrid4[0];
        deltaY = _snapToGrid4[1];
        x = _this.state.lastX + deltaX, y = _this.state.lastY + deltaY;
      }
      var coreEvent = (0, _positionFns.createCoreData)(_assertThisInitialized(_this), x, y);
      var shouldContinue = _this.props.onStop(e, coreEvent);
      if (shouldContinue === false || _this.mounted === false)
        return false;
      var thisNode = _this.findDOMNode();
      if (thisNode) {
        if (_this.props.enableUserSelectHack)
          (0, _domFns.removeUserSelectStyles)(thisNode.ownerDocument);
      }
      (0, _log.default)("DraggableCore: handleDragStop: %j", coreEvent);
      _this.setState({
        dragging: false,
        lastX: NaN,
        lastY: NaN
      });
      if (thisNode) {
        (0, _log.default)("DraggableCore: Removing handlers");
        (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.move, _this.handleDrag);
        (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.stop, _this.handleDragStop);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function(e) {
      dragEventFor = eventsFor.mouse;
      return _this.handleDragStart(e);
    });
    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function(e) {
      dragEventFor = eventsFor.mouse;
      return _this.handleDragStop(e);
    });
    _defineProperty(_assertThisInitialized(_this), "onTouchStart", function(e) {
      dragEventFor = eventsFor.touch;
      return _this.handleDragStart(e);
    });
    _defineProperty(_assertThisInitialized(_this), "onTouchEnd", function(e) {
      dragEventFor = eventsFor.touch;
      return _this.handleDragStop(e);
    });
    return _this;
  }
  _createClass(DraggableCore2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      var thisNode = this.findDOMNode();
      if (thisNode) {
        (0, _domFns.addEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, {
          passive: false
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      var thisNode = this.findDOMNode();
      if (thisNode) {
        var ownerDocument = thisNode.ownerDocument;
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.move, this.handleDrag);
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.move, this.handleDrag);
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
        (0, _domFns.removeEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, {
          passive: false
        });
        if (this.props.enableUserSelectHack)
          (0, _domFns.removeUserSelectStyles)(ownerDocument);
      }
    }
  }, {
    key: "findDOMNode",
    value: function findDOMNode2() {
      var _this$props, _this$props2, _this$props2$nodeRef;
      return (_this$props = this.props) !== null && _this$props !== void 0 && _this$props.nodeRef ? (_this$props2 = this.props) === null || _this$props2 === void 0 ? void 0 : (_this$props2$nodeRef = _this$props2.nodeRef) === null || _this$props2$nodeRef === void 0 ? void 0 : _this$props2$nodeRef.current : _reactDom.default.findDOMNode(this);
    }
  }, {
    key: "render",
    value: function render() {
      return /* @__PURE__ */ React.cloneElement(React.Children.only(this.props.children), {
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp,
        onTouchEnd: this.onTouchEnd
      });
    }
  }]);
  return DraggableCore2;
}(React.Component);
DraggableCore$2.default = DraggableCore$1;
_defineProperty(DraggableCore$1, "displayName", "DraggableCore");
_defineProperty(DraggableCore$1, "propTypes", {
  allowAnyClick: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  enableUserSelectHack: _propTypes.default.bool,
  offsetParent: function offsetParent(props, propName) {
    if (props[propName] && props[propName].nodeType !== 1) {
      throw new Error("Draggable's offsetParent must be a DOM Node.");
    }
  },
  grid: _propTypes.default.arrayOf(_propTypes.default.number),
  handle: _propTypes.default.string,
  cancel: _propTypes.default.string,
  nodeRef: _propTypes.default.object,
  onStart: _propTypes.default.func,
  onDrag: _propTypes.default.func,
  onStop: _propTypes.default.func,
  onMouseDown: _propTypes.default.func,
  scale: _propTypes.default.number,
  className: _shims.dontSetMe,
  style: _shims.dontSetMe,
  transform: _shims.dontSetMe
});
_defineProperty(DraggableCore$1, "defaultProps", {
  allowAnyClick: false,
  disabled: false,
  enableUserSelectHack: true,
  onStart: function onStart() {
  },
  onDrag: function onDrag() {
  },
  onStop: function onStop() {
  },
  onMouseDown: function onMouseDown() {
  },
  scale: 1
});
(function(exports) {
  function _typeof2(obj) {
    "@babel/helpers - typeof";
    return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof2(obj);
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "DraggableCore", {
    enumerable: true,
    get: function get() {
      return _DraggableCore.default;
    }
  });
  exports.default = void 0;
  var React2 = _interopRequireWildcard2(react.exports);
  var _propTypes2 = _interopRequireDefault2(propTypes.exports);
  var _reactDom2 = _interopRequireDefault2(reactDom.exports);
  var _clsx2 = _interopRequireDefault2(require$$3);
  var _domFns2 = domFns;
  var _positionFns2 = positionFns;
  var _shims2 = shims;
  var _DraggableCore = _interopRequireDefault2(DraggableCore$2);
  var _log2 = _interopRequireDefault2(log$1);
  var _excluded = ["axis", "bounds", "children", "defaultPosition", "defaultClassName", "defaultClassNameDragging", "defaultClassNameDragged", "position", "positionOffset", "scale"];
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _getRequireWildcardCache2(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
    var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache2 = function _getRequireWildcardCache3(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard2(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || _typeof2(obj) !== "object" && typeof obj !== "function") {
      return { default: obj };
    }
    var cache = _getRequireWildcardCache2(nodeInterop);
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
  function _extends() {
    _extends = Object.assign || function(target) {
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
  function _objectWithoutProperties(source, excluded) {
    if (source == null)
      return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key))
          continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  function ownKeys2(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys2(Object(source), true).forEach(function(key) {
        _defineProperty2(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _slicedToArray2(arr, i) {
    return _arrayWithHoles2(arr) || _iterableToArrayLimit2(arr, i) || _unsupportedIterableToArray2(arr, i) || _nonIterableRest2();
  }
  function _nonIterableRest2() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray2(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray2(o, minLen);
  }
  function _arrayLikeToArray2(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _iterableToArrayLimit2(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles2(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function _classCallCheck2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties2(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass2(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties2(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  function _inherits2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
    Object.defineProperty(subClass, "prototype", { writable: false });
    if (superClass)
      _setPrototypeOf2(subClass, superClass);
  }
  function _setPrototypeOf2(o, p) {
    _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf2(o, p);
  }
  function _createSuper2(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct2();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf2(Derived), result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf2(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn2(this, result);
    };
  }
  function _possibleConstructorReturn2(self, call) {
    if (call && (_typeof2(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized2(self);
  }
  function _assertThisInitialized2(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _isNativeReflectConstruct2() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _getPrototypeOf2(o) {
    _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf3(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _getPrototypeOf2(o);
  }
  function _defineProperty2(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var Draggable2 = /* @__PURE__ */ function(_React$Component) {
    _inherits2(Draggable3, _React$Component);
    var _super = _createSuper2(Draggable3);
    function Draggable3(props) {
      var _this;
      _classCallCheck2(this, Draggable3);
      _this = _super.call(this, props);
      _defineProperty2(_assertThisInitialized2(_this), "onDragStart", function(e, coreData) {
        (0, _log2.default)("Draggable: onDragStart: %j", coreData);
        var shouldStart = _this.props.onStart(e, (0, _positionFns2.createDraggableData)(_assertThisInitialized2(_this), coreData));
        if (shouldStart === false)
          return false;
        _this.setState({
          dragging: true,
          dragged: true
        });
      });
      _defineProperty2(_assertThisInitialized2(_this), "onDrag", function(e, coreData) {
        if (!_this.state.dragging)
          return false;
        (0, _log2.default)("Draggable: onDrag: %j", coreData);
        var uiData = (0, _positionFns2.createDraggableData)(_assertThisInitialized2(_this), coreData);
        var newState = {
          x: uiData.x,
          y: uiData.y
        };
        if (_this.props.bounds) {
          var x = newState.x, y = newState.y;
          newState.x += _this.state.slackX;
          newState.y += _this.state.slackY;
          var _getBoundPosition = (0, _positionFns2.getBoundPosition)(_assertThisInitialized2(_this), newState.x, newState.y), _getBoundPosition2 = _slicedToArray2(_getBoundPosition, 2), newStateX = _getBoundPosition2[0], newStateY = _getBoundPosition2[1];
          newState.x = newStateX;
          newState.y = newStateY;
          newState.slackX = _this.state.slackX + (x - newState.x);
          newState.slackY = _this.state.slackY + (y - newState.y);
          uiData.x = newState.x;
          uiData.y = newState.y;
          uiData.deltaX = newState.x - _this.state.x;
          uiData.deltaY = newState.y - _this.state.y;
        }
        var shouldUpdate = _this.props.onDrag(e, uiData);
        if (shouldUpdate === false)
          return false;
        _this.setState(newState);
      });
      _defineProperty2(_assertThisInitialized2(_this), "onDragStop", function(e, coreData) {
        if (!_this.state.dragging)
          return false;
        var shouldContinue = _this.props.onStop(e, (0, _positionFns2.createDraggableData)(_assertThisInitialized2(_this), coreData));
        if (shouldContinue === false)
          return false;
        (0, _log2.default)("Draggable: onDragStop: %j", coreData);
        var newState = {
          dragging: false,
          slackX: 0,
          slackY: 0
        };
        var controlled = Boolean(_this.props.position);
        if (controlled) {
          var _this$props$position = _this.props.position, x = _this$props$position.x, y = _this$props$position.y;
          newState.x = x;
          newState.y = y;
        }
        _this.setState(newState);
      });
      _this.state = {
        dragging: false,
        dragged: false,
        x: props.position ? props.position.x : props.defaultPosition.x,
        y: props.position ? props.position.y : props.defaultPosition.y,
        prevPropsPosition: _objectSpread2({}, props.position),
        slackX: 0,
        slackY: 0,
        isElementSVG: false
      };
      if (props.position && !(props.onDrag || props.onStop)) {
        console.warn("A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element.");
      }
      return _this;
    }
    _createClass2(Draggable3, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (typeof window.SVGElement !== "undefined" && this.findDOMNode() instanceof window.SVGElement) {
          this.setState({
            isElementSVG: true
          });
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.setState({
          dragging: false
        });
      }
    }, {
      key: "findDOMNode",
      value: function findDOMNode2() {
        var _this$props$nodeRef$c, _this$props, _this$props$nodeRef;
        return (_this$props$nodeRef$c = (_this$props = this.props) === null || _this$props === void 0 ? void 0 : (_this$props$nodeRef = _this$props.nodeRef) === null || _this$props$nodeRef === void 0 ? void 0 : _this$props$nodeRef.current) !== null && _this$props$nodeRef$c !== void 0 ? _this$props$nodeRef$c : _reactDom2.default.findDOMNode(this);
      }
    }, {
      key: "render",
      value: function render() {
        var _clsx;
        var _this$props2 = this.props;
        _this$props2.axis;
        _this$props2.bounds;
        var children = _this$props2.children, defaultPosition = _this$props2.defaultPosition, defaultClassName = _this$props2.defaultClassName, defaultClassNameDragging = _this$props2.defaultClassNameDragging, defaultClassNameDragged = _this$props2.defaultClassNameDragged, position = _this$props2.position, positionOffset = _this$props2.positionOffset;
        _this$props2.scale;
        var draggableCoreProps = _objectWithoutProperties(_this$props2, _excluded);
        var style = {};
        var svgTransform = null;
        var controlled = Boolean(position);
        var draggable = !controlled || this.state.dragging;
        var validPosition = position || defaultPosition;
        var transformOpts = {
          x: (0, _positionFns2.canDragX)(this) && draggable ? this.state.x : validPosition.x,
          y: (0, _positionFns2.canDragY)(this) && draggable ? this.state.y : validPosition.y
        };
        if (this.state.isElementSVG) {
          svgTransform = (0, _domFns2.createSVGTransform)(transformOpts, positionOffset);
        } else {
          style = (0, _domFns2.createCSSTransform)(transformOpts, positionOffset);
        }
        var className = (0, _clsx2.default)(children.props.className || "", defaultClassName, (_clsx = {}, _defineProperty2(_clsx, defaultClassNameDragging, this.state.dragging), _defineProperty2(_clsx, defaultClassNameDragged, this.state.dragged), _clsx));
        return /* @__PURE__ */ React2.createElement(_DraggableCore.default, _extends({}, draggableCoreProps, {
          onStart: this.onDragStart,
          onDrag: this.onDrag,
          onStop: this.onDragStop
        }), /* @__PURE__ */ React2.cloneElement(React2.Children.only(children), {
          className,
          style: _objectSpread2(_objectSpread2({}, children.props.style), style),
          transform: svgTransform
        }));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(_ref, _ref2) {
        var position = _ref.position;
        var prevPropsPosition = _ref2.prevPropsPosition;
        if (position && (!prevPropsPosition || position.x !== prevPropsPosition.x || position.y !== prevPropsPosition.y)) {
          (0, _log2.default)("Draggable: getDerivedStateFromProps %j", {
            position,
            prevPropsPosition
          });
          return {
            x: position.x,
            y: position.y,
            prevPropsPosition: _objectSpread2({}, position)
          };
        }
        return null;
      }
    }]);
    return Draggable3;
  }(React2.Component);
  exports.default = Draggable2;
  _defineProperty2(Draggable2, "displayName", "Draggable");
  _defineProperty2(Draggable2, "propTypes", _objectSpread2(_objectSpread2({}, _DraggableCore.default.propTypes), {}, {
    axis: _propTypes2.default.oneOf(["both", "x", "y", "none"]),
    bounds: _propTypes2.default.oneOfType([_propTypes2.default.shape({
      left: _propTypes2.default.number,
      right: _propTypes2.default.number,
      top: _propTypes2.default.number,
      bottom: _propTypes2.default.number
    }), _propTypes2.default.string, _propTypes2.default.oneOf([false])]),
    defaultClassName: _propTypes2.default.string,
    defaultClassNameDragging: _propTypes2.default.string,
    defaultClassNameDragged: _propTypes2.default.string,
    defaultPosition: _propTypes2.default.shape({
      x: _propTypes2.default.number,
      y: _propTypes2.default.number
    }),
    positionOffset: _propTypes2.default.shape({
      x: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
      y: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
    }),
    position: _propTypes2.default.shape({
      x: _propTypes2.default.number,
      y: _propTypes2.default.number
    }),
    className: _shims2.dontSetMe,
    style: _shims2.dontSetMe,
    transform: _shims2.dontSetMe
  }));
  _defineProperty2(Draggable2, "defaultProps", _objectSpread2(_objectSpread2({}, _DraggableCore.default.defaultProps), {}, {
    axis: "both",
    bounds: false,
    defaultClassName: "react-draggable",
    defaultClassNameDragging: "react-draggable-dragging",
    defaultClassNameDragged: "react-draggable-dragged",
    defaultPosition: {
      x: 0,
      y: 0
    },
    scale: 1
  }));
})(Draggable$1);
var _require = Draggable$1, Draggable = _require.default, DraggableCore = _require.DraggableCore;
cjs.exports = Draggable;
cjs.exports.default = Draggable;
cjs.exports.DraggableCore = DraggableCore;
function DraggableBox({
  defaultY,
  defaultX,
  children
}) {
  return /* @__PURE__ */ jsx(cjs.exports, {
    handle: ".drag_gpt_handle",
    defaultPosition: {
      x: defaultX,
      y: defaultY
    },
    children
  });
}
DraggableBox.handlerClassName = "drag_gpt_handle";
const GAP = 8;
const MessageBoxContainer = newStyled.div`
  background: ${COLORS.CONTENT_BACKGROUND};
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: ${Z_INDEX.ROOT};

  white-space: pre-wrap;

  width: ${(p) => p.width}px;
  min-width: ${(p) => p.width}px;
  max-width: ${(p) => p.width}px;

  border-radius: 6px;
  padding: 12px;
  font-size: 14px;
  line-height: 16px;
  p {
    margin: 0;
  }
`;
const StyledCloseButton = newStyled(CloseButton)`
  cursor: pointer;
  margin: 0;
  background: transparent;
  border: none;
  outline: none;
  padding: 6px;
  border-radius: 4px;

  &:active {
    outline: none;
    transform: scale(0.9);
    transition: all ease-in-out 100ms;
  }
`;
function MessageBox({
  anchorCenter,
  anchorTop,
  anchorBottom,
  header,
  width,
  content,
  onClose,
  positionOnScreen,
  footer,
  isOutsideClickDisabled,
  ...restProps
}) {
  var _a, _b;
  const containerRef = react.exports.useRef(null);
  useRootOutsideClick({
    ref: containerRef,
    isDisabled: isOutsideClickDisabled,
    handler: onClose
  });
  react.exports.useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const boxCenterPosition = anchorCenter - width / 2;
    const height = containerRef.current.getBoundingClientRect().height;
    switch (positionOnScreen) {
      case "topLeft":
      case "topRight": {
        containerRef.current.style.top = getSafePixel(anchorBottom + GAP);
        containerRef.current.style.left = getSafePixel(boxCenterPosition);
        return;
      }
      case "bottomLeft":
      case "bottomRight": {
        containerRef.current.style.top = getSafePixel(anchorTop - GAP - height);
        containerRef.current.style.left = getSafePixel(boxCenterPosition);
        return;
      }
    }
  }, [containerRef, anchorCenter, anchorBottom, anchorTop, positionOnScreen]);
  const containerRefRect = react.exports.useMemo(() => {
    var _a2;
    return (_a2 = containerRef.current) == null ? void 0 : _a2.getBoundingClientRect();
  }, [containerRef.current]);
  return /* @__PURE__ */ jsx(DraggableBox, {
    defaultX: (_a = containerRefRect == null ? void 0 : containerRefRect.x) != null ? _a : 0,
    defaultY: (_b = containerRefRect == null ? void 0 : containerRefRect.y) != null ? _b : 0,
    children: /* @__PURE__ */ jsx(MessageBoxContainer, {
      width,
      ref: containerRef,
      ...restProps,
      children: /* @__PURE__ */ jsxs(Stack, {
        children: [/* @__PURE__ */ jsxs(HStack, {
          justifyContent: "space-between",
          children: [typeof header === "string" ? /* @__PURE__ */ jsx(Text, {
            color: "white",
            fontWeight: "bold",
            children: header
          }) : header, /* @__PURE__ */ jsx(StyledCloseButton, {
            color: "white",
            size: "sm",
            onClick: onClose
          })]
        }), /* @__PURE__ */ jsx(HStack, {
          children: typeof content === "string" ? /* @__PURE__ */ jsx(Text, {
            color: "white",
            children: content
          }) : content
        }), footer]
      })
    })
  });
}
const ConLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASQSURBVHgB7ZppiBRHFMf/MeY0kRhiTAzGiSEJkpCYSMQLVARPvC88QAVB8ABRvBAUkRVUFPWDouCB6Bf9oB8UD1BQVBRvEVQ8Vhdv8cZbd31/6hVdu07PTO9MD63WD/7MbO3r6qrqOt57PYDH4/F4PB6Px+PxeD48PkL81BJ1EzUS/StqKKopeil6IDopOqWf1Cu8B9QQdRKtFz0XVeSox6Ktopmi/qJ6iJk4ZgA7XiL6r0r5FdFxUZnoKcws+E70v+hX0cch9d0U7RZtEa1BgvlaNB+Vn+gl0XjRn1murSPqKDqt1z3D27NjMRJMA5j1axvLp9wL0Tmq1y8U1dc6bJ2DkVBSovMwjSyHeVJ1EJ2fEewXfbWsDYIB+BsJpC6CznNdj0P16aL1vBb9oWVTtewOinNiRWYjgic0HPkxW+s5i6Czq7VsNxLIKASdn4j82ap1bXPKrmlZCWKiJqoHp/5U/b4fZtPKBP2CHqKuoqYw5zuXzBHRCf1sqra79JOO04/6/QgShl2b1O9ZbHm8nUXuzhBnwiTRDKfsNySIL0WlMA1bl8V2BCp37pxoHsyS4bTeKbqOzANyHQmDnp5tXOsMdsMcu8uidhls6QkOgBkcbngPnWuren+fiBqrPU+OBigyKxDs1mH8ILrq2EX16WuLWsIMYnennGXcc8oRDBADKvoe36NI7NMbr8pgU4LAMWqEwtBedBdBx++jcqDFjfJbxMwXott6w9EhNp/CrPVsgxSFz2CCKRtf0FNkIMUNeAGCQZiFmPkFwfRrG2LTxGlQbxSGPk6dzdP8f5X+j8uuFiJQA9HgCWC9tEchNm4ccBiFoZl+MuA6mOb/K/Wzvipnog5AhfO9PMTGLS+U/27r+bxKGyxuWSTnLuoAPEHQwdohNjec701QGPboZwrpj1Mbh5SqYoOdZoaGIz42xIbL5LLarEbh7ntG6+T9B8Hs+D+JlqKImyCxSYtlGWxmqA1nTKGOQSZW3WOQzpJ7DB6A8T9iZzECtzZsCbEhtrGckilEg0ccg6ORop5O+T8wm6DrKnMz5iz4BkWiq3PzVhnsOE1fq91FUQeEb4op0RCYbDAdmjvOPdLFGxycfjCucF0UGSY/rZu7IYvtNJj8v+0M8/9LYIIhdpbB0C1kDobKkEAYruYaDjN4uoDcw+HNMJnkOU5ZpLO9GPA8vgfTuL05XsMpy6fPdwPM9HAP4YsTzhIujwda3xS1r4eEZ4THIGhgtoxQLmzQujY5ZWVaNh0JxTaa7/OGIj9sUMPlYr25tVp2EAmFufxSmEbybU4+yVGbFufZ3lDLJmvZLSSYFMwxZ5cDcwHVSU5wo3usdQzUsjZOvY2RYPjErKtqnSSGsFGDIVsHN0tugsOdOvNdYrHzlWgRKp/77NAE0V9ZrqVvwQE7pNcxZe6mvah5iIE4Xjd1Fs3F251mEMMOcs94AZM5YkDD1+Mp/TsdvI5H7Q7RcrxDMHiJ+gMJusDbYbxEzoh38gcSVaGv3gLmBxP8iQwDHeYW2WHmF4/BvGC1b4kq4PF4PB6Px+PxeDweT6y8AV+0fbH/MV1DAAAAAElFTkSuQmCC";
function ResponseMessageBox({
  initialChats,
  onClose,
  ...restProps
}) {
  var _a;
  const [state, send] = useMachine(streamChatStateMachine, {
    services: {
      getChatHistoryFromBackground: () => Promise.resolve(initialChats),
      getGPTResponse: (context) => {
        return getDragGPTResponseAsStream({
          messages: context.chats.filter((chat) => chat.role !== "error"),
          onDelta: (chunk) => {
            send("RECEIVE_ING", {
              data: chunk
            });
          },
          onFinish: (result) => send("RECEIVE_DONE", {
            data: result
          })
        });
      }
    },
    actions: {
      exitChatting: onClose
    }
  });
  const [, ...chats] = state.context.chats;
  const isLoading = state.matches("loading");
  const isReceiving = state.matches("receiving");
  const {
    scrollDownRef
  } = useScrollDownEffect([(_a = chats.at(-1)) == null ? void 0 : _a.content]);
  const {
    isCopied,
    copy
  } = useCopyClipboard([chats.filter(({
    role
  }) => role === "assistant").length]);
  const onClickStopButton = () => {
    send("RECEIVE_CANCEL");
  };
  const onClickCopy = async () => {
    const lastResponseText = findLastResponseChat(chats);
    if (lastResponseText) {
      await copy(lastResponseText.content);
    }
  };
  const lastResponseIndex = (() => {
    if (isLoading) {
      return chats.length - 2;
    }
    return chats.length - 1;
  })();
  const onChatSubmit = (event) => {
    event.preventDefault();
    send({
      type: "QUERY"
    });
  };
  return /* @__PURE__ */ jsx(MessageBox, {
    header: /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsxs(Text, {
        as: "header",
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: 24,
        color: "black",
        fontWeight: "bold",
        cursor: "move",
        className: DraggableBox.handlerClassName,
        children: [/* @__PURE__ */ jsx(DragHandleIcon, {
          mr: 4,
          boxSize: 12
        }), t("responseMessageBox_responseTitle")]
      }), /* @__PURE__ */ jsx(Image$1, {
        src: ConLogo,
        alt: "",
        align: "right"
      })]
    }),
    onClose: () => send("EXIT"),
    width: 480,
    isOutsideClickDisabled: chats.length > 1,
    content: /* @__PURE__ */ jsx(VStack, {
      ref: scrollDownRef,
      maxHeight: 400,
      width: "100%",
      overflowY: "scroll",
      children: chats.map((chat, index) => /* @__PURE__ */ jsx(ChatBox, {
        chat,
        isLastAndResponse: lastResponseIndex === index
      }, index))
    }),
    footer: /* @__PURE__ */ jsxs(HStack, {
      width: "100%",
      pt: 8,
      justifyContent: "space-between",
      children: [/* @__PURE__ */ jsx(StyledButton, {
        onClick: onClickCopy,
        children: isCopied ? t("responseMessageBox_copyButtonText_copied") : t("responseMessageBox_copyButtonText_copy")
      }), isReceiving && /* @__PURE__ */ jsx(StyledButton, {
        colorScheme: "orange",
        onClick: onClickStopButton,
        children: t("responseMessageBox_stopButtonText")
      }), /* @__PURE__ */ jsxs(HStack, {
        as: "form",
        onSubmit: onChatSubmit,
        children: [/* @__PURE__ */ jsx(Input, {
          width: 230,
          value: state.context.inputText,
          placeholder: t("responseMessageBox_messageInputPlacepolder"),
          onChange: (e) => send({
            type: "CHANGE_TEXT",
            data: e.target.value
          }),
          onKeyDown: (e) => e.stopPropagation()
        }), /* @__PURE__ */ jsx(StyledButton, {
          type: "submit",
          isLoading: isLoading || isReceiving,
          children: t("responseMessageBox_sendButtonText")
        })]
      })]
    }),
    ...restProps
  });
}
const ChatBox = ({
  chat,
  isLastAndResponse
}) => {
  if (isLastAndResponse) {
    return /* @__PURE__ */ jsx(AssistantChat, {
      children: /* @__PURE__ */ jsx(ChatText, {
        children: chat.content
      })
    });
  }
  if (chat.role === "error") {
    return /* @__PURE__ */ jsx(AssistantChat, {
      children: /* @__PURE__ */ jsx(ChatText, {
        isError: true,
        children: chat.content
      })
    });
  }
  if (chat.role === "assistant") {
    return /* @__PURE__ */ jsx(AssistantChat, {
      children: /* @__PURE__ */ jsx(ChatText, {
        children: chat.content
      })
    });
  }
  return /* @__PURE__ */ jsx(UserChat, {
    children: /* @__PURE__ */ jsx(ChatText, {
      bold: true,
      children: chat.content.trim()
    })
  });
};
function findLastResponseChat(chats) {
  return chats.filter((chat) => chat.role === "assistant").at(-1);
}
const ErrorHeaderText = newStyled(Text)`
  font-weight: bold;
  color: #ea3737;
`;
function ErrorMessageBox({
  error,
  ...restProps
}) {
  var _a, _b;
  return /* @__PURE__ */ jsx(MessageBox, {
    header: /* @__PURE__ */ jsx(ErrorHeaderText, {
      children: `${t("errorMessageBox_errorTitle")}: ${(_a = error == null ? void 0 : error.name) != null ? _a : t("errorMessageBox_unknownError")}`
    }),
    width: 400,
    content: (_b = error == null ? void 0 : error.message) != null ? _b : t("errorMessageBox_unknownError"),
    ...restProps
  });
}
async function delayPromise(ms) {
  return new Promise(
    (resolve) => setTimeout(() => {
      resolve(ms);
    }, ms)
  );
}
const initialContext = {
  chats: [],
  selectedText: "",
  requestButtonPosition: { top: 0, left: 0 },
  anchorNodePosition: { top: 0, center: 0, bottom: 0 },
  selectedTextNodeRect: { top: 0, left: 0, height: 0, width: 0 },
  positionOnScreen: "topLeft",
  error: void 0
};
const dragStateMachine = createMachine(
  {
    id: "drag-state",
    initial: "idle",
    predictableActionArguments: true,
    context: initialContext,
    schema: {
      context: {},
      events: {},
      services: {}
    },
    tsTypes: {},
    states: {
      idle: {
        entry: ["resetAll"],
        on: {
          TEXT_SELECTED: {
            target: "request_button",
            actions: "readyRequestButton",
            cond: "isValidTextSelectedEvent"
          }
        }
      },
      request_button: {
        tags: "showRequestButton",
        on: {
          TEXT_SELECTED: [
            {
              actions: "readyRequestButton",
              cond: "isValidTextSelectedEvent"
            },
            {
              target: "idle",
              cond: "isInvalidTextSelectedEvent"
            }
          ],
          REQUEST: { target: "loading", actions: "addRequestChat" }
        }
      },
      loading: {
        tags: "showRequestButton",
        entry: ["setAnchorNodePosition"],
        exit: ["setPositionOnScreen"],
        invoke: {
          src: "getGPTResponse",
          onDone: {
            target: "temp_response_message_box",
            actions: "addInitialResponseChat"
          },
          onError: {
            target: "error_message_box",
            actions: assign({
              error: (_, event) => event.data
            })
          }
        }
      },
      temp_response_message_box: {
        on: {
          RECEIVE_ING: {
            actions: "addResponseChatChunk"
          },
          RECEIVE_END: "response_message_box",
          RECEIVE_CANCEL: "idle"
        }
      },
      response_message_box: {
        tags: "showResponseMessages",
        on: {
          CLOSE_MESSAGE_BOX: "idle"
        }
      },
      error_message_box: {
        on: {
          CLOSE_MESSAGE_BOX: "idle"
        }
      }
    }
  },
  {
    actions: {
      resetAll: assign({ ...initialContext }),
      setAnchorNodePosition: assign({
        anchorNodePosition: (context) => {
          const { left, width, height, top } = context.selectedTextNodeRect;
          const verticalCenter = left + width / 2;
          return {
            top: top + window.scrollY,
            bottom: top + height + window.scrollY,
            center: verticalCenter + window.scrollX
          };
        }
      }),
      readyRequestButton: assign({
        selectedText: (_, event) => event.data.selectedText,
        selectedTextNodeRect: (context, event) => {
          var _a;
          return (_a = event.data.selectedNodeRect) != null ? _a : context.selectedTextNodeRect;
        },
        requestButtonPosition: (_, event) => event.data.requestButtonPosition
      }),
      addRequestChat: assign({
        chats: (context) => context.chats.concat({ role: "user", content: context.selectedText })
      }),
      addInitialResponseChat: assign({
        chats: (context, event) => context.chats.concat({
          role: "assistant",
          content: event.data.firstChunk
        })
      }),
      addResponseChatChunk: assign({
        chats: ({ chats }, event) => {
          const lastChat = chats.at(-1);
          if (!lastChat) {
            return chats;
          }
          return chats.slice(0, chats.length - 1).concat({ ...lastChat, content: lastChat.content + event.data });
        }
      })
    },
    guards: {
      isValidTextSelectedEvent: (_, event) => {
        return isValidTextSelectedEvent(event);
      },
      isInvalidTextSelectedEvent: (_, event) => {
        return !isValidTextSelectedEvent(event);
      }
    }
  }
);
function isValidTextSelectedEvent(event) {
  if (!event.data.selectedNodeRect) {
    return false;
  }
  return event.data.selectedText.length > 1;
}
function getPositionOnScreen(position) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const isLeft = viewportWidth / 2 > position.verticalCenter;
  const isTop = viewportHeight / 2 > position.horizontalCenter;
  if (isTop && isLeft) {
    return "topLeft";
  }
  if (isTop && !isLeft) {
    return "topRight";
  }
  if (!isTop && isLeft) {
    return "bottomLeft";
  }
  return "bottomRight";
}
function useSelectedSlot(pollIntervalMs = 1500) {
  const [selectedSlot, setSelectedSlot] = react.exports.useState();
  const getSelectedSlot = async () => {
    if (window.document.hidden) {
      return;
    }
    try {
      const slots = await sendMessageToBackgroundAsync({ type: "GetSlots" });
      return SlotsManipulatorService.getSelectedSlot(slots);
    } catch (e) {
      return void 0;
    }
  };
  useInterval(() => {
    getSelectedSlot().then(setSelectedSlot);
  }, pollIntervalMs);
  return selectedSlot;
}
const Container = newStyled.div`
  * {
    font-family: "Garamond", serif;
  }
`;
const skipLoopCycleOnce = async () => await delayPromise(1);
async function getGPTResponseAsStream({
  input,
  onDelta,
  onFinish
}) {
  return new Promise((resolve, reject) => {
    sendMessageToBackground({
      message: {
        type: "RequestInitialDragGPTStream",
        input
      },
      handleSuccess: (response) => {
        if (response.isDone || !response.chunk) {
          return onFinish(response.result);
        }
        resolve({
          firstChunk: response.chunk
        });
        onDelta(response.chunk);
      },
      handleError: reject
    });
  });
}
function DragGPT() {
  var _a;
  const selectedSlot = useSelectedSlot();
  const [state, send] = useMachine(dragStateMachine, {
    actions: {
      setPositionOnScreen: (context) => {
        const {
          left,
          width,
          height,
          top
        } = context.selectedTextNodeRect;
        const verticalCenter = left + width / 2;
        const horizontalCenter = top + height / 2;
        context.positionOnScreen = getPositionOnScreen({
          horizontalCenter,
          verticalCenter
        });
      }
    },
    services: {
      getGPTResponse: (context) => getGPTResponseAsStream({
        input: context.selectedText,
        onDelta: (chunk) => send("RECEIVE_ING", {
          data: chunk
        }),
        onFinish: () => send("RECEIVE_END")
      })
    }
  });
  react.exports.useEffect(() => {
    const onMouseUp = async (event) => {
      await skipLoopCycleOnce();
      send({
        type: "TEXT_SELECTED",
        data: {
          selectedText: getSelectionText(),
          selectedNodeRect: getSelectionNodeRect(),
          requestButtonPosition: {
            top: event.clientY + window.scrollY,
            left: event.clientX + window.scrollX
          }
        }
      });
    };
    window.document.addEventListener("mouseup", onMouseUp);
    return () => {
      window.document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);
  const requestGPT = () => {
    send("REQUEST");
  };
  const closeMessageBox = () => {
    send("CLOSE_MESSAGE_BOX");
  };
  return /* @__PURE__ */ jsxs(Container, {
    children: [state.hasTag("showRequestButton") && /* @__PURE__ */ jsx(GPTRequestButton, {
      onClick: requestGPT,
      loading: state.matches("loading"),
      top: state.context.requestButtonPosition.top,
      left: state.context.requestButtonPosition.left,
      selectedSlot
    }), state.matches("temp_response_message_box") && /* @__PURE__ */ jsx(MessageBox, {
      header: t("responseMessageBox_responseTitle"),
      content: /* @__PURE__ */ jsx(AssistantChat, {
        children: /* @__PURE__ */ jsx(ChatText, {
          children: (_a = state.context.chats.at(-1)) == null ? void 0 : _a.content
        })
      }),
      width: 480,
      isOutsideClickDisabled: true,
      onClose: () => send("RECEIVE_CANCEL"),
      anchorTop: state.context.anchorNodePosition.top,
      anchorCenter: state.context.anchorNodePosition.center,
      anchorBottom: state.context.anchorNodePosition.bottom,
      positionOnScreen: state.context.positionOnScreen
    }), state.hasTag("showResponseMessages") && /* @__PURE__ */ jsx(ResponseMessageBox, {
      onClose: closeMessageBox,
      initialChats: state.context.chats,
      anchorTop: state.context.anchorNodePosition.top,
      anchorCenter: state.context.anchorNodePosition.center,
      anchorBottom: state.context.anchorNodePosition.bottom,
      positionOnScreen: state.context.positionOnScreen
    }), state.matches("error_message_box") && /* @__PURE__ */ jsx(ErrorMessageBox, {
      onClose: closeMessageBox,
      error: state.context.error,
      anchorTop: state.context.anchorNodePosition.top,
      anchorCenter: state.context.anchorNodePosition.center,
      anchorBottom: state.context.anchorNodePosition.bottom,
      positionOnScreen: state.context.positionOnScreen
    })]
  });
}
function EmotionCacheProvider({
  children
}) {
  var _a;
  const shadowRootRef = react.exports.useRef(null);
  const [emotionCache, setEmotionCache] = react.exports.useState();
  react.exports.useEffect(() => {
    const root2 = document.getElementById(ROOT_ID);
    if (root2 && root2.shadowRoot) {
      setEmotionStyles(root2);
    }
  }, [(_a = shadowRootRef.current) == null ? void 0 : _a.shadowRoot]);
  function setEmotionStyles(ref) {
    if (!(ref == null ? void 0 : ref.shadowRoot)) {
      return;
    }
    if (ref && !emotionCache) {
      const createdInflabEmotionWithRef = createCache({
        key: "drag-gpt-key",
        container: ref.shadowRoot
      });
      setEmotionCache(createdInflabEmotionWithRef);
    }
  }
  return /* @__PURE__ */ jsx("div", {
    id: "root",
    ref: shadowRootRef,
    children: emotionCache && /* @__PURE__ */ jsx(CacheProvider, {
      value: emotionCache,
      children
    })
  });
}
function ResetStyleProvider({
  children
}) {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("style", {
      children: `
    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  background-color: #282c34;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}

textarea, input {
  outline: none;
}

textarea, input:hover {
  outline: none;
}

    `
    }), children]
  });
}
function FontProvider({
  children
}) {
  react.exports.useEffect(() => {
    const linkNode = document.createElement("link");
    linkNode.type = "text/css";
    linkNode.rel = "stylesheet";
    linkNode.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap";
    document.head.appendChild(linkNode);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("style", {
      children: `
* {
  font-family: "Noto Sans KR", sans-serif;
}
    `
    }), children]
  });
}
function App() {
  return /* @__PURE__ */ jsx(ResetStyleProvider, {
    children: /* @__PURE__ */ jsx(FontProvider, {
      children: /* @__PURE__ */ jsx(EmotionCacheProvider, {
        children: /* @__PURE__ */ jsx(DragGPT, {})
      })
    })
  });
}
addHmrIntoView("pages/content/src/ContentScriptApp");
const root = document.createElement("div");
root.id = ROOT_ID;
document.body.append(root);
const renderIn = document.createElement("div");
renderIn.id = SHADOW_ROOT_ID;
const shadow = root.attachShadow({
  mode: "open"
});
shadow.appendChild(renderIn);
createRoot(renderIn).render(/* @__PURE__ */ jsx(App, {}));
