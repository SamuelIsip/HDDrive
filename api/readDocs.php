<?php

    include_once("getSizeFile.php");
    include_once("connectDB.php");

    if(isset($_GET['userNameSession'])){
        session_abort();
        session_name("userSession");
        session_start();
        $_SESSION["userName"] = $_GET['userNameSession'];
       
        if($stmt = mysqli_prepare($con, "SELECT id_user FROM User WHERE nom_usr=?")){

            $usrName = $_SESSION["userName"];

            mysqli_stmt_bind_param($stmt,"s",$usrName);

            mysqli_stmt_execute($stmt);

            mysqli_stmt_bind_result($stmt, $userID);

            mysqli_stmt_fetch($stmt);

            $_SESSION["userID"] = $userID;

            mysqli_stmt_close($stmt);

        }

        mysqli_close($con);
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