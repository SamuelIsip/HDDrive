<?php

    include_once("connectDB.php");

    $user_data = file_get_contents('php://input');

    $user_data = json_decode($user_data,true);

    //Consultar si ese usuario existe

    $result = mysqli_query($con, "SELECT email, nom_usr FROM User;");

    for ($i=1; mysqli_num_rows($result) >= $i; $i++){
        $fila = mysqli_fetch_row($result);
        if($fila[0] == $user_data["email"] || $fila[1] == $user_data["name_user"]){
            mysqli_close($con);
            http_response_code(409);
            exit;
        }
    }

    $stmt = mysqli_prepare($con, "INSERT INTO User (name,email,password,nom_usr,tlf,date) VALUES(?,?,?,?,?,?)");

    $modified=date("d/m/Y");

    mysqli_stmt_bind_param($stmt,"ssssss",$user_data["name"],$user_data["email"], password_hash($user_data["password"],PASSWORD_DEFAULT),$user_data["name_user"],$user_data["phone"],$modified);

    //Ejecutamos la consulta
    if(mysqli_stmt_execute($stmt))
        http_response_code(200); 
    else
        http_response_code(500); 

    //Liberamos recurso
    mysqli_stmt_close($stmt);



    //Consultar id usuario insertado
    $stmt = mysqli_prepare($con, "SELECT id_user FROM User WHERE nom_usr = ? AND password = ?");

    mysqli_stmt_bind_param($stmt,"ss", $user_data["name_user"], password_hash($user_data["password"],PASSWORD_DEFAULT));

    //Ejecutamos la consulta
    if(mysqli_stmt_execute($stmt)){

        mysqli_stmt_bind_result($stmt, $id_user);
        $datos=["id_user" => $id_user, "name_user" => $user_data["name_user"]];

        if(!is_dir("./../../HDDriveHome/".$user_data["name_user"])){
            mkdir("./../../HDDriveHome/".$user_data["name_user"],0777);
            mkdir("./../../HDDriveHome/".$user_data["name_user"]."/".$user_data["name_user"],0777);
        }
         //Liberamos recurso
        mysqli_stmt_close($stmt);
        http_response_code(200); 
        echo json_encode($datos);
        exit;
    }else
        http_response_code(500); 



    //Liberamos recurso
    mysqli_stmt_close($stmt);

    mysqli_close($con);
?>