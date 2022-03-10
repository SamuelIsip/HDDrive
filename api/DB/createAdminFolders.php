<?php

    if(!is_dir("./../../../HDDriveHome/Admin")){
        mkdir("./../../../HDDriveHome/Admin",0777);
        mkdir("./../../../HDDriveHome/Admin/Admin",0777);
        if(!is_dir("./../../../HDDriveHome/UserImages")){
            mkdir("./../../../HDDriveHome/UserImages",0777);
        }
        mkdir("./../../../HDDriveHome/UserImages/Admin",0777);
    }

?>