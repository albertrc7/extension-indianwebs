if (!document.getElementById("indianwebs-sidebar")) {
  const sidebar = document.createElement("div");
  sidebar.id = "indianwebs-sidebar";
  sidebar.style.position = "fixed";
  sidebar.style.top = "0";
  sidebar.style.right = "0";
  sidebar.style.width = "360px";
  sidebar.style.height = "100%";
  sidebar.style.background = "rgb(255, 255, 255)";
  sidebar.style.boxShadow = "-4px 0 12px rgba(0,0,0,0.1)";
  sidebar.style.zIndex = "999999";
  sidebar.style.padding = "20px";
  sidebar.style.overflowY = "auto";
  sidebar.style.fontFamily = "'Segoe UI', Roboto, sans-serif";
  sidebar.style.color = "#111";
  sidebar.style.fontSize = "14px";
  sidebar.style.display = "flex";
  sidebar.style.flexDirection = "column";
  sidebar.style.alignItems = "center";
  sidebar.style.boxSizing = "border-box";

  sidebar.innerHTML = `
     <img src="${chrome.runtime.getURL('img/imagen.png')}" alt="Logo" style="
      width: 70px;
      height: 70px;
      object-fit: contain;
      background-color: white;
      padding: 6px;
      margin: 10px 0 10px 0;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
      border: 1px solid #ddd;
    " />

    <h1 style="
      font-size: 24px;
      font-weight: 700;
      color: #000;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
      margin-bottom: 16px;
      letter-spacing: 1px;
      text-align: center;
    ">Buscador de IndianWebs</h1>

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

    <input id="dominio" type="text" placeholder="Dominio objetivo (ej: indianwebs.com)" value="indianwebs.com" style="
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
      <div id="sidebar-posiciones" style="
        font-size: 14px;
        color: #374151;
        margin-top: 8px;
      ">Cargando resultados...</div>
    </div>

    <button id="cerrar-sidebar" style="
      margin-top: 20px;
      padding: 8px 12px;
      background: #e11d48;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
    ">❌ Cerrar</button>

    <div id="historial" style="
      margin-top: 20px;
      width: 100%;
      max-width: 280px;
      font-size: 13px;
      color: #444;
    ">
      <h3 style="margin-bottom: 8px; font-size: 15px;">📜 Historial</h3>
      <ul id="historial-lista" style="list-style: none; padding: 0; margin: 0;"></ul>
      <button id="borrar-historial" style="
        margin-top: 12px;
        padding: 6px 10px;
        background: #444;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 12px;
        cursor: pointer;
      ">🗑️ Borrar historial</button>
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
  `;
  sidebar.appendChild(css);

  document.body.appendChild(sidebar);

  document.getElementById("cerrar-sidebar").addEventListener("click", () => {
    sidebar.remove();
  });

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

    chrome.runtime.sendMessage({ action: "iniciarBusqueda", query, dominio }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error enviando mensaje:", chrome.runtime.lastError.message);
      } else {
        console.log("Mensaje enviado correctamente:", response);
      }
    });

    chrome.storage.local.get(["historialBusquedas"], (data) => {
      const historial = data.historialBusquedas || [];
      historial.unshift({ query, dominio });
      const nuevoHistorial = historial.slice(0, 10);
      chrome.storage.local.set({ historialBusquedas: nuevoHistorial }, () => {
        renderizarHistorial(nuevoHistorial);
      });
    });
  });

  chrome.runtime.sendMessage({ action: "obtenerPosiciones" }, (response) => {
    const posDiv = document.getElementById("sidebar-posiciones");
    let html = "";

    if (response.personalizada !== null) {
      html += `👉 <strong>Resultado:</strong> Posición <strong>${response.personalizada}</strong><br>`;
    } else {
      html += `👉 <strong>Resultado:</strong> Aún sin resultado<br>`;
    }

    posDiv.innerHTML = html;
  });

  chrome.storage.local.get(["historialBusquedas"], (data) => {
    const historial = data.historialBusquedas || [];
    renderizarHistorial(historial);
  });

  function renderizarHistorial(historial) {
    const lista = document.getElementById("historial-lista");
    lista.innerHTML = "";

    historial.forEach(({ query, dominio }) => {
      const li = document.createElement("li");
      li.style.marginBottom = "10px";
      li.innerHTML = `
        <div class="historial-item">
          🔍 <strong>${query}</strong><br>
          <small style="color: #555">${dominio}</small>
        </div>
      `;
      li.querySelector("div").addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("busqueda").value = query;
        document.getElementById("dominio").value = dominio;
        chrome.runtime.sendMessage({
          action: "iniciarBusqueda",
          query,
          dominio
        });
      });
      lista.appendChild(li);
    });
  }
}


chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "posicionesActualizadas") {
    const posDiv = document.getElementById("sidebar-posiciones");
    if (!posDiv) return;

    const posiciones = message.posiciones || {};
    let html = "";

    if (posiciones.personalizada !== null) {
      html += `👉 <strong>Resultado:</strong> Posición <strong>${posiciones.personalizada}</strong><br>`;
    } else {
      html += `👉 <strong>Resultado:</strong> Aún sin resultado<br>`;
    }

    posDiv.innerHTML = html;
  }
});