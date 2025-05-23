document.getElementById("iniciar").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "iniciarBusqueda" });
});

chrome.runtime.sendMessage({ action: "obtenerPosiciones" }, (response) => {
  const posDiv = document.getElementById("posicion");
  if (response) {
    let html = "";

    if (response.diseño !== null) {
      html += `👉 Diseño web: posición ${response.diseño}<br>`;
    } else {
      html += `👉 Diseño web: aún sin resultado<br>`;
    }

    if (response.mantenimiento !== null) {
      html += `👉 Mantenimiento web: posición ${response.mantenimiento}<br>`;
    } else {
      html += `👉 Mantenimiento web: aún sin resultado<br>`;
    }

    posDiv.innerHTML = html;
  }
});
