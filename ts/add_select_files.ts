import {
  isDir,
  getPath,
  deleteFileRecursive,
  readDocuments,
  resetLinkHead,
} from "./readDocuments";

export function load_events_add_select() {
  document
    .getElementById("add_file")
    .parentElement.addEventListener("change", () => {
      var form_data = new FormData();
      form_data.append("rutaDir", getPath());
      var ins = (<HTMLInputElement>document.getElementById("add_file")).files
        .length;
      for (var x = 0; x < ins; x++) {
        form_data.append(
          "file[]",
          (<HTMLInputElement>document.getElementById("add_file")).files[x]
        );
      }
      var totalSize: number = parseInt(localStorage.getItem("totalStorage"));
      if (totalSize >= 20000) {
        alert(
          "You have exceeded the maximum storage capacity! Please, increase it!"
        );
        return;
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

    let xhr;

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
    //Mostrar todas las opciones de check
    toggleCheckOptionsAndBackgroundColor();
  });

  function toggleCheckOptionsAndBackgroundColor() {
    toggleCheckOptions();
    document
      .getElementById("select_files")
      .parentElement.classList.toggle("check_select_color");
  }

  function toggleCheckOptions() {
    var check_list = document.getElementsByClassName("check_file");
    for (let i = 0; i < check_list.length; i++) {
      if ((<HTMLElement>check_list[i]).style.display === "none") {
        (<HTMLElement>check_list[i]).style.display = "inline-block";
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
        (<HTMLElement>check_list[i]).style.display = "none";
        $(".files__add__select ul li:nth-child(5)").css("display", "none");
        $(".files__add__select ul li:nth-child(6)").css("display", "none");
        $(".files__add__select ul li:nth-child(7)").css("display", "none");
      }
    }
  }

  // DOWNLOAD SELECTED FILES
  document
    .getElementById("download_files_selected")
    .addEventListener("click", () => {
      var check1 = $("input[name=check_file]:checked");
      var arr: string[] = [];
      $.each(check1, function () {
        arr.push($(this).next().find(".name_file_dir").val().toString());
      });

      var json_arr = JSON.stringify(arr);

      //Formar JSON con rutas de todos los ficheros seleccionados
      window.location.href = encodeURI(
        "./../api/download_selected.php?files=" +
          json_arr +
          "&nameFolder=" +
          getPath()
      );
      toggleCheckOptionsAndBackgroundColor();
    });

  // ADD SELECTED FILES TO FAVOURITE
  document
    .getElementById("favourite_files_selected")
    .addEventListener("click", () => {
      var check1 = $("input[name=check_file]:checked");
      var arrFiles: string[] = [];
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

      addToFavouriteFiles(json_arr);
      toggleCheckOptionsAndBackgroundColor();
    });

  async function addToFavouriteFiles(json_arr: string) {
    const response = await fetch("./../api/addfavorite.php", {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: json_arr,
    });
    if (response.ok) {
      document.getElementById("notification_favourites").className =
        "notification_on";
      // Remove the table, to reload files of index
      deleteFileRecursive();
      readDocuments();
      resetLinkHead();
    } else {
      alert("Files cannot be added to favorites");
    }
  }

  // DELETE SELECTED FILES
  document
    .getElementById("delete_files_selected")
    .addEventListener("click", () => {
      var check1 = $("input[name=check_file]:checked");
      var arr: string[] = [];
      $.each(check1, function () {
        arr.push($(this).next().find(".name_file_dir").val().toString());
      });

      const files_data = {
        files: arr,
        nameFile: getPath(),
      };

      deleteSelectFile(JSON.stringify(files_data));
      toggleCheckOptionsAndBackgroundColor();
    });

  async function deleteSelectFile(files_data: string) {
    const response = await fetch("./../api/deletefile.php", {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: files_data,
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

      isDir(getPath() + "/");
    }
  });
}
