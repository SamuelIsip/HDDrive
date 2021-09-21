document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login_button").addEventListener("click", () => {
    //Data of user
    const user_data = {
      email: document.getElementById("login_email").value,
      password: document.getElementById("login_pass").value,
    };

    //Send data to server

    if (window.ActiveXObject) xhr = new ActiveXObject("Microsoft.XMLHTTP");
    else xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        sessionStorage.setItem("userName", this.responseText);
        window.location = encodeURI("./../HDDrive/pages/home.php");
      } else if (this.readyState == 4 && this.status == 404) {
        alert("Account not found!");
      }
    };

    xhr.open("POST", "./../HDDrive/api/logInUser.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(user_data));
  });
});
