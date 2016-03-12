<?php



header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require 'mysqlconnect.php';

$data = json_decode(file_get_contents("php://input"));
$list_id = $data->listnumber;

$result = $con->query("SELECT name_list FROM lists WHERE list_id='$list_id'");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"listname":"'  . $rs["name_list"] . '"}'; 

}
$outp ='{"records":['.$outp.']}';
$con->close();

echo($outp);
?>