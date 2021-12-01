function menu_options_file(ruta) {
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
}
function add_event_options(options) {
  var op_download = options.children[0],
    op_favorite = options.children[1],
    op_delete = options.children[2];

  //Fila seleccionada
  var name_file_doc =
    op_download.parentElement.parentElement.parentElement.querySelector(
      ".name_file_dir"
    ).value;

  op_download.addEventListener("click", () => {
    window.location = encodeURI(
      "./../api/downloadFile.php?nameFile=" + getPath() + name_file_doc
    );
  });

  op_favorite.addEventListener("click", () => {
    var date_file =
      op_favorite.parentElement.parentElement.parentElement.querySelector(
        ".date_file"
      ).innerText;

    var userData = {
      name: name_file_doc,
      ruta: getPath() + name_file_doc,
      date: date_file,
    };

    $.ajax({
      type: "POST",
      url: "./../api/addfavorite.php",
      data: JSON.stringify(userData),
      dataType: "json",
      contentType: "application/json",
      async: true,
      success: function () {
        document.getElementById("notification_favourites").className =
          "notification_on";
      },
    }).fail((jqXHR, textStatus, errorThrown) => {
      if (jqXHR.status === 0) {
        alert("Not connect: Verify Network.");
      } else if (jqXHR.status == 404) {
        alert("Requested page not found [404]");
      } else if (jqXHR.status == 500) {
        alert("Internal Server Error [500].");
      }
      alert(errorThrown);
    });
  });

  op_delete.addEventListener("click", () => {
    $.ajax({
      type: "POST",
      url: "./../api/deletefile.php",
      data: { nameFile: getPath() + name_file_doc },
      dataType: "text",
      async: true,
      success: function () {
        isDir(getPath());
      },
    });
  });
}
