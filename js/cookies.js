function setCookie(dataUsr) {
  if (getCookie("cookieEnabled") !== null) {
    const d = new Date();
    d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie =
      "userName=" + dataUsr.nom_usr + ";" + expires + "; Path=/;";
    document.cookie = "userID=" + dataUsr.id_user + ";" + expires + "; Path=/;";
  }
}

function getCookie(name) {
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

document.addEventListener("DOMContentLoaded", () => {
  loadCookie();
  acceptCookie();

  function acceptCookie() {
    document.getElementById("button_cookie").addEventListener("click", () => {
      const d = new Date();
      d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = "cookieEnabled=true;" + expires + "; Path=/;";
      document.getElementById("container_cookie").style.display = "none";
    });
  }

  function loadCookie() {
    if (getCookie("cookieEnabled") === null) {
      document.getElementById(
        "container_cookie"
      ).style.cssText = `display: flex; 
          flex-direction: row; 
          justify-content: center; 
          align-item:center;`;
    } else {
      document.getElementById("container_cookie").style.display = "none";
    }
  }
});
