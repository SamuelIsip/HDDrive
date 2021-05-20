document.addEventListener("DOMContentLoaded", () => {
  var size_monitor = window.innerHeight;
  console.log(size_monitor);
  document.getElementById("container").style.height = size_monitor + "px";
});
