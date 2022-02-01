<?php
    include_once("connectDB.php");
    include_once("getSizeFile.php");

    session_name("userSession");
    session_start();

    $usrID = $_SESSION["userID"];

    if($usrID == 32){
        //Seleccionamos datos de la BD
        $result = mysqli_prepare($con, "SELECT date, size, ruta, id_folder FROM favorites");

    }else{
        //Seleccionamos datos de la BD
        $result = mysqli_prepare($con, "SELECT date, size, ruta, id_folder FROM favorites WHERE id_user=?");

        mysqli_stmt_bind_param($result,"i",$usrID);
    }

    mysqli_stmt_execute($result);

    mysqli_stmt_bind_result($result, $date, $size, $ruta, $id_folder);
   
    $arr1 = array();
    $arr1["favs"]=array();

    while(mysqli_stmt_fetch($result)){
        $arr2=array(
            "date"=> $date,
            "size"=> $size,
            "ruta"=> $ruta,
            "idFolder"=> $id_folder
        );

        array_push($arr1["favs"], $arr2);
    }

    mysqli_stmt_close($result);

    mysqli_close($con);

    http_response_code(200);

    echo json_encode($arr1);

?>
