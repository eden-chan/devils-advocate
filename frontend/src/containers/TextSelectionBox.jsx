import React, { useState } from 'react';

const TextSelectionBox = () => {
  const [showBox, setShowBox] = useState(false);
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });

  const handleMouseUp = (e) => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      const { clientX, clientY } = e;
      setBoxPosition({ x: clientX, y: clientY });
      setShowBox(true);
    } else {
      setShowBox(false);
    }
  };

  return (
    <div className="relative" onMouseUp={handleMouseUp}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero.
      </p>
      {showBox && (
        <div
          className="absolute bg-gray-100 border border-gray-300 p-2 rounded shadow-md z-10"
          style={{ left: `${boxPosition.x}px`, top: `${boxPosition.y - 30}px` }}
        >
          Custom Box
        </div>
      )}
    </div>
  );
};

export default TextSelectionBox;
