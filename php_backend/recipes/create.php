<?php
require "../connection.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $name = $_POST["name"];
    $description = $_POST["description"];
    $ingredients = $_POST["ingredients"];

    if ($_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $image = $_FILES["image"]["tmp_name"];
        $imageContent = file_get_contents($image);

      
        if ($imageContent === false) {
            echo json_encode(["error" => "Failed to read image file"]);
            exit();
        }

        
        $stmt = $conn->prepare('INSERT INTO recipes (name, image, description, ingredients) VALUES (?, ?, ?, ?)');

        if ($stmt === false) {
            echo json_encode(["error" => $conn->error]);
            exit();
        }

        
        $null = NULL;
        $stmt->bind_param('sbss', $name, $null, $description, $ingredients);

        $stmt->send_long_data(1, $imageContent);

        try {
            $stmt->execute();
            echo json_encode(["message" => "New Recipe is added", "status" => "success"]);
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "File upload error: " . $_FILES['image']['error']]);
    }
} else {
    echo json_encode(["error" => "Wrong request method"]);
}
?>
