import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';
import '../../assets/styles/tailwind.css';

// Create a new div element
const popupContainer = document.createElement('div');
popupContainer.id = 'popup-container';

// Append the new div element to the document body
document.body.appendChild(popupContainer);

// Render the Popup component inside the new div element
render(<Popup />, popupContainer);

if (module.hot) module.hot.accept();
