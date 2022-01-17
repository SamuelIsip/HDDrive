<?php

    include_once("connectDB.php");

    //$user_data = file_get_contents('php://input');

    //$user_data = json_decode($user_data,true);

    //Consultar si ese usuario existe
    $email = $_GET['email'];
    $newPass = password_hash($_GET['newPass'],PASSWORD_DEFAULT);

    echo $email;
    echo $newPass;

    $stmt = mysqli_prepare($con, "SELECT email FROM User WHERE email = ?");

    mysqli_stmt_bind_param($stmt, "s", $email);

    mysqli_stmt_execute($stmt);
    echo(mysqli_stmt_affected_rows($stmt));

    mysqli_stmt_bind_result($stmt, $emailP);

    mysqli_stmt_fetch($stmt);

    echo($emailP);
    

    //Liberamos recurso
    mysqli_stmt_close($stmt);
    mysqli_close($con);
    http_response_code(500);

?>