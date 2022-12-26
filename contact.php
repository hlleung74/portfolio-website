<?php

$name = $_POST['name'];
$mailFrom = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

$mailTo = "hl.kessieleung@gmail.com";
$mailheader = "From:""<".$mailFrom;
$subject = "Message from Contact Form";
$txt = "You have received an email from " .$name. ".\n\n" .$phone. ".\n\n" .$message;

mail($mailTo, $subject, $message, $mailheader) or die("Error!");


?>
