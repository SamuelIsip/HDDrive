document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnSendCode").addEventListener("click", () => {
    var email = document.getElementById("restoreEmail").value;
    const emailJson = { emailJSON: email };
    sendCode(emailJson);
  });

  async function sendCode(emailJson) {
    const response = await fetch("./../api/sendRestoreCode.php", {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailJson),
    });
    if (response.ok) {
      let resp = await response.text();
      console.log(resp);
      document.getElementById("restoreCode").disabled = false;
      document.getElementById("restoreNewPassword").disabled = false;
      document.getElementById(
        "restoreNewPasswordConfirmation"
      ).disabled = false;
      document.getElementById("btnChangePass").disabled = false;
    } else {
      alert("The code could not be sent");
    }
  }
});
