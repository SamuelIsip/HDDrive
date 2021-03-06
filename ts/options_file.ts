import {
  isDir,
  getPath,
  deleteFileRecursive,
  readDocuments,
  resetLinkHead,
} from "./readDocuments";

export function menu_options_file() {
  var options_file = document.getElementsByClassName("options_file");

  for (let i = 0; i < options_file.length; i++) {
    options_file[i].addEventListener("click", () => {
      if (options_file[i].hasChildNodes())
        options_file[i].removeChild(options_file[i].lastChild);

      let ul = document.createElement("ul");
      ul.setAttribute("id", "options");

      let li1 = document.createElement("li");
      let downl = document.createElement("i");
      downl.classList.add("fas");
      downl.classList.add("fa-download");
      li1.appendChild(downl);

      let li2 = document.createElement("li");
      let star = document.createElement("i");
      star.classList.add("fas");
      star.classList.add("fa-star");
      li2.appendChild(star);

      let li3 = document.createElement("li");
      let trash = document.createElement("i");
      trash.classList.add("fas");
      trash.classList.add("fa-trash");
      li3.appendChild(trash);

      ul.appendChild(li1);
      ul.appendChild(li2);
      ul.appendChild(li3);

      options_file[i].appendChild(ul);

      add_event_options(ul);
    });
    options_file[i].addEventListener("mouseleave", () => {
      if (options_file[i].hasChildNodes())
        options_file[i].removeChild(options_file[i].lastChild);
      let op = document.createElement("i");
      op.classList.add("fas");
      op.classList.add("fa-ellipsis-v");
      options_file[i].appendChild(op);
    });
  }

  addLogOutEvent();
}
function add_event_options(options: HTMLUListElement) {
  var op_download = options.children[0],
    op_favorite = options.children[1],
    op_delete = options.children[2];

  //Fila seleccionada
  var name_file_doc = (<HTMLInputElement>(
    op_download.parentElement.parentElement.parentElement.querySelector(
      ".name_file_dir"
    )
  )).value;

  op_download.addEventListener("click", () => {
    window.location.href = encodeURI(
      "./../api/downloadFile.php?nameFile=" + getPath() + name_file_doc
    );
  });

  op_favorite.addEventListener("click", () => {
    var size_file = (<HTMLInputElement>(
      op_favorite.parentElement.parentElement.parentElement.querySelector(
        ".size_file"
      )
    )).innerText;
    var date_file = (<HTMLInputElement>(
      op_favorite.parentElement.parentElement.parentElement.querySelector(
        ".date_file"
      )
    )).innerText;

    var userData = {
      name: name_file_doc,
      ruta: getPath() + name_file_doc,
      size: size_file,
      date: date_file,
    };

    // Array y json para compatibilidad con funciones de
    // de selecci??n m??ltiple de favoritos
    var arrFiles = [JSON.stringify(userData)];

    var json_arr = JSON.stringify(arrFiles);

    $.ajax({
      type: "POST",
      url: "./../api/addfavorite.php",
      data: json_arr,
      contentType: "application/json",
      async: true,
      success: function () {
        document.getElementById("notification_favourites").className =
          "notification_on";
        // Remove the table, to reload files of index
        deleteFileRecursive();
        readDocuments();
        resetLinkHead();
      },
    });
  });

  op_delete.addEventListener("click", () => {
    var fileData = {
      nameFile: getPath() + name_file_doc,
    };
    $.ajax({
      type: "POST",
      url: "./../api/deletefile.php",
      data: JSON.stringify(fileData),
      dataType: "text",
      async: true,
      success: function () {
        isDir(getPath());
      },
    });
  });
}

function addLogOutEvent() {
  document
    .getElementsByClassName("user_log_out")[0]
    .addEventListener("click", () => {
      localStorage.removeItem("userName");
      localStorage.removeItem("userID");
      delete_cookie("userName");
      delete_cookie("userID");
      delete_cookie("cookieEnabled");
      window.location.href = encodeURI("./../");
    });
}

function delete_cookie(name: string) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
