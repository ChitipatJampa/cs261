document.addEventListener("DOMContentLoaded", function () {
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  togglePassword.addEventListener("click", function () {
    // Toggle the password visibility
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Change the icon based on the input type
    if (type === "text") {
      togglePassword.src = "img/open-eyes.jpg"; // Change to the icon for hiding password
    } else {
      togglePassword.src = "img/closed-eyes.jpg"; // Change to the icon for showing password
    }
  });
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

