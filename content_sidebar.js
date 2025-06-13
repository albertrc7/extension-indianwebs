if (!document.getElementById("indianwebs-sidebar")) {
  const sidebar = document.createElement("div");
  sidebar.id = "indianwebs-sidebar";
  sidebar.style.position = "fixed";
  sidebar.style.top = "0";
  sidebar.style.right = "0";
  sidebar.style.width = "360px";
  sidebar.style.height = "100vh";
  sidebar.style.background = "linear-gradient(0deg, rgba(131,204,255,1) 0.4%, rgb(139, 243, 250) 100.3%)";
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
  sidebar.style.paddingBottom = "40px";

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
      background-color: #fff !important;
      color: #333 !important;
      outline: none !important;
      box-shadow: inset 0 0 0px 1000px #fff !important;
      caret-color: #333 !important;
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
      background-color: #fff !important;
      box-shadow: inset 0 0 0px 1000px #fff !important;
      color: #333 !important;
      outline: none !important;
      caret-color: #333 !important;
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



    <div id="opciones-toggle" style="width: 100%; max-width: 280px; margin-bottom: 8px; cursor: pointer; font-size: 13px; color: #000; display: flex; align-items: center; justify-content: space-between;">
    <span><strong>Más opciones</strong></span>
    <span id="flecha-toggle">▼</span>
   </div>

   <div id="opciones-avanzadas" style="width: 100%; max-width: 280px; margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; gap: 10px;">
        <div style="flex: 1;">
          <label for="pais" style="font-size: 12px; color: #000; display: block; margin-bottom: 4px;">País:</label>
          <select id="pais" style="
            width: 100%;
            padding: 6px;
            font-size: 12px;
            border-radius: 6px;
            border: 1px solid #333;
            background-color: white;
            color: black;
            outline: none;
          ">
            <option value="us">🇺🇸 United States</option>
            <option value="es" selected>🇪🇸 España</option>
            <option value="fr">🇫🇷 France</option>
            <option value="de">🇩🇪 Germany</option>
            <option value="mx">🇲🇽 Mexico</option>
            <option value="ar">🇦🇷 Argentina</option>
            <option value="br">🇧🇷 Brazil</option>
          </select>
        </div>
        <div style="flex: 1;">
          <label for="idioma" style="font-size: 12px; color: #000; display: block; margin-bottom: 4px;">Idioma:</label>
          <select id="idioma" style="
            width: 100%;
            padding: 6px;
            font-size: 12px;
            border-radius: 6px;
            border: 1px solid #333;
            background-color: white;
            color: black;
            outline: none;
          ">
            <option value="en">🇬🇧 English</option>
            <option value="es" selected>🇪🇸 Español</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="pt">🇧🇷 Português</option>
            <option value="it">🇮🇹 Italiano</option>
          </select>
        </div>
      </div>
   </div>
 
 
    <!-- Bloque contenedor del historial -->
    <div id="bloque-historial" style="
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(6px);
      border-radius: 16px;
      padding: 16px 14px;
      margin: 10px
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      width: 100%;
      max-width: 300px;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    ">

    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 8px 0;">
      <h3 style="
        margin: 0;
      font-size: 18px;
      font-weight: 600;
      margin-left: 12px;
      background: linear-gradient(90deg, #2563eb,rgb(0, 127, 212));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      
      ">Historial</h3>
      
      <button id="borrar-historial" style="
        background: transparent;
        color: #2563eb;
        border: none;
        font-size: 20px;
        cursor: pointer;
        padding: 4px;
        border-radius: 50%;
      ">🗑️</button>
    </div>



    <!-- Lista de historial -->
    <div id="historial" style="
      overflow-y: auto;
      width: 100%;
      max-height: 250px;
      padding-right: 4px;
      padding-top: 10px;
    ">
      <ul id="historial-lista" style="list-style: none; padding: 0; margin: 0;"></ul>
    </div>
    </div>



        
    <div id="cta-seo" style="
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: transparent; /* Fondo transparente para que se vea el fondo de la extensión */
      text-align: center;
      font-size: 13px;
      color: #111;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    ">
      <!-- Botones de exportación colocados en la parte superior con fondo transparente -->
      <div style="margin-bottom: 16px; width: 90%; display: flex; flex-direction: row; gap: 10px; background: transparent;">
        <button id="exportar-pdf" style="
          background-color: #6b7280;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          font-size: 13px;
          cursor: pointer;
        ">📄 Exportar historial a PDF</button>

        <button id="exportar-csv" style="
          background-color: #10b981;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          font-size: 13px;
          cursor: pointer;
        ">📁 Exportar historial a CSV</button>
      </div>

      <!-- Texto y enlace de contacto con fondo blanco ocupando todo el espacio -->
      <div style="display: flex; justify-content: center; gap: 10px; width: 100%; align-items: center; background-color: #ffffff; padding: 8px; box-sizing: border-box; width: 100%; position: relative;">
        <span style="margin-right: 8px; flex-grow: 1;">¿Necesitas ayuda con el SEO?</span>
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
    </div>

  `;

  const css = document.createElement("style");
  css.textContent = `
  
  ::placeholder {
    color: #777 !important;
    opacity: 1 !important;
  }
  
  input {
    width: 100%;
    max-width: 280px;
    padding: 10px 14px;
    border: 2px solid #ccc;
    border-radius: 10px;
    margin-bottom: 12px;
    font-size: 14px;
    background-color: #fff !important;
    color: #333 !important;
    caret-color: #2563eb;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
  }

  input:hover {
    border-color: #999;
  }
    
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
  background-color: #fff !important;
  -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
  box-shadow: 0 0 0px 1000px #fff inset !important;
  -webkit-text-fill-color: #333 !important;
  color: #333 !important;
  caret-color: #2563eb !important;
  transition: background-color 9999s ease-out, color 9999s ease-out;
  }

 #historial {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
  border-radius: 12px;
  padding: 0 8px 8px 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  max-height: 500px;
  min-height: 150px; 
  box-sizing: border-box;
    max-height: calc(100vh - 250px); /* Ajusta la altura del historial para que sea dinámico */
  overflow-y: auto; /* Habilita el scroll */
}

