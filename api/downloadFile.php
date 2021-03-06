<?php

    include_once("backup_inc.php");

    session_name("userSession");
    session_start();

    chdir("./../../HDDriveHome/".$_SESSION["userName"]);

    if(isset($_GET["isImage"])){
        chdir("./../UserImages/".$_SESSION["userName"]);
    }

    //Guardamos la ruta del fichero
    $filename = "./".$_GET['nameFile'];

    //Si es un directorio, se recorren todo los ficheros recursivamente
    //Y se comprimen en un único .zip
    if(is_dir($filename)){
        //incluimos las funciones necesarias para hacer el backup

        chdir($filename);

        //Nombre de la carpeta
        $filenameZip = substr($filename,strrpos($filename, "/")+1,strlen($filename)).".zip";

        $archivos=array();

        //Llamada a la función que recorre cada directorio
        directorios(".",$archivos,$filenameZip);

        header("content-type:application/zip");
        header("content-disposition:attachment;filename=".basename($filename).".zip");
        readfile($filenameZip);

        //Eliminamos el archivo de nuestro servidor
        unlink($filenameZip);
    }

    if(is_file($filename)){
        //Comprobamos si el fichero existe
        if(file_exists($filename)) {
            //Definimos la información del header
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="'.basename($filename).'"');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($filename));

            //Leemos el fichero
            readfile($filename);
            exit;
        }
    }
    



?>