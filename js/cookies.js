define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getCookie = exports.setCookie = void 0;
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
    exports.setCookie = setCookie;
    function getCookie(name) {
        var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        return match ? match[2] : null;
    }
    exports.getCookie = getCookie;
});
