document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("logon_button").addEventListener("click", () => {
    //Data of user
    const user_data = {
      name: document.getElementById("name").value,
      name_user: document.getElementById("name_user").value,
      phone: document.getElementById("tlf").value,
      email: document.getElementById("logon_email").value,
      password: document.getElementById("logon_pass").value,
    };

    //Send data to server

    if (window.ActiveXObject) xhr = new ActiveXObject("Microsoft.XMLHTTP");
    else xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        window.location = encodeURI("./../HDDrive/pages/home.php");
      } else if (this.readyState == 4 && this.status == 409) {
        alert("User already exist!");
      } else if (this.readyState == 4 && this.status == 500) {
        alert("Ups! Your User cannot be created!");
      }
    };

    xhr.open("POST", "./../HDDrive/api/logOnUser.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(user_data));
  });
});
