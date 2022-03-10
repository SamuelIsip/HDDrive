<?php

    require_once("connectDB.php");  
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
        dropFilesAndDirectory($con, $file);
      }
    }else{
      dropFilesAndDirectory($con, $filename);
    } 

    function dropFilesAndDirectory($con, $filename){

      if(is_dir($filename)){
        rrmdir($con, $filename);
      }

      if(is_file($filename)){
        if(file_exists($filename)){
            unlink($filename);
            dropFilesFromDB($con, basename($filename));
        }
      } 

    }
    
    function rrmdir($con, $dir) { 
      if (is_dir($dir)) { 
        $objects = scandir($dir);
        foreach ($objects as $object) { 
          if ($object != "." && $object != "..") { 
            if (is_dir($dir. DIRECTORY_SEPARATOR .$object) && !is_link($dir."/".$object)){
              rrmdir($con, $dir. DIRECTORY_SEPARATOR .$object);
            }else{
              unlink($dir. DIRECTORY_SEPARATOR .$object); 
              dropFilesFromDB($con, $object);
            }
          } 
        }
        rmdir($dir); 
      } 
    }

    function dropFilesFromDB($con, $file){

        //1. Buscamos id_folder
        $stmt=mysqli_prepare($con, "SELECT id_folder FROM folders WHERE id_user=? AND name=?");

        $id_user = $_SESSION["userID"];
        mysqli_stmt_bind_param($stmt,"is",$id_user,$file);

        //Ejecutamos la consulta
        mysqli_stmt_execute($stmt);

        /* bind result variables */
        mysqli_stmt_bind_result($stmt, $id_folder);

        /* fetch values */
        mysqli_stmt_fetch($stmt);

        //Liberamos recurso
        mysqli_stmt_close($stmt);


        //2. Borramos dato de FAVORITOS
        $stmt=mysqli_prepare($con, "DELETE FROM favorites WHERE id_user=? AND id_folder=?");

        //Definimos parametros de la consulta
        mysqli_stmt_bind_param($stmt,"ii",$id_user,$id_folder);

        //Ejecutamos la consulta
        mysqli_stmt_execute($stmt);
        
        //Liberamos recurso
        mysqli_stmt_close($stmt);


        //3. Borramos dato de FOLDERS
        $stmt=mysqli_prepare($con, "DELETE FROM folders WHERE id_user=? AND id_folder=?");

        //Definimos parametros de la consulta
        mysqli_stmt_bind_param($stmt,"ii",$id_user,$id_folder);

        //Ejecutamos la consulta
        mysqli_stmt_execute($stmt);

        //Liberamos recurso
        mysqli_stmt_close($stmt);

        mysqli_close($con);
    }
    
    exit;
?>