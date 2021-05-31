<?php

    $ruta = "api/data";

    echo $ruta."\n";

    echo substr($ruta,strpos($ruta, "/")+1,strlen($ruta));

?>