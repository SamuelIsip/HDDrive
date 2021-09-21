<?php

    include_once("connectDB.php");

    $user_data = file_get_contents('php://input');

    $user_data = json_decode(user_data,true);

    $arr_datos = array();

    array_push($arr_datos,$_POST['json_user']);
    array_push($arr_datos,$user_data);

    http_response_code(200); 
   
    echo json_encode($_POST['json_user']);

?>