#historial-lista {
  padding: 0;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
}

#historial-vacio {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 14px;
  color: #aaa;
  font-style: italic;
}

.historial-item .posicion {
  font-size: 16px; /* Tamaño de fuente más grande */
  font-weight: bold; /* Hacer que el número se vea más prominente */
  color: #333; /* Color por defecto */
  margin-left: 10px;
  display: inline-block;
  transition: color 0.3s ease;
}

.historial-item .posicion.bajo {
  color: #22c55e; /* Verde para posiciones del 1 al 5 */
}

.historial-item .posicion.medio {
  color: #eab308; /* Naranja para posiciones del 6 al 20 */
}

.historial-item .posicion.alto {
  color: #6b7280; /* Gris para posiciones del 21 en adelante */
}

.historial-item {
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.historial-item:hover {
  background: #f9fafb;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
}

#historial::-webkit-scrollbar {
  width: 6px;
}

#historial::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
    
#historial::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 4px;
}

.borde-verde {
  border: 1px solid rgba(34, 197, 94, 0.2);
  box-shadow: 0 0 px 4px rgba(34, 197, 94, 0.15);
}

.borde-naranja {
  border: 1px solid rgba(234, 179, 8, 0.2);
  box-shadow: 0 0 4px 4px rgba(234, 179, 8, 0.15);
}

.borde-gris {
  border: 1px solid rgba(107, 114, 128, 0.2);
  box-shadow: 0 0 4px 4px rgba(107, 114, 128, 0.12);
}

.borde-rojo {
  border: 1px solid rgba(239, 68, 68, 0.2);
  box-shadow: 0 0 4px 4px rgba(239, 68, 68, 0.15);
}

.borde-cargando {
  
  border: 1px solid #ccc !important;
  box-shadow: 0 0 4px 4px rgba(134, 134, 134, 0.15);
  
  
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
 
@keyframes girarBorde {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

button:active {
  transform: translateY(1px);
  box-shadow: none;
}

#opciones-avanzadas {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}
  
#opciones-avanzadas.abierto {
    max-height: 400px;
}

#historial::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

#historial::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.35);
}

