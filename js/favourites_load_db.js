"use strict";
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("fav").addEventListener("click", () => {
        document.getElementById("favourites")
            .contentWindow.load_favourites();
    });
});
