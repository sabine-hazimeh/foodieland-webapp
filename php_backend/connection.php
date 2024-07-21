<?php
$servername = "localhost";
$username = "root";
$password = '';
$db_name = 'foodieland';


$conn = new mysqli($servername, $username, $password, $db_name, );

if ($conn->connect_error) {
    die('connection failed' . $conn->connect_error);
}