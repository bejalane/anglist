<?php 

// Connect to database

require 'mysqlconnect.php';
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$data = json_decode(file_get_contents("php://input"));
$name_list = mysqli_real_escape_string($con, $data->listName);
$user_id = $data->userId;

$sql="INSERT INTO lists (name_list, user_id)
VALUES ('$name_list','$user_id')";

if ($con->query($sql) === TRUE) {

	$last_id = $con->insert_id;
	$sql2="SELECT * FROM lists WHERE list_id='$last_id'";
	$result=mysqli_query($con,$sql2);

    while($row =mysqli_fetch_assoc($result))
    {
        $emparray = $row;
    } 

   echo json_encode($emparray);
} else {
    echo "Error: " . $sql . "<br>" . $con->error;
}

mysqli_close($con);

?>