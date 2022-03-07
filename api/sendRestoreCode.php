<?php
    require_once("connectDB.php");
    require_once("mailCredentials.php");

    $email = json_decode(file_get_contents('php://input'), true);

    //Consultar si ese usuario existe
    $result = mysqli_prepare($con, "SELECT email FROM User WHERE email = ?");
    mysqli_stmt_bind_param($result, "s", $email['emailJSON']);
    mysqli_stmt_execute($result);
    mysqli_stmt_store_result($result);

    echo mysqli_stmt_num_rows($result);
    /* if(mysqli_stmt_num_rows($result) != 1){
        http_response_code(409);
        liberarRecursos($con, $result);
        exit;
    } */

    /* liberarRecursos($con, $stmt);
    
    $code = randomVerificationCode(10);

    enviarEmail($email['emailJSON'], $code, $localSender);

    echo $code;

    // Función para enviar el mail con el código de confirmación
    function enviarEmail($email, $verificationCode, $localSender){

        $titulo    = 'Password change code';
        $mensaje   = '<p>You are about to change your password.</p>
        <p>Your <b>verification code</b> is: <b>'.$verificationCode.'</b></p>
        <p>Please, insert this code in the password recovery page.</p>';
        $cabeceras = 'From: '.$localSender . "\r\n" .
            'Reply-To: '.$localSender . "\r\n" .
            'MIME-Version: 1.0' . "\r\n" .
            'Content-type: text/html; charset=iso-8859-1' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();
    
        mail($email, $titulo, $mensaje, $cabeceras);

    }

    //Función que genera el código random de verificación
    function randomVerificationCode($stringLength) {
        return substr(sha1(time()), 0, $stringLength);
    } */

    function liberarRecursos($con, $result){
        //Liberamos recurso
        mysqli_stmt_close($result);
        mysqli_close($con);
    }

?>