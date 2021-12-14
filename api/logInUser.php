<?php

    //Get Heroku ClearDB connection information
    if ($url = env('CLEARDB_DATABASE_URL', false)) {
        $parts = parse_url($url);
        $host = $parts["host"];
        $username = $parts["user"];
        $password = $parts["pass"];
        $database = substr($parts["path"], 1);
    } else {
        $host = env('DB_HOST', 'eu-cdbr-west-02.cleardb.net');
        $username = env('DB_USERNAME', 'b28666f8fde75d');
        $password = env('DB_PASSWORD', '6fc94ace');
        $database = env('DB_DATABASE', 'heroku_35372d5e7e1dccc');
    }
    // Connect to DB
    $con = mysqli_connect($host, $username, $password, $database);

    $user_data = file_get_contents('php://input');

    $user_data = json_decode($user_data,true);

    //Consultar si ese usuario existe
    $result = mysqli_query($con, "SELECT email, password, nom_usr, id_user FROM User;");

    for ($i=1; mysqli_num_rows($result) >= $i; $i++){
        $fila = mysqli_fetch_array($result,MYSQLI_ASSOC);
        if($fila['email'] == $user_data["email"] && password_verify($user_data["password"],$fila['password'])){
            mysqli_close($con);
            http_response_code(200);
            echo json_encode($fila);
            exit;
        }
    }

    http_response_code(404);
    exit;
?>
