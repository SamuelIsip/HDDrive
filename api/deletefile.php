<?php

    include_once("connectDB.php");

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
        dropFilesAndDirectory($file, $con);
      }
   }else{
      dropFilesAndDirectory($filename, $con);
    } 

    function dropFilesAndDirectory($filename, $con){

      if(is_dir($filename)){
        rrmdir($filename, $con);
      }

      if(is_file($filename)){
        if(file_exists($filename)){
            unlink($filename);
            dropFilesFromDB(substr($filename, 3), $con);
        }
      } 

    }
    
    function rrmdir($dir, $con) { 
      if (is_dir($dir)) { 
        $objects = scandir($dir);
        foreach ($objects as $object) { 
          if ($object != "." && $object != "..") { 
            if (is_dir($dir. DIRECTORY_SEPARATOR .$object) && !is_link($dir."/".$object)){
              rrmdir($dir. DIRECTORY_SEPARATOR .$object, $con);
            }else{
              unlink($dir. DIRECTORY_SEPARATOR .$object); 
              dropFilesFromDB($object, $con);
            }
          } 
        }
        rmdir($dir); 
      } 
    }

    function dropFilesFromDB($filename, $con){
      $userId = $_SESSION["userID"];

      $stmt = mysqli_prepare($con, "DELETE FROM folders WHERE name = ? AND id_user = ?");

      mysqli_stmt_bind_param($stmt, "si", $filename, $userId);

      if(mysqli_stmt_execute($stmt))
        mysqli_stmt_close($stmt);
    }

    if($con)mysqli_close($con);
    
    exit;
?>