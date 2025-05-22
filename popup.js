document.getElementById("iniciar").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "iniciarBusqueda" });
});
