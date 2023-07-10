import "../../../assets/js/modulepreload-polyfill.js";
import { r as react, j as jsxs, a as jsx, F as Fragment, b as addHmrIntoView, c as createRoot } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
import { i as isObject, c as createMultiStyleConfigHelpers, d as defineStyle, a as cssVar$1, b as defineStyleConfig, t as toCSSVar, T as ThemeProvider$1, G as Global, u as useCallbackRef, e as createContext$1, f as forwardRef, g as useMultiStyleConfig, o as omitThemingProps, h as getValidChildren, j as chakra, I as Icon, k as useStyleConfig, l as cx$1, m as mergeRefs, n as useTheme, p as useFormControl, q as Text, r as t, V as VStack, S as Spinner, C as COLORS, H as HStack, s as Input, v as StyledButton, w as createMachine, x as assign, y as newStyled, B as Box, z as Tooltip, A as useMachine, D as streamChatStateMachine, E as getQuickGPTResponseAsStream, F as useScrollDownEffect, J as useCopyClipboard, K as AssistantChat, L as ChatText, U as UserChat } from "../../../assets/js/getGPTResponseAsStream.js";
import { b as sendMessageToBackgroundAsync, c as sendMessageToBackground } from "../../../assets/js/message.js";
import { c as createNewChatGPTSlot } from "../../../assets/js/createNewChatGPTSlot.js";
const index = "";
var zIndices = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1e3,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
};
var z_index_default = zIndices;
var breakpoints = {
  base: "0em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em"
};
var breakpoints_default = breakpoints;
var colors = {
  transparent: "transparent",
  current: "currentColor",
  black: "#000000",
  white: "#FFFFFF",
  whiteAlpha: {
    50: "rgba(255, 255, 255, 0.04)",
    100: "rgba(255, 255, 255, 0.06)",
    200: "rgba(255, 255, 255, 0.08)",
    300: "rgba(255, 255, 255, 0.16)",
    400: "rgba(255, 255, 255, 0.24)",
    500: "rgba(255, 255, 255, 0.36)",
    600: "rgba(255, 255, 255, 0.48)",
    700: "rgba(255, 255, 255, 0.64)",
    800: "rgba(255, 255, 255, 0.80)",
    900: "rgba(255, 255, 255, 0.92)"
  },
  blackAlpha: {
    50: "rgba(0, 0, 0, 0.04)",
    100: "rgba(0, 0, 0, 0.06)",
    200: "rgba(0, 0, 0, 0.08)",
    300: "rgba(0, 0, 0, 0.16)",
    400: "rgba(0, 0, 0, 0.24)",
    500: "rgba(0, 0, 0, 0.36)",
    600: "rgba(0, 0, 0, 0.48)",
    700: "rgba(0, 0, 0, 0.64)",
    800: "rgba(0, 0, 0, 0.80)",
    900: "rgba(0, 0, 0, 0.92)"
  },
  gray: {
    50: "#F7FAFC",
    100: "#EDF2F7",
    200: "#E2E8F0",
    300: "#CBD5E0",
    400: "#A0AEC0",
    500: "#718096",
    600: "#4A5568",
    700: "#2D3748",
    800: "#1A202C",
    900: "#171923"
  },
  red: {
    50: "#FFF5F5",
    100: "#FED7D7",
    200: "#FEB2B2",
    300: "#FC8181",
    400: "#F56565",
    500: "#E53E3E",
    600: "#C53030",
    700: "#9B2C2C",
    800: "#822727",
    900: "#63171B"
  },
  orange: {
    50: "#FFFAF0",
    100: "#FEEBC8",
    200: "#FBD38D",
    300: "#F6AD55",
    400: "#ED8936",
    500: "#DD6B20",
    600: "#C05621",
    700: "#9C4221",
    800: "#7B341E",
    900: "#652B19"
  },
  yellow: {
    50: "#FFFFF0",
    100: "#FEFCBF",
    200: "#FAF089",
    300: "#F6E05E",
    400: "#ECC94B",
    500: "#D69E2E",
    600: "#B7791F",
    700: "#975A16",
    800: "#744210",
    900: "#5F370E"
  },
  green: {
    50: "#F0FFF4",
    100: "#C6F6D5",
    200: "#9AE6B4",
    300: "#68D391",
    400: "#48BB78",
    500: "#38A169",
    600: "#2F855A",
    700: "#276749",
    800: "#22543D",
    900: "#1C4532"
  },
  teal: {
    50: "#E6FFFA",
    100: "#B2F5EA",
    200: "#81E6D9",
    300: "#4FD1C5",
    400: "#38B2AC",
    500: "#319795",
    600: "#2C7A7B",
    700: "#285E61",
    800: "#234E52",
    900: "#1D4044"
  },
  blue: {
    50: "#ebf8ff",
    100: "#bee3f8",
    200: "#90cdf4",
    300: "#63b3ed",
    400: "#4299e1",
    500: "#3182ce",
    600: "#2b6cb0",
    700: "#2c5282",
    800: "#2a4365",
    900: "#1A365D"
  },
  cyan: {
    50: "#EDFDFD",
    100: "#C4F1F9",
    200: "#9DECF9",
    300: "#76E4F7",
    400: "#0BC5EA",
    500: "#00B5D8",
    600: "#00A3C4",
    700: "#0987A0",
    800: "#086F83",
    900: "#065666"
  },
  purple: {
    50: "#FAF5FF",
    100: "#E9D8FD",
    200: "#D6BCFA",
    300: "#B794F4",
    400: "#9F7AEA",
    500: "#805AD5",
    600: "#6B46C1",
    700: "#553C9A",
    800: "#44337A",
    900: "#322659"
  },
  pink: {
    50: "#FFF5F7",
    100: "#FED7E2",
    200: "#FBB6CE",
    300: "#F687B3",
    400: "#ED64A6",
    500: "#D53F8C",
    600: "#B83280",
    700: "#97266D",
    800: "#702459",
    900: "#521B41"
  },
  linkedin: {
    50: "#E8F4F9",
    100: "#CFEDFB",
    200: "#9BDAF3",
    300: "#68C7EC",
    400: "#34B3E4",
    500: "#00A0DC",
    600: "#008CC9",
    700: "#0077B5",
    800: "#005E93",
    900: "#004471"
  },
  facebook: {
    50: "#E8F4F9",
    100: "#D9DEE9",
    200: "#B7C2DA",
    300: "#6482C0",
    400: "#4267B2",
    500: "#385898",
    600: "#314E89",
    700: "#29487D",
    800: "#223B67",
    900: "#1E355B"
  },
  messenger: {
    50: "#D0E6FF",
    100: "#B9DAFF",
    200: "#A2CDFF",
    300: "#7AB8FF",
    400: "#2E90FF",
    500: "#0078FF",
    600: "#0063D1",
    700: "#0052AC",
    800: "#003C7E",
    900: "#002C5C"
  },
  whatsapp: {
    50: "#dffeec",
    100: "#b9f5d0",
    200: "#90edb3",
    300: "#65e495",
    400: "#3cdd78",
    500: "#22c35e",
    600: "#179848",
    700: "#0c6c33",
    800: "#01421c",
    900: "#001803"
  },
  twitter: {
    50: "#E5F4FD",
    100: "#C8E9FB",
    200: "#A8DCFA",
    300: "#83CDF7",
    400: "#57BBF5",
    500: "#1DA1F2",
    600: "#1A94DA",
    700: "#1681BF",
    800: "#136B9E",
    900: "#0D4D71"
  },
  telegram: {
    50: "#E3F2F9",
    100: "#C5E4F3",
    200: "#A2D4EC",
    300: "#7AC1E4",
    400: "#47A9DA",
    500: "#0088CC",
    600: "#007AB8",
    700: "#006BA1",
    800: "#005885",
    900: "#003F5E"
  }
};
var colors_default = colors;
var radii = {
  none: "0",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px"
};
var radius_default = radii;
var shadows = {
  xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
  inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
  none: "none",
  "dark-lg": "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px"
};
var shadows_default = shadows;
var transitionProperty = {
  common: "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
  colors: "background-color, border-color, color, fill, stroke",
  dimensions: "width, height",
  position: "left, right, top, bottom",
  background: "background-color, background-image, background-position"
};
var transitionTimingFunction = {
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
};
var transitionDuration = {
  "ultra-fast": "50ms",
  faster: "100ms",
  fast: "150ms",
  normal: "200ms",
  slow: "300ms",
  slower: "400ms",
  "ultra-slow": "500ms"
};
var transition = {
  property: transitionProperty,
  easing: transitionTimingFunction,
  duration: transitionDuration
};
var transition_default = transition;
var blur = {
  none: 0,
  sm: "4px",
  base: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "40px",
  "3xl": "64px"
};
var blur_default = blur;
var borders = {
  none: 0,
  "1px": "1px solid",
  "2px": "2px solid",
  "4px": "4px solid",
  "8px": "8px solid"
};
var borders_default = borders;
var typography = {
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem"
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  },
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`
  },
  fontSizes: {
    "3xs": "0.45rem",
    "2xs": "0.625rem",
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem"
  }
};
var typography_default = typography;
var spacing = {
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem"
};
var largeSizes = {
  max: "max-content",
  min: "min-content",
  full: "100%",
  "3xs": "14rem",
  "2xs": "16rem",
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
  "8xl": "90rem",
  prose: "60ch"
};
var container = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px"
};
var sizes$m = {
  ...spacing,
  ...largeSizes,
  container
};
var sizes_default = sizes$m;
var foundations = {
  breakpoints: breakpoints_default,
  zIndices: z_index_default,
  radii: radius_default,
  blur: blur_default,
  colors: colors_default,
  ...typography_default,
  sizes: sizes_default,
  shadows: shadows_default,
  space: spacing,
  borders: borders_default,
  transition: transition_default
};
function anatomy(name, map = {}) {
  let called = false;
  function assert() {
    if (!called) {
      called = true;
      return;
    }
    throw new Error(
      "[anatomy] .part(...) should only be called once. Did you mean to use .extend(...) ?"
    );
  }
  function parts(...values) {
    assert();
    for (const part of values) {
      map[part] = toPart(part);
    }
    return anatomy(name, map);
  }
  function extend(...parts2) {
    for (const part of parts2) {
      if (part in map)
        continue;
      map[part] = toPart(part);
    }
    return anatomy(name, map);
  }
  function selectors() {
    const value = Object.fromEntries(
      Object.entries(map).map(([key, part]) => [key, part.selector])
    );
    return value;
  }
  function classnames() {
    const value = Object.fromEntries(
      Object.entries(map).map(([key, part]) => [key, part.className])
    );
    return value;
  }
  function toPart(part) {
    const el = ["container", "root"].includes(part != null ? part : "") ? [name] : [name, part];
    const attr = el.filter(Boolean).join("__");
    const className = `chakra-${attr}`;
    const partObj = {
      className,
      selector: `.${className}`,
      toString: () => part
    };
    return partObj;
  }
  const __type = {};
  return {
    parts,
    toPart,
    extend,
    selectors,
    classnames,
    get keys() {
      return Object.keys(map);
    },
    __type
  };
}
var accordionAnatomy = anatomy("accordion").parts("root", "container", "button", "panel").extend("icon");
var alertAnatomy = anatomy("alert").parts("title", "description", "container").extend("icon", "spinner");
var avatarAnatomy = anatomy("avatar").parts("label", "badge", "container").extend("excessLabel", "group");
var breadcrumbAnatomy = anatomy("breadcrumb").parts("link", "item", "container").extend("separator");
anatomy("button").parts();
var checkboxAnatomy = anatomy("checkbox").parts("control", "icon", "container").extend("label");
anatomy("progress").parts("track", "filledTrack").extend("label");
var drawerAnatomy = anatomy("drawer").parts("overlay", "dialogContainer", "dialog").extend("header", "closeButton", "body", "footer");
var editableAnatomy = anatomy("editable").parts(
  "preview",
  "input",
  "textarea"
);
var formAnatomy = anatomy("form").parts(
  "container",
  "requiredIndicator",
  "helperText"
);
var formErrorAnatomy = anatomy("formError").parts("text", "icon");
var inputAnatomy = anatomy("input").parts("addon", "field", "element");
var listAnatomy = anatomy("list").parts("container", "item", "icon");
var menuAnatomy = anatomy("menu").parts("button", "list", "item").extend("groupTitle", "command", "divider");
var modalAnatomy = anatomy("modal").parts("overlay", "dialogContainer", "dialog").extend("header", "closeButton", "body", "footer");
var numberInputAnatomy = anatomy("numberinput").parts(
  "root",
  "field",
  "stepperGroup",
  "stepper"
);
anatomy("pininput").parts("field");
var popoverAnatomy = anatomy("popover").parts("content", "header", "body", "footer").extend("popper", "arrow", "closeButton");
var progressAnatomy = anatomy("progress").parts(
  "label",
  "filledTrack",
  "track"
);
var radioAnatomy = anatomy("radio").parts(
  "container",
  "control",
  "label"
);
var selectAnatomy = anatomy("select").parts("field", "icon");
var sliderAnatomy = anatomy("slider").parts(
  "container",
  "track",
  "thumb",
  "filledTrack",
  "mark"
);
var statAnatomy = anatomy("stat").parts(
  "container",
  "label",
  "helpText",
  "number",
  "icon"
);
var switchAnatomy = anatomy("switch").parts(
  "container",
  "track",
  "thumb"
);
var tableAnatomy = anatomy("table").parts(
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "tfoot",
  "caption"
);
var tabsAnatomy = anatomy("tabs").parts(
  "root",
  "tab",
  "tablist",
  "tabpanel",
  "tabpanels",
  "indicator"
);
var tagAnatomy = anatomy("tag").parts(
  "container",
  "label",
  "closeButton"
);
var cardAnatomy = anatomy("card").parts(
  "container",
  "header",
  "body",
  "footer"
);
function guard(low, high, value) {
  return Math.min(Math.max(low, value), high);
}
class ColorError extends Error {
  constructor(color) {
    super(`Failed to parse color: "${color}"`);
  }
}
var ColorError$1 = ColorError;
function parseToRgba(color) {
  if (typeof color !== "string")
    throw new ColorError$1(color);
  if (color.trim().toLowerCase() === "transparent")
    return [0, 0, 0, 0];
  let normalizedColor = color.trim();
  normalizedColor = namedColorRegex.test(color) ? nameToHex(color) : color;
  const reducedHexMatch = reducedHexRegex.exec(normalizedColor);
  if (reducedHexMatch) {
    const arr = Array.from(reducedHexMatch).slice(1);
    return [...arr.slice(0, 3).map((x) => parseInt(r(x, 2), 16)), parseInt(r(arr[3] || "f", 2), 16) / 255];
  }
  const hexMatch = hexRegex.exec(normalizedColor);
  if (hexMatch) {
    const arr = Array.from(hexMatch).slice(1);
    return [...arr.slice(0, 3).map((x) => parseInt(x, 16)), parseInt(arr[3] || "ff", 16) / 255];
  }
  const rgbaMatch = rgbaRegex.exec(normalizedColor);
  if (rgbaMatch) {
    const arr = Array.from(rgbaMatch).slice(1);
    return [...arr.slice(0, 3).map((x) => parseInt(x, 10)), parseFloat(arr[3] || "1")];
  }
  const hslaMatch = hslaRegex.exec(normalizedColor);
  if (hslaMatch) {
    const [h, s, l, a] = Array.from(hslaMatch).slice(1).map(parseFloat);
    if (guard(0, 100, s) !== s)
      throw new ColorError$1(color);
    if (guard(0, 100, l) !== l)
      throw new ColorError$1(color);
    return [...hslToRgb(h, s, l), Number.isNaN(a) ? 1 : a];
  }
  throw new ColorError$1(color);
}
function hash(str) {
  let hash2 = 5381;
  let i = str.length;
  while (i) {
    hash2 = hash2 * 33 ^ str.charCodeAt(--i);
  }
  return (hash2 >>> 0) % 2341;
}
const colorToInt = (x) => parseInt(x.replace(/_/g, ""), 36);
const compressedColorMap = "1q29ehhb 1n09sgk7 1kl1ekf_ _yl4zsno 16z9eiv3 1p29lhp8 _bd9zg04 17u0____ _iw9zhe5 _to73___ _r45e31e _7l6g016 _jh8ouiv _zn3qba8 1jy4zshs 11u87k0u 1ro9yvyo 1aj3xael 1gz9zjz0 _3w8l4xo 1bf1ekf_ _ke3v___ _4rrkb__ 13j776yz _646mbhl _nrjr4__ _le6mbhl 1n37ehkb _m75f91n _qj3bzfz 1939yygw 11i5z6x8 _1k5f8xs 1509441m 15t5lwgf _ae2th1n _tg1ugcv 1lp1ugcv 16e14up_ _h55rw7n _ny9yavn _7a11xb_ 1ih442g9 _pv442g9 1mv16xof 14e6y7tu 1oo9zkds 17d1cisi _4v9y70f _y98m8kc 1019pq0v 12o9zda8 _348j4f4 1et50i2o _8epa8__ _ts6senj 1o350i2o 1mi9eiuo 1259yrp0 1ln80gnw _632xcoy 1cn9zldc _f29edu4 1n490c8q _9f9ziet 1b94vk74 _m49zkct 1kz6s73a 1eu9dtog _q58s1rz 1dy9sjiq __u89jo3 _aj5nkwg _ld89jo3 13h9z6wx _qa9z2ii _l119xgq _bs5arju 1hj4nwk9 1qt4nwk9 1ge6wau6 14j9zlcw 11p1edc_ _ms1zcxe _439shk6 _jt9y70f _754zsow 1la40eju _oq5p___ _x279qkz 1fa5r3rv _yd2d9ip _424tcku _8y1di2_ _zi2uabw _yy7rn9h 12yz980_ __39ljp6 1b59zg0x _n39zfzp 1fy9zest _b33k___ _hp9wq92 1il50hz4 _io472ub _lj9z3eo 19z9ykg0 _8t8iu3a 12b9bl4a 1ak5yw0o _896v4ku _tb8k8lv _s59zi6t _c09ze0p 1lg80oqn 1id9z8wb _238nba5 1kq6wgdi _154zssg _tn3zk49 _da9y6tc 1sg7cv4f _r12jvtt 1gq5fmkz 1cs9rvci _lp9jn1c _xw1tdnb 13f9zje6 16f6973h _vo7ir40 _bt5arjf _rc45e4t _hr4e100 10v4e100 _hc9zke2 _w91egv_ _sj2r1kk 13c87yx8 _vqpds__ _ni8ggk8 _tj9yqfb 1ia2j4r4 _7x9b10u 1fc9ld4j 1eq9zldr _5j9lhpx _ez9zl6o _md61fzm".split(" ").reduce((acc, next) => {
  const key = colorToInt(next.substring(0, 3));
  const hex = colorToInt(next.substring(3)).toString(16);
  let prefix = "";
  for (let i = 0; i < 6 - hex.length; i++) {
    prefix += "0";
  }
  acc[key] = `${prefix}${hex}`;
  return acc;
}, {});
function nameToHex(color) {
  const normalizedColorName = color.toLowerCase().trim();
  const result = compressedColorMap[hash(normalizedColorName)];
  if (!result)
    throw new ColorError$1(color);
  return `#${result}`;
}
const r = (str, amount) => Array.from(Array(amount)).map(() => str).join("");
const reducedHexRegex = new RegExp(`^#${r("([a-f0-9])", 3)}([a-f0-9])?$`, "i");
const hexRegex = new RegExp(`^#${r("([a-f0-9]{2})", 3)}([a-f0-9]{2})?$`, "i");
const rgbaRegex = new RegExp(`^rgba?\\(\\s*(\\d+)\\s*${r(",\\s*(\\d+)\\s*", 2)}(?:,\\s*([\\d.]+))?\\s*\\)$`, "i");
const hslaRegex = /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/i;
const namedColorRegex = /^[a-z]+$/i;
const roundColor = (color) => {
  return Math.round(color * 255);
};
const hslToRgb = (hue, saturation, lightness) => {
  let l = lightness / 100;
  if (saturation === 0) {
    return [l, l, l].map(roundColor);
  }
  const huePrime = (hue % 360 + 360) % 360 / 60;
  const chroma = (1 - Math.abs(2 * l - 1)) * (saturation / 100);
  const secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
  let red = 0;
  let green = 0;
  let blue = 0;
  if (huePrime >= 0 && huePrime < 1) {
    red = chroma;
    green = secondComponent;
  } else if (huePrime >= 1 && huePrime < 2) {
    red = secondComponent;
    green = chroma;
  } else if (huePrime >= 2 && huePrime < 3) {
    green = chroma;
    blue = secondComponent;
  } else if (huePrime >= 3 && huePrime < 4) {
    green = secondComponent;
    blue = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    red = secondComponent;
    blue = chroma;
  } else if (huePrime >= 5 && huePrime < 6) {
    red = chroma;
    blue = secondComponent;
  }
  const lightnessModification = l - chroma / 2;
  const finalRed = red + lightnessModification;
  const finalGreen = green + lightnessModification;
  const finalBlue = blue + lightnessModification;
  return [finalRed, finalGreen, finalBlue].map(roundColor);
};
function rgba(red, green, blue, alpha) {
  return `rgba(${guard(0, 255, red).toFixed()}, ${guard(0, 255, green).toFixed()}, ${guard(0, 255, blue).toFixed()}, ${parseFloat(guard(0, 1, alpha).toFixed(3))})`;
}
function transparentize$1(color, amount) {
  const [r2, g, b, a] = parseToRgba(color);
  return rgba(r2, g, b, a - amount);
}
function toHex(color) {
  const [r2, g, b, a] = parseToRgba(color);
  let hex = (x) => {
    const h = guard(0, 255, x).toString(16);
    return h.length === 1 ? `0${h}` : h;
  };
  return `#${hex(r2)}${hex(g)}${hex(b)}${a < 1 ? hex(Math.round(a * 255)) : ""}`;
}
function dlv_es_default(t2, e, l, n, r2) {
  for (e = e.split ? e.split(".") : e, n = 0; n < e.length; n++)
    t2 = t2 ? t2[e[n]] : r2;
  return t2 === r2 ? l : t2;
}
var isEmptyObject = (obj) => Object.keys(obj).length === 0;
var getColor = (theme2, color, fallback) => {
  const hex = dlv_es_default(theme2, `colors.${color}`, color);
  try {
    toHex(hex);
    return hex;
  } catch {
    return fallback != null ? fallback : "#000000";
  }
};
var getBrightness = (color) => {
  const [r2, g, b] = parseToRgba(color);
  return (r2 * 299 + g * 587 + b * 114) / 1e3;
};
var tone = (color) => (theme2) => {
  const hex = getColor(theme2, color);
  const brightness = getBrightness(hex);
  const isDark2 = brightness < 128;
  return isDark2 ? "dark" : "light";
};
var isDark = (color) => (theme2) => tone(color)(theme2) === "dark";
var transparentize = (color, opacity) => (theme2) => {
  const raw = getColor(theme2, color);
  return transparentize$1(raw, 1 - opacity);
};
function generateStripe(size2 = "1rem", color = "rgba(255, 255, 255, 0.15)") {
  return {
    backgroundImage: `linear-gradient(
    45deg,
    ${color} 25%,
    transparent 25%,
    transparent 50%,
    ${color} 50%,
    ${color} 75%,
    transparent 75%,
    transparent
  )`,
    backgroundSize: `${size2} ${size2}`
  };
}
var randomHex = () => `#${Math.floor(Math.random() * 16777215).toString(16).padEnd(6, "0")}`;
function randomColor(opts) {
  const fallback = randomHex();
  if (!opts || isEmptyObject(opts)) {
    return fallback;
  }
  if (opts.string && opts.colors) {
    return randomColorFromList(opts.string, opts.colors);
  }
  if (opts.string && !opts.colors) {
    return randomColorFromString(opts.string);
  }
  if (opts.colors && !opts.string) {
    return randomFromList(opts.colors);
  }
  return fallback;
}
function randomColorFromString(str) {
  let hash2 = 0;
  if (str.length === 0)
    return hash2.toString();
  for (let i = 0; i < str.length; i += 1) {
    hash2 = str.charCodeAt(i) + ((hash2 << 5) - hash2);
    hash2 = hash2 & hash2;
  }
  let color = "#";
  for (let j = 0; j < 3; j += 1) {
    const value = hash2 >> j * 8 & 255;
    color += `00${value.toString(16)}`.substr(-2);
  }
  return color;
}
function randomColorFromList(str, list) {
  let index2 = 0;
  if (str.length === 0)
    return list[0];
  for (let i = 0; i < str.length; i += 1) {
    index2 = str.charCodeAt(i) + ((index2 << 5) - index2);
    index2 = index2 & index2;
  }
  index2 = (index2 % list.length + list.length) % list.length;
  return list[index2];
}
function randomFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}
function mode(light, dark) {
  return (props) => props.colorMode === "dark" ? dark : light;
}
function orient$2(options) {
  const { orientation, vertical, horizontal } = options;
  if (!orientation)
    return {};
  return orientation === "vertical" ? vertical : horizontal;
}
function toRef(operand) {
  if (isObject(operand) && operand.reference) {
    return operand.reference;
  }
  return String(operand);
}
var toExpr = (operator, ...operands) => operands.map(toRef).join(` ${operator} `).replace(/calc/g, "");
var add = (...operands) => `calc(${toExpr("+", ...operands)})`;
var subtract$1 = (...operands) => `calc(${toExpr("-", ...operands)})`;
var multiply = (...operands) => `calc(${toExpr("*", ...operands)})`;
var divide = (...operands) => `calc(${toExpr("/", ...operands)})`;
var negate = (x) => {
  const value = toRef(x);
  if (value != null && !Number.isNaN(parseFloat(value))) {
    return String(value).startsWith("-") ? String(value).slice(1) : `-${value}`;
  }
  return multiply(value, -1);
};
var calc = Object.assign(
  (x) => ({
    add: (...operands) => calc(add(x, ...operands)),
    subtract: (...operands) => calc(subtract$1(x, ...operands)),
    multiply: (...operands) => calc(multiply(x, ...operands)),
    divide: (...operands) => calc(divide(x, ...operands)),
    negate: () => calc(negate(x)),
    toString: () => x.toString()
  }),
  {
    add,
    subtract: subtract$1,
    multiply,
    divide,
    negate
  }
);
function isDecimal(value) {
  return !Number.isInteger(parseFloat(value.toString()));
}
function replaceWhiteSpace(value, replaceValue = "-") {
  return value.replace(/\s+/g, replaceValue);
}
function escape(value) {
  const valueStr = replaceWhiteSpace(value.toString());
  if (valueStr.includes("\\."))
    return value;
  return isDecimal(value) ? valueStr.replace(".", `\\.`) : value;
}
function addPrefix(value, prefix = "") {
  return [prefix, escape(value)].filter(Boolean).join("-");
}
function toVarRef(name, fallback) {
  return `var(${escape(name)}${fallback ? `, ${fallback}` : ""})`;
}
function toVar(value, prefix = "") {
  return `--${addPrefix(value, prefix)}`;
}
function cssVar(name, options) {
  const cssVariable = toVar(name, options == null ? void 0 : options.prefix);
  return {
    variable: cssVariable,
    reference: toVarRef(cssVariable, getFallback(options == null ? void 0 : options.fallback))
  };
}
function getFallback(fallback) {
  if (typeof fallback === "string")
    return fallback;
  return fallback == null ? void 0 : fallback.reference;
}
var { defineMultiStyleConfig: defineMultiStyleConfig$o, definePartsStyle: definePartsStyle$o } = createMultiStyleConfigHelpers(switchAnatomy.keys);
var $width = cssVar("switch-track-width");
var $height = cssVar("switch-track-height");
var $diff = cssVar("switch-track-diff");
var diffValue = calc.subtract($width, $height);
var $translateX = cssVar("switch-thumb-x");
var $bg$e = cssVar("switch-bg");
var baseStyleTrack$2 = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    borderRadius: "full",
    p: "0.5",
    width: [$width.reference],
    height: [$height.reference],
    transitionProperty: "common",
    transitionDuration: "fast",
    [$bg$e.variable]: "colors.gray.300",
    _dark: {
      [$bg$e.variable]: "colors.whiteAlpha.400"
    },
    _focusVisible: {
      boxShadow: "outline"
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    },
    _checked: {
      [$bg$e.variable]: `colors.${c}.500`,
      _dark: {
        [$bg$e.variable]: `colors.${c}.200`
      }
    },
    bg: $bg$e.reference
  };
});
var baseStyleThumb$1 = defineStyle({
  bg: "white",
  transitionProperty: "transform",
  transitionDuration: "normal",
  borderRadius: "inherit",
  width: [$height.reference],
  height: [$height.reference],
  _checked: {
    transform: `translateX(${$translateX.reference})`
  }
});
var baseStyle$E = definePartsStyle$o((props) => ({
  container: {
    [$diff.variable]: diffValue,
    [$translateX.variable]: $diff.reference,
    _rtl: {
      [$translateX.variable]: calc($diff).negate().toString()
    }
  },
  track: baseStyleTrack$2(props),
  thumb: baseStyleThumb$1
}));
var sizes$l = {
  sm: definePartsStyle$o({
    container: {
      [$width.variable]: "1.375rem",
      [$height.variable]: "sizes.3"
    }
  }),
  md: definePartsStyle$o({
    container: {
      [$width.variable]: "1.875rem",
      [$height.variable]: "sizes.4"
    }
  }),
  lg: definePartsStyle$o({
    container: {
      [$width.variable]: "2.875rem",
      [$height.variable]: "sizes.6"
    }
  })
};
var switchTheme = defineMultiStyleConfig$o({
  baseStyle: baseStyle$E,
  sizes: sizes$l,
  defaultProps: {
    size: "md",
    colorScheme: "blue"
  }
});
var { defineMultiStyleConfig: defineMultiStyleConfig$n, definePartsStyle: definePartsStyle$n } = createMultiStyleConfigHelpers(tableAnatomy.keys);
var baseStyle$D = definePartsStyle$n({
  table: {
    fontVariantNumeric: "lining-nums tabular-nums",
    borderCollapse: "collapse",
    width: "full"
  },
  th: {
    fontFamily: "heading",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    textAlign: "start"
  },
  td: {
    textAlign: "start"
  },
  caption: {
    mt: 4,
    fontFamily: "heading",
    textAlign: "center",
    fontWeight: "medium"
  }
});
var numericStyles = defineStyle({
  "&[data-is-numeric=true]": {
    textAlign: "end"
  }
});
var variantSimple = definePartsStyle$n((props) => {
  const { colorScheme: c } = props;
  return {
    th: {
      color: mode("gray.600", "gray.400")(props),
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles
    },
    td: {
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles
    },
    caption: {
      color: mode("gray.600", "gray.100")(props)
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 }
        }
      }
    }
  };
});
var variantStripe = definePartsStyle$n((props) => {
  const { colorScheme: c } = props;
  return {
    th: {
      color: mode("gray.600", "gray.400")(props),
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles
    },
    td: {
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles
    },
    caption: {
      color: mode("gray.600", "gray.100")(props)
    },
    tbody: {
      tr: {
        "&:nth-of-type(odd)": {
          "th, td": {
            borderBottomWidth: "1px",
            borderColor: mode(`${c}.100`, `${c}.700`)(props)
          },
          td: {
            background: mode(`${c}.100`, `${c}.700`)(props)
          }
        }
      }
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 }
        }
      }
    }
  };
});
var variants$b = {
  simple: variantSimple,
  striped: variantStripe,
  unstyled: defineStyle({})
};
var sizes$k = {
  sm: definePartsStyle$n({
    th: {
      px: "4",
      py: "1",
      lineHeight: "4",
      fontSize: "xs"
    },
    td: {
      px: "4",
      py: "2",
      fontSize: "sm",
      lineHeight: "4"
    },
    caption: {
      px: "4",
      py: "2",
      fontSize: "xs"
    }
  }),
  md: definePartsStyle$n({
    th: {
      px: "6",
      py: "3",
      lineHeight: "4",
      fontSize: "xs"
    },
    td: {
      px: "6",
      py: "4",
      lineHeight: "5"
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "sm"
    }
  }),
  lg: definePartsStyle$n({
    th: {
      px: "8",
      py: "4",
      lineHeight: "5",
      fontSize: "sm"
    },
    td: {
      px: "8",
      py: "5",
      lineHeight: "6"
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "md"
    }
  })
};
var tableTheme = defineMultiStyleConfig$n({
  baseStyle: baseStyle$D,
  variants: variants$b,
  sizes: sizes$k,
  defaultProps: {
    variant: "simple",
    size: "md",
    colorScheme: "gray"
  }
});
var $fg$6 = cssVar$1("tabs-color");
var $bg$d = cssVar$1("tabs-bg");
var $border$3 = cssVar$1("tabs-border-color");
var { defineMultiStyleConfig: defineMultiStyleConfig$m, definePartsStyle: definePartsStyle$m } = createMultiStyleConfigHelpers(tabsAnatomy.keys);
var baseStyleRoot$1 = defineStyle((props) => {
  const { orientation } = props;
  return {
    display: orientation === "vertical" ? "flex" : "block"
  };
});
var baseStyleTab = defineStyle((props) => {
  const { isFitted } = props;
  return {
    flex: isFitted ? 1 : void 0,
    transitionProperty: "common",
    transitionDuration: "normal",
    _focusVisible: {
      zIndex: 1,
      boxShadow: "outline"
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.4
    }
  };
});
var baseStyleTablist = defineStyle((props) => {
  const { align = "start", orientation } = props;
  const alignments = {
    end: "flex-end",
    center: "center",
    start: "flex-start"
  };
  return {
    justifyContent: alignments[align],
    flexDirection: orientation === "vertical" ? "column" : "row"
  };
});
var baseStyleTabpanel = defineStyle({
  p: 4
});
var baseStyle$C = definePartsStyle$m((props) => ({
  root: baseStyleRoot$1(props),
  tab: baseStyleTab(props),
  tablist: baseStyleTablist(props),
  tabpanel: baseStyleTabpanel
}));
var sizes$j = {
  sm: definePartsStyle$m({
    tab: {
      py: 1,
      px: 4,
      fontSize: "sm"
    }
  }),
  md: definePartsStyle$m({
    tab: {
      fontSize: "md",
      py: 2,
      px: 4
    }
  }),
  lg: definePartsStyle$m({
    tab: {
      fontSize: "lg",
      py: 3,
      px: 4
    }
  })
};
var variantLine = definePartsStyle$m((props) => {
  const { colorScheme: c, orientation } = props;
  const isVertical = orientation === "vertical";
  const borderProp = orientation === "vertical" ? "borderStart" : "borderBottom";
  const marginProp = isVertical ? "marginStart" : "marginBottom";
  return {
    tablist: {
      [borderProp]: "2px solid",
      borderColor: "inherit"
    },
    tab: {
      [borderProp]: "2px solid",
      borderColor: "transparent",
      [marginProp]: "-2px",
      _selected: {
        [$fg$6.variable]: `colors.${c}.600`,
        _dark: {
          [$fg$6.variable]: `colors.${c}.300`
        },
        borderColor: "currentColor"
      },
      _active: {
        [$bg$d.variable]: "colors.gray.200",
        _dark: {
          [$bg$d.variable]: "colors.whiteAlpha.300"
        }
      },
      _disabled: {
        _active: { bg: "none" }
      },
      color: $fg$6.reference,
      bg: $bg$d.reference
    }
  };
});
var variantEnclosed = definePartsStyle$m((props) => {
  const { colorScheme: c } = props;
  return {
    tab: {
      borderTopRadius: "md",
      border: "1px solid",
      borderColor: "transparent",
      mb: "-1px",
      [$border$3.variable]: "transparent",
      _selected: {
        [$fg$6.variable]: `colors.${c}.600`,
        [$border$3.variable]: `colors.white`,
        _dark: {
          [$fg$6.variable]: `colors.${c}.300`,
          [$border$3.variable]: `colors.gray.800`
        },
        borderColor: "inherit",
        borderBottomColor: $border$3.reference
      },
      color: $fg$6.reference
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit"
    }
  };
});
var variantEnclosedColored = definePartsStyle$m((props) => {
  const { colorScheme: c } = props;
  return {
    tab: {
      border: "1px solid",
      borderColor: "inherit",
      [$bg$d.variable]: "colors.gray.50",
      _dark: {
        [$bg$d.variable]: "colors.whiteAlpha.50"
      },
      mb: "-1px",
      _notLast: {
        marginEnd: "-1px"
      },
      _selected: {
        [$bg$d.variable]: "colors.white",
        [$fg$6.variable]: `colors.${c}.600`,
        _dark: {
          [$bg$d.variable]: "colors.gray.800",
          [$fg$6.variable]: `colors.${c}.300`
        },
        borderColor: "inherit",
        borderTopColor: "currentColor",
        borderBottomColor: "transparent"
      },
      color: $fg$6.reference,
      bg: $bg$d.reference
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit"
    }
  };
});
var variantSoftRounded = definePartsStyle$m((props) => {
  const { colorScheme: c, theme: theme2 } = props;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: "gray.600",
      _selected: {
        color: getColor(theme2, `${c}.700`),
        bg: getColor(theme2, `${c}.100`)
      }
    }
  };
});
var variantSolidRounded = definePartsStyle$m((props) => {
  const { colorScheme: c } = props;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      [$fg$6.variable]: "colors.gray.600",
      _dark: {
        [$fg$6.variable]: "inherit"
      },
      _selected: {
        [$fg$6.variable]: "colors.white",
        [$bg$d.variable]: `colors.${c}.600`,
        _dark: {
          [$fg$6.variable]: "colors.gray.800",
          [$bg$d.variable]: `colors.${c}.300`
        }
      },
      color: $fg$6.reference,
      bg: $bg$d.reference
    }
  };
});
var variantUnstyled$2 = definePartsStyle$m({});
var variants$a = {
  line: variantLine,
  enclosed: variantEnclosed,
  "enclosed-colored": variantEnclosedColored,
  "soft-rounded": variantSoftRounded,
  "solid-rounded": variantSolidRounded,
  unstyled: variantUnstyled$2
};
var tabsTheme = defineMultiStyleConfig$m({
  baseStyle: baseStyle$C,
  sizes: sizes$j,
  variants: variants$a,
  defaultProps: {
    size: "md",
    variant: "line",
    colorScheme: "blue"
  }
});
var baseStyle$B = defineStyle({
  px: 1,
  textTransform: "uppercase",
  fontSize: "xs",
  borderRadius: "sm",
  fontWeight: "bold"
});
var $bg$c = cssVar$1("badge-bg");
var $fg$5 = cssVar$1("badge-color");
var variantSolid$3 = defineStyle((props) => {
  const { colorScheme: c, theme: theme2 } = props;
  const dark = transparentize(`${c}.500`, 0.6)(theme2);
  return {
    [$bg$c.variable]: `colors.${c}.500`,
    [$fg$5.variable]: `colors.white`,
    _dark: {
      [$bg$c.variable]: dark,
      [$fg$5.variable]: `colors.whiteAlpha.800`
    },
    bg: $bg$c.reference,
    color: $fg$5.reference
  };
});
var variantSubtle$1 = defineStyle((props) => {
  const { colorScheme: c, theme: theme2 } = props;
  const darkBg = transparentize(`${c}.200`, 0.16)(theme2);
  return {
    [$bg$c.variable]: `colors.${c}.100`,
    [$fg$5.variable]: `colors.${c}.800`,
    _dark: {
      [$bg$c.variable]: darkBg,
      [$fg$5.variable]: `colors.${c}.200`
    },
    bg: $bg$c.reference,
    color: $fg$5.reference
  };
});
var variantOutline$2 = defineStyle((props) => {
  const { colorScheme: c, theme: theme2 } = props;
  const darkColor = transparentize(`${c}.200`, 0.8)(theme2);
  return {
    [$fg$5.variable]: `colors.${c}.500`,
    _dark: {
      [$fg$5.variable]: darkColor
    },
    color: $fg$5.reference,
    boxShadow: `inset 0 0 0px 1px ${$fg$5.reference}`
  };
});
var variants$9 = {
  solid: variantSolid$3,
  subtle: variantSubtle$1,
  outline: variantOutline$2
};
var badgeTheme = defineStyleConfig({
  baseStyle: baseStyle$B,
  variants: variants$9,
  defaultProps: {
    variant: "subtle",
    colorScheme: "gray"
  }
});
var { defineMultiStyleConfig: defineMultiStyleConfig$l, definePartsStyle: definePartsStyle$l } = createMultiStyleConfigHelpers(tagAnatomy.keys);
var baseStyleContainer$4 = defineStyle({
  fontWeight: "medium",
  lineHeight: 1.2,
  outline: 0,
  borderRadius: "md",
  _focusVisible: {
    boxShadow: "outline"
  }
});
var baseStyleLabel$3 = defineStyle({
  lineHeight: 1.2,
  overflow: "visible"
});
var baseStyleCloseButton$3 = defineStyle({
  fontSize: "lg",
  w: "5",
  h: "5",
  transitionProperty: "common",
  transitionDuration: "normal",
  borderRadius: "full",
  marginStart: "1.5",
  marginEnd: "-1",
  opacity: 0.5,
  _disabled: {
    opacity: 0.4
  },
  _focusVisible: {
    boxShadow: "outline",
    bg: "rgba(0, 0, 0, 0.14)"
  },
  _hover: {
    opacity: 0.8
  },
  _active: {
    opacity: 1
  }
});
var baseStyle$A = definePartsStyle$l({
  container: baseStyleContainer$4,
  label: baseStyleLabel$3,
  closeButton: baseStyleCloseButton$3
});
var sizes$i = {
  sm: definePartsStyle$l({
    container: {
      minH: "5",
      minW: "5",
      fontSize: "xs",
      px: "2"
    },
    closeButton: {
      marginEnd: "-2px",
      marginStart: "0.35rem"
    }
  }),
  md: definePartsStyle$l({
    container: {
      minH: "6",
      minW: "6",
      fontSize: "sm",
      px: "2"
    }
  }),
  lg: definePartsStyle$l({
    container: {
      minH: "8",
      minW: "8",
      fontSize: "md",
      px: "3"
    }
  })
};
var variants$8 = {
  subtle: definePartsStyle$l((props) => {
    var _a4;
    return {
      container: (_a4 = badgeTheme.variants) == null ? void 0 : _a4.subtle(props)
    };
  }),
  solid: definePartsStyle$l((props) => {
    var _a4;
    return {
      container: (_a4 = badgeTheme.variants) == null ? void 0 : _a4.solid(props)
    };
  }),
  outline: definePartsStyle$l((props) => {
    var _a4;
    return {
      container: (_a4 = badgeTheme.variants) == null ? void 0 : _a4.outline(props)
    };
  })
};
var tagTheme = defineMultiStyleConfig$l({
  variants: variants$8,
  baseStyle: baseStyle$A,
  sizes: sizes$i,
  defaultProps: {
    size: "md",
    variant: "subtle",
    colorScheme: "gray"
  }
});
var { definePartsStyle: definePartsStyle$k, defineMultiStyleConfig: defineMultiStyleConfig$k } = createMultiStyleConfigHelpers(inputAnatomy.keys);
var baseStyle$z = definePartsStyle$k({
  field: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    }
  }
});
var size = {
  lg: defineStyle({
    fontSize: "lg",
    px: "4",
    h: "12",
    borderRadius: "md"
  }),
  md: defineStyle({
    fontSize: "md",
    px: "4",
    h: "10",
    borderRadius: "md"
  }),
  sm: defineStyle({
    fontSize: "sm",
    px: "3",
    h: "8",
    borderRadius: "sm"
  }),
  xs: defineStyle({
    fontSize: "xs",
    px: "2",
    h: "6",
    borderRadius: "sm"
  })
};
var sizes$h = {
  lg: definePartsStyle$k({
    field: size.lg,
    addon: size.lg
  }),
  md: definePartsStyle$k({
    field: size.md,
    addon: size.md
  }),
  sm: definePartsStyle$k({
    field: size.sm,
    addon: size.sm
  }),
  xs: definePartsStyle$k({
    field: size.xs,
    addon: size.xs
  })
};
function getDefaults(props) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props;
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props)
  };
}
var variantOutline$1 = definePartsStyle$k((props) => {
  const { theme: theme2 } = props;
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);
  return {
    field: {
      border: "1px solid",
      borderColor: "inherit",
      bg: "inherit",
      _hover: {
        borderColor: mode("gray.300", "whiteAlpha.400")(props)
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _invalid: {
        borderColor: getColor(theme2, ec),
        boxShadow: `0 0 0 1px ${getColor(theme2, ec)}`
      },
      _focusVisible: {
        zIndex: 1,
        borderColor: getColor(theme2, fc),
        boxShadow: `0 0 0 1px ${getColor(theme2, fc)}`
      }
    },
    addon: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props),
      bg: mode("gray.100", "whiteAlpha.300")(props)
    }
  };
});
var variantFilled = definePartsStyle$k((props) => {
  const { theme: theme2 } = props;
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);
  return {
    field: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
      _hover: {
        bg: mode("gray.200", "whiteAlpha.100")(props)
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _invalid: {
        borderColor: getColor(theme2, ec)
      },
      _focusVisible: {
        bg: "transparent",
        borderColor: getColor(theme2, fc)
      }
    },
    addon: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props)
    }
  };
});
var variantFlushed = definePartsStyle$k((props) => {
  const { theme: theme2 } = props;
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);
  return {
    field: {
      borderBottom: "1px solid",
      borderColor: "inherit",
      borderRadius: "0",
      px: "0",
      bg: "transparent",
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _invalid: {
        borderColor: getColor(theme2, ec),
        boxShadow: `0px 1px 0px 0px ${getColor(theme2, ec)}`
      },
      _focusVisible: {
        borderColor: getColor(theme2, fc),
        boxShadow: `0px 1px 0px 0px ${getColor(theme2, fc)}`
      }
    },
    addon: {
      borderBottom: "2px solid",
      borderColor: "inherit",
      borderRadius: "0",
      px: "0",
      bg: "transparent"
    }
  };
});
var variantUnstyled$1 = definePartsStyle$k({
  field: {
    bg: "transparent",
    px: "0",
    height: "auto"
  },
  addon: {
    bg: "transparent",
    px: "0",
    height: "auto"
  }
});
var variants$7 = {
  outline: variantOutline$1,
  filled: variantFilled,
  flushed: variantFlushed,
  unstyled: variantUnstyled$1
};
var inputTheme = defineMultiStyleConfig$k({
  baseStyle: baseStyle$z,
  sizes: sizes$h,
  variants: variants$7,
  defaultProps: {
    size: "md",
    variant: "outline"
  }
});
var _a$2;
var baseStyle$y = defineStyle({
  ...(_a$2 = inputTheme.baseStyle) == null ? void 0 : _a$2.field,
  paddingY: "2",
  minHeight: "20",
  lineHeight: "short",
  verticalAlign: "top"
});
var _a2$2, _b$2;
var variants$6 = {
  outline: defineStyle(
    (props) => {
      var _a4, _b3;
      return (_b3 = (_a4 = inputTheme.variants) == null ? void 0 : _a4.outline(props).field) != null ? _b3 : {};
    }
  ),
  flushed: defineStyle(
    (props) => {
      var _a4, _b3;
      return (_b3 = (_a4 = inputTheme.variants) == null ? void 0 : _a4.flushed(props).field) != null ? _b3 : {};
    }
  ),
  filled: defineStyle(
    (props) => {
      var _a4, _b3;
      return (_b3 = (_a4 = inputTheme.variants) == null ? void 0 : _a4.filled(props).field) != null ? _b3 : {};
    }
  ),
  unstyled: (_b$2 = (_a2$2 = inputTheme.variants) == null ? void 0 : _a2$2.unstyled.field) != null ? _b$2 : {}
};
var _a3, _b2, _c$1, _d$1, _e$1, _f$1, _g$1, _h$1;
var sizes$g = {
  xs: (_b2 = (_a3 = inputTheme.sizes) == null ? void 0 : _a3.xs.field) != null ? _b2 : {},
  sm: (_d$1 = (_c$1 = inputTheme.sizes) == null ? void 0 : _c$1.sm.field) != null ? _d$1 : {},
  md: (_f$1 = (_e$1 = inputTheme.sizes) == null ? void 0 : _e$1.md.field) != null ? _f$1 : {},
  lg: (_h$1 = (_g$1 = inputTheme.sizes) == null ? void 0 : _g$1.lg.field) != null ? _h$1 : {}
};
var textareaTheme = defineStyleConfig({
  baseStyle: baseStyle$y,
  sizes: sizes$g,
  variants: variants$6,
  defaultProps: {
    size: "md",
    variant: "outline"
  }
});
var $bg$b = cssVar("tooltip-bg");
var $fg$4 = cssVar("tooltip-fg");
var $arrowBg$1 = cssVar("popper-arrow-bg");
var baseStyle$x = defineStyle({
  bg: $bg$b.reference,
  color: $fg$4.reference,
  [$bg$b.variable]: "colors.gray.700",
  [$fg$4.variable]: "colors.whiteAlpha.900",
  _dark: {
    [$bg$b.variable]: "colors.gray.300",
    [$fg$4.variable]: "colors.gray.900"
  },
  [$arrowBg$1.variable]: $bg$b.reference,
  px: "2",
  py: "0.5",
  borderRadius: "sm",
  fontWeight: "medium",
  fontSize: "sm",
  boxShadow: "md",
  maxW: "xs",
  zIndex: "tooltip"
});
var tooltipTheme = defineStyleConfig({
  baseStyle: baseStyle$x
});
var { defineMultiStyleConfig: defineMultiStyleConfig$j, definePartsStyle: definePartsStyle$j } = createMultiStyleConfigHelpers(progressAnatomy.keys);
var filledStyle = defineStyle((props) => {
  const { colorScheme: c, theme: t2, isIndeterminate, hasStripe } = props;
  const stripeStyle = mode(
    generateStripe(),
    generateStripe("1rem", "rgba(0,0,0,0.1)")
  )(props);
  const bgColor = mode(`${c}.500`, `${c}.200`)(props);
  const gradient = `linear-gradient(
    to right,
    transparent 0%,
    ${getColor(t2, bgColor)} 50%,
    transparent 100%
  )`;
  const addStripe = !isIndeterminate && hasStripe;
  return {
    ...addStripe && stripeStyle,
    ...isIndeterminate ? { bgImage: gradient } : { bgColor }
  };
});
var baseStyleLabel$2 = defineStyle({
  lineHeight: "1",
  fontSize: "0.25em",
  fontWeight: "bold",
  color: "white"
});
var baseStyleTrack$1 = defineStyle((props) => {
  return {
    bg: mode("gray.100", "whiteAlpha.300")(props)
  };
});
var baseStyleFilledTrack$1 = defineStyle((props) => {
  return {
    transitionProperty: "common",
    transitionDuration: "slow",
    ...filledStyle(props)
  };
});
var baseStyle$w = definePartsStyle$j((props) => ({
  label: baseStyleLabel$2,
  filledTrack: baseStyleFilledTrack$1(props),
  track: baseStyleTrack$1(props)
}));
var sizes$f = {
  xs: definePartsStyle$j({
    track: { h: "1" }
  }),
  sm: definePartsStyle$j({
    track: { h: "2" }
  }),
  md: definePartsStyle$j({
    track: { h: "3" }
  }),
  lg: definePartsStyle$j({
    track: { h: "4" }
  })
};
var progressTheme = defineMultiStyleConfig$j({
  sizes: sizes$f,
  baseStyle: baseStyle$w,
  defaultProps: {
    size: "md",
    colorScheme: "blue"
  }
});
var isFunction = (value) => typeof value === "function";
function runIfFn(valueOrFn, ...args) {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}
var { definePartsStyle: definePartsStyle$i, defineMultiStyleConfig: defineMultiStyleConfig$i } = createMultiStyleConfigHelpers(checkboxAnatomy.keys);
var $size$2 = cssVar$1("checkbox-size");
var baseStyleControl$1 = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    w: $size$2.reference,
    h: $size$2.reference,
    transitionProperty: "box-shadow",
    transitionDuration: "normal",
    border: "2px solid",
    borderRadius: "sm",
    borderColor: "inherit",
    color: "white",
    _checked: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      borderColor: mode(`${c}.500`, `${c}.200`)(props),
      color: mode("white", "gray.900")(props),
      _hover: {
        bg: mode(`${c}.600`, `${c}.300`)(props),
        borderColor: mode(`${c}.600`, `${c}.300`)(props)
      },
      _disabled: {
        borderColor: mode("gray.200", "transparent")(props),
        bg: mode("gray.200", "whiteAlpha.300")(props),
        color: mode("gray.500", "whiteAlpha.500")(props)
      }
    },
    _indeterminate: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      borderColor: mode(`${c}.500`, `${c}.200`)(props),
      color: mode("white", "gray.900")(props)
    },
    _disabled: {
      bg: mode("gray.100", "whiteAlpha.100")(props),
      borderColor: mode("gray.100", "transparent")(props)
    },
    _focusVisible: {
      boxShadow: "outline"
    },
    _invalid: {
      borderColor: mode("red.500", "red.300")(props)
    }
  };
});
var baseStyleContainer$3 = defineStyle({
  _disabled: { cursor: "not-allowed" }
});
var baseStyleLabel$1 = defineStyle({
  userSelect: "none",
  _disabled: { opacity: 0.4 }
});
var baseStyleIcon$5 = defineStyle({
  transitionProperty: "transform",
  transitionDuration: "normal"
});
var baseStyle$v = definePartsStyle$i((props) => ({
  icon: baseStyleIcon$5,
  container: baseStyleContainer$3,
  control: runIfFn(baseStyleControl$1, props),
  label: baseStyleLabel$1
}));
var sizes$e = {
  sm: definePartsStyle$i({
    control: { [$size$2.variable]: "sizes.3" },
    label: { fontSize: "sm" },
    icon: { fontSize: "3xs" }
  }),
  md: definePartsStyle$i({
    control: { [$size$2.variable]: "sizes.4" },
    label: { fontSize: "md" },
    icon: { fontSize: "2xs" }
  }),
  lg: definePartsStyle$i({
    control: { [$size$2.variable]: "sizes.5" },
    label: { fontSize: "lg" },
    icon: { fontSize: "2xs" }
  })
};
var checkboxTheme = defineMultiStyleConfig$i({
  baseStyle: baseStyle$v,
  sizes: sizes$e,
  defaultProps: {
    size: "md",
    colorScheme: "blue"
  }
});
var { defineMultiStyleConfig: defineMultiStyleConfig$h, definePartsStyle: definePartsStyle$h } = createMultiStyleConfigHelpers(radioAnatomy.keys);
var baseStyleControl = defineStyle((props) => {
  var _a4;
  const controlStyle = (_a4 = runIfFn(checkboxTheme.baseStyle, props)) == null ? void 0 : _a4.control;
  return {
    ...controlStyle,
    borderRadius: "full",
    _checked: {
      ...controlStyle == null ? void 0 : controlStyle["_checked"],
      _before: {
        content: `""`,
        display: "inline-block",
        pos: "relative",
        w: "50%",
        h: "50%",
        borderRadius: "50%",
        bg: "currentColor"
      }
    }
  };
});
var baseStyle$u = definePartsStyle$h((props) => {
  var _a4, _b3, _c2, _d2;
  return {
    label: (_b3 = (_a4 = checkboxTheme).baseStyle) == null ? void 0 : _b3.call(_a4, props).label,
    container: (_d2 = (_c2 = checkboxTheme).baseStyle) == null ? void 0 : _d2.call(_c2, props).container,
    control: baseStyleControl(props)
  };
});
var sizes$d = {
  md: definePartsStyle$h({
    control: { w: "4", h: "4" },
    label: { fontSize: "md" }
  }),
  lg: definePartsStyle$h({
    control: { w: "5", h: "5" },
    label: { fontSize: "lg" }
  }),
  sm: definePartsStyle$h({
    control: { width: "3", height: "3" },
    label: { fontSize: "sm" }
  })
};
var radioTheme = defineMultiStyleConfig$h({
  baseStyle: baseStyle$u,
  sizes: sizes$d,
  defaultProps: {
    size: "md",
    colorScheme: "blue"
  }
});
var { defineMultiStyleConfig: defineMultiStyleConfig$g, definePartsStyle: definePartsStyle$g } = createMultiStyleConfigHelpers(selectAnatomy.keys);
var $bg$a = cssVar$1("select-bg");
var _a$1;
var baseStyleField$1 = defineStyle({
  ...(_a$1 = inputTheme.baseStyle) == null ? void 0 : _a$1.field,
  appearance: "none",
  paddingBottom: "1px",
  lineHeight: "normal",
  bg: $bg$a.reference,
  [$bg$a.variable]: "colors.white",
  _dark: {
    [$bg$a.variable]: "colors.gray.700"
  },
  "> option, > optgroup": {
    bg: $bg$a.reference
  }
});
var baseStyleIcon$4 = defineStyle({
  width: "6",
  height: "100%",
  insetEnd: "2",
  position: "relative",
  color: "currentColor",
  fontSize: "xl",
  _disabled: {
    opacity: 0.5
  }
});
var baseStyle$t = definePartsStyle$g({
  field: baseStyleField$1,
  icon: baseStyleIcon$4
});
var iconSpacing = defineStyle({
  paddingInlineEnd: "8"
});
var _a2$1, _b$1, _c, _d, _e, _f, _g, _h;
var sizes$c = {
  lg: {
    ...(_a2$1 = inputTheme.sizes) == null ? void 0 : _a2$1.lg,
    field: {
      ...(_b$1 = inputTheme.sizes) == null ? void 0 : _b$1.lg.field,
      ...iconSpacing
    }
  },
  md: {
    ...(_c = inputTheme.sizes) == null ? void 0 : _c.md,
    field: {
      ...(_d = inputTheme.sizes) == null ? void 0 : _d.md.field,
      ...iconSpacing
    }
  },
  sm: {
    ...(_e = inputTheme.sizes) == null ? void 0 : _e.sm,
    field: {
      ...(_f = inputTheme.sizes) == null ? void 0 : _f.sm.field,
      ...iconSpacing
    }
  },
  xs: {
    ...(_g = inputTheme.sizes) == null ? void 0 : _g.xs,
    field: {
      ...(_h = inputTheme.sizes) == null ? void 0 : _h.xs.field,
      ...iconSpacing
    },
    icon: {
      insetEnd: "1"
    }
  }
};
var selectTheme = defineMultiStyleConfig$g({
  baseStyle: baseStyle$t,
  sizes: sizes$c,
  variants: inputTheme.variants,
  defaultProps: inputTheme.defaultProps
});
var $startColor = cssVar$1("skeleton-start-color");
var $endColor = cssVar$1("skeleton-end-color");
var baseStyle$s = defineStyle({
  [$startColor.variable]: "colors.gray.100",
  [$endColor.variable]: "colors.gray.400",
  _dark: {
    [$startColor.variable]: "colors.gray.800",
    [$endColor.variable]: "colors.gray.600"
  },
  background: $startColor.reference,
  borderColor: $endColor.reference,
  opacity: 0.7,
  borderRadius: "sm"
});
var skeletonTheme = defineStyleConfig({
  baseStyle: baseStyle$s
});
var $bg$9 = cssVar$1("skip-link-bg");
var baseStyle$r = defineStyle({
  borderRadius: "md",
  fontWeight: "semibold",
  _focusVisible: {
    boxShadow: "outline",
    padding: "4",
    position: "fixed",
    top: "6",
    insetStart: "6",
    [$bg$9.variable]: "colors.white",
    _dark: {
      [$bg$9.variable]: "colors.gray.700"
    },
    bg: $bg$9.reference
  }
});
var skipLinkTheme = defineStyleConfig({
  baseStyle: baseStyle$r
});
var { defineMultiStyleConfig: defineMultiStyleConfig$f, definePartsStyle: definePartsStyle$f } = createMultiStyleConfigHelpers(sliderAnatomy.keys);
var $thumbSize = cssVar$1("slider-thumb-size");
var $trackSize = cssVar$1("slider-track-size");
var $bg$8 = cssVar$1("slider-bg");
var baseStyleContainer$2 = defineStyle((props) => {
  const { orientation } = props;
  return {
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    _disabled: {
      opacity: 0.6,
      cursor: "default",
      pointerEvents: "none"
    },
    ...orient$2({
      orientation,
      vertical: { h: "100%" },
      horizontal: { w: "100%" }
    })
  };
});
var baseStyleTrack = defineStyle((props) => {
  const orientationStyles = orient$2({
    orientation: props.orientation,
    horizontal: { h: $trackSize.reference },
    vertical: { w: $trackSize.reference }
  });
  return {
    ...orientationStyles,
    overflow: "hidden",
    borderRadius: "sm",
    [$bg$8.variable]: "colors.gray.200",
    _dark: {
      [$bg$8.variable]: "colors.whiteAlpha.200"
    },
    _disabled: {
      [$bg$8.variable]: "colors.gray.300",
      _dark: {
        [$bg$8.variable]: "colors.whiteAlpha.300"
      }
    },
    bg: $bg$8.reference
  };
});
var baseStyleThumb = defineStyle((props) => {
  const { orientation } = props;
  const orientationStyle = orient$2({
    orientation,
    vertical: {
      left: "50%",
      transform: `translateX(-50%)`,
      _active: {
        transform: `translateX(-50%) scale(1.15)`
      }
    },
    horizontal: {
      top: "50%",
      transform: `translateY(-50%)`,
      _active: {
        transform: `translateY(-50%) scale(1.15)`
      }
    }
  });
  return {
    ...orientationStyle,
    w: $thumbSize.reference,
    h: $thumbSize.reference,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    outline: 0,
    zIndex: 1,
    borderRadius: "full",
    bg: "white",
    boxShadow: "base",
    border: "1px solid",
    borderColor: "transparent",
    transitionProperty: "transform",
    transitionDuration: "normal",
    _focusVisible: {
      boxShadow: "outline"
    },
    _disabled: {
      bg: "gray.300"
    }
  };
});
var baseStyleFilledTrack = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    width: "inherit",
    height: "inherit",
    [$bg$8.variable]: `colors.${c}.500`,
    _dark: {
      [$bg$8.variable]: `colors.${c}.200`
    },
    bg: $bg$8.reference
  };
});
var baseStyle$q = definePartsStyle$f((props) => ({
  container: baseStyleContainer$2(props),
  track: baseStyleTrack(props),
  thumb: baseStyleThumb(props),
  filledTrack: baseStyleFilledTrack(props)
}));
var sizeLg = definePartsStyle$f({
  container: {
    [$thumbSize.variable]: `sizes.4`,
    [$trackSize.variable]: `sizes.1`
  }
});
var sizeMd = definePartsStyle$f({
  container: {
    [$thumbSize.variable]: `sizes.3.5`,
    [$trackSize.variable]: `sizes.1`
  }
});
var sizeSm = definePartsStyle$f({
  container: {
    [$thumbSize.variable]: `sizes.2.5`,
    [$trackSize.variable]: `sizes.0.5`
  }
});
var sizes$b = {
  lg: sizeLg,
  md: sizeMd,
  sm: sizeSm
};
var sliderTheme = defineMultiStyleConfig$f({
  baseStyle: baseStyle$q,
  sizes: sizes$b,
  defaultProps: {
    size: "md",
    colorScheme: "blue"
  }
});
var $size$1 = cssVar("spinner-size");
var baseStyle$p = defineStyle({
  width: [$size$1.reference],
  height: [$size$1.reference]
});
var sizes$a = {
  xs: defineStyle({
    [$size$1.variable]: "sizes.3"
  }),
  sm: defineStyle({
    [$size$1.variable]: "sizes.4"
  }),
  md: defineStyle({
    [$size$1.variable]: "sizes.6"
  }),
  lg: defineStyle({
    [$size$1.variable]: "sizes.8"
  }),
  xl: defineStyle({
    [$size$1.variable]: "sizes.12"
  })
};
var spinnerTheme = defineStyleConfig({
  baseStyle: baseStyle$p,
  sizes: sizes$a,
  defaultProps: {
    size: "md"
  }
});
var { defineMultiStyleConfig: defineMultiStyleConfig$e, definePartsStyle: definePartsStyle$e } = createMultiStyleConfigHelpers(statAnatomy.keys);
var baseStyleLabel = defineStyle({
  fontWeight: "medium"
});
var baseStyleHelpText = defineStyle({
  opacity: 0.8,
  marginBottom: "2"
});
var baseStyleNumber = defineStyle({
  verticalAlign: "baseline",
  fontWeight: "semibold"
});
var baseStyleIcon$3 = defineStyle({
  marginEnd: 1,
  w: "3.5",
  h: "3.5",
  verticalAlign: "middle"
});
var baseStyle$o = definePartsStyle$e({
  container: {},
  label: baseStyleLabel,
  helpText: baseStyleHelpText,
  number: baseStyleNumber,
  icon: baseStyleIcon$3
});
var sizes$9 = {
  md: definePartsStyle$e({
    label: { fontSize: "sm" },
    helpText: { fontSize: "sm" },
    number: { fontSize: "2xl" }
  })
};
var statTheme = defineMultiStyleConfig$e({
  baseStyle: baseStyle$o,
  sizes: sizes$9,
  defaultProps: {
    size: "md"
  }
});
var $bg$7 = cssVar$1("kbd-bg");
var baseStyle$n = defineStyle({
  [$bg$7.variable]: "colors.gray.100",
  _dark: {
    [$bg$7.variable]: "colors.whiteAlpha.100"
  },
  bg: $bg$7.reference,
  borderRadius: "md",
  borderWidth: "1px",
  borderBottomWidth: "3px",
  fontSize: "0.8em",
  fontWeight: "bold",
  lineHeight: "normal",
  px: "0.4em",
  whiteSpace: "nowrap"
});
var kbdTheme = defineStyleConfig({
  baseStyle: baseStyle$n
});
var baseStyle$m = defineStyle({
  transitionProperty: "common",
  transitionDuration: "fast",
  transitionTimingFunction: "ease-out",
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  color: "inherit",
  _hover: {
    textDecoration: "underline"
  },
  _focusVisible: {
    boxShadow: "outline"
  }
});
var linkTheme = defineStyleConfig({
  baseStyle: baseStyle$m
});
var { defineMultiStyleConfig: defineMultiStyleConfig$d, definePartsStyle: definePartsStyle$d } = createMultiStyleConfigHelpers(listAnatomy.keys);
var baseStyleIcon$2 = defineStyle({
  marginEnd: "2",
  display: "inline",
  verticalAlign: "text-bottom"
});
var baseStyle$l = definePartsStyle$d({
  icon: baseStyleIcon$2
});
var listTheme = defineMultiStyleConfig$d({
  baseStyle: baseStyle$l
});
var { defineMultiStyleConfig: defineMultiStyleConfig$c, definePartsStyle: definePartsStyle$c } = createMultiStyleConfigHelpers(menuAnatomy.keys);
var $bg$6 = cssVar$1("menu-bg");
var $shadow$1 = cssVar$1("menu-shadow");
var baseStyleList = defineStyle({
  [$bg$6.variable]: "#fff",
  [$shadow$1.variable]: "shadows.sm",
  _dark: {
    [$bg$6.variable]: "colors.gray.700",
    [$shadow$1.variable]: "shadows.dark-lg"
  },
  color: "inherit",
  minW: "3xs",
  py: "2",
  zIndex: 1,
  borderRadius: "md",
  borderWidth: "1px",
  bg: $bg$6.reference,
  boxShadow: $shadow$1.reference
});
var baseStyleItem = defineStyle({
  py: "1.5",
  px: "3",
  transitionProperty: "background",
  transitionDuration: "ultra-fast",
  transitionTimingFunction: "ease-in",
  _focus: {
    [$bg$6.variable]: "colors.gray.100",
    _dark: {
      [$bg$6.variable]: "colors.whiteAlpha.100"
    }
  },
  _active: {
    [$bg$6.variable]: "colors.gray.200",
    _dark: {
      [$bg$6.variable]: "colors.whiteAlpha.200"
    }
  },
  _expanded: {
    [$bg$6.variable]: "colors.gray.100",
    _dark: {
      [$bg$6.variable]: "colors.whiteAlpha.100"
    }
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed"
  },
  bg: $bg$6.reference
});
var baseStyleGroupTitle = defineStyle({
  mx: 4,
  my: 2,
  fontWeight: "semibold",
  fontSize: "sm"
});
var baseStyleCommand = defineStyle({
  opacity: 0.6
});
var baseStyleDivider = defineStyle({
  border: 0,
  borderBottom: "1px solid",
  borderColor: "inherit",
  my: "2",
  opacity: 0.6
});
var baseStyleButton$1 = defineStyle({
  transitionProperty: "common",
  transitionDuration: "normal"
});
var baseStyle$k = definePartsStyle$c({
  button: baseStyleButton$1,
  list: baseStyleList,
  item: baseStyleItem,
  groupTitle: baseStyleGroupTitle,
  command: baseStyleCommand,
  divider: baseStyleDivider
});
var menuTheme = defineMultiStyleConfig$c({
  baseStyle: baseStyle$k
});
var { defineMultiStyleConfig: defineMultiStyleConfig$b, definePartsStyle: definePartsStyle$b } = createMultiStyleConfigHelpers(modalAnatomy.keys);
var baseStyleOverlay$1 = defineStyle({
  bg: "blackAlpha.600",
  zIndex: "modal"
});
var baseStyleDialogContainer$1 = defineStyle((props) => {
  const { isCentered, scrollBehavior } = props;
  return {
    display: "flex",
    zIndex: "modal",
    justifyContent: "center",
    alignItems: isCentered ? "center" : "flex-start",
    overflow: scrollBehavior === "inside" ? "hidden" : "auto",
    overscrollBehaviorY: "none"
  };
});
var baseStyleDialog$1 = defineStyle((props) => {
  const { scrollBehavior } = props;
  return {
    borderRadius: "md",
    bg: mode("white", "gray.700")(props),
    color: "inherit",
    my: "16",
    zIndex: "modal",
    maxH: scrollBehavior === "inside" ? "calc(100% - 7.5rem)" : void 0,
    boxShadow: mode("lg", "dark-lg")(props)
  };
});
var baseStyleHeader$2 = defineStyle({
  px: "6",
  py: "4",
  fontSize: "xl",
  fontWeight: "semibold"
});
var baseStyleCloseButton$2 = defineStyle({
  position: "absolute",
  top: "2",
  insetEnd: "3"
});
var baseStyleBody$2 = defineStyle((props) => {
  const { scrollBehavior } = props;
  return {
    px: "6",
    py: "2",
    flex: "1",
    overflow: scrollBehavior === "inside" ? "auto" : void 0
  };
});
var baseStyleFooter$2 = defineStyle({
  px: "6",
  py: "4"
});
var baseStyle$j = definePartsStyle$b((props) => ({
  overlay: baseStyleOverlay$1,
  dialogContainer: runIfFn(baseStyleDialogContainer$1, props),
  dialog: runIfFn(baseStyleDialog$1, props),
  header: baseStyleHeader$2,
  closeButton: baseStyleCloseButton$2,
  body: runIfFn(baseStyleBody$2, props),
  footer: baseStyleFooter$2
}));
function getSize$3(value) {
  if (value === "full") {
    return definePartsStyle$b({
      dialog: {
        maxW: "100vw",
        minH: "$100vh",
        my: "0",
        borderRadius: "0"
      }
    });
  }
  return definePartsStyle$b({
    dialog: { maxW: value }
  });
}
var sizes$8 = {
  xs: getSize$3("xs"),
  sm: getSize$3("sm"),
  md: getSize$3("md"),
  lg: getSize$3("lg"),
  xl: getSize$3("xl"),
  "2xl": getSize$3("2xl"),
  "3xl": getSize$3("3xl"),
  "4xl": getSize$3("4xl"),
  "5xl": getSize$3("5xl"),
  "6xl": getSize$3("6xl"),
  full: getSize$3("full")
};
var modalTheme = defineMultiStyleConfig$b({
  baseStyle: baseStyle$j,
  sizes: sizes$8,
  defaultProps: { size: "md" }
});
var { defineMultiStyleConfig: defineMultiStyleConfig$a, definePartsStyle: definePartsStyle$a } = createMultiStyleConfigHelpers(numberInputAnatomy.keys);
var $stepperWidth = cssVar("number-input-stepper-width");
var $inputPadding = cssVar("number-input-input-padding");
var inputPaddingValue = calc($stepperWidth).add("0.5rem").toString();
var $bg$5 = cssVar("number-input-bg");
var $fg$3 = cssVar("number-input-color");
var $border$2 = cssVar("number-input-border-color");
var baseStyleRoot = defineStyle({
  [$stepperWidth.variable]: "sizes.6",
  [$inputPadding.variable]: inputPaddingValue
});
var baseStyleField = defineStyle(
  (props) => {
    var _a4, _b3;
    return (_b3 = (_a4 = runIfFn(inputTheme.baseStyle, props)) == null ? void 0 : _a4.field) != null ? _b3 : {};
  }
);
var baseStyleStepperGroup = defineStyle({
  width: $stepperWidth.reference
});
var baseStyleStepper = defineStyle({
  borderStart: "1px solid",
  borderStartColor: $border$2.reference,
  color: $fg$3.reference,
  bg: $bg$5.reference,
  [$fg$3.variable]: "colors.chakra-body-text",
  [$border$2.variable]: "colors.chakra-border-color",
  _dark: {
    [$fg$3.variable]: "colors.whiteAlpha.800",
    [$border$2.variable]: "colors.whiteAlpha.300"
  },
  _active: {
    [$bg$5.variable]: "colors.gray.200",
    _dark: {
      [$bg$5.variable]: "colors.whiteAlpha.300"
    }
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed"
  }
});
var baseStyle$i = definePartsStyle$a((props) => {
  var _a4;
  return {
    root: baseStyleRoot,
    field: (_a4 = runIfFn(baseStyleField, props)) != null ? _a4 : {},
    stepperGroup: baseStyleStepperGroup,
    stepper: baseStyleStepper
  };
});
function getSize$2(size2) {
  var _a4, _b3, _c2;
  const sizeStyle = (_a4 = inputTheme.sizes) == null ? void 0 : _a4[size2];
  const radius = {
    lg: "md",
    md: "md",
    sm: "sm",
    xs: "sm"
  };
  const _fontSize = (_c2 = (_b3 = sizeStyle.field) == null ? void 0 : _b3.fontSize) != null ? _c2 : "md";
  const fontSize = typography_default.fontSizes[_fontSize];
  return definePartsStyle$a({
    field: {
      ...sizeStyle.field,
      paddingInlineEnd: $inputPadding.reference,
      verticalAlign: "top"
    },
    stepper: {
      fontSize: calc(fontSize).multiply(0.75).toString(),
      _first: {
        borderTopEndRadius: radius[size2]
      },
      _last: {
        borderBottomEndRadius: radius[size2],
        mt: "-1px",
        borderTopWidth: 1
      }
    }
  });
}
var sizes$7 = {
  xs: getSize$2("xs"),
  sm: getSize$2("sm"),
  md: getSize$2("md"),
  lg: getSize$2("lg")
};
var numberInputTheme = defineMultiStyleConfig$a({
  baseStyle: baseStyle$i,
  sizes: sizes$7,
  variants: inputTheme.variants,
  defaultProps: inputTheme.defaultProps
});
var _a;
var baseStyle$h = defineStyle({
  ...(_a = inputTheme.baseStyle) == null ? void 0 : _a.field,
  textAlign: "center"
});
var sizes$6 = {
  lg: defineStyle({
    fontSize: "lg",
    w: 12,
    h: 12,
    borderRadius: "md"
  }),
  md: defineStyle({
    fontSize: "md",
    w: 10,
    h: 10,
    borderRadius: "md"
  }),
  sm: defineStyle({
    fontSize: "sm",
    w: 8,
    h: 8,
    borderRadius: "sm"
  }),
  xs: defineStyle({
    fontSize: "xs",
    w: 6,
    h: 6,
    borderRadius: "sm"
  })
};
var _a2, _b;
var variants$5 = {
  outline: defineStyle(
    (props) => {
      var _a32, _b22, _c2;
      return (_c2 = (_b22 = runIfFn((_a32 = inputTheme.variants) == null ? void 0 : _a32.outline, props)) == null ? void 0 : _b22.field) != null ? _c2 : {};
    }
  ),
  flushed: defineStyle(
    (props) => {
      var _a32, _b22, _c2;
      return (_c2 = (_b22 = runIfFn((_a32 = inputTheme.variants) == null ? void 0 : _a32.flushed, props)) == null ? void 0 : _b22.field) != null ? _c2 : {};
    }
  ),
  filled: defineStyle(
    (props) => {
      var _a32, _b22, _c2;
      return (_c2 = (_b22 = runIfFn((_a32 = inputTheme.variants) == null ? void 0 : _a32.filled, props)) == null ? void 0 : _b22.field) != null ? _c2 : {};
    }
  ),
  unstyled: (_b = (_a2 = inputTheme.variants) == null ? void 0 : _a2.unstyled.field) != null ? _b : {}
};
var pinInputTheme = defineStyleConfig({
  baseStyle: baseStyle$h,
  sizes: sizes$6,
  variants: variants$5,
  defaultProps: inputTheme.defaultProps
});
var { defineMultiStyleConfig: defineMultiStyleConfig$9, definePartsStyle: definePartsStyle$9 } = createMultiStyleConfigHelpers(popoverAnatomy.keys);
var $popperBg = cssVar("popper-bg");
var $arrowBg = cssVar("popper-arrow-bg");
var $arrowShadowColor = cssVar("popper-arrow-shadow-color");
var baseStylePopper = defineStyle({ zIndex: 10 });
var baseStyleContent = defineStyle({
  [$popperBg.variable]: `colors.white`,
  bg: $popperBg.reference,
  [$arrowBg.variable]: $popperBg.reference,
  [$arrowShadowColor.variable]: `colors.gray.200`,
  _dark: {
    [$popperBg.variable]: `colors.gray.700`,
    [$arrowShadowColor.variable]: `colors.whiteAlpha.300`
  },
  width: "xs",
  border: "1px solid",
  borderColor: "inherit",
  borderRadius: "md",
  boxShadow: "sm",
  zIndex: "inherit",
  _focusVisible: {
    outline: 0,
    boxShadow: "outline"
  }
});
var baseStyleHeader$1 = defineStyle({
  px: 3,
  py: 2,
  borderBottomWidth: "1px"
});
var baseStyleBody$1 = defineStyle({
  px: 3,
  py: 2
});
var baseStyleFooter$1 = defineStyle({
  px: 3,
  py: 2,
  borderTopWidth: "1px"
});
var baseStyleCloseButton$1 = defineStyle({
  position: "absolute",
  borderRadius: "md",
  top: 1,
  insetEnd: 2,
  padding: 2
});
var baseStyle$g = definePartsStyle$9({
  popper: baseStylePopper,
  content: baseStyleContent,
  header: baseStyleHeader$1,
  body: baseStyleBody$1,
  footer: baseStyleFooter$1,
  closeButton: baseStyleCloseButton$1
});
var popoverTheme = defineMultiStyleConfig$9({
  baseStyle: baseStyle$g
});
var { definePartsStyle: definePartsStyle$8, defineMultiStyleConfig: defineMultiStyleConfig$8 } = createMultiStyleConfigHelpers(drawerAnatomy.keys);
var $bg$4 = cssVar$1("drawer-bg");
var $bs = cssVar$1("drawer-box-shadow");
function getSize$1(value) {
  if (value === "full") {
    return definePartsStyle$8({
      dialog: { maxW: "100vw", h: "100vh" }
    });
  }
  return definePartsStyle$8({
    dialog: { maxW: value }
  });
}
var baseStyleOverlay = defineStyle({
  bg: "blackAlpha.600",
  zIndex: "overlay"
});
var baseStyleDialogContainer = defineStyle({
  display: "flex",
  zIndex: "modal",
  justifyContent: "center"
});
var baseStyleDialog = defineStyle((props) => {
  const { isFullHeight } = props;
  return {
    ...isFullHeight && { height: "100vh" },
    zIndex: "modal",
    maxH: "100vh",
    color: "inherit",
    [$bg$4.variable]: "colors.white",
    [$bs.variable]: "shadows.lg",
    _dark: {
      [$bg$4.variable]: "colors.gray.700",
      [$bs.variable]: "shadows.dark-lg"
    },
    bg: $bg$4.reference,
    boxShadow: $bs.reference
  };
});
var baseStyleHeader = defineStyle({
  px: "6",
  py: "4",
  fontSize: "xl",
  fontWeight: "semibold"
});
var baseStyleCloseButton = defineStyle({
  position: "absolute",
  top: "2",
  insetEnd: "3"
});
var baseStyleBody = defineStyle({
  px: "6",
  py: "2",
  flex: "1",
  overflow: "auto"
});
var baseStyleFooter = defineStyle({
  px: "6",
  py: "4"
});
var baseStyle$f = definePartsStyle$8((props) => ({
  overlay: baseStyleOverlay,
  dialogContainer: baseStyleDialogContainer,
  dialog: runIfFn(baseStyleDialog, props),
  header: baseStyleHeader,
  closeButton: baseStyleCloseButton,
  body: baseStyleBody,
  footer: baseStyleFooter
}));
var sizes$5 = {
  xs: getSize$1("xs"),
  sm: getSize$1("md"),
  md: getSize$1("lg"),
  lg: getSize$1("2xl"),
  xl: getSize$1("4xl"),
  full: getSize$1("full")
};
var drawerTheme = defineMultiStyleConfig$8({
  baseStyle: baseStyle$f,
  sizes: sizes$5,
  defaultProps: {
    size: "xs"
  }
});
var { definePartsStyle: definePartsStyle$7, defineMultiStyleConfig: defineMultiStyleConfig$7 } = createMultiStyleConfigHelpers(editableAnatomy.keys);
var baseStylePreview = defineStyle({
  borderRadius: "md",
  py: "1",
  transitionProperty: "common",
  transitionDuration: "normal"
});
var baseStyleInput = defineStyle({
  borderRadius: "md",
  py: "1",
  transitionProperty: "common",
  transitionDuration: "normal",
  width: "full",
  _focusVisible: { boxShadow: "outline" },
  _placeholder: { opacity: 0.6 }
});
var baseStyleTextarea = defineStyle({
  borderRadius: "md",
  py: "1",
  transitionProperty: "common",
  transitionDuration: "normal",
  width: "full",
  _focusVisible: { boxShadow: "outline" },
  _placeholder: { opacity: 0.6 }
});
var baseStyle$e = definePartsStyle$7({
  preview: baseStylePreview,
  input: baseStyleInput,
  textarea: baseStyleTextarea
});
var editableTheme = defineMultiStyleConfig$7({
  baseStyle: baseStyle$e
});
var { definePartsStyle: definePartsStyle$6, defineMultiStyleConfig: defineMultiStyleConfig$6 } = createMultiStyleConfigHelpers(formAnatomy.keys);
var $fg$2 = cssVar$1("form-control-color");
var baseStyleRequiredIndicator = defineStyle({
  marginStart: "1",
  [$fg$2.variable]: "colors.red.500",
  _dark: {
    [$fg$2.variable]: "colors.red.300"
  },
  color: $fg$2.reference
});
var baseStyleHelperText = defineStyle({
  mt: "2",
  [$fg$2.variable]: "colors.gray.600",
  _dark: {
    [$fg$2.variable]: "colors.whiteAlpha.600"
  },
  color: $fg$2.reference,
  lineHeight: "normal",
  fontSize: "sm"
});
var baseStyle$d = definePartsStyle$6({
  container: {
    width: "100%",
    position: "relative"
  },
  requiredIndicator: baseStyleRequiredIndicator,
  helperText: baseStyleHelperText
});
var formTheme = defineMultiStyleConfig$6({
  baseStyle: baseStyle$d
});
var { definePartsStyle: definePartsStyle$5, defineMultiStyleConfig: defineMultiStyleConfig$5 } = createMultiStyleConfigHelpers(formErrorAnatomy.keys);
var $fg$1 = cssVar$1("form-error-color");
var baseStyleText = defineStyle({
  [$fg$1.variable]: `colors.red.500`,
  _dark: {
    [$fg$1.variable]: `colors.red.300`
  },
  color: $fg$1.reference,
  mt: "2",
  fontSize: "sm",
  lineHeight: "normal"
});
var baseStyleIcon$1 = defineStyle({
  marginEnd: "0.5em",
  [$fg$1.variable]: `colors.red.500`,
  _dark: {
    [$fg$1.variable]: `colors.red.300`
  },
  color: $fg$1.reference
});
var baseStyle$c = definePartsStyle$5({
  text: baseStyleText,
  icon: baseStyleIcon$1
});
var formErrorTheme = defineMultiStyleConfig$5({
  baseStyle: baseStyle$c
});
var baseStyle$b = defineStyle({
  fontSize: "md",
  marginEnd: "3",
  mb: "2",
  fontWeight: "medium",
  transitionProperty: "common",
  transitionDuration: "normal",
  opacity: 1,
  _disabled: {
    opacity: 0.4
  }
});
var formLabelTheme = defineStyleConfig({
  baseStyle: baseStyle$b
});
var baseStyle$a = defineStyle({
  fontFamily: "heading",
  fontWeight: "bold"
});
var sizes$4 = {
  "4xl": defineStyle({
    fontSize: ["6xl", null, "7xl"],
    lineHeight: 1
  }),
  "3xl": defineStyle({
    fontSize: ["5xl", null, "6xl"],
    lineHeight: 1
  }),
  "2xl": defineStyle({
    fontSize: ["4xl", null, "5xl"],
    lineHeight: [1.2, null, 1]
  }),
  xl: defineStyle({
    fontSize: ["3xl", null, "4xl"],
    lineHeight: [1.33, null, 1.2]
  }),
  lg: defineStyle({
    fontSize: ["2xl", null, "3xl"],
    lineHeight: [1.33, null, 1.2]
  }),
  md: defineStyle({
    fontSize: "xl",
    lineHeight: 1.2
  }),
  sm: defineStyle({
    fontSize: "md",
    lineHeight: 1.2
  }),
  xs: defineStyle({
    fontSize: "sm",
    lineHeight: 1.2
  })
};
var headingTheme = defineStyleConfig({
  baseStyle: baseStyle$a,
  sizes: sizes$4,
  defaultProps: {
    size: "xl"
  }
});
var { defineMultiStyleConfig: defineMultiStyleConfig$4, definePartsStyle: definePartsStyle$4 } = createMultiStyleConfigHelpers(breadcrumbAnatomy.keys);
var baseStyleLink = defineStyle({
  transitionProperty: "common",
  transitionDuration: "fast",
  transitionTimingFunction: "ease-out",
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  color: "inherit",
  _hover: {
    textDecoration: "underline"
  },
  _focusVisible: {
    boxShadow: "outline"
  }
});
var baseStyle$9 = definePartsStyle$4({
  link: baseStyleLink
});
var breadcrumbTheme = defineMultiStyleConfig$4({
  baseStyle: baseStyle$9
});
var baseStyle$8 = defineStyle({
  lineHeight: "1.2",
  borderRadius: "md",
  fontWeight: "semibold",
  transitionProperty: "common",
  transitionDuration: "normal",
  _focusVisible: {
    boxShadow: "outline"
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none"
  },
  _hover: {
    _disabled: {
      bg: "initial"
    }
  }
});
var variantGhost = defineStyle((props) => {
  const { colorScheme: c, theme: theme2 } = props;
  if (c === "gray") {
    return {
      color: mode(`inherit`, `whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.100`, `whiteAlpha.200`)(props)
      },
      _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) }
    };
  }
  const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme2);
  const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme2);
  return {
    color: mode(`${c}.600`, `${c}.200`)(props),
    bg: "transparent",
    _hover: {
      bg: mode(`${c}.50`, darkHoverBg)(props)
    },
    _active: {
      bg: mode(`${c}.100`, darkActiveBg)(props)
    }
  };
});
var variantOutline = defineStyle((props) => {
  const { colorScheme: c } = props;
  const borderColor = mode(`gray.200`, `whiteAlpha.300`)(props);
  return {
    border: "1px solid",
    borderColor: c === "gray" ? borderColor : "currentColor",
    ".chakra-button__group[data-attached][data-orientation=horizontal] > &:not(:last-of-type)": { marginEnd: "-1px" },
    ".chakra-button__group[data-attached][data-orientation=vertical] > &:not(:last-of-type)": { marginBottom: "-1px" },
    ...runIfFn(variantGhost, props)
  };
});
var accessibleColorMap = {
  yellow: {
    bg: "yellow.400",
    color: "black",
    hoverBg: "yellow.500",
    activeBg: "yellow.600"
  },
  cyan: {
    bg: "cyan.400",
    color: "black",
    hoverBg: "cyan.500",
    activeBg: "cyan.600"
  }
};
var variantSolid$2 = defineStyle((props) => {
  var _a4;
  const { colorScheme: c } = props;
  if (c === "gray") {
    const bg2 = mode(`gray.100`, `whiteAlpha.200`)(props);
    return {
      bg: bg2,
      _hover: {
        bg: mode(`gray.200`, `whiteAlpha.300`)(props),
        _disabled: {
          bg: bg2
        }
      },
      _active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) }
    };
  }
  const {
    bg = `${c}.500`,
    color = "white",
    hoverBg = `${c}.600`,
    activeBg = `${c}.700`
  } = (_a4 = accessibleColorMap[c]) != null ? _a4 : {};
  const background = mode(bg, `${c}.200`)(props);
  return {
    bg: background,
    color: mode(color, `gray.800`)(props),
    _hover: {
      bg: mode(hoverBg, `${c}.300`)(props),
      _disabled: {
        bg: background
      }
    },
    _active: { bg: mode(activeBg, `${c}.400`)(props) }
  };
});
var variantLink = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    verticalAlign: "baseline",
    color: mode(`${c}.500`, `${c}.200`)(props),
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none"
      }
    },
    _active: {
      color: mode(`${c}.700`, `${c}.500`)(props)
    }
  };
});
var variantUnstyled = defineStyle({
  bg: "none",
  color: "inherit",
  display: "inline",
  lineHeight: "inherit",
  m: "0",
  p: "0"
});
var variants$4 = {
  ghost: variantGhost,
  outline: variantOutline,
  solid: variantSolid$2,
  link: variantLink,
  unstyled: variantUnstyled
};
var sizes$3 = {
  lg: defineStyle({
    h: "12",
    minW: "12",
    fontSize: "lg",
    px: "6"
  }),
  md: defineStyle({
    h: "10",
    minW: "10",
    fontSize: "md",
    px: "4"
  }),
  sm: defineStyle({
    h: "8",
    minW: "8",
    fontSize: "sm",
    px: "3"
  }),
  xs: defineStyle({
    h: "6",
    minW: "6",
    fontSize: "xs",
    px: "2"
  })
};
var buttonTheme = defineStyleConfig({
  baseStyle: baseStyle$8,
  variants: variants$4,
  sizes: sizes$3,
  defaultProps: {
    variant: "solid",
    size: "md",
    colorScheme: "gray"
  }
});
var { definePartsStyle: definePartsStyle$3, defineMultiStyleConfig: defineMultiStyleConfig$3 } = createMultiStyleConfigHelpers(cardAnatomy.keys);
var $bg$3 = cssVar$1("card-bg");
var $padding = cssVar$1("card-padding");
var $shadow = cssVar$1("card-shadow");
var $radius = cssVar$1("card-radius");
var $border$1 = cssVar$1("card-border-width", "0");
var $borderColor = cssVar$1("card-border-color");
var baseStyle$7 = definePartsStyle$3({
  container: {
    [$bg$3.variable]: "colors.chakra-body-bg",
    backgroundColor: $bg$3.reference,
    boxShadow: $shadow.reference,
    borderRadius: $radius.reference,
    color: "chakra-body-text",
    borderWidth: $border$1.reference,
    borderColor: $borderColor.reference
  },
  body: {
    padding: $padding.reference,
    flex: "1 1 0%"
  },
  header: {
    padding: $padding.reference
  },
  footer: {
    padding: $padding.reference
  }
});
var sizes$2 = {
  sm: definePartsStyle$3({
    container: {
      [$radius.variable]: "radii.base",
      [$padding.variable]: "space.3"
    }
  }),
  md: definePartsStyle$3({
    container: {
      [$radius.variable]: "radii.md",
      [$padding.variable]: "space.5"
    }
  }),
  lg: definePartsStyle$3({
    container: {
      [$radius.variable]: "radii.xl",
      [$padding.variable]: "space.7"
    }
  })
};
var variants$3 = {
  elevated: definePartsStyle$3({
    container: {
      [$shadow.variable]: "shadows.base",
      _dark: {
        [$bg$3.variable]: "colors.gray.700"
      }
    }
  }),
  outline: definePartsStyle$3({
    container: {
      [$border$1.variable]: "1px",
      [$borderColor.variable]: "colors.chakra-border-color"
    }
  }),
  filled: definePartsStyle$3({
    container: {
      [$bg$3.variable]: "colors.chakra-subtle-bg"
    }
  }),
  unstyled: {
    body: {
      [$padding.variable]: 0
    },
    header: {
      [$padding.variable]: 0
    },
    footer: {
      [$padding.variable]: 0
    }
  }
};
var cardTheme = defineMultiStyleConfig$3({
  baseStyle: baseStyle$7,
  variants: variants$3,
  sizes: sizes$2,
  defaultProps: {
    variant: "elevated",
    size: "md"
  }
});
var $size = cssVar("close-button-size");
var $bg$2 = cssVar("close-button-bg");
var baseStyle$6 = defineStyle({
  w: [$size.reference],
  h: [$size.reference],
  borderRadius: "md",
  transitionProperty: "common",
  transitionDuration: "normal",
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none"
  },
  _hover: {
    [$bg$2.variable]: "colors.blackAlpha.100",
    _dark: {
      [$bg$2.variable]: "colors.whiteAlpha.100"
    }
  },
  _active: {
    [$bg$2.variable]: "colors.blackAlpha.200",
    _dark: {
      [$bg$2.variable]: "colors.whiteAlpha.200"
    }
  },
  _focusVisible: {
    boxShadow: "outline"
  },
  bg: $bg$2.reference
});
var sizes$1 = {
  lg: defineStyle({
    [$size.variable]: "sizes.10",
    fontSize: "md"
  }),
  md: defineStyle({
    [$size.variable]: "sizes.8",
    fontSize: "xs"
  }),
  sm: defineStyle({
    [$size.variable]: "sizes.6",
    fontSize: "2xs"
  })
};
var closeButtonTheme = defineStyleConfig({
  baseStyle: baseStyle$6,
  sizes: sizes$1,
  defaultProps: {
    size: "md"
  }
});
var { variants: variants$2, defaultProps } = badgeTheme;
var baseStyle$5 = defineStyle({
  fontFamily: "mono",
  fontSize: "sm",
  px: "0.2em",
  borderRadius: "sm"
});
var codeTheme = defineStyleConfig({
  baseStyle: baseStyle$5,
  variants: variants$2,
  defaultProps
});
var baseStyle$4 = defineStyle({
  w: "100%",
  mx: "auto",
  maxW: "prose",
  px: "4"
});
var containerTheme = defineStyleConfig({
  baseStyle: baseStyle$4
});
var baseStyle$3 = defineStyle({
  opacity: 0.6,
  borderColor: "inherit"
});
var variantSolid$1 = defineStyle({
  borderStyle: "solid"
});
var variantDashed = defineStyle({
  borderStyle: "dashed"
});
var variants$1 = {
  solid: variantSolid$1,
  dashed: variantDashed
};
var dividerTheme = defineStyleConfig({
  baseStyle: baseStyle$3,
  variants: variants$1,
  defaultProps: {
    variant: "solid"
  }
});
var { definePartsStyle: definePartsStyle$2, defineMultiStyleConfig: defineMultiStyleConfig$2 } = createMultiStyleConfigHelpers(accordionAnatomy.keys);
var baseStyleContainer$1 = defineStyle({
  borderTopWidth: "1px",
  borderColor: "inherit",
  _last: {
    borderBottomWidth: "1px"
  }
});
var baseStyleButton = defineStyle({
  transitionProperty: "common",
  transitionDuration: "normal",
  fontSize: "md",
  _focusVisible: {
    boxShadow: "outline"
  },
  _hover: {
    bg: "blackAlpha.50"
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed"
  },
  px: "4",
  py: "2"
});
var baseStylePanel = defineStyle({
  pt: "2",
  px: "4",
  pb: "5"
});
var baseStyleIcon = defineStyle({
  fontSize: "1.25em"
});
var baseStyle$2 = definePartsStyle$2({
  container: baseStyleContainer$1,
  button: baseStyleButton,
  panel: baseStylePanel,
  icon: baseStyleIcon
});
var accordionTheme = defineMultiStyleConfig$2({ baseStyle: baseStyle$2 });
var { definePartsStyle: definePartsStyle$1, defineMultiStyleConfig: defineMultiStyleConfig$1 } = createMultiStyleConfigHelpers(alertAnatomy.keys);
var $fg = cssVar$1("alert-fg");
var $bg$1 = cssVar$1("alert-bg");
var baseStyle$1 = definePartsStyle$1({
  container: {
    bg: $bg$1.reference,
    px: "4",
    py: "3"
  },
  title: {
    fontWeight: "bold",
    lineHeight: "6",
    marginEnd: "2"
  },
  description: {
    lineHeight: "6"
  },
  icon: {
    color: $fg.reference,
    flexShrink: 0,
    marginEnd: "3",
    w: "5",
    h: "6"
  },
  spinner: {
    color: $fg.reference,
    flexShrink: 0,
    marginEnd: "3",
    w: "5",
    h: "5"
  }
});
function getBg(props) {
  const { theme: theme2, colorScheme: c } = props;
  const darkBg = transparentize(`${c}.200`, 0.16)(theme2);
  return {
    light: `colors.${c}.100`,
    dark: darkBg
  };
}
var variantSubtle = definePartsStyle$1((props) => {
  const { colorScheme: c } = props;
  const bg = getBg(props);
  return {
    container: {
      [$fg.variable]: `colors.${c}.500`,
      [$bg$1.variable]: bg.light,
      _dark: {
        [$fg.variable]: `colors.${c}.200`,
        [$bg$1.variable]: bg.dark
      }
    }
  };
});
var variantLeftAccent = definePartsStyle$1((props) => {
  const { colorScheme: c } = props;
  const bg = getBg(props);
  return {
    container: {
      [$fg.variable]: `colors.${c}.500`,
      [$bg$1.variable]: bg.light,
      _dark: {
        [$fg.variable]: `colors.${c}.200`,
        [$bg$1.variable]: bg.dark
      },
      paddingStart: "3",
      borderStartWidth: "4px",
      borderStartColor: $fg.reference
    }
  };
});
var variantTopAccent = definePartsStyle$1((props) => {
  const { colorScheme: c } = props;
  const bg = getBg(props);
  return {
    container: {
      [$fg.variable]: `colors.${c}.500`,
      [$bg$1.variable]: bg.light,
      _dark: {
        [$fg.variable]: `colors.${c}.200`,
        [$bg$1.variable]: bg.dark
      },
      pt: "2",
      borderTopWidth: "4px",
      borderTopColor: $fg.reference
    }
  };
});
var variantSolid = definePartsStyle$1((props) => {
  const { colorScheme: c } = props;
  return {
    container: {
      [$fg.variable]: `colors.white`,
      [$bg$1.variable]: `colors.${c}.500`,
      _dark: {
        [$fg.variable]: `colors.gray.900`,
        [$bg$1.variable]: `colors.${c}.200`
      },
      color: $fg.reference
    }
  };
});
var variants = {
  subtle: variantSubtle,
  "left-accent": variantLeftAccent,
  "top-accent": variantTopAccent,
  solid: variantSolid
};
var alertTheme = defineMultiStyleConfig$1({
  baseStyle: baseStyle$1,
  variants,
  defaultProps: {
    variant: "subtle",
    colorScheme: "blue"
  }
});
var { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(avatarAnatomy.keys);
var $border = cssVar$1("avatar-border-color");
var $bg = cssVar$1("avatar-bg");
var baseStyleBadge = defineStyle({
  borderRadius: "full",
  border: "0.2em solid",
  [$border.variable]: "white",
  _dark: {
    [$border.variable]: "colors.gray.800"
  },
  borderColor: $border.reference
});
var baseStyleExcessLabel = defineStyle({
  [$bg.variable]: "colors.gray.200",
  _dark: {
    [$bg.variable]: "colors.whiteAlpha.400"
  },
  bgColor: $bg.reference
});
var $avatarBg = cssVar$1("avatar-background");
var baseStyleContainer = defineStyle((props) => {
  const { name, theme: theme2 } = props;
  const bg = name ? randomColor({ string: name }) : "colors.gray.400";
  const isBgDark = isDark(bg)(theme2);
  let color = "white";
  if (!isBgDark)
    color = "gray.800";
  return {
    bg: $avatarBg.reference,
    "&:not([data-loaded])": {
      [$avatarBg.variable]: bg
    },
    color,
    [$border.variable]: "colors.white",
    _dark: {
      [$border.variable]: "colors.gray.800"
    },
    borderColor: $border.reference,
    verticalAlign: "top"
  };
});
var baseStyle = definePartsStyle((props) => ({
  badge: runIfFn(baseStyleBadge, props),
  excessLabel: runIfFn(baseStyleExcessLabel, props),
  container: runIfFn(baseStyleContainer, props)
}));
function getSize(size2) {
  const themeSize = size2 !== "100%" ? sizes_default[size2] : void 0;
  return definePartsStyle({
    container: {
      width: size2,
      height: size2,
      fontSize: `calc(${themeSize != null ? themeSize : size2} / 2.5)`
    },
    excessLabel: {
      width: size2,
      height: size2
    },
    label: {
      fontSize: `calc(${themeSize != null ? themeSize : size2} / 2.5)`,
      lineHeight: size2 !== "100%" ? themeSize != null ? themeSize : size2 : void 0
    }
  });
}
var sizes = {
  "2xs": getSize(4),
  xs: getSize(6),
  sm: getSize(8),
  md: getSize(12),
  lg: getSize(16),
  xl: getSize(24),
  "2xl": getSize(32),
  full: getSize("100%")
};
var avatarTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: { size: "md" }
});
var components = {
  Accordion: accordionTheme,
  Alert: alertTheme,
  Avatar: avatarTheme,
  Badge: badgeTheme,
  Breadcrumb: breadcrumbTheme,
  Button: buttonTheme,
  Checkbox: checkboxTheme,
  CloseButton: closeButtonTheme,
  Code: codeTheme,
  Container: containerTheme,
  Divider: dividerTheme,
  Drawer: drawerTheme,
  Editable: editableTheme,
  Form: formTheme,
  FormError: formErrorTheme,
  FormLabel: formLabelTheme,
  Heading: headingTheme,
  Input: inputTheme,
  Kbd: kbdTheme,
  Link: linkTheme,
  List: listTheme,
  Menu: menuTheme,
  Modal: modalTheme,
  NumberInput: numberInputTheme,
  PinInput: pinInputTheme,
  Popover: popoverTheme,
  Progress: progressTheme,
  Radio: radioTheme,
  Select: selectTheme,
  Skeleton: skeletonTheme,
  SkipLink: skipLinkTheme,
  Slider: sliderTheme,
  Spinner: spinnerTheme,
  Stat: statTheme,
  Switch: switchTheme,
  Table: tableTheme,
  Tabs: tabsTheme,
  Tag: tagTheme,
  Textarea: textareaTheme,
  Tooltip: tooltipTheme,
  Card: cardTheme
};
var semanticTokens = {
  colors: {
    "chakra-body-text": { _light: "gray.800", _dark: "whiteAlpha.900" },
    "chakra-body-bg": { _light: "white", _dark: "gray.800" },
    "chakra-border-color": { _light: "gray.200", _dark: "whiteAlpha.300" },
    "chakra-subtle-bg": { _light: "gray.100", _dark: "gray.700" },
    "chakra-placeholder-color": { _light: "gray.500", _dark: "whiteAlpha.400" }
  }
};
var styles = {
  global: {
    body: {
      fontFamily: "body",
      color: "chakra-body-text",
      bg: "chakra-body-bg",
      transitionProperty: "background-color",
      transitionDuration: "normal",
      lineHeight: "base"
    },
    "*::placeholder": {
      color: "chakra-placeholder-color"
    },
    "*, *::before, &::after": {
      borderColor: "chakra-border-color",
      wordWrap: "break-word"
    }
  }
};
var direction = "ltr";
var config = {
  useSystemColorMode: false,
  initialColorMode: "light",
  cssVarPrefix: "chakra"
};
var theme = {
  semanticTokens,
  direction,
  ...foundations,
  components,
  styles,
  config
};
({
  semanticTokens,
  direction,
  components: {},
  ...foundations,
  styles,
  config
});
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
    process: (frameData) => {
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
          callback(frameData);
          if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame2();
          }
        }
      }
      isProcessing2 = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData);
      }
    }
  };
  return step;
}
const maxElapsed = 40;
let useDefaultElapsed = true;
let runNextFrame = false;
let isProcessing = false;
const frame = {
  delta: 0,
  timestamp: 0
};
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
stepsOrder.reduce((acc, key) => {
  acc[key] = () => steps[key].process(frame);
  return acc;
}, {});
const processStep = (stepId) => steps[stepId].process(frame);
const processFrame = (timestamp) => {
  runNextFrame = false;
  frame.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
  frame.timestamp = timestamp;
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
const getFrameData = () => frame;
function createContext(options = {}) {
  const {
    strict = true,
    errorMessage = "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
    name
  } = options;
  const Context = react.exports.createContext(void 0);
  Context.displayName = name;
  function useContext() {
    var _a4;
    const context = react.exports.useContext(Context);
    if (!context && strict) {
      const error = new Error(errorMessage);
      error.name = "ContextError";
      (_a4 = Error.captureStackTrace) == null ? void 0 : _a4.call(Error, error, useContext);
      throw error;
    }
    return context;
  }
  return [
    Context.Provider,
    useContext,
    Context
  ];
}
function ThemeProvider(props) {
  const { cssVarsRoot, theme: theme2, children } = props;
  const computedTheme = react.exports.useMemo(() => toCSSVar(theme2), [theme2]);
  return /* @__PURE__ */ jsxs(ThemeProvider$1, { theme: computedTheme, children: [
    /* @__PURE__ */ jsx(CSSVars, { root: cssVarsRoot }),
    children
  ] });
}
function CSSVars({ root = ":host, :root" }) {
  const selector = [root, `[data-theme]`].join(",");
  return /* @__PURE__ */ jsx(Global, { styles: (theme2) => ({ [selector]: theme2.__cssVars }) });
}
createContext({
  name: "StylesContext",
  errorMessage: "useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` "
});
function useUpdateEffect(callback, deps) {
  const renderCycleRef = react.exports.useRef(false);
  const effectCycleRef = react.exports.useRef(false);
  react.exports.useEffect(() => {
    const mounted = renderCycleRef.current;
    const run = mounted && effectCycleRef.current;
    if (run) {
      return callback();
    }
    effectCycleRef.current = true;
  }, deps);
  react.exports.useEffect(() => {
    renderCycleRef.current = true;
    return () => {
      renderCycleRef.current = false;
    };
  }, []);
}
function useControllableState(props) {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    shouldUpdate = (prev, next) => prev !== next
  } = props;
  const onChangeProp = useCallbackRef(onChange);
  const shouldUpdateProp = useCallbackRef(shouldUpdate);
  const [uncontrolledState, setUncontrolledState] = react.exports.useState(defaultValue);
  const controlled = valueProp !== void 0;
  const value = controlled ? valueProp : uncontrolledState;
  const setValue = useCallbackRef(
    (next) => {
      const setter = next;
      const nextValue = typeof next === "function" ? setter(value) : next;
      if (!shouldUpdateProp(value, nextValue)) {
        return;
      }
      if (!controlled) {
        setUncontrolledState(nextValue);
      }
      onChangeProp(nextValue);
    },
    [controlled, onChangeProp, value, shouldUpdateProp]
  );
  return [value, setValue];
}
function toNumber(value) {
  const num = parseFloat(value);
  return typeof num !== "number" || Number.isNaN(num) ? 0 : num;
}
function toPrecision(value, precision) {
  let nextValue = toNumber(value);
  const scaleFactor = 10 ** (precision != null ? precision : 10);
  nextValue = Math.round(nextValue * scaleFactor) / scaleFactor;
  return precision ? nextValue.toFixed(precision) : nextValue.toString();
}
function countDecimalPlaces(value) {
  if (!Number.isFinite(value))
    return 0;
  let e = 1;
  let p = 0;
  while (Math.round(value * e) / e !== value) {
    e *= 10;
    p += 1;
  }
  return p;
}
function valueToPercent(value, min, max) {
  return (value - min) * 100 / (max - min);
}
function percentToValue(percent, min, max) {
  return (max - min) * percent + min;
}
function roundValueToStep(value, from, step) {
  const nextValue = Math.round((value - from) / step) * step + from;
  const precision = countDecimalPlaces(step);
  return toPrecision(nextValue, precision);
}
function clampValue(value, min, max) {
  if (value == null)
    return value;
  if (max < min) {
    console.warn("clamp: max cannot be less than min");
  }
  return Math.min(Math.max(value, min), max);
}
var [ListStylesProvider, useListStyles] = createContext$1({
  name: `ListStylesContext`,
  errorMessage: `useListStyles returned is 'undefined'. Seems you forgot to wrap the components in "<List />" `
});
var List = forwardRef(function List2(props, ref) {
  const styles2 = useMultiStyleConfig("List", props);
  const {
    children,
    styleType = "none",
    stylePosition,
    spacing: spacing2,
    ...rest
  } = omitThemingProps(props);
  const validChildren = getValidChildren(children);
  const selector = "& > *:not(style) ~ *:not(style)";
  const spacingStyle = spacing2 ? { [selector]: { mt: spacing2 } } : {};
  return /* @__PURE__ */ jsx(ListStylesProvider, { value: styles2, children: /* @__PURE__ */ jsx(
    chakra.ul,
    {
      ref,
      listStyleType: styleType,
      listStylePosition: stylePosition,
      role: "list",
      __css: { ...styles2.container, ...spacingStyle },
      ...rest,
      children: validChildren
    }
  ) });
});
List.displayName = "List";
var OrderedList = forwardRef((props, ref) => {
  const { as, ...rest } = props;
  return /* @__PURE__ */ jsx(List, { ref, as: "ol", styleType: "decimal", marginStart: "1em", ...rest });
});
OrderedList.displayName = "OrderedList";
var UnorderedList = forwardRef(function UnorderedList2(props, ref) {
  const { as, ...rest } = props;
  return /* @__PURE__ */ jsx(List, { ref, as: "ul", styleType: "initial", marginStart: "1em", ...rest });
});
UnorderedList.displayName = "UnorderedList";
var ListItem = forwardRef(function ListItem2(props, ref) {
  const styles2 = useListStyles();
  return /* @__PURE__ */ jsx(chakra.li, { ref, ...props, __css: styles2.item });
});
ListItem.displayName = "ListItem";
var ListIcon = forwardRef(function ListIcon2(props, ref) {
  const styles2 = useListStyles();
  return /* @__PURE__ */ jsx(Icon, { ref, role: "presentation", ...props, __css: styles2.icon });
});
ListIcon.displayName = "ListIcon";
var Spacer = chakra("div", {
  baseStyle: {
    flex: 1,
    justifySelf: "stretch",
    alignSelf: "stretch"
  }
});
Spacer.displayName = "Spacer";
var Heading = forwardRef(function Heading2(props, ref) {
  const styles2 = useStyleConfig("Heading", props);
  const { className, ...rest } = omitThemingProps(props);
  return /* @__PURE__ */ jsx(
    chakra.h2,
    {
      ref,
      className: cx$1("chakra-heading", props.className),
      ...rest,
      __css: styles2
    }
  );
});
Heading.displayName = "Heading";
var Link = forwardRef(function Link2(props, ref) {
  const styles2 = useStyleConfig("Link", props);
  const { className, isExternal, ...rest } = omitThemingProps(props);
  return /* @__PURE__ */ jsx(
    chakra.a,
    {
      target: isExternal ? "_blank" : void 0,
      rel: isExternal ? "noopener" : void 0,
      ref,
      className: cx$1("chakra-link", className),
      ...rest,
      __css: styles2
    }
  );
});
Link.displayName = "Link";
var dataAttr = (condition) => condition ? "" : void 0;
var ariaAttr = (condition) => condition ? true : void 0;
var cx = (...classNames) => classNames.filter(Boolean).join(" ");
function callAllHandlers(...fns) {
  return function func(event) {
    fns.some((fn) => {
      fn == null ? void 0 : fn(event);
      return event == null ? void 0 : event.defaultPrevented;
    });
  };
}
function orient$1(options) {
  const { orientation, vertical, horizontal } = options;
  return orientation === "vertical" ? vertical : horizontal;
}
var zeroSize = { width: 0, height: 0 };
var normalize = (a) => a || zeroSize;
function getStyles(options) {
  const { orientation, thumbPercents, thumbRects, isReversed } = options;
  const getThumbStyle = (i) => {
    var _a4;
    const rect = (_a4 = thumbRects[i]) != null ? _a4 : zeroSize;
    return {
      position: "absolute",
      userSelect: "none",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      touchAction: "none",
      ...orient$1({
        orientation,
        vertical: {
          bottom: `calc(${thumbPercents[i]}% - ${rect.height / 2}px)`
        },
        horizontal: {
          left: `calc(${thumbPercents[i]}% - ${rect.width / 2}px)`
        }
      })
    };
  };
  const size2 = orientation === "vertical" ? thumbRects.reduce(
    (a, b) => normalize(a).height > normalize(b).height ? a : b,
    zeroSize
  ) : thumbRects.reduce(
    (a, b) => normalize(a).width > normalize(b).width ? a : b,
    zeroSize
  );
  const rootStyle = {
    position: "relative",
    touchAction: "none",
    WebkitTapHighlightColor: "rgba(0,0,0,0)",
    userSelect: "none",
    outline: 0,
    ...orient$1({
      orientation,
      vertical: size2 ? {
        paddingLeft: size2.width / 2,
        paddingRight: size2.width / 2
      } : {},
      horizontal: size2 ? {
        paddingTop: size2.height / 2,
        paddingBottom: size2.height / 2
      } : {}
    })
  };
  const trackStyle = {
    position: "absolute",
    ...orient$1({
      orientation,
      vertical: {
        left: "50%",
        transform: "translateX(-50%)",
        height: "100%"
      },
      horizontal: {
        top: "50%",
        transform: "translateY(-50%)",
        width: "100%"
      }
    })
  };
  const isSingleThumb = thumbPercents.length === 1;
  const fallback = [0, isReversed ? 100 - thumbPercents[0] : thumbPercents[0]];
  const range = isSingleThumb ? fallback : thumbPercents;
  let start = range[0];
  if (!isSingleThumb && isReversed) {
    start = 100 - start;
  }
  const percent = Math.abs(range[range.length - 1] - range[0]);
  const innerTrackStyle = {
    ...trackStyle,
    ...orient$1({
      orientation,
      vertical: isReversed ? { height: `${percent}%`, top: `${start}%` } : { height: `${percent}%`, bottom: `${start}%` },
      horizontal: isReversed ? { width: `${percent}%`, right: `${start}%` } : { width: `${percent}%`, left: `${start}%` }
    })
  };
  return { trackStyle, innerTrackStyle, rootStyle, getThumbStyle };
}
function getIsReversed(options) {
  const { isReversed, direction: direction2, orientation } = options;
  if (direction2 === "ltr" || orientation === "vertical") {
    return isReversed;
  }
  return !isReversed;
}
function addDomEvent(target, eventName, handler, options) {
  target.addEventListener(eventName, handler, options);
  return () => {
    target.removeEventListener(eventName, handler, options);
  };
}
function isMouseEvent(event) {
  const win = getEventWindow(event);
  if (typeof win.PointerEvent !== "undefined" && event instanceof win.PointerEvent) {
    return !!(event.pointerType === "mouse");
  }
  return event instanceof win.MouseEvent;
}
function isTouchEvent(event) {
  const hasTouches = !!event.touches;
  return hasTouches;
}
function isMultiTouchEvent(event) {
  return isTouchEvent(event) && event.touches.length > 1;
}
function getEventWindow(event) {
  var _a4;
  return (_a4 = event.view) != null ? _a4 : window;
}
function pointFromTouch(e, type = "page") {
  const point = e.touches[0] || e.changedTouches[0];
  return { x: point[`${type}X`], y: point[`${type}Y`] };
}
function pointFromMouse(point, type = "page") {
  return {
    x: point[`${type}X`],
    y: point[`${type}Y`]
  };
}
function getEventPoint(event, type = "page") {
  return isTouchEvent(event) ? pointFromTouch(event, type) : pointFromMouse(event, type);
}
function filter(cb) {
  return (event) => {
    const isMouse = isMouseEvent(event);
    if (!isMouse || isMouse && event.button === 0) {
      cb(event);
    }
  };
}
function wrap(cb, filterPrimary = false) {
  function listener(event) {
    cb(event, { point: getEventPoint(event) });
  }
  const fn = filterPrimary ? filter(listener) : listener;
  return fn;
}
function addPointerEvent(target, type, cb, options) {
  return addDomEvent(target, type, wrap(cb, type === "pointerdown"), options);
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var PanEvent = class {
  constructor(event, handlers, threshold) {
    __publicField(this, "history", []);
    __publicField(this, "startEvent", null);
    __publicField(this, "lastEvent", null);
    __publicField(this, "lastEventInfo", null);
    __publicField(this, "handlers", {});
    __publicField(this, "removeListeners", () => {
    });
    __publicField(this, "threshold", 3);
    __publicField(this, "win");
    __publicField(this, "updatePoint", () => {
      if (!(this.lastEvent && this.lastEventInfo))
        return;
      const info2 = getPanInfo(this.lastEventInfo, this.history);
      const isPanStarted = this.startEvent !== null;
      const isDistancePastThreshold = distance(info2.offset, { x: 0, y: 0 }) >= this.threshold;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      const { timestamp: timestamp2 } = getFrameData();
      this.history.push({ ...info2.point, timestamp: timestamp2 });
      const { onStart, onMove } = this.handlers;
      if (!isPanStarted) {
        onStart == null ? void 0 : onStart(this.lastEvent, info2);
        this.startEvent = this.lastEvent;
      }
      onMove == null ? void 0 : onMove(this.lastEvent, info2);
    });
    __publicField(this, "onPointerMove", (event2, info2) => {
      this.lastEvent = event2;
      this.lastEventInfo = info2;
      sync.update(this.updatePoint, true);
    });
    __publicField(this, "onPointerUp", (event2, info2) => {
      const panInfo = getPanInfo(info2, this.history);
      const { onEnd, onSessionEnd } = this.handlers;
      onSessionEnd == null ? void 0 : onSessionEnd(event2, panInfo);
      this.end();
      if (!onEnd || !this.startEvent)
        return;
      onEnd == null ? void 0 : onEnd(event2, panInfo);
    });
    var _a4;
    this.win = (_a4 = event.view) != null ? _a4 : window;
    if (isMultiTouchEvent(event))
      return;
    this.handlers = handlers;
    if (threshold) {
      this.threshold = threshold;
    }
    event.stopPropagation();
    event.preventDefault();
    const info = { point: getEventPoint(event) };
    const { timestamp } = getFrameData();
    this.history = [{ ...info.point, timestamp }];
    const { onSessionStart } = handlers;
    onSessionStart == null ? void 0 : onSessionStart(event, getPanInfo(info, this.history));
    this.removeListeners = pipe(
      addPointerEvent(this.win, "pointermove", this.onPointerMove),
      addPointerEvent(this.win, "pointerup", this.onPointerUp),
      addPointerEvent(this.win, "pointercancel", this.onPointerUp)
    );
  }
  updateHandlers(handlers) {
    this.handlers = handlers;
  }
  end() {
    var _a4;
    (_a4 = this.removeListeners) == null ? void 0 : _a4.call(this);
    cancelSync.update(this.updatePoint);
  }
};
function subtract(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}
function getPanInfo(info, history) {
  return {
    point: info.point,
    delta: subtract(info.point, history[history.length - 1]),
    offset: subtract(info.point, history[0]),
    velocity: getVelocity(history, 0.1)
  };
}
var toMilliseconds = (v) => v * 1e3;
function getVelocity(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  let i = history.length - 1;
  let timestampedPoint = null;
  const lastPoint = history[history.length - 1];
  while (i >= 0) {
    timestampedPoint = history[i];
    if (lastPoint.timestamp - timestampedPoint.timestamp > toMilliseconds(timeDelta)) {
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
function pipe(...fns) {
  return (v) => fns.reduce((a, b) => b(a), v);
}
function distance1D(a, b) {
  return Math.abs(a - b);
}
function isPoint(point) {
  return "x" in point && "y" in point;
}
function distance(a, b) {
  if (typeof a === "number" && typeof b === "number") {
    return distance1D(a, b);
  }
  if (isPoint(a) && isPoint(b)) {
    const xDelta = distance1D(a.x, b.x);
    const yDelta = distance1D(a.y, b.y);
    return Math.sqrt(xDelta ** 2 + yDelta ** 2);
  }
  return 0;
}
function useLatestRef(value) {
  const ref = react.exports.useRef(null);
  ref.current = value;
  return ref;
}
function usePanEvent(ref, options) {
  const {
    onPan,
    onPanStart,
    onPanEnd,
    onPanSessionStart,
    onPanSessionEnd,
    threshold
  } = options;
  const hasPanEvents = Boolean(
    onPan || onPanStart || onPanEnd || onPanSessionStart || onPanSessionEnd
  );
  const panSession = react.exports.useRef(null);
  const handlersRef = useLatestRef({
    onSessionStart: onPanSessionStart,
    onSessionEnd: onPanSessionEnd,
    onStart: onPanStart,
    onMove: onPan,
    onEnd(event, info) {
      panSession.current = null;
      onPanEnd == null ? void 0 : onPanEnd(event, info);
    }
  });
  react.exports.useEffect(() => {
    var _a4;
    (_a4 = panSession.current) == null ? void 0 : _a4.updateHandlers(handlersRef.current);
  });
  react.exports.useEffect(() => {
    const node = ref.current;
    if (!node || !hasPanEvents)
      return;
    function onPointerDown(event) {
      panSession.current = new PanEvent(event, handlersRef.current, threshold);
    }
    return addPointerEvent(node, "pointerdown", onPointerDown);
  }, [ref, hasPanEvents, handlersRef, threshold]);
  react.exports.useEffect(() => {
    return () => {
      var _a4;
      (_a4 = panSession.current) == null ? void 0 : _a4.end();
      panSession.current = null;
    };
  }, []);
}
function trackElementSize(element, callback) {
  var _a4;
  if (!element) {
    callback(void 0);
    return;
  }
  callback({ width: element.offsetWidth, height: element.offsetHeight });
  const win = (_a4 = element.ownerDocument.defaultView) != null ? _a4 : window;
  const observer = new win.ResizeObserver((entries) => {
    if (!Array.isArray(entries) || !entries.length)
      return;
    const [entry] = entries;
    let width;
    let height;
    if ("borderBoxSize" in entry) {
      const borderSizeEntry = entry["borderBoxSize"];
      const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
      width = borderSize["inlineSize"];
      height = borderSize["blockSize"];
    } else {
      width = element.offsetWidth;
      height = element.offsetHeight;
    }
    callback({ width, height });
  });
  observer.observe(element, { box: "border-box" });
  return () => observer.unobserve(element);
}
var useSafeLayoutEffect = Boolean(globalThis == null ? void 0 : globalThis.document) ? react.exports.useLayoutEffect : react.exports.useEffect;
function trackMutation(el, cb) {
  var _a4, _b3;
  if (!el || !el.parentElement)
    return;
  const win = (_b3 = (_a4 = el.ownerDocument) == null ? void 0 : _a4.defaultView) != null ? _b3 : window;
  const observer = new win.MutationObserver(() => {
    cb();
  });
  observer.observe(el.parentElement, { childList: true });
  return () => {
    observer.disconnect();
  };
}
function useSizes({
  getNodes,
  observeMutation = true
}) {
  const [sizes2, setSizes] = react.exports.useState([]);
  const [count, setCount] = react.exports.useState(0);
  useSafeLayoutEffect(() => {
    const elements = getNodes();
    const cleanups = elements.map(
      (element, index2) => trackElementSize(element, (size2) => {
        setSizes((sizes22) => {
          return [
            ...sizes22.slice(0, index2),
            size2,
            ...sizes22.slice(index2 + 1)
          ];
        });
      })
    );
    if (observeMutation) {
      const firstNode = elements[0];
      cleanups.push(
        trackMutation(firstNode, () => {
          setCount((count2) => count2 + 1);
        })
      );
    }
    return () => {
      cleanups.forEach((cleanup) => {
        cleanup == null ? void 0 : cleanup();
      });
    };
  }, [count]);
  return sizes2;
}
function isRef(ref) {
  return typeof ref === "object" && ref !== null && "current" in ref;
}
function useSize(subject) {
  const [size2] = useSizes({
    observeMutation: false,
    getNodes() {
      const node = isRef(subject) ? subject.current : subject;
      return [node];
    }
  });
  return size2;
}
function useSlider(props) {
  var _a4;
  const {
    min = 0,
    max = 100,
    onChange,
    value: valueProp,
    defaultValue,
    isReversed: isReversedProp,
    direction: direction2 = "ltr",
    orientation = "horizontal",
    id: idProp,
    isDisabled,
    isReadOnly,
    onChangeStart: onChangeStartProp,
    onChangeEnd: onChangeEndProp,
    step = 1,
    getAriaValueText: getAriaValueTextProp,
    "aria-valuetext": ariaValueText,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    name,
    focusThumbOnChange = true,
    ...htmlProps
  } = props;
  const onChangeStart = useCallbackRef(onChangeStartProp);
  const onChangeEnd = useCallbackRef(onChangeEndProp);
  const getAriaValueText = useCallbackRef(getAriaValueTextProp);
  const isReversed = getIsReversed({
    isReversed: isReversedProp,
    direction: direction2,
    orientation
  });
  const [computedValue, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue != null ? defaultValue : getDefaultValue(min, max),
    onChange
  });
  const [isDragging, setDragging] = react.exports.useState(false);
  const [isFocused, setFocused] = react.exports.useState(false);
  const isInteractive = !(isDisabled || isReadOnly);
  const tenSteps = (max - min) / 10;
  const oneStep = step || (max - min) / 100;
  const value = clampValue(computedValue, min, max);
  const reversedValue = max - value + min;
  const trackValue = isReversed ? reversedValue : value;
  const thumbPercent = valueToPercent(trackValue, min, max);
  const isVertical = orientation === "vertical";
  const stateRef = useLatestRef({
    min,
    max,
    step,
    isDisabled,
    value,
    isInteractive,
    isReversed,
    isVertical,
    eventSource: null,
    focusThumbOnChange,
    orientation
  });
  const trackRef = react.exports.useRef(null);
  const thumbRef = react.exports.useRef(null);
  const rootRef = react.exports.useRef(null);
  const reactId = react.exports.useId();
  const uuid = idProp != null ? idProp : reactId;
  const [thumbId, trackId] = [`slider-thumb-${uuid}`, `slider-track-${uuid}`];
  const getValueFromPointer = react.exports.useCallback(
    (event) => {
      var _a22, _b3;
      if (!trackRef.current)
        return;
      const state2 = stateRef.current;
      state2.eventSource = "pointer";
      const trackRect = trackRef.current.getBoundingClientRect();
      const { clientX, clientY } = (_b3 = (_a22 = event.touches) == null ? void 0 : _a22[0]) != null ? _b3 : event;
      const diff = isVertical ? trackRect.bottom - clientY : clientX - trackRect.left;
      const length = isVertical ? trackRect.height : trackRect.width;
      let percent = diff / length;
      if (isReversed) {
        percent = 1 - percent;
      }
      let nextValue = percentToValue(percent, state2.min, state2.max);
      if (state2.step) {
        nextValue = parseFloat(
          roundValueToStep(nextValue, state2.min, state2.step)
        );
      }
      nextValue = clampValue(nextValue, state2.min, state2.max);
      return nextValue;
    },
    [isVertical, isReversed, stateRef]
  );
  const constrain = react.exports.useCallback(
    (value2) => {
      const state2 = stateRef.current;
      if (!state2.isInteractive)
        return;
      value2 = parseFloat(roundValueToStep(value2, state2.min, oneStep));
      value2 = clampValue(value2, state2.min, state2.max);
      setValue(value2);
    },
    [oneStep, setValue, stateRef]
  );
  const actions = react.exports.useMemo(
    () => ({
      stepUp(step2 = oneStep) {
        const next = isReversed ? value - step2 : value + step2;
        constrain(next);
      },
      stepDown(step2 = oneStep) {
        const next = isReversed ? value + step2 : value - step2;
        constrain(next);
      },
      reset() {
        constrain(defaultValue || 0);
      },
      stepTo(value2) {
        constrain(value2);
      }
    }),
    [constrain, isReversed, value, oneStep, defaultValue]
  );
  const onKeyDown = react.exports.useCallback(
    (event) => {
      const state2 = stateRef.current;
      const keyMap = {
        ArrowRight: () => actions.stepUp(),
        ArrowUp: () => actions.stepUp(),
        ArrowLeft: () => actions.stepDown(),
        ArrowDown: () => actions.stepDown(),
        PageUp: () => actions.stepUp(tenSteps),
        PageDown: () => actions.stepDown(tenSteps),
        Home: () => constrain(state2.min),
        End: () => constrain(state2.max)
      };
      const action = keyMap[event.key];
      if (action) {
        event.preventDefault();
        event.stopPropagation();
        action(event);
        state2.eventSource = "keyboard";
      }
    },
    [actions, constrain, tenSteps, stateRef]
  );
  const valueText = (_a4 = getAriaValueText == null ? void 0 : getAriaValueText(value)) != null ? _a4 : ariaValueText;
  const thumbSize = useSize(thumbRef);
  const { getThumbStyle, rootStyle, trackStyle, innerTrackStyle } = react.exports.useMemo(() => {
    const state2 = stateRef.current;
    const thumbRect = thumbSize != null ? thumbSize : { width: 0, height: 0 };
    return getStyles({
      isReversed,
      orientation: state2.orientation,
      thumbRects: [thumbRect],
      thumbPercents: [thumbPercent]
    });
  }, [isReversed, thumbSize, thumbPercent, stateRef]);
  const focusThumb = react.exports.useCallback(() => {
    const state2 = stateRef.current;
    if (state2.focusThumbOnChange) {
      setTimeout(() => {
        var _a22;
        return (_a22 = thumbRef.current) == null ? void 0 : _a22.focus();
      });
    }
  }, [stateRef]);
  useUpdateEffect(() => {
    const state2 = stateRef.current;
    focusThumb();
    if (state2.eventSource === "keyboard") {
      onChangeEnd == null ? void 0 : onChangeEnd(state2.value);
    }
  }, [value, onChangeEnd]);
  function setValueFromPointer(event) {
    const nextValue = getValueFromPointer(event);
    if (nextValue != null && nextValue !== stateRef.current.value) {
      setValue(nextValue);
    }
  }
  usePanEvent(rootRef, {
    onPanSessionStart(event) {
      const state2 = stateRef.current;
      if (!state2.isInteractive)
        return;
      setDragging(true);
      focusThumb();
      setValueFromPointer(event);
      onChangeStart == null ? void 0 : onChangeStart(state2.value);
    },
    onPanSessionEnd() {
      const state2 = stateRef.current;
      if (!state2.isInteractive)
        return;
      setDragging(false);
      onChangeEnd == null ? void 0 : onChangeEnd(state2.value);
    },
    onPan(event) {
      const state2 = stateRef.current;
      if (!state2.isInteractive)
        return;
      setValueFromPointer(event);
    }
  });
  const getRootProps = react.exports.useCallback(
    (props2 = {}, ref = null) => {
      return {
        ...props2,
        ...htmlProps,
        ref: mergeRefs(ref, rootRef),
        tabIndex: -1,
        "aria-disabled": ariaAttr(isDisabled),
        "data-focused": dataAttr(isFocused),
        style: {
          ...props2.style,
          ...rootStyle
        }
      };
    },
    [htmlProps, isDisabled, isFocused, rootStyle]
  );
  const getTrackProps = react.exports.useCallback(
    (props2 = {}, ref = null) => {
      return {
        ...props2,
        ref: mergeRefs(ref, trackRef),
        id: trackId,
        "data-disabled": dataAttr(isDisabled),
        style: {
          ...props2.style,
          ...trackStyle
        }
      };
    },
    [isDisabled, trackId, trackStyle]
  );
  const getInnerTrackProps = react.exports.useCallback(
    (props2 = {}, ref = null) => {
      return {
        ...props2,
        ref,
        style: {
          ...props2.style,
          ...innerTrackStyle
        }
      };
    },
    [innerTrackStyle]
  );
  const getThumbProps = react.exports.useCallback(
    (props2 = {}, ref = null) => {
      return {
        ...props2,
        ref: mergeRefs(ref, thumbRef),
        role: "slider",
        tabIndex: isInteractive ? 0 : void 0,
        id: thumbId,
        "data-active": dataAttr(isDragging),
        "aria-valuetext": valueText,
        "aria-valuemin": min,
        "aria-valuemax": max,
        "aria-valuenow": value,
        "aria-orientation": orientation,
        "aria-disabled": ariaAttr(isDisabled),
        "aria-readonly": ariaAttr(isReadOnly),
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabel ? void 0 : ariaLabelledBy,
        style: {
          ...props2.style,
          ...getThumbStyle(0)
        },
        onKeyDown: callAllHandlers(props2.onKeyDown, onKeyDown),
        onFocus: callAllHandlers(props2.onFocus, () => setFocused(true)),
        onBlur: callAllHandlers(props2.onBlur, () => setFocused(false))
      };
    },
    [
      isInteractive,
      thumbId,
      isDragging,
      valueText,
      min,
      max,
      value,
      orientation,
      isDisabled,
      isReadOnly,
      ariaLabel,
      ariaLabelledBy,
      getThumbStyle,
      onKeyDown
    ]
  );
  const getMarkerProps = react.exports.useCallback(
    (props2, ref = null) => {
      const isInRange = !(props2.value < min || props2.value > max);
      const isHighlighted = value >= props2.value;
      const markerPercent = valueToPercent(props2.value, min, max);
      const markerStyle = {
        position: "absolute",
        pointerEvents: "none",
        ...orient({
          orientation,
          vertical: {
            bottom: isReversed ? `${100 - markerPercent}%` : `${markerPercent}%`
          },
          horizontal: {
            left: isReversed ? `${100 - markerPercent}%` : `${markerPercent}%`
          }
        })
      };
      return {
        ...props2,
        ref,
        role: "presentation",
        "aria-hidden": true,
        "data-disabled": dataAttr(isDisabled),
        "data-invalid": dataAttr(!isInRange),
        "data-highlighted": dataAttr(isHighlighted),
        style: {
          ...props2.style,
          ...markerStyle
        }
      };
    },
    [isDisabled, isReversed, max, min, orientation, value]
  );
  const getInputProps = react.exports.useCallback(
    (props2 = {}, ref = null) => {
      return {
        ...props2,
        ref,
        type: "hidden",
        value,
        name
      };
    },
    [name, value]
  );
  const state = { value, isFocused, isDragging };
  return {
    state,
    actions,
    getRootProps,
    getTrackProps,
    getInnerTrackProps,
    getThumbProps,
    getMarkerProps,
    getInputProps
  };
}
function orient(options) {
  const { orientation, vertical, horizontal } = options;
  return orientation === "vertical" ? vertical : horizontal;
}
function getDefaultValue(min, max) {
  return max < min ? min : min + (max - min) / 2;
}
var [SliderProvider, useSliderContext] = createContext$1({
  name: "SliderContext",
  hookName: "useSliderContext",
  providerName: "<Slider />"
});
var [SliderStylesProvider, useSliderStyles] = createContext$1({
  name: `SliderStylesContext`,
  hookName: `useSliderStyles`,
  providerName: "<Slider />"
});
var Slider = forwardRef((props, ref) => {
  const sliderProps = {
    orientation: "horizontal",
    ...props
  };
  const styles2 = useMultiStyleConfig("Slider", sliderProps);
  const ownProps = omitThemingProps(sliderProps);
  const { direction: direction2 } = useTheme();
  ownProps.direction = direction2;
  const { getInputProps, getRootProps, ...context } = useSlider(ownProps);
  const rootProps = getRootProps();
  const inputProps = getInputProps({}, ref);
  return /* @__PURE__ */ jsx(SliderProvider, { value: context, children: /* @__PURE__ */ jsx(SliderStylesProvider, { value: styles2, children: /* @__PURE__ */ jsxs(
    chakra.div,
    {
      ...rootProps,
      className: cx("chakra-slider", sliderProps.className),
      __css: styles2.container,
      children: [
        sliderProps.children,
        /* @__PURE__ */ jsx("input", { ...inputProps })
      ]
    }
  ) }) });
});
Slider.displayName = "Slider";
var SliderThumb = forwardRef((props, ref) => {
  const { getThumbProps } = useSliderContext();
  const styles2 = useSliderStyles();
  const thumbProps = getThumbProps(props, ref);
  return /* @__PURE__ */ jsx(
    chakra.div,
    {
      ...thumbProps,
      className: cx("chakra-slider__thumb", props.className),
      __css: styles2.thumb
    }
  );
});
SliderThumb.displayName = "SliderThumb";
var SliderTrack = forwardRef((props, ref) => {
  const { getTrackProps } = useSliderContext();
  const styles2 = useSliderStyles();
  const trackProps = getTrackProps(props, ref);
  return /* @__PURE__ */ jsx(
    chakra.div,
    {
      ...trackProps,
      className: cx("chakra-slider__track", props.className),
      __css: styles2.track
    }
  );
});
SliderTrack.displayName = "SliderTrack";
var SliderFilledTrack = forwardRef(
  (props, ref) => {
    const { getInnerTrackProps } = useSliderContext();
    const styles2 = useSliderStyles();
    const trackProps = getInnerTrackProps(props, ref);
    return /* @__PURE__ */ jsx(
      chakra.div,
      {
        ...trackProps,
        className: cx("chakra-slider__filled-track", props.className),
        __css: styles2.filledTrack
      }
    );
  }
);
SliderFilledTrack.displayName = "SliderFilledTrack";
var SliderMark = forwardRef((props, ref) => {
  const { getMarkerProps } = useSliderContext();
  const styles2 = useSliderStyles();
  const markProps = getMarkerProps(props, ref);
  return /* @__PURE__ */ jsx(
    chakra.div,
    {
      ...markProps,
      className: cx("chakra-slider__marker", props.className),
      __css: styles2.mark
    }
  );
});
SliderMark.displayName = "SliderMark";
function omit(object, keysToOmit = []) {
  const clone = Object.assign({}, object);
  for (const key of keysToOmit) {
    if (key in clone) {
      delete clone[key];
    }
  }
  return clone;
}
var omitted = ["h", "minH", "height", "minHeight"];
var Textarea = forwardRef((props, ref) => {
  const styles2 = useStyleConfig("Textarea", props);
  const { className, rows, ...rest } = omitThemingProps(props);
  const textareaProps = useFormControl(rest);
  const textareaStyles = rows ? omit(styles2, omitted) : styles2;
  return /* @__PURE__ */ jsx(
    chakra.textarea,
    {
      ref,
      rows,
      ...textareaProps,
      className: cx$1("chakra-textarea", className),
      __css: textareaStyles
    }
  );
});
Textarea.displayName = "Textarea";
function Footer() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Spacer, {
      pt: 6
    }), /* @__PURE__ */ jsx(Link, {
      _hover: {
        textDecor: "underline"
      },
      textDecor: "none",
      display: "block",
      href: "mailto:unqocn@gmail.com",
      mt: "auto",
      children: /* @__PURE__ */ jsx(Text, {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
        children: t("footer_EmailText")
      })
    })]
  });
}
const NoApiKeyPage = ({
  loading,
  checkApiKey,
  apiKeyError
}) => {
  const [apiKey, setApiKey] = react.exports.useState("");
  const handleChange = (event) => {
    setApiKey(event.target.value);
  };
  const onClickSaveButton = () => {
    checkApiKey(apiKey);
  };
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs(VStack, {
      children: [loading ? /* @__PURE__ */ jsxs(VStack, {
        spacing: 5,
        children: [/* @__PURE__ */ jsx(Spinner, {
          width: 7,
          height: 7,
          color: COLORS.WHITE
        }), /* @__PURE__ */ jsx(Text, {
          color: COLORS.WHITE,
          whiteSpace: "pre-wrap",
          lineHeight: 1.4,
          children: t("noApiKeyPage_checkingApiKey")
        })]
      }) : /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsxs(HStack, {
          mb: 3,
          children: [/* @__PURE__ */ jsx(Input, {
            value: apiKey,
            type: "password",
            h: "24px",
            onChange: handleChange,
            placeholder: t("noApiKeyPage_openAIApiKey_placeholder"),
            size: "sm"
          }), /* @__PURE__ */ jsx(StyledButton, {
            h: "24px",
            size: "md",
            onClick: onClickSaveButton,
            children: t("noApiKeyPage_saveButtonText")
          })]
        }), /* @__PURE__ */ jsx(Text, {
          as: "h3",
          fontSize: 16,
          lineHeight: 1.5,
          color: COLORS.WHITE,
          alignSelf: "center",
          children: t("noApiKeyPage_howToGetApiKey")
        }), /* @__PURE__ */ jsxs(OrderedList, {
          spacing: 1.5,
          paddingLeft: 2,
          textAlign: "start",
          color: COLORS.WHITE,
          fontSize: 12,
          lineHeight: "16px",
          children: [/* @__PURE__ */ jsx("li", {
            children: separateI18nAndAddLink(t("noApiKeyPage_howToGetApiKeyDetail1"), "https://platform.openai.com/signup")
          }), /* @__PURE__ */ jsx("li", {
            children: separateI18nAndAddLink(t("noApiKeyPage_howToGetApiKeyDetail2"), "https://platform.openai.com/account/api-keys")
          }), /* @__PURE__ */ jsx("li", {
            children: t("noApiKeyPage_howToGetApiKeyDetail3")
          }), /* @__PURE__ */ jsx("li", {
            children: t("noApiKeyPage_howToGetApiKeyDetail4")
          })]
        })]
      }), apiKeyError && /* @__PURE__ */ jsxs(VStack, {
        children: [/* @__PURE__ */ jsx(Text, {
          fontWeight: "bold",
          color: COLORS.RED,
          children: apiKeyError.name
        }), /* @__PURE__ */ jsx(Text, {
          whiteSpace: "pre-wrap",
          color: COLORS.RED,
          children: apiKeyError.message
        })]
      })]
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
};
const separateI18nAndAddLink = (text, link) => {
  const [prev, rest] = text.split("{");
  const [linkText, next] = rest.split("}");
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [prev, /* @__PURE__ */ jsx(Link, {
      color: COLORS.PRIMARY,
      href: link,
      target: "_blank",
      children: linkText
    }), next]
  });
};
const slotListPageStateMachine = createMachine(
  {
    id: "slot_list_page",
    initial: "init",
    predictableActionArguments: true,
    schema: {
      context: {},
      events: {},
      services: {}
    },
    context: {
      slots: []
    },
    tsTypes: {},
    states: {
      init: {
        invoke: {
          src: "getAllSlotsFromBackground",
          onDone: {
            target: "slot_list",
            actions: "setSlots"
          },
          onError: {
            target: "slot_list"
          }
        }
      },
      slot_list: {
        on: {
          EDIT_SLOT: {
            target: "slot_detail",
            actions: assign({
              editingSlot: (context, event) => context.slots.find((slot) => slot.id === event.data)
            })
          },
          GO_TO_PROMPT_GENERATOR: "prompt_generator",
          ADD_SLOT: {
            actions: ["addSlot", "addSlotMessageSendToBackground"]
          },
          CHANGE_API_KEY: {
            target: "init",
            actions: "exitPage"
          },
          DELETE_SLOT: {
            actions: ["deleteSlot", "deleteSlotMessageSendToBackground"]
          },
          SELECT_SLOT: {
            actions: ["selectSlot", "selectSlotMessageSendToBackground"]
          }
        }
      },
      prompt_generator: {
        on: {
          BACK_TO_LIST: "slot_list"
        }
      },
      slot_detail: {
        on: {
          BACK_TO_LIST: {
            target: "slot_list",
            actions: assign({
              editingSlot: () => void 0
            })
          },
          UPDATE_SLOT: {
            actions: ["updateSlot", "updateSlotMessageSendToBackground"]
          }
        }
      }
    }
  },
  {
    actions: {
      setSlots: assign({ slots: (_, event) => event.data }),
      addSlot: assign({
        slots: (context, event) => context.slots.concat(event.data)
      }),
      updateSlot: assign({
        slots: (context, event) => {
          return context.slots.reduce((total, slot) => {
            const isUpdateTargetSlot = slot.id === event.data.id;
            if (isUpdateTargetSlot) {
              return [...total, event.data];
            }
            return [...total, slot];
          }, []);
        }
      }),
      deleteSlot: assign({
        slots: (context, event) => context.slots.filter((slot) => slot.id !== event.data)
      }),
      selectSlot: assign({
        slots: (context, event) => context.slots.map((slot) => ({
          ...slot,
          isSelected: slot.id === event.data
        }))
      })
    }
  }
);
const StyledTextArea = newStyled(Textarea)`
  padding: 4px;
`;
function SlotDetail({
  initialSlot,
  onUpdate,
  exitDetail
}) {
  var _a4;
  const [slot, setSlot] = react.exports.useState(initialSlot);
  const onSaveButtonClick = () => {
    onUpdate(slot);
    exitDetail();
  };
  const updateSlot = (key, value) => {
    setSlot((prevState) => ({
      ...prevState,
      [key]: value
    }));
  };
  return /* @__PURE__ */ jsxs(VStack, {
    spacing: 3,
    alignItems: "flex-start",
    children: [/* @__PURE__ */ jsx(Text, {
      color: COLORS.WHITE,
      fontSize: 12,
      children: t("slotDetail_promptSlotName")
    }), /* @__PURE__ */ jsx(Input, {
      size: "xs",
      value: slot.name,
      placeholder: t("slotDetail_promptSlotName_placeholder"),
      onChange: (event) => updateSlot("name", event.target.value)
    }), /* @__PURE__ */ jsx(Text, {
      color: COLORS.WHITE,
      textAlign: "start",
      whiteSpace: "pre-wrap",
      fontSize: 12,
      lineHeight: 1.3,
      children: t("slotDetail_writePromptTitle")
    }), /* @__PURE__ */ jsx(StyledTextArea, {
      width: 220,
      height: 70,
      maxLength: 2e3,
      value: slot.system,
      placeholder: t("slotDetail_promptInputPlaceholder"),
      onChange: (event) => {
        updateSlot("system", event.target.value);
      },
      size: "xs"
    }), /* @__PURE__ */ jsx(Text, {
      color: COLORS.WHITE,
      textAlign: "start",
      whiteSpace: "pre-wrap",
      fontSize: 12,
      lineHeight: 1.3,
      children: t("slotDetail_temperatureTitle")
    }), /* @__PURE__ */ jsx(TemperatureSlider, {
      temperature: (_a4 = slot.temperature) != null ? _a4 : 1,
      onChangeTemperature: (temperature) => {
        updateSlot("temperature", temperature);
      }
    }), /* @__PURE__ */ jsxs(HStack, {
      paddingTop: 4,
      width: "100%",
      justifyContent: "space-between",
      children: [/* @__PURE__ */ jsx(StyledButton, {
        onClick: onSaveButtonClick,
        colorScheme: "blue",
        children: t("slotDetail_saveButtonText")
      }), /* @__PURE__ */ jsx(StyledButton, {
        onClick: exitDetail,
        children: t("slotDetail_cancelButtonText")
      })]
    })]
  });
}
const TemperatureSlider = ({
  temperature,
  onChangeTemperature
}) => {
  const [showTooltip, setShowTooltip] = react.exports.useState(false);
  return /* @__PURE__ */ jsx(Box, {
    pt: "6px",
    pb: "2px",
    w: "100%",
    children: /* @__PURE__ */ jsxs(Slider, {
      min: 0,
      max: 2,
      step: 0.1,
      value: temperature,
      "aria-label": "temperature-slider",
      onChange: (val) => onChangeTemperature(val),
      onMouseEnter: () => setShowTooltip(true),
      onMouseLeave: () => setShowTooltip(false),
      children: [/* @__PURE__ */ jsx(SliderTrack, {
        children: /* @__PURE__ */ jsx(SliderFilledTrack, {})
      }), /* @__PURE__ */ jsx(Tooltip, {
        hasArrow: true,
        bg: "gray.500",
        color: "white",
        placement: "top",
        isOpen: showTooltip,
        label: temperature,
        children: /* @__PURE__ */ jsx(SliderThumb, {})
      })]
    })
  });
};
function SlotListItem({
  slotName,
  isSelected,
  onDetail,
  onSelect,
  onDelete
}) {
  return /* @__PURE__ */ jsx(Box, {
    width: "100%",
    backgroundColor: isSelected ? COLORS.PRIMARY : COLORS.WHITE,
    cursor: "pointer",
    padding: 2,
    borderRadius: 4,
    onClick: onSelect,
    children: /* @__PURE__ */ jsxs(HStack, {
      justifyContent: "space-between",
      children: [/* @__PURE__ */ jsx(Text, {
        fontWeight: "bold",
        color: isSelected ? COLORS.WHITE : "black",
        fontSize: 13,
        children: slotName
      }), /* @__PURE__ */ jsxs(HStack, {
        children: [/* @__PURE__ */ jsx(StyledButton, {
          colorScheme: isSelected ? "gray" : "blackAlpha",
          onClick: (event) => {
            event.stopPropagation();
            onDetail();
          },
          children: /* @__PURE__ */ jsx(Text, {
            fontSize: 11,
            children: t("slotListItem_editButtonText")
          })
        }), /* @__PURE__ */ jsx(StyledButton, {
          colorScheme: isSelected ? "gray" : "blackAlpha",
          isDisabled: isSelected,
          onClick: (event) => {
            event.stopPropagation();
            onDelete();
          },
          children: /* @__PURE__ */ jsx(Text, {
            fontSize: 11,
            children: t("slotListItem_deleteButtonText")
          })
        })]
      })]
    })
  });
}
const promptGeneratorStateMachine = createMachine(
  {
    id: "prompt-generator-state",
    initial: "idle",
    predictableActionArguments: true,
    schema: {
      context: {},
      events: {},
      services: {}
    },
    context: {
      inputText: ""
    },
    tsTypes: {},
    states: {
      idle: {
        on: {
          UPDATE_INPUT_TEXT: {
            actions: assign({ inputText: (_, event) => event.data })
          },
          GENERATE: "loading"
        }
      },
      loading: {
        entry: ["resetError", "resetOutputPrompt"],
        invoke: {
          src: "getGeneratedPrompt",
          onDone: {
            target: "idle",
            actions: assign({ outputPrompt: (_, event) => event.data })
          },
          onError: {
            target: "idle",
            actions: assign({ error: (_, event) => event.data })
          }
        }
      }
    }
  },
  {
    actions: {
      resetError: assign({
        error: () => void 0
      }),
      resetOutputPrompt: assign({ outputPrompt: () => void 0 })
    }
  }
);
const getGeneratedPromptFromBackground = async (inputText) => {
  const data = await sendMessageToBackgroundAsync({
    type: "RequestGenerateChatGPTPrompt",
    input: inputText
  });
  return data.result;
};
function PromptGenerator({
  exit
}) {
  const [state, send] = useMachine(promptGeneratorStateMachine, {
    context: {
      inputText: t("promptGenerator_placeholder")
    },
    services: {
      getGeneratedPrompt: (context) => getGeneratedPromptFromBackground(context.inputText)
    }
  });
  const isLoading = state.matches("loading");
  return /* @__PURE__ */ jsxs(VStack, {
    children: [/* @__PURE__ */ jsx(HStack, {
      w: "100%",
      justifyContent: "space-between",
      children: /* @__PURE__ */ jsx(StyledButton, {
        onClick: exit,
        children: t("promptGenerator_backButton")
      })
    }), /* @__PURE__ */ jsx(Text, {
      color: COLORS.WHITE,
      fontSize: 12,
      lineHeight: 1.2,
      textAlign: "start",
      w: "100%",
      children: t("promptGenerator_guideMessage")
    }), /* @__PURE__ */ jsx(Textarea, {
      width: "100%",
      height: "80px",
      size: "xs",
      lineHeight: 1.2,
      value: state.context.inputText,
      placeholder: t("promptGenerator_placeholder"),
      onChange: (e) => send({
        type: "UPDATE_INPUT_TEXT",
        data: e.target.value
      })
    }), state.context.outputPrompt && /* @__PURE__ */ jsx(Textarea, {
      width: "100%",
      size: "xs",
      height: "80px",
      lineHeight: 1.2,
      value: state.context.outputPrompt
    }), state.context.error && /* @__PURE__ */ jsxs(Text, {
      color: COLORS.RED,
      children: [state.context.error.name, ":", state.context.error.message]
    }), /* @__PURE__ */ jsx(HStack, {
      w: "100%",
      justifyContent: "space-between",
      children: /* @__PURE__ */ jsx(StyledButton, {
        onClick: () => send("GENERATE"),
        colorScheme: "blue",
        isLoading,
        children: t("promptGenerator_generateButton")
      })
    })]
  });
}
const getAllSlotsFromBackground = async () => {
  return await sendMessageToBackgroundAsync({
    type: "GetSlots"
  });
};
const addSlotMessageSendToBackground = (newSlot) => {
  sendMessageToBackground({
    message: {
      type: "AddNewSlot",
      input: newSlot
    }
  });
};
const updateSlotMessageSendToBackground = (updatedSlot) => {
  sendMessageToBackground({
    message: {
      type: "UpdateSlot",
      input: updatedSlot
    }
  });
};
const selectSlotMessageSendToBackground = (slotId) => {
  sendMessageToBackground({
    message: {
      type: "SelectSlot",
      input: slotId
    }
  });
};
const deleteSlotMessageSendToBackground = (slotId) => {
  sendMessageToBackground({
    message: {
      type: "DeleteSlot",
      input: slotId
    }
  });
};
function SlotListPage({
  onClickChangeApiKey,
  onClickQuickChatButton
}) {
  const [state, send] = useMachine(slotListPageStateMachine, {
    services: {
      getAllSlotsFromBackground
    },
    actions: {
      exitPage: onClickChangeApiKey,
      deleteSlotMessageSendToBackground: (_, event) => {
        deleteSlotMessageSendToBackground(event.data);
      },
      updateSlotMessageSendToBackground: (_, event) => {
        updateSlotMessageSendToBackground(event.data);
      },
      selectSlotMessageSendToBackground: (_, event) => {
        selectSlotMessageSendToBackground(event.data);
      },
      addSlotMessageSendToBackground: (_, event) => {
        addSlotMessageSendToBackground(event.data);
      }
    }
  });
  const addNewSlot = () => {
    const newSlot = createNewChatGPTSlot();
    send({
      type: "ADD_SLOT",
      data: newSlot
    });
    goToSlotDetail(newSlot.id);
  };
  const selectSlot = (slotId) => {
    send({
      type: "SELECT_SLOT",
      data: slotId
    });
  };
  const updateSlotData = (slot) => {
    send({
      type: "UPDATE_SLOT",
      data: slot
    });
  };
  const deleteSlot = (slotId) => {
    send({
      type: "DELETE_SLOT",
      data: slotId
    });
  };
  const goToSlotDetail = (slotId) => {
    send({
      type: "EDIT_SLOT",
      data: slotId
    });
  };
  const goToPromptGeneratorPage = () => {
    send({
      type: "GO_TO_PROMPT_GENERATOR"
    });
  };
  const onClickResetButton = () => {
    if (confirm(t("slotListPage_resetApiKeyConfirmMessage"))) {
      send("CHANGE_API_KEY");
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [state.matches("slot_list") && /* @__PURE__ */ jsxs(VStack, {
      spacing: 3,
      width: "100%",
      children: [/* @__PURE__ */ jsxs(HStack, {
        width: "100%",
        justifyContent: "space-between",
        children: [/* @__PURE__ */ jsx(StyledButton, {
          colorScheme: "gray",
          onClick: addNewSlot,
          children: t("slotListPage_newSlotButtonText")
        }), /* @__PURE__ */ jsx(StyledButton, {
          colorScheme: "gray",
          onClick: onClickQuickChatButton,
          children: t("slotListPage_quickChatButtonText")
        }), /* @__PURE__ */ jsx(StyledButton, {
          colorScheme: "gray",
          onClick: onClickResetButton,
          children: t("slotListPage_resetApiKeyButtonText")
        })]
      }), /* @__PURE__ */ jsxs(HStack, {
        justifyContent: "space-between",
        w: "100%",
        children: [/* @__PURE__ */ jsx(Text, {
          color: COLORS.WHITE,
          fontWeight: "bold",
          children: t("slotListPage_promptSlotsTitle")
        }), /* @__PURE__ */ jsx(StyledButton, {
          onClick: goToPromptGeneratorPage,
          colorScheme: "blue",
          children: t("slotListItem_promptGeneratorButton")
        })]
      }), state.context.slots.map((slot, index2) => /* @__PURE__ */ jsx(SlotListItem, {
        slotName: `${index2 + 1}. ${slot.name || slot.type}`,
        isSelected: slot.isSelected,
        onSelect: () => selectSlot(slot.id),
        onDetail: () => goToSlotDetail(slot.id),
        onDelete: () => deleteSlot(slot.id)
      }, slot.id))]
    }), state.matches("slot_detail") && /* @__PURE__ */ jsx(SlotDetail, {
      initialSlot: state.context.editingSlot,
      onUpdate: updateSlotData,
      exitDetail: () => send("BACK_TO_LIST")
    }), state.matches("prompt_generator") && /* @__PURE__ */ jsx(PromptGenerator, {
      exit: () => send("BACK_TO_LIST")
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
}
const popupStateMachine = createMachine(
  {
    id: "popup-state",
    initial: "init",
    predictableActionArguments: true,
    schema: {
      context: {},
      events: {},
      services: {}
    },
    context: {
      openAiApiKey: null
    },
    tsTypes: {},
    states: {
      init: {
        invoke: {
          src: "getApiKeyFromBackground",
          onDone: {
            target: "slot_list_page",
            actions: "setApiKey"
          },
          onError: {
            target: "no_api_key"
          }
        }
      },
      slot_list_page: {
        on: {
          RESET_API_KEY: {
            target: "no_api_key",
            actions: ["resetOpenAiApiKey", "resetApiKeyFromBackground"]
          },
          GO_TO_QUICK_CHAT: "quick_chat"
        }
      },
      no_api_key: {
        tags: "noApiKeyPage",
        on: {
          CHECK_API_KEY: {
            target: "checking_api_key",
            actions: "setApiKey"
          }
        }
      },
      quick_chat: {
        on: {
          EXIT_QUICK_CHAT: "slot_list_page"
        }
      },
      checking_api_key: {
        tags: "noApiKeyPage",
        invoke: {
          src: "saveApiKeyToBackground",
          onDone: { target: "slot_list_page" },
          onError: {
            target: "no_api_key",
            actions: assign({ apiKeyCheckError: (_, event) => event.data })
          }
        }
      }
    }
  },
  {
    actions: {
      setApiKey: assign({
        openAiApiKey: (_, event) => event.data
      }),
      resetOpenAiApiKey: assign({
        openAiApiKey: null
      })
    }
  }
);
const Container = newStyled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  min-width: 300px;
  min-height: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
  padding: 24px;
  background-color: ${COLORS.POPUP_BACKGROUND};

  p {
    margin: 0;
  }
`;
function MainLayout({
  children
}) {
  return /* @__PURE__ */ jsxs(Container, {
    children: [/* @__PURE__ */ jsx(Heading, {
      color: "gray.50",
      pb: 3,
      fontSize: 18,
      fontWeight: "bold",
      children: t("dragGPT")
    }), children]
  });
}
async function getChatHistoryFromBackground() {
  return await sendMessageToBackgroundAsync({
    type: "GetQuickChatHistory"
  });
}
function resetChatHistoriesFromBackground() {
  sendMessageToBackground({
    message: {
      type: "ResetQuickChatHistory"
    }
  });
}
function QuickChattingPage({
  onClickBackButton
}) {
  var _a4;
  const [state, send] = useMachine(streamChatStateMachine, {
    services: {
      getChatHistoryFromBackground,
      getGPTResponse: (context) => {
        return getQuickGPTResponseAsStream({
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
      exitChatting: onClickBackButton,
      resetChatData: (context) => {
        context.chats = [];
        resetChatHistoriesFromBackground();
      }
    }
  });
  const {
    scrollDownRef
  } = useScrollDownEffect([(_a4 = state.context.chats.at(-1)) == null ? void 0 : _a4.content]);
  const {
    isCopied,
    copy
  } = useCopyClipboard([state.context.chats.filter(({
    role
  }) => role === "assistant").length]);
  const onClickCopy = async () => {
    const lastResponseText = findLastResponseChat(state.context.chats);
    if (lastResponseText) {
      await copy(lastResponseText.content);
    }
  };
  const isLoading = state.matches("loading");
  const isReceiving = state.matches("receiving");
  const onChatSubmit = (event) => {
    event.preventDefault();
    send({
      type: "QUERY"
    });
  };
  const onClickResetButton = () => {
    send("RESET");
  };
  const onClickStopButton = () => {
    send("RECEIVE_CANCEL");
  };
  const onChatInputKeyDown = (event) => {
    var _a5;
    if (event.nativeEvent.isComposing) {
      return;
    }
    if (event.key === "Enter" && !event.shiftKey) {
      (_a5 = event.target.form) == null ? void 0 : _a5.requestSubmit();
      event.preventDefault();
    }
  };
  return /* @__PURE__ */ jsxs(VStack, {
    w: "400px",
    minH: "400px",
    justifyContent: "space-between",
    children: [/* @__PURE__ */ jsxs(HStack, {
      w: "100%",
      justifyContent: "space-between",
      children: [/* @__PURE__ */ jsx(StyledButton, {
        onClick: onClickBackButton,
        children: t("quickChattingPage_backButtonText")
      }), /* @__PURE__ */ jsx(StyledButton, {
        onClick: onClickResetButton,
        children: t("quickChattingPage_resetButtonText")
      })]
    }), /* @__PURE__ */ jsx(VStack, {
      ref: scrollDownRef,
      spacing: 4,
      flexGrow: 1,
      w: "100%",
      overflowY: "scroll",
      maxHeight: "300px",
      fontSize: 13,
      children: state.context.chats.map((chat, index2) => {
        switch (chat.role) {
          case "user":
            return /* @__PURE__ */ jsx(UserChat, {
              style: {
                marginInlineStart: "16px"
              },
              children: /* @__PURE__ */ jsx(ChatText, {
                children: chat.content
              })
            }, index2);
          case "assistant":
            return /* @__PURE__ */ jsx(AssistantChat, {
              style: {
                marginInlineEnd: "16px"
              },
              children: /* @__PURE__ */ jsx(ChatText, {
                children: chat.content
              })
            }, index2);
          case "error":
            return /* @__PURE__ */ jsx(AssistantChat, {
              children: /* @__PURE__ */ jsx(ChatText, {
                isError: true,
                children: chat.content
              })
            }, index2);
        }
      })
    }), /* @__PURE__ */ jsxs(VStack, {
      as: "form",
      onSubmit: onChatSubmit,
      mt: "auto",
      w: "100%",
      children: [/* @__PURE__ */ jsx(Textarea, {
        size: "xs",
        resize: "none",
        width: "100%",
        height: "50px",
        value: state.context.inputText,
        placeholder: t("quickChattingPage_chattingPlaceholder"),
        onChange: (e) => send({
          type: "CHANGE_TEXT",
          data: e.target.value
        }),
        onKeyDown: onChatInputKeyDown
      }), /* @__PURE__ */ jsxs(HStack, {
        justifyContent: "space-between",
        w: "100%",
        children: [/* @__PURE__ */ jsx(StyledButton, {
          onClick: onClickCopy,
          children: isCopied ? t("quickChattingPage_copyButtonText_copied") : t("quickChattingPage_copyButtonText_copy")
        }), /* @__PURE__ */ jsxs(HStack, {
          children: [isReceiving && /* @__PURE__ */ jsx(StyledButton, {
            colorScheme: "orange",
            onClick: onClickStopButton,
            children: t("quickChattingPage_stopButtonText")
          }), /* @__PURE__ */ jsx(StyledButton, {
            type: "submit",
            isLoading: isLoading || isReceiving,
            colorScheme: "blue",
            children: t("quickChattingPage_sendButtonText")
          })]
        })]
      })]
    })]
  });
}
function findLastResponseChat(chats) {
  return chats.filter((chat) => chat.role === "assistant").at(-1);
}
const saveApiKeyToBackground = async (apiKey) => {
  await sendMessageToBackgroundAsync({
    type: "SaveAPIKey",
    input: apiKey
  });
};
const getApiKeyFromBackground = async () => {
  return sendMessageToBackgroundAsync({
    type: "GetAPIKey"
  });
};
const resetApiKeyFromBackground = () => {
  sendMessageToBackground({
    message: {
      type: "ResetAPIKey"
    }
  });
};
function Popup() {
  const [state, send] = useMachine(popupStateMachine, {
    services: {
      saveApiKeyToBackground: (context) => {
        var _a4;
        return saveApiKeyToBackground((_a4 = context.openAiApiKey) != null ? _a4 : "");
      },
      getApiKeyFromBackground
    },
    actions: {
      resetApiKeyFromBackground
    }
  });
  const checkApiKey = (apiKey) => {
    send({
      type: "CHECK_API_KEY",
      data: apiKey
    });
  };
  return /* @__PURE__ */ jsxs(MainLayout, {
    children: [state.matches("slot_list_page") && /* @__PURE__ */ jsx(SlotListPage, {
      onClickChangeApiKey: () => send("RESET_API_KEY"),
      onClickQuickChatButton: () => send("GO_TO_QUICK_CHAT")
    }), state.hasTag("noApiKeyPage") && /* @__PURE__ */ jsx(NoApiKeyPage, {
      apiKeyError: state.context.apiKeyCheckError,
      loading: state.matches("checking_api_key"),
      checkApiKey
    }), state.matches("quick_chat") && /* @__PURE__ */ jsx(QuickChattingPage, {
      onClickBackButton: () => send("EXIT_QUICK_CHAT")
    })]
  });
}
function StyleProvider({
  children
}) {
  return /* @__PURE__ */ jsx(ThemeProvider, {
    theme,
    children
  });
}
function App() {
  return /* @__PURE__ */ jsx(StyleProvider, {
    children: /* @__PURE__ */ jsx(Popup, {})
  });
}
addHmrIntoView("pages/popup");
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsx(App, {}));
}
init();
