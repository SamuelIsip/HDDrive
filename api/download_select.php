<?php

    include_once("backup_inc.php");
    
    $folder = $_GET['folder'];

    chdir("./../../HDDriveHome".$folder);

    if($folder=="/"){
        $folder="/Documents";
    }

    $arr_files = json_decode(urldecode($_GET['files']));

    //Nombre de la carpeta
    $filenameZip = basename($folder).".zip";
    
    directorios(".",$arr_files,$filenameZip);

    header("content-type:application/zip");
    header("content-disposition:attachment;filename=".$filenameZip); 
    readfile($filenameZip); 

    //Eliminamos el archivo de nuestro servidor
    unlink($filenameZip);
    

    

?>