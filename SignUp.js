
document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission for validation

  // Clear previous error messages
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = ""; // Reset general error message

  // Clear specific field errors
  clearAllFieldErrors();

   // Get field values
   const nic = document.getElementById("nic").value.trim();
   const firstName = document.getElementById("firstName").value.trim();
   const surname = document.getElementById("surname").value.trim();
   const phone = document.getElementById("phone").value.trim();
   const email = document.getElementById("email").value.trim();
   const username =document.getElementById("username").value.trim();
   const password = document.getElementById("password").value.trim();
   const confirmPassword = document.getElementById("confirmPassword").value.trim();
   const dobFromNIC = extractDOB(nic);

  let isValid = true;
// Validate NIC (min length 8 characters)
if (nic.length < 14) {
  showError("nic", "NIC must have at least 14 characters.");
  isValid = false;
}

// Validate First Name (only letters)
if (!/^[a-zA-Z]+$/.test(firstName)) {
  showError("firstName", "First name should only contain letters.");
  isValid = false;
}

// Validate Surname (only letters)
if (!/^[a-zA-Z]+$/.test(surname)) {
  showError("surname", "Surname should only contain letters.");
  isValid = false;
}

// Validate Phone (7 digits only)
if (!/^\d{7}$/.test(phone)) {
  showError("phone", "Phone number must contain exactly 7 digits.");
  isValid = false;
}

// Validate Email Address (format username@domain.com)
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  showError("email", "Invalid email format. Use username@domain.com.");
  isValid = false;
}

// Validate Username (must include NIC date of birth and be > 8 characters)
if (!dobFromNIC || !username.includes(extractDOB(nic))) {
  showError("username", "Username must include DOB from NIC.");
  isValid = false;
} else if (username.length <= 8) {
  showError("username", "Username must be more than 8 characters.");
  isValid = false;
}

// Validate Password Match
if (password !== confirmPassword) {
  showError("confirmPassword", "Passwords do not match.");
  isValid = false;
}

// If form is valid, redirect to the next page
if (isValid) {
  alert("Form successfully submitted! Redirecting...");
  window.location.href = "next-page.html"; // Redirect to the next page
}
});

  if (isValid) {
    // If the form is valid, proceed with submission (or mock success for this example)
    errorMessage.textContent = "Form submitted successfully!";
    errorMessage.style.color = "green";
  }


// Extract DOB from NIC (assume DOB is the first 6 digits for simplicity: YYMMDD)
function extractDOB(nic) {
  if (nic.length === 14) { // Check for valid NIC length (14 characters)
    const day = nic.slice(2, 2); // Corrected: Extract day (positions 6-7)
    const month = nic.slice(4, 2); // Extract month (positions 4-5)
    const year ="20"+ nic.slice(6, 2); // Extract year (positions 0-1)
    return `${day}${month}${year}`; // Return DOB in format YYYYMMDD
  }
  return ""; // Return empty string if NIC is invalid
}

// Reset button confirmation
function confirmReset() {
  if (confirm("Are you sure you want to reset the form?")) {
    document.getElementById("form").reset();
    clearAllFieldErrors(); // Clear all error messages
  }
}

// Checkbox selection message
document.querySelectorAll('input[type="radio"][name="gender"]').forEach((radio) => {
  radio.addEventListener("change", function() {
    const label = this.nextElementSibling;
    if (label) {
      alert(`${label.textContent.trim()} gender selected.`);
    }
  });
});

function showError(fieldId, message) {
  // Clear existing error for the specific field
  const existingError = document.querySelector(`#${fieldId} + .error`);
  if (existingError) existingError.remove();

  // Create and append the error message
  const field = document.getElementById(fieldId);
  const error = document.createElement("p");
  error.textContent = message;
  error.className = "error";
  error.style.color = "red";
  error.style.fontSize = "0.9rem";
  field.parentElement.appendChild(error); // Append error message after the input field
}

function clearAllFieldErrors() {
  // Remove all error messages
  const allErrors = document.querySelectorAll(".error");
  allErrors.forEach((error) => error.remove());
}

// Export form data to Excel
  function exportToexcel() {
    const formData = document.getElementById("form");
    const headers = []; // Column headers
    const values = []; // Row values
    const inputs =formData.querySelectorAll('input,select')

    // Iterate through inputs to collect data
    inputs.forEach(input=>{
      // Skip submit, reset, and radio buttons that aren't checked
      if (input.type === 'submit' || input.type === 'reset') return;
        if (input.type === 'radio' && !input.checked) return;
        if (input.type === 'radio') {
          if (input.checked) {
            headers.push('gender');
            values.push(input.nextElementSibling.textContent);
          }
          return;
        }
        
        // Add field name to headers and values for other inputs
        headers.push(input.name || input.id);
        values.push(input.value);
      });

    

    console.log("Headers:", headers);
    console.log("Values:", values); // Check if data is properly retrieved

    // Create a worksheet with headers as the first row and values as the second row
    const data = [headers, values];
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");

    // Export workbook to file
    try {
      XLSX.writeFile(workbook, "User_Registration_Data.xlsx");
   } catch (error) {
      console.error("Error exporting file:", error);
      alert("Failed to export data. Error: " + error.message);
   }

   // Update your form submission handler
   document.getElementById("form").addEventListener("submit", function(event) {
   event.preventDefault();
   // Your existing validation code here...
    
   if (isValid) {
    exportToExcel();
    alert("Form successfully submitted and exported to Excel!");
    // window.location.href = "next-page.html"; // Comment this out if you want users to see the Excel download
   }
  });
}
  










