var ruta = "";
function readDocuments() {
  var div_list = document.getElementsByClassName("files")[0],
    table = document.createElement("table");

  $.ajax({
    url: "./../api/readDocs.php",
    type: "GET",
    dataType: "json",
    success: (doc) => {
      createList(doc, div_list, table);
    },
  });

  function createList(doc, div_list, table) {
    var count = 0;
    //Head
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    let th3 = document.createElement("th");

    th1.appendChild(document.createTextNode("Name"));
    th2.appendChild(document.createTextNode("File Size"));
    th3.appendChild(document.createTextNode("Date"));

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);

    thead.appendChild(tr);

    var tbody = document.createElement("tbody");

    doc.docs.forEach((nameDoc) => {
      //Body

      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");

      //Añadir datos

      if (nameDoc.isDirFile === "dir") {
        let i1 = document.createElement("i");
        i1.classList.add("fas");
        i1.classList.add("fa-folder-open");
        td1.appendChild(i1);
        td1.addEventListener("click", () => {
          //Añadir ruta a la linea superior
          var docs_header = document.getElementsByClassName("docs_header")[0];
          var li = document.createElement("li");
          var a = document.createElement("a");
          a.setAttribute("href", "#");
          a.appendChild(document.createTextNode(nameDoc.name));
          li.appendChild(a);
          docs_header.childNodes[1].appendChild(li);
          ruta += nameDoc.name + "/";
          isDir(ruta);
        });
      } else if (nameDoc.isDirFile === "file") {
        td1.addEventListener("click", () => {
          isFile(ruta + nameDoc.name);
        });
      }

      td1.appendChild(document.createTextNode(nameDoc.name));
      td1.classList.add("name_file");
      td2.appendChild(document.createTextNode(nameDoc.size));
      td2.classList.add("size_file");
      td3.appendChild(document.createTextNode(nameDoc.modific));
      td3.classList.add("date_file");

      td4.classList.add("options_file");
      td4.classList.add("row" + count);
      let i = document.createElement("i");
      i.classList.add("fas");
      i.classList.add("fa-ellipsis-v");
      td4.appendChild(i);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);

      count++;

      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    div_list.appendChild(table);

    menu_options_file(ruta);
  }

  function isDir(nameDoc) {
    var div_list = document.getElementsByClassName("files")[0],
      table = document.createElement("table");
    if (div_list.hasChildNodes()) div_list.removeChild(div_list.lastChild);
    $.ajax({
      url: "./../api/readDocs.php",
      type: "GET",
      dataType: "json",
      data: { nameDir: nameDoc },
      async: true,
      success: (doc) => {
        createList(doc, div_list, table);
      },
    });
  }

  function isFile(nameFile) {
    window.location = encodeURI(
      "./../api/downloadFile.php?nameFile=" + nameFile
    );
  }
}
