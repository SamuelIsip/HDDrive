<?php

    include_once("connectDB.php");

    session_name("userSession");
    session_start();
    
    $usrID = $_SESSION["userID"];

    if($usrID == 32){
        //Seleccionamos datos de la BD
        $result = mysqli_prepare($con, "SELECT * FROM tasks");
    }else{
        //Seleccionamos datos de la BD
        $result = mysqli_prepare($con, "SELECT * FROM tasks WHERE id_user=?");

        mysqli_stmt_bind_param($result,"i",$usrID);
    }

    mysqli_stmt_execute($result);

    mysqli_stmt_bind_result($result, $id_task, $id_user, $title, $text, $date, $modified);
   
    $arr1 = array();
    $arr1["tasks"]=array();

    while(mysqli_stmt_fetch($result)){
        $arr2=array(
            "title" => $title,
            "text" => $text,
            "date" => $date,
            "modified" => $modified
        );

        array_push($arr1["tasks"], $arr2);
    }

    mysqli_stmt_close($result);

    mysqli_close($con);

    http_response_code(200);

    echo json_encode($arr1);


?>