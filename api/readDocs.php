<?php

    include_once("getSizeFile.php");
    include_once("connectDB.php");

    if(isset($_GET['userNameSession']) && $_GET['userIDSession']){
        session_abort();
        session_name("userSession");
        session_start();
        $_SESSION["userName"] = $_GET['userNameSession'];
        $_SESSION["userID"] = $_GET['userIDSession'];
       
    }


    $userSession = $_SESSION["userName"];

    if(isset($_GET['nameDir'])){
        chdir("./../../HDDriveHome/".$userSession."/".$_GET['nameDir']);
    }else
        chdir("./../../HDDriveHome/".$userSession);


    $docs = scandir(getcwd());

    $arr1 = array();
    $arr1["docs"]=array();

    foreach ($docs as $value) {
        $arr2=array(
            "name"=>$value,
            "size"=>is_dir($value) ? get_size($value) : convert_size(filesize($value)),
            "modific"=>date ("d/m/Y H:i", filemtime($value)),
            "isDirFile"=>is_dir($value) ? "dir" : "file" 
        );

        array_push($arr1["docs"], $arr2);
    }

    http_response_code(200);

    echo json_encode($arr1);


    

?>