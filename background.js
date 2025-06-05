
let posiciones = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "iniciarBusqueda") {
    const { query, dominio, clave, pais, idioma } = message;
    posiciones[clave] = null;
    abrirBusqueda(query, clave, dominio, pais, idioma);
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

function abrirBusqueda(query, clave, dominioObjetivo, pais = "us", idioma = "en") {
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}&num=100&gl=${pais}&hl=${idioma}`;


  chrome.tabs.create({ url: url, active: false }, (tab) => {
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (tabId === tab.id && info.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(listener);

        const delay = Math.floor(Math.random() * 1000);

        setTimeout(() => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            args: [clave, dominioObjetivo],
            func: (clave, dominio) => {
              const intervalo = setInterval(() => {
                const resultados = Array.from(document.querySelectorAll('.tF2Cxc'));
                let posicionReal = null;

                resultados.forEach((resultado, index) => {
                  const link = resultado.querySelector(`a[href*="${dominio}"]`);
                  if (link && posicionReal === null) {
                    posicionReal = index + 1;

                    const data = {
                      action: "guardarPosicion",
                      posicion: posicionReal,
                      clave: clave
                    };

                    const tag = document.createElement('div');
                    tag.id = "mensaje-a-extension";
                    tag.setAttribute('data-msg', JSON.stringify(data));
                    document.body.appendChild(tag);

                    link.click();
                  }
                });

                if (posicionReal !== null || resultados.length > 0) {
                  clearInterval(intervalo);
                }
              }, 100);
            }
          });

          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
              const observer = new MutationObserver(() => {
                const tag = document.getElementById("mensaje-a-extension");
                if (tag) {
                  const data = JSON.parse(tag.getAttribute("data-msg"));
                  chrome.runtime.sendMessage(data);
                  tag.remove();
                }
              });

              observer.observe(document.body, { childList: true });
            }
          });
        }, delay);
      }
    });
  });
}
