<?php
require 'connect.php';
//error_reporting(E_ERROR);

$users = [];
$sql = "SELECT * FROM users";

if($result = mysqli_query($con, $sql))
{
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $users[$cr]['id']   =   $row['id'];
        $users[$cr]['firstName']   =   $row['name'];
        $users[$cr]['lastName']   =   $row['lastname'];
        $users[$cr]['username']   =   $row['email'];
        $cr++;
    } 
        /*http_response_code(201);
        $user = [
          'name' => 'name',
          'lastname' => 'lastname',
          'password' => 'password',
          'email' => 'email',
          'id'    => '8'
        ];
        echo json_encode(['data'=>$user]);*/    
    echo json_encode($users);
}
else
{
    http_response_code(404);
}
?>