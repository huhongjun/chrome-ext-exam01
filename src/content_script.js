'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

console.log("---> content_script.js")

alert('content-script test alert');

// Log `title` of current active web page
const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
console.log(
    `Page title is: '${pageTitle}' `
);

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
    {
        type: 'GREETINGS',
        payload: {
            message: 'Hello, my name is Con. I am from ContentScript.',
        },
    },
    response => {
        console.log("content-script.js: msg from background -> " + response.message);
    }
);
