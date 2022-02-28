<?php

function get_size($directory){
    $size = 0;
    $files = glob($directory.'/*');
    foreach($files as $path){
        if(is_file($path))
            $size += filesize($path);
        if(is_dir($path))
          $size += get_sizeDir($path);

    }
    return convert_size($size);
} 

function get_sizeDir($directory){
    $size = 0;
    $files = glob($directory.'/*');
    foreach($files as $path){
        if(is_file($path))
            $size += filesize($path);
        if(is_dir($path))
          $size += get_sizeDir($path);

    }
    return $size;
} 

function convert_size($size){

    if($size < 1024) {
        return "{$size} bytes";
    } elseif($size < 1048000) {
        $size_kb = round($size/1024);
        return "{$size_kb} KB";
    } else {
        $size_mb = round($size/1048000, 1);
        return "{$size_mb} MB";
    }

} 

?>