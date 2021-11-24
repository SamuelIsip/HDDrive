document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("login_button")
    .addEventListener("click", function (event) {
      //Data of user
      const user_data = {
        email: document.getElementById("login_email").value,
        password: document.getElementById("login_pass").value,
      };

      //Validate de data of LogIn
      if (validateLogIn(user_data) == false) {
        return false;
      }

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

  /* Validación del Email y Password */
  function validateLogIn(user_data) {
    // Email
    if (user_data.email == "") {
      document.getElementById("login_email").style.border = "1px solid #ff0000";
      document.getElementById("login_error_info").className =
        "login_error_info_on";
      document.getElementById("login_error_info").innerHTML =
        "You must enter an email!";
      return false;
    }

    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(user_data.email)) {
      document.getElementById("login_email").style.border = "1px solid #ff0000";
      document.getElementById("login_error_info").className =
        "login_error_info_on";
      document.getElementById("login_error_info").innerHTML =
        "Wrong format for email!";
      return false;
    }

    // Password
    if (user_data.password == "") {
      document.getElementById("login_pass").style.border = "1px solid #ff0000";
      document.getElementById("login_error_info").className =
        "login_error_info_on";
      document.getElementById("login_error_info").innerHTML =
        "You must enter a password!";
      return false;
    }
    var regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    if (!regexPass.test(user_data.password)) {
      document.getElementById("login_pass").style.border = "1px solid #ff0000";
      document.getElementById("login_error_info").className =
        "login_error_info_on";
      document.getElementById("login_error_info").innerHTML =
        "Wrong Password, try again.";
      return false;
    }
  }
});
