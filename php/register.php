<?php 

// Connect to database

require 'mysqlconnect.php';
// Check connection
if (mysqli_connect_errno())
  {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$data = json_decode(file_get_contents("php://input"));
$uname = mysqli_real_escape_string($con, $data->uname);
$pass = md5(mysqli_real_escape_string($con, $data->pass));

$sql1="SELECT * FROM users WHERE uname='$uname'" ;
$result=mysqli_query($con,$sql1);
    if (mysqli_num_rows($result) > 0) {
      echo 2;
    } else {
      $sql="INSERT INTO users (uname, pass) VALUES ('$uname','$pass')" ;

      if ($con->query($sql) === TRUE) {
          echo 1;
      } else {
          echo "Error: " . $sql . "<br>" . $con->error;
      }
    }


mysqli_close($con);

?>