<?php

if ( isset( $_POST[ "name" ] ) && isset( $_POST[ "email" ] ) && isset( $_POST[ "subject" ] ) && isset( $_POST[ "message" ] ) ) {
	$name = $_POST[ "name" ];
	$email = $_POST[ "email" ];
	$subject = $_POST[ "subject" ];
	$message = $_POST[ "message" ];
	$to = 'info@sinapsissoft.com';
	$messageHTML = '<html>
            <head>
                <title>Solicitud de Información</title>
            </head>
            <body>
                <p><b>Nombre:</b> ' . $name . '</p>
				<p><b>Correo:</b> ' . $email . '</p>
                <p><b>Asunto:</b> ' . $subject . '</p>
				<p><b>Mensaje:</b> ' . $message . '</p>
            </body>
        </html>';
	$headers = "Content-type: text/html; charset=utf-8 \r\n";
	$headers .= "From:Consulta pagina <" . $email . ">\r\n";
	$headers .= "Reply-To: $email\r\n";
	$headers .= "Return-path: $email\r\n";
	$headers .= "Bcc: sinapsis.soft.developer@gmail.com\r\n";

	if ( mail( $to, $subject, $messageHTML, $headers ) ) {
		echo json_encode( array( 'status' => 'success' ) );
	} else {
		echo json_encode( array( 'status' => 'No success' ) );
	}


	/*echo($name);
	echo($email);
	echo($subject);
	echo($message);*/
}



//echo($_POST['name']."-".$_POST['email']."-".$_POST['subject']."-".$_POST['message']);

?>