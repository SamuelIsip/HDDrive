<?php
    session_name("userSession");
    session_start();


    $count = count($_FILES['file']['name']);

    for ($i = 0; $i < $count; $i++) {

        move_uploaded_file($_FILES['file']['tmp_name'][$i], "./../../HDDriveHome/UserImage/".$_SESSION['userName']."/".$_FILES['file']['name'][$i]);

        chdir("./../../HDDriveHome/UserImage/".$_SESSION['userName']);

        $value = $_FILES['file']['name'][$i];

        include_once("connectDB.php");
        include_once("getSizeFile.php");

      
        //Insertamos datos de fichero a la BD
        $stmt=mysqli_prepare($con, "INSERT INTO photos (id_user,name,path,size,date) VALUES(?,?,?,?,?)");

        //Definimos parametros de la consulta
        //La funcion solo admite variables
        $id_user = $_SESSION["userID"];
        $name=$value;
        $date=date("d/m/Y");
        $path= $_SESSION['userName']."/".$value;
        $size = convert_size(filesize($value));
        mysqli_stmt_bind_param($stmt,"issss",$id_user,$name,$path,$size,$date);

        //Ejecutamos la consulta
        mysqli_stmt_execute($stmt);

        //Liberamos recurso
        mysqli_stmt_close($stmt);
        

        mysqli_close($con);

    }

?>