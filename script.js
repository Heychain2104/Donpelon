// Lista de juegos de Scratch (solo tu juego por ahora)
const juegos = [
    "https://scratch.mit.edu/projects/1190684640/embed"
];

// Contenedor donde se insertará el juego
const contenedor = document.getElementById("juegos-container");

// Crear los iframes dinámicamente
juegos.forEach(url => {
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.allowTransparency = true;
    iframe.frameBorder = "0";
    iframe.scrolling = "no";
    iframe.allowFullscreen = true;

    contenedor.appendChild(iframe);
});
