<?php
    move_uploaded_file($_FILES['file']['tmp_name'], "./../../".$_POST['rutaDir'].$_FILES['file']['name']);


    chdir("./../../".$_POST['rutaDir']);

    $value = $_FILES['file']['name'];

    include_once("connectDB.php");
    include_once("getSizeFile.php");

    if(is_file($value)){
        //Insertamos datos de fichero a la BD
        $stmt=mysqli_prepare($con, "REPLACE INTO folders (id_user,name,date,modified,size) VALUES(?,?,?,?,?)");

        //Definimos parametros de la consulta
        //La funcion solo admite variables
        $id_user = 1 ;
        $name=$value;
        $date=date("d/m/Y");
        $modified=date ("d/m/Y", filemtime($value));
        $size = get_size($value);
        mysqli_stmt_bind_param($stmt,"isssd",$id_user,$name,$date,$modified,$size);

        //Ejecutamos la consulta
        mysqli_stmt_execute($stmt);

        //Liberamos recurso
        mysqli_stmt_close($stmt);
    }

    mysqli_close($con);

?>