<?php

    include_once("connectDB.php");

    session_name("userSession");
    session_start();

    chdir("./../../HDDriveHome/UserImages/".$_SESSION['userName']);

    $files_data = file_get_contents('php://input');

    $files_data = json_decode($files_data,true);

    //Guardamos la ruta del fichero
    $filename = $files_data['nameFile'];

    //Borramos dato de la BD
    $stmt=mysqli_prepare($con, "DELETE FROM photos WHERE id_user=? AND name=?");

    //Definimos parametros de la consulta
    //La funcion solo admite variables
    $id_user = $_SESSION["userID"];
    mysqli_stmt_bind_param($stmt,"is",$id_user,$filename);

    //Ejecutamos la consulta
    mysqli_stmt_execute($stmt);

    //Liberamos recurso
    mysqli_stmt_close($stmt);

    mysqli_close($con);

    //Borramos fichero del servidor
    unlink($filename);
      
    exit;

?>