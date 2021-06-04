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

  //Fila seleccionada
  var row = op_download.parentElement.parentElement.className;

  var name_file_doc = document.getElementsByClassName("name_file" + row)[0]
    .value;

  op_download.addEventListener("click", () => {
    window.location = encodeURI(
      "./../api/downloadFile.php?nameFile=" + ruta + name_file_doc
    );
  });

  op_edit.addEventListener("click", (event) => {
    let input_name = document.getElementsByClassName("name_file" + row)[0];
    var name_file_dir = prompt("Please change the name", input_name.value);
    if (name_file_dir === null) {
      return;
    }
    input_name.value = name_file_dir;
    $.ajax({
      type: "GET",
      url: "./../api/changename.php",
      data: {
        nameFile: ruta + name_file_doc,
        newNameFile: ruta + name_file_dir,
      },
      dataType: "text",
      async: true,
      success: function () {},
    });
    event.stopPropagation();
  });

  op_delete.addEventListener("click", () => {
    $.ajax({
      type: "GET",
      url: "./../api/deletefile.php",
      data: { nameFile: ruta + name_file_doc },
      dataType: "text",
      async: false,
      success: function () {
        isDir(ruta);
      },
    });
  });
}
