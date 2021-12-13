document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementsByClassName("menu_icon")[0]
    .addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        document.getElementById("header").classList.toggle("nav_responsive");
      }
    });
  document.querySelectorAll(".container_list li").forEach((link, index) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        document.getElementById("header").classList.toggle("nav_responsive");
      }
    });
  });
});
