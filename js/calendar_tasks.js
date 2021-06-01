document.addEventListener("DOMContentLoaded", () => {
  var dias_semana = document.getElementsByTagName("td");
  for (let i = 0; i < dias_semana.length; i++) {
    if (dias_semana[i].hasAttribute("id")) {
      dias_semana[i].addEventListener("click", () => {
        document.getElementById("calendar__task__container").className =
          "calendar_task_styles";
        cargar_funcioanlidades_task(dias_semana[i].innerHTML);
      });
    }
  }

  function cargar_funcioanlidades_task(dia_selec) {
    var dia = document.getElementById("cal_day");
    var mes = document.getElementById("cal_month");
    var anio = document.getElementById("cal_year");

    dia.innerHTML = dia_selec < 10 ? "0" + dia_selec : dia_selec;
    mes.innerHTML =
      document.getElementById("mes").children[0].getAttribute("value") < 10
        ? "0" + document.getElementById("mes").children[0].getAttribute("value")
        : document.getElementById("mes").children[0].getAttribute("value");
    anio.innerHTML = document.getElementById("anio").value;
  }

  document
    .getElementById("save_task_calendar")
    .addEventListener("click", (event) => {
      event.preventDefault();
      let tk_message = document.getElementById("task_calendar").value;
      let tk_title = document.getElementById("task_title").value;
      let tk_day = document.getElementById("cal_day").innerHTML;
      let tk_month = document.getElementById("cal_month").innerHTML;
      let tk_year = document.getElementById("cal_year").innerHTML;

      if (tk_message != "" || tk_title != "") {
        var xhr;

        if (window.ActiveXObject) xhr = new ActiveXObject("Microsoft.XMLHTTP");
        else xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            document.getElementById("calendar__task__container").className =
              "calendar_task_no_styles";
          }
        };
        xhr.open("POST", "./../api/add_task.php", true);
        xhr.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        xhr.send(
          "task_calendar=" +
            tk_message +
            "&task_title=" +
            tk_title +
            "&cal_day=" +
            tk_day +
            "&cal_month=" +
            tk_month +
            "&cal_year=" +
            tk_year
        );
      }
    });

  document
    .getElementById("close_task_calendar")
    .addEventListener("click", () => {
      document.getElementById("calendar__task__container").className =
        "calendar_task_no_styles";
    });
});
