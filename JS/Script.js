document.addEventListener("DOMContentLoaded", function () {
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const usernameInput = document.getElementById("username");
  const roleSelect = document.getElementById("role");
  const loginButton = document.getElementById("loginButton");

  togglePassword.addEventListener("click", function () {
    // Toggle the password visibility
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Change the icon based on the input type
    if (type === "text") {
      togglePassword.src = "img/closed-eyes.jpg"; // Change to the icon for hiding password
    } else {
      togglePassword.src = "img/open-eyes.jpg"; // Change to the icon for showing password
    }
  });

  // Function to check if all fields are filled
  function checkFields() {
    if (usernameInput.value && passwordInput.value && roleSelect.value) {
      loginButton.disabled = false; // Enable button if all fields are filled
    } else {
      loginButton.disabled = true; // Disable button if any field is empty
    }
  }

  // Add event listeners to input fields and select
  usernameInput.addEventListener("input", checkFields);
  passwordInput.addEventListener("input", checkFields);
  roleSelect.addEventListener("change", checkFields);
});
