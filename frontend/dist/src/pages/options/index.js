import "../../../assets/js/modulepreload-polyfill.js";
import { a as jsx, b as addHmrIntoView, c as createRoot } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
const Options$1 = "";
const Options = () => {
  return /* @__PURE__ */ jsx("div", {
    className: "OptionsContainer",
    children: "Options"
  });
};
const index = "";
addHmrIntoView("pages/options");
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsx(Options, {}));
}
init();
