<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/favourites.css" />
    <title>Favourites</title>
  </head>
  <body>
    <?php
      
      include_once("connectDB.php");

      $userID = $_SESSION["userID"];

      //Consultar ficheros favoritos
      $result = mysqli_query($con, "SELECT date, ruta FROM favorites;");

      $arr1 = array();
      $arr1["favs"]=array();

      for ($i=1; mysqli_num_rows($result) >= $i; $i++){
          $fila = mysqli_fetch_row($result);
          
          $arr2=array(
              "date"=>$fila[0],
              "ruta"=> fila[1],
              "isDirFile"=>is_dir($fila[1]) ? "dir" : "file" 
          );

          array_push($arr1["favs"], $arr2);

      }

      mysqli_close($con);
      
      http_response_code(200);

      echo json_encode($arr1);

    ?>
  </body>
</html>
