if (!document.getElementById("indianwebs-sidebar")) {
  const sidebar = document.createElement("div");
  sidebar.id = "indianwebs-sidebar";
  sidebar.style.position = "fixed";
  sidebar.style.top = "0";
  sidebar.style.right = "0";
  sidebar.style.width = "360px";
  sidebar.style.height = "100%";
  sidebar.style.background = "linear-gradient(0deg, rgba(131,204,255,1) 0.4%, rgb(139, 243, 250) 100.3%)";

  sidebar.style.boxShadow = "-4px 0 12px rgba(0,0,0,0.1)";
  sidebar.style.zIndex = "999999";
  sidebar.style.padding = "20px";
  sidebar.style.overflowY = "hidden";
  sidebar.style.fontFamily = "'Segoe UI', Roboto, sans-serif";
  sidebar.style.color = "#111";
  sidebar.style.fontSize = "14px";
  sidebar.style.display = "flex";
  sidebar.style.flexDirection = "column";
  sidebar.style.alignItems = "center";
  sidebar.style.boxSizing = "border-box";
  sidebar.style.paddingBottom = "100px";

  sidebar.innerHTML = `
    <button id="cerrar-sidebar" style="
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 4px 8px;
      background: transparent;
      color: #333;
      border: none;
      font-size: 20px;
      cursor: pointer;
      z-index: 1000000;
    ">❌</button>

    <img src="${chrome.runtime.getURL('img/imagen.png')}" alt="Logo" style="
      width: 70px;
      height: 70px;
      object-fit: contain;
      background-color: white;
      margin: 10px 0;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
      " />

    <h1 style="
      font-size: 24px;
      font-weight: 700;
      color: #000;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
      margin-bottom: 16px;
      letter-spacing: 1px;
      text-align: center;
    ">BeFound®</h1>

    <input id="busqueda" type="text" placeholder="Escribe tu búsqueda..." style="
      width: 100%;
      max-width: 280px;
      padding: 10px;
      border: 1px solid #333 !important;
      border-radius: 8px;
      margin-bottom: 12px;
      font-size: 14px;
      box-sizing: border-box;
      background-color: #111 !important;
      color: white !important;
      outline: none !important;
      box-shadow: inset 0 0 0px 1000px #111 !important;
      caret-color: white !important;
    " />

    <input id="dominio" type="text" placeholder="Dominio objetivo (ej: indianwebs.com)" style="
      width: 100%;
      max-width: 280px;
      padding: 10px;
      border: 1px solid #333 !important;
      border-radius: 8px;
      margin-bottom: 12px;
      font-size: 14px;
      box-sizing: border-box;
      background-color: #111 !important;
      color: white !important;
      outline: none !important;
    " />

    <button id="iniciar" style="
      background-color: #2563eb;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 10px 20px;
      margin-bottom: 16px;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      transition: background-color 0.3s ease, transform 0.2s ease;
    ">Iniciar búsqueda</button>

    <div class="card" style="
      background: #ffffffc0;
      border-radius: 10px;
      padding: 16px 20px;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
      width: 100%;
      max-width: 280px;
      text-align: center;
      transition: all 0.3s ease-in-out;
    ">
      <h2 style="margin-top: 0;">Resultados:</h2>
      <div id="sidebar-posiciones" style="font-size: 14px; color: #374151; margin-top: 8px;">👉 <strong>Resultado:</strong> Aún sin resultado<br></div>
    </div>

   <div id="historial" style="
  flex-grow: 1;
  overflow-y: auto;
  width: 100%;
  max-width: 280px;
  font-size: 13px;
  color: #444;
  margin-top: 20px;
  padding-bottom: 80px; /* para evitar que se tape con el CTA fijo abajo */
  box-sizing: border-box;
">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h3 style="margin: 0; font-size: 15px;">Historial</h3>
      <button id="borrar-historial" style="
        background: transparent;
        color: #888;
        border: none;
        font-size: 16px;
        padding: 3px;
        cursor: pointer;
      ">🗑️</button>
      </div>
      <ul id="historial-lista" style="list-style: none; padding: 0; margin: 0;"></ul>
     
      </div>

      <button id="exportar-pdf" style="
        background-color: #6b7280;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 6px 12px;
        font-size: 13px;
        cursor: pointer;
        margin-top: 12px;
      ">📄 Exportar historial a PDF</button>

    <div id="cta-seo" style="
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 12px 16px;
      background: #f9fafb;
      border-top: 1px solid #ddd;
      text-align: center;
      font-size: 13px;
      color: #111;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
    ">
      <span style="margin-right: 8px;">¿Necesitas ayuda con el SEO?</span>
      <a href="https://www.indianwebs.com" target="_blank" style="
        background-color: #2563eb;
        color: white;
        text-decoration: none;
        padding: 6px 12px;
        border-radius: 5px;
        font-weight: 500;
        font-size: 13px;
        white-space: nowrap;
      ">Llámanos</a>
    </div>
  `;

  const css = document.createElement("style");
  css.textContent = `
    ::placeholder {
      color: #ccc !important;
      opacity: 1 !important;
    }
    input:-webkit-autofill {
      background-color: #111 !important;
      color: white !important;
      box-shadow: inset 0 0 0px 1000px #111 !important;
      -webkit-text-fill-color: white !important;
      caret-color: white !important;
    }
    .historial-item {
      background: #f0f0f0;
      padding: 10px 12px;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      color: #111;
      cursor: pointer;
      transition: background 0.2s ease;
    }
    .historial-item:hover {
      background: #e2e2e2;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  sidebar.appendChild(css);

  document.body.appendChild(sidebar);

  // Cargar historial al iniciar sin esperar a búsqueda
  chrome.storage.local.get(["historialBusquedas"], (data) => {
    const historialGuardado = data.historialBusquedas || [];
    renderizarHistorial(historialGuardado);
  });

  document.getElementById("cerrar-sidebar").addEventListener("click", () => {
    sidebar.remove();
  });

  // Mover botón de borrar historial fuera del contenedor y colocarlo a la derecha del título
  const historialHeader = sidebar.querySelector("#historial h3");
  const borrarBtn = document.getElementById("borrar-historial");
  borrarBtn.style.marginTop = "0";
  borrarBtn.style.background = "transparent";
  borrarBtn.style.color = "#888";
  borrarBtn.style.border = "none";
  borrarBtn.style.fontSize = "16px";
  borrarBtn.style.padding = "3";
  borrarBtn.style.cursor = "pointer";
  borrarBtn.style.marginLeft = "auto";
  borrarBtn.innerHTML = "🗑️";
  const headerContainer = document.createElement("div");
  headerContainer.style.display = "flex";
  headerContainer.style.justifyContent = "space-between";
  headerContainer.style.alignItems = "center";
  headerContainer.appendChild(historialHeader);
  headerContainer.appendChild(borrarBtn);
  sidebar.querySelector("#historial").insertBefore(headerContainer, sidebar.querySelector("#historial ul"));
  historialHeader.style.margin = "0";
  borrarBtn.style.marginRight = "0";

document.getElementById("borrar-historial").addEventListener("click", () => {
  chrome.storage.local.remove("historialBusquedas", () => {
    renderizarHistorial([]);
  });
});

document.getElementById("iniciar").addEventListener("click", () => {
  const query = document.getElementById("busqueda").value.trim();
  const dominio = document.getElementById("dominio").value.trim();

  if (!query || !dominio) {
    alert("Debes introducir tanto una búsqueda como un dominio.");
    return;
  }

  const clave = `${query}_${dominio}_${Date.now()}`;
  const fecha = Date.now();

  document.getElementById("sidebar-posiciones").innerHTML = `
    <span id="loading-spinner" style="display: inline-block; width: 16px; height: 16px; border: 2px solid #ccc; border-top: 2px solid #2563eb; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 8px;"></span>
    <span id="loading-text">Buscando posición...</span>
  `;

  chrome.runtime.sendMessage({ action: "iniciarBusqueda", query, dominio, clave });

  chrome.storage.local.get(["historialBusquedas"], (data) => {
    const historial = data.historialBusquedas || [];
    historial.unshift({ query, dominio, clave, posicion: "cargando", fecha });
    const nuevoHistorial = historial.slice(0, 10);
    chrome.storage.local.set({ historialBusquedas: nuevoHistorial }, () => {
      renderizarHistorial(nuevoHistorial);
    });
  });

  setTimeout(() => {
    chrome.storage.local.get(["historialBusquedas"], (data) => {
      let historial = data.historialBusquedas || [];
      historial = historial.map(item =>
        item.clave === clave && item.posicion === "cargando"
          ? { ...item, posicion: "NoEncontrado" }
          : item
      );
      chrome.storage.local.set({ historialBusquedas: historial }, () => {
        renderizarHistorial(historial);
      });
    });
  }, 30000);
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "posicionesActualizadas" && message.clave) {
    chrome.storage.local.get(["historialBusquedas"], (data) => {
      let historial = data.historialBusquedas || [];
      historial = historial.map(item =>
        item.clave === message.clave ? { ...item, posicion: message.posiciones[message.clave] } : item
      );
      chrome.storage.local.set({ historialBusquedas: historial }, () => {
        renderizarHistorial(historial);
      });
    });

    const posDiv = document.getElementById("sidebar-posiciones");
    if (posDiv) {
      posDiv.innerHTML = `👉 <strong>Resultado:</strong> Posición <strong>${message.posiciones[message.clave]}</strong><br>`;
    }
  }
});

document.getElementById("exportar-pdf").addEventListener("click", () => {
  chrome.storage.local.get(["historialBusquedas"], (data) => {
    const historial = data.historialBusquedas || [];

    const htmlContent = `
      <html>
        <head>
          <title>Historial de búsquedas</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { font-size: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f0f0f0; }
          </style>
        </head>
        <body>
          <h1>Historial de búsquedas</h1>
          <table>
            <tr>
              <th>Consulta</th>
              <th>Dominio</th>
              <th>Resultado</th>
              <th>Fecha</th>
            </tr>
            ${historial.map(item => `
              <tr>
                <td>${item.query}</td>
                <td>${item.dominio}</td>
                <td>${item.posicion || '–'}</td>
                <td>${item.fecha ? new Date(item.fecha).toLocaleString() : ''}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 300);
    } else {
      alert("No se pudo abrir la ventana de impresión. Desactiva el bloqueador de ventanas emergentes.");
    }
  });
});

function renderizarHistorial(historial) {
  const lista = document.getElementById("historial-lista");
  lista.innerHTML = "";

  historial.forEach(({ query, dominio, posicion, clave, fecha }) => {
    const li = document.createElement("li");
    li.style.marginBottom = "10px";
    const fechaStr = fecha ? new Date(fecha).toLocaleString() : "";

    li.innerHTML = `
      <div class="historial-item" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
        <div>
          🔍 <strong>${query}</strong><br>
          <small style="color: #555">${dominio}</small><br>
          <small style="color: #999; font-size: 11px;">${fechaStr}</small>
        </div>
        ${posicion === 'cargando'
          ? `<div style="width: 16px; height: 16px; border: 2px solid #ccc; border-top: 2px solid #2563eb; border-radius: 50%; animation: spin 1s linear infinite;"></div>`
          : posicion === 'NoEncontrado'
            ? `<div style="font-size: 16px; color: red; margin-left: 10px;"><span style="color: red; font-size:12px;">#NoEncontrado</span></div>`
            : posicion !== null
              ? `<div style="font-size: 12px; color: #2563eb; margin-left: 10px; white-space: nowrap;">#${posicion}</div>`
              : ""}
      </div>
    `;

    li.querySelector(".historial-item").addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("busqueda").value = query;
      document.getElementById("dominio").value = dominio;
      const nuevaClave = `${query}_${dominio}_${Date.now()}`;

      chrome.runtime.sendMessage({
        action: "iniciarBusqueda",
        query,
        dominio,
        clave: nuevaClave
      });

      chrome.storage.local.get(["historialBusquedas"], (data) => {
        const historial = data.historialBusquedas || [];
        historial.unshift({ query, dominio, clave: nuevaClave, posicion: "cargando", fecha: Date.now() });
        const nuevoHistorial = historial.slice(0, 10);
        chrome.storage.local.set({ historialBusquedas: nuevoHistorial }, () => {
          renderizarHistorial(nuevoHistorial);
        });
      });

      setTimeout(() => {
        chrome.storage.local.get(["historialBusquedas"], (data) => {
          let historial = data.historialBusquedas || [];
          historial = historial.map(item =>
            item.clave === nuevaClave && item.posicion === "cargando"
              ? { ...item, posicion: "NoEncontrado" }
              : item
          );
          chrome.storage.local.set({ historialBusquedas: historial }, () => {
            renderizarHistorial(historial);
          });
        });
      }, 30000);
    });

    lista.appendChild(li);
  });
}


}
