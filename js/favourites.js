document.addEventListener("DOMContentLoaded", () => {
  window.load_favourites = function () {
    var list_fav = document.getElementsByClassName("table_favs")[0];
    var xhr;

    if (window.ActiveXObject) xhr = new ActiveXObject("Microsoft.XMLHTTP");
    else xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        deleteFileRecursive();
        var count = 0;

        var tbody = document.createElement("tbody");
        createFavList(tbody, this.responseText, count);
        list_fav.appendChild(tbody);
      }
    };
    xhr.open("POST", "./../api/readFavourites.php", false);
    xhr.send();
  };

  function createFavList(tbody, responseText, count) {
    JSON.parse(responseText).favs.forEach((t) => {
      let tr = document.createElement("tr");
      tr.classList.add(count);
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");

      let input_name = document.createElement("input");
      input_name.setAttribute("type", "text");
      input_name.style.cssText = `
        backround-color: transparent;
        border: none;
      `;

      input_name.value = t.ruta;
      input_name.setAttribute("readonly", "");
      input_name.classList.add("name_file_dir");
      td1.appendChild(input_name);
      td1.classList.add("name_file");
      td2.appendChild(document.createTextNode(t.size));
      td2.classList.add("size_file");
      td3.appendChild(document.createTextNode(t.date));
      td3.classList.add("date_file");

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);

      count++;
      tbody.appendChild(tr);
    });
  }
  function deleteFileRecursive() {
    var div_list = document.getElementsByClassName("table_favs")[0];
    if (div_list.hasChildNodes() && div_list.childElementCount > 1)
      div_list.removeChild(div_list.lastChild);
  }
});
