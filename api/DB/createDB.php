<?php

    $con=mysqli_connect("localhost","admin","admin") or die("No ha podido realizarse la conexión");

    $stmt=mysqli_prepare($con, "SELECT SCHEMA_NAME
    FROM INFORMATION_SCHEMA.SCHEMATA
   WHERE SCHEMA_NAME = ?");

    $dbName = "hddrivedb";
    mysqli_stmt_bind_param($stmt,"s",$dbName);

    //Ejecutamos la consulta
    mysqli_stmt_execute($stmt);

    echo(mysqli_num_rows($result));

    //Liberamos recurso
    mysqli_stmt_close($stmt);

    mysqli_close($con);

?>