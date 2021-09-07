<?php
    
    include_once("backup_inc.php");

    $folder = $_GET['folder'];

    chdir("./../../HDDriveHome".$folder);

    if($folder=="/"){
        $folder="/Documents";
    }


    $arr_files = json_decode($_GET['files']);

    //Nombre de la carpeta
    $filenameZip = basename($folder).".zip";

    $archivoBackup=new ZipArchive;
    
    $archivoBackup->open($filenameZip,ZipArchive::CREATE);

    for ($i=0; $i < count($arr_files); $i++) { 
        if (is_dir($arr_files[$i])) {
            $archivoBackup->addFolder($arr_files[$i]);
        else
        $archivoBackup->addFile($arr_files[$i]);
    }

    $archivoBackup->close();

    header("content-type:application/zip");
    header("content-disposition:attachment;filename=".$filenameZip); 
    readfile($filenameZip); 

    //Eliminamos el archivo de nuestro servidor
    unlink($filenameZip);
    

?>