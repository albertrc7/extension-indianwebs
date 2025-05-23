setTimeout(() => {
  const resultados = Array.from(document.querySelectorAll('div.g, div.MjjYud'))
    .filter(div => div.querySelector('a'));

  let posicionReal = null;

  resultados.forEach((resultado, index) => {
    const link = resultado.querySelector('a[href*="indianwebs.com"]');
    if (link && posicionReal === null) {
      posicionReal = index + 1;
      chrome.runtime.sendMessage({ action: "guardarPosicion", posicion: posicionReal });
      link.click();
    }
  });

  if (posicionReal === null) {
    console.log("No se encontró enlace a indianwebs.com");
  }
}, 3000);
