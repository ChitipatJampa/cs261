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

function submitLogin(event) {
  event.preventDefault(); // Prevent the default form submission

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const accessToken = "TUe0255672f1bbb086fb7b69e6223bd0df69a284b965180bb03b37dbbc52485b13a0774370730e671909c94a8d864c1449"; // your access token
  const url = "https://restapi.tu.ac.th/api/v1/auth/Ad/verify";

  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}` // Add token to Authorization header
      },
      body: JSON.stringify({ username, password })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      document.getElementById('message').innerText = data.message; // Show response message
  })
  .catch(error => {
      document.getElementById('message').innerText = 'Login failed: ' + error.message; // Display error message
      console.error('Error:', error);
  });
}

function call_REST_API_Hello() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const url = (
      'http://localhost:8080/User?' +
      new URLSearchParams({ myName: username, lastName: password }).toString()
  );
  
  fetch(url)
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
  })
  .then(text => {
      document.getElementById('message').innerText = text;
  })
  .catch(error => console.error('Error:', error));
}
