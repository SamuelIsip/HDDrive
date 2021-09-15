<?php

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