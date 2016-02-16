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

$result = $con->query("SELECT * FROM users WHERE id='$userId'");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"uname":"'  . $rs["uname"] . '"}';

}

echo($outp);
mysqli_close($con);

?>