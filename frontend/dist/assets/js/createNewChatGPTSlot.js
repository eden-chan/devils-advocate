function createNewChatGPTSlot(config) {
  return {
    type: "ChatGPT",
    isSelected: false,
    id: generateId(),
    name: "",
    ...config
  };
}
function generateId() {
  return `${Date.now()}${Math.random()}`;
}
export {
  createNewChatGPTSlot as c
};
