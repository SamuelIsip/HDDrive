<?php

    chdir("./..");

    //Guardamos la ruta del fichero
    $filename = "./".$_GET['nameFile'];

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


?>