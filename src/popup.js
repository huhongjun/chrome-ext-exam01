// Initialize button with users' preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}

let sendMsg = document.getElementById("send-btn");

sendMsg.addEventListener("click", async () => {
  // alert("msg sent");

  // getApi();

  chrome.runtime.sendMessage({ msg: "startFunc" });

  const server = "terraform-shell-api-sy6jffgc6a-as.a.run.app";
  const Url = `https://${server}`;
  // const Url = `https://${server}/tfapi?action=test&vm=proxy&provider=ls&region=sigpore`;
  var JSONdata = {};

  chrome.runtime.sendMessage(
    {
      contentScriptQuery: "getData"
      , data: JSONdata
      , url: Url
    }, function (response) {
      debugger;
      if (response != undefined && response != "") {
        console.log(response);
        document.getElementById('info').innerHTML = response;

      }
      else {
        debugger;
        console.log(null);
      }
    });

  // var JSONdata = {};

  // chrome.runtime.sendMessage(
  //   {
  //     contentScriptQuery: "postData"
  //     , data: JSONdata
  //     , url: Url
  //   }, function (response) {
  //     debugger;
  //     if (response != undefined && response != "") {
  //       callback(response);
  //     }
  //     else {
  //       debugger;
  //       callback(null);
  //     }
  //   });

});

function getApi() {

  const server = "terraform-shell-api-sy6jffgc6a-as.a.run.app";
  // const Url = `https://${server}`;
  const Url = `https://${server}/tfapi?action=test&vm=proxy&provider=ls&region=sigpore`;

  const Http = new XMLHttpRequest();
  Http.open("GET", Url);
  // Http.responseType = 'json';
  Http.send();
  Http.onreadystatechange = (e) => {

    var JSO = Http.response;
    document.getElementById('info').innerHTML = JSO;
  }
}
