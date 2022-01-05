document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login_pass").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("login_button").click();
    }
  });
  document
    .getElementById("login_button")
    .addEventListener("click", function () {
      loginHome();
    });

  function loginHome() {
    //Data of user
    const user_data = {
      email: document.getElementById("login_email").value,
      password: document.getElementById("login_pass").value,
    };

    if (
      document.getElementById("login_error_info").className ==
      "login_error_info_on"
    ) {
      document.getElementById("login_error_info").className =
        "login_error_info_off";
      removeErrorColor();
    }

    //Validate de data of LogIn
    if (validateLogIn(user_data) == false) {
      return false;
    }

    fetchLogIn();
  }

  async function fetchLogIn() {
    const response = await fetch("./../HDDrive/api/logInUser.php", {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user_data),
    });
    if (response.ok) {
      const dataUsr = await response.json();
      sessionStorage.setItem("userName", dataUsr.nom_usr);
      sessionStorage.setItem("userID", dataUsr.id_user);
      window.location = encodeURI("./../HDDrive/pages/home.php");
    } else {
      document.getElementById("login_email").style.border = "1px solid #ff0000";
      document.getElementById("login_pass").style.border = "1px solid #ff0000";
      document.getElementById("login_error_info").className =
        "login_error_info_on";
      document.getElementById("login_error_info").innerHTML =
        "Email/Password are incorrect!";
    }
  }

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
  function removeErrorColor() {
    var logInInputsList =
      document.getElementsByClassName("login_data")[0].children;
    for (let i = 0; i < logInInputsList.length; i++) {
      if (logInInputsList[i].style.border == "1px solid rgb(255, 0, 0)")
        logInInputsList[i].style.border = "";
    }
  }
});
