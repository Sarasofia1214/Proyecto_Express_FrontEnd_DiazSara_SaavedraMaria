const registerBtn = document.querySelector(".BotonIniciar");
const emailInput = document.querySelector(".User");
const passwordInput = document.querySelector(".Password");

const API_URL = "http://62.169.28.169/auth/register";

registerBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Por favor, ingresa usuario y contraseña");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "accept": "application/json" },
      body: JSON.stringify({
        usuario: email,
        contrasena: password,
        admin: false 
      })
    });

    const data = await response.json();

    if (response.ok && data.user?.acknowledged) {
      alert("Usuario creado correctamente ✅");
      window.location.href = "../index.html"; 
    } else {
      alert(data.error || "No se pudo crear el usuario ❌");
    }

  } catch (error) {
    console.error("Error de conexión:", error);
    alert("No se pudo conectar con el servidor 🚨");
  }
});
