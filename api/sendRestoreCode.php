<?php

    include_once("mailCredentials.php");

    $email = json_decode(file_get_contents('php://input'), true);
    
    $code = randomVerificationCode(10);

    enviarEmail($email['emailJSON'], $code, $localHost, $localUsername, $localPassword, $localSMTPSecure, $localPort);

    echo $code;

    // Función para enviar el mail con el código de confirmación
    function enviarEmail($email, $verificationCode, $localHost, $localUsername, $localPassword, $localSMTPSecure, $localPort){

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
    }

?>