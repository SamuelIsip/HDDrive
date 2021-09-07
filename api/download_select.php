<?php
    
    $folder = $_GET['folder'];

    chdir("./../../HDDriveHome".$folder);

    if($folder=="/"){
        $folder="/Documents";
    }


    $arr_files = json_decode($_GET['files']);

    //Nombre de la carpeta
    $filenameZip = basename($folder).".zip";

    /* $archivoBackup=new ZipArchive;
    
    $archivoBackup->open($filenameZip,ZipArchive::CREATE); */
    
    directorios(".",$arr_files,$filenameZip);


  /*   for ($i=0; $i < count($arr_files); $i++) { 
        if (is_dir($arr_files[$i])) 
            $archivoBackup->addFolder($arr_files[$i]);
        else
            $archivoBackup->addFile($arr_files[$i]);
    }

    $archivoBackup->close(); */

    header("content-type:application/zip");
    header("content-disposition:attachment;filename=".$filenameZip); 
    readfile($filenameZip); 

    //Eliminamos el archivo de nuestro servidor
    unlink($filenameZip);
    

    function aniadir($fich,$filenameZip){
        $archivoBackup=new ZipArchive;
        $archivoBackup->open($filenameZip,ZipArchive::CREATE);
        $archivoBackup->addFile($fich);
        $archivoBackup->close();
    }
    
    function directorios($directorio,$archivos,$filenameZip){ //directorio actual y array con rutas
    
        $sub_dir = scandir($directorio); //guardamos todos los elementos del directorio en un array
    
        //eliminamos a . y ..
        array_shift($sub_dir);
        array_shift($sub_dir);
    
        //recorremos cada elemento
        for ($i=0; $i < count($sub_dir); $i++)
            if($directorio!=".")
                $sub_dir[$i] = $directorio.$sub_dir[$i]; 
    
        $archivos = array_merge($archivos, $sub_dir);
    
        $aux = true;
    
        while ($aux) {
            
            //Vamos eliminando los elmentos del array y comprobamos si es directorio o archivo
            $directorio_archivo = array_shift($archivos);
    
            if($directorio_archivo != NULL)
                if(is_dir($directorio_archivo)) //si es un directorio, se vuelve a hacer el mismo proceso recursivamente
                    directorios($directorio_archivo."/", $archivos,$filenameZip);
                else
                    aniadir($directorio_archivo,$filenameZip); //añadimos los archivos al .zip
            else
                $aux=false;
    
        }
    
    }

?>