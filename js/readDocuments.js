document.addEventListener("DOMContentLoaded", () => {
  var div_list = document.getElementsByClassName("files")[0],
    ul = document.createElement("ul");

  $.ajax({
    url: "./../api/readDocs.php",
    type: "GET",
    dataType: "json",
    async: true,
    success: (doc) => {
      createList(doc, div_list, ul);
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

  function createList(doc, div_list, ul) {
    var count = 0;
    doc.docs.forEach((nameDoc) => {
      let li = document.createElement("li");
      let div = document.createElement("div");
      div.classList.add("name_file");
      let div2 = document.createElement("div");
      div2.classList.add("size_file");
      let div3 = document.createElement("div");
      div3.classList.add("date_file");
      let div4 = document.createElement("div");
      div4.classList.add("options_file");
      div4.classList.add("row" + count);
      div.appendChild(document.createTextNode(nameDoc.name));
      li.appendChild(div);
      li.appendChild(div2);
      li.appendChild(div3);
      li.appendChild(div4);
      li.appendChild(create_options(count));
      ul.appendChild(li);
    });

    div_list.appendChild(ul);
  }

  function create_options(count) {
    let div = document.createElement("div");
    div.classList.add("options");
    div.classList.add("option" + count);
    let ul = document.createElement("ul"),
      li1 = document.createElement("li"),
      i1 = document.createElement("i");
    i1.classList.add("fas fa-download");
    li1.appendChild(i1);
    let li2 = document.createElement("li"),
      i2 = document.createElement("i");
    i2.classList.add("fas fa-edit");
    li2.appendChild(i2);
    let li3 = document.createElement("li"),
      i3 = document.createElement("i");
    i3.classList.add("fas fa-trash");
    li3.appendChild(i3);

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);

    div.appendChild(ul);

    div.style.display = "none";

    return div;
  }
});
