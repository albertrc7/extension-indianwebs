// Esperamos unos segundos para que cargue bien todo el DOM
setTimeout(() => {
  // Google cambia a menudo su estructura, aquí buscamos enlaces con indianwebs.com
  const links = document.querySelectorAll('a[href*="indianwebs.com"]');

  if (links.length > 0) {
    // Hacemos clic en el primer enlace encontrado
    links[0].click();
  } else {
    console.log("No se encontró enlace a indianwebs.com");
  }
}, 1000);
