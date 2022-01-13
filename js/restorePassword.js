document.addEventListener("DOMContentLoaded", () => {
  let email = document.getElementById("restoreEmail").value;

  document.getElementById("btnSendCode").addEventListener("click", () => {
    sendCode(email);
  });

  async function sendCode(email) {
    const response = await fetch("./../HDDrive/api/sendRestoreCode.php", {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: { emailUser: email },
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
