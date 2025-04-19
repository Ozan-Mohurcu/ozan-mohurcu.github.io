<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = htmlspecialchars($_POST['name']);
    $email   = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to      = "ozanmhr@gmail.com"; // senin e-postan buraya yazıldı
    $subject = "New Contact Message from Your Website";
    $body    = "Name: $name\nEmail: $email\nMessage:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Your message has been sent. Thank you!";
    } else {
        echo "There was an error sending the message.";
    }
}
?>