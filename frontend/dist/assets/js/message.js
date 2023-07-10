async function sendMessageToBackgroundAsync(message) {
  return new Promise((resolve, reject) => {
    try {
      sendMessageToBackground({
        message,
        handleSuccess: resolve,
        handleError: reject
      });
    } catch (error) {
      reject(error);
    }
  });
}
function sendMessageToBackground({
  message,
  handleSuccess,
  handleError
}) {
  const port = chrome.runtime.connect();
  port.onMessage.addListener((responseMessage) => {
    if (responseMessage.type === "Error") {
      handleError == null ? void 0 : handleError(responseMessage.error);
    } else {
      handleSuccess == null ? void 0 : handleSuccess(responseMessage.data);
    }
  });
  port.onDisconnect.addListener(() => console.log("Port disconnected"));
  try {
    port.postMessage(message);
  } catch (error) {
    console.log(error);
  }
  const disconnect = () => {
    port.disconnect();
  };
  return { disconnect };
}
function sendMessageToClient(port, message) {
  try {
    port.postMessage(message);
  } catch (error) {
    console.log(error);
  }
}
function sendErrorMessageToClient(port, error) {
  const sendError = new Error();
  sendError.name = "Unknown Error";
  if (error instanceof Error) {
    error.name && (sendError.name = error.name);
    sendError.message = error.message;
  }
  sendMessageToClient(port, { type: "Error", error: sendError });
}
export {
  sendMessageToClient as a,
  sendMessageToBackgroundAsync as b,
  sendMessageToBackground as c,
  sendErrorMessageToClient as s
};
