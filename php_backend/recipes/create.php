<?php
require "../connection.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $name = $_POST["name"];
    $image_url = $_POST["image_url"];
    $description = $_POST["description"];
    $ingredients = $_POST["ingredients"];

   
    $stmt = $conn->prepare('INSERT INTO recipes (name, image_url, description, ingredients) VALUES (?, ?, ?, ?)');
    
    
    $stmt->bind_param('ssss', $name, $image_url, $description, $ingredients);

    try {

        $stmt->execute();
        echo json_encode(["message" => "New Recipe is added", "status" => "success"]);
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Wrong request method"]);
}
