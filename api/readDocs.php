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

    $ruta = "/";

    if(isset($_GET['nameDir'])){
        chdir("./../../HDDriveHome/".$userSession."/".$_GET['nameDir']);
        $ruta = $ruta.$_GET['nameDir']."/";
    }else{
        chdir("./../../HDDriveHome/".$userSession);
    }

    $docs = scandir(getcwd());

    $arr1 = array();
    $arr1["docs"]=array();

    foreach ($docs as $value) {

        // Comprobar si es favorito
        $ruta2 = substr($ruta,1,strlen($ruta)-2).$value;
        $stmt = mysqli_prepare($con, "SELECT id_fav FROM favorites WHERE id_user=? AND ruta=?");
        $usrID = $_SESSION["userID"];

        mysqli_stmt_bind_param($stmt,"is",$usrID,$ruta2);

        $isFavorite = 0;

        if(mysqli_stmt_execute($stmt)){
        
            mysqli_stmt_store_result($stmt);
    
            if(mysqli_stmt_num_rows($stmt) == 1)
                $isFavorite = 1;
            
        }

        mysqli_stmt_close($stmt);
        

        $arr2=array(
            "name"=>$value,
            "size"=>is_dir($value) ? get_size($value) : convert_size(filesize($value)),
            "modific"=>date ("d/m/Y H:i", filemtime($value)),
            "isDirFile"=>is_dir($value) ? "dir" : "file",
            "isFavorite"=> $isFavorite,
            "ruta2" => $ruta2,
            "ruta" => $ruta
        );

        array_push($arr1["docs"], $arr2);
    }

    mysqli_close($con);

    http_response_code(200);

    echo json_encode($arr1);


    

?>