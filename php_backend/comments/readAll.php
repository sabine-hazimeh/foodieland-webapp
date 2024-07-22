<?php
require "../connection.php";
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $recipe_id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    $stmt = $conn->prepare('SELECT * FROM comments WHERE recipe_id = ?');
    $stmt->bind_param('i', $recipe_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $comments = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $comments[] = $row;
        }
        echo json_encode(["comments" => $comments]);
    } else {
        echo json_encode(["message" => "no records were found"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["error" => "Wrong request method"]);
}
?>
