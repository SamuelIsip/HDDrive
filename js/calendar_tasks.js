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
    // Tasks data
    var dia = document.getElementById("cal_day");
    var mes = document.getElementById("cal_month");
    var anio = document.getElementById("cal_year");

    // Calendar data
    var dia_cal = dia_selec < 10 ? "0" + dia_selec : dia_selec;
    var mes_cal =
      document.getElementById("mes").children[0].getAttribute("value") < 10
        ? "0" + document.getElementById("mes").children[0].getAttribute("value")
        : document.getElementById("mes").children[0].getAttribute("value");
    var anio_cal = document.getElementById("anio").value;

    if (dia_cal == "0") {
      dia_cal = "01";
    }

    if (mes_cal == "0") {
      mes_cal = "01";
    }

    if (anio_cal == "") {
      anio_cal = "2021";
    }

    dia.innerHTML = dia_cal;
    mes.innerHTML = mes_cal;
    anio.innerHTML = anio_cal;
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
            window.parent.document.getElementById("notification").className =
              "notification_on";
            // Clear inputs
            document.getElementById("task_calendar").value = "";
            document.getElementById("task_title").value = "";
          }
        };
        xhr.open("POST", "./../api/add_task.php", true);
        xhr.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        xhr.send(
          "task_text=" +
            tk_message +
            "&task_title=" +
            tk_title +
            "&task_day=" +
            tk_day +
            "&task_month=" +
            tk_month +
            "&task_year=" +
            tk_year
        );
      }
    });

  document
    .getElementById("close_task_calendar")
    .addEventListener("click", (event) => {
      event.preventDefault();
      document.getElementById("calendar__task__container").className =
        "calendar_task_no_styles";
    });
});
