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
        if (is_dir($dir)) { 
          $objects = scandir($dir);
          foreach ($objects as $object) { 
            if ($object != "." && $object != "..") { 
              if (is_dir($dir. DIRECTORY_SEPARATOR .$object) && !is_link($dir."/".$object))
                rrmdir($dir. DIRECTORY_SEPARATOR .$object);
              else
                unlink($dir. DIRECTORY_SEPARATOR .$object); 
            } 
          }
          rmdir($dir); 
        } 
      }

?>