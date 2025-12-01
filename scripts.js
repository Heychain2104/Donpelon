/* ============================================================
   SISTEMA LOGIN / REGISTRO / SESIÓN
   ============================================================ */

// Verificar si la página NO es login.html o register.html
let pagina = window.location.pathname;

if (!pagina.includes("login") && !pagina.includes("register")) {
    let id = localStorage.getItem("sesion");
    if (!id) window.location.href = "login.html";
}


/* ------------------------------
   REGISTRO
------------------------------ */

function registrar() {
    const nombre = document.getElementById("reg-nombre").value.trim();
    const usuario = document.getElementById("reg-usuario").value.trim();
    const pass = document.getElementById("reg-pass").value.trim();
    const foto = document.getElementById("reg-foto").files[0];

    if (!nombre || !usuario || !pass) {
        shake("register-box");
        return;
    }

    // Comprobar usuario repetido
    if (localStorage.getItem("user_" + usuario)) {
        alert("Ese usuario ya existe");
        shake("register-box");
        return;
    }

    // Convertir imagen a Base64
    if (foto) {
        let reader = new FileReader();
        reader.onload = function (e) {
            guardarUsuario(nombre, usuario, pass, e.target.result);
        };
        reader.readAsDataURL(foto);
    } else {
        guardarUsuario(nombre, usuario, pass, "default.png");
    }
}

function guardarUsuario(nombre, usuario, pass, foto) {
    const datos = {
        nombre: nombre,
        usuario: usuario,
        pass: pass,
        foto: foto,
        puntos: 0
    };

    localStorage.setItem("user_" + usuario, JSON.stringify(datos));
    alert("Registrado correctamente");
    window.location.href = "login.html";
}


/* ------------------------------
   LOGIN
------------------------------ */

function iniciarSesion() {
    const usuario = document.getElementById("log-usuario").value.trim();
    const pass = document.getElementById("log-pass").value.trim();

    let datos = localStorage.getItem("user_" + usuario);
    if (!datos) {
        shake("login-box");
        return;
    }

    datos = JSON.parse(datos);

    if (datos.pass !== pass) {
        shake("login-box");
        return;
    }

    // Guardar sesión
    localStorage.setItem("sesion", usuario);
    window.location.href = "index.html";
}


/* ------------------------------
   CARGAR PANEL USUARIO ARRIBA
------------------------------ */

function cargarUsuarioActual() {
    const usuarioId = localStorage.getItem("sesion");
    if (!usuarioId) return;

    const data = JSON.parse(localStorage.getItem("user_" + usuarioId));

    if (!document.getElementById("user-nombre")) return;

    document.getElementById("user-nombre").textContent = data.nombre;
    document.getElementById("user-puntos").textContent = "⭐ " + data.puntos;
    document.getElementById("user-foto").src = data.foto;
}

cargarUsuarioActual();


/* ------------------------------
   MENÚ USUARIO DESPLEGABLE
------------------------------ */

function toggleUserMenu() {
    const menu = document.getElementById("user-menu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

function cerrarSesion() {
    localStorage.removeItem("sesion");
    window.location.href = "login.html";
}

function abrirPerfil() {
    alert("Aquí pondremos una página de perfil!");
}


/* ------------------------------
   SISTEMA DE PUNTOS AUTOMÁTICO
------------------------------ */

setInterval(() => {
    let usuarioId = localStorage.getItem("sesion");
    if (!usuarioId) return;

    let data = JSON.parse(localStorage.getItem("user_" + usuarioId));
    data.puntos++;
    localStorage.setItem("user_" + usuarioId, JSON.stringify(data));

    if (document.getElementById("user-puntos")) {
        document.getElementById("user-puntos").textContent = "⭐ " + data.puntos;
    }

}, 10000);


/* ------------------------------
   EFECTO SHAKE
------------------------------ */

function shake(id) {
    const el = document.getElementById(id);
    el.classList.add("shake");

    setTimeout(() => {
       
