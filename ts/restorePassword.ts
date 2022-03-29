var restorePassCode: number = 0;
var email = "";

document.getElementById("btn-pass-success").addEventListener("click", () => {
  window.location.href = encodeURI("./../");
});

document.getElementById("btnSendCode").addEventListener("click", async () => {
  email = (<HTMLInputElement>document.getElementById("restoreEmail")).value;
  const emailJson = { emailJSON: email };
  restorePassCode = await sendCode(JSON.stringify(emailJson));
});

document.getElementById("btnChangePass").addEventListener("click", () => {
  var newPass = (<HTMLInputElement>(
    document.getElementById("restoreNewPassword")
  )).value;
  var newConfirmationPass = (<HTMLInputElement>(
    document.getElementById("restoreNewPasswordConfirmation")
  )).value;
  var restorePassCodeByUser: number = parseInt(
    (<HTMLInputElement>document.getElementById("restoreCode")).value
  );

  // Comprobaciones password
  if (newPass == "") {
    document.getElementById("restoreNewPassword").style.border =
      "1px solid #ff0000";
    document.getElementById("restoreNewPasswordConfirmation").style.border =
      "1px solid #ff0000";
    toggleWarningAdvice("Passwords dont match!");
    toggleWarningAdvice("You must enter a password!");
    return;
  }

  var regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
  if (!regexPass.test(newPass)) {
    document.getElementById("restoreNewPassword").style.border =
      "1px solid #ff0000";
    document.getElementById("restoreNewPasswordConfirmation").style.border =
      "1px solid #ff0000";
    toggleWarningAdvice("Passwords dont match!");
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

async function sendCode(emailJson: string): Promise<number> {
  const response = await fetch("./../api/sendRestoreCode.php", {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: emailJson,
  });
  if (response.ok) {
    var code: number = parseInt(await response.text());
    (<HTMLInputElement>document.getElementById("restoreCode")).disabled = false;
    (<HTMLInputElement>document.getElementById("restoreNewPassword")).disabled =
      false;
    (<HTMLInputElement>(
      document.getElementById("restoreNewPasswordConfirmation")
    )).disabled = false;
    (<HTMLInputElement>document.getElementById("btnChangePass")).disabled =
      false;
    return code;
  } else {
    toggleWarningAdvice("This email does not exist!");
    return 0;
  }
}

async function sendDataToCheckAndRestorePass(newPass: string, email: string) {
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
    (<HTMLInputElement>document.getElementById("restoreNewPassword")).value =
      "";
    (<HTMLInputElement>(
      document.getElementById("restoreNewPasswordConfirmation")
    )).value = "";
    (<HTMLInputElement>document.getElementById("restoreCode")).value = "";
    (<HTMLInputElement>document.getElementById("restoreEmail")).value = "";
    document.getElementById("success-password").style.display = "block";
    document.getElementById("warning-advice").style.display = "none";
  } else {
    toggleWarningAdvice("The password could not be changed");
  }
}

function toggleWarningAdvice(message: string) {
  let warningAdvice = document.getElementById("warning-advice");
  warningAdvice.style.display = "block";
  (<HTMLInputElement>warningAdvice.children[0]).innerText =
    "¡Warning! " + message;
}
