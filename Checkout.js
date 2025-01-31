


function copyAddress() {
  //.checked checks if the checkbox is currently selected/checked
  //If the checkbox is checked, the code inside the if block will run
  if (document.getElementById("sameAddress").checked) {
    //it copies the shipping name into the billing name field
      document.getElementById("billingName").value = document.getElementById("shippingName").value;
      document.getElementById("billingAddress").value = document.getElementById("shippingAddress").value;
      document.getElementById("billingCity").value = document.getElementById("shippingCity").value;
      document.getElementById("billingZip").value = document.getElementById("shippingZip").value;
      document.getElementById("billingCountry").value = document.getElementById("shippingCountry").value;
  } else {
    //Sets the billing name field to an empty string (clears the field)
      document.getElementById("billingName").value = "";
      document.getElementById("billingAddress").value = "";
      document.getElementById("billingCity").value = "";
      document.getElementById("billingZip").value = "";
      document.getElementById("billingCountry").value = "";
  }
}