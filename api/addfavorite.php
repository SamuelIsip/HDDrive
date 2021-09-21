<?php

    include_once("connectDB.php");
    include_once("getSizeFile.php");

    //Insertamos datos de fichero a la BD
    $stmt=mysqli_prepare($con, "INSERT INTO favorites (id_user,name,date,modified,size,ruta) VALUES(?,?,?,?,?,?)");

    //Definimos parametros de la consulta
    //La funcion solo admite variables
    $id_user = 1 ;
    $name=$_POST['name'];
    $date= $_POST['date'];
    $modified=date("d/m/Y");
    $size = $_POST['size'];
    $ruta = $_POST['ruta'];
    mysqli_stmt_bind_param($stmt,"isssss",$id_user,$name,$date,$modified,$size,$ruta);

    //Ejecutamos la consulta
    mysqli_stmt_execute($stmt);

    //Liberamos recurso
    mysqli_stmt_close($stmt);

    mysqli_close($con);

    header("HTTP/1.1 200 OK");

?>