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

      add_event_options(ul, ruta);
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
function add_event_options(options, ruta) {
  var op_download = options.children[0],
    op_favorite = options.children[1],
    op_delete = options.children[2];

  //Fila seleccionada
  var row = op_download.parentElement.parentElement.parentElement.className;

  var name_file_doc = document.getElementsByClassName("name_file" + row)[0]
    .value;

  op_download.addEventListener("click", () => {
    console.log(ruta + name_file_doc);
    window.location = encodeURI(
      "./../api/downloadFile.php?nameFile=" + ruta + name_file_doc
    );
  });

  op_favorite.addEventListener("click", () => {
    let input_name = document.getElementsByClassName("name_file" + row)[0]
      .value;
    let date = document.getElementsByClassName(row)[0].children[2].innerHTML;
    let size = document.getElementsByClassName(row)[0].children[1].innerHTML;
    $.ajax({
      type: "POST",
      url: "./../api/addfavorite.php",
      data: {
        name: input_name,
        ruta: ruta + name_file_doc,
        date: date,
        size: size,
      },
      dataType: "json",
      async: true,
      success: function () {
        document.getElementsByClassName("name_file" + row)[0].style =
          "color:yellow";
      },
    });
  });

  op_delete.addEventListener("click", () => {
    $.ajax({
      type: "GET",
      url: "./../api/deletefile.php",
      data: { nameFile: ruta + name_file_doc },
      dataType: "text",
      async: true,
      success: function () {
        isDir(ruta);
      },
    });
  });
}
