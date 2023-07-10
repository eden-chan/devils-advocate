class SlotsManipulatorService {
  static getSelectedSlot(slots) {
    return slots.find(({ isSelected }) => isSelected);
  }
  static getSelectedSlotIndex(slots) {
    const index = slots.findIndex(({ isSelected }) => isSelected);
    return index >= 0 ? index : void 0;
  }
  static addSlot(slots, slot) {
    return [...slots, slot];
  }
  static updateSlot(slots, slot) {
    return slots.reduce((previousValue, currentValue) => {
      if (currentValue.id === slot.id) {
        return previousValue.concat(slot);
      }
      return previousValue.concat(currentValue);
    }, []);
  }
  static deleteSlot(slots, slotId) {
    return slots.filter((slot) => slot.id !== slotId);
  }
}
export {
  SlotsManipulatorService as S
};
