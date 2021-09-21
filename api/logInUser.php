<?php

    include_once("connectDB.php");

    $user_data = file_get_contents('php://input');

    $user_data = json_decode($user_data,true);

    //Consultar si ese usuario existe
    $result = mysqli_query($con, "SELECT email, password, nom_usr FROM User;");

    for ($i=1; mysqli_num_rows($result) >= $i; $i++){
        $fila = mysqli_fetch_row($result);
        if($fila[0] == $user_data["email"] && $fila[1] == $user_data["password"]){
            mysqli_close($con);
            http_response_code(200);
            //Creamos la carpeta personal
            if(!is_dir("./../../HDDriveHome/".$fila[2])){
                mkdir("./../../HDDriveHome/".$fila[2],0777);
            }
            echo $fila[2];
            exit;
        }
    }

    http_response_code(404);
    exit;
?>