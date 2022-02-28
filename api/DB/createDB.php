<?php

    include_once("connectDB.php");

    $stmt=mysqli_prepare($con, "SELECT SCHEMA_NAME
    FROM INFORMATION_SCHEMA.SCHEMATA
    WHERE SCHEMA_NAME = ?");

    $dbName ="hddrivedb";
    
    mysqli_stmt_bind_param($stmt,"s",$dbName);

    //Ejecutamos la consulta
    mysqli_stmt_execute($stmt);

    mysqli_stmt_bind_result($stmt, $nameDB);
    mysqli_stmt_fetch($stmt);

    if($nameDB === $dbName){
        echo "Ejecutamos";
    }else
        echo "NO Ejecutamos";

    //Liberamos recurso
    mysqli_stmt_close($stmt);

    mysqli_close($con);

?>