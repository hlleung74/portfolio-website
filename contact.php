<?php

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

$mailheader = "From:".$name."<".$email."<".$phone.">\r\n";

$recipient = "hl.kessieleung@gmail.com";
$subject = "Message from Contact Form";

mail($recipient, $subject, $message, $mailheader) or die("Error!");


?>
