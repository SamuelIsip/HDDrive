<?php
    session_name("userSession");
    session_start();


    $count = count($_FILES['file']['name']);

    for ($i = 0; $i < $count; $i++) {

        move_uploaded_file($_FILES['file']['tmp_name'][$i], "./../../HDDriveHome/".$_SESSION['userName']."/".$_POST['rutaDir'].$_FILES['file']['name'][$i]);

        chdir("./../../HDDriveHome/".$_SESSION['userName']."/".$_POST['rutaDir']);

        $value = $_FILES['file']['name'][$i];

        include_once("connectDB.php");
        include_once("getSizeFile.php");

        if(is_file($value)){
            //Insertamos datos de fichero a la BD
            $stmt=mysqli_prepare($con, "INSERT INTO folders (id_user,name,date,modified,size) VALUES(?,?,?,?,?)");

            //Definimos parametros de la consulta
            //La funcion solo admite variables
            $id_user = $_SESSION["userID"];
            $name=$value;
            $date=date("d/m/Y");
            $modified=date ("d/m/Y", filemtime($value));
            $size = convert_size(filesize($value));
            mysqli_stmt_bind_param($stmt,"issss",$id_user,$name,$date,$modified,$size);

            //Ejecutamos la consulta
            mysqli_stmt_execute($stmt);

            //Liberamos recurso
            mysqli_stmt_close($stmt);
        }

        mysqli_close($con);

    }

?>