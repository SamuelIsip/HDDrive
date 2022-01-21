<?php

    include_once("connectDB.php");

    session_name("userSession");
    session_start();

    $filename = $_GET["filename"];

    dropFilesFromDB($filename, $con);

    function dropFilesFromDB($filename, $con){
      $userId = $_SESSION["userID"];

      $stmt = mysqli_prepare($con, "DELETE FROM folders WHERE name = ? AND id_user = ?");

      mysqli_stmt_bind_param($stmt, "si", $filename, $userId);

      if(mysqli_stmt_execute($stmt))
        mysqli_stmt_close($stmt);
    }

    if($con)mysqli_close($con);
    
   
?>