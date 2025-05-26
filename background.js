let posiciones = {
  diseño: null,
  mantenimiento: null
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "iniciarBusqueda") {
    posiciones = { diseño: null, mantenimiento: null }; // resetear resultados

    abrirBusqueda("Diseño páginas web Barcelona", "diseño");
    abrirBusqueda("Mantenimiento web Barcelona", "mantenimiento");
  }

  if (message.action === "guardarPosicion") {
    if (message.clave) {
      posiciones[message.clave] = message.posicion;
    }
  }

  if (message.action === "obtenerPosiciones") {
    sendResponse(posiciones);
  }
});

function abrirBusqueda(query, clave) {
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  chrome.tabs.create({ url: url }, (tab) => {
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (tabId === tab.id && info.status === 'complete') {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          args: [clave],
          func: (clave) => {
            setTimeout(() => {
              // Solo resultados orgánicos reales (ignora anuncios, mapas, etc.)
              const resultados = Array.from(document.querySelectorAll('.tF2Cxc'));
              let posicionReal = null;

              resultados.forEach((resultado, index) => {
                const link = resultado.querySelector('a[href*="indianwebs.com"]');
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
                console.log("No se encontró enlace a indianwebs.com en resultados orgánicos");
              }
            }, 3000);
          }
        });
        chrome.tabs.onUpdated.removeListener(listener);
      }
    });
  });
}
