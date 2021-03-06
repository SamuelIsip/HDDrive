<?php

    session_name("userSession");
    session_start();

    chdir("./../../HDDriveHome/".$_SESSION["userName"]);

    $files_selected = json_decode($_GET["files"]);

    //Guardamos la ruta del fichero
    $filename = "./".$_GET['nameFolder'];

    if($_GET['nameFolder']=="/"){
        $folder="Documents";
    }else{
        $folder=basename($_GET['nameFolder']);
    }

    //Si es un directorio, se recorren todo los ficheros recursivamente
    //Y se comprimen en un único .zip
    if(is_dir($filename)){
        //incluimos las funciones necesarias para hacer el backup

        chdir($filename);

        //Nombre de la carpeta
        $filenameZip = $folder.".zip";

        $archivos=array();

        //Llamada a la función que recorre cada directorio
        directorios(".", $archivos, $filenameZip, $files_selected);

        header("content-type:application/zip");
        header("content-disposition:attachment;filename=".$folder.".zip");
        readfile($filenameZip);

        //Eliminamos el archivo de nuestro servidor
        unlink($filenameZip);
    }

    function aniadir($fich,$filenameZip){
        $archivoBackup=new ZipArchive;
        $archivoBackup->open($filenameZip,ZipArchive::CREATE);
        $archivoBackup->addFile($fich);
        $archivoBackup->close();
    }
    
    function directorios($directorio,$archivos,$filenameZip, $files_selected){ //directorio actual y array con rutas

        if($directorio=="."){
            $sub_dir = $files_selected; //guardamos todos los elementos del directorio en un array
        }else{
            $sub_dir = scandir($directorio);
            
            //eliminamos a . y ..
            array_shift($sub_dir);
            array_shift($sub_dir);
        }   

    
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
                    directorios($directorio_archivo."/", $archivos,$filenameZip, $files_selected);
                else
                    aniadir($directorio_archivo,$filenameZip); //añadimos los archivos al .zip
            else
                $aux=false;
        }
    
    }

?>
