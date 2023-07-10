var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { S as SlotsManipulatorService } from "../../../assets/js/slotsManipulatorService.js";
import { s as sendErrorMessageToClient, a as sendMessageToClient } from "../../../assets/js/message.js";
import { c as createNewChatGPTSlot } from "../../../assets/js/createNewChatGPTSlot.js";
var runtime = { exports: {} };
(function(module) {
  var runtime2 = function(exports) {
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var defineProperty = Object.defineProperty || function(obj, key, desc) {
      obj[key] = desc.value;
    };
    var undefined$1;
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
      defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) });
      return generator;
    }
    exports.wrap = wrap;
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    var ContinueSentinel = {};
    function Generator() {
    }
    function GeneratorFunction() {
    }
    function GeneratorFunctionPrototype() {
    }
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
      return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      IteratorPrototype = NativeIteratorPrototype;
    }
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
    defineProperty(
      GeneratorFunctionPrototype,
      "constructor",
      { value: GeneratorFunction, configurable: true }
    );
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    );
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }
    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };
    exports.awrap = function(arg) {
      return { __await: arg };
    };
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value2) {
              invoke("next", value2, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }
          return PromiseImpl.resolve(value).then(function(unwrapped) {
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            return invoke("throw", error, resolve, reject);
          });
        }
      }
      var previousPromise;
      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
      }
      defineProperty(this, "_invoke", { value: enqueue });
    }
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
      return this;
    });
    exports.AsyncIterator = AsyncIterator;
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0)
        PromiseImpl = Promise;
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
        return result.done ? result.value : iter.next();
      });
    };
    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }
          return doneResult();
        }
        context.method = method;
        context.arg = arg;
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel)
                continue;
              return delegateResult;
            }
          }
          if (context.method === "next") {
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }
            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }
          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;
            if (record.arg === ContinueSentinel) {
              continue;
            }
            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method;
      var method = delegate.iterator[methodName];
      if (method === undefined$1) {
        context.delegate = null;
        if (methodName === "throw" && delegate.iterator["return"]) {
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);
          if (context.method === "throw") {
            return ContinueSentinel;
          }
        }
        if (methodName !== "return") {
          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a '" + methodName + "' method"
          );
        }
        return ContinueSentinel;
      }
      var record = tryCatch(method, delegate.iterator, context.arg);
      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }
      var info = record.arg;
      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }
      if (info.done) {
        context[delegate.resultName] = info.value;
        context.next = delegate.nextLoc;
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        return info;
      }
      context.delegate = null;
      return ContinueSentinel;
    }
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    define(Gp, iteratorSymbol, function() {
      return this;
    });
    define(Gp, "toString", function() {
      return "[object Generator]";
    });
    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };
      if (1 in locs) {
        entry.catchLoc = locs[1];
      }
      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }
      this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }
    exports.keys = function(val) {
      var object = Object(val);
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();
      return function next() {
        while (keys.length) {
          var key2 = keys.pop();
          if (key2 in object) {
            next.value = key2;
            next.done = false;
            return next;
          }
        }
        next.done = true;
        return next;
      };
    };
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
        if (typeof iterable.next === "function") {
          return iterable;
        }
        if (!isNaN(iterable.length)) {
          var i = -1, next = function next2() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next2.value = iterable[i];
                next2.done = false;
                return next2;
              }
            }
            next2.value = undefined$1;
            next2.done = true;
            return next2;
          };
          return next.next = next;
        }
      }
      return { next: doneResult };
    }
    exports.values = values;
    function doneResult() {
      return { value: undefined$1, done: true };
    }
    Context.prototype = {
      constructor: Context,
      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);
        if (!skipTempReset) {
          for (var name in this) {
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }
        return this.rval;
      },
      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }
        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;
          if (caught) {
            context.method = "next";
            context.arg = undefined$1;
          }
          return !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;
          if (entry.tryLoc === "root") {
            return handle("end");
          }
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          finallyEntry = null;
        }
        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;
        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }
        return this.complete(record);
      },
      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }
        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
        return ContinueSentinel;
      },
      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName,
          nextLoc
        };
        if (this.method === "next") {
          this.arg = undefined$1;
        }
        return ContinueSentinel;
      }
    };
    return exports;
  }(
    module.exports
  );
  try {
    regeneratorRuntime = runtime2;
  } catch (accidentalStrictMode) {
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime2;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime2);
    }
  }
})(runtime);
const LOCAL_RELOAD_SOCKET_PORT = 8081;
const LOCAL_RELOAD_SOCKET_URL = `ws://localhost:${LOCAL_RELOAD_SOCKET_PORT}`;
const UPDATE_PENDING_MESSAGE = "wait_update";
const UPDATE_REQUEST_MESSAGE = "do_update";
const UPDATE_COMPLETE_MESSAGE = "done_update";
class MessageInterpreter {
  constructor() {
  }
  static send(message) {
    return JSON.stringify(message);
  }
  static receive(serializedMessage) {
    return JSON.parse(serializedMessage);
  }
}
let needToUpdate = false;
function initReloadClient({ watchPath, onUpdate }) {
  const socket = new WebSocket(LOCAL_RELOAD_SOCKET_URL);
  function sendUpdateCompleteMessage() {
    socket.send(MessageInterpreter.send({ type: UPDATE_COMPLETE_MESSAGE }));
  }
  socket.addEventListener("message", (event) => {
    const message = MessageInterpreter.receive(String(event.data));
    switch (message.type) {
      case UPDATE_REQUEST_MESSAGE: {
        if (needToUpdate) {
          sendUpdateCompleteMessage();
          needToUpdate = false;
          onUpdate();
        }
        return;
      }
      case UPDATE_PENDING_MESSAGE: {
        if (!needToUpdate) {
          needToUpdate = message.path.includes(watchPath);
        }
        return;
      }
    }
  });
  socket.addEventListener("close", () => {
    console.log("Reload server disconnected.");
  });
  return socket;
}
function addHmrIntoScript(watchPath) {
  initReloadClient({
    watchPath,
    onUpdate: () => {
      chrome.runtime.reload();
    }
  });
}
class LocalStorage {
  async save(key, value) {
    return chrome.storage.local.set({ [key]: value });
  }
  async load(key) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([key], (result) => {
        const value = result[key];
        if (value === null || value === void 0) {
          const notFoundError = new Error();
          notFoundError.name = "Not Found Storage Value";
          notFoundError.message = `The [${key}] key could not be found. Register or change your key value`;
          reject(notFoundError);
        } else {
          resolve(value);
        }
      });
    });
  }
  async resetAll() {
    await chrome.storage.local.clear();
  }
}
class SlotStorage {
  static async getAllSlots() {
    try {
      const slots = await this.storage.load(this.SLOTS);
      if (Array.isArray(slots)) {
        return slots;
      }
    } catch (e) {
      return [];
    }
    return [];
  }
  static async setAllSlots(slots) {
    await this.storage.save(this.SLOTS, slots);
    return slots;
  }
  static async getSelectedSlot() {
    const slots = await this.getAllSlots();
    const selectedSlot = SlotsManipulatorService.getSelectedSlot(slots);
    if (selectedSlot) {
      return selectedSlot;
    }
    const notFoundError = new Error();
    notFoundError.name = "Not found selected slot";
    notFoundError.message = "Check selected slot.";
    throw notFoundError;
  }
  static async addSlot(slot) {
    const slots = await this.getAllSlots();
    const newSlot = { ...slot, isSelected: slots.length === 0 };
    const addedSlots = SlotsManipulatorService.addSlot(slots, newSlot);
    await this.storage.save(this.SLOTS, addedSlots);
    return addedSlots;
  }
  static async updateSlot(slot) {
    const slots = await this.getAllSlots();
    const updatedSlots = SlotsManipulatorService.updateSlot(slots, slot);
    await this.storage.save(this.SLOTS, updatedSlots);
    return updatedSlots;
  }
  static async deleteSlot(slotId) {
    const slots = await this.getAllSlots();
    const deletedSlots = SlotsManipulatorService.deleteSlot(slots, slotId);
    await this.storage.save(this.SLOTS, deletedSlots);
    return deletedSlots;
  }
}
__publicField(SlotStorage, "SLOTS", "SLOTS");
__publicField(SlotStorage, "storage", new LocalStorage());
class ApiKeyStorage {
  static async getApiKey() {
    const apiKey = await this.storage.load(this.API_KEY);
    return String(apiKey);
  }
  static async setApiKey(apiKey) {
    await this.storage.save(this.API_KEY, apiKey);
  }
}
__publicField(ApiKeyStorage, "API_KEY", "OPEN_AI_API_KEY");
__publicField(ApiKeyStorage, "storage", new LocalStorage());
async function chatGPT({
  input,
  slot,
  chats,
  apiKey,
  onDelta
}) {
  const messages = [];
  if (slot.system) {
    messages.push({
      role: "system",
      content: slot.system
    });
  }
  if (hasChats(chats)) {
    messages.push(...chats);
  }
  if (input) {
    messages.push({ role: "user", content: input });
  }
  const url = "http://localhost:8080/chat";
  console.log({ url, input });
  const response = await fetch(
    `http://localhost:8080/chat?human_msg=${JSON.stringify(input)}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json"
      }
    }
  );
  console.log({ response });
  if (response.status !== 200) {
    const error = new Error("error");
    throw error;
  }
  const jsonBody = await response.json();
  const result = jsonBody.response;
  onDelta == null ? void 0 : onDelta(result);
  return {
    result
  };
}
function hasChats(chats) {
  return chats !== void 0 && chats.length > 0;
}
const Logger = {
  receive: (message) => {
    console.log(
      "Message Receive:",
      `${message.type}
input: ${message.input ? JSON.stringify(message.input) : "none"}`
    );
  },
  send: (message) => {
    console.log(
      "Message Sending:",
      `${message.type}
data: ${message.data ? JSON.stringify(message.data) : "none"}`
    );
  },
  warn: console.warn,
  error: console.error
};
class QuickChatHistoryStorage {
  static async getChatHistories() {
    try {
      const chatHistories = await this.storage.load(this.QUICK_CHAT_HISTORY);
      if (Array.isArray(chatHistories)) {
        return chatHistories;
      }
    } catch (e) {
      return [];
    }
    return [];
  }
  static async resetChatHistories() {
    await this.storage.save(this.QUICK_CHAT_HISTORY, []);
  }
  static async pushChatHistories(chatOrChats) {
    const chats = await this.getChatHistories();
    await this.storage.save(this.QUICK_CHAT_HISTORY, chats.concat(chatOrChats));
  }
}
__publicField(QuickChatHistoryStorage, "QUICK_CHAT_HISTORY", "QUICK_CHAT_HISTORY");
__publicField(QuickChatHistoryStorage, "storage", new LocalStorage());
function exhaustiveMatchingGuard(_) {
  throw new Error("should not here");
}
const PROMPT_GENERATE_PROMPT = `Act as a prompt generator for ChatGPT. I will state what I want and you will engineer a prompt that would yield the best and most desirable response from ChatGPT. Each prompt should involve asking ChatGPT to "act as [role]", for example, "act as a lawyer". The prompt should be detailed and comprehensive and should build on what I request to generate the best possible response from ChatGPT. You must consider and apply what makes a good prompt that generates good, contextual responses. Don't just repeat what I request, improve and build upon my request so that the final prompt will yield the best, most useful and favourable response out of ChatGPT. Place any variables in square brackets
Here is the prompt I want`;
addHmrIntoScript("pages/background");
chrome.runtime.onConnect.addListener((port) => {
  port.onDisconnect.addListener(() => {
    console.log("Port disconnected");
  });
  port.onMessage.addListener(async (message) => {
    var _a, _b, _c;
    Logger.receive(message);
    const sendResponse = (message2) => {
      Logger.send(message2);
      sendMessageToClient(port, message2);
    };
    try {
      switch (message.type) {
        case "GetSlots": {
          const slots = await SlotStorage.getAllSlots();
          if (slots.length === 0) {
            const defaultSlot = createNewChatGPTSlot({ isSelected: true });
            await SlotStorage.addSlot(defaultSlot);
            slots.push(defaultSlot);
          }
          sendResponse({ type: "GetSlots", data: slots });
          break;
        }
        case "AddNewSlot": {
          await SlotStorage.addSlot(message.input);
          sendResponse({ type: "AddNewSlot", data: "success" });
          break;
        }
        case "SelectSlot": {
          const slots = await SlotStorage.getAllSlots();
          const updatedSlots = slots.map((slot) => ({
            ...slot,
            isSelected: message.input === slot.id
          }));
          await SlotStorage.setAllSlots(updatedSlots);
          sendResponse({ type: "SelectSlot", data: updatedSlots });
          break;
        }
        case "UpdateSlot": {
          const slots = await SlotStorage.updateSlot(message.input);
          sendResponse({ type: "UpdateSlot", data: slots });
          break;
        }
        case "DeleteSlot": {
          const slots = await SlotStorage.deleteSlot(message.input);
          sendResponse({ type: "DeleteSlot", data: slots });
          break;
        }
        case "GetAPIKey": {
          const apiKey = await ApiKeyStorage.getApiKey();
          sendResponse({ type: "GetAPIKey", data: apiKey });
          break;
        }
        case "SaveAPIKey":
          await chatGPT({
            input: "hello",
            apiKey: message.input,
            slot: { type: "ChatGPT" }
          }).catch((error) => {
            ApiKeyStorage.setApiKey(null);
            throw error;
          });
          await ApiKeyStorage.setApiKey(message.input);
          sendResponse({ type: "SaveAPIKey", data: "success" });
          break;
        case "ResetAPIKey":
          await ApiKeyStorage.setApiKey(null);
          sendResponse({ type: "ResetAPIKey", data: "success" });
          break;
        case "RequestInitialDragGPTStream": {
          const slot = await SlotStorage.getSelectedSlot();
          const apiKey = await ApiKeyStorage.getApiKey();
          const response = await chatGPT({
            input: message.input,
            slot,
            apiKey,
            onDelta: (chunk) => {
              sendResponse({
                type: "RequestInitialDragGPTStream",
                data: {
                  result: chunk,
                  chunk
                }
              });
            }
          });
          sendResponse({
            type: "RequestInitialDragGPTStream",
            data: {
              isDone: true,
              result: response.result
            }
          });
          break;
        }
        case "RequestOnetimeChatGPT": {
          const selectedSlot = await SlotStorage.getSelectedSlot();
          const apiKey = await ApiKeyStorage.getApiKey();
          const response = await chatGPT({
            input: message.input,
            slot: selectedSlot,
            apiKey
          });
          sendResponse({
            type: "RequestOnetimeChatGPT",
            data: response
          });
          break;
        }
        case "RequestQuickChatGPTStream": {
          await QuickChatHistoryStorage.pushChatHistories({
            role: "user",
            content: (_c = (_b = (_a = message.input) == null ? void 0 : _a.at(-1)) == null ? void 0 : _b.content) != null ? _c : ""
          });
          const apiKey = await ApiKeyStorage.getApiKey();
          const response = await chatGPT({
            chats: message.input,
            slot: { type: "ChatGPT" },
            apiKey,
            onDelta: (chunk) => {
              sendResponse({
                type: "RequestQuickChatGPTStream",
                data: {
                  result: chunk,
                  chunk
                }
              });
            }
          });
          await QuickChatHistoryStorage.pushChatHistories({
            role: "assistant",
            content: response.result
          });
          sendResponse({
            type: "RequestQuickChatGPTStream",
            data: { result: response.result, isDone: true }
          });
          break;
        }
        case "RequestDragGPTStream": {
          const apiKey = await ApiKeyStorage.getApiKey();
          const response = await chatGPT({
            chats: message.input,
            slot: { type: "ChatGPT" },
            apiKey,
            onDelta: (chunk) => {
              sendResponse({
                type: "RequestDragGPTStream",
                data: {
                  result: chunk,
                  chunk
                }
              });
            }
          });
          sendResponse({
            type: "RequestDragGPTStream",
            data: { result: response.result, isDone: true }
          });
          break;
        }
        case "RequestOngoingChatGPT": {
          const selectedSlot = await SlotStorage.getSelectedSlot();
          const apiKey = await ApiKeyStorage.getApiKey();
          const response = await chatGPT({
            chats: message.input,
            slot: selectedSlot,
            apiKey
          });
          sendResponse({ type: "RequestOngoingChatGPT", data: response });
          break;
        }
        case "RequestGenerateChatGPTPrompt": {
          const apiKey = await ApiKeyStorage.getApiKey();
          const response = await chatGPT({
            input: message.input,
            slot: {
              type: "ChatGPT",
              system: PROMPT_GENERATE_PROMPT
            },
            apiKey
          });
          sendResponse({
            type: "RequestGenerateChatGPTPrompt",
            data: response
          });
          break;
        }
        case "GetQuickChatHistory": {
          const chats = await QuickChatHistoryStorage.getChatHistories();
          sendResponse({ type: "GetQuickChatHistory", data: chats });
          break;
        }
        case "ResetQuickChatHistory": {
          await QuickChatHistoryStorage.resetChatHistories();
          sendResponse({ type: "ResetQuickChatHistory", data: "success" });
          break;
        }
        default: {
          exhaustiveMatchingGuard(message);
        }
      }
    } catch (error) {
      Logger.warn(error);
      sendErrorMessageToClient(port, error);
    }
  });
});
