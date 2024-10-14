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

  // Add event listeners to input fields and select
  usernameInput.addEventListener("input", checkFields);
  passwordInput.addEventListener("input", checkFields);
  roleSelect.addEventListener("change", checkFields);
});

function submitLogin(event) {
  event.preventDefault(); // Prevent the form from submitting normally
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }), // Send the username and password
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("message").innerText =
        data.response || "Login failed.";
    })
    .catch((error) => console.error("Error:", error));
}

function call_REST_API_Hello() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const url =
    "http://localhost:8080/User?" +
    new URLSearchParams({ myName: username, lastName: password }).toString();

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((text) => {
      document.getElementById("message").innerText = text;
    })
    .catch((error) => console.error("Error:", error));
}
