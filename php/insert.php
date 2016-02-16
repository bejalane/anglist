<?php 

// Connect to database

require 'mysqlconnect.php';
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$data = json_decode(file_get_contents("php://input"));
$name = mysqli_real_escape_string($con, $data->name);
$row = $data->row;
$done = $data->done;
$avaliable = $data->avaliable;

$sql="INSERT INTO freelist (name, done, avaliable, row)
VALUES ('$name','$done','$avaliable', '$row')";

if ($con->query($sql) === TRUE) {

	$last_id = $con->insert_id;
	$sql2="SELECT * FROM freelist WHERE id='$last_id'";
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