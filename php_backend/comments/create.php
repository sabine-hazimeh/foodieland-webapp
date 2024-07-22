<?php
require "../connection.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $comment_text = $_POST["comment_text"];
    $rating= $_POST["rating"];
    $recipe_id = $_POST["recipe_id"];
    
        $stmt = $conn->prepare('INSERT INTO comments (comment_text,rating, recipe_id) VALUES (?, ?, ?)');
        $stmt->bind_param('ssi', $comment_text, $rating,$recipe_id);
        try {
        $stmt->execute();
            echo json_encode(["message" => "New Comment is added", "status" => "success"]);
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }

        $stmt->close();
    
} else {
    echo json_encode(["error" => "Wrong request method"]);
}
?>
