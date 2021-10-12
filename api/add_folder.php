<?php
    session_name("userSession");
    session_start();


    $folderData = file_get_contents('php://input');
    $folderData = json_decode($folderData, true);

    if(mkdir("./../../HDDriveHome/".$_SESSION['userName']."/".$folderData['rutaDir'].$folderData['nameFolder'])){
        http_response_code(200); 
    }else{
        http_response_code(500);
    }

    exit;
?>