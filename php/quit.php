<?php 

unset($_COOKIE['uid']);

		setcookie("uid", '', time() - 3600);
?>