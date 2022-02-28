<?php

    mysqli_query($con, "ALTER TABLE favorites
    ADD PRIMARY KEY (id_fav),
    ADD UNIQUE KEY uq_favorites (id_folder,ruta),
    ADD KEY id_user (id_user),
    ADD KEY id_folder (id_folder) USING BTREE;");

    mysqli_query($con, "ALTER TABLE `file`
    ADD PRIMARY KEY (id_file),
    ADD KEY id_folder (id_folder);");

    mysqli_query($con, "ALTER TABLE folders
    ADD PRIMARY KEY (id_folder),
    ADD KEY id_user (id_user);");

    mysqli_query($con, "ALTER TABLE photos
    ADD PRIMARY KEY (id_photo),
    ADD KEY id_user (id_user);");

    mysqli_query($con, "ALTER TABLE tasks
    ADD PRIMARY KEY (id_task),
    ADD KEY id_user (id_user);");

    mysqli_query($con, "ALTER TABLE `User`
    ADD PRIMARY KEY (id_user);");

    mysqli_query($con, "ALTER TABLE favorites
    ADD CONSTRAINT favorites_ibfk_1 FOREIGN KEY (id_user) REFERENCES `User` (id_user) ON DELETE RESTRICT ON UPDATE RESTRICT,
    ADD CONSTRAINT favorites_ibfk_2 FOREIGN KEY (id_folder) REFERENCES folders (id_folder) ON DELETE RESTRICT ON UPDATE RESTRICT;");

    mysqli_query($con, "ALTER TABLE `file`
    ADD CONSTRAINT file_ibfk_1 FOREIGN KEY (id_folder) REFERENCES folders (id_folder);");

    mysqli_query($con, "ALTER TABLE folders
    ADD CONSTRAINT folders_ibfk_1 FOREIGN KEY (id_user) REFERENCES `User` (id_user);");

    mysqli_query($con, "ALTER TABLE photos
    ADD CONSTRAINT photos_ibfk_1 FOREIGN KEY (id_user) REFERENCES `User` (id_user);");

    mysqli_query($con, "ALTER TABLE tasks
    ADD CONSTRAINT tasks_ibfk_1 FOREIGN KEY (id_user) REFERENCES `User` (id_user);");

?>