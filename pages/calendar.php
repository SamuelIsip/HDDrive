<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calendario</title>
    <script src="./../js/calendar_tasks.js"></script>
    <style>
      body{
        position: relative;
      }
      td:hover{
        cursor: pointer;
        background-color:blue;
      }

      hr{
        width:100%;
      }
      #calendar__task__container{
        width:200px;
        height:200px;
        background-color:green;
        position:absolute;
        top:0;
        left:0;
        padding:5px;
      }
      #calendar__task__container form {
        width:100%;
        height:100%;
        display:flex;
        flex-direction:column;
        justify-content:center;
      }
      #calendar__task__container form div{
        text-align:center;
      }
      #calendar__task__container form div p{
        display: inline-block;
      }
      #task_calendar{
        resize:none;
      }
      .calendar_task_styles{
        visibility: visible;
        z-index: 10;
        top: 50%;
        left: 50%;
      }

      .calendar_task_no_styles{
        visibility: hidden;
      }

    </style>
  </head>
  <body>

  <div id="calendar__task__container" class="calendar_task_no_styles">
      <form action="#" method="post">
        <div>
          <p id="cal_day">01</p>
          <p id="cal_month">01</p>
          <p id="cal_year">2021</p>
        </div>
        <hr>
        <input name="task_title" id="task_title" type="text" placeholder="Title">
        <textarea name="task_calendar" id="task_calendar" cols="5" rows="5" placeholder="Task Message"></textarea>
        <button id="save_task_calendar">Save</button>
        <button id="close_task_calendar">Close</button>
      </form>
  </div>

  <?

      if(isset($_GET['ret'])){
        $mes2 = --$_GET['mes2'];
        $anio2 = $_GET['anio2'];

        if($mes2<=0){
          --$anio2;
          $mes2 = 12; 
        }

        $retr = "true";
      }elseif(isset($_GET['avz'])){
        $mes2 = ++$_GET['mes2'];
        $anio2= $_GET['anio2'];

        if($mes2>=13){
          ++$anio2;
          $mes2 = 1; 
        }

        $avza = "true";
      }elseif(isset($_GET['btn'])){
        $mes2 = $_GET['mes'];
        $anio2 = $_GET['anio'];
      }

  ?>
  <div id="calendar_container_main">
    <h1>Calendar</h1>
    <form action="calendar.php" method="GET">
      <select name="mes" id="mes">
        <option value="<?=$_GET['mes']?>">Mes</option>
        <option value="1">Enero</option>
        <option value="2">Febrero</option>
        <option value="3">Marzo</option>
        <option value="4">Abril</option>
        <option value="5">Mayo</option>
        <option value="6">Junio</option>
        <option value="7">Julio</option>
        <option value="8">Agosto</option>
        <option value="9">Septiembre</option>
        <option value="10">Octubre</option>
        <option value="11">Noviembre</option>
        <option value="12">Diciembre</option>
      </select>
      <input type="number" id="anio" name="anio" value="<?=$_GET['anio']?>" placeholder="Año" />
      <br><br>
      <input type="submit" name="btn" value="Crear" />
      <br><br>
      <input type="submit" name="ret" value='<'>
      <input type="submit" name="avz" value='>'>
      <input type="text" name="mes2" id="mes2" value="<?=$mes2?>" style="display:none">
      <input type="text" name="anio2" id="anio2" value="<?=$anio2?>" style="display:none">
    </form>

      <?  
        if(isset($_GET['btn'])){
          calendario($_GET['mes'],$_GET['anio']);
        }
        if($retr === "true"){
          calendario($mes2,$anio2);
        }
        if($avza === "true"){
          calendario($mes2,$anio2);
        }

      ?>

    <?
     

      function calendario($mes,$anio){

        if (($anio!=="") && ($mes!=="")) {
          echo '<table style="margin: 10px;
                              text-transform: uppercase;
                              text-align: center;
                              font-size: 25px;">
                  <caption>';

              setlocale(LC_TIME, "es");
              echo strftime("%B %Y", mktime(0, 0, 0, $mes, 1, $anio));

            echo '</caption>
                  <thead>
                    <tr>
                      <th style="border: 1px solid black">Lunes</th>
                      <th style="border: 1px solid black">Martes</th>
                      <th style="border: 1px solid black">Miércoles</th>
                      <th style="border: 1px solid black">Jueves</th>
                      <th style="border: 1px solid black">Viernes</th>
                      <th style="border: 1px solid black">Sábado</th>
                      <th style="color: red; border: 1px solid black">Domingo</th>
                    </tr>
                  </thead>
                  <tbody>';

              $dias_del_mes =  cal_days_in_month(CAL_GREGORIAN, $mes, $anio);

              $dia_semana = strftime("%u", mktime(0, 0, 0, $mes, 1, $anio));

              $numdia = 1;
              $num = 1;
                  while ($numdia<=$dias_del_mes) { 
          
                    echo "<tr>";
          
                      for ($j=1; $j <= 7; $j++) { 
                        if(($num>=$dia_semana) && ($numdia<=$dias_del_mes)){
                          ($j==7) ? $color="red" : $color="black";
          
                            echo '<td id='.$numdia.' style="color:'.$color.'; border: 1px solid black">';
        
                              echo $numdia;
                              $numdia++;            
          
                            echo "</td>";
          
                        }else{
          
                            echo '<td style="border: 1px solid black"></td>';
          
                        }  
                        $num++; 
                      }
          
                    echo "</tr>";
                        
                  }
            

          echo " </tbody>
              </table>";
        }
      }

    ?>
    </div>

  </body>
</html>