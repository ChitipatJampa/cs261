document.addEventListener("DOMContentLoaded", function () {
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");
  
    togglePassword.addEventListener("click", function () {

      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      if (type === "text") {
        togglePassword.src = "img/open-eyes.jpg"; 
      } else {
        togglePassword.src = "img/closed-eyes.jpg"; 
      }
    });
  });
  