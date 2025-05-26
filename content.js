setTimeout(() => {
  // Solo seleccionamos los resultados orgánicos reales
  const resultados = Array.from(document.querySelectorAll('.tF2Cxc'));

  let posicionReal = null;

  resultados.forEach((resultado, index) => {
    const link = resultado.querySelector('a[href*="indianwebs.com"]');
    if (link && posicionReal === null) {
      posicionReal = index + 1;
      chrome.runtime.sendMessage({ action: "guardarPosicion", posicion: posicionReal, clave: clave });
      link.click();
    }
    //hola
  });

  if (posicionReal === null) {
    console.log("No se encontró enlace a indianwebs.com en resultados orgánicos");
  }
}, 3000);
