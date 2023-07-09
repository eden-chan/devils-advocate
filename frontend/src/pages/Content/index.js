import { printLine } from './modules/print';

console.log('Content script works!!!????');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

document.addEventListener('mouseup', function () {
  const selectedText = window.getSelection().toString();
  console.log('mouseup : ', selectedText);
  if (selectedText) {
    chrome.runtime.sendMessage({ selectedText: selectedText });
  }
});
