<?php


    $nameFile = $_POST['name'];

    chdir("./..");

    if(is_dir($nameFile))
        echo "dir";
    else if(is_file($nameFile))
         echo "file";


?>