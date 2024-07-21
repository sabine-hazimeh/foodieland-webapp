<?php
require "../connection.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $id = $_GET["id"];
    $stmt = $conn->prepare('SELECT * FROM recipes WHERE recipe_id = ?');
    $stmt->bind_param('i', $id);
        try {
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                $recipe = $result->fetch_assoc();
                echo json_encode($recipe);
            } else {
                echo json_encode(["message" => "No record found with the provided ID"]);
            }
            
            $stmt->close();
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "Invalid ID"]);
    }
    
    $conn->close();

?>
