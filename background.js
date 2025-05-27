let posiciones = {
  personalizada: null
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "iniciarBusqueda") {
    posiciones = { personalizada: null }; 

    const query = message.query;
    const dominio = message.dominio;
    abrirBusqueda(query, "personalizada", dominio);
  }

 if (message.action === "guardarPosicion") {
  if (message.clave) {
    posiciones[message.clave] = message.posicion;

    
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, {
          action: "posicionesActualizadas",
          posiciones: posiciones
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



function abrirBusqueda(query, clave, dominioObjetivo) {
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  chrome.tabs.create({ url: url, active: false }, (tab) => {
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (tabId === tab.id && info.status === 'complete') {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          args: [clave, dominioObjetivo],
          func: (clave, dominio) => {
            setTimeout(() => {
              const resultados = Array.from(document.querySelectorAll('.tF2Cxc'));
              let posicionReal = null;

              resultados.forEach((resultado, index) => {
                const link = resultado.querySelector(`a[href*="${dominio}"]`);
                if (link && posicionReal === null) {
                  posicionReal = index + 1;
                  chrome.runtime.sendMessage({
                    action: "guardarPosicion",
                    posicion: posicionReal,
                    clave: clave
                  });
                  link.click();
                }
              });

              if (posicionReal === null) {
                console.log("No se encontró el dominio en resultados orgánicos:", dominio);
              }
            }, 3000);
          }
        });
        chrome.tabs.onUpdated.removeListener(listener);
      }
    });
  });
}
