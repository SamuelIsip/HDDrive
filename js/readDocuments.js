function readDocuments() {
  var div_list = document.getElementsByClassName("files")[0],
    table = document.createElement("table");

  $.ajax({
    url: "./../api/readDocs.php",
    type: "GET",
    dataType: "json",
    async: true,
    success: (doc) => {
      createList(doc, div_list, table);
    },
  });

  /*  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var doc = JSON.parse(this.responseText);
      createList(doc, div_list, ul);
    }
  };
  xhttp.open("GET", "./../api/readDocs.php", true);
  xhttp.send(); */

  function createList(doc, div_list, table) {
    console.log(doc);
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
      td1.appendChild(document.createTextNode(nameDoc.name));
      td1.classList.add("name_file");
      td2.appendChild(document.createTextNode("18 KB"));
      td2.classList.add("size_file");
      td3.appendChild(document.createTextNode("24/05/2021"));
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
      tr.appendChild(create_options(count));

      count++;

      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    div_list.appendChild(table);

    menu_options_file();
  }

  function create_options(count) {
    let div = document.createElement("div");
    div.classList.add("options");
    div.classList.add("option" + count);
    let ul = document.createElement("ul"),
      li1 = document.createElement("li"),
      i1 = document.createElement("i");
    i1.classList.add("fas");
    i1.classList.add("fa-download");
    li1.appendChild(i1);
    let li2 = document.createElement("li"),
      i2 = document.createElement("i");
    i2.classList.add("fas");
    i2.classList.add("fa-edit");
    li2.appendChild(i2);
    let li3 = document.createElement("li"),
      i3 = document.createElement("i");
    i3.classList.add("fas");
    i3.classList.add("fa-trash");
    li3.appendChild(i3);

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);

    div.appendChild(ul);

    div.style.display = "none";

    return div;
  }
}
