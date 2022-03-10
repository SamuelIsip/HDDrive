<?php

    session_name("userSession");
    session_start();

    chdir("./../../HDDriveHome/".$_SESSION['userName']);

    $files_data = file_get_contents('php://input');

    $files_data = json_decode($files_data,true);

    //Guardamos la ruta del fichero
    $filename = "./".$files_data['nameFile'];

    if(isset($files_data['files'])){
      $arr_files = $files_data['files'];
      foreach ($arr_files as $file) { 
        dropFilesAndDirectory($file);
      }
    }else{
      dropFilesAndDirectory($filename);
    } 

    echo $filename;

    function dropFilesAndDirectory($filename){

      if(is_dir($filename)){
        rrmdir($filename);
      }

      if(is_file($filename)){
        if(file_exists($filename)){
            unlink($filename);
        }
      } 

    }
    
    function rrmdir($dir) { 
      if (is_dir($dir)) { 
        $objects = scandir($dir);
        echo(json_encode($objects));
        foreach ($objects as $object) { 
          if ($object != "." && $object != "..") { 
            if (is_dir($dir. DIRECTORY_SEPARATOR .$object) && !is_link($dir."/".$object)){
              rrmdir($dir. DIRECTORY_SEPARATOR .$object);
            }else{
              unlink($dir. DIRECTORY_SEPARATOR .$object); 
              //dropFilesFromDB($object);
            }
          } 
        }
        rmdir($dir); 
      } 
    }
    
    exit;
?>