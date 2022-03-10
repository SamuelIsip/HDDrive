<?php

    require_once("connectDB.php");

    session_name("userSession");
    session_start();

    $file = "en-CV-ROSARIOSCARLATA.pdf";
    dropFilesFromDB($con, $file);

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

        echo $id_folder;

        //2. Borramos dato de FAVORITOS
        $stmt=mysqli_prepare($con, "DELETE FROM favorites WHERE id_user=? AND id_folder=?");

        //Definimos parametros de la consulta
        mysqli_stmt_bind_param($stmt,"ii",$id_user,$id_folder);

        //Ejecutamos la consulta
        mysqli_stmt_execute($stmt);


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

?>