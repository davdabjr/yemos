// ============================================================
// YEMOS – SCRIPT CLEAN + ANIMATIONS (Opción C)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
     NAVBAR SCROLL ANIMATION
     ============================================================ */
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* ============================================================
     AOS (Animate On Scroll)
     ============================================================ */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-quart"
    });
  }

  /* ============================================================
     YEMI CHATBOT INTEGRATION
     ============================================================ */
  console.log("🧠 Yemi: inicializando...");

  fetch("yemi/yemi.html")
    .then(response => {
      console.log("📄 Yemi: archivo HTML encontrado:", response.ok);
      return response.text();
    })
    .then(data => {
      console.log("✅ Yemi: HTML cargado correctamente");
      const chatContainer = document.createElement("div");
      chatContainer.innerHTML = data;
      document.body.appendChild(chatContainer);

      // Insertar el JS propiamente de Yemi
      const script = document.createElement("script");
      script.src = "yemi/yemi.js";
      document.body.appendChild(script);

      console.log("⚙️ Yemi: script yemi.js insertado");
    })
    .catch(err => console.error("❌ Error cargando Yemi:", err));

});
