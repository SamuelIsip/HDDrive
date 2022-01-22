<?php

    session_name("userSession");
    session_start();

    chdir("./../../HDDriveHome/UserImages/".$_SESSION['userName']);

    $files_data = file_get_contents('php://input');

    $files_data = json_decode($files_data,true);

    //Guardamos la ruta del fichero
    $filename = $files_data['nameFile'];

    echo $filename;

    /* if(is_file($filename)){
        if(file_exists($filename)){
            unlink($filename);
        }
    }  */

    exit;

?>