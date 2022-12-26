<?php


$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$mailheader = "From:".$name."<".$email."<".$phone.">\r\n";

$recipient = "hl.kessieleung@gmail.com";

mail($recipient, $subject, $message, $mailheader) or die("Error!");


?>
