<?php

    if(isset($_GET['nameDir'])){
        chdir("./../".$_GET['nameDir']);
    }else
        chdir("./..");

    $docs = scandir(getcwd());

    $arr1 = array();
    $arr1["docs"]=array();

    foreach ($docs as $value) {
        $arr2=array(
            "name"=>$value,
            "size"=>filesize($value),
            "modific"=>filemtime($value),
            "isDirFile"=>is_dir($value) ? "dir" : "file" 
        );

        array_push($arr1["docs"], $arr2);
    }

    http_response_code(200);

    echo json_encode($arr1);

?>