
  document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission for validation
    
    // Clear previous error messages
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = ""; // Reset general error message
    
    const usernameError = document.querySelector("#username + .error");
    const passwordError = document.querySelector("#password + .error");

    if (usernameError) usernameError.remove(); // Clear previous username errors
    if (passwordError) passwordError.remove(); // Clear previous password errors

    // Get form values
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    let isValid = true;

    // Validate username
    if (username === "") {
      showError("username", "Username cannot be empty");
      isValid = false;
    } else if (username.length <= 8) {
      showError("username", "Username must be at least 8 characters long");
      isValid = false;
    }

    // Validate password
    if (password === "") {
      showError("password", "Password cannot be empty");
      isValid = false;
    } else if (password.length <= 8) {
      showError("password", "Password must be at least 8 characters long");
      isValid = false;
    }

    if (isValid) {
      // If the form is valid, proceed with submission (or mock success for this example)
      errorMessage.textContent = "Form submitted successfully!";
      errorMessage.style.color = "green";
    }
  });

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.createElement("p");
    error.textContent = message;
    error.className = "error";
    error.style.color = "red";
    error.style.fontSize = "0.9rem";
    field.parentElement.appendChild(error); // Append error message after the input field
  }

  // Add input event listener to clear the error when typing
  field.addEventListener("input", function clearError() {
    const existingError = document.querySelector(`#${fieldId} + .error`);
    if (existingError) existingError.remove();
    field.removeEventListener("input", clearError); // Remove this listener after clearing
  });