/* Responsividad de la sidebar */
@media (max-width: 768px) {
    #indianwebs-sidebar {
        width: 100%; 
        padding: 10px; 
        box-sizing: border-box;
        overflow: auto; 
        height: 100vh; 
      }

  #indianwebs-sidebar h1 {
    font-size: 18px; /* Reducción del tamaño del título */
  }

  #indianwebs-sidebar input, #indianwebs-sidebar button {
    max-width: 100%; 
    font-size: 12px; 
  }

  #indianwebs-sidebar #opciones-toggle {
    font-size: 12px; 
  }

  #indianwebs-sidebar #bloque-historial {
    max-width: 100%; 
  }

  #historial {
    max-height: 250px; 
  }

  #indianwebs-sidebar img {
    width: 50px; 
    height: 50px;
  }
}
  `;

sidebar.appendChild(css);

document.body.appendChild(sidebar);

document.getElementById("opciones-toggle").addEventListener("click", () => {
  const opciones = document.getElementById("opciones-avanzadas");
  const flecha = document.getElementById("flecha-toggle");

  opciones.classList.toggle("abierto");
  const abierto = opciones.classList.contains("abierto");
  flecha.textContent = abierto ? "▲" : "▼";
});

// Añadir el mensaje "Sin historial" cuando se cargue la extensión
const historialVacio = document.createElement('div');
historialVacio.id = "historial-vacio";
historialVacio.textContent = "Sin historial";

// Asegúrate de añadirlo antes de renderizar cualquier historial
document.getElementById("historial").appendChild(historialVacio);

  // Cargar historial al iniciar
chrome.storage.local.get(["historialBusquedas"], (data) => {
   const historialGuardado = data.historialBusquedas || [];
   renderizarHistorial(historialGuardado);
   actualizarHistorial();
});

  // Cerrar el sidebar
document.getElementById("cerrar-sidebar").addEventListener("click", () => {
   sidebar.remove();
});

  // Borrar historial
document.getElementById("borrar-historial").addEventListener("click", () => {
    chrome.storage.local.remove("historialBusquedas", () => {
    renderizarHistorial([]);
  });
});

document.getElementById("iniciar").addEventListener("click", () => {
  const query = document.getElementById("busqueda").value.trim();
  const dominio = document.getElementById("dominio").value.trim();
  const pais = document.getElementById("pais").value;
  const idioma = document.getElementById("idioma").value;


    if (!query || !dominio) {
      alert("Debes introducir tanto una búsqueda como un dominio.");
      return;
    }

    const clave = `${query}_${dominio}_${Date.now()}`;
    const fecha = Date.now();


    chrome.runtime.sendMessage({ action: "iniciarBusqueda", query, dominio, clave, pais, idioma });



    chrome.storage.local.get(["historialBusquedas"], (data) => {
      const historial = data.historialBusquedas || [];
      historial.unshift({ query, dominio, clave, posicion: "cargando", fecha, pais, idioma });
      const nuevoHistorial = historial.slice(0, 20);
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
    }, 10000);
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

  document.getElementById("exportar-csv").addEventListener("click", () => {
    chrome.storage.local.get(["historialBusquedas"], (data) => {
      const historial = data.historialBusquedas || [];

      let csvContent = `"Consulta";"Dominio";"Posición";"Fecha";"País";"Idioma"\n`;

      historial.forEach(item => {
        const query = `"${item.query}"`;
        const dominio = `"${item.dominio}"`;
        const posicion = `"${item.posicion === 'NoEncontrado' ? 'No Encontrado' : (item.posicion || '–')}"`;
        const fecha = `"${item.fecha ? new Date(item.fecha).toLocaleDateString() : ''}"`;
        const pais = `"${item.pais?.toUpperCase() || ''}"`;
        const idioma = `"${item.idioma?.toLowerCase() || ''}"`;
        csvContent += `${query};${dominio};${posicion};${fecha};${pais};${idioma}\n`;

      });

      const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "historial.csv");
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });



  document.getElementById("exportar-pdf").addEventListener("click", () => {
    chrome.storage.local.get(["historialBusquedas"], (data) => {
      const historial = data.historialBusquedas || [];

      const getColor = (pos) => {
        const num = parseInt(pos);
        if (!isNaN(num)) {
          if (num >= 1 && num <= 5) return "#22c55e";    // verde
          if (num >= 6 && num <= 20) return "#eab308";   // amarillo
          if (num >= 21 && num <= 100) return "#6b7280"; // gris
        }
        return "#ef4444"; // rojo para "No Encontrado"
      };

      const htmlContent = `
      <html>
        <head>
          <title>Historial de búsquedas</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { font-size: 20px; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; }
            th { background-color: #f0f0f0; }
            td:nth-child(3), th:nth-child(3),
            td:nth-child(4), th:nth-child(4) {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <h1>Historial de búsquedas</h1>
          <table>
            <tr>
              <th>Consulta</th>
              <th>Dominio</th>
              <th>Posición</th>
              <th>Fecha</th>
            </tr>
            ${historial.map(item => {
        const textoPos = item.posicion === 'NoEncontrado' ? 'No Encontrado' : (item.posicion || '–');
        const color = getColor(textoPos);
        return `
                <tr>
                  <td>${item.query}</td>
                  <td>${item.dominio}</td>
                  <td style="color: ${color}; font-weight: bold;">${textoPos}</td>
                  <td>${item.fecha ? new Date(item.fecha).toLocaleDateString() : ''}</td>
                </tr>
              `;
      }).join('')}
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

function actualizarHistorial() {
  const historialLista = document.getElementById("historial-lista");
  const historialVacio = document.getElementById("historial-vacio");

  // Si el historial está vacío, mostramos el mensaje de "Sin historial"
  if (historialLista.children.length === 0) {
    historialVacio.style.display = 'flex';
  } else {
    // Si hay elementos, ocultamos el mensaje
    historialVacio.style.display = 'none';
  }
}


// También debes actualizar el historial cuando se eliminen elementos
document.getElementById("borrar-historial").addEventListener("click", () => {
  const historialLista = document.getElementById("historial-lista");

  // Borrar todos los elementos del historial
  historialLista.innerHTML = '';

  // Actualizar el historial después de borrar los elementos
  actualizarHistorial();
});

function renderizarHistorial(historial) {
  const lista = document.getElementById("historial-lista");
  lista.innerHTML = "";

    historial.forEach(({ query, dominio, posicion, clave, fecha, pais, idioma }) => {
      const li = document.createElement("li");
      li.style.marginBottom = "10px";
      const fechaStr = fecha ? new Date(fecha).toLocaleDateString() : "";

      let color = "";
      if (!isNaN(posicion)) {
        const num = parseInt(posicion);
        if (num >= 1 && num <= 5) {
          color = "green";
        } else if (num >= 6 && num <= 20) {
          color = "orange";
        } else if (num >= 21 && num <= 100) {
          color = "gray";
        }
      }

      let bordeClass = "";
        if (posicion === 'cargando') {
          bordeClass = "borde-cargando";
        } else if (posicion === 'NoEncontrado') {
          bordeClass = "borde-rojo";
        } else if (!isNaN(posicion)) {
          const num = parseInt(posicion);
          if (num >= 1 && num <= 5) bordeClass = "borde-verde";
          else if (num >= 6 && num <= 20) bordeClass = "borde-naranja";
          else if (num >= 21 && num <= 100) bordeClass = "borde-gris";
        }

      const paisIdiomaStr = `${pais?.toUpperCase() || "??"}/${idioma?.toLowerCase() || "??"}`;

      li.innerHTML = `
        <div class="historial-item ${bordeClass}" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
          <div>
            🔍 <strong>${query}</strong><br>
            <small style="color: #555">${dominio}</small><br>
            <small style="color: #999; font-size: 11px;">${fechaStr} – ${paisIdiomaStr}</small>
          </div>
          ${posicion === 'cargando'
            ? `<div style="width: 16px; height: 16px; border: 2px solid #ccc; border-top: 2px solid #2563eb; border-radius: 50%; animation: spin 1s linear infinite;"></div>`
            : posicion === 'NoEncontrado'
              ? `<div style="font-size: 16px; color: red; margin-left: 10px;"><span style="color: red; font-size:12px;">#NoEncontrado</span></div>`
              : posicion !== null
                ? `<div class="posicion ${posicion <= 5 ? 'bajo' : posicion <= 20 ? 'medio' : 'alto'}">${posicion}</div>`  /* Asignar clase según el rango de posición */
                : ""}
        </div>
`;

      li.querySelector(".historial-item").addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("busqueda").value = query;
        document.getElementById("dominio").value = dominio;

        // Rellenar los select también:
        document.getElementById("pais").value = pais;
        document.getElementById("idioma").value = idioma;

        const nuevaClave = `${query}_${dominio}_${Date.now()}`;

        chrome.runtime.sendMessage({
          action: "iniciarBusqueda",
          query,
          dominio,
          clave: nuevaClave,
          pais,
          idioma
        });

        chrome.storage.local.get(["historialBusquedas"], (data) => {
          const historial = data.historialBusquedas || [];
          historial.unshift({
            query,
            dominio,
            clave: nuevaClave,
            posicion: "cargando",
            fecha: Date.now(),
            pais,
            idioma
          });
          const nuevoHistorial = historial.slice(0, 20);
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
        }, 10000);
      });

      lista.appendChild(li);
    });
    actualizarHistorial();
  }

}
