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
    <div class="flex flex-col h-full dark:bg-[#333440] dark:text-gray-50 overflow-y-auto">
      <div class="flex z-50 flex-row items-center px-4 py-3 bg-[#343541] text-[#d9d9e3] dark:text-[#eaeaea] dark:bg-[#333440] dark:border-b sticky top-0 cursor-grab">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 128"
          class="w-5 h-5 rounded-sm mr-1.5"
        >
          <g fill="none" fill-rule="nonzero" transform="translate(5 5)">
            <circle
              cx="59"
              cy="59"
              r="59"
              fill="#10A37F"
              stroke="#10A37F"
              stroke-width="9"
            ></circle>
            <path
              fill="#E5E7EB"
              d="M76.397 67.004c-1.545 5.815-5.642 8.127-10.356 9.47-.464.148-.386.595-.386.595l.695 4.623s.077.373.696.298C83.66 80.2 94.714 68.047 92.78 53.285c-2.01-10.215-10.356-14.167-17.93-13.123-7.652 1.193-12.908 8.053-11.67 15.434 1.004 6.561 6.646 11.184 13.215 11.408Z"
            ></path>
            <path
              fill="#FFF"
              d="M26.16 55.596c1.005 6.487 6.722 11.11 13.211 11.408-1.622 5.815-5.562 8.127-10.352 9.47-.464.148-.387.595-.387.595l.773 4.623s.077.373.695.298c16.534-1.79 27.736-13.943 25.65-28.705-1.93-10.215-10.198-14.167-17.846-13.123C30.254 41.355 25 48.215 26.16 55.596Z"
            ></path>
          </g>
        </svg>
        <p class="text-base m-0 ml-1">ChatGPT » summarize everything!</p>
        <div class="grow"></div>
        <button class="cursor-pointer rounded focus:ring-1 focus:outline-none focus:ring-primary-500 ml-1 leading-[0] hover:text-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            class="w-4 h-4"
          >
            <path
              fill-rule="evenodd"
              d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Options</span>
        </button>
        <button class="cursor-pointer rounded focus:ring-1 focus:outline-none focus:ring-green-500 ml-2 leading-[0] hover:text-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            class="w-7 h-7"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
          </svg>
          <span class="sr-only">Close</span>
        </button>
      </div>
      <div class=" sticky dark:bg-[#333440] shadow-md dark:shadow-none dark:border-b border-gray-200 bg-white top-0 flex justify-between items-center pr-4">
        <nav
          class="-mb-px flex space-x-8 px-4"
          role="tablist"
          aria-orientation="horizontal"
        >
          <button
            class="border-primary-500 text-primary-500 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm focus:outline-none focus:ring focus:ring-primary-500 dark:text-gray-50 dark:hover:text-gray-300"
            aria-current="page"
            id="headlessui-tabs-tab-:r0:"
            role="tab"
            aria-selected="true"
            tabindex="0"
            data-headlessui-state="selected"
            type="button"
            aria-controls="headlessui-tabs-panel-:r2:"
          >
            Summarize
          </button>
          <button
            class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm focus:outline-none focus:ring focus:ring-primary-500 dark:text-gray-50 dark:hover:text-gray-300"
            id="headlessui-tabs-tab-:r1:"
            role="tab"
            aria-selected="false"
            tabindex="-1"
            data-headlessui-state=""
            type="button"
            aria-controls="headlessui-tabs-panel-:r3:"
          >
            Chat
          </button>
        </nav>
        <div class="relative">
          <button
            class="relative w-full cursor-default rounded-md border bg-gray-200 dark:bg-transparent dark:border-gray-200 border-gray-200 py-1.5 pl-3 pr-10 text-left shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
            id="headlessui-listbox-button-:r4:"
            type="button"
            aria-haspopup="listbox"
            aria-expanded="false"
            data-headlessui-state=""
          >
            <span class="block truncate">English</span>
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                class="h-5 w-5 text-gray-400"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div>
        <div
          id="headlessui-tabs-panel-:r2:"
          role="tabpanel"
          tabindex="-1"
          data-headlessui-state="selected"
          aria-labelledby="headlessui-tabs-tab-:r0:"
        >
          <div class="px-4">
            <div
              class="prose prose-sm break-words prose-primary max-w-none dark:prose-invert mb-4 overflow-auto"
              id="gpt-answer"
              dir="auto"
            >
              <div class="float-right">
                <div class="flex items-center mr-[1px] gap-0.5 pl-2 pt-2 pb-2">
                  <button class="hover:bg-gray-200 disabled:hover:bg-transparent disabled:focus:ring-0 focus:ring-1 focus:outline-none focus:ring-primary-500 hover:dark:bg-gray-900 rounded p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      class="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      ></path>
                    </svg>
                    <span class="sr-only">Retry</span>
                  </button>{' '}
                  <button class="hover:bg-gray-200 disabled:hover:bg-transparent disabled:focus:ring-0 focus:ring-1 focus:outline-none focus:ring-primary-500 hover:dark:bg-gray-900 rounded p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      class="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                      ></path>
                    </svg>
                    <span class="sr-only">Vote Up</span>
                  </button>
                  <button class="hover:bg-gray-200 disabled:hover:bg-transparent disabled:focus:ring-0 focus:ring-1 focus:outline-none focus:ring-primary-500 hover:dark:bg-gray-900 rounded p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      class="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                      ></path>
                    </svg>
                    <span class="sr-only">Vote Down</span>
                  </button>
                  <button class="hover:bg-gray-200 disabled:hover:bg-transparent disabled:focus:ring-0 focus:ring-1 focus:outline-none focus:ring-primary-500 hover:dark:bg-gray-900 rounded p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      class="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                      ></path>
                    </svg>
                    <span class="sr-only">Copy</span>
                  </button>
                </div>
              </div>
              <p>
                I'm sorry, but I'm unable to access external URLs or execute
                JavaScript code provided in your request. However, if you have
                any specific text or information that you would like me to
                summarize or provide bullet points for, please share it with me,
                and I'll be happy to assist you.
              </p>
            </div>
          </div>
        </div>
        <div
          id="headlessui-tabs-panel-:r3:"
          role="tabpanel"
          tabindex="-1"
          hidden=""
          data-headlessui-state=""
          aria-labelledby="headlessui-tabs-tab-:r1:"
          // style="display: none;"
        >
          {/* <iframe
            seamless=""
            src="https://chat.openai.com"
            class="w-full h-[555px] border-none -mt-12"
          ></iframe> */}
        </div>
      </div>
    </div>
  );
};

export default Popup;
