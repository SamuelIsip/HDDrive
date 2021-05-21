document.addEventListener("DOMContentLoaded", () => {
  var div_list = document.getElementsByClassName("files")[0];
  var ul = document.createElement("ul");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var doc = JSON.parse(this.responseText);
      createList(doc, div_list, ul);
    }
  };
  xhttp.open("GET", "./../api/readDocs.php", true);
  xhttp.send();

  function createList(doc, div_list, ul) {
    console.log(doc.docs[5].name);
    console.log(doc.docs.length);

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
      div.appendChild(document.createTextNode(nameDoc.name));
      li.appendChild(div);
      li.appendChild(div2);
      li.appendChild(div3);
      li.appendChild(div4);
      ul.appendChild(li);
    });

    div_list.appendChild(ul);
  }
});
