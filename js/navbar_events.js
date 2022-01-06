document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementsByClassName("menu_icon")[0]
    .addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        document.getElementById("header").classList.toggle("nav_responsive");
      }
    });

  const burgerBtn = document.querySelector(".menu_icon");
  let menuOpen = false;

  document.querySelectorAll(".container_list li").forEach((link, index) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        document.getElementById("header").classList.toggle("nav_responsive");
        toglleBurger(menuOpen);
      }
    });
  });

  burgerBtn.addEventListener("click", () => {
    toglleBurger(menuOpen);
  });

  function toglleBurger(menuOpen) {
    if (!menuOpen) {
      burgerBtn.classList.add("open");
      menuOpen = true;
    } else {
      burgerBtn.classList.remove("open");
      menuOpen = false;
    }
  }
});
