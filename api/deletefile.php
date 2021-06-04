<?php

    chdir("./..");

    //Guardamos la ruta del fichero
    $filename = $_GET['nameFile'];

    if(is_dir($filename)){
        //Implementar borrado recursivo
    }

    if(is_file($filename)){
        if(file_exists($filename)){
            unlink($filename);
        }
    }

?>