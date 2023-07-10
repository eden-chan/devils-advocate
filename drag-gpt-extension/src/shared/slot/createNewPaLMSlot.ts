export function createNewPaLMSlot(config?: Partial<Slot>): Slot {
  return {
    type: "PaLM",
    isSelected: false,
    id: generateId(),
    name: "",
    ...config,
  };
}

function generateId(): string {
  return `${Date.now()}${Math.random()}`;
}
