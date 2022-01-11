<?php

    include_once("connectDB.php");

    session_name("userSession");
    session_start();

    $file_data = file_get_contents('php://input');

    $file_data = json_decode($file_data);

    $user_data = array();

    foreach ($file_data as $file) { 
        $user_data = json_decode($file,true);
        addToFavourite($user_data);
    }

    function addToFavourite($user_data){
        //Definimos parametros de la consulta
        //La funcion solo admite variables
        $id_user = $_SESSION["userID"];
        $size = $user_data["size"];
        $date = $user_data["date"];
        $ruta = $user_data["ruta"];
        $name_file = $user_data["name"];
        
        // Conseguir el id_folder
        $stmt = mysqli_prepare($con, "SELECT id_folder FROM folders WHERE id_user = ? AND name = ?;");

        mysqli_stmt_bind_param($stmt,"ss", $id_user, $name_file);

        //Ejecutamos la consulta
        if(mysqli_stmt_execute($stmt)){

            mysqli_stmt_bind_result($stmt, $id_folder);

            if(mysqli_stmt_fetch($stmt)){
                //Liberamos recurso
                mysqli_stmt_close($stmt);
                //Insertamos datos de fichero a la BD
                $stmt=mysqli_prepare($con, "INSERT INTO favorites (id_user, date, size, ruta, id_folder) VALUES(?,?,?,?,?)");
                
                mysqli_stmt_bind_param($stmt,"isssi",$id_user,$date,$size,$ruta,$id_folder);

                //Ejecutamos la consulta
                if(mysqli_stmt_execute($stmt)){
                    //Liberamos recurso
                    mysqli_stmt_close($stmt);
                    mysqli_close($con);
                    http_response_code(200); 
                    exit;
                }else
                    http_response_code(500); 
            }
        }else
            http_response_code(501); 
        
        //Liberamos recurso
        mysqli_stmt_close($stmt);

        mysqli_close($con);
    }

?>