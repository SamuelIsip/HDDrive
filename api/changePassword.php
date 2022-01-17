<?php

    include_once("connectDB.php");

    $user_data = json_decode(file_get_contents('php://input'),true);

    $email = $user_data['email'];
    $newPass = password_hash($user_data['newPass'],PASSWORD_DEFAULT);
    
    //Consultar si ese usuario existe
    $stmt = mysqli_prepare($con, "SELECT email FROM User WHERE email = ?");

    mysqli_stmt_bind_param($stmt, "s", $email);

    
    if(mysqli_stmt_execute($stmt)){
        
        mysqli_stmt_store_result($stmt);

        if(mysqli_stmt_affected_rows($stmt) == 1){
            //Liberamos recurso
            mysqli_stmt_close($stmt);
                    
            //Actualizar contraseña
            $stmt = mysqli_prepare($con, "UPDATE User SET password = ? WHERE email = ?");
            mysqli_stmt_bind_param($stmt, "ss", $newPass, $email);

            if(mysqli_stmt_execute($stmt)){
                http_response_code(200);
                cerrarConexiones($con, $stmt);
            }else{
                http_response_code(500); //Error al actualizar
                cerrarConexiones($con, $stmt);
            }
        }
        
    }else{
        http_response_code(404); //Email no encontrado
        cerrarConexiones($con, $stmt);
    }

    function cerrarConexiones($con, $stmt){
        mysqli_stmt_close($stmt);
        mysqli_close($con);
        exit;
    }
?>