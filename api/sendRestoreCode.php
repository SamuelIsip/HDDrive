<?php

    include_once("mailCredentials.php");
    include_once("connectDB.php");

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/phpmailer/src/Exception.php';
    require 'phpmailer/phpmailer/src/PHPMailer.php';
    require 'phpmailer/phpmailer/src/SMTP.php';

    $email = json_decode(file_get_contents('php://input'), true);
    
    //Consultar si ese usuario existe
    $stmt = mysqli_prepare($con, "SELECT email FROM User WHERE email = ?");

    mysqli_stmt_bind_param($stmt, "s", $email);

    if(mysqli_stmt_execute($stmt)){
        
        mysqli_stmt_store_result($stmt);

        if(mysqli_stmt_affected_rows($stmt) != 1){
            http_response_code(404); //Email no encontrado
            cerrarConexiones($con, $stmt);
            exit; 
        }
    }

    cerrarConexiones($con, $stmt);

    $code = randomVerificationCode(10);

    enviarEmail($email['emailJSON'], $code, $localHost, $localUsername, $localPassword, $localSMTPSecure, $localPort);

    echo $code;

    // Función para enviar el mail con el código de confirmación
    function enviarEmail($email, $verificationCode, $localHost, $localUsername, $localPassword, $localSMTPSecure, $localPort){

        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPDebug = 0;                      
            $mail->isSMTP();                                            
            $mail->Host       = $localHost;                     
            $mail->SMTPAuth   = true;                                   
            $mail->Username   = $localUsername;                     
            $mail->Password   = $localPassword;                               
            $mail->SMTPSecure = $localSMTPSecure;            
            $mail->Port       = $localPort;           
            
            //Recipients
            $mail->setFrom($localUsername, 'HDDriveSupport');
            $mail->addAddress($email, 'HDDriveUser');     //mail que recibira el correo

            //Content
            $mail->isHTML(true);                                  
            $mail->Subject = 'Password change code';
            $mail->Body    = '<p>You are about to change your password.</p>
            <p>Your <b>verification code</b> is: <b>'.$verificationCode.'</b></p>
            <p>Please, insert this code in the password recovery page.</p>';
            $mail->AltBody = 'You are about to change your password. Your *verification code* is: > '.$verificationCode.' < Please, insert this code in the password recovery page.';

            $mail->send();
            
        } catch (Exception $e) {                  
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }

    //Función que genera el código random de verificación
    function randomVerificationCode($stringLength) {
        return substr(sha1(time()), 0, $stringLength);
    }

    function cerrarConexiones($con, $stmt){
        mysqli_stmt_close($stmt);
        mysqli_close($con);
        exit;
    }

?>