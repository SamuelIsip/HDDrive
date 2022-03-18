import { IUserLogIN } from "../Interfaces/IUser";

export function setCookie(dataUsr: IUserLogIN) {
  if (getCookie("cookieEnabled") !== null) {
    const d = new Date();
    d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie =
      "userName=" + dataUsr.nom_usr + ";" + expires + "; Path=/;";
    document.cookie = "userID=" + dataUsr.id_user + ";" + expires + "; Path=/;";
  }
}

export function getCookie(name: string) {
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}
