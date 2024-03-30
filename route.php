<?php
$dbFile = '/path/to/your/database.db'; // Replace with your actual database file path

try {
  $pdo = new PDO("sqlite:$dbFile");

  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

  $query = "SELECT * FROM users";
  $statement = $pdo->query($query);

  $results = [];
  while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
    $results[] = $row;
  }

  $pdo = null;

  $response = [
    'status' => 'success',
    'data' => $results
  ];

  http_response_code(200);
  header('Content-Type: application/json');
  echo json_encode($response);
} catch (PDOException $e) {
  // Handle connection errors
  $response = [
    'status' => 'error',
    'message' => 'Connection failed: ' . $e->getMessage()
  ];

  http_response_code(500);
  header('Content-Type: application/json');
  echo json_encode($response);
}
?>
