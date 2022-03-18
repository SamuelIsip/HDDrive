"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => {
    var restorePassCode = 0;
    var email = "";
    document.getElementById("btn-pass-success").addEventListener("click", () => {
        window.location.href = encodeURI("./../");
    });
    document.getElementById("btnSendCode").addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        email = document.getElementById("restoreEmail").value;
        const emailJson = { emailJSON: email };
        restorePassCode = yield sendCode(JSON.stringify(emailJson));
    }));
    document.getElementById("btnChangePass").addEventListener("click", () => {
        var newPass = (document.getElementById("restoreNewPassword")).value;
        var newConfirmationPass = (document.getElementById("restoreNewPasswordConfirmation")).value;
        var restorePassCodeByUser = parseInt(document.getElementById("restoreCode").value);
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
    function sendCode(emailJson) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("./../api/sendRestoreCode.php", {
                method: "POST",
                cache: "no-cache",
                headers: { "Content-Type": "application/json" },
                body: emailJson,
            });
            if (response.ok) {
                var code = parseInt(yield response.text());
                document.getElementById("restoreCode").disabled =
                    false;
                (document.getElementById("restoreNewPassword")).disabled = false;
                (document.getElementById("restoreNewPasswordConfirmation")).disabled = false;
                document.getElementById("btnChangePass").disabled =
                    false;
                return code;
            }
            else {
                toggleWarningAdvice("This email does not exist!");
                return 0;
            }
        });
    }
    function sendDataToCheckAndRestorePass(newPass, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataUser = {
                newPass: newPass,
                email: email,
            };
            const response = yield fetch("./../api/changePassword.php", {
                method: "POST",
                cache: "no-cache",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataUser),
            });
            if (response.ok) {
                document.getElementById("restoreNewPassword").value =
                    "";
                (document.getElementById("restoreNewPasswordConfirmation")).value = "";
                document.getElementById("restoreCode").value = "";
                document.getElementById("restoreEmail").value = "";
                document.getElementById("success-password").style.display = "block";
                document.getElementById("warning-advice").style.display = "none";
            }
            else {
                toggleWarningAdvice("The password could not be changed");
            }
        });
    }
    function toggleWarningAdvice(message) {
        let warningAdvice = document.getElementById("warning-advice");
        warningAdvice.style.display = "block";
        warningAdvice.children[0].innerText =
            "¡Warning! " + message;
    }
});
