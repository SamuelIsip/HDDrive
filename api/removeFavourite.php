<?php

    include_once("connectDB.php");

    session_name("userSession");
    session_start();

    //Borramos dato de la BD
    $stmt=mysqli_prepare($con, "DELETE FROM favorites WHERE id_user=? AND id_folder=?");

    //Definimos parametros de la consulta
    //La funcion solo admite variables
    $id_user = $_SESSION["userID"];
    $id_folder=$_POST['id_folder'];
    mysqli_stmt_bind_param($stmt,"ii",$id_user,$id_folder);

    //Ejecutamos la consulta
    mysqli_stmt_execute($stmt);

    //Liberamos recurso
    mysqli_stmt_close($stmt);

    mysqli_close($con);

    header("HTTP/1.1 200 OK");

?>