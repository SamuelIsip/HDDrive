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
        font-family: "Times New Roman", Times, serif;
        font-size: 17px;
      }
      #calendar_container_main form{
        display: flex;
        flex-direction: column;
        flex-wrap:wrap;
        border-radius: 5px;
        background: linear-gradient(
          333deg,
          rgb(44 45 58 / 93%) 0%,
          rgba(43, 174, 136, 1) 37%
        );
        box-shadow: 3px 3px 5px black;
      }
      form > div{
        margin-bottom:5px;
      }
     
      td:hover{
        box-shadow: 2px 3px 5px black;
        cursor: pointer;
        background-color: #2bae88;
        font-size: 19px;
      }

      #flechas{
        display:flex;
        flex-direction:row;
        justify-content:space-around;
      }

      hr{
        width:100%;
      }
      #calendar__task__container{
        width:250px;
        height:250px;
        background-color:rgba(28 196 134 / 92%);
        position:absolute;
        top:50%;
        left:50%;
        padding:5px;
        box-shadow: 2px 3px 5px black;
        transform: translate(-50%,-50%);
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
        margin:0px;
        font-size:25px;
        display: inline-block;
      }
      #task_title{
        padding:5px;
        border:1px solid black;
        border-radius: 5px;
      }
      #task_calendar{
        resize:none;
        padding:5px;
        border:1px solid black;
        border-radius: 5px;
        margin-bottom:5px;
      }
      #calendar__task__container button{ç
        border:1px solid black;
        border-radius:5px;
        padding:5px;
      }
      #calendar__task__container button:hover{
        cursor: pointer;
      }
      #save_task_calendar{
        background-color: #26f226;
      }
      #close_task_calendar{
        background-color: #ff0000;
      }
      .calendar_task_styles{
        visibility: visible;
      }

      .calendar_task_no_styles{
        visibility: hidden;
      }

      input:hover{
        cursor: pointer;
      }

      #anio{
        width: 100px;
        padding: 10px;
      }

      #mes{
        width: 100px;
        padding: 10px;
      }

      #flechas input[type="submit"]{
        width: 50px;
        height:50px;
      }

      #select_day{
        margin:auto;
        width:40%;
        padding: 10px;
        font-weight: 700;
      }

      #calendar_container_main{
        display: flex;
        flex-direction:column;
        flex-wrap:wrap;
        justify-content:center;
        text-align:center;
        padding: 10px;
        box-shadow: 2px 3px 5px black;
        border-radius:5px;
        background-color: white;
      }

      #flecha1{
        font-size:20px;
        font-weight:700;
        border-radius: 50px 0px 0px 50px;
        
      }
      #flecha2{
        font-size:20px;
        font-weight:700;
        border-radius: 0px 50px 50px 0px;
        
      }

      #flecha1:hover{
        background-color:rgb(0, 134, 60);
      }
      #flecha2:hover{
        background-color:rgb(0, 134, 60);
      }
    </style>
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
                              font-size: 17px;">
                  <caption>';

              setlocale(LC_TIME, "en");
              echo strftime("%B %Y", mktime(0, 0, 0, $mes, 1, $anio));

            echo '</caption>
                  <thead>
                    <tr>
                      <th style="border: 1px solid black">Monday</th>
                      <th style="border: 1px solid black">Tuesday</th>
                      <th style="border: 1px solid black">Wednesday</th>
                      <th style="border: 1px solid black">Thursday</th>
                      <th style="border: 1px solid black">Friday</th>
                      <th style="border: 1px solid black">Saturday</th>
                      <th style="color: red; border: 1px solid black">Sunday</th>
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