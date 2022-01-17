<?php

    include_once("connectDB.php");

    //$user_data = file_get_contents('php://input');

    //$user_data = json_decode($user_data,true);

    //Consultar si ese usuario existe
    $email = $_GET[['email'];
    $newPass = password_hash($_GET['newPass'],PASSWORD_DEFAULT);

    $stmt = mysqli_prepare($con, "SELECT email FROM User WHERE email = ?");

    mysqli_stmt_bind_param($stmt, "s", $email);

    if(mysqli_stmt_execute($stmt) && (mysqli_stmt_affected_rows($stmt) == 1)){
        $stmt = mysqli_prepare($con, "UPDATE User SET password = ? WHERE email = ?");
        mysqli_stmt_bind_param($stmt, "ss", $newPass, $email);
        if(mysqli_stmt_execute($stmt)){
            //Liberamos recurso
            mysqli_stmt_close($stmt);
            mysqli_close($con);
            http_response_code(200);
            echo "Updated password successfully!";
        }
    }else{
        echo "User does not exist!";
    }

    //Liberamos recurso
    mysqli_stmt_close($stmt);
    mysqli_close($con);
    http_response_code(500);

?>