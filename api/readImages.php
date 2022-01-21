<?php
    include_once("connectDB.php");

    session_name("userSession");
    session_start();

    //Seleccionamos datos de la BD
    $result = mysqli_prepare($con, "SELECT id_photo, name, path, size, date FROM photos WHERE id_user=?");

    $usrID = $_SESSION["userID"];

    mysqli_stmt_bind_param($result,"i",$usrID);

    mysqli_stmt_execute($result);

    mysqli_stmt_bind_result($result, $id_photo, $name, $path, $size, $date);
   
    $arr1 = array();
    $arr1["images"]=array();

    while(mysqli_stmt_fetch($result)){
        $arr2=array(
            "idPhoto"=> $id_photo,
            "name"=> $name,
            "path"=> $path,
            "size"=> $size,
            "date"=> $date
        );

        array_push($arr1["images"], $arr2);
    }

    mysqli_stmt_close($result);

    mysqli_close($con);

    http_response_code(200);

    echo json_encode($arr1);

?>