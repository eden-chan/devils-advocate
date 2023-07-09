// Function to inject Tailwind CSS styles into the page
function injectTailwindCSS() {
  const tailwindLink = document.createElement('link');
  tailwindLink.href =
    'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css';
  tailwindLink.rel = 'stylesheet';
  document.head.appendChild(tailwindLink);
}

// Inject Tailwind CSS styles
injectTailwindCSS();

document.addEventListener('mouseup', (e) => {
  const selectedText = window.getSelection().toString();
  const boxId = 'text-selection-box';

  let box = document.getElementById(boxId);

  if (selectedText) {
    const { clientX, clientY, pageY } = e;
    const adjustedClientY = clientY + pageY - window.pageYOffset;

    if (!box) {
      box = document.createElement('div');
      box.id = boxId;
      box.className = 'w-72 h-56 relative';
      box.innerHTML = `
        <div class="w-72 h-56 left-0 top-0 absolute bg-orange-100 border border-black"></div>
        <img class="w-10 h-10 left-[243px] top-[39px] absolute" src="https://via.placeholder.com/39x39" />
        <div class="w-9 h-9 left-[106px] top-[178px] absolute">
          <img class="w-9 h-9 left-0 top-0 absolute" src="https://via.placeholder.com/38x38" />
          <div class="w-7 h-7 left-[4px] top-[5px] absolute bg-white bg-opacity-0 rounded-full border border-black"></div>
        </div>
        <div class="w-8 h-8 left-[146px] top-[182px] absolute">
          <div class="w-7 h-7 left-[1px] top-[1px] absolute bg-white bg-opacity-0 rounded-full border border-black"></div>
          <img class="w-8 h-8 left-0 top-[32px] absolute origin-top-left rotate-[-89.76deg]" src="https://via.placeholder.com/32x32" />
        </div>
        <div class="w-64 left-[16px] top-[69px] absolute text-black text-xs font-normal">Q: Isn't it more beneficial to prioritize creating a supportive environment for young people with anxiety, rather than emphasizing the need for them to constantly challenge themselves and be brave?</div>
      `;

      document.body.appendChild(box);
      // const selection = window.getSelection();

      // const range = selection.getRangeAt(0);
      // const firstNode = range.startContainer;
      // const parentNode = firstNode.parentNode;

      // parentNode.insertBefore(box, firstNode);
    }

    console.log({
      clientY,
      pageY,
      offset: window.pageYOffset,
      adjustedClientY,
    });

    box.style.position = 'fixed';
    box.style.left = `${clientX}px`;
    box.style.top = `${clientY - 30}px`;

    box.style.display = 'block';
  } else if (box) {
    box.style.display = 'none';
  }
});
