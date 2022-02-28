<?php

    include_once("connectDB.php");

    $stmt=mysqli_prepare($con, "SELECT SCHEMA_NAME
    FROM INFORMATION_SCHEMA.SCHEMATA
    WHERE SCHEMA_NAME = ?");

    $dbName ="hddrivedb2";
    
    mysqli_stmt_bind_param($stmt,"s",$dbName);

    //Ejecutamos la consulta
    mysqli_stmt_execute($stmt);

    mysqli_stmt_bind_result($stmt, $nameDB);
    mysqli_stmt_fetch($stmt);

    if($nameDB === $dbName){
        echo "La Base de Datos ya existe!";
    }else{
        
        mysqli_query($con, "CREATE DATABASE hddrivedb2");
        
        mysqli_select_db($con, $dbName);

        //Creamos tablas
        require_once("createTables.php");

        //Modificamos tablas       
        require_once("alterTables.php");
    }

    //Liberamos recurso
    mysqli_stmt_close($stmt);

    mysqli_close($con);

?>