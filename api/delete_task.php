<?php

    require_once("connectDB.php");

    //Borramos dato de la BD
    $stmt=mysqli_prepare($con, "DELETE FROM tasks WHERE title=? AND date=?");

    //Definimos parametros de la consulta
    //La funcion solo admite variables
    $title=$_POST['task_title'];
    $date= $_POST['task_date'];
    mysqli_stmt_bind_param($stmt,"ss",$title,$date);

    //Ejecutamos la consulta
    mysqli_stmt_execute($stmt);

    //Liberamos recurso
    mysqli_stmt_close($stmt);

    mysqli_close($con);

    header("HTTP/1.1 200 OK");

?>