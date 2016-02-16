<?php 


// Connect to database

require 'mysqlconnect.php';
// Check connection
if (mysqli_connect_errno())
  {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$data = json_decode(file_get_contents("php://input"));
$userId = mysqli_real_escape_string($con, $data->userId);



$sql="SELECT * FROM users WHERE id='$userId'";


	$result=mysqli_query($con,$sql);
  	if (mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){

		unset($_COOKIE['uid']);

		setcookie("uid", '', time() - 3600);

        echo 'nocookies';
        exit();
        
      } 		
  		exit();
  	} else {
  		echo 'error unset cookie';
  		exit();
  	}
mysqli_close($con);
?>