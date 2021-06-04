<?php

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