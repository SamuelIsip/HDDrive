document.addEventListener("DOMContentLoaded", () => {
  window.load_favourites = function () {
    var list_fav = document.getElementsByClassName("table_favs")[0];
    var xhr;

    if (window.ActiveXObject) xhr = new ActiveXObject("Microsoft.XMLHTTP");
    else xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        deleteFileRecursive();
        var tbody = document.createElement("tbody");
        createFavList(tbody, this.responseText);
        list_fav.appendChild(tbody);
      }
    };
    xhr.open("POST", "./../api/readFavourites.php", false);
    xhr.send();
  };

  function createFavList(tbody, responseText) {
    JSON.parse(responseText).favs.forEach((t) => {
      let tr = document.createElement("tr");
      tr.classList.add(t.idFolder);
      let star = document.createElement("td");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");

      let icon_star = document.createElement("i");
      icon_star.classList.add("fas");
      icon_star.classList.add("fa-star");
      star.appendChild(icon_star);
      star.classList.add("fav_star");

      star.addEventListener("click", () => {
        removeFavourite(star);
      });

      let input_name = document.createElement("input");
      input_name.setAttribute("type", "text");
      input_name.style.cssText = `
        background-color: transparent;
        border: none;
      `;

      input_name.value = t.ruta.substring(1, t.ruta.size());
      input_name.setAttribute("readonly", "");
      input_name.classList.add("name_file_dir");
      td1.appendChild(input_name);
      td1.classList.add("name_file");
      td2.appendChild(document.createTextNode(t.size));
      td2.classList.add("size_file");
      td3.appendChild(document.createTextNode(t.date));
      td3.classList.add("date_file");

      td1.addEventListener("click", () => {
        window.location = encodeURI(
          "./../api/downloadFile.php?nameFile=" + td1.firstElementChild.value
        );
      });

      tr.appendChild(star);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);

      tbody.appendChild(tr);
    });
  }

  function deleteFileRecursive() {
    var div_list = document.getElementsByClassName("table_favs")[0];
    if (div_list.hasChildNodes() && div_list.childElementCount > 1)
      div_list.removeChild(div_list.lastChild);
  }

  function removeFavourite(star) {
    let id_folder = star.parentElement.className;
    var xhr;

    if (window.ActiveXObject) xhr = new ActiveXObject("Microsoft.XMLHTTP");
    else xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        window.load_favourites();
      }
    };
    xhr.open("POST", "./../api/removeFavourite.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("id_folder=" + id_folder);
  }
});
