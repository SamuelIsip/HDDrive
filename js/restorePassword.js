document.addEventListener("DOMContentLoaded", async () => {
  var restorePassCode = 0;
  var email = "";

  document.getElementById("btnSendCode").addEventListener("click", async () => {
    email = await document.getElementById("restoreEmail").value;
    const emailJson = { emailJSON: email };
    restorePassCode = await sendCode(emailJson);
  });

  document.getElementById("btnChangePass").addEventListener("click", () => {
    var newPass = document.getElementById("restoreNewPassword").value;
    var newConfirmationPass = document.getElementById(
      "restoreNewPasswordConfirmation"
    ).value;
    var restorePassCodeByUser = document.getElementById("restoreCode").value;

    //Comprobamos si pass son iguales
    if (newPass != newConfirmationPass) {
      document.getElementById("restoreNewPassword").style.border =
        "1px solid #ff0000";
      document.getElementById("restoreNewPasswordConfirmation").style.border =
        "1px solid #ff0000";
      alert("Passwords dont match!");
      return;
    }

    //Comprobar si codigos son iguales
    if (restorePassCodeByUser != restorePassCode) {
      document.getElementById("restoreCode").style.border = "1px solid #ff0000";
      alert("The code is invalid!");
      return;
    }

    console.log(email);

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
      alert("The code could not be sent");
      return 0;
    }
  }

  async function sendDataToCheckAndRestorePass(newPass, email) {
    const dataUser = {
      newPass: newPass,
      email: email,
    };
    console.log(email);
    const response = await fetch("./../api/changePassword.php", {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataUser),
    });
    if (response.ok) {
    } else {
      alert("The password could not be changed");
    }
  }
});
