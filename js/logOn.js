var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { setCookie } from "./modules/cookies";
document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("logon_button")
        .addEventListener("click", () => {
        //Data of user
        const user_data = {
            name: document.getElementById("name").value,
            name_user: (document.getElementById("name_user")).value.trim(),
            phone: document.getElementById("tlf").value,
            email: document.getElementById("logon_email").value,
            password: document.getElementById("logon_pass")
                .value,
        };
        if (document.getElementById("logon_error_info").className ==
            "logon_error_info_on") {
            document.getElementById("logon_error_info").className =
                "logon_error_info_off";
            removeErrorColor();
        }
        if (validateLogOn(user_data) == false) {
            //Validate de data of LogOn
            return;
        }
        //Send data to server
        fetchLogOn(user_data);
    });
    function fetchLogOn(user_data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("./../HDDrive/api/logOnUser.php", {
                method: "POST",
                cache: "no-cache",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user_data),
            });
            if (response.ok) {
                const dataUsr = (yield response.json());
                //Cache
                localStorage.setItem("userID", dataUsr.id_user.toString());
                localStorage.setItem("userName", dataUsr.name_user);
                //Cookies
                setCookie({
                    id_user: dataUsr.id_user,
                    nom_usr: dataUsr.name_user,
                    email: "",
                    password: "",
                });
                window.location.href = encodeURI("./../HDDrive/pages/home");
            }
            else if (response.status == 409) {
                document.getElementById("logon_error_info").innerHTML =
                    "User already exist!";
            }
            else {
                document.getElementById("logon_error_info").innerHTML =
                    "Ups! Your User cannot be created!";
            }
        });
    }
    /* Validaci??n datos de creaci??n de cuenta */
    function validateLogOn(user_data) {
        // Name
        if (user_data.name == "") {
            document.getElementById("name").style.border = "1px solid #ff0000";
            document.getElementById("logon_error_info").className =
                "logon_error_info_on";
            document.getElementById("logon_error_info").innerHTML =
                "You must enter a Name!";
            return false;
        }
        // User name
        if (user_data.name_user == "") {
            document.getElementById("name_user").style.border = "1px solid #ff0000";
            document.getElementById("logon_error_info").className =
                "logon_error_info_on";
            document.getElementById("logon_error_info").innerHTML =
                "You must enter an User Name!";
            return false;
        }
        if (user_data.name_user.length <= 3) {
            document.getElementById("name_user").style.border = "1px solid #ff0000";
            document.getElementById("logon_error_info").className =
                "logon_error_info_on";
            document.getElementById("logon_error_info").innerHTML =
                "The User Name is too short!";
            return false;
        }
        // Phone Number
        if (user_data.phone == "") {
            document.getElementById("tlf").style.border = "1px solid #ff0000";
            document.getElementById("logon_error_info").className =
                "logon_error_info_on";
            document.getElementById("logon_error_info").innerHTML =
                "You must enter a Phone Number!";
            return false;
        }
        var regexPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
        if (!regexPhone.test(user_data.phone) || user_data.phone.length < 9) {
            document.getElementById("tlf").style.border = "1px solid #ff0000";
            document.getElementById("logon_error_info").className =
                "logon_error_info_on";
            document.getElementById("logon_error_info").innerHTML =
                "Wrong Phone number format! Ex: 789456123";
            return false;
        }
        // Email
        if (user_data.email == "") {
            document.getElementById("logon_email").style.border = "1px solid #ff0000";
            document.getElementById("logon_error_info").className =
                "logon_error_info_on";
            document.getElementById("logon_error_info").innerHTML =
                "You must enter an email!";
            return false;
        }
        var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(user_data.email)) {
            document.getElementById("logon_email").style.border = "1px solid #ff0000";
            document.getElementById("logon_error_info").className =
                "logon_error_info_on";
            document.getElementById("logon_error_info").innerHTML =
                "Wrong format for email!";
            return false;
        }
        // Password
        if (user_data.password == "") {
            document.getElementById("logon_pass").style.border = "1px solid #ff0000";
            document.getElementById("logon_error_info").className =
                "logon_error_info_on";
            document.getElementById("logon_error_info").innerHTML =
                "You must enter a password!";
            return false;
        }
        var regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
        if (!regexPass.test(user_data.password)) {
            document.getElementById("logon_pass").style.border = "1px solid #ff0000";
            document.getElementById("logon_error_info").className =
                "logon_error_info_on";
            document.getElementById("logon_error_info").innerHTML =
                "Your Password must have at least 1 lowercase, uppercase and number character.";
            return false;
        }
        return true;
    }
    function removeErrorColor() {
        var logOnInputsList = document.getElementsByClassName("logon_data")[0].children;
        for (let i = 0; i < logOnInputsList.length; i++) {
            if (logOnInputsList[i].style.border ==
                "1px solid rgb(255, 0, 0)")
                logOnInputsList[i].style.border = "";
        }
    }
});
