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

        // Creamos Tablas
        //FAVORITOS
        mysqli_query($con, "CREATE TABLE `favorites` (
            `id_user` int NOT NULL,
            `date` varchar(50) NOT NULL,
            `size` varchar(50) DEFAULT NULL,
            `ruta` varchar(250) NOT NULL,
            `id_folder` int NOT NULL,
            `id_fav` int NOT NULL AUTO_INCREMENT
        )");

        //FICHEROS
          mysqli_query($con, "CREATE TABLE `file` (
            `id_file` int NOT NULL AUTO_INCREMENT,
            `id_folder` int DEFAULT NULL,
            `name` varchar(100) DEFAULT NULL,
            `date` datetime DEFAULT NULL,
            `modified` varchar(100) DEFAULT NULL,
            `size` double DEFAULT NULL
        )");

        //DOCUMENTOS
        mysqli_query($con, "CREATE TABLE `folders` (
            `id_folder` int NOT NULL AUTO_INCREMENT,
            `id_user` int DEFAULT NULL,
            `name` varchar(100) DEFAULT NULL,
            `date` varchar(50) DEFAULT NULL,
            `modified` varchar(100) DEFAULT NULL,
            `size` varchar(50) DEFAULT NULL
        )");

        //FOTOS
        mysqli_query($con, "CREATE TABLE `photos` (
            `id_photo` int NOT NULL AUTO_INCREMENT,
            `id_user` int NOT NULL,
            `name` varchar(50) DEFAULT NULL,
            `path` varchar(250) DEFAULT NULL,
            `size` varchar(50) DEFAULT NULL,
            `date` varchar(50) DEFAULT NULL
        )");

        //TAREAS
        mysqli_query($con, "CREATE TABLE `tasks` (
            `id_task` int NOT NULL AUTO_INCREMENT,
            `id_user` int DEFAULT NULL,
            `title` varchar(100) DEFAULT NULL,
            `text` varchar(1000) DEFAULT NULL,
            `date` varchar(50) DEFAULT NULL,
            `modified` varchar(100) DEFAULT NULL
        )");

        //USUARIOS
        mysqli_query($con, "CREATE TABLE `User` (
            `id_user` int NOT NULL AUTO_INCREMENT,
            `name` varchar(100) DEFAULT NULL,
            `email` varchar(100) DEFAULT NULL,
            `password` varchar(255) DEFAULT NULL,
            `nom_usr` varchar(100) DEFAULT NULL,
            `tlf` varchar(100) DEFAULT NULL,
            `date` varchar(50) DEFAULT NULL,
            `photo` blob
        )");
    }

    //Liberamos recurso
    mysqli_stmt_close($stmt);

    mysqli_close($con);

?>