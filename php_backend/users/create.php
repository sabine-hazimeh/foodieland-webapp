<?php
require "../connection.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
if($_SERVER['REQUEST_METHOD'] == "POST"){
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn -> prepare('insert into users (username, password_hash, email) values (?,?,?)');
    $stmt -> bind_param("sss",$username,$password_hash,$email);
    try{
        $stmt->execute();
        echo json_encode(["message" => "New User is added", "status" => "success"]);
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Wrong request method"]);
}



