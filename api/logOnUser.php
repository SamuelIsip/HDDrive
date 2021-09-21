<?php

    include_once("connectDB.php");

    $user_data = json_decode($_POST['json_user'],true);

    //Consultar si ese usuario existe

    $result = mysqli_query($con, "SELECT email FROM User;");

    for ($i=1; mysqli_num_rows($result) >= $i; $i++){
        $fila = mysqli_fetch_row($result);
        if($fila[0] == $user_data["email"]){
            mysqli_close($con);
            http_response_code(409);
            exit;
        }
    }

    $stmt = mysqli_prepare($con, "INSERT INTO User (name,email,password,nom_usr,tlf,date) VALUES(?,?,?,?,?,?)");

    $modified=date("d/m/Y");

    mysqli_stmt_bind_param($stmt,"ssssss",$user_data["name"],$user_data["email"],$user_data["password"],$user_data["name_user"],$user_data["phone"],$modified);

    //Ejecutamos la consulta
    if(mysqli_stmt_execute($stmt))
        http_response_code(200); 
    else
        http_response_code(500); 

    //Liberamos recurso
    mysqli_stmt_close($stmt);

    mysqli_close($con);
?>