
let posiciones = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "iniciarBusqueda") {
    const { query, dominio, clave, pais, idioma } = message;
    posiciones[clave] = null;
    
  }

  if (message.action === "guardarPosicion") {
    if (message.clave) {
      posiciones[message.clave] = message.posicion;

      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id, {
            action: "posicionesActualizadas",
            posiciones,
            clave: message.clave
          });
        });
      });
    }
  }

  if (message.action === "obtenerPosiciones") {
    sendResponse(posiciones);
  }
});

chrome.action.onClicked.addListener((tab) => {
  const url = tab.url || "";

  if (
    url === "chrome://newtab/" ||
    url.startsWith("chrome://") ||
    url.startsWith("chrome-extension://") ||
    url.startsWith("https://chrome.google.com/webstore")
  ) {
    chrome.tabs.update(tab.id, { url: "https://www.google.com" }, (updatedTab) => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (tabId === updatedTab.id && info.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: updatedTab.id },
            files: ["content_sidebar.js"]
          });
          chrome.tabs.onUpdated.removeListener(listener);
        }
      });
    });
    return;
  }

  setTimeout(() => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content_sidebar.js']
    }, (result) => {
      if (chrome.runtime.lastError) {
        console.warn("Error al inyectar:", chrome.runtime.lastError.message);
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => alert("No se pudo cargar el sidebar. ¿Estás en una página cargada completamente?")
        });
      }
    });
  }, 500);
});


