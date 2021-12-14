document.addEventListener("DOMContentLoaded", () => {
  window.load_favourites = function () {
    var list_fav = document.getElementById("list_fav");
    var xhr;

    if (window.ActiveXObject) xhr = new ActiveXObject("Microsoft.XMLHTTP");
    else xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        //Borramos la lista para actualizarla
        while (list_fav.hasChildNodes()) {
          list_fav.removeChild(list_fav.lastChild);
        }
        var i = 0;
        JSON.parse(this.responseText).favs.forEach((t) => {
          //Creamos los elementos de los tasks
          let date = document.createElement("p");
          date.innerHTML = t.date == "" ? "Date" : t.date;
          let size = document.createElement("p");
          size.innerHTML = t.size == "" ? "Size" : t.size;
          let ruta = document.createElement("p");
          ruta.innerHTML = t.ruta == "" ? "Ruta" : t.ruta;
          let isDir = document.createElement("p");
          isDir.innerHTML = t.isDir == "" ? "IsDir" : t.isDir;

          //Añadimos al task los elementos de la BD
          list_tasks.appendChild(date);
          list_tasks.appendChild(size);
          list_tasks.appendChild(ruta);
          list_tasks.appendChild(isDir);
          i++;
        });
      }
    };
    xhr.open("POST", "./../api/readFavourites.php", false);
    xhr.send();
  };
});
