<?php
    move_uploaded_file($_FILES['file']['tmp_name'], "./../".$_POST['rutaDir'].$_FILES['file']['name']);
?>