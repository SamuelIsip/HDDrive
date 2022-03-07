document.addEventListener("DOMContentLoaded", () => {
  var restorePassCode = 0;
  var email = "";

  document.getElementById("btn-pass-success").addEventListener("click", () => {
    window.location = encodeURI("./../");
  });

  document.getElementById("btnSendCode").addEventListener("click", async () => {
    email = document.getElementById("restoreEmail").value;
    const emailJson = { emailJSON: email };
    restorePassCode = await sendCode(emailJson);
  });

  document.getElementById("btnChangePass").addEventListener("click", () => {
    var newPass = document.getElementById("restoreNewPassword").value;
    var newConfirmationPass = document.getElementById(
      "restoreNewPasswordConfirmation"
    ).value;
    var restorePassCodeByUser = document.getElementById("restoreCode").value;

    // Comprobaciones password
    if (newPass == "") {
      toggleWarningAdvice("You must enter a password!");
      return;
    }

    var regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    if (!regexPass.test(newPass)) {
      toggleWarningAdvice("Wrong Format of Password, try again.");
      return;
    }

    //Comprobamos si pass son iguales
    if (newPass != newConfirmationPass) {
      document.getElementById("restoreNewPassword").style.border =
        "1px solid #ff0000";
      document.getElementById("restoreNewPasswordConfirmation").style.border =
        "1px solid #ff0000";
      toggleWarningAdvice("Passwords dont match!");
      return;
    }

    //Comprobar si codigos son iguales
    if (restorePassCodeByUser != restorePassCode) {
      document.getElementById("restoreCode").style.border = "1px solid #ff0000";
      toggleWarningAdvice("The code is invalid!");
      return;
    }

    sendDataToCheckAndRestorePass(newPass, email);
  });

  async function sendCode(emailJson) {
    const response = await fetch("./../api/sendRestoreCode.php", {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailJson),
    });
    if (response.ok) {
      var code = await response.text();
      document.getElementById("restoreCode").disabled = false;
      document.getElementById("restoreNewPassword").disabled = false;
      document.getElementById(
        "restoreNewPasswordConfirmation"
      ).disabled = false;
      document.getElementById("btnChangePass").disabled = false;
      return code;
    } else {
      toggleWarningAdvice("This email does not exist!");
      return 0;
    }
  }

  async function sendDataToCheckAndRestorePass(newPass, email) {
    const dataUser = {
      newPass: newPass,
      email: email,
    };
    const response = await fetch("./../api/changePassword.php", {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataUser),
    });
    if (response.ok) {
      document.getElementById("restoreNewPassword").value = "";
      document.getElementById("restoreNewPasswordConfirmation").value = "";
      document.getElementById("restoreCode").value = "";
      document.getElementById("restoreEmail").value = "";
      document.getElementById("success-password").style.visibility = "visible";
    } else {
      toggleWarningAdvice("The password could not be changed");
    }
  }

  function toggleWarningAdvice(message) {
    let warningAdive = document.getElementById("warning-advice");
    warningAdive.style.visibility = "visible";
    warningAdive.firstChild.innerText = "";
    warningAdive.firstChild.innerText = "¡Warning! " + message;
  }
});
