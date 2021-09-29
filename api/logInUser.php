<?php

    include_once("connectDB.php");

    $user_data = file_get_contents('php://input');

    $user_data = json_decode($user_data,true);

    //Consultar si ese usuario existe
    $result = mysqli_query($con, "SELECT email, password, nom_usr, id_user FROM User;");

    for ($i=1; mysqli_num_rows($result) >= $i; $i++){
        $fila = mysqli_fetch_array($result,MYSQLI_ASSOC);
        if($fila['email'] == $user_data["email"] && password_verify($user_data["password"],$fila['password'])){
            mysqli_close($con);
            http_response_code(200);
            //Creamos la carpeta personal
            if(!is_dir("./../../HDDriveHome/".$fila['nom_usr'])){
                mkdir("./../../HDDriveHome/".$fila['nom_usr'],0777);
                mkdir("./../../HDDriveHome/".$fila['nom_usr']."/".$fila['nom_usr'],0777);
            }
            echo json_encode($fila);
            exit;
        }
    }

    http_response_code(404);
    exit;
?>