<?php

    include_once("connectDB.php");

    //Seleccionamos datos de la BD
    $result = mysqli_query($con, "SELECT * FROM tasks;");

    $arr1 = array();
    $arr1["tasks"]=array();
    
    for ($i=1; mysqli_num_rows($result) >= $i; $i++){
        $fila=mysqli_fetch_row ($result);
        $arr2=array(
            "title" => $fila[2],
            "text" => $fila[3],
            "date" => $fila[4],
            "modified" => $fila[5]
        );

        array_push($arr1["tasks"], $arr2);
    }

    mysqli_close($con);

    http_response_code(200);

    echo json_encode($arr1);


?>