<?php

if (isset($_POST['submit'])) {
	$name = $_POST['name'];
	$mailFrom = $_POST['email'];
	$phone = $_POST['phone'];
	$message = $_POST['message'];

	$mailTo = "hl.kessieleung@gmail.com";
	$mailheader = "From:"
	$mailheader .= $mailFrom;
	$subject = "Message from Contact Form";
	$txt = "You have received an email from ";
	$txt .= $name;

	mail($mailTo, $subject, $txt, $mailheader) or die("Error!");
	header('Location: index.html?mailsend');
}

?>
