<?php
    require_once("connectDB.php");
    include_once("getSizeFile.php");

    session_name("userSession");
    session_start();

    //Seleccionamos datos de la BD
    $result = mysqli_prepare($con, "SELECT size FROM folders WHERE id_user=?");

    $usrID = $_SESSION["userID"];

    mysqli_stmt_bind_param($result,"i",$usrID);

    mysqli_stmt_execute($result);

    mysqli_stmt_bind_result($result, $size);
   
    $arr1 = array();
    $arr1["storage"]=array();

    while(mysqli_stmt_fetch($result)){
        $arr2=array(
            "size"=> $size,
        );

        array_push($arr1["storage"], $arr2);
    }

    mysqli_stmt_close($result);

    mysqli_close($con);

    http_response_code(200);

    echo json_encode($arr1);

?>
