<?php 

// Connect to database

require 'mysqlconnect.php';
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$data = json_decode(file_get_contents("php://input"));
$name = $data->name;
$row = $data->row;
$done = $data->done;
$avaliable = $data->avaliable;
$listnumber = $data->listnumber;

//$replace = array('"','£','$','%','%','^','&','*','=','\\','/','[',']','{','}',';',':','@','#','~','<',',','>','?','|');
//$name = str_replace($replace, "", $name);



$sql="INSERT INTO freelist (name, done, avaliable, row, listnumber)
VALUES ('$name','$done','$avaliable', '$row', '$listnumber')";

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