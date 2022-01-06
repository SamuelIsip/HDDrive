document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementsByClassName("menu_icon")[0]
    .addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        document.getElementById("header").classList.toggle("nav_responsive");
      }
    });

  var burgerBtn = document.querySelector(".menu_icon");
  var menuOpen = false;

  document.querySelectorAll(".container_list li").forEach((link, index) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        toglleBurger(menuOpen, burgerBtn);
        document.getElementById("header").classList.toggle("nav_responsive");
      }
    });
  });

  burgerBtn.addEventListener("click", () => {
    toglleBurger(menuOpen, burgerBtn);
  });

  function toglleBurger(menuOpen, burgerBtn) {
    if (!menuOpen) {
      burgerBtn.classList.add("open");
      menuOpen = true;
    } else {
      burgerBtn.classList.remove("open");
      menuOpen = false;
    }
  }
});
