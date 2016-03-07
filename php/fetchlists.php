<?php



header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require 'mysqlconnect.php';

$data = json_decode(file_get_contents("php://input"));
$user_id = $data->userId;

$result = $con->query("SELECT list_id, name_list FROM lists WHERE user_id='$user_id'");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"listname":"'  . $rs["name_list"] . '",';
    $outp .= '"list_id":"'. $rs["list_id"]     . '"}';

}
$outp ='{"records":['.$outp.']}';
$con->close();

echo($outp);
?>