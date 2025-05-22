chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "iniciarBusqueda") {
    const query = encodeURIComponent("Diseño páginas web Barcelona");
    const url = `https://www.google.com/search?q=${query}`;
    
    chrome.tabs.create({ url: url }, (tab) => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (tabId === tab.id && info.status === 'complete') {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
          });
          chrome.tabs.onUpdated.removeListener(listener);
        }
      });
    });
  }
});
