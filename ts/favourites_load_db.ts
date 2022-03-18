document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("fav").addEventListener("click", () => {
    (
      (<HTMLIFrameElement>document.getElementById("favourites"))
        .contentWindow! as any
    ).load_favourites();
  });
});
