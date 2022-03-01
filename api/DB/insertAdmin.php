<?php

    $date=date("d/m/Y");

    //Insertamos usuario administrador (los datos se podrán modificar posteriormente)
    mysqli_query($con, "INSERT INTO `User` (`id_user`, `name`, `email`, `password`, `nom_usr`, `tlf`, `date`, `photo`) VALUES (1, 'Admin', 'admin@gmail.com', '$2y$10$t2HttOpLrsmx6teBp6FO7unD.LgIcP7sS7Gm7ZTyvuj1VE7T6d/R2', 'Admin', '123123123', '".$date."', NULL);");

?>