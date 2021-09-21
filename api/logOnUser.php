<?php

    include_once("connectDB.php");

    $user_data = json_decode($_POST['json_user'],true);
    echo($_POST['json_user']);
    print_r($user_data);
    
?>