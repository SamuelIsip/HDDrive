document.addEventListener("DOMContentLoaded", () => {
  var restorePassCode = 0;
  var email = "";

  document.getElementById("btnSendCode").addEventListener("click", () => {
    email = document.getElementById("restoreEmail").value;
    const emailJson = { emailJSON: email };
    restorePassCode = sendCode(emailJson);
  });

  document.getElementById("btnChangePass").addEventListener("click", () => {
    var newPass = document.getElementById("restoreNewPassword").value;
    var newConfirmationPass = document.getElementById(
      "restoreNewPasswordConfirmation"
    ).value;
    var restorePassCodeByUser = document.getElementById("restoreCode").value;
    //Comprobar si codigos son iguales
    sendDataToCheckAndRestorePass(restorePassCode, newPass, email);
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
      console.log(code);
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

  async function sendDataToCheckAndRestorePass(
    restorePassCode,
    newPass,
    email
  ) {
    const dataUser = {
      restorePassCode: restorePassCode,
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
    } else {
      alert("The password could not be changed");
    }
  }
});
