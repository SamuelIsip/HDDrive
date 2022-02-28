<?php

    include_once("connectDB.php");

    $stmt=mysqli_prepare($con, "SELECT SCHEMA_NAME
    FROM INFORMATION_SCHEMA.SCHEMATA
    WHERE SCHEMA_NAME = ?");

    $dbName ="hddrivedb";
    
    mysqli_stmt_bind_param($stmt,"s",$dbName);

    //Ejecutamos la consulta
    mysqli_stmt_execute($stmt);

    mysqli_stmt_bind_result($stmt, $nameDB);
    mysqli_stmt_fetch($stmt);

    if($nameDB === $dbName){
        echo "La Base de Datos ya existe!";
    else{
        
        mysqli_query($con, "CREATE DATABASE hddrivedb2");
        
        mysqli_select_db($con, "hddrivedb2");

        // Creamos Tablas
        mysqli_query($con, "CREATE TABLE `favorites` (
            `id_user` int NOT NULL,
            `date` varchar(50) NOT NULL,
            `size` varchar(50) DEFAULT NULL,
            `ruta` varchar(250) NOT NULL,
            `id_folder` int NOT NULL,
            `id_fav` int NOT NULL
          )");
    }

    //Liberamos recurso
    mysqli_stmt_close($stmt);

    mysqli_close($con);

?>