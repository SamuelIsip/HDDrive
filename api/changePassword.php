<?php

    include_once("connectDB.php");

    //$user_data = file_get_contents('php://input');

//$user_data = json_decode($user_data,true);

    //Consultar si ese usuario existe
    $result = mysqli_query($con, "SELECT email FROM User WHERE email = '$user_data['email']'");

    if(mysqli_num_rows($result) == 1){
        $newPass = password_hash($_GET['newPass'],PASSWORD_DEFAULT);
        $result = mysqli_query($con, "UPDATE User SET password = '$newPass' WHERE email = '$_GET['email']'");
        if(mysqli_num_rows($result) == 1){
            mysqli_close($con);
            http_response_code(200);
            echo "Updated password successfully!";
        }
    }else{
        echo "User does not exist!";
    }

    mysqli_close($con);
    http_response_code(500);

?>