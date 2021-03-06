<?php

    require_once("connectDB.php");

    session_name("userSession");
    session_start();

    //Insertamos datos de fichero a la BD
    $stmt=mysqli_prepare($con, "INSERT INTO tasks (id_user,title,text,date,modified) VALUES(?,?,?,?,?)");

    //Definimos parametros de la consulta
    //La funcion solo admite variables
    $id_user = $_SESSION["userID"];
    $name=$_POST['task_title'];
    $text=$_POST['task_text'];
    $date= $_POST['task_day']."/".$_POST['task_month']."/".$_POST['task_year'];
    $modified=date("d/m/Y");
    mysqli_stmt_bind_param($stmt,"issss",$id_user,$name,$text,$date,$modified);

    //Ejecutamos la consulta
    mysqli_stmt_execute($stmt);

    //Liberamos recurso
    mysqli_stmt_close($stmt);

    mysqli_close($con);

    header("HTTP/1.1 200 OK");

?>