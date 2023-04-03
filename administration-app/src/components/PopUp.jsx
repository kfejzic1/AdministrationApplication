import React from "react";

const Popup = () => {
  const newWindow = window.open('', 'popup', 'width=400,height=400');
  newWindow.document.write('<html><head><title>Address Update</title></head><body>');
  newWindow.document.write('<label for="address-input">Update address:</label><br>');
  newWindow.document.write('<input type="text" id="address-input"><br><br>');
  newWindow.document.write('<button type="button" onclick="updateAddress()">Update</button>');
  newWindow.document.write('<script>function updateAddress() {const newAddress = document.getElementById("address-input").value; alert("New address is: " + newAddress);}</script>');
  newWindow.document.write('</body></html>');
  newWindow.document.close();

  return null;
};

export default Popup;
