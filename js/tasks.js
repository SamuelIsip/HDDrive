document.addEventListener("DOMContentLoaded", () => {
  window.add_tasks = function () {
    toggleLoader();
    var list_tasks = document.getElementById("list_tasks");
    var xhr;

    if (window.ActiveXObject) xhr = new ActiveXObject("Microsoft.XMLHTTP");
    else xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        //Borramos la lista para actualizarla
        while (list_tasks.hasChildNodes()) {
          list_tasks.removeChild(list_tasks.lastChild);
        }
        var i = 0;
        JSON.parse(this.responseText).tasks.forEach((t) => {
          //Creamos los elementos de los tasks
          let row = document.createElement("div");
          row.classList.add("row");
          let title = document.createElement("div");
          title.classList.add("col-12");
          let h4 = document.createElement("h4");
          h4.innerHTML = t.title == "" ? "Title" : t.title;
          title.appendChild(h4);
          let text = document.createElement("div");
          text.classList.add("col-12");
          let p = document.createElement("p");
          p.innerHTML = t.text == "" ? "Text" : t.text;
          text.appendChild(p);
          let date = document.createElement("div");
          date.classList.add("col-12");
          let h6 = document.createElement("h6");
          h6.innerHTML = t.date == "undefined/undefined/" ? "Date" : t.date;
          h6.style.textAlign = "right";
          date.appendChild(h6);
          let hr = document.createElement("hr");
          date.appendChild(hr);

          let div_buttons = document.createElement("div");
          div_buttons.classList.add("col-12");
          div_buttons.classList.add("container-buttons");

          let button_warning = document.createElement("button");
          button_warning.classList.add("btn");
          button_warning.classList.add("btn-warning");
          button_warning.setAttribute("id", "edit_task" + i);
          button_warning.innerHTML = "Edit";

          let button_danger = document.createElement("button");
          button_danger.classList.add("btn");
          button_danger.classList.add("btn-danger");
          button_danger.setAttribute("id", "delete_task" + i);
          button_danger.innerHTML = "Delete";

          div_buttons.appendChild(button_warning);
          div_buttons.appendChild(button_danger);

          //Evento
          button_warning.addEventListener("click", () => {
            edit_task(t.title, t.date, t.text);
          });
          //Evento
          button_danger.addEventListener("click", () => {
            delete_task(t.title, t.date);
          });

          //Añadimos al task los elementos de la BD
          row.appendChild(title);
          row.appendChild(text);
          row.appendChild(date);
          row.appendChild(div_buttons);
          list_tasks.appendChild(row);
          i++;
        });
      }
    };
    xhr.open("POST", "./../api/loadTasks.php", false);
    xhr.send();
    toggleLoader();
  };

  //Datos necesarios para update
  var old_task = [];
  var update = false;
  function edit_task(title, task_date, task_text) {
    document.getElementById("title").value = title;
    //Tokenizar Date
    let date = task_date.split("/");
    document.getElementById("date-input").value =
      date[2] + "-" + date[1] + "-" + date[0];
    document.getElementById("note").value = task_text;

    document.getElementById("title").style.border = "2px dotted black";
    document.getElementById("date-input").style.border = "2px dotted black";
    document.getElementById("note").style.border = "2px dotted black";

    update = true;
    old_task["title"] = title;
    old_task["date"] = task_date;
    old_task["text"] = task_text;

    document.getElementById("save_task").innerHTML = "Update";
  }

  function delete_task(title, task_date) {
    var xhr;

    if (window.ActiveXObject) xhr = new ActiveXObject("Microsoft.XMLHTTP");
    else xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        window.add_tasks();
      }
    };
    xhr.open("POST", "./../api/delete_task.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("&task_title=" + title + "&task_date=" + task_date);
  }

  document.getElementById("save_task").addEventListener("click", () => {
    let title = document.getElementById("title").value;
    let date = document.getElementById("date-input").value.split("-");
    let text = document.getElementById("note").value;

    //Tokenizar date
    let task_day = date[2];
    let task_month = date[1];
    let task_year = date[0];

    var xhr;

    if (window.ActiveXObject) xhr = new ActiveXObject("Microsoft.XMLHTTP");
    else xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        window.add_tasks();
      }
    };
    if (update) {
      //Hacemos update con los datos antiguos
      xhr.open("POST", "./../api/update_task.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(
        "task_text=" +
          text +
          "&task_title=" +
          title +
          "&task_day=" +
          task_day +
          "&task_month=" +
          task_month +
          "&task_year=" +
          task_year +
          "&old_title=" +
          old_task["title"] +
          "&old_date=" +
          old_task["date"] +
          "&old_text=" +
          old_task["text"]
      );
      update = false;
      document.getElementById("title").style.border = "1px solid #ced4da";
      document.getElementById("date-input").style.border = "1px solid #ced4da";
      document.getElementById("note").style.border = "1px solid #ced4da";
      document.getElementById("save_task").innerHTML = "Save";
    } else {
      //Hacemos insert con los nuevos datos
      xhr.open("POST", "./../api/add_task.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(
        "task_text=" +
          text +
          "&task_title=" +
          title +
          "&task_day=" +
          task_day +
          "&task_month=" +
          task_month +
          "&task_year=" +
          task_year
      );
    }
    document.getElementById("title").value = "";
    document.getElementById("date-input").value = "";
    document.getElementById("note").value = "";
  });
});
