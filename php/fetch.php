<?php



header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require 'mysqlconnect.php';

$data = json_decode(file_get_contents("php://input"));
$row = $data->row;
$listnumber = $data->listnumber;

$result = $con->query("SELECT name, done, avaliable, id, row FROM freelist WHERE row='$row' and listnumber='$listnumber'");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"name":"'  . $rs["name"] . '",';
    $outp .= '"done":"'   . $rs["done"]        . '",';
    $outp .= '"id":"'   . $rs["id"]        . '",';
    $outp .= '"row":"'   . $rs["row"]        . '",';
    $outp .= '"avaliable":"'. $rs["avaliable"]     . '"}';

}
$outp ='{"records":['.$outp.']}';
$con->close();

echo($outp);
?>