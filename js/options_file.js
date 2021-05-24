function menu_options_file() {
  var options_file = document.getElementsByClassName("options_file");

  for (let i = 0; i < options_file.length; i++) {
    options_file[i].addEventListener("click", () => {
      //Saber el número de la fila
      //y segun ese, mostrar la opcion correspondiente
      document.getElementById("options").style.display = "block";
      document.getElementById("options").style.top =
        options_file[i].offsetTop + "px";
      document.getElementById("options").style.left =
        options_file[i].offsetLeft - (options_file[i].clientWidth - 20) + "px";
    });
  }
}
