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
        $(".files__add__select ul li:nth-child(5)").css(
          "display",
          "inline-block"
        );
        $(".files__add__select ul li:nth-child(6)").css(
          "display",
          "inline-block"
        );
        $(".files__add__select ul li:nth-child(7)").css(
          "display",
          "inline-block"
        );
      } else {
        check_list[i].style.display = "none";
        $(".files__add__select ul li:nth-child(5)").css("display", "none");
        $(".files__add__select ul li:nth-child(6)").css("display", "none");
        $(".files__add__select ul li:nth-child(7)").css("display", "none");
      }
    }
  });

  // DOWNLOAD SELECTED FILES
  document
    .getElementById("download_files_selected")
    .addEventListener("click", () => {
      var check1 = $("input[name=check_file]:checked");
      var arr = [];
      $.each(check1, function () {
        arr.push($(this).next().find(".name_file_dir").val());
      });

      var json_arr = JSON.stringify(arr);

      //Formar JSON con rutas de todos los ficheros seleccionados
      window.location = encodeURI(
        "./../api/download_select.php?files=" +
          json_arr +
          "&folder=" +
          getPath()
      );
    });

  // ADD SELECTED FILES TO FAVOURITE
  document
    .getElementById("favourite_files_selected")
    .addEventListener("click", () => {
      var check1 = $("input[name=check_file]:checked");
      var arrFiles = [];
      $.each(check1, function () {
        let nameFolder = $(this).next().find(".name_file_dir").val();
        let size = $(this).parent().find(".size_file").text();
        let date = $(this).parent().find(".date_file").text();

        const fileData = {
          name: nameFolder,
          date: date,
          size: size,
          ruta: getPath() + nameFolder,
        };

        arrFiles.push(JSON.stringify(fileData));
      });

      var json_arr = JSON.stringify(arrFiles);

      console.log(json_arr);

      window.location = encodeURI("./../api/addfavorite.php?files=" + json_arr);

      //addToFavouriteFiles(json_arr);
    });

  async function addToFavouriteFiles(json_arr) {
    const response = await fetch("./../api/addfavorite.php", {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: json_arr,
    });
    if (response.ok) {
      let resp = await response.json();
      console.log(resp);
      document.getElementById("notification_favourites").className =
        "notification_on";
    } else {
      alert("Files cannot be added to favorites");
    }
  }

  // DELETE SELECTED FILES
  document
    .getElementById("delete_files_selected")
    .addEventListener("click", () => {
      var check1 = $("input[name=check_file]:checked");
      var arr = [];
      $.each(check1, function () {
        arr.push($(this).next().find(".name_file_dir").val());
      });

      const files_data = {
        files: arr,
        nameFile: getPath(),
      };

      deleteSelectFile(files_data);
    });

  async function deleteSelectFile(files_data) {
    const response = await fetch("./../api/deletefile.php", {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(files_data),
    });
    if (response.ok) {
      isDir(getPath());
    } else {
      alert("Files cannot be deleted");
    }
  }

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
