document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("fav").addEventListener("click", () => {
    toggleLoader();
    document.getElementById("favourites").contentWindow.load_favourites();
    toggleLoader();
  });
});
