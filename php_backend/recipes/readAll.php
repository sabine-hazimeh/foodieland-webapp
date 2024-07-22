<?php
require "../connection.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  
    $result = $conn->query("SELECT recipe_id, name, description, ingredients, image FROM recipes");
    $recipes = [];

    while ($row = $result->fetch_assoc()) {
        $row['image'] = base64_encode($row['image']);
        $recipes[] = $row;
    }

    echo json_encode(["Recipes" => $recipes]);
} else {
    echo json_encode(["error" => "Wrong request method"]);
}
?>
