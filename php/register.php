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
$pass = mysqli_real_escape_string($con, $data->pass);


if($uname != '') {
  if($pass != '') {

    $sql1="SELECT * FROM users WHERE uname='$uname'";
    $result=mysqli_query($con,$sql1);
    if (mysqli_num_rows($result) > 0) {
      echo 2;
    } else {
      $pass2 = md5($pass);
      $sql="INSERT INTO users (uname, pass) VALUES ('$uname','$pass2')" ;

      if ($con->query($sql) === TRUE) {
          echo 1;
      } else {
          echo "Error: " . $sql . "<br>" . $con->error;
      }
    }
  } else {
    echo 4;
  }
} else {
  echo 3;
}




mysqli_close($con);

?>