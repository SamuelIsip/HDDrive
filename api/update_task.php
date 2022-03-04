<?php

    require_once("connectDB.php");

    session_name("userSession");
    session_start();

    //Insertamos datos de fichero a la BD
    $stmt=mysqli_prepare($con, "UPDATE tasks SET id_user=?,title=?,text=?,date=?,modified=? WHERE title=? AND text=? AND date=?");

    //Nuevos datos
    $id_user = $_SESSION["userID"];
    $name=$_POST['task_title'];
    $text=$_POST['task_text'];
    $date= $_POST['task_day']."/".$_POST['task_month']."/".$_POST['task_year'];
    $modified=date("d/m/Y");

    //Old data
    $old_name=$_POST['old_title'];
    $old_text=$_POST['old_text'];
    $old_date= $_POST['old_date'];

    //Definimos parametros de la consulta
    //La funcion solo admite variables
    mysqli_stmt_bind_param($stmt,"isssssss",$id_user,$name,$text,$date,$modified,$old_name,$old_text,$old_date);

    //Ejecutamos la consulta
    mysqli_stmt_execute($stmt);

    //Liberamos recurso
    mysqli_stmt_close($stmt);

    mysqli_close($con);

    header("HTTP/1.1 200 OK");

?>