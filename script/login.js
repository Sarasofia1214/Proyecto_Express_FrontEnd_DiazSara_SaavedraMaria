// Selección de elementos
const loginBtn = document.querySelector(".BotonIniciar");
const emailInput = document.querySelector(".User");
const passwordInput = document.querySelector(".Password");

const API_URL = "http://62.169.28.169/auth/login";

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Por favor, ingresa el usuario y la contraseña.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        usuario: email,
        contrasena: password
      })
    });

    const data = await response.json();
    const token = data[0]?.token;
    const usuario = data[1]?.usuario;
    const isAdmin = data[1]?.admin;

    if (response.ok && token) {
      // 🔑 Guardar sesión
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", usuario);
      localStorage.setItem("isAdmin", isAdmin); 

      // Redirección según el rol
      if (isAdmin) {
        window.location.href = "../html/inicioAdmin.html";
      } else {
        window.location.href = "../html/inicioUser.html";
      }

    } else {
      alert("Usuario o contraseña incorrectos ❌");
    }

  } catch (error) {
    console.error("Error de conexión:", error);
    alert("No se pudo conectar con el servidor 🚨");
  }
});
