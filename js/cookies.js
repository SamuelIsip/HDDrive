function setCookie(dataUsr) {
  const d = new Date();
  d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = "userName=" + dataUsr.nom_usr + ";" + expires + "; Path=/;";
  document.cookie = "userID=" + dataUsr.id_user + ";" + expires + "; Path=/;";
}

function getCookie(name) {
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
  /* let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null; */
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
