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
?>
