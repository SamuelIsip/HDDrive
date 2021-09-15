function load_events_add_select() {
  document
    .getElementById("add_file")
    .parentElement.addEventListener("change", () => {
      var file_data = $("#add_file").prop("files")[0];
      var form_data = new FormData();
      form_data.append("file", file_data);
      form_data.append("rutaDir", getPath());
      $.ajax({
        url: "./../api/uploadfile.php",
        type: "POST",
        dataType: "text",
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function () {
          isDir(getPath());
        },
      });
    });

  document.getElementById("select_files").addEventListener("click", () => {
    //Mostrar todos los check
    var check_list = document.getElementsByClassName("check_file");
    for (let i = 0; i < check_list.length; i++) {
      if (check_list[i].style.display === "none") {
        check_list[i].style.display = "inline-block";
        $("#download_files_selected").css("display", "inline-block");
      } else {
        check_list[i].style.display = "none";
        $("#download_files_selected").css("display", "none");
      }
    }
  });

  document
    .getElementById("download_files_selected")
    .addEventListener("click", () => {
      var check1 = $("input[name=check_file]:checked");
      var arr = [];
      $.each(check1, function () {
        arr.push($(this).next().find(".name_file_dir").val());
      });

      var json_arr = JSON.stringify(arr);

      console.log(json_arr);

      //Formar JSON con rutas de todos los ficheros seleccionados
      let ruta = getPath();
      window.location = encodeURI(
        "./../api/download_select.php?files=" + json_arr + "&folder=" + ruta
      );
    });

  // Funcionalidad para volver atrás en la página
  document.getElementById("back_dir").addEventListener("click", () => {
    let rutas = getPath();
    if (rutas != "/") {
      document
        .getElementsByClassName("docs_header")[0]
        .firstElementChild.lastElementChild.remove();

      isDir(getPath());
    }
  });
}
