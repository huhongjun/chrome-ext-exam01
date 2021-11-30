console.log("---> background.js")

chrome.runtime.onInstalled.addListener(() => {
    let color = '#3aa757';
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("msg received");
        if (request.msg == "startFunc") {
            // alert("Success!");
            console.log("msg startFunc");

            var opt = {
                type: "basic",
                title: "Primary Title",
                message: "Primary message to display",
                iconUrl: "/images/gcm_128.png"
            }
            var id = Math.floor(Math.random() * 9007199254740992) + 1;
            id = id.toString();
            chrome.notifications.create(id, opt, function () { });

            // sendResponse({ farewell: "goodbye" });
        }
        if (request.type == "GREETINGS") {
            // alert("Success!");
            console.log("msg GREETINGS");

            sendResponse({ message: "goodbye" });
        }
    }
);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.contentScriptQuery == "getData") {
        var url = request.url;
        fetch(url)
            .then(response => response.text())
            .then(response => sendResponse(response))
            .catch(error => console.log('Error:', error))
        return true;
    }
    if (request.contentScriptQuery == "postData") {
        fetch(request.url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: 'result=' + request.data
        })
            .then(response => response.json())
            .then(response => sendResponse(response))
            .catch(error => console.log('Error:', error));
        return true;
    }
});