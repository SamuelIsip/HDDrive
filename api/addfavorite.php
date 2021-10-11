<?php

    include_once("connectDB.php");
    include_once("getSizeFile.php");

    session_name("userSession");
    session_start();

    //Insertamos datos de fichero a la BD
    $stmt=mysqli_prepare($con, "INSERT INTO favorites (id_user, date, ruta, id_folder) VALUES(?,?,?,?)");

    //Definimos parametros de la consulta
    //La funcion solo admite variables
    $id_user = $_SESSION["userID"];
    $date = date("d/m/Y");
    $ruta = $_POST['ruta'];
    mysqli_stmt_bind_param($stmt,"isss",$id_user,$date,$ruta);

    //Ejecutamos la consulta
    mysqli_stmt_execute($stmt);

    //Liberamos recurso
    mysqli_stmt_close($stmt);

    mysqli_close($con);

    header("HTTP/1.1 200 OK");

?>