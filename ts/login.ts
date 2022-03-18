import { setCookie, getCookie } from "./modules/cookies";
import { IUserLogIN } from "./Interfaces/IUser";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login_pass")!.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("login_button")!.click();
    }
  });
  document
    .getElementById("login_button")!
    .addEventListener("click", function () {
      loginHome();
    });

  function loginHome(): void {
    //Data of user
    const user_data: IUserLogIN = {
      email: (<HTMLInputElement>document.getElementById("login_email")).value,
      password: (<HTMLInputElement>document.getElementById("login_pass")).value,
    };

    if (
      document.getElementById("login_error_info")!.className ==
      "login_error_info_on"
    ) {
      document.getElementById("login_error_info")!.className =
        "login_error_info_off";
      removeErrorColor();
    }

    //Validate data of LogIn
    if (validateLogIn(user_data) == false) {
      return;
    }

    //Send data to server
    fetchLogIn(user_data);
  }

  async function fetchLogIn(user_data: IUserLogIN): Promise<void> {
    const response = await fetch("./../HDDrive/api/logInUser.php", {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user_data),
    });
    if (response.ok) {
      const dataUsr: IUserLogIN = (await response.json()) as IUserLogIN;
      //Cache
      localStorage.setItem("userName", dataUsr.nom_usr!);
      localStorage.setItem("userID", dataUsr.id_user!.toString());
      //Cookies
      setCookie(dataUsr);
      window.location.href = encodeURI("./../HDDrive/pages/home");
    } else {
      document.getElementById("login_email")!.style.border =
        "1px solid #ff0000";
      document.getElementById("login_pass")!.style.border = "1px solid #ff0000";
      document.getElementById("login_error_info")!.className =
        "login_error_info_on";
      document.getElementById("login_error_info")!.innerHTML =
        "Email/Password are incorrect!";
    }
  }

  /* Validación del Email y Password */
  function validateLogIn(user_data: IUserLogIN): boolean {
    // Email
    if (user_data.email == "") {
      document.getElementById("login_email")!.style.border =
        "1px solid #ff0000";
      document.getElementById("login_error_info")!.className =
        "login_error_info_on";
      document.getElementById("login_error_info")!.innerHTML =
        "You must enter an email!";
      return false;
    }

    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(user_data.email)) {
      document.getElementById("login_email")!.style.border =
        "1px solid #ff0000";
      document.getElementById("login_error_info")!.className =
        "login_error_info_on";
      document.getElementById("login_error_info")!.innerHTML =
        "Wrong format for email!";
      return false;
    }

    // Password
    if (user_data.password == "") {
      document.getElementById("login_pass")!.style.border = "1px solid #ff0000";
      document.getElementById("login_error_info")!.className =
        "login_error_info_on";
      document.getElementById("login_error_info")!.innerHTML =
        "You must enter a password!";
      return false;
    }
    var regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    if (!regexPass.test(user_data.password)) {
      document.getElementById("login_pass")!.style.border = "1px solid #ff0000";
      document.getElementById("login_error_info")!.className =
        "login_error_info_on";
      document.getElementById("login_error_info")!.innerHTML =
        "Wrong Format of Password, try again.";
      return false;
    }

    return true;
  }

  function removeErrorColor(): void {
    var logInInputsList =
      document.querySelectorAll<HTMLElement>(".login_data")![0].children;

    for (let index = 0; index < logInInputsList.length; index++) {
      if (
        (<HTMLElement>logInInputsList[index]).style.border ==
        "1px solid rgb(255, 0, 0)"
      )
        (<HTMLElement>logInInputsList[index]).style.border = "";
    }
  }

  // DISPLAY COOKIE ADVICE
  loadCookie();
  acceptCookie();

  function acceptCookie(): void {
    document.getElementById("button_cookie")!.addEventListener("click", () => {
      const d = new Date();
      d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = "cookieEnabled=true;" + expires + "; Path=/;";
      document.getElementById("container_cookie")!.style.display = "none";
    });
  }

  function loadCookie(): void {
    if (getCookie("cookieEnabled") === null) {
      document.getElementById(
        "container_cookie"
      )!.style.cssText = `display: flex; 
            flex-direction: row; 
            justify-content: center; 
            align-item:center;`;
    } else {
      document.getElementById("container_cookie")!.style.display = "none";
    }
  }
});
