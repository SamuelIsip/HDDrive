<?php

    chdir("./../../HDDriveHome");

    //Guardamos la ruta del fichero
    $filename = $_POST['nameFile'];

    rrmdir($filename);

   if(is_dir($filename)){
        rrmdir($filename);
    }

    if(is_file($filename)){
        if(file_exists($filename)){
            unlink($filename);
        }
    } 

    function rrmdir($dir) { 
      
        $directorios = scandir($dir);
        foreach ($directorios = as $dir) { 
          if ($dir != "." && $dir != "..") { 
            if (is_dir($dir. DIRECTORY_SEPARATOR .$dir) && !is_link($dir."/".$dir))
              rrmdir($dir. DIRECTORY_SEPARATOR .$dir);
            else
              unlink($dir. DIRECTORY_SEPARATOR .$dir); 
          } 
        }
        rmdir($dir); 
      
    }

?>