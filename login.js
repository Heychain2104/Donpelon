// Mostrar login
function mostrarLogin() {
    document.getElementById("login-box").classList.add("activa");
    document.getElementById("registro-box").classList.remove("activa");
}

// Mostrar registro
function mostrarRegistro() {
    document.getElementById("registro-box").classList.add("activa");
    document.getElementById("login-box").classList.remove("activa");
}

// Registrar usuario
function registrar() {
    let usuario = document.getElementById("reg-usuario").value;
    let pass = document.getElementById("reg-pass").value;
    let foto = document.getElementById("reg-foto").files[0];

    if (!usuario || !pass) return shake("registro-box");

    let reader = new FileReader();
    reader.onload = function(e) {
        let datos = {
            usuario,
            pass,
            foto: e.target.result,
            puntos: 0
        };

        localStorage.setItem("user_" + usuario, JSON.stringify(datos));

        alert("Cuenta creada");
        mostrarLogin();
    };

    if (foto) reader.readAsDataURL(foto);
    else {
        let datos = { usuario, pass, foto: "", puntos: 0 };
        localStorage.setItem("user_" + usuario, JSON.stringify(datos));
        alert("Cuenta creada");
        mostrarLogin();
    }
}

// Login
function login() {
    let usuario = document.getElementById("login-usuario").value;
    let pass = document.getElementById("login-pass").value;

    let data = localStorage.getItem("user_" + usuario);
    if (!data) return shake("login-box");

    data = JSON.parse(data);

    if (data.pass !== pass) return shake("login-box");

    localStorage.setItem("sesion", usuario);

    window.location.href = "index.html";
}

// Shake
function shake(id) {
    let box = document.getElementById(id);
    box.classList.add("shake");

    setTimeout(() => box.classList.remove("shake"), 400);
}
