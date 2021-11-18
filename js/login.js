document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login_button").addEventListener("click", () => {
    //Data of user
    const user_data = {
      email: document.getElementById("login_email").value,
      password: document.getElementById("login_pass").value,
    };

    //Validate de data of LogIn
    validateLogIn(user_data);

    //Send data to server
    if (window.ActiveXObject) xhr = new ActiveXObject("Microsoft.XMLHTTP");
    else xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const dataUsr = JSON.parse(this.responseText);
        sessionStorage.setItem("userName", dataUsr.nom_usr);
        sessionStorage.setItem("userID", dataUsr.id_user);
        window.location = encodeURI("./../HDDrive/pages/home.php");
      } else if (this.readyState == 4 && this.status == 404) {
        document.getElementById("login_email").style.border =
          "1px solid #ff0000";
        document.getElementById("login_pass").style.border =
          "1px solid #ff0000";
        document.getElementById("login_error_info").className =
          "login_error_info_on";
        document.getElementById("login_error_info").innerHTML =
          "Email/Password are incorrect!";
      }
    };

    xhr.open("POST", "./../HDDrive/api/logInUser.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(user_data));
  });

  function validateLogIn(user_data) {
    //^\S+@\S+\.\S+$/
  }
});
