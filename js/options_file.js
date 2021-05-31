function menu_options_file(ruta) {
  var options_file = document.getElementsByClassName("options_file");

  for (let i = 0; i < options_file.length; i++) {
    options_file[i].addEventListener("click", () => {
      var options = document.getElementById("options");
      options.style.display = "block";
      options.className = i;
      options.style.top = options_file[i].offsetTop + "px";
      options.style.left =
        options_file[i].offsetLeft - (options_file[i].clientWidth - 20) + "px";
      add_event_options(options, ruta);
    });
  }
}
function add_event_options(options, ruta) {
  var op_download = options.children[0].children[0],
    op_edit = options.children[0].children[1],
    op_delete = options.children[0].children[2];

  var row = op_download.parentElement.parentElement.className;

  var name_file_doc =
    document.getElementsByTagName("table")[0].children[1].children[row]
      .children[0].textContent;

  op_download.addEventListener("click", () => {
    console.log(name_file_doc);
    window.location = encodeURI(
      "./../api/downloadFile.php?nameFile=" + ruta + name_file_doc
    );
  });

  op_edit.addEventListener("click", () => {
    console.log("Edit");
  });

  op_delete.addEventListener("click", () => {
    console.log("Delete");
  });
}
