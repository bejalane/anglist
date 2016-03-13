<?php 

$data = json_decode(file_get_contents("php://input"));
$row = $data->row;

unset($_COOKIE['uid']);
setcookie("uid", '', time() - 3600);

$expire = time()+60*60*24*30;//1 month
setcookie("uid", $row, $expire);
echo $row;

?>