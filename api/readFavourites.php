<?php
    
    include_once("connectDB.php");

    $userID =  $_SESSION["userID"];

     //Consultar ficheros favoritos
     $result = mysqli_query($con, "SELECT date, ruta FROM favorites;");

     $arr1 = array();
     $arr1["favs"]=array();

     for ($i=1; mysqli_num_rows($result) >= $i; $i++){
        $fila = mysqli_fetch_row($result);
        
        $arr2=array(
            "date"=>$fila[0],
            "size"=>is_dir($fila[1]) ? get_size($fila[1]) : convert_size(filesize($fila[1])),
            "ruta"=> fila[1],
            "isDirFile"=>is_dir($fila[1]) ? "dir" : "file" 
        );

        array_push($arr1["favs"], $arr2);

    }

    mysqli_close($con);
    
    http_response_code(200);

    echo json_encode($arr1);

?>