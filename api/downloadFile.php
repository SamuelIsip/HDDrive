<?php

    chdir("./../../HDDriveHome");

    //Guardamos la ruta del fichero
    $filename = "./".$_GET['nameFile'];

    //Si es un directorio, se recorren todo los ficheros recursivamente
    //Y se comprimen en un único .zip
    if(is_dir($filename)){
        //incluimos las funciones necesarias para hacer el backup

        require_once("backup_inc.php");

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
            header("Cache-Control: public");
            header("Content-Description: File Transfer");
            header('content-disposition: attachment;filename="'.basename($filename).'"');
            header("Content-Transfer-Encoding: binary");    

            //Leemos el fichero
            readfile($filename);
            exit;
        }
    }
    


?>