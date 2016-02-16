<?php 


// Connect to database

require 'mysqlconnect.php';
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }


$data = json_decode(file_get_contents("php://input"));
$row = $data->row;

$sql="DELETE FROM freelist WHERE row='$row'";

if ($con->query($sql) === TRUE) {
    echo 1;
} else {
    echo "Error: " . $sql . "<br>" . $con->error;
}

mysqli_close($con);

?>