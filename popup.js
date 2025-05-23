document.getElementById("iniciar").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "iniciarBusqueda" });
});

chrome.runtime.sendMessage({ action: "obtenerPosiciones" }, (response) => {
  const posDiv = document.getElementById("posicion");
  if (response) {
    let html = "";

    if (response.diseño !== null) {
      html += `👉 <strong>Diseño web:</strong> Posición <strong>${response.diseño}</strong><br>`;
    } else {
      html += `👉 <strong>Diseño web:</strong> Aún sin resultado<br>`;
    }

    if (response.mantenimiento !== null) {
      html += `👉 <strong>Mantenimiento web:</strong> Posición <strong>${response.mantenimiento}</strong><br>`;
    } else {
      html += `👉 <strong>Mantenimiento web:</strong> Aún sin resultado<br>`;
    }

    posDiv.innerHTML = html;
  }
});
