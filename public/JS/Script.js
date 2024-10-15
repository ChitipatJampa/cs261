document.addEventListener("DOMContentLoaded", function () {
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  togglePassword.addEventListener("click", function () {
    // Toggle the password visibility
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Change the icon based on the input type
    togglePassword.src = type === "text" ? "img/open-eyes.jpg" : "img/closed-eyes.jpg";
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
    body: JSON.stringify({ UserName: username, PassWord: password }), // Send the username and password
  })
    .then((response) => response.json())
    .then((data) => {
      const messageElement = document.getElementById("message");
      if (data.error) {
        messageElement.innerText = data.error; // Display error message
      } else {
        // Display user information
        messageElement.innerHTML = `
          <strong>Login Successful!</strong><br>
          Name (TH): ${data.displayNameTH}<br>
          Name (EN): ${data.displayNameEN}<br>
          Username: ${data.username}<br>
          Email: ${data.email}<br>
          Department: ${data.department}<br>
          Faculty: ${data.faculty}
        `;
      }
    })
    .catch((error) => console.error("Error:", error));
}
