<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calendario</title>
    <script src="./../js/calendar_tasks.js"></script>
    <link rel="stylesheet" href="../css/calendar.css" />
  </head>
  <body>

  <div id="calendar__task__container" class="calendar_task_no_styles">
      <form action="#" method="post">
        <div>
          <p id="cal_day">01</p>
          <p>&nbsp;/&nbsp;</p>
          <p id="cal_month">01</p>
          <p>&nbsp;/&nbsp;</p>
          <p id="cal_year">2021</p>
        </div>
        <hr>
        <input name="task_title" id="task_title" type="text" placeholder="Title">
        <textarea name="task_calendar" id="task_calendar" cols="5" rows="5" placeholder="Task Message"></textarea>
        <button id="save_task_calendar">Save</button>
        <button id="close_task_calendar">Close</button>
      </form>
  </div>

  <?php

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
      }else{
        $mes2 = 01;
        $anio2 = 2021;
      }

  ?>
  <div id="calendar_container_main">
    <form action="calendar.php" method="GET">
      <div>
        <label for="mes">Select Month</label>
        <select name="mes" id="mes">
          <option value="<?=($retr === "true" || ($avza ==="true")) ? $mes2 : $_GET['mes']?>">Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <div>
        <label for="anio">Enter the Year</label>
        <input type="number" id="anio" name="anio" value="<?=($retr === "true" || ($avza ==="true")) ? $anio2 : $_GET['anio']?>" placeholder="Year" />
      </div>
      <input type="submit" id="select_day" name="btn" value="SELECT DAY" />
      <div id="flechas">
        <input type="submit" id="flecha1" name="ret" value='<'>
        <input type="submit" id="flecha2" name="avz" value='>'>
      </div>
      <input type="text" name="mes2" id="mes2" value="<?=$mes2?>" style="display:none">
      <input type="text" name="anio2" id="anio2" value="<?=$anio2?>" style="display:none">
    </form>

      <?php 
        if(isset($_GET['btn'])){
          calendario($_GET['mes'],$_GET['anio']);
        }
        else if($retr === "true"){
          calendario($mes2,$anio2);
        }
        else if($avza === "true"){
          calendario($mes2,$anio2);
        }else{
          calendario($mes2,$anio2);
        }


      ?>

    <?php
     

      function calendario($mes,$anio){

        if (($anio!=="") && ($mes!=="")) {
          echo '<table style="margin: 5px;
                              text-transform: uppercase;
                              text-align: center;
                              font-size: 25px;
                              background-color: white;
                              color: white">
                  <caption>';

              setlocale(LC_TIME, "en");
              echo strftime("%B %Y", mktime(0, 0, 0, $mes, 1, $anio));

            echo '</caption>
                  <thead>
                    <tr style="font-size:17px; color: black">
                      <th style="border: 1px solid black">Mon</th>
                      <th style="border: 1px solid black">Tues</th>
                      <th style="border: 1px solid black">Wed</th>
                      <th style="border: 1px solid black">Thur</th>
                      <th style="border: 1px solid black">Fri</th>
                      <th style="border: 1px solid black">Sat</th>
                      <th style="color: red; border: 1px solid black">Sun</th>
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