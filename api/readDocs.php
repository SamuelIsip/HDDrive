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
            "size"=>get_size($value),
            "modific"=>date ("d/m/Y H:i", filemtime($value)),
            "isDirFile"=>is_dir($value) ? "dir" : "file" 
        );

        array_push($arr1["docs"], $arr2);
    }

    http_response_code(200);

    echo json_encode($arr1);


    function get_size($file_directory){
        
            $size = 0;
            $files = glob($file_directory.'/*');
            foreach($files as $path){
                if(is_file($path)){
                    $size += filesize($path);
                } 
                if(is_dir($path))
                  $size += get_size($path);
            }
            return convert_size($size/1000);
        
    } 

    function convert_size($size){

        if($size < 1024){
            return round($size,0)." KB";
        }else if($size >= 1024 ){
            return round(($size/1000),0)." MB";
        }
    } 

?>