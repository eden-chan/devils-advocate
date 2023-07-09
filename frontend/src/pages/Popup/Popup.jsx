import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';

import './Popup.css';

const Popup = () => {
  const testAPI = () => {
    const url = 'http://localhost:8080/chat'; // Replace with the actual server URL if needed
    const human_msg = 'Hello, how are you?';

    const postData = async (url, data) => {
      const urlWithParams = new URL(url);
      urlWithParams.searchParams.append('human_msg', data);

      const response = await fetch(urlWithParams, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      return await response.json();
    };

    postData(url, human_msg)
      .then((data) => alert(`Model response: ${data.response}`))
      .catch((error) => alert('Error:', error));
  };

  const [selectedText, setSelectedText] = useState('No text selected');

  useEffect(() => {
    const handleMessage = (request) => {
      setSelectedText(request.selectedText);
      alert(request.selectedText);
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    // // Get the absolute URL of the bundled content script file
    // const contentScriptURL = chrome.extension.getURL('contentScript.bundle.js');

    // // Inject the bundled content script into the active tab using the absolute URL
    // chrome.tabs.executeScript({ file: contentScriptURL });

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload..
        </p>

        <p>{selectedText}</p>
        <button className="text-red-500 absolute" onClick={testAPI}>
          Test me!!!
        </button>

        <div className="w-72 h-48 relative">
          <div className="w-72 h-48 left-0 top-0 absolute bg-orange-100 border border-black" />
          <img
            className="w-10 h-10 left-[243px] top-[39px] absolute"
            src="https://via.placeholder.com/39x39"
            alt=""
          />
          <div className="w-64 left-[19px] top-[56px] absolute text-black text-xs font-normal">
            Q: Isn't it more beneficial to prioritize creating a supportive
            environment for young people with anxiety, rather than emphasizing
            the need for them to constantly challenge themselves and be brave?
          </div>
          <div className="w-14 h-5 left-[112px] top-[136px] absolute bg-emerald-400 rounded--sm border border-black" />
          <div className="w-14 h-5 left-[112px] top-[167px] absolute bg-red-600 rounded--sm border border-black" />
        </div>
      </header>
    </div>
  );
};

export default Popup;
