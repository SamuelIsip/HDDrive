function load_events_add_select() {
  document
    .getElementById("add_file")
    .parentElement.addEventListener("change", () => {
      var form_data = new FormData();
      form_data.append("rutaDir", getPath());
      var ins = document.getElementById("add_file").files.length;
      for (var x = 0; x < ins; x++) {
        form_data.append(
          "file[]",
          document.getElementById("add_file").files[x]
        );
      }
      $.ajax({
        url: "./../api/uploadfile.php",
        type: "POST",
        dataType: "text",
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        async: true,
        success: function () {
          isDir(getPath());
        },
      });
    });

  document.getElementById("add_folder").addEventListener("click", () => {
    let nameFolder = prompt("Please enter the name of the folder", "Folder");

    const folder = {
      rutaDir: getPath(),
      nameFolder: nameFolder,
    };

    if (window.ActiveXObject) xhr = new ActiveXObject("Microsoft.XMLHTTP");
    else xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        isDir(getPath());
      } else if (this.readyState == 4 && this.status == 500) {
        alert("Ups! This Folder can not be created successfully!");
      }
    };

    xhr.open("POST", "./../api/add_folder.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(folder));
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
      console.log(check1);
      var arr = [];
      $.each(check1, function () {
        arr.push($(this).next().find(".name_file_dir").val());
      });

      console.log(arr);

      var json_arr = JSON.stringify(arr);

      console.log(json_arr);

      //Formar JSON con rutas de todos los ficheros seleccionados
      window.location = encodeURI(
        "./../api/download_select.php?files=" +
          json_arr +
          "&folder=" +
          getPath()
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
