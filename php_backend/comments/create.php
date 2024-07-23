<?php
require "../connection.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $comment_text = $_POST["comment_text"];
    $rating = $_POST["rating"];
    $recipe_id = $_POST["recipe_id"];
    $user_id = $_POST["user_id"]; 

   
    if (empty($comment_text) || empty($rating) || empty($recipe_id)) {
        echo json_encode(["error" => "All fields are required"]);
        exit;
    }

    $stmt = $conn->prepare('INSERT INTO comments (comment_text, rating, recipe_id, user_id) VALUES (?, ?, ?, ?)');
    $stmt->bind_param('siii', $comment_text, $rating, $recipe_id, $user_id);

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
