<?php 

header("Access-Control-Allow-Origin: *");

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

$sql="SELECT * FROM users WHERE uname='$uname' AND pass='$pass'" ;


	$result=mysqli_query($con,$sql);
  	if (mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){

        $expire = time()+60*60*24*30;//1 month
        setcookie("uid", $row["id"], $expire);

        echo $row["id"];
        exit();
        
      } 		
  		exit();
  	} else {
  		echo 'not';
  		exit();
  	}
mysqli_close($con);

?